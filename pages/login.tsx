import { NextPage } from "next";
import { getProviders, useSession, signIn, getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import GoogleIcon from '../components/GoogleIcon'
import {
  TextInput,
  PasswordInput,
  Button,
  Divider,
  Stack,
} from '@mantine/core';

const Login: NextPage = () => {

  const router = useRouter();
  const [submitted, setSubmitted] = useState(false)
  const [authType, setAuthType] = useState("Login");
  const [invalid, setInvalid] = useState(false)

  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setSubmitted(false);
    setInvalid(false)
    setUserInfo({
      username: "",
      email: "",
      password: "",
    })
  }, [authType])


  const loginUser = async () => {
    if (!(/^\S+@\S+$/.test(userInfo.email)) || userInfo.password.length < 6) return;
    const res: any = await signIn("credentials", {
      redirect: false,
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: `http://localhost:3000`,
    });
    res?.error ? setInvalid(true) : router.push("/");
  };

  const registerUser = async () => {
    await axios
      .post(
        "/api/register",
        { userInfo },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser();
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formSubmit = (e: any) => {
    e.preventDefault()
    setSubmitted(true)
    authType === "Login" ? loginUser() : registerUser();
  };

  return (
    <div className='text-gray-200 mt-8 text-center'>
      <div className="w-5/6 sm:w-4/6 xl:w-2/3 mx-auto">
        <h1 className="text-lg sm:text-xl">Welcome to Peda Store, {authType.toLowerCase()} with</h1>
        <div className="text-center flex justify-center mt-3">
          <Button leftIcon={<GoogleIcon />} variant="default" color="gray" className="rounded-3xl border-2 px-5 text-white hover:bg-222 transition-all duration-300" onClick={() =>
            signIn("google", {
              callbackUrl: "https://pedastore.vercel.app",
            })
          } >Google</Button>
        </div>
        <Divider label="Or continue with email" labelPosition="center" my="lg" className="w-full md:w-4/5 lg:w-1/2 mx-auto" />
      </div>
      <form className="lg:w-1/3 md:w-1/2 sm:w-3/5 w-5/6 mx-auto">
        <Stack className="gap-1">
          {authType === 'Register' && (
            <>
              <label className="opacity-75 text-left">Username</label>
              <TextInput
                required
                className="w-full mx-auto"
                placeholder="Username"
                value={userInfo.username}
                onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })}
                error={submitted && userInfo.username.length < 2 && 'Username must be at leats 2 characters'}
              />
            </>
          )}

          <label className="opacity-75 text-left mt-4">Email</label>
          <TextInput
            required
            placeholder="example@email.com"
            value={userInfo.email}
            onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
            error={submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email) && 'Invalid email format'}
          />

          <label className="opacity-75 text-left mt-4">Password</label>
          <PasswordInput
            required
            placeholder="Your password"
            value={userInfo.password}
            onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
            error={submitted && userInfo.password.length < 6 && 'Password should include at least 6 characters'}
          />
        </Stack>
      </form>

      {invalid && <h1 className="text-red-500 mt-4">Invalid credentials</h1>}


      <div className={`xl:w-1/4 lg:w-1/3 md:w-2/5 sm:w-1/2 w-4/5 mx-auto flex justify-between ${invalid ? 'mt-4' : 'mt-10'}`}>
        <button onClick={() => setAuthType(oppAuthType[authType])} className='hover:underline transition-all duration-300 opacity-75 text-sm'>
          {authType === "Login" ? "Don't have an account yet?" : "Already have an account?"}  {oppAuthType[authType]}
        </button>
        <Button type="submit" variant="filled" className="bg-blue-600" onClick={formSubmit}>{authType}</Button>
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context: any) {

  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      providers: await getProviders(),
    },
  };
}