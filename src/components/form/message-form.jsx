import { useState, useEffect } from "react";
import Input from "@components/ui/form/input";
import TextArea from "@components/ui/form/text-area";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useModalAction } from "@components/modal/modal.context";
import CloseButton from "@components/ui/close-button";
import cn from "classnames";

const MessageForm = ({ isPopup = true, className, mobile }) => {
  const { closeModal, openModal } = useModalAction();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error === "success") {
      toast.error("message delivered ", {
        progressClassName: "fancy-progress-bar",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  async function onSubmit({ msgTitle, msgDescription }) {
    setProcessing(true);
    const bodyData = {
      title: msgTitle,
      description: msgDescription,
      mobile: mobile,
    };
    console.log(bodyData);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/user/message`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(bodyData),
        }
      );

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setProcessing(false);
        setError("success");
        closeModal();
      }
    } catch (error) {
      setError("failed");
      closeModal();
      console.log(error.message);
      setProcessing(false);
    }
  }

  return (
    <div className="w-full lg:min-w-[400px] py-6 sm:py-10 px-4 sm:px-8 xl:px-12 relative bg-fill rounded-sm shadow-dropDown flex flex-col justify-center">
      {isPopup === true && <CloseButton onClick={closeModal} color="#000000" />}

      <div className="text-[12.5px] lg:text-[14px] font-medium text-center my-2">
        <p className="py-2 font-medium text-rose-700 text-[14px] px-0">
          Send push notification !
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4">
        <div className="grid grid-cols-12 ">
          <Input
            label="Message Title"
            type="text"
            placeholder="title of the message"
            className="col-span-12 mb-2"
            variant="outline"
            {...register("msgTitle", {
              required: "message title is required ! ",
            })}
            error={errors.msgTitle?.message}
          />
          <TextArea
            label="Message Description"
            placeholder="message details description"
            className="col-span-12  mb-2"
            variant="outline"
            {...register("msgDescription", {
              required: "message description is required ! ",
            })}
            error={errors.msgDescription?.message}
          />
        </div>

        <div className="relative">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full font-nunito px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90"
          >
            {processing ? "Sending... " : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
