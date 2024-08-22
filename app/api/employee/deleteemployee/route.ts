import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req: any) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const employee = await prisma.employee.delete({
        where: {
          id: parseInt(id),
        },
      });
    } else {
      return NextResponse.json({ message: "Error while Deleting" });
    }
    return NextResponse.json(
      { message: "Employee Delete successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error while deleting Employee" },
      { status: 500 }
    );
  }
};
