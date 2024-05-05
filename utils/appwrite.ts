import { Account, Client, Databases, Storage } from 'appwrite'

export const client = new Client()

const appWriteId = process.server ? process.env.NUXT_PUBLIC_APP_WRITE_ID || '' : useRuntimeConfig().public.appWriteId
client.setEndpoint('https://cloud.appwrite.io/v1').setProject(appWriteId)

export const account = new Account(client)
export { ID } from 'appwrite'
export const DB = new Databases(client)
export const storage = new Storage(client)
