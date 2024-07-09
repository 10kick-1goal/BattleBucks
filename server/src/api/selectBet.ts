import { publicProcedure } from ".";

export const selectBet = publicProcedure.query((req) => {
    return "SelectBet";
});