import { PrismaClient } from "@prisma/client";
import { globalConstant } from "constant/constant";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (globalConstant.production === false) globalThis.prisma = client;

export default client;
