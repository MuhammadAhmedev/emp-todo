import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  try {
    const { id, name, phone, designation, email } = await req.json();

    const updatedEmployee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        phone: phone,
        designation: designation,
        email: email,
      },
    });

    return NextResponse.json(
      { message: "Employee updated successfully", updatedEmployee },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Error while updating employee data" },
      { status: 500 }
    );
  }
};
