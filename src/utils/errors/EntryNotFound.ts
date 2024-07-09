import BaseError from '.'
import HttpStatus from 'http-status-codes'

export default class EntryNotFound extends BaseError {
  public code = 'entry_not_found'
  public status = HttpStatus.NOT_FOUND
}
