import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import * as yup from "yup";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@/contexts/auth/user-context";
import { Button, Input } from "@material-tailwind/react";
import Cookies from "js-cookie";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export interface LoginForm {
  username: string;
  password: string;
}

const loginValidateSchema = yup.object({
  username: yup
    .string()
    .email("Your email is invalid. Please try again")
    .required("Required"),
  password: yup.string().required("Required"),
});

export default function Login() {
  const router = useRouter();
  const { signIn } = useUser();
  const [needSignIn, setNeedSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(loginValidateSchema) });

  useEffect(() => {
    const token = Cookies.get("act");
    if (token) {
      router.push("/");
    } else {
      setNeedSignIn(true);
    }
  }, []);

  const onSubmit = async (form: LoginForm) => {
    try {
      setIsLoading(true);
      await signIn(form);
    } catch (error) {
      const { response } = error as AxiosError<{ code: string; message: string; }>; // prettier-ignore
      window.alert("Login failed\nEmail or password is not correct!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!needSignIn) {
    return null;
  }

  return (
    <div className="flex justify-center	content-center pt-32">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light">Login</div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <Input
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              label="Username"
              {...register("username")}
            />
          </div>
          <div className="mt-8 relative">
            <Input
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              label="Password"
              type="password"
              {...register("password")}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              variant="filled"
              type="submit"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
