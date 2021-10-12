import { NextFunction, Request, Response } from "express";
import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenetateTokenProvider";


class RefreshTokenUserUseCase {
  async execute(refresh_token: string){

    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if(!refresh_token) {
      throw new Error("Refresh Token Inválid");
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(refreshToken.userId)

    return { token };
  }
}

export { RefreshTokenUserUseCase }