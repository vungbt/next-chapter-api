import BaseError from '.'
import HttpStatus from 'http-status-codes'

export default class ConflictError extends BaseError {
  public code = 'conflict_error'
  public status = HttpStatus.CONFLICT
}
