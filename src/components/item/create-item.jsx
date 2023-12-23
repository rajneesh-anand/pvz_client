import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import UploadIcon from "@assets/icons/upload-icon";
import CloseButton from "@components/ui/close-button";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import Select from "@components/ui/form/select/select";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import Editor from "@components/common/ckeditor";
import {
  productStatusOptions,
  productCategoryOptions,
  productSubCategoryOptions,
  marketPlaceOptions,
} from "@data/constant";

export default function AddItemForm() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [alertType, setAlertType] = useState(null);
  const [message, setMessage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [status, setStatus] = useState(productStatusOptions[0]);
  const [category, setCategory] = useState(productCategoryOptions[0]);
  const [subCategory, setSubCategory] = useState(productSubCategoryOptions[0]);
  const [marketPlace, setMarketPlace] = useState(marketPlaceOptions[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  async function onSubmit({ name, description, link, price, sprice, stock }) {
    console.log(subCategory);
    if (subCategory.length == 0) {
      setAlertType("error");
      setMessage("Select Item Sub-Category !");
      return;
    }
    try {
      const subCat = subCategory.map((item) => item.label);
      const formData = new FormData();
      formData.append("image", productImage);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("link", link);
      formData.append("price", price);
      formData.append("salePrice", sprice);
      formData.append("status", status.label);
      formData.append("category", category.label);
      formData.append("subCategory", JSON.stringify(subCat));
      formData.append("marketPlace", marketPlace.label);
      formData.append("content", content);
      formData.append("inStock", stock);

      files.length > 0
        ? files.forEach((file) => formData.append("gallery", file))
        : formData.append("gallery", null);
      formData.append(
        "slug",
        slugify(name, {
          remove: /[*+~.()'"!:@&$#%,]/g,
          lower: true,
        })
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/item/create`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setAlertType("success");
        setMessage("Product Addedd !");
      }
    } catch (error) {
      setAlertType("error");
      setMessage(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="pb-16 pt-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Item Image
          </p>
          <div className="flex w-full md:w-2/3 ">
            <Dropzone
              onDrop={(acceptedFiles) => setProductImage(acceptedFiles[0])}
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
                    <p className="mt-4 text-center text-[12px] font-semibold lg:text-sm ">
                      <span className=" text-blue-700">
                        Click here to upload item image
                      </span>{" "}
                      <br />
                      Or <br />
                      Drag and Drop Image here
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="flex h-36 w-1/3 flex-col">
              <img
                className="min-h-0 w-full overflow-hidden rounded object-contain "
                src={
                  productImage
                    ? URL.createObjectURL(productImage)
                    : "/images/placeholder/product.svg"
                }
                alt="product photo"
              />
            </div>
          </div>
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Image Gallery
          </p>
          <div className="flex w-full md:w-2/3 ">
            <div
              {...getRootProps({
                className:
                  "border-dashed border-2 border-border-base w-full py-4 px-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none",
              })}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-4">
                <UploadIcon className="text-slate-400" color="#7f7777" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag & drop files here, or click to select files</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 text-[10px] font-medium italic text-blue-700 sm:pr-4 md:w-1/3  md:pr-5">
            Gallery Image Preview
          </p>
          <div className=" flex w-full justify-center md:w-2/3 ">
            <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {files.map((file) => (
                <li
                  key={file.name}
                  className="relative h-32 rounded-md shadow-lg"
                >
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={100}
                    height={100}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                    className="relative h-full w-full rounded-md object-contain"
                  />
                  <CloseButton
                    onClick={() => removeFile(file.name)}
                    color="#FF0000"
                  />
                  {/* <p className="mt-2 text-[12px] font-medium text-neutral-500">
                    {file.name}
                  </p> */}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Item Name
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Item Name"
            {...register("name", {
              required: "item name is required !",
            })}
            error={errors.name?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Item Description
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Item Description"
            {...register("description", {
              required: "item description is required !",
            })}
            error={errors.description?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Item Link
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Item Link"
            {...register("link", {
              required: "item link is required !",
            })}
            error={errors.link?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Price
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Item Price"
            {...register("price", {
              required: "item price is required !",
              pattern: {
                value: /^\d+$/,
                message: "Invalid Input",
              },
            })}
            error={errors.price?.message}
          />
        </div>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Sale Price
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Item Sale Price"
            {...register("sprice", {
              required: "item sale price is required !",
              pattern: {
                value: /^\d+$/,
                message: "Invalid Input",
              },
            })}
            error={errors.sprice?.message}
          />
        </div>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Quantity In Stock
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product Stock Quantity"
            {...register("stock", {
              required: "stock value is required !",
              pattern: {
                value: /^\d+$/,
                message: "Invalid Input",
              },
            })}
            error={errors.stock?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Item Marketplace
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={marketPlace}
            options={marketPlaceOptions}
            isSearchable={false}
            onChange={(value) => setMarketPlace(value)}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Item Category
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={category}
            options={productCategoryOptions}
            isSearchable={false}
            onChange={(value) => setCategory(value)}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Item Sub-Category
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={subCategory}
            options={productSubCategoryOptions}
            isSearchable={false}
            onChange={(value) => setSubCategory(value)}
            isMulti={true}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Item Status
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={status}
            options={productStatusOptions}
            isSearchable={false}
            onChange={(value) => setStatus(value)}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Item Detailed Description
          </p>
          <div className=" w-full md:w-2/3">
            <Editor
              name="content"
              onChange={(data) => {
                setContent(data);
              }}
              editorLoaded={editorLoaded}
            />
          </div>
        </div>

        <div className="relative text-center lg:text-end">
          <button
            type="submit"
            className="whitespace-no-wrap rounded-sm bg-orange-500 px-4 py-1 text-base font-medium leading-6 text-white shadow-sm hover:bg-opacity-90 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
      {alertType && (
        <Alert
          message={message}
          variant={alertType}
          closeable={true}
          className="mt-5"
          onClose={() => setMessage(null)}
        />
      )}
    </div>
  );
}
