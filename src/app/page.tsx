
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import useCheckAuth from "../../utils/checkAuth";

export const metadata: Metadata = {
  title:
    "Engine Station Dashboard",
  description: "This is Engine Station Dashboard",
};

export default function Home() {
  return (
    <>
      
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>

    </>
  );
}
