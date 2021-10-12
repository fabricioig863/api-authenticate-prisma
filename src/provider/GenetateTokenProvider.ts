import { sign } from 'jsonwebtoken'

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "750209f5-c29d-43d6-9c10-a63cbc807f67", {
      subject: userId,
      expiresIn: "20s"
    });

    return token;
  }
}

export { GenerateTokenProvider }