import { HttpStatus } from '@/constants'
import { DataResponse } from '@/type'
import { NextFunction, Request, Response } from 'express'
import { startsWith, map, toPairs } from 'lodash'

const baseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.i18n = req.i18n
  res.t = req.t
  const orders = JSON.parse((req.query?.orders as string) ?? '[]') as Record<
    string,
    string
  >[]
  if (orders && orders.length > 0) {
    const convertedOrderArray = map(orders, (orderObj) => toPairs(orderObj)[0])
    req.query.orders = convertedOrderArray as any
  } else {
    req.query.orders = []
  }

  res.jsonApi = (status = HttpStatus.OK, data?: DataResponse) => {
    if (typeof data === 'string') {
      return res.jsonApi(status, data)
    }
    if (data?.message) {
      if (
        startsWith(data?.message, 'message:') ||
        startsWith(data?.message, 'error:')
      ) {
        data.message = req.t(data?.message)
      }
    }
    req.resTemp = data
    return res.status(status).json(data)
  }

  return next()
}

export default baseMiddleware
