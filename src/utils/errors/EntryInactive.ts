import { HttpStatus } from '@/constants'
import BaseError from '.'

export default class EntryInactive extends BaseError {
  public code = 'entry_inactive'
  public status = HttpStatus.UNAUTHORIZED
}
