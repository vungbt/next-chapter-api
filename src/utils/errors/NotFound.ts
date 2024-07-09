import BaseError from '.'
import HttpStatus from 'http-status-codes'

export default class NotFound extends BaseError {
  public code = 'not_found'
  public status = HttpStatus.NOT_FOUND
}
