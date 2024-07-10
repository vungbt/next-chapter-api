import { HttpStatus } from '@/constants'
import BaseError from '.'

export default class EntryNotFound extends BaseError {
  public code = 'entry_not_found'
  public status = HttpStatus.NOT_FOUND
}
