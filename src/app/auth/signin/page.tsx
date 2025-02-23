import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { LoginComponent } from "@/components/login/LoginComponent";

export const metadata: Metadata = {
  title: "Engine Station SignIn Page ",
  description: "This is Egine Station Signin Page",
};

const SignIn: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginComponent />
    </div>
  );
}
export default SignIn;
