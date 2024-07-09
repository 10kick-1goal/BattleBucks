import { publicProcedure } from ".";

export const matchPlayer = publicProcedure.query((req) => {
    return "matchPlayer";
});