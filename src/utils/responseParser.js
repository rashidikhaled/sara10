/* eslint-disable no-underscore-dangle,consistent-return,no-restricted-syntax */
export default class ResponseParser {
  _errorKeys = ['BizErrors']

  _result = {
    data: null,
    msg: '',
    errors: [],
    success: null,
    status: 200,
    hasError: false,
    shouldStop: false
  }

  constructor (response) {
    this.response = response
  }

  process (target) {
    if (!target || typeof target !== 'object') {
      return []
    }
    let result = []
    for (const key of Object.keys(target)) {
      const isErrorObject = this._errorKeys.includes(key)
      if (isErrorObject && target[key]) {
        result = [...result, ...this._logError(target[key])]
      } else {
        result = [...result, ...this.process(target[key])]
      }
    }
    return result
  }

  _logError = (target) => {
    if (!target) {
      return
    }
    if (Array.isArray(target)) {
      return target.map(this._logError).filter((x) => Boolean(x))
    }
    if (typeof target === 'object') {
      return {
        text: `<b>${target.ErrorKey}</b> ` + target.ErrorTitel,
        type: target.ErrorAction === 1 ? 'warning' : 'error',
        errorKey: target.ErrorKey,
        action: target.ErrorAction
      }
    }
  }

  get () {
    // if (this.response.isAxiosError) {
    //   // if (!this.response.response) { // On network related errors
    //   this._result.errors.push({
    //     text: this.response.message,
    //     type: 'error',
    //     errorKey: 'Panic',
    //     action: 0
    //   })
    //   this._result.data = {}
    // } else {
    // this._iterate(this.response)
    this._result.errors = this.process(this.response)
    try {
      this._result.data = (typeof this.response === 'string' || this.response instanceof String) ? JSON.parse(this.response) : this.response
    } catch {
      this._result.data = this.response
    }
    // }
    this._result.hasError = this._result.errors.some((message) => message.type === 'error')
    this._result.shouldStop = this._result.hasError
    this._result.success = !this._result.hasError

    const result = { ...this._result }
    result.addError = function (title, message) {
      result.errors.push({
        text: message,
        type: 'error',
        errorKey: title,
        action: 0 // stop
      })
      result.hasError = true
      result.shouldStop = true
      result.success = false
    }
    result.addWarning = function (title, message) {
      result.errors.push({
        text: message,
        type: 'warning',
        errorKey: title,
        action: 1 // warning
      })
    }

    if (result.hasError) {
      result.msg = result.errors[0].text?.replace(/<[^>]+>/g, '')
    }
    return result
  }
}

/*
public class clsBizError
    {

        [DataMember]
        public string ErrorTitel { set; get; }

        [DataMember]
        public EumErrorAction ErrorAction { set; get; }

        [DataMember]
        public string ErrorKey { set; get; }

    }

    public enum EumErrorAction
    {
        Stop = 0,
        Warning = 1
    }
}
* */
