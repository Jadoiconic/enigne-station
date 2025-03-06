import React from "react";

import { Metadata } from "next";
import Legister from "@/components/login/Legister";

export const metadata: Metadata = {
  title: "Engine Station SignUp Page",
  description: "This is Engine station SignUp Page ",
};

const SignUp: React.FC = () => {
  return (
    <Legister />
  );
};

export default SignUp;
