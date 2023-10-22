import axios, { AxiosError, AxiosResponse } from "axios"
import { z } from "zod"

const client = axios.create({
  baseURL: "http://localhost:8080"
})

const _deleteVote = async ( name: string): Promise<AxiosResponse | null> => {
  try {
    const response = await client.delete(`/api/messages/${name}`)
    return response
  } catch (error) {
    return (error as AxiosError).response || null
  }
}

const VoteSchema = z.object({
  name: z.string(),
})

export type Vote = z.infer<typeof VoteSchema>

const validateVote = (response: AxiosResponse): Vote | null => {
  const result = VoteSchema.safeParse(response.data)
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

export const deleteVote = async (name: string): Promise<Response<Vote>> => {
  const response = await _deleteVote( name)
  if (!response)
    return { success: false, status: 0  }
  if (response.status !== 200)
    return { success: false, status: response.status  }
  const data = validateVote(response)
  if (!data)
    return { success: false, status: response.status  }
  return { success: true, status: response.status, data }
}