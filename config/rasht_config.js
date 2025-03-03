// eslint-disable-next-line no-unused-vars
const appConfig = {
  remainDays: 30,
  remainDaysNotice: "کاربر گرامی، تا {0} روز دیگر حساب کاربری شما غیرفعال خواهد شد.",
  socket: {
    baseUrl: "https://esup.rasht.ir", // "https://esup.rasht.ir/Api_Security",
    path: "/safagateway/security/socket.io/", // "/socket.io/",
    enabled: false
  },
  captcha: {
    enabled: true
  },
  limitIdleTime: 60,
  EnumDutyFicheStatus: {
    Confirm: 1,
    PermanentExport: 0,
    Cancel: 2,
    TemporaryExport: 3
  },
  nosaziCodePattern: '1-2-5-5-3-3-3',
  FireService: '',
  mapServiceUrl: "https://esup.rasht.ir/safagateway/map",
  srvMapUrl: "https://esup.rasht.ir/safagateway/map",
  MapExportUrl: "http://saramap.rasht.ir/PNG/",
  PngUrl: "http://saramap.rasht.ir/PNG/",
  MapSerachUrl: "https://esup.rasht.ir/SearchService/engine/search/",

  systemReportUrl: "https://esup.rasht.ir/safagateway/RptService",
  systemReportViewer: "https://esup.rasht.ir/ReportManager/RptViewer/Viewer/RptViewer.aspx",
  formReportUrl: "https://esup.rasht.ir/safagateway/RptService",
  formRptViewerUrl: "https://esup.rasht.ir/ReportManager/RptViewer/Viewer/RptViewer.aspx",

  dashboard: {
    show: false,
    serviceUrl: 'http://localhost:6040/api/Report/Dashboard'
  },

  ipfinder: "https://esup.rasht.ir/safagateway/ipfinder",
  mapConfig: {
    lat: 37.284221,
    long: 49.589538,
    center: [49.589538, 37.284221],
    Zoom: 14,
    maxZoom: 22,
    DefaultSelectLayer: 1,
    DefaultSelectLayerName: 'وضع موجود',
    DefaultSelectLayerBuffer: 0,
    MapNosaziCodeDigits: 4,
    PrintTitle: "سیستم یکپارچه شهرسازی "
  },
  PanoUrl: "https://esup.rasht.ir/safagateway/Panorama/", // "http://saramap.rasht.ir/GisProxy/PanoService/",
  panoConfig: {
    layerSets: {
      1392: [1],
      1396: [101, 102],
      1400: [2]
    },
    layerSet: "1400"
  },
  ReportRule: "http://192.168.110.117/ReportRule/ReportRule.svc",
  citizenBaseUrl: "https://esup.rasht.ir/Citizen/",
  sendToBackOldMethod: true,
  enumDutyFicheExportType: {
    isDangi: 6,
    isAllalHesab: 2,
    isTaghsit: 8
  },
  archiveEntities: {
    survey: 4
  },
  districts: [{
    Title: "1",
    Id: 1
  },
  {
    Title: "2",
    Id: 2
  },
  {
    Title: "3",
    Id: 3
  },
  {
    Title: "4",
    Id: 4
  },
  {
    Title: "5",
    Id: 5
  }
  ],
  ArchiveDefaultSort: 'desc', // 'desc' or 'asc'
  showUserNameWatermark: true, // نمایش "نام کاربری و تاریخ و ساعت جاری" کاربر وارد شده به سیستم بصورت واتر مارک بر روی اسناد
  ciServiceUrl: "https://esup.rasht.ir/safagateway/ciservice", // "https://esup.rasht.ir/Api_CI_Service",
  HasEngineeringSystem: 0,
  engineers: "https://esup.rasht.ir/Engineer/SrvEng/Services/SrvEngineer.svc/json/",
  engActivity: "https://esup.rasht.ir/Engineer/SrvEng/Services/SrvEngineer.svc/json/",
  sketchUrl: 'https://esup.rasht.ir/SketchService',
  SA: {
    1: "https://esup.rasht.ir/safagateway/SA1", // "https://esup.rasht.ir/SA/srvSA.svc",
    2: "https://esup.rasht.ir/safagateway/SA2", // "https://esup.rasht.ir/SA/srvSA.svc",
    3: "https://esup.rasht.ir/safagateway/SA3", // "https://esup.rasht.ir/SA/srvSA.svc"
    4: "https://esup.rasht.ir/safagateway/SA4",
    5: "https://esup.rasht.ir/safagateway/SA5"
  },
  SB: {
    1: "https://esup.rasht.ir/safagateway/SB1", // "https://esup.rasht.ir/SB/srvSB.svc",
    2: "https://esup.rasht.ir/safagateway/SB2",
    3: "https://esup.rasht.ir/safagateway/SB3",
    4: "https://esup.rasht.ir/safagateway/SB4",
    5: "https://esup.rasht.ir/safagateway/SB5"
  },
  SC: {
    1: "https://esup.rasht.ir/safagateway/SC1", // "https://esup.rasht.ir/SC/srvSC.svc",
    2: "https://esup.rasht.ir/safagateway/SC2",
    3: "https://esup.rasht.ir/safagateway/SC3",
    4: "https://esup.rasht.ir/safagateway/SC4",
    5: "https://esup.rasht.ir/safagateway/SC5"
  },
  SD: {
    1: "https://esup.rasht.ir/safagateway/SD1", // "https://esup.rasht.ir/SD/srvSD.svc",
    2: "https://esup.rasht.ir/safagateway/SD2",
    3: "https://esup.rasht.ir/safagateway/SD3",
    4: "https://esup.rasht.ir/safagateway/SD4",
    5: "https://esup.rasht.ir/safagateway/SD5"
  },
  SI: {
    1: "https://esup.rasht.ir/safagateway/SI1", // "https://esup.rasht.ir/SI/srvSI.svc",
    2: "https://esup.rasht.ir/safagateway/SI2",
    3: "https://esup.rasht.ir/safagateway/SI3",
    4: "https://esup.rasht.ir/safagateway/SI4",
    5: "https://esup.rasht.ir/safagateway/SI5"
  },
  SQ: {
    1: "https://esup.rasht.ir/SQ/SrvSQ.svc",
    2: "https://esup.rasht.ir/SQ/SrvSQ.svc",
    3: "https://esup.rasht.ir/SQ/SrvSQ.svc",
    4: "https://esup.rasht.ir/SQ/SrvSQ.svc",
    5: "https://esup.rasht.ir/SQ/SrvSQ.svc"
  },
  // SO: {
  // 1: "http://esup.rasht.ir/safagateway/SO",
  // 2: "http://esup.rasht.ir/safagateway/SO",
  // 3: "http://esup.rasht.ir/safagateway/SO",
  // 4: "http://esup.rasht.ir/safagateway/SO",
  // 5: "http://esup.rasht.ir/safagateway/SO"
  // },
  SO: "https://esup.rasht.ir/safagateway/SO", // "https://esup.rasht.ir/Survey/SO/srvSO.svc/json",
  SJ: "https://esup.rasht.ir/Monitoring/SJ/srvSJ.svc",
  generalIncome: "https://esup.rasht.ir/ST/SrvST.svc/json/",
  CadWs: "https://esup.rasht.ir/Cadws/CadWs.svc",
  comSad: {
    1: "https://esup.rasht.ir/safagateway/CommissionService"
  },
  commissions: 'https://esup.rasht.ir/safagateway/CommissionService',
  srvCommission: "https://esup.rasht.ir/safagateway/SrvCommission",
  commissionService10: 'https://esup.rasht.ir/safagateway/CommissionService',
  eng: "https://esup.rasht.ir/Eng/Eng/Services/SrvEngineer.svc",
  esup: "http://esup.rasht.ir/esup/EsupService.svc",
  task: "https://esup.rasht.ir/Task/TaskService.svc",
  workflow: "https://esup.rasht.ir/safagateway/workflow", // "https://esup.rasht.ir/Api_WorkFlow/",
  securityBaseUrl: "https://esup.rasht.ir/safagateway/security", // "https://esup.rasht.ir/Api_Security",
  monitoring: "https://esup.rasht.ir/safagateway/srvmonitoring/monitoring/", // "http://192.168.110.117/Api_srvmonitoring/monitoring/",
  monitoringOptions: {
    allowShowPanel: false
  },
  safaAuth: "https://esup.rasht.ir/Service/SafaAuth.svc",
  dashboardServiceURL: "https://esup.rasht.ir/Dashbord/Dashbord",
  ConfirmCellPhoneForRequest: !1,
  sendSMS: "https://esup.rasht.ir/safagateway/sms", // "https://esup.rasht.ir/SMSService/SrvScheduleSMS.svc",
  CiCity: "11",
  archiveCommission: {
    username: "commission",
    password: "R@stArc123"
  },
  archiveCore: {
    baseUrls: [{
      key: "SrvArchive",
      value: "https://esup.rasht.ir/safagateway/archive/"
    }],
    district: {
      1: {
        username: "archivem1",
        password: "R@stArc123"
      },
      2: {
        username: "archivem2",
        password: "R@stArc123"
      },
      3: {
        username: "archivem3",
        password: "R@stArc123"
      },
      4: {
        username: "archivem4",
        password: "R@stArc123"
      },
      5: {
        username: "archivem5",
        password: "R@stArc123"
      },
      ApprovalCertificate: {
        username: "approvalcertificate",
        password: "R@stArc123"
      }
    },
    username: "approvalcertificate",
    password: "R@stArc123"
  },
  archiveTablet: {
    username: "saratablet",
    password: "R@stArc123"
  },
  securityArchiveCore: {
    baseUrl: "https://esup.rasht.ir/safagateway/archive/",
    username: "logface",
    password: "123"
  },
  archivePolice: {
    username: 'police',
    password: 'ark@2993'
  },
  archiveCommission77: {
    username: 'commission77',
    password: 'safa@123'
  },
  archivePlanBank: {
    username: 'archivecore',
    password: 'archive@123'
  },
  btnSodorGavahi: !1,
  infoGroupCombo: {
    isShowBaseInfoGroupCombo: !0,
    isShowBaseInfoGroupComboForTajmiBasedOnRequest: !0,
    infoGroupOptions: [{
      ID: 0,
      Title: "اطلاعات پرونده"
    },
    {
      ID: 1,
      Title: "بازدید"
    },
    {
      ID: 3,
      Title: "مجاز پایانکار"
    }
    ]
  },
  reportConfig: {
    treeVisibility: !0,
    ciServiceURL: "https://esup.rasht.ir/safagateway/ciservice/json/", // "https://esup.rasht.ir/Api_CI_Service",
    ciServiceDomain: "CI_SaraM1",
    rootReport: {
      Path: "/",
      ReportName: "Root",
      Description: "Root"
    },
    reportManagerServiceURL: "https://esup.rasht.ir/safagateway/RptService", // "http://map.ramsar.ir/report/Services/Services/SafaReportService.svc",
    reportManagerServiceURL2: "https://esup.rasht.ir/safagateway/RptService", // "http://map.ramsar.ir/report/Services/Services/SafaReportService.svc",
    reportManagerServiceURL3: "https://esup.rasht.ir/safagateway/RptService", // "http://map.ramsar.ir/report/Services/Services/SafaReportService.svc",
    reportManagerServiceURL4: "https://esup.rasht.ir/safagateway/RptService" // "http://map.ramsar.ir/report/Services/Services/SafaReportService.svc"
  },
  serviceGateway: "",
  crudBaseUrl: "https://esup.rasht.ir/safagateway/crowd", // "https://esup.rasht.ir/Crowd/SrvCrowdNew.svc/json/",
  reportUrl: "https://esup.rasht.ir/ReportManager/RptViewer/Viewer/RptViewer.aspx",
  avatarBaseUrl: "https://esup.rasht.ir/safagateway/security/avatar/", // "https://esup.rasht.ir/api_security/avatar/",
  Commission77ReportPath: "/Com77",

  esupParams: {
    IsEditInExpertHasVote: false,
    TitleMeetinginExpert: 'حضور نماینده (مالک)',
    IsCheckBalckList: false,
    ViewLegalExpert: false,
    IsShowHistoryVoteInExpert: true,
    IsMashhad: false,
    IsActiveToken: true,
    AgentDefineDraft: false,
    ISShowCombo_Evaluatione: false,
    ShowHoghoghiButton: false,
    IsHideVoteTime: false,
    IsHideVoteDate: false,
    HideMojazParvaneh: false,
    HideExecuteVote: false,
    UseEditVoteLimit: false,
    ShowVoteType: false,
    AllowPurchaseMethodeInPOS: true,
    HideRejectBadvi: true,
    ShowBadviMade63: false,
    ShowEslahiButton: true,
    CheckBadviVoteDate: false,
    CheckK: false,
    IsClearCalculateTextBox: false,
    CommissionReportPath: '/ComReport/',
    IsCheckAllTrepass: true,
    Commission_AddPrintPreviewParameter: false,
    CalculateBeforeAcceptVote: true,
    IsPerformKCoefficientInVote: false,
    CheckDeleteHoghoghi: false,
    ResetKCoeffiecient: false,
    UseGhararKartabl: false,
    ChangeRdlCommissionVoteOfAgentForQom: false,
    CheckRenderVoteInArchive: false,
    AddToArchiveAfterSend: false,
    ReportToArchiveAfterSend: true,
    IsConnectToSara8: true,
    AcceptVoteByAgent: false,
    ShowBuildingPoliceTab: false,
    IsChechVoteOwner: false,
    ConfirmEditVote: false,
    IsShowEstenkafiParameter: true,
    ReadOnlyCommissionDate: false,
    SetAgentDesc: true,
    DefaultArchiveGroupTitle: 'بایگانی',
    hamedanCalculateVoteValue: false,
    VoteTrepassesCellActions: true,
    AllowCancelGroupId: "0180C0C1-2A30-48A9-B38F-7034479CD671"
  },
  ommission77: "http://192.168.110.113/Commission77/Services/SrvCommission77.svc/json/",
  commission5: "http://192.168.110.113/Commission5/Commission5.svc/json/",
  posProtocol: "http:",
  workflowNotSendMsgCaption: "کاربر محترم : پرونده به دلایل زیر قابل ارسال نمی باشد",
  kartableConfig: {
    columns: [{
      field: "NidWorkItem",
      width: 70
    },
    {
      field: "Task",
      width: 300
    },
    {
      field: "WorkflowTitel",
      width: 100
    },
    {
      field: "BizCode",
      width: 200
    },
    {
      field: "IconUrl",
      width: 80
    },
    {
      field: "ProcInitiatorName",
      width: 100
    },
    {
      field: "GroupTitel",
      width: 100
    },
    {
      field: "StartDate",
      width: 120
    },
    {
      field: "StartDate",
      width: 120
    },
    {
      field: "Comments",
      width: 200
    }
    ]
  },
  InsuranceDistricts: [
    13,
    7,
    1
  ],
  SH: 'https://esup.rasht.ir/DeveloperTest/LabbafM/SH/Srv/srvsh.svc', // پایش ساختمان
  ignoreWorkflowDeffs: [
    'D1094A8B-4251-4785-A09D-C5E0A2565503', '083a69f2-38f9-44c9-8d19-2d27c44742fc', '9D3A93C8-AF0C-4D46-B66B-C36FFC3A80D2'
  ]

}
