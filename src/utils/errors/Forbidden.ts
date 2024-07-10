import { HttpStatus } from '@/constants'
import BaseError from '.'

export default class Forbidden extends BaseError {
  public code = 'forbidden'
  public status = HttpStatus.FORBIDDEN
}
