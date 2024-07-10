import { HttpStatus } from '@/constants'
import BaseError from '.'

export default class Unauthorized extends BaseError {
  public code = 'unauthorized'
  public status = HttpStatus.UNAUTHORIZED
}
