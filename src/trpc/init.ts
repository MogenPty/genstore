import config from "@payload-config";
import { cache } from "react";
import { getPayload } from "payload";
import { initTRPC } from "@trpc/server";

export const createTRPCContext = cache(async () => {
  return { userId: 123 };
});

const t = initTRPC.create({});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({ next }) => {
  const payload = await getPayload({
    config,
  });
  return next({ ctx: { payload } });
});
