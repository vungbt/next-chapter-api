import BaseError from '.'
import HttpStatus from 'http-status-codes'

export default class ServerError extends BaseError {
  public code = 'server_error'
  public status = HttpStatus.INTERNAL_SERVER_ERROR
}
