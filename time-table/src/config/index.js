import dotEnv from 'dotenv'

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./.env.${process.env.NODE_ENV}`
  dotEnv.config({ path: configFile })
} else {
  dotEnv.config()
}

export const PORT = process.env.PORT
export const HOST = process.env.HOST
export const APP_SECRET = process.env.APP_SECRET
export const DB_PORT = process.env.DB_PORT
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_NAME = process.env.DB_NAME
