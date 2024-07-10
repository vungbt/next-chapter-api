import { HttpStatus } from '@/constants'
import BaseError from '.'
export default class ArgumentError extends BaseError {
  public code = 'argument_error'
  public status = HttpStatus.BAD_REQUEST
}
