// eslint-disable-next-line no-unused-vars
const appConfig = {
  remainDays: 30,
  remainDaysNotice:
    "کاربر گرامی، تا {0} روز دیگر حساب کاربری شما غیرفعال خواهد شد.",
  socket: {
    baseUrl: "http://esupt.isfahan.ir", // "http://esupt.isfahan.ir/Api_Security",//http://esupt.isfahan.ir/Api_Getway/security
    path: "/socket.io/",
    enabled: !1
  },
  ArchiveDefaultSort: "asc",
  archiveConfig: {
    usePriority: false,
    highlightNewFile: true
  },
  captcha: {
    enabled: true
  },
  allowHardwareToken: !0,
  showUserNameWatermark: !0,
  CadWs: "http://esupt.isfahan.ir/safagateway/crowd",
  FireService: "http://esupt.isfahan.ir/safagateway/fire10",
  PngUrl: "http://esupt.isfahan.ir/PNG/",
  MapSerachUrl: "http://mapesupt.isfahan.ir/SE/",

  systemReportUrl: "http://esupt.isfahan.ir/safagateway/RptServices10", // "http://esupt.isfahan.ir/ReportManager/RptServices10/Services/SafaReportService.svc/json/",
  systemReportViewer:
    "http://esupt.isfahan.ir/ReportManager/RptViewer10/Viewer/RptViewer.aspx",
  formReportUrl: "http://esupt.isfahan.ir/safagateway/RptServices10", // آدرس سرویس گزارشات آماری
  formRptViewerUrl:
    "http://esupt.isfahan.ir/ReportManager/RptViewer10/Viewer/RptViewer.aspx", // آدرس viewer گزارشات آماری
  srvMapUrl: "http://esupt.isfahan.ir/safagateway/Srvmap/", // "http://esupt.isfahan.ir/Api_Srvmap/",//"http://esupt.isfahan.ir/Api_Getway/mapsrv"
  mapUrl: "http://esupt.isfahan.ir/safagateway/Srvmap/",
  MapExportUrl: "http://esupt.isfahan.ir/png",
  MapExportUrlFile: "http://esupt.isfahan.ir/safagateway/MapExport/",
  ipfinder: "http://esupt.isfahan.ir/safagateway/ipfinder/", // "http://esupt.isfahan.ir/Api_IPFinder/",
  mapConfig: {
    lat: 32.6558183,
    long: 51.66956034,
    center: [32.6558183, 51.66956034],
    Zoom: 14,
    NidLayer: 1,
    maxZoom: 22,
    mojoodLayerIDs: "1,1000",
    DefaultSelectLayer: 1,
    DefaultSelectLayerName: "وضع موجود",
    DefaultSelectLayerBuffer: 0,
    MapNosaziCodeDigits: 4,
    // DefaultDomain: 'ایران',
    PrintTitle: "معاونت شهرسازی و معماری شهرداری اصفهان"
  },
  PanoUrl: "http://pano.isfahan.ir/GisProxy/PanoService/", // "http://pano.isfahan.ir/PanoServer2/",
  panoConfig: {
    layerSets: {
      1394: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    layerSet: "1394"
  },
  // PanoLayerSet94=1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17,
  ReportRule: "http://dev.safarayaneh.com:7000/ReportRule/ReportRule.svc",
  citizenBaseUrl: "http://esupt.isfahan.ir/Citizen/",
  enumDutyFicheExportType: {
    isDangi: 6,
    isAllalHesab: 2,
    isTaghsit: 8
  },
  archiveEntities: {
    survey: 63
  },
  districts: [
    {
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
    },
    {
      Title: "6",
      Id: 6
    },
    {
      Title: "7",
      Id: 7
    },
    {
      Title: "8",
      Id: 8
    },
    {
      Title: "9",
      Id: 9
    },
    {
      Title: "10",
      Id: 10
    },
    {
      Title: "11",
      Id: 11
    },
    {
      Title: "12",
      Id: 12
    },
    {
      Title: "13",
      Id: 13
    },
    {
      Title: "14",
      Id: 14
    },
    {
      Title: "15",
      Id: 15
    }
  ],
  ciServiceUrl: "http://esupt.isfahan.ir/safagateway/ciservice", // "http://esupt.isfahan.ir/Api_CiService",// "http://esupt.isfahan.ir/Api_Getway/ciservice"
  HasEngineeringSystem: 2,
  engineers: "http://esupt.isfahan.ir/safagateway/Engineer", // "http://esupt.isfahan.ir/Engineer/SrvEng/Services/SrvEngineer.svc/json/",//http://esupt.isfahan.ir/Engineer/SrvEng/Services/SrvEngineer.svc/json//json/",
  commissions: "http://esupt.isfahan.ir/safagateway/commissionservice", // "http://esupt.isfahan.ir/ComSara10/CommissionService_10/Services/CommissionService.svc/json/",//"http://esupt.isfahan.ir/safagateway/commissionservice",

  srvCommission: "http://esupt.isfahan.ir/safagateway/SrvCommission", // "http://esupt.isfahan.ir/ComSara10/SrvCommission_10/SrvCommission.svc/json/",//"http://esupt.isfahan.ir/safagateway/SrvCommission",
  engActivity: "http://esupt.isfahan.ir/safagateway/Engineer",
  SA: {
    1: "http://esupt.isfahan.ir/safagateway/SAM1", // "http://esupt.isfahan.ir/Sara8_M1/SA/srvSA.svc",
    2: "http://esupt.isfahan.ir/safagateway/SAM2", // "http://esupt.isfahan.ir/Sara8_M2/SA/srvSA.svc",
    3: "http://esupt.isfahan.ir/safagateway/SAM3", // "http://esupt.isfahan.ir/Sara8_M3/SA/srvSA.svc",
    4: "http://esupt.isfahan.ir/safagateway/SAM4", // "http://esupt.isfahan.ir/Sara8_M4/SA/srvSA.svc",
    5: "http://esupt.isfahan.ir/safagateway/SAM5", // "http://esupt.isfahan.ir/Sara8_M5/SA/srvSA.svc",
    6: "http://esupt.isfahan.ir/safagateway/SAM6",
    7: "http://esupt.isfahan.ir/safagateway/SAM7",
    8: "http://esupt.isfahan.ir/safagateway/SAM8",
    9: "http://esupt.isfahan.ir/safagateway/SAM9",
    10: "http://esupt.isfahan.ir/safagateway/SAM10",
    11: "http://esupt.isfahan.ir/safagateway/SAM11",
    12: "http://esupt.isfahan.ir/safagateway/SAM12",
    13: "http://esupt.isfahan.ir/safagateway/SAM13",
    14: "http://esupt.isfahan.ir/safagateway/SAM14",
    15: "http://esupt.isfahan.ir/safagateway/SAM15"
  },
  SB: {
    1: "http://esupt.isfahan.ir/safagateway/SBM1", // "http://esupt.isfahan.ir/SaraM1/SB/srvSB.svc",
    2: "http://esupt.isfahan.ir/safagateway/SBM2", // "http://esupt.isfahan.ir/SaraM2/SB/srvSB.svc",
    3: "http://esupt.isfahan.ir/safagateway/SBM3", // "http://esupt.isfahan.ir/SaraM3/SB/srvSB.svc",
    4: "http://esupt.isfahan.ir/safagateway/SBM4", // "http://esupt.isfahan.ir/SaraM4/SB/srvSB.svc",
    5: "http://esupt.isfahan.ir/safagateway/SBM5", // "http://esupt.isfahan.ir/SaraM5/SB/srvSB.svc",
    6: "http://esupt.isfahan.ir/safagateway/SBM6", // "http://esupt.isfahan.ir/SaraM6/SB/srvSB.svc",
    7: "http://esupt.isfahan.ir/safagateway/SBM7", // "http://esupt.isfahan.ir/SaraM7/SB/srvSB.svc",
    8: "http://esupt.isfahan.ir/safagateway/SBM8", // "http://esupt.isfahan.ir/SaraM8/SB/srvSB.svc",
    9: "http://esupt.isfahan.ir/safagateway/SBM9", // "http://esupt.isfahan.ir/SaraM9/SB/srvSB.svc",
    10: "http://esupt.isfahan.ir/safagateway/SBM10", // "http://esupt.isfahan.ir/SaraM10/SB/srvSB.svc",
    11: "http://esupt.isfahan.ir/safagateway/SBM11", // "http://esupt.isfahan.ir/SaraM11/SB/srvSB.svc",
    12: "http://esupt.isfahan.ir/safagateway/SBM12", // "http://esupt.isfahan.ir/SaraM12/SB/srvSB.svc",
    13: "http://esupt.isfahan.ir/safagateway/SBM13", // "http://esupt.isfahan.ir/SaraM13/SB/srvSB.svc",
    14: "http://esupt.isfahan.ir/safagateway/SBM14", // "http://esupt.isfahan.ir/SaraM14/SB/srvSB.svc",
    15: "http://esupt.isfahan.ir/safagateway/SBM15" // "http://esupt.isfahan.ir/SaraM15/SB/srvSB.svc"
  },
  SC: {
    1: "http://esupt.isfahan.ir/safagateway/SCM1", // "http://esupt.isfahan.ir/SaraM1/SC/srvSC.svc",
    2: "http://esupt.isfahan.ir/safagateway/SCM2", // "http://esupt.isfahan.ir/SaraM2/SC/srvSC.svc",
    3: "http://esupt.isfahan.ir/safagateway/SCM3", // "http://esupt.isfahan.ir/SaraM3/SC/srvSC.svc",
    4: "http://esupt.isfahan.ir/safagateway/SCM4", // "http://esupt.isfahan.ir/SaraM4/SC/srvSC.svc",
    5: "http://esupt.isfahan.ir/safagateway/SCM5", // "http://esupt.isfahan.ir/SaraM5/SC/srvSC.svc",
    6: "http://esupt.isfahan.ir/safagateway/SCM6", // "http://esupt.isfahan.ir/SaraM6/SC/srvSC.svc",
    7: "http://esupt.isfahan.ir/safagateway/SCM7", // "http://esupt.isfahan.ir/SaraM7/SC/srvSC.svc",
    8: "http://esupt.isfahan.ir/safagateway/SCM8", // "http://esupt.isfahan.ir/SaraM8/SC/srvSC.svc",
    9: "http://esupt.isfahan.ir/safagateway/SCM9", // "http://esupt.isfahan.ir/SaraM9/SC/srvSC.svc",
    10: "http://esupt.isfahan.ir/safagateway/SCM10", // "http://esupt.isfahan.ir/SaraM10/SC/srvSC.svc",
    11: "http://esupt.isfahan.ir/safagateway/SCM11", // "http://esupt.isfahan.ir/SaraM11/SC/srvSC.svc",
    12: "http://esupt.isfahan.ir/safagateway/SCM12", // "http://esupt.isfahan.ir/SaraM12/SC/srvSC.svc",
    13: "http://esupt.isfahan.ir/safagateway/SCM13", // "http://esupt.isfahan.ir/SaraM13/SC/srvSC.svc",
    14: "http://esupt.isfahan.ir/safagateway/SCM14", // "http://esupt.isfahan.ir/SaraM14/SC/srvSC.svc",
    15: "http://esupt.isfahan.ir/safagateway/SCM15" // "http://esupt.isfahan.ir/SaraM15/SC/srvSC.svc"
  },

  SD: {
    1: "http://esupt.isfahan.ir/safagateway/SDM1", // "http://esupt.isfahan.ir/SaraM1/SD/srvSD.svc",
    2: "http://esupt.isfahan.ir/safagateway/SDM2", // "http://esupt.isfahan.ir/SaraM2/SD/srvSD.svc",
    3: "http://esupt.isfahan.ir/safagateway/SDM3", // "http://esupt.isfahan.ir/SaraM3/SD/srvSD.svc",
    4: "http://esupt.isfahan.ir/safagateway/SDM4", // "http://esupt.isfahan.ir/SaraM4/SD/srvSD.svc",
    5: "http://esupt.isfahan.ir/safagateway/SDM5", // "http://esupt.isfahan.ir/SaraM5/SD/srvSD.svc",
    6: "http://esupt.isfahan.ir/safagateway/SDM6", // "http://esupt.isfahan.ir/SaraM6/SD/srvSD.svc",
    7: "http://esupt.isfahan.ir/safagateway/SDM7", // "http://esupt.isfahan.ir/SaraM7/SD/srvSD.svc",
    8: "http://esupt.isfahan.ir/safagateway/SDM8", // "http://esupt.isfahan.ir/SaraM8/SD/srvSD.svc",
    9: "http://esupt.isfahan.ir/safagateway/SDM9", // "http://esupt.isfahan.ir/SaraM9/SD/srvSD.svc",
    10: "http://esupt.isfahan.ir/safagateway/SDM10", // "http://esupt.isfahan.ir/SaraM10/SD/srvSD.svc",
    11: "http://esupt.isfahan.ir/safagateway/SDM11", // "http://esupt.isfahan.ir/SaraM11/SD/srvSD.svc",
    12: "http://esupt.isfahan.ir/safagateway/SDM12", // "http://esupt.isfahan.ir/SaraM12/SD/srvSD.svc",
    13: "http://esupt.isfahan.ir/safagateway/SDM13", // "http://esupt.isfahan.ir/SaraM13/SD/srvSD.svc",
    14: "http://esupt.isfahan.ir/safagateway/SDM14", // "http://esupt.isfahan.ir/SaraM14/SD/srvSD.svc",
    15: "http://esupt.isfahan.ir/safagateway/SDM15" // "http://esupt.isfahan.ir/SaraM15/SD/srvSD.svc"
  },
  SI: {
    1: "http://esupt.isfahan.ir/safagateway/SIM1", // "http://esupt.isfahan.ir/SaraM1/SI/srvSI.svc",
    2: "http://esupt.isfahan.ir/safagateway/SIM2", // "http://esupt.isfahan.ir/SaraM2/SI/srvSI.svc",
    3: "http://esupt.isfahan.ir/safagateway/SIM3", // "http://esupt.isfahan.ir/SaraM3/SI/srvSI.svc",
    4: "http://esupt.isfahan.ir/safagateway/SIM4", // "http://esupt.isfahan.ir/SaraM4/SI/srvSI.svc",
    5: "http://esupt.isfahan.ir/safagateway/SIM5", // "http://esupt.isfahan.ir/SaraM5/SI/srvSI.svc",
    6: "http://esupt.isfahan.ir/safagateway/SIM6", // "http://esupt.isfahan.ir/SaraM6/SI/srvSI.svc",
    7: "http://esupt.isfahan.ir/safagateway/SIM7", // "http://esupt.isfahan.ir/SaraM7/SI/srvSI.svc",
    8: "http://esupt.isfahan.ir/safagateway/SIM8", // "http://esupt.isfahan.ir/SaraM8/SI/srvSI.svc",
    9: "http://esupt.isfahan.ir/safagateway/SIM9", // "http://esupt.isfahan.ir/SaraM9/SI/srvSI.svc",
    10: "http://esupt.isfahan.ir/safagateway/SIM10", // "http://esupt.isfahan.ir/SaraM10/SI/srvSI.svc",
    11: "http://esupt.isfahan.ir/safagateway/SIM11", // "http://esupt.isfahan.ir/SaraM11/SI/srvSI.svc",
    12: "http://esupt.isfahan.ir/safagateway/SIM12", // "http://esupt.isfahan.ir/SaraM12/SI/srvSI.svc",
    13: "http://esupt.isfahan.ir/safagateway/SIM13", // "http://esupt.isfahan.ir/SaraM13/SI/srvSI.svc",
    14: "http://esupt.isfahan.ir/safagateway/SIM14", // "http://esupt.isfahan.ir/SaraM14/SI/srvSI.svc",
    15: "http://esupt.isfahan.ir/safagateway/SIM15" // "http://esupt.isfahan.ir/SaraM15/SI/srvSI.svc"
  },

  SQ: {
    1: "http://esupt.isfahan.ir/safagateway/SQM1", // "http://esupt.isfahan.ir/SaraM1/SQ/SrvSQ.svc",
    2: "http://esupt.isfahan.ir/safagateway/SQM2", // "http://esupt.isfahan.ir/SaraM2/SQ/SrvSQ.svc",
    3: "http://esupt.isfahan.ir/safagateway/SQM3", // "http://esupt.isfahan.ir/SaraM3/SQ/SrvSQ.svc",
    4: "http://esupt.isfahan.ir/safagateway/SQM4", // "http://esupt.isfahan.ir/SaraM4/SQ/SrvSQ.svc",
    5: "http://esupt.isfahan.ir/safagateway/SQM5", // "http://esupt.isfahan.ir/SaraM5/SQ/SrvSQ.svc",
    6: "http://esupt.isfahan.ir/safagateway/SQM6", // "http://esupt.isfahan.ir/SaraM6/SQ/SrvSQ.svc",
    7: "http://esupt.isfahan.ir/safagateway/SQM7", // "http://esupt.isfahan.ir/SaraM7/SQ/SrvSQ.svc",
    8: "http://esupt.isfahan.ir/safagateway/SQM8", // "http://esupt.isfahan.ir/SaraM8/SQ/SrvSQ.svc",
    9: "http://esupt.isfahan.ir/safagateway/SQM9", // "http://esupt.isfahan.ir/SaraM9/SQ/SrvSQ.svc",
    10: "http://esupt.isfahan.ir/safagateway/SQM10", // "http://esupt.isfahan.ir/SaraM10/SQ/SrvSQ.svc",
    11: "http://esupt.isfahan.ir/safagateway/SQM11", // "http://esupt.isfahan.ir/SaraM11/SQ/SrvSQ.svc",
    12: "http://esupt.isfahan.ir/safagateway/SQM12", // "http://esupt.isfahan.ir/SaraM12/SQ/SrvSQ.svc",
    13: "http://esupt.isfahan.ir/safagateway/SQM13", // "http://esupt.isfahan.ir/SaraM13/SQ/SrvSQ.svc",
    14: "http://esupt.isfahan.ir/safagateway/SQM14", // "http://esupt.isfahan.ir/SaraM14/SQ/SrvSQ.svc",
    15: "http://esupt.isfahan.ir/safagateway/SQM15" // "http://esupt.isfahan.ir/SaraM15/SQ/SrvSQ.svc"
  },
  SJ: "http://safatest.mashhad.ir:8000/SJ/srvSJ.svc",
  SX: "http://safatest.mashhad.ir:8000/SX/srvSX.svc",
  generalIncome: "http://esupt.isfahan.ir/Sara8_M1/ST/SrvST.svc/json/",
  ES: "http://dev.safarayaneh.com:7000/Estate/Estate/Services/SrvEstate.svc/",
  comSad: {
    1: "http://esupt.isfahan.ir/safagateway/commissionservice" // "http://esupt.isfahan.ir/ComSara10/CommissionService_10/Services/CommissionService.svc/json/",// "http://esupt.isfahan.ir/safagateway/commissionservice",
  },
  eng: "http://esupt.isfahan.ir/safagateway/Engineer",
  esup: "http://esupt.isfahan.ir/Esup10/EsupService.svc",
  task: "http://esupt.isfahan.ir/safagateway/Task10",
  workflow: "http://esupt.isfahan.ir/safagateway/workflow", // "http://esupt.isfahan.ir/Api_Workflow/",//"http://esupt.isfahan.ir/Api_Getway/workflow"
  securityBaseUrl: "http://esupt.isfahan.ir/safagateway/security", // "http://esupt.isfahan.ir/Api_Security",//"http://esupt.isfahan.ir/Api_Getway/security"
  monitoring: "http://esupt.isfahan.ir/safagateway/srvmonitoring/",
  monitoringOptions: {
    allowShowPanel: false
  },
  safaAuth: "http://esupt.isfahan.ir/Security8/SafaAuth.svc",
  dashboardServiceURL: "http://esupt.isfahan.ir:8040/Dashbord/Dashbord",
  readSidebarTitleFromResource: !0,
  ConfirmCellPhoneForRequest: !1,
  sendSMS: "http://esupt.isfahan.ir/safagateway/sms",
  CiCity: "103",
  sendToBackOldMethod: !1,
  archiveCommission: {
    username: "com100",
    password: "S@faSQL"
  },
  archiveCore: {
    baseUrls: [
      {
        key: "SrvArchive",
        value: "http://esupt.isfahan.ir/safagateway/archive/"
      }
    ],

    district: {
      1: {
        username: "archivem1",
        password: "S@faSQL"
      },
      2: {
        username: "archivem2",
        password: "S@faSQL"
      },
      3: {
        username: "archivem3",
        password: "S@faSQL"
      },
      4: {
        username: "archivem4",
        password: "S@faSQL"
      },
      5: {
        username: "archivem5",
        password: "S@faSQL"
      },
      6: {
        username: "archivem6",
        password: "S@faSQL"
      },
      7: {
        username: "archivem7",
        password: "S@faSQL"
      },
      8: {
        username: "archivem8",
        password: "S@faSQL"
      },
      9: {
        username: "archivem9",
        password: "S@faSQL"
      },
      10: {
        username: "archivem10",
        password: "S@faSQL"
      },
      11: {
        username: "archivem11",
        password: "S@faSQL"
      },
      12: {
        username: "archivem12",
        password: "S@faSQL"
      },
      13: {
        username: "archivem13",
        password: "S@faSQL"
      },
      14: {
        username: "archivem14",
        password: "S@faSQL"
      },
      15: {
        username: "archivem15",
        password: "S@faSQL"
      },
      ApprovalCertificate: {
        username: "approvalcertificate",
        password: "S@faSQL"
      }
    },
    username: "approvalcertificate",
    password: "S@faSQL"
  },
  archiveTablet: {
    username: "archivem13",
    password: "S@faSQL"
  },
  archivefire: {
    username: "fire",
    password: "S@faSQL"
  },
  securityArchiveCore: {
    baseUrl: "http://esupt.isfahan.ir/safagateway/archive/", // "http://esupt.isfahan.ir/safagateway/archive/", //"http://esupt.isfahan.ir/ArchivecoreUI/",
    username: "archivem13",
    password: "S@faSQL"
  },
  btnSodorGavahi: !1,
  highlightNewFile: !0,
  infoGroupCombo: {
    isShowBaseInfoGroupCombo: !0,
    isShowBaseInfoGroupComboForTajmiBasedOnRequest: !0,
    infoGroupOptions: [
      {
        ID: 0,
        Title: "اطلاعات پرونده"
      },
      // {
      // ID: 1,
      // Title: "بازدید"
      // },
      // {
      // ID: 3,
      // Title: "مجاز پایانکار"
      // },
      {
        ID: 100,
        Title: " نوسازی "
      }
    ]
  },
  reportConfig: {
    treeVisibility: !0,
    ciServiceURL: "http://esupt.isfahan.ir/safagateway/ciservice", // "http://esupt.isfahan.ir/Api_CiService/",
    ciServiceDomain: "CI_SaraM1",
    rootReport: {
      Path: "/",
      ReportName: "Root",
      Description: "Root"
    },
    reportManagerServiceURL:
      "http://esupt.isfahan.ir/safagateway/RptServices10",
    reportManagerServiceURL2:
      "http://esupt.isfahan.ir/safagateway/RptServices10",
    reportManagerServiceURL3:
      "http://esupt.isfahan.ir/safagateway/RptServices10",
    reportManagerServiceURL4:
      "http://esupt.isfahan.ir/safagateway/RptServices10"
  },
  serviceGateway: "", // "http://esupt.isfahan.ir:1012",
  crudBaseUrl: "http://esupt.isfahan.ir/safagateway/crowd",
  reportUrl: "http://esupt.isfahan.ir/safagateway/RptViewer10", // "http://esupt.isfahan.ir/ReportManager/RptViewer10/Viewer/RptViewer.aspx",
  avatarBaseUrl: "http://esupt.isfahan.ir/Api_Security/avatar/", // "http://esupt.isfahan.ir/Api_Security/avatar/",//"http://esupt.isfahan.ir/Api_Getway/security/avatar/"
  kartableConfig: {
    columns: [
      {
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
        width: 250
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
  InsuranceDistricts: [13, 7, 1],
  EnumDutyFicheStatus: {
    Confirm: 1,
    PermanentExport: 0,
    Cancel: 2,
    TemporaryExport: 3
  },
  ignoreWorkflowDeffs: [
    "02969d71-0f39-4a6c-92f8-236dbedc6c40"
    // "02969d71-0f39-4a6c-92f8-236dbedc6c40"//02969d71-0f39-4a6c-92f8-236dbedc6c40
  ],
  sketchUrl: "http://esupt.isfahan.ir/SketchService",
  workflowNotSendMsgCaption: "درخواست به دلایل زیر ، قابل ارسال نیست .",
  esupParams: {
    IsEditInExpertHasVote: true,
    TitleMeetinginExpert: "با حضور نماینده",
    IsCheckBalckList: true,
    ViewLegalExpert: true,
    IsShowHistoryVoteInExpert: true,
    IsMashhad: false,
    IsActiveToken: false,
    AgentDefineDraft: false,
    AccessExpertReportByTaskTitel: false,
    SetHistoryRowColorByCI_VoteType: false,
    ISShowCombo_Evaluatione: false,
    ShowHoghoghiButton: true,
    IsHideVoteTime: true,
    IsHideVoteDate: false,
    HideMojazParvaneh: true,
    HideExecuteVote: false,
    UseEditVoteLimit: false,
    ShowVoteType: true,
    AllowPurchaseMethodeInPOS: true,
    HideRejectBadvi: false,
    ShowBadviMade63: true,
    ShowEslahiButton: false,
    SetRegionByUserLocation: false,
    CheckBadviVoteDate: true,
    OutOfRangeCI_BoundCodes: "2",
    CheckK: true,
    DefaultArchiveGroupTitle: "بایگانی",
    IsClearCalculateTextBox: true,
    CommissionReportPath: "/ComReport/", // "/CommissionReports/ComReport/"
    IsCheckAllTrepass: true,
    Commission_AddPrintPreviewParameter: false,
    CalculateBeforeAcceptVote: true,
    IsPerformKCoefficientInVote: false,
    CheckDeleteHoghoghi: false,
    ResetKCoeffiecient: false,
    UseGhararKartabl: true,
    ChangeRdlCommissionVoteOfAgentForQom: false,
    CheckRenderVoteInArchive: true,
    ExportToArchiveByAgentCount: false,
    AddToArchiveAfterSend: true,
    ReportToArchiveAfterSend: true,
    IsConnectToSara8: true,
    ConfirmEditVote: true,
    AcceptVoteByAgent: true,
    ShowBuildingPoliceTab: false,
    AllowCancelGroupId: "4656289A-1862-4D36-9A14-9BCC41BB0B92",
    VoteTrepassesCellActions: false,
    ConfirmVoteTwoFactor: false,
    IsChechVoteOwner: false,
    PersonelResource_NidWorkflowDeff: {
      User: "6c8c18a6-74a9-4c05-80b3-0baf80c8c009",
      Daftar: "9c8b29b1-af16-4535-bf9c-c7795477aadc",
      Self: "a646f90c-76f5-4c42-868a-b572f06f226c",
      Cut: "D435E022-F3A9-4858-999D-697C60B6D5E4"
    },
    MabarNidWorkflowDeff: [
      {
        ID: "92caebe2-9f3b-439b-b0b3-2277dd142fa2",
        Title: "شورای معابر",
        NidEntity: 303
      },
      {
        ID: "ecb8f839-d9e0-4a80-9672-033210def175",
        Title: "تایید طرح تفکیک",
        NidEntity: 304
      },
      {
        ID: "94d1e36d-379e-41ce-9348-f841ce079092",
        Title: "شورای معابر و تایید طرح تفکیک",
        NidEntity: 305
      },
      {
        ID: "1665dc33-c957-4d55-b137-f1d8f43cfbba",
        Title: "اولويت بندي",
        NidEntity: 306
      }
    ],
    EngResource: {
      NidWorkflowDeff: "1bdf4a5e-bf78-41fe-b003-c01eaca4b1da"
    },
    taskLauncherSendReferenceValidator: {
      persianChars: !0,
      englishChars: !0,
      speicalChars: !1,
      digitChars: !0,
      spaceChars: !0
    }
  }
}
