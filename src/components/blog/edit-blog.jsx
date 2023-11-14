import React, { useState, useEffect } from "react";
import slugify from "slugify";
import UploadIcon from "@assets/icons/upload-icon";
import Dropzone from "react-dropzone";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import Select from "@components/ui/form/select/select";
import Editor from "@components/common/ckeditor";
import { useForm } from "react-hook-form";
import { blogCategory, blogSubCategory } from "@data/constant";
import { useSession } from "next-auth/react";

export default function EditBlogForm({ blog }) {
  const { data: session, status } = useSession();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState(blog.content);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [subCategory, setSubCategory] = useState(JSON.parse(blog.subCategory));
  const [category, setCategory] = useState(JSON.parse(blog.category));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: blog.title,
      description: blog.description,
    },
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  async function onSubmit({ title, description }) {
    try {
      const formData = new FormData();
      formData.append("image", blogImage);
      formData.append("title", title);
      formData.append("description", description);

      formData.append(
        "slug",
        slugify(title, {
          remove: /[*+~.()'"!:@&$#%,]/g,
          lower: true,
        })
      );
      formData.append("category", JSON.stringify(category));
      formData.append("subCategory", JSON.stringify(subCategory));
      formData.append("content", data);
      formData.append("author", session?.user?.mobile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/blog/edit/${blog.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setMessage("success");
        setError("Blog Updated !");
      }
    } catch (error) {
      setMessage("error");
      setError(error.message);
      console.log(error.message);
    }
  }

  const updateBlogStatus = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/blog/status`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            id: blog.id,
            status: blog.status === "Published" ? "Un-Published" : "Published",
          }),
        }
      );

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setMessage("success");
        setError(
          blog.status === "Published"
            ? "Blog un-published successfully !"
            : "Blog published successfully !"
        );
      }
    } catch (error) {
      setMessage("failed");
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="py-8 my-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2  md:w-1/3">
            Blog Image
          </p>
          <div className="flex w-full md:w-2/3 ">
            <Dropzone
              onDrop={(acceptedFiles) => setBlogImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="w-2/3">
                  <div
                    {...getRootProps({
                      className:
                        "border-dashed border-2 border-border-base h-36 px-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
                    })}
                  >
                    <input {...getInputProps()} />
                    <UploadIcon className="text-slate-400" color="#7f7777" />
                    <p className="mt-4 font-semibold text-center text-[12px] lg:text-sm ">
                      <span className=" text-blue-700">
                        Click here to upload blog image
                      </span>{" "}
                      <br />
                      Or <br />
                      Drag and Drop Image here
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="flex flex-col h-36 w-1/3">
              <img
                className="w-full object-contain min-h-0 rounded overflow-hidden "
                src={blogImage ? URL.createObjectURL(blogImage) : blog.image}
                alt="blog photo"
              />
            </div>
          </div>
        </div>
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2  md:w-1/3">
            Blog Title
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Blog Title"
            {...register("title", {
              required: "blog title is required !",
            })}
            error={errors.title?.message}
          />
        </div>
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2  md:w-1/3">
            Blog Description
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Blog Description"
            {...register("description", {
              required: "blog description is required !",
            })}
            error={errors.description?.message}
          />
        </div>

        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2 md:w-1/3">
            Blog Category
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={category}
            options={blogCategory}
            isSearchable={false}
            onChange={(value) => setCategory(value)}
            isMulti={false}
          />
        </div>
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2 md:w-1/3">
            Blog Sub Category
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={subCategory}
            options={blogSubCategory}
            isSearchable={false}
            onChange={(value) => setSubCategory(value)}
            isMulti={true}
          />
        </div>

        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2 md:w-1/3">
            Blog Content
          </p>
          <div className=" w-full md:w-2/3">
            <Editor
              name="content"
              value={blog.content}
              onChange={(data) => {
                setData(data);
              }}
              editorLoaded={editorLoaded}
            />
          </div>
        </div>

        <div className="relative text-center lg:text-end">
          <button
            onClick={updateBlogStatus}
            className="px-8 py-1.5 bg-teal-500 font-medium text-white hover:bg-orange/70 mr-8"
          >
            {blog.status === "Published" ? "Un-Publish Blog" : "Publish Blog"}
          </button>

          <button
            type="submit"
            className="px-8 py-1.5 bg-orange font-medium text-white hover:bg-orange/70"
          >
            Update Blog
          </button>
        </div>
      </form>
      {error && (
        <Alert
          message={error}
          variant={message}
          closeable={true}
          className="my-5"
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}
