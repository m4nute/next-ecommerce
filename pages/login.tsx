import { NextPage } from "next";
import { getProviders, useSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login: NextPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { data: session } = useSession();
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: `http://localhost:3000`,
    });
    res?.error ? console.log(res.error) : router.push("/");
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
    authType === "Login" ? loginUser() : registerUser();
  };

  return (
    <div>
      <div>
        <h1 className="text-blue-400">{authType}</h1>
        {authType === "Login"
          ? "Not registered yet?"
          : "Already have an account?"}
        <button onClick={() => setAuthType(oppAuthType[authType])}>
          {oppAuthType[authType]}
        </button>
      </div>
      <form onSubmit={formSubmit}>
        {authType === "Register" && <input
          value={userInfo.username}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, username: target.value })
          }
          type="text"
          placeholder="username"
        />}
        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="email@email.com"
        />
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="********"
        />
        <input type="submit" />

        <hr />
      </form>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000/",
          })
        }
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}
