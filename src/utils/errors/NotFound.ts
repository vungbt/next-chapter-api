import { HttpStatus } from '@/constants'
import BaseError from '.'

export default class NotFound extends BaseError {
  public code = 'not_found'
  public status = HttpStatus.NOT_FOUND
}
