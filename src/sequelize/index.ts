import { Dialect, Sequelize } from 'sequelize'
import pg from 'pg'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const database = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  name: process.env.DB_NAME ?? 'base_api',
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  dialect: (process.env.DB_DIALECT ?? 'postgres') as Dialect,
}

const sequelize = new Sequelize(
  database.name,
  database.username,
  database.password,
  {
    dialect: database.dialect,
    dialectModule: pg,
    host: database.host,
    port: database.port,
  },
)

export default sequelize
