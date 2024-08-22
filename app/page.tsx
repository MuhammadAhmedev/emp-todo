"use client";
import Data from "@/components/Data";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const { status } = useSession();

  if (status == "loading") {
    return <Loader />;
  } else {
    return (
      <>
        <Data />;
      </>
    );
  }
}
