import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { GENSTORE_PAGE_CURSOR, GENSTORE_PAGE_LIMIT } from "@/constants";

export const tagsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(GENSTORE_PAGE_CURSOR),
        limit: z.number().default(GENSTORE_PAGE_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "tags",
        page: input.cursor,
        limit: input.limit,
        sort: "name",
      });

      return data;
    }),
});
