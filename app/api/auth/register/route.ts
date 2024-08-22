import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const POST = async (req: any) => {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User Already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let responce = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User Created Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error while adding user" },
      { status: 500 }
    );
  }
};
