export default class {
  constructor ({ status = 200, msg = '', data = null, errors = [] }) {
    this.status = status
    this.msg = msg
    this.data = data
    this.errors = errors
    this.hasError = errors && errors.length > 0
  }

  get () {
    return {
      status: this.status,
      msg: this.msg,
      data: this.data,
      errors: this.errors,
      hasError: this.hasError
    }
  }
}
