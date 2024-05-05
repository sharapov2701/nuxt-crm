import { Account, Client, Databases, Storage } from 'appwrite'

export const client = new Client()

if (import.meta.env.APP_WRITE_ID) {
  client.setEndpoint('https://cloud.appwrite.io/v1').setProject(import.meta.env.APP_WRITE_ID)
}

export const account = new Account(client)
export { ID } from 'appwrite'
export const DB = new Databases(client)
export const storage = new Storage(client)
