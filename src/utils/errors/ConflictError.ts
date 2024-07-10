import { HttpStatus } from '@/constants'
import BaseError from '.'

export default class ConflictError extends BaseError {
  public code = 'conflict_error'
  public status = HttpStatus.CONFLICT
}
