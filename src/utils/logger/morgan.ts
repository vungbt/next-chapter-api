import { Request } from 'express'
import { format } from 'date-fns'
import morgan from 'morgan'
import path from 'path'
import * as rfs from 'rotating-file-stream'

morgan.token('time', () => format(new Date(), 'yyyy-MM-dd HH:mm:ss'))

morgan.token('data', (req: Request) => JSON.stringify(req.body))

morgan.token('res', (req: Request) => JSON.stringify(req.resTemp))

let options = {}

if (process.env.NODE_ENV === 'production') {
  const fileName = 'temp.log'
  options = {
    stream: rfs.createStream(fileName, {
      size: '10M',
      interval: '1d',
      path: path.join(process.cwd(), 'logs/request'),
    }),
  }
}

export default morgan(
  'INFO [:time] [Request] :method :url :status :total-time \n:data  \n:res',
  {
    ...options,
  },
)
