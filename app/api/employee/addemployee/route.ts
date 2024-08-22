import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const { userid, name, phone, designation, email } = await req.json();

    const existingEmployee = await prisma.employee.findUnique({
      where: { email: email },
    });

    if (existingEmployee) {
      return NextResponse.json(
        { message: "Email already exists. Please choose a different email." },
        { status: 400 }
      );
    }

    const createEmployee = await prisma.employee.create({
      data: {
        userId: userid,
        name: name,
        phone: phone,
        designation: designation,
        email: email,
      },
    });

    return NextResponse.json(
      { message: "Employee added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Error while adding Employee" },
      { status: 500 }
    );
  }
};
