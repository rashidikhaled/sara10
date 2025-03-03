// eslint-disable-next-line camelcase
const Enum_Black_List_Control = []
// Alert - هشدار
Enum_Black_List_Control[0] = {
  stop: false,
  type: 'Alert'
}

Enum_Black_List_Control[1] = {
  stop: true,
  type: 'Stop'
}

Enum_Black_List_Control[2] = {
  stop: false,
  type: 'Manager'
}

// eslint-disable-next-line no-unused-vars
const MSG_SEND_REQUEST_IN_BLACK_LIST_STOP = `در خواست مورد نظر در لیست سیاه قرار دارد بنابراین اجرای ادامه ی عملیات مقدور نمی باشد.`
// eslint-disable-next-line no-unused-vars
const MSG_SEND_REQUEST_IN_BLACK_LIST_ALERT = `در خواست مورد نظر در لیست سیاه قرار دارد.`
// eslint-disable-next-line no-unused-vars
const MSG_SEND_REQUEST_IN_BLACK_LIST_MANAGER = `در خواست مورد نظر در لیست سیاه قرار دارد.`

// eslint-disable-next-line camelcase
export { Enum_Black_List_Control }
