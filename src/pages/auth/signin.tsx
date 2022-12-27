import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";

interface Props {
  email: string;
  password: string;
}

const SignIn: NextPage = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Props>();

  const onSubmit: SubmitHandler<Props> = async (data: any) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    console.log(res);

    reset();
  };

  return (
    <Layout>
      <div className="mb-5 flex flex-row text-3xl">
        <h1 className="ml-2">
          <Link href="/">Orders / </Link>Add
        </h1>
      </div>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3/4 flex w-72 flex-col justify-center rounded-lg bg-blue-50 p-5"
        >
          <div className="mb-4 flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full rounded-md"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="w-full rounded-md"
              type="password"
              step="0.01"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>

          <button
            type="submit"
            className={"flex w-12 rounded bg-blue-500 px-2 py-1 text-white"}
          >
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default SignIn;