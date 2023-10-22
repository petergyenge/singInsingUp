import axios, { AxiosError, AxiosResponse } from "axios"
import { z } from "zod"

const client = axios.create({
  baseURL: "http://localhost:8080"
})

const _postsingIn = async (password: string, user: string): Promise<AxiosResponse | null> => {
  try {
    const response = await client.post("/api/singIn", { "user": user, "password": password})
    return response
  } catch (error) {
    return (error as AxiosError).response || null
  }
}

const singInSchema = z.object({
  user: z.string(),
  password: z.string()
})

export type singIn = z.infer<typeof singInSchema>

const validateMessage = (response: AxiosResponse): singIn | null => {
  const result = singInSchema.safeParse(response.data)
  if (!result.success) {
    return null
  }
  return result.data
}

type Response<Type> = {
  data: Type
  status: number
  success: true
} | {
  status: number
  success: false
}

export const postsingIn = async (user: string, password: string): Promise<Response<singIn>> => {
  const response = await _postsingIn(password, user)
  if (!response)
    return { success: false, status: 0  }
  if (response.status !== 200)
    return { success: false, status: response.status  }
  const data = validateMessage(response)
  if (!data)
    return { success: false, status: response.status  }
  return { success: true, status: response.status, data }
}