import { Router } from "express"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticaUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";

const router = Router();

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()

router.post("/users", createUserController.handle) 
router.post("/login", authenticateUserController.handle) 
router.post("/refresh-token", refreshTokenUserController.handle) 

router.get("/courses", ensureAuthenticated,  (request, response) => {
  return response.json([
    {id: 1, name: "NodeJS"},
    {id: 1, name: "React JS"},
    {id: 1, name: "React Native"},
    {id: 1, name: "Flutter"},
    {id: 1, name: "Elixir"},
  ])
})

export { router };