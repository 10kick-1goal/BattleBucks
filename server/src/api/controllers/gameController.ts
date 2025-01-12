import { z } from "zod";
import { privateProcedure, publicProcedure } from "../middlewares";
import { commonResponse } from "../../interfaces/MessageResponse";
import { Game, GameParticipant, GameType } from "@prisma/client";
import { prisma } from "../../prisma";

const getGameDetailsSchema = z.object({
  gameId: z.string(),
});

const getUserGameHistorySchema = z.object({
  userId: z.string(),
});

export const getGameDetails = publicProcedure
  .input(getGameDetailsSchema)
  .output(commonResponse(z.object({ game: z.any() }).nullable()))
  .query(async ({ input }): Promise<any> => {
    try {
      const game = await prisma.game.findUnique({
        where: { id: input.gameId },
        include: { participants: true },
      });
      if (!game) {
        return {
          status: 404,
          error: "Game not found",
        };
      }
      return {
        status: 200,
        result: { game },
      };
    } catch (error) {
      return {
        status: 500,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  });

export const getGameParticipants = publicProcedure
  .input(getGameDetailsSchema)
  .output(commonResponse(z.object({ participants: z.array(z.any()) }).nullable()))
  .query(async ({ input }): Promise<any> => {
    try {
      const participants = await prisma.gameParticipant.findMany({
        where: { gameId: input.gameId },
        include: { player: true },
      });
      return {
        status: 200,
        result: { participants },
      };
    } catch (error) {
      return {
        status: 500,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  });

export const getUserGameHistory = privateProcedure
  .input(getUserGameHistorySchema)
  .output(commonResponse(z.object({ games: z.array(z.any()) }).nullable()))
  .query(async ({ input, ctx }): Promise<any> => {
    try {
      const games = await prisma.gameParticipant.findMany({
        where: { playerId: ctx.user.id },
        include: { game: true },
      });
      return {
        status: 200,
        result: { games },
      };
    } catch (error) {
      return {
        status: 500,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  });
