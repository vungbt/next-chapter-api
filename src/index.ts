import express, { Application } from 'express'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import http from 'http'
import morgan from '@utils/logger/morgan'
import { handleErrorApi } from '@utils/errors'
import baseMiddleware from '@middlewares/baseMiddleware'
import routers from '@routers'
import sequelize from '@sequelize'
import logger from '@utils/logger'
import dotenv from 'dotenv'
import path from 'path'
import env from '@configs/env'

dotenv.config({ path: path.resolve(__dirname, '../.env') })
const app: Application = express()
const port = env.server.port ?? 4000

// basic
app.use(compression())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    credentials: true,
  }),
)

// security
if (env.server.env === 'production') {
  app.use(helmet())
}

app.use('/api', morgan, baseMiddleware, routers, handleErrorApi)

const server = http.createServer(app)
server.listen(port, async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    logger.info(`[DB] ✔ Connection has been established successfully.`)
    logger.info(
      `[App] ✔ started on worker ${process.pid} http://localhost:${port}/api`,
    )
  } catch (error) {
    logger.error(`[App] ✔ Unable to connect to the database:`, error)
  }
})
