import { TRPCError } from "@trpc/server";
import { t } from "./app";

export const isAuthenticated = t.middleware(async ({ next, ctx }) => {
  const isLoggedIn = true;
  if (isLoggedIn) {
    return next({
      ctx: {
        ...ctx,
        user: {
          isLoggedIn: isLoggedIn,
        },
      },
    });
  } else {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Not authorized" });
  }
});