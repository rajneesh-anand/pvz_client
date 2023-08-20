import React, { useEffect, useState } from "react";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import { useForm } from "react-hook-form";

export default function RewardCalculation() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit({ mobile, order, amount }) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/coin/earned`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            mobile: mobile,
            orderNumber: order,
            amount: amount,
          }),
        }
      );

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setMessage("success");
        setError("Reward sent successfully !");
      }
    } catch (error) {
      setMessage("error");
      console.log(error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Mobile Number"
          type="text"
          variant="outline"
          className="mb-4"
          placeholder="Customer Mobile Number"
          {...register("mobile", {
            required: "mobile number is required !",
          })}
          error={errors.mobile?.message}
        />
        <Input
          label="Order Number"
          type="text"
          variant="outline"
          className="mb-4"
          placeholder="Customer Mobile Number"
          {...register("order", {
            required: "order number is required !",
            pattern: {
              value: /^\d+$/,
              message: "Invalid Input",
            },
          })}
          error={errors.order?.message}
        />

        <Input
          label="Order Amount"
          type="text"
          variant="outline"
          className="mb-4"
          placeholder="Order Amount"
          {...register("amount", {
            required: "order amount is required !",
            pattern: {
              value: /^\d+$/,
              message: "Invalid Input",
            },
          })}
          error={errors.amount?.message}
        />

        <div className="relative">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full  px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange/90 rounded-sm shadow-sm focus:outline-none hover:bg-opacity-90"
          >
            Send Reward
          </button>
        </div>

        {error && (
          <Alert
            message={error}
            variant={message}
            closeable={true}
            className="mt-5"
            onClose={() => setError(null)}
          />
        )}
      </form>
    </div>
  );
}
