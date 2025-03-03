export const EnumWarningStatus = {
  // "وضعیت اخطار"
  InCurrent: { value: 0, title: "در جریان" },
  InArchive: { value: 1, title: "بایگانی" },
  CancelProc: { value: 2, title: "ابطال درخواست" }
}

export const EumRevisitFor = {
  // "بازدید روی چی خورده ؟"
  Warning: { value: 1, title: "اخطار" },
  PreventConstructionCouncil: {
    value: 2,
    title: "صورتمجلس جلوگیری از عملیات ساختمانی"
  }
}

export const EumSealedOperationType = {
  // "نوع عملیات پلمب"
  SealedOrder: { value: 1, title: "دستور پلمب" },
  Sealed: { value: 2, title: "پلمب" },
  SealedRemoveOrder_Temp: { value: 3, title: "دستور رفع پلمب - موقت" },
  SealedRemove: { value: 4, title: "رفع پلمب" },
  SealedDetach: { value: 5, title: "فک پلمب" },
  SealedRemoveOrder_Perm: { value: 6, title: "دستور رفع پلمب - دائم" },
  WarrantRun: { value: 7, title: "اجرای حکم" },
  WarrantRunOrder: { value: 8, title: "دستور حکم ورود" },
  SealedOrder_And_WarrantRunOrder: { value: 9, title: "دستور حکم ورود و پلمب" },
  SealedLack: { value: 10, title: "عدم پلمب" },
  Execution: { value: 11, title: "اجرائیات" },
  RequestRemoveSealed: { value: 12, title: "تقاضای رفع پلمب" },
  SealedRemoveOrder_Perm_Condition11: {
    value: 13,
    title: "- به شرط داشتن اجراییات -دستور رفع پلمب - دائم"
  }
}

export const EumCouncilType = {
  // "نوع صورتمجلس"
  CounstructionCouncil: { value: 1, title: "جلوگیری از عملیات ساختمانی" },
  ToolsCouncil: { value: 2, title: "جمع آوری" }
}

export const EumWarningType = {
  // "نوع اخطار"
  Main: { value: 1, title: "اخطار اصلی درخواست پلمب" },
  Follow: { value: 2, title: "اخطار پیگیری" },
  Safety: { value: 3, title: "اخطار ایمنی" },
  StopBuildingConstruction: { value: 4, title: "توقف عملیات ساختمانی" }
}
