const defaultColFuncs = ['sum', 'avg', 'total']

const baseGridColumnsSettings = {
  FloorNo: {
    title: 'طبقه', editor: 'numeric', width: '200px', colFunc: ['avg', 'total']
  },
  UsingArea: {
    title: 'نام دلخواه', editor: 'money', width: 220
  },
  CI_UsingGroup: {
    domain: 'CI_SaraM1', title: 'کاربری اصلی', width: 200, triggerCells: [['CI_UsingType']]
  },
  CI_UsingType: {
    title: 'نوع استفاده فرعی',
    width: 200,
    ignoreCi: true,
    editor: 'ADPGridTemplate',
    params: {
      serviceUrl: 'GetCI_UsingType_FromCI_UsingGroup',
      responseKey: 'CI_UsingType_FromCI_UsingGroup',
      paramName: 'pCI_UsingGroup',
      groupField: 'CI_UsingGroup'
    }
  },
  ActDate: {
    title: 'تاریخ اثر', editor: 'date', width: 110
  },
  agCallbackBtn: {
    filter: false,
    filterable: false,
    resizable: false,
    cellRenderer: "agCallbackBtn",
    btnOptions: {
      round: false,
      rounded: false
    },
    btnClass: "full-width full-height",
    cellStyle: {
      padding: "3px"
    },
    width: 100
  },
  Against: {
    title: 'علیه', width: 80
  },
  AfterEditSideLen: {
    title: 'طول ضلع پس از رعايت بر اصلاحی', width: 185, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  AfterEditWidth: {
    title: 'عرض گذر اصلاحی', width: 120
  },
  AttendanceMeeting: {
    title: 'جلسه حضور', width: 200
  },
  AverageHeight: {
    title: 'ارتفاع مفید', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Area: {
    field: 'Area', title: 'مساحت', width: 100, cell: 'numeric', colFunc: [...defaultColFuncs]
  },
  BackwardLen: {
    title: 'طول عقب نشينی', width: 110, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  BarLenEffective: {
    title: 'طول بر موثر', width: 100, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Bank: {
    title: 'بانک', width: ''
  },
  BankAccountNumber: {
    title: 'شماره حساب بانکی', width: 220
  },
  Branch: {
    title: 'شعبه', width: 100
  },
  BuildingNo: {
    title: 'شماره ساختمان', editor: 'numeric', width: 125, colFunc: ['total']
  },
  BusyArea: {
    title: 'سطح اشغال', editor: 'numeric', width: 110, colFunc: [...defaultColFuncs]
  },
  Cash: {
    title: 'مبلغ نقد', width: 150, cell: 'money', colFunc: [...defaultColFuncs]
  },
  CI_BuildingKind: {
    title: 'نوع ساختمان', editor: 'combo', width: 250
  },
  CI_BuildingType: {
    title: 'گروه ساختماني', editor: 'combo', width: 160
  },
  CI_BuildingStep: {
    title: 'مرحله ساختماني', editor: 'combo', width: 200
  },
  CI_Commission: {
    title: 'شماره کمیسیون', width: 220
  },
  CI_DutyYear: {
    title: 'سال', width: 120, domain: 'CI_SaraM1', editor: 'combo'
  },
  CI_DutyFormula: {
    title: 'فرمول', width: 110
  },
  CI_DutyFormulaFiche: {
    title: 'فرمول فیش', width: 120
  },
  CI_FrontIs: {
    title: 'چگونگي پيش آمدگي', editor: 'combo', width: 200
  },
  CI_FrontPlace: {
    title: 'محل وقوع پيش آمدگي', editor: 'combo', width: 200
  },
  CI_FrontRoofStatus: {
    title: 'وضعيت سقف پيش آمدگي', editor: 'combo', width: 200
  },
  CI_FrontStatus: {
    title: 'وضعیت پيش آمدگي', editor: 'combo', width: 160
  },
  CI_FrontType: {
    title: 'نوع پيش آمدگي', editor: 'combo', width: 200
  },
  CI_HowChangeBuilding: {
    title: 'وضعیت زیربنا', editor: 'combo', width: 160
  },
  CI_IncomeAccountGroup: {
    title: 'مالکیت حساب', editor: 'combo', domain: 'CI_SaraM1', width: 120
  },
  CI_Moshrefiat: {
    title: 'مشرفیت', editor: 'combo', width: 110
  },
  CI_PathType: {
    title: 'نوع معبر/حدود', editor: 'combo', width: 215
  },
  CI_Privacy: {
    title: 'حریم', editor: 'combo', width: 110
  },
  CI_Repair: {
    title: 'نوع تعمیرات', editor: 'combo', width: 140
  },
  CI_RoofType: {
    title: 'نوع سقف', editor: 'combo', width: 160
  },
  CI_SazehType: {
    title: 'نوع سازه', editor: 'combo', width: 160
  },
  CI_SideCode: {
    title: 'جهت معبر', editor: 'combo', width: 125
  }, /* CI_UsingGroup: {
    title: 'کاربری اصلی',
    domain: 'CI_SaraM1',
    width: 200
  }, */
  CI_UsingPlace: {
    title: 'محل وقوع', editor: 'combo', width: 160
  },
  CI_UsingStatus: {
    title: 'وضعیت کاربری', editor: 'combo', width: 125
  }, /* CI_UsingType: {
    title: 'نوع استفاده فرعی',
    width: 200,
    ignoreCi: true,
    editor: 'ADPGridTemplate',
    params: {
      serviceUrl: 'GetCI_UsingType_FromCI_UsingGroup',
      responseKey: 'CI_UsingType_FromCI_UsingGroup',
      paramName: 'pCI_UsingGroup',
      groupField: 'CI_UsingGroup'
    }
  }, */
  CI_ValBlockFord: {
    title: 'معبر در بلوک دارایی', editor: 'combo', width: 200
  },
  CI_ViewCode: {
    title: 'نوع نما', editor: 'combo', width: 170
  },
  CI_VoteType: {
    title: 'نوع رای', width: 150
  },
  CI_WallType: {
    title: 'جنس ديوار', editor: 'combo', width: 160
  },
  Commission: {
    title: 'کمیسیون', width: 120
  },
  Comments: {
    title: 'توضیحات', width: 250
  },
  // تو بازدید ساختمان نباید کمبو باشه
  // CreateYearFrom: {
  //   title: 'قدمت ساختمان از', width: 145, ciName: 'CI_DutyYear', editor: 'ci', comboSort: 'desc'
  // },
  // CreateYearTo: {
  //   title: 'قدمت ساختمان تا', width: 145, ciName: 'CI_DutyYear', editor: 'ci', comboSort: 'desc'
  // },
  CreateDate: {
    title: 'تاریخ ایجاد', width: 180, editor: 'date'
  },
  CreateTime: {
    title: 'زمان ایجاد', width: 180
  },
  Complaint: {
    title: 'شکایت', width: 102
  },
  Date: {
    title: 'مورخ', width: 100, editor: 'date'
  },
  Dated: {
    title: 'مورخه', width: 100, editor: 'date'
  },
  Dahaneh: {
    title: 'دهنه متوسط', editor: 'numeric', width: 115, colFunc: [...defaultColFuncs]
  },
  Demand: {
    title: 'مطالبه', width: 110
  },
  Depth1: {
    title: 'مساحت عمق اول', width: 135, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Description: {
    title: 'توضیحات', width: 250
  },
  Depth1Area: {
    title: 'مساحت عمق اول', width: 125, cell: 'numeric', colFunc: [...defaultColFuncs]
  },
  Depth1No: {
    title: 'تعداد عمق اول', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Depth2: {
    title: 'مساحت عمق دوم', width: 135, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Depth2Area: {
    title: 'مساحت عمق دوم', width: 125, cell: 'numeric', colFunc: [...defaultColFuncs]
  },
  Depth2No: {
    title: 'تعداد عمق دوم', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Depth3: {
    title: 'مساحت پشت جبهه', width: 150, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Depth3Area: {
    title: 'مساحت عمق سوم', width: 125, cell: 'numeric', colFunc: [...defaultColFuncs]
  },
  Depth3No: {
    title: 'تعداد عمق سوم', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  DesignLen: {
    title: 'طول طراحی شده ملک', width: 160, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  DutyPrice: {
    title: 'مبلغ کل', width: 120, cell: 'money', colFunc: [...defaultColFuncs]
  },
  Discount: {
    title: 'مبلغ تخفیف', width: 120, cell: 'money', colFunc: [...defaultColFuncs]
  },
  EdgeAndSideCurrent: {
    title: 'اضلاع و جهات نسبي موجود', width: 200
  },
  EdgeAndSideDoc: {
    title: 'اضلاع و جهات نسبي سند', width: 200
  },
  EdgeBarCurrent: {
    title: 'طول بر موجود', width: 135, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  EdgeBarDoc: {
    title: 'طول بر طبق سند', width: 135, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  EdgeLenCurrent: {
    title: 'طول ضلع موجود', width: 135, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  EdgeLenDoc: {
    title: 'طول ضلع طبق سند یا تعهد ابعاد', width: 215
  },
  EditUsingArea: {
    title: 'مساحت تغییر کاربری', width: 155, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  EntranceWith: {
    title: 'عرض معبر ورودی', width: 110, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  EditDate: {
    title: 'تاریخ ویرایش', width: 220, editor: 'date'
  },
  EditTime: {
    title: 'زمان ویرایش', width: 220
  },
  EditorUserName: {
    title: 'کاربر ویرایش کننده', width: 220
  },
  FicheNo: {
    title: 'شماره فیش', width: 120, colFunc: ['total']
  },
  File: {
    title: 'پرونده', width: 80
  },
  FileContents: {
    title: 'محتویات پرونده', width: 180
  }, /* FloorNo: {
    title: 'طبقه',
    editor: 'numeric',
    width: 80,
    colFunc: ['sum', 'total']
  }, */
  FrontArea: {
    title: 'مساحت پیش آمدگی', width: 160, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  FrontDepth: {
    title: 'عمق', width: 80, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  FrontHeight: {
    title: 'ارتفاع', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  FrontLength: {
    title: 'طول', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  FrontWidth: {
    title: 'عرض', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  GarbageUnit: {
    title: 'واحد زباله ساز', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  GenerateDate: {
    title: 'تاریخ احداث کاربری', editor: 'date', width: 170
  },
  GoFrontLen: {
    title: 'طول موجود پیشروی ملک', width: 160, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  GoFrontLenAllow: {
    title: 'طول مجاز پيشروی ملک', width: 160, colFunc: [...defaultColFuncs]
  },
  HeightKaf: {
    title: 'ارتفاع از کف', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  HelpFulGap: {
    title: 'دهانه متوسط', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  IllegalInfrastructure: {
    title: 'زیربنای غیر مجاز در معبر', width: 165, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  IncomeStatusFiche: {
    title: 'وضعیت فیش', width: 120
  },
  IncomeCreateDate: {
    title: 'تاریخ ردیف درآمدی', editor: 'date', width: 170
  },
  InDate: {
    title: 'در تاریخ', width: 120, editor: 'date'
  },
  Number: {
    title: 'شماره', width: 80
  },
  NumberOfInstallments: {
    title: 'تعداد اقساط', width: 220, colFunc: ['total']
  },
  NidWorkItem: {
    title: 'شماره درخواست', width: 220
  },
  NosaziCode: {
    title: 'کد نوسازی', width: 150
  },
  LocatedAt: {
    title: 'واقع در', width: 110
  },
  MassDistance_Main: {
    title: 'فاصله جرم گذاری اصلی', width: 170, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  MassDistance_Sub: {
    title: 'فاصله جرم گذاری فرعی', width: 170, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Matter77: {
    title: 'ماده 77 شهداریها', width: 180
  },
  Other: {
    title: 'سایر', width: 100
  },
  OverOnArea: {
    title: 'احداث مازاد بر سطح', width: 150, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  OverOnLengthNear: {
    title: 'احداث مازاد بر طول مجاورين', width: 190, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  OverOnTarakom: {
    title: 'احداث مازاد بر تراکم', width: 150, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  OverOrNoParvaneh: {
    title: 'احداث مازاد يا بدون پروانه', width: 190, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  OnTheLackOf: {
    title: 'دایر بر عدم', width: 180
  },
  ParkingDelNo: {
    title: 'کسری پارکینگ', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  PathName: {
    title: 'نام معبر', width: 100
  },
  PathWidth: {
    title: 'عرض معبر', width: 100, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  PathWidthDoc: {
    title: 'عرض معبر طبق سند', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Payment: {
    title: 'پرداخت', width: 100
  },
  ProgressPercent: {
    title: 'درصد پيشرفت', editor: 'percentage', width: 88
  },
  Price: {
    title: 'مبلغ', width: 100, cell: 'money', colFunc: [...defaultColFuncs]
  },
  PriceFiche: {
    title: 'مبلغ فیش', width: 120, cell: 'money', colFunc: [...defaultColFuncs]
  },
  RegisterPlack: {
    title: 'پلاک ثبتی', width: 110, editor: 'numeric', colFunc: ['total']
  },
  RemainSideLen: {
    title: 'طول ضلع باقيمانده', width: 150, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  RepairArea: {
    title: 'مساحت تعمیرات', width: 125, cell: 'numeric', colFunc: [...defaultColFuncs]
  },
  RoofThickness: {
    title: 'ضخامت سقف', editor: 'numeric', width: 120, colFunc: [...defaultColFuncs]
  },
  SecretariatNo: {
    title: 'نام مالک', width: 200
  },
  SideWalkWidth: {
    title: 'عرض پیاده رو', width: 110, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  Subject: {
    title: 'عنوان', width: 80
  },
  Transferee: {
    title: 'تحویل گیرنده', width: 180
  },
  TitleRequest: {
    title: 'عنوان درخواست', width: 150
  },
  UnUsefulHeight: {
    title: 'ارتفاع غیرمفید', width: 125, editor: 'numeric', colFunc: [...defaultColFuncs]
  },
  UnitCount: {
    title: 'تعداد واحد', editor: 'numeric', width: 105, colFunc: [...defaultColFuncs]
  },
  UnitNo: {
    title: 'شماره واحد', width: 110, editor: 'numeric', colFunc: ['total']
  },
  UsefulHeight: {
    title: 'ارتفاع مفيد', editor: 'numeric', width: 110, colFunc: [...defaultColFuncs]
  },
  UserName: {
    title: 'کاربر صادر کننده', width: 200
  }, /* UsingArea: {
    title: 'مساحت كاربری',
    editor: 'numeric',
    width: 125,
    colFunc: [...defaultColFuncs]
  }, */
  UsingDepth: {
    title: 'عمق کاربری', editor: 'numeric', width: 115, colFunc: [...defaultColFuncs]
  },
  Value: {
    title: 'مقدار', width: ''
  },
  ValBlockRowNo: {
    title: 'ردیف بلوک ارزشی', width: 100
  },
  VoteNoe: {
    title: 'شماره رای', width: 180
  },
  VoteDate: {
    title: 'تاریخ رای', width: 180, editor: 'date'
  },
  VoteValue: {
    title: 'مقدار رای', width: 180
  },
  VoteDescryption: {
    title: 'توضیحات رای', width: 180
  }
}

export default baseGridColumnsSettings
