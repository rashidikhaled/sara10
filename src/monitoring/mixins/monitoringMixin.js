
import PersianDate from 'persian-date'
export default {
  data () {
    return {}
  },
  methods: {
    currentDate () {
      const calendar = new PersianDate()
      calendar.formatPersian = false
      return calendar.format('YYYY/MM/DD')
    },
    currentTime () {
      const time = new PersianDate()
      return `${time.hour().toString().padStart(2, '0')}:${time.minute()
        .toString()
        .padStart(2, '0')}:${time.second()
        .toString()
        .padStart(2, '0')}`
    },
    convertTextToPersian (str) {
      if (typeof str === 'number') str = str.toString().trim()
      if (typeof str !== 'string') return str
      return (
        str
          .replace(/ي/g, 'ی')
          .replace(/ك/g, 'ک')
          .replace(/ة/g, 'ه')
          // .replace(/\u06A9/g, "\u0643") // ک
          // .replace(/\u06CC/g, "\u0649") // ی
          // .replace(/\u06CC/g, "\u064A") // ی
          .trim()
      )
    },
    actionTypeTitleToCode (val) {
      switch (val) {
        case 'ذخیره':
          return '1'
        case 'مشاهده':
          return '2'
        case 'حذف':
          return '3'
        case 'محاسبه':
          return '4'
        case 'صدور':
          return '5'
        case 'گزارش':
          return '6'
        case 'ابطال':
          return '7'
        case 'ارسال':
          return '8'
        case 'کپی':
          return '9'
        case 'تأیید':
          return '10'
        case 'استرداد':
          return '11'
        case 'بروزرسانی':
          return '12'
        case 'انتقال':
          return '13'
        case 'محاسبه و صدور':
          return '14'
        case 'محاسبه و ذخیره':
          return '15'
        case 'صدور گواهی':
          return '16'
        case 'ابطال گواهی':
          return '17'
        case 'صدور فیش':
          return '18'
        case 'تایید فیش':
          return '19'
        case 'صدور موقت فیش':
          return '20'
        case 'محاسبه و صدور موقت فیش':
          return '21'
        case 'اعلام ضابطه':
          return '22'
        case 'اعلام ضابطه و ذخیره':
          return '23'
        case 'کپی از مجاز پروانه':
          return '24'
        case 'کپی از مجاز پایانکار':
          return '25'
        case 'کپی از دستور نقشه':
          return '26'
        case 'کپی از موافقت اصولی':
          return '27'
        case 'کپی از بازدید':
          return '28'
        case 'کپی از تشکیل پرونده':
          return '29'
        case 'کپی از مهندسین ناظر':
          return '30'
        case 'کپی از فایل':
          return '31'
        case 'کپی به بازدید':
          return '32'
        case 'کپی به مجاز پروانه':
          return '33'
        case 'کپی به مجاز پایانکار':
          return '34'
        case 'کپی به چیدمان':
          return '35'
        case 'کپی به چیدمان مجاز':
          return '36'
        case 'کپی به موافقت اصولی':
          return '37'
        case 'کپی به تشکیل پرونده':
          return '38'
        case 'کپی به آخرین ردیف':
          return '39'
        case 'ابطال فیش':
          return '40'
        case 'ابطال تایید فیش':
          return '41'
        case 'استرداد فیش':
          return '42'
        default:
          return '0'
      }
    },
    actionTypeCodeToTitle (val) {
      const no = Number(val)
      switch (no) {
        case 1:
          return 'ذخیره'
        case 2:
          return 'مشاهده'
        case 3:
          return 'حذف'
        case 4:
          return 'محاسبه'
        case 5:
          return 'صدور'
        case 6:
          return 'گزارش'
        case 7:
          return 'ابطال'
        case 8:
          return 'ارسال'
        case 9:
          return 'کپی'
        case 10:
          return 'تأیید'
        case 11:
          return 'استرداد'
        case 12:
          return 'بروزرسانی'
        case 13:
          return 'انتقال'
        case 14:
          return 'محاسبه و صدور'
        case 15:
          return 'محاسبه و ذخیره'
        case 16:
          return 'صدور گواهی'
        case 17:
          return 'ابطال گواهی'
        case 18:
          return 'صدور فیش'
        case 19:
          return 'تایید فیش'
        case 20:
          return 'صدور موقت فیش'
        case 21:
          return 'محاسبه و صدور موقت فیش'
        case 22:
          return 'اعلام ضابطه'
        case 23:
          return 'اعلام ضابطه و ذخیره'
        case 24:
          return 'کپی از مجاز پروانه'
        case 25:
          return 'کپی از مجاز پایانکار'
        case 26:
          return 'کپی از دستور نقشه'
        case 27:
          return 'کپی از موافقت اصولی'
        case 28:
          return 'کپی از بازدید'
        case 29:
          return 'کپی از تشکیل پرونده'
        case 30:
          return 'کپی از مهندسین ناظر'
        case 31:
          return 'کپی از فایل'
        case 32:
          return 'کپی به بازدید'
        case 33:
          return 'کپی به مجاز پروانه'
        case 34:
          return 'کپی به مجاز پایانکار'
        case 35:
          return 'کپی به چیدمان'
        case 36:
          return 'کپی به چیدمان مجاز'
        case 37:
          return 'کپی به موافقت اصولی'
        case 38:
          return 'کپی به تشکیل پرونده'
        case 39:
          return 'کپی به آخرین ردیف'
        case 40:
          return 'ابطال فیش'
        case 41:
          return 'ابطال تایید فیش'
        case 42:
          return 'استرداد فیش'
        default:
          return 'نامشخص'
      }
    }
  }
}
