import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'

import { client } from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenetateTokenProvider"

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {

  async execute({ username, password }: IRequest) {

    // Verificar se usuário existe

    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    });

    if(!userAlreadyExists) {
      throw new Error("User or password incorrect");
    };

    // Verificar se a senha está correta

    const passwordMatch = compare(password, userAlreadyExists.password)

    if(!passwordMatch) {
      throw new Error("User or password incorrect");
    };

    // gerar token do usuário
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

    return { token, refreshToken };
  };

};

export { AuthenticateUserUseCase };