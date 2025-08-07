import config from "@payload-config";
import { cache } from "react";
import { getPayload } from "payload";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { headers as getHeaders } from "next/headers";

export const createTRPCContext = cache(async () => {
  return { userId: 123 };
});

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const baseProcedure = t.procedure.use(async ({ next }) => {
  const payload = await getPayload({
    config,
  });
  return next({ ctx: { payload } });
});

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const headers = await getHeaders();
  const session = await ctx.payload.auth({ headers });

  if (!session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: {
        ...session,
        user: session.user,
      },
    },
  });
});
