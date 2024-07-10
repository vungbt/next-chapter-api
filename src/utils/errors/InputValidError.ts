import { HttpStatus } from '@/constants'
import BaseError from '.'

export default class InputValidError extends BaseError {
  public status = HttpStatus.BAD_REQUEST
  public code = 'input_valid_error'
}
