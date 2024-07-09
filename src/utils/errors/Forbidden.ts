import BaseError from '.'
import HttpStatus from 'http-status-codes'

export default class Forbidden extends BaseError {
  public code = 'forbidden'
  public status = HttpStatus.FORBIDDEN
}
