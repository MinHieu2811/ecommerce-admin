import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params?.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const color = await prismadb?.color?.findUnique({
      where: {
        id: params?.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("SIZE_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!name) {
      return new NextResponse("Size name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Size value is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params?.colorId) {
      return new NextResponse("Size id is required");
    }

    const storeByUserId = await prismadb?.store?.findFirst({
      where: {
        id: params?.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const store = await prismadb?.color?.updateMany({
      where: {
        id: params?.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("STORE_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!params?.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const storeByUserId = await prismadb?.store?.findFirst({
      where: {
        id: params?.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismadb?.color?.deleteMany({
      where: {
        id: params?.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("COLOR DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
