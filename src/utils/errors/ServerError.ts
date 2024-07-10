import { HttpStatus } from '@/constants'
import BaseError from '.'

export default class ServerError extends BaseError {
  public code = 'server_error'
  public status = HttpStatus.INTERNAL_SERVER_ERROR
}
