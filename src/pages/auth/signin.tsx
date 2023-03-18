import { GetServerSidePropsContext, NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";

interface UserProps {
  email: string;
  password: string;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {

    }
  }
};

const SignIn: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProps>();

  const onSubmit: SubmitHandler<UserProps> = async (data: UserProps) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    router.replace(router.asPath)

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
            Sign In
          </h1>
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
            className={"flex justify-center w-full rounded bg-blue-200 px-2 py-1 text-black"}
          >
            Sign in
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default SignIn;