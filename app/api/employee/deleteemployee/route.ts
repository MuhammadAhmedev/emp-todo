import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';


export const DELETE = async (req: NextRequest) => {
  try {
     const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID is required for deletion" },
        { status: 400 }
      );
    }

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
