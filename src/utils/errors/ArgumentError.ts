import BaseError from '.'
import HttpStatus from 'http-status-codes'

export default class ArgumentError extends BaseError {
  public code = 'argument_error'
  public status = HttpStatus.BAD_REQUEST
}
