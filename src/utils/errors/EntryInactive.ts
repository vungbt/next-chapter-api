import BaseError from '.'
import HttpStatus from 'http-status-codes'

export default class EntryInactive extends BaseError {
  public code = 'entry_inactive'
  public status = HttpStatus.UNAUTHORIZED
}
