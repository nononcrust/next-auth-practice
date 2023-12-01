import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateUserRequestSchema = z.object({
  nickname: z.string(),
});

export const PUT = async (request: Request) => {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.name) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const updateUserDto = updateUserRequestSchema.parse(await request.json());

    const user = await prisma.user.updateMany({
      where: {
        name: session.user.name,
      },
      data: {
        name: updateUserDto.nickname,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};
