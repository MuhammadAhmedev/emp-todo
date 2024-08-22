import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await prisma.employee.findMany();
    return NextResponse.json(
      { message: "Fetch All Employees", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error while Gettting Employees" },
      { status: 500 }
    );
  }
};
