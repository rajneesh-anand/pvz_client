import React, { useState } from "react";
import slugify from "slugify";
import UploadIcon from "@assets/icons/upload-icon";
import Dropzone from "react-dropzone";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import Select from "@components/ui/form/select/select";
import { useForm } from "react-hook-form";
import {
  productStatusOptions,
  productCategoryOptions,
  marketPlaceOptions,
} from "@data/constant";

export default function AddItemForm() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [status, setStatus] = useState(productStatusOptions[0]);
  const [category, setCategory] = useState(productCategoryOptions[0]);
  const [marketPlace, setMarketPlace] = useState(marketPlaceOptions[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit({ name, link, price, sprice, stock }) {
    try {
      const formData = new FormData();
      formData.append("image", productImage);
      formData.append("name", name);
      formData.append("link", link);
      formData.append("price", price);
      formData.append("salePrice", sprice);
      formData.append("status", JSON.stringify(status));
      formData.append("category", JSON.stringify(category));
      formData.append("marketPlace", JSON.stringify(marketPlace));
      formData.append("inStock", stock);

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
    <div className="pt-8 pb-16">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2  md:w-1/3">
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
                    <p className="mt-4 font-semibold text-center text-[12px] lg:text-sm ">
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
            <div className="flex flex-col h-36 w-1/3">
              <img
                className="w-full object-contain min-h-0 rounded overflow-hidden "
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
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2  md:w-1/3">
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
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2  md:w-1/3">
            Item Link
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Product Description"
            {...register("link", {
              required: "item link is required !",
            })}
            error={errors.link?.message}
          />
        </div>

        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2 md:w-1/3">
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
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2 md:w-1/3">
            Sale Price
          </p>
          <Input
            type="text"
            variant="outline"
            className="w-full md:w-2/3"
            placeholder="Item Price"
            {...register("sprice", {
              required: "item  sale price is required !",
              pattern: {
                value: /^\d+$/,
                message: "Invalid Input",
              },
            })}
            error={errors.sprice?.message}
          />
        </div>
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2 md:w-1/3">
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

        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2 md:w-1/3">
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

        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2 md:w-1/3">
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
        <div className="mb-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-700 font-semibold sm:pr-4 md:pr-5 w-full px-0 pb-2 md:w-1/3">
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

        <div className="relative text-center lg:text-end">
          <button
            type="submit"
            className="px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange/90 rounded-sm shadow-sm focus:outline-none hover:bg-opacity-90"
          >
            Add Item
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
