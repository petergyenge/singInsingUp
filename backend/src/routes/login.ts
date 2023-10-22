import express from "express"
import { z } from "zod"
import { load, save } from "../utils/db"
import fs from "fs";


const router = express.Router()

const UserRequestSchema = z.object({
  user: z.string(),
  password: z.string()
})

router.get("/getUsers", async (req, res) => {
  const characterData = await JSON.parse(
    fs.readFileSync("database/users.json", "utf-8")
  );
  return res.json(characterData);
})


router.get("/getSecret", async (req, res) => {
  const characterData = await JSON.parse(
    fs.readFileSync("database/secret.json", "utf-8")
  );
  return res.json(characterData);
})


router.post("/singUp", async (req, res) => {
  const bodyParseResult = UserRequestSchema.safeParse(req.body)
  if (!bodyParseResult.success)
    return res.status(400).json(bodyParseResult.error.issues)
  const user = bodyParseResult.data
  const data = await load("users")
  const users = UserRequestSchema.array().parse(data)
  let valid = true

  users.forEach((fuser) => {
    if (fuser.user === user.user) {
      return valid = false, console.log("409")
    }
  })
  if (valid) {
    await save("users", [...users, user])
  }
  return res.sendStatus(200)
})

router.post("/singIn", async (req, res) => {
  const bodyParseResult = UserRequestSchema.safeParse(req.body)
  if (!bodyParseResult.success)
    return res.status(400).json(bodyParseResult.error.issues)
  const user = bodyParseResult.data
  const data = await load("users")
  const users = UserRequestSchema.array().parse(data)
  users.forEach((fuser) => {
    if (fuser.user === user.user && fuser.password === user.password) {
      console.log("Van ilyen")
    }else{
      console.log("nincs ilyen")
    }
  })

  return res.sendStatus(200)
})

export { router }