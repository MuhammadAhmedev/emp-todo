import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export const GET = async (req: any) => {
  try {
  const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
    return NextResponse.json(
      { message: "Get user Employee", employee },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error while Getting Employee" },
      { status: 500 }
    );
  }
};
