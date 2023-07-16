import { PrismaClient } from "@prisma/client";

declare global {
  var prismadb: PrismaClient | undefined;
}

// const prismadb = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

let prismadb: PrismaClient | null = null;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prismadb = new PrismaClient();
  } else {
    if (!global.prismadb) {
      global.prismadb = new PrismaClient();
    }

    prismadb = global.prismadb;
  }
}


export default prismadb