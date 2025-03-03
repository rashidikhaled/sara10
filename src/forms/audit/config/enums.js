export const EumTabletSettings = {
  // لیست تنظیمات تبلت
  UrlTileServer: { value: 1, title: "آدرس تایل سرور" },
  CurrentMapCodeLayer: { value: 2, title: "کد لایه وضع موجود" },
  StreetMapCodeLayer: { value: 3, title: "کد لایه معابر" },
  CheckValidationPayankarNo: { value: 4, title: "آیا شماره پایانکار اعتبار سنجی شود" },
  CheckValidationParvanehNo: { value: 5, title: "آیا شماره پروانه اعتبار سنجی شود" },
  StarterPostCode: { value: 6, title: "کد ابتدای کد پستی" },
  IsNosaziCodeInOneLine: { value: 7, title: "آیا کد نوسازی در یک ردیف نمایش داده شود" }
}

export const EumNosaziCodeObjType = {
  //  نوع کد نوسازی
  City: { value: 0, title: "شهر" },
  District: { value: 1, title: "منطقه" },
  Region: { value: 2, title: "حوزه" },
  Block: { value: 3, title: "بلوک" },
  House: { value: 4, title: "ملک" },
  Building: { value: 5, title: "ساختمان" },
  HouseSharing: { value: 6, title: "دستگاه" },
  Apartment: { value: 7, title: "آپارتمان" },
  Shop: { value: 8, title: "صنفی" }
}

export const ClsEnumEumRequiredRevisit = {
  //  نوع کد نوسازی
  None: { value: 0, title: "" },
  RequiredRevisit: { value: 1, title: "" },
  NotRequiredRevisit: { value: 2, title: "" },
  AssignToSurveyor: { value: 3, title: "" },
  DownloadWithSurveyor: { value: 4, title: "" },
  UploadWithSurveyor: { value: 5, title: "" },
  RevisitAgain: { value: 6, title: "" },
  FirstConfirm: { value: 7, title: "" },
  SecondConfirm: { value: 8, title: "" }
}

export const ClsEnumEumNosaziCodeObjType = {
  None: { value: 0, title: "نامشخص" },
  Block: { value: 1, title: "بلوک" },
  House: { value: 2, title: "ملک" },
  Building: { value: 3, title: "ساختمان" },
  Apartment: { value: 4, title: "آپارتمان" },
  HouseSharing: { value: 5, title: "دستگاه" },
  Shop: { value: 6, title: "صنفی" }
}

export const EumConfirmState = {
  None: 0,
  FisrtConfirmState: 1,
  SecondConfirmState: 2
}
