import express, { Application } from 'express'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import http from 'http'
import morgan from '@/utils/logger/morgan'
import { handleErrorApi } from '@/utils/errors'
import baseMiddleware from '@/middlewares/baseMiddleware'
import routers from '@/routers'
import sequelize from '@/sequelize'
import logger from '@/utils/logger'
import path from 'path'
import dotenv from 'dotenv'
import i18next from '@/configs/i18n'

// Load environment variables early
dotenv.config({ path: path.resolve(__dirname, '../.env') })
import env from '@/configs/env'

const app: Application = express()

// Basic middleware
app.use(compression())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    credentials: true,
  }),
)

// Security
if (env.server.env === 'production') {
  app.use(helmet())
}

// Language
app.use(i18next)
app.use((req, _, next) => {
  req.i18n.changeLanguage(
    req.i18n.language.split('-').shift() || process.env.LOCALE_DEFAULT || 'vi',
  )
  return next()
})

// API routing
app.use('/api', morgan, baseMiddleware, routers, handleErrorApi)

// Start the server
const port = process.env.PORT ?? 4000
const server = http.createServer(app)
server.listen(port, async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    logger.info(`[DB] 👌 Connection has been established successfully.`)
    logger.info(
      `[App] 👌 started on worker ${process.pid} http://localhost:${port}/api`,
    )
  } catch (error) {
    logger.error(`[App] ❌ Unable to connect to the database:`, error)
  }
})
