export default {
  EumOwnerCharacter: [
    { Id: 1, Title: 'حقیقی' },
    { Id: 2, Title: 'حقوقی' }
  ],
  EumAccountingDocumentingCause: [
    { Id: 1, Title: 'صدور' },
    { Id: 2, Title: 'تأیید' },
    { Id: 3, Title: 'چاپ' },
    { Id: 4, Title: 'ابطال صدور' },
    { Id: 5, Title: ' ابطال تأیید' },
    { Id: 6, Title: 'استرداد' },
    { Id: 7, Title: ' چک' }
  ],
  EumManagerConfirmLicence: [
    { Id: 0, Title: 'بدون نظر' },
    { Id: 1, Title: 'تأیید' },
    { Id: 2, Title: 'ابطال' },
    { Id: 3, Title: 'عدم تأیید' },
    { Id: 4, Title: ' تأیید نهایی شهروندسپاری' }
  ],
  EumNosaziCodeGroup: [
    { Id: 0, Title: 'تشکیل پرونده' },
    { Id: 1, Title: 'ممیزی' }
  ],
  EumDutyType: [
    { Id: 1, Title: 'نوسازی' },
    { Id: 2, Title: 'صنفی' },
    { Id: 3, Title: 'زباله' }
  ],
  EumDutyFicheStatus: [
    { Id: 0, Title: 'صدور دائم' },
    { Id: 1, Title: 'تایید' },
    { Id: 2, Title: 'باطل' },
    { Id: 3, Title: 'صدور موقت' },
    { Id: 4, Title: 'تایید بانک' },
    { Id: 5, Title: 'استرداد' }
  ],
  EumDutyFinancialBase: [
    { Id: 0, Title: 'بر اساس ملک' },
    { Id: 1, Title: 'بر اساس مالک' }
  ],
  EumClsBaseLibCreation: [
    { Id: 2, Title: 'کلید نوسازی' },
    { Id: 4, Title: 'کلید کارتابل' },
    { Id: 5, Title: 'کلید درخواست' }
  ],
  EumDutyPaymentType: [
    { Id: 1, Title: 'دستی' },
    { Id: 2, Title: 'پی سی پوز' },
    { Id: 3, Title: 'فایل بانک' },
    { Id: 4, Title: 'تایید آنی بانک' },
    { Id: 5, Title: 'وب سرویس بانک' },
    { Id: 6, Title: 'خدمات شهروندان' },
    { Id: 7, Title: 'شهروند سپاری' }
  ],
  EumIncomePaymentType: [
    { Id: 1, Title: 'دستی' },
    { Id: 2, Title: 'پی سی پوز' },
    { Id: 3, Title: 'فایل بانک' },
    { Id: 4, Title: 'تایید آنی بانک' },
    { Id: 5, Title: 'وب سرویس بانک' },
    { Id: 6, Title: 'خدمات شهروندان' },
    { Id: 7, Title: 'شهروند سپاری' }
  ],
  EumDutyInfoGroup: [
    { Id: 0, Title: 'تشکیل پرونده' },
    { Id: 1, Title: 'بازدید' },
    { Id: 2, Title: 'مجاز پروانه' },
    { Id: 3, Title: 'مجاز پایانکار' },
    { Id: 4, Title: 'آخرین بروکف' },
    { Id: 6, Title: 'اطلاعات مالک' },
    { Id: 100, Title: 'نوسازی اصفهان' },
    { Id: 200, Title: 'ممیزی' }
  ],
  EumFicheConfirmMethode: [
    { Id: 1, Title: 'نامشخص' },
    { Id: 2, Title: 'ATM' },
    { Id: 3, Title: 'شعبه' },
    { Id: 5, Title: 'اينترانت' },
    { Id: 6, Title: 'SMS' },
    { Id: 7, Title: 'تلفن بانک' },
    { Id: 8, Title: 'خود دريافت' },
    { Id: 9, Title: 'بانک پرداخت' },
    { Id: 13, Title: 'Web Kiosk' },
    { Id: 14, Title: 'پوز' },
    { Id: 59, Title: 'اينترنت' },
    { Id: 15, Title: 'تهاتر' },
    { Id: 16, Title: 'چک مدت دار' },
    { Id: 17, Title: 'چک بین بانکی' }
  ],
  EumAccountingObjInDocument: [
    { Id: 1, Title: 'فیش' },
    { Id: 2, Title: 'قسط' }
  ],
  EumFormsConfirmationType: [
    { Id: 0, Title: 'شناسنامه وضع موجود' },
    { Id: 1, Title: 'ضابطه' }
  ],
  EumBaseInfoGroup: [
    { Id: 0, Title: 'پرونده' }, // Parvandeh
    { Id: 1, Title: 'بازدید' }, // Revisit
    { Id: 2, Title: 'مجاز پروانه' }, // MojazParvaneh
    { Id: 3, Title: 'مجاز پایانکار' }, // MojazPayankar
    { Id: 4, Title: 'آخرین بروکف' }, // LastBarokaf
    { Id: 5, Title: 'مجاز موافقت اصولی' }, // MojazMovafeghatOsooli
    { Id: 6, Title: 'اطلاعات مالک' }, // OwnerDoc
    { Id: 100, Title: 'نوسازی اصفهان' } // IsfahanNosazi
  ],
  EumNosaziCodeAction: [
    { Id: 1, Title: 'تغییر کد' }, // Tagfhire code
    { Id: 2, Title: 'تفکیک' }, // Tafkik
    { Id: 3, Title: 'تجمیع' }, // Tajmi
    { Id: 4, Title: 'ممیزی' }, // Momayezi
    { Id: 5, Title: 'تبدیل دستگاه به ساختمان' }, // Tabidle dastgah be sakhteman
    { Id: 6, Title: 'تبدیل ساختمان به دستگاه' }, // Tabdile sakhteman be dastgah
    { Id: 7, Title: 'تبدیل ملک به آپارتمان' }, // Tabdile melk be aparteman
    { Id: 8, Title: 'تبدیل آپارتمان به ملک' }, // tabdile aparteman be melk
    { Id: 9, Title: 'انتقال کد' }, // Parvandeh
    { Id: 10, Title: 'تبدیل عرصه به دستگاه' } // Tabdile arse be dastgah
  ],
  EumDiscountType: [
    { Id: 1, Title: 'شهید' }, // Shahid
    { Id: 2, Title: 'جانباز' } // Janbaz
  ],

  // نوع تحلیل ساختمان
  EumAnalysisBuildingType: [
    { Id: 1, Title: 'تحلیل پروانه' }, // Parvaneh
    { Id: 2, Title: 'تعیین خلاف' }, // Foul
    { Id: 3, Title: 'تحلیل موافقت اصولی' } // MovafeghatOsooli
  ],

  // نوع شماره دبیرخانه
  EumSecNoGroup: [
    { Id: 1, Title: 'پروانه' }, // Parvaneh
    { Id: 2, Title: 'پايانكار' }, // Payankar
    { Id: 3, Title: 'پاسخ استعلام' }, // Estelam
    { Id: 5, Title: 'عدم خلاف' }, // AdamKhalaf
    { Id: 6, Title: 'دستور نقشه' }, // PlanOrder
    { Id: 7, Title: 'اعلام ضابطه' }, // ElamZabeteh
    { Id: 8, Title: 'موافقت اصولی' }, // MovafeghatOsooli
    { Id: 10, Title: 'مکاتبات' }, // Mokatebat
    { Id: 11, Title: 'تحلیل ساختمان' }, // AnalysisBuilding
    { Id: 12, Title: 'جریمه لایحه' }, // CommissionFine
    { Id: 13, Title: 'صلحنامه' }, // Peace
    { Id: 14, Title: 'توافقنامه' } // Agreement
  ],
  EumConfirmParkingStaff1: [
    { Id: 1, Title: 'تأیید' },
    { Id: 2, Title: 'عدم تأیید' }
  ],
  EumConfirmParkingStaff2: [
    { Id: 1, Title: 'تأیید' },
    { Id: 2, Title: 'عدم تأیید' }
  ],
  EumConfirmParkingStaff3: [
    { Id: 1, Title: 'تأیید' },
    { Id: 2, Title: 'عدم تأیید' }
  ],
  EumParkingStatus: [
    { Id: 0, Title: 'نامشخص' },
    { Id: 1, Title: 'سربسته' },
    { Id: 2, Title: 'روباز' }
  ],

  // گروه سوابق شهرسازی
  EumShahrsaziArchiveGroup: [
    { Id: 1, Title: 'پروانه' }, // Parvaneh
    { Id: 2, Title: 'پایانکار' }, // Payankar
    { Id: 3, Title: 'عدم خلاف' }, // Adame khalaf
    { Id: 4, Title: 'پاسخ استعلام' }, // Pasokhe estelam
    { Id: 5, Title: 'مجوز خدماتی' }, // Mojavveze khadamaTY
    { Id: 6, Title: 'املاک' } // Amlak
  ],
  EumRequestStatus: [
    { Id: 0, Title: 'جاری' },
    { Id: 1, Title: 'موقت' },
    { Id: 2, Title: 'دائم' },
    { Id: 3, Title: 'حذف شده ها' }
  ],
  EumOddmentType: [
    { Id: 0, Title: 'نامشخص' },
    { Id: 1, Title: 'بدهکار' },
    { Id: 2, Title: 'بستانکار' },
    { Id: 3, Title: 'تعهد پرداخت' },
    { Id: 4, Title: 'تهاتر غیر نقدی' },
    { Id: 5, Title: 'ماده 17' },
    { Id: 6, Title: 'توافقنامه' },
    { Id: 7, Title: 'صلحنامه' },
    { Id: 8, Title: 'اوراق بستانکاری' },
    { Id: 9, Title: 'علی الحساب' },
    { Id: 10, Title: 'تهاتر با املاک' },
    { Id: 11, Title: 'تورم' },
    { Id: 12, Title: 'محاسبه سالهای قبل' },
    { Id: 13, Title: 'توضیحات' },
    { Id: 14, Title: 'تخفیف نقدی' }
  ],
  EumPoseType: [
    { Id: 1, Title: 'پوز بانک شهر' },
    { Id: 2, Title: 'پوز بانک ملی' },
    { Id: 3, Title: 'پوز بانک تجارت' },
    { Id: 4, Title: 'پوز بانک انصار' },
    { Id: 5, Title: 'پوز بانک شهر - آسان پرداخت' },
    { Id: 6, Title: 'پوز بانک ملت' },
    { Id: 7, Title: 'پوز سامان کیش' },
    { Id: 8, Title: 'پوز ایران کیش' },
    { Id: 9, Title: 'پوز پست بانک' }

  ],
  EumMafasaType: [
    { Id: 1, Title: 'دستی' },
    { Id: 2, Title: 'ماشینی' }
  ],
  EumBlackListControl: [
    { Id: 0, Title: 'هشدار' },
    { Id: 1, Title: 'توقف' },
    { Id: 2, Title: 'توقف صدور' }
  ],
  EumObjOnPrice: [
    { ID: 1, Title: 'درآمد' },
    { ID: 2, Title: 'نوسازی' },
    { ID: 3, Title: 'صنفی' },
    { ID: 4, Title: 'پسماند' },
    { ID: 5, Title: 'اشغال معابر' },
    { ID: 6, Title: 'کمیسیون 20' },
    { ID: 7, Title: 'درآمدهای عمومی' }
  ],
  EumNosaziCodeObjType: [
    { Id: 0, Title: 'نامشخص' },
    { Id: 1, Title: 'بلوک' },
    { Id: 2, Title: 'ملک' },
    { Id: 3, Title: 'ساختمان' },
    { Id: 4, Title: 'آپارتمان' },
    { Id: 5, Title: 'دستگاه' },
    { Id: 6, Title: 'صنفی' }

  ],
  EumIncomeFicheStatus: [
    { Id: 0, Title: 'صدور موقتی' },
    { Id: 1, Title: 'صدور قطعی' },
    { Id: 2, Title: 'چاپ' },
    { Id: 3, Title: 'تأیید' },
    { Id: 4, Title: 'ابطال' },
    { Id: 5, Title: 'تأیید بانک' },
    { Id: 6, Title: 'استرداد' },
    { Id: 7, Title: 'در حال انتقال' }
  ],
  EumIncomeFicheType: [
    { Id: 0, Title: 'درآمد' },
    { Id: 1, Title: 'آتش نشانی' },
    { Id: 2, Title: 'سپرده شهرسازی' },
    { Id: 3, Title: 'سپرده اشغال معابر' },
    { Id: 4, Title: 'آموزش و پرورش' },
    { Id: 5, Title: 'قطار شهری' },
    { Id: 6, Title: 'سازمان فاوا' },
    { Id: 7, Title: 'برگشت از سپرده' }
  ],
  EumFicheStatus: [
    { Id: 0, Title: 'صدور موقتی' },
    { Id: 1, Title: 'صدور قطعی' },
    { Id: 2, Title: 'چاپ فیش' },
    { Id: 3, Title: 'تأیید' },
    { Id: 4, Title: 'ابطال' },
    { Id: 7, Title: 'تأیید انتقال' }
  ],
  EumFormTypeForConfirmation: [
    { Id: 0, Title: 'هیأت پارکینگ' },
    { Id: 1, Title: 'هیأت فنی' }
  ],
  EumConfirmTechnicalStaff: [
    { Id: 0, Title: 'تأیید' },
    { Id: 1, Title: 'عدم تأیید' }
  ],
  EumConfirmTechnicalStaff1: [
    { Id: 1, Title: 'تأیید' },
    { Id: 2, Title: 'عدم تأیید' }
  ],
  EumConfirmTechnicalStaff2: [
    { Id: 1, Title: 'تأیید' },
    { Id: 2, Title: 'عدم تأیید' }
  ],
  EumConfirmTechnicalStaff3: [
    { Id: 1, Title: 'تأیید' },
    { Id: 2, Title: 'عدم تأیید' }
  ]

}
