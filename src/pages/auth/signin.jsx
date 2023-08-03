import React, { useEffect, useState } from "react";
import Alert from "@components/ui/alert";
import Input from "@components/ui/form/input";
import { useForm } from "react-hook-form";
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import PasswordInput from "@components/ui/form/password-input";
import { useRouter } from "next/router";

export default function LoginPage({ csrfToken }) {
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit({ email, password }) {
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      console.log(result.error);
      setError(result?.error);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-white">
      <h3 className="text-center text-cyan-700 text-lg font-semibold my-4">
        Sign In
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="flex flex-col space-y-3.5">
          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "Email address is mandatory !",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "invalid email address",
              },
            })}
            error={errors.email?.message}
          />
          <PasswordInput
            label="Password"
            {...register("password", {
              required: "Password is mandatory !",
            })}
            error={errors.password?.message}
          />

          <div className="relative">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full  px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-orange/90 rounded-sm shadow-sm focus:outline-none hover:bg-opacity-90"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
      {error && (
        <Alert
          message={error}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const csrfToken = await getCsrfToken(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { csrfToken },
    };
  }
};
