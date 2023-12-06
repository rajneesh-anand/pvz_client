import React, { useState } from "react";
import slugify from "slugify";
import UploadIcon from "@assets/icons/upload-icon";
import Dropzone from "react-dropzone";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import Select from "@components/ui/form/select/select";
import { useForm } from "react-hook-form";
import { productStatusOptions, productCategoryOptions } from "@data/constant";

export default function AddProductForm() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [status, setStatus] = useState(productStatusOptions[0]);
  const [category, setCategory] = useState(productCategoryOptions[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit({ name, coinvalue, description, stock }) {
    try {
      const formData = new FormData();
      formData.append("image", productImage);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("coinValue", coinvalue);
      formData.append("inStock", stock);
      formData.append(
        "slug",
        slugify(name, {
          remove: /[*+~.()'"!:@&$#%,]/g,
          lower: true,
        })
      );
      formData.append("status", JSON.stringify(status));
      formData.append("category", JSON.stringify(category));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/product/create`,
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
        setError("Product Addedd !");
      }
    } catch (error) {
      setMessage("error");
      setError(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="py-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Product Image
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
                        Click here to upload product image
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
            Product Name
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product Name"
            {...register("name", {
              required: "product name is required !",
            })}
            error={errors.name?.message}
          />
        </div>
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3  md:pr-5">
            Product Description
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product Description"
            {...register("description", {
              required: "product description is required !",
            })}
            error={errors.description?.message}
          />
        </div>

        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <p className="w-full px-0 pb-2 font-semibold text-slate-700 sm:pr-4 md:w-1/3 md:pr-5">
            Product Coin Value
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product Coin Value"
            {...register("coinvalue", {
              required: "product coin value is required !",
              pattern: {
                value: /^\d+$/,
                message: "Invalid Input",
              },
            })}
            error={errors.coinvalue?.message}
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
            Product Category
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
            Product Status
          </p>
          <Select
            className=" w-full md:w-2/3"
            defaultValue={status}
            options={productStatusOptions}
            isSearchable={false}
            onChange={(value) => setStatus(value)}
          />
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
      {error && (
        <Alert
          message={error}
          variant={message}
          closeable={true}
          className="mt-5"
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}
