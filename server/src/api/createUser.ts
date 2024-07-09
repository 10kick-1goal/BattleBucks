import { publicProcedure } from ".";

export const createUser = publicProcedure.query((req) => {
    return "createUser";
});