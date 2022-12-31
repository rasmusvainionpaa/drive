import { NextPage } from "next";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import { trpc } from "../../utils/trpc";

interface Props {
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
}

const SignUp: NextPage = (props) => {

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Props>();

  const onSubmit: SubmitHandler<Props> = async (data: any) => {
    if(data.password !== data.passwordAgain) {
      alert("Passwords don't match");
      return;
    }
    
    try {
      await fetch(`/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  return (
    <Layout>

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3/4 flex w-72 flex-col justify-center rounded-lg bg-blue-50 p-5"
        >
          <h1 className="flex justify-center">
            Sign Up
          </h1>

          <div className="mb-4 flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="w-full rounded-md"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>

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

          <div className="mb-4 flex flex-col">
            <label htmlFor="passwordAgain">Password again</label>
            <input
              id="passwordAgain"
              className="w-full rounded-md"
              type="password"
              step="0.01"
              {...register("passwordAgain", { required: true })}
            />
            {errors.passwordAgain && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>

          <button
            type="submit"
            className={"flex justify center w-24 rounded bg-blue-500 px-2 py-1 text-white"}
          >
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default SignUp;