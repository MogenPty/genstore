import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { DEFAULT_PAGE_CURSOR, DEFAULT_PAGE_LIMIT } from "@/constants";

export const tagsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(DEFAULT_PAGE_CURSOR),
        limit: z.number().default(DEFAULT_PAGE_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "tags",
        page: input.cursor,
        limit: input.limit,
      });

      return data;
    }),
});
