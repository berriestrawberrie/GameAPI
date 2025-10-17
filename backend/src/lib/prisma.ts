/**
 * Exports a single shared Prisma client instance.
 * Used for all DB queries to avoid multiple connections.
 *
 * Backend team: import from here in every file that accesses the DB.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };
