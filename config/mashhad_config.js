// eslint-disable-next-line no-unused-vars
const appConfig = {
  srvMapUrl: 'http://5.252.216.171/MapTest/', // 'http://5.252.216.171/Gateway/map',
  MapExportUrl: 'http://localhost:3000/',
  mapConfig: {
    lat: 36.3008,
    long: 59.5947,
    center: [59.5947, 36.3008],
    Zoom: 12,
    maxZoom: 22,
    NidLayer: 5,
    DefaultSelectLayer: 5,

    DefaultSelectLayerName: 'وضع موجود',

    DefaultSelectLayerBuffer: 1,
    mojoodLayerIDs: '5',
    MapNosaziCodeDigits: 4,
    SearchLayers: [5, 10096, 1991, 3710, 3706, 839]

  },
  enumDutyFicheExportType: {
    isDangi: 6,
    isAllalHesab: 2,
    isTaghsit: 8
  },
  captcha: {
    "enabled": true,
    "duration": 300,
    "level": 2
  },
  infoGroupCombo: {
    isShowBaseInfoGroupCombo: !0,
    isShowBaseInfoGroupComboForTajmiBasedOnRequest: !0,
    infoGroupOptions: [{
      ID: 0,
      Title: 'اطلاعات پرونده'
    },
    {
      ID: 1,
      Title: 'بازدید'
    },
    {
      ID: 3,
      Title: 'مجاز پایانکار'
    },
    {
      ID: 4,
      Title: 'هیچکدام'
    }
    ]
  },
  ArchiveDefaultSort: 'desc',

  PanoUrl: "http://esupservice.mashhad.ir:8104/PanoService/",
  panoConfig: {
    layerSets: {
      1392: [661]
    },
    layerSet: "1392"
  },

  archiveEntities: {
    survey: 63
  },
  districts: [{
    Title: '1',
    Id: 1
  },
  {
    Title: '2',
    Id: 2
  },
  {
    Title: '3',
    Id: 3
  },
  {
    Title: '4',
    Id: 4
  },
  {
    Title: '5',
    Id: 5
  },
  {
    Title: '6',
    Id: 6
  },
  {
    Title: '7',
    Id: 7
  },
  {
    Title: '8',
    Id: 8
  },
  {
    Title: '9',
    Id: 9
  },
  {
    Title: '10',
    Id: 10
  },
  {
    Title: '11',
    Id: 11
  },
  {
    Title: '12',
    Id: 12
  }
  ],

  HasEngineeringSystem: 0,
  mapServiceUrl: 'http://sdi.mashhad.ir:8040/vsdisara/',
  systemReportUrl: 'http://5.252.216.143/gateway/Report', // 'http://172.16.8.183/Report/RptService/Services/SafaReportService.svc', //'http://repservice.mashhad.ir/ReportService10/Services/SafaReportService.svc/json/',
  systemReportViewer: 'http://repservice.mashhad.ir/ReportViewer10/Viewer/RptViewer.aspx', // 'http://5.252.216.143/gateway/Viewer',
  ipfinder: 'http://5.252.216.51:8053',
  remainDays: 60,
  remainDaysNotice: 'کاربر گرامی، تا {0} روز دیگر حساب کاربری شما غیرفعال خواهد شد.',
  citizenBaseUrl: 'http://esup.mashhad.ir',
  socket: {
    baseUrl: "http://5.252.216.143/Api_Security",
    path: "/socket.io/",
    enabled: 1
  },
  ciServiceUrl: "http://5.252.216.143/gateway/ci/", // "https://Scity.mashhad.ir/gateway/ci/",
  engineers: "http://5.252.216.143/Gateway/Engineer",
  // "http://5.252.216.143/Engineer/Services/SrvEngineer.svc/json/",
  engActivity: "http://5.252.216.143/Engineer/Services/SrvEngineer.svc/json/",
  SA: {
    1: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    2: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    3: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    4: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    5: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    6: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    7: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    8: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    9: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    10: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    11: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    12: "http://5.252.216.143/Gateway/SA", // "http://5.252.216.143/Sara/SA/srvSA.svc",
    80: "http://5.252.216.143/Gateway/SA"// "http://5.252.216.143/Sara/SA/srvSA.svc"
  },
  SB: {
    1: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    2: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    3: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    4: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    5: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    6: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    7: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    8: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    9: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    10: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    11: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    12: "http://5.252.216.143/Gateway/SB", // "http://5.252.216.143/Sara/SB/srvSB.svc",
    80: "http://5.252.216.143/Gateway/SB" // "http://5.252.216.143/Sara/SB/srvSB.svc"
  },
  SC: {
    1: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    2: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    3: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    4: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    5: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    6: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    7: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    8: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    9: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    10: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    11: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    12: "http://5.252.216.143/Gateway/SC", // "http://5.252.216.143/Sara/SC/srvSC.svc",
    80: "http://5.252.216.143/Gateway/SC" // "http://5.252.216.143/Sara/SC/srvSC.svc"
  },
  SD: {
    1: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    2: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    3: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    4: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    5: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    6: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    7: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    8: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    9: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    10: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    11: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    12: "http://5.252.216.143/Gateway/SD", // "http://5.252.216.143/Sara/SD/srvSD.svc",
    80: "http://5.252.216.143/Gateway/SD" // "http://5.252.216.143/Sara/SD/srvSD.svc"
  },
  SI: {
    1: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    2: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    3: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    4: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    5: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    6: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    7: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    8: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    9: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    10: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    11: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    12: "http://5.252.216.143/Gateway/SI", // "http://5.252.216.143/Sara/SI/srvSI.svc",
    80: "http://5.252.216.143/Gateway/SI" // "http://5.252.216.143/Sara/SI/srvSI.svc"
  },
  SJ: "http://5.252.216.143/Gateway/SJ", // "http://city.mashhad.ir:8099/srvSJ.svc",
  SX: "http://5.252.216.143/Gateway/SX", // "http://5.252.216.143/Sara/SX/srvSX.svc",
  ES: "http://172.16.8.183/Amlak/Estate_Module_Publish/Services/SrvEstate.svc",
  generalIncome: "http://dev.safarayaneh.com:7000/ST/SrvST.svc/json/",
  SH: "http://5.252.216.143/Gateway/SH", // "http://5.252.216.143/Sara/SH/srvSH.svc",
  CadWs: "http://192.168.100.170:7000/Cadws/CadWs.svc",
  FireService: "http://dev.safarayaneh.com:7000/Fire/FireService/FireService.svc",
  commissions: "http://5.252.216.143/Gateway/CommissionService", // "http://5.252.216.143/Com100/ComService/Services/CommissionService.svc/json/",

  srvCommission: "http://5.252.216.143/Gateway/SrvCommission", // "http://5.252.216.143/Com100/SrvCommision/SrvCommission.svc/json/",
  eng: "http://5.252.216.143/Gateway/Engineer", // "http://5.252.216.143/Engineer/Services/SrvEngineer.svc",
  esup: "http://172.16.8.183/Esup/EsupService.svc",
  task: "http://172.16.8.183/TaskService/TaskService.svc",
  workflow: "http://5.252.216.143/Gateway/Workflow", // "http://5.252.216.143/Workflow",
  securityBaseUrl: "http://5.252.216.143/Gateway/security", // "http://5.252.216.143/Api_Security",
  monitoring: "http://5.252.216.143/Gateway/monitoring/",
  monitoringOptions: {
    allowShowPanel: false
  },
  safaAuth: "http://192.168.100.170:7000/Security8/Service/SafaAuth.svc",
  dashboardServiceURL: "http://sdi.mashhad.ir:8040/Dashbord/Dashbord",
  ConfirmCellPhoneForRequest: !1,
  sendSMS: "http://172.16.8.183/SrvScheduleSMS.svc",
  CiCity: "2",

  archiveCore: {
    baseUrls: [{
      key: "SrvArchive",
      value: "http://5.252.216.143/Gateway/Archive" // "https://scity.mashhad.ir/Gateway/Archive"
    }],
    district: {
      1: {
        username: "sara1",
        password: "ark@2993"
      },
      2: {
        username: "sara2",
        password: "ark@2993"
      },
      3: {
        username: "sara3",
        password: "ark@2993"
      },
      4: {
        username: "sara4",
        password: "ark@2993"
      },
      5: {
        username: "sara5",
        password: "ark@2993"
      },
      6: {
        username: "sara6",
        password: "ark@2993"
      },
      7: {
        username: "sara7",
        password: "ark@2993"
      },
      8: {
        username: "sara8",
        password: "ark@2993"
      },
      9: {
        username: "sara9",
        password: "ark@2993"
      },
      10: {
        username: "sara10",
        password: "ark@2993"
      },
      11: {
        username: "sara11",
        password: "ark@2993"
      },
      12: {
        username: "sara12",
        password: "ark@2993"
      },
      80: {
        username: "sara80",
        password: "ark@2993"
      },
      ApprovalCertificate: {
        username: "approvalcertificate",
        password: "ark@2993"
      }
    },
    username: "sara1",
    password: "ark@2993"
  },
  securityArchiveCore: {
    baseUrl: "https://5.252.216.143/Gateway/Archive", // "https://scity.mashhad.ir/Gateway/Archive",
    username: "logface",
    password: "123"
  },
  archiveTablet: {
    username: 'saratablet',
    password: 'ark@2993'
  },
  archiveCommission: {
    username: 'commission',
    password: 'ark@2993'
  },
  archiveWebEng: {
    username: 'engineer',
    password: 'ark@2993'
  },
  archivePolice: {
    username: 'policenew',
    password: 'ark@2993'
  },

  serviceGateway: "",

  reportConfig: {
    treeVisibility: !0,
    ciServiceURL: "http://5.252.216.51/Ci_Manager",
    ciServiceDomain: "CI_SaraM1",
    rootReport: {
      Path: "/",
      ReportName: "Root",
      Description: "Root"
    },
    reportManagerServiceURL: "http://172.16.8.183:8000/RptService/Services/SafaReportService.svc",
    reportManagerServiceURL2: "http://172.16.8.183:8000/RptService/Services/SafaReportService.svc",
    reportManagerServiceURL3: "http://repservice.mashhad.ir:8017/Services/SafaReportService.svc",
    reportManagerServiceURL4: "http://repservice.mashhad.ir:8017/Services/SafaReportService.svc"
  },
  formReportUrl: "http://repservice.mashhad.ir:8007/Services/SafaReportService.svc",
  crudBaseUrl: "http://City.mashhad.ir:8066/SrvCrowdNew.svc/json/",
  ReportRule: "http://dev.safarayaneh.com:7000/ReportRule/ReportRule.svc",
  reportUrl: 'http://repservice.mashhad.ir:9000/Viewer/RptViewer.aspx',
  avatarBaseUrl: 'http://5.252.216.143/security/',
  kartableConfig: {
    columns: [{
      field: "NidWorkItem",
      width: 70
    }, {
      field: "Task",
      width: 300
    }, {
      field: "WorkflowTitel",
      width: 100
    }, {
      field: "BizCode",
      width: 200
    }, {
      field: "IconUrl",
      width: 80
    }, {
      field: "ProcInitiatorName",
      width: 120
    }, {
      field: "GroupTitel",
      width: 100
    }, {
      field: "StartDate",
      width: 120
    }, {
      field: "StartDate",
      width: 120
    }, {
      field: "Comments",
      width: 200
    }]
  },

  InsuranceDistricts: [13, 7, 1],
  EnumDutyFicheStatus: {
    Confirm: 1,
    PermanentExport: 0,
    Cancel: 2,
    TemporaryExport: 3
  },
  ignoreWorkflowDeffs: ["519843d5-2e7b-405a-bbd7-9d1a2bd2130d", "e4e4f886-8a09-4190-a668-a103e5ae715e", "aaf3f4ec-be41-4902-8d41-1ed2a150c3e0", "09ada8dc-8ad4-4b29-a383-ea23a3776776", "cb5e6531-7303-4b5c-8f6b-da562a5321cf"],
  sketchUrl: "https://scity.mashhad.ir/Sketch",
  userProfileAcceptableFormats: [".png", ".jpg", "jpeg"],
  limitIdleTime: 120,
  userProfileMaximumSize: "2",
  checkingUserNationalCodeAfterLogin: false,
  sendToBackOldMethod: true,
  dashboard: {
    show: false,
    serviceUrl: 'http://localhost:6040/api/Report/Dashboard'
  },
  MamoorBazdid: {
    groupsId: ["4259E59F-4DDA-45EB-8C94-60771FE6D8DD"]
  },

  esupParams: {
    PersonelResource_NidWorkflowDeff: {
      User: "e4e4f886-8a09-4190-a668-a103e5ae715e",
      Daftar: "aaf3f4ec-be41-4902-8d41-1ed2a150c3e0",
      Self: "09ada8dc-8ad4-4b29-a383-ea23a3776776",
      Cut: "cb5e6531-7303-4b5c-8f6b-da562a5321cf"
    },
    Violation_NidWorkflowDeff: {
      NidWorkflowDeffNew: '7f1b13ea-8598-4535-979a-a1044c4463a7',
      NidWorkflowDeffReview: '7f1b13ea-8598-4535-979a-a1044c4463a7'
    },
    ConvertResource: {
      ConvertReqNidWorkflowDeff: '0b711649-37c9-452c-97cf-ba0db57c662b'
    },

    taskSendToBackReasonValidator: {
      persianChars: true,
      englishChars: false, // a-zA-Z
      speicalChars: false, // [_+)(*&^%$#@!)]
      digitChars: true, // 0-9
      spaceChars: true
    },
    CutTreeConfig: {
      CutTreeUsername: 'GreenService',
      CutTreePassword: 'd158aeeb-eaff-4182-88e8-67b47e3076ba'
    },

    VoteTrepassesCellActions: true,
    AllowCancelGroupId: "63367D12-E1BD-443B-BF29-9FBC6B27C26E",
    IsEditInExpertHasVote: false,
    TitleMeetinginExpert: false,
    IsCheckBalckList: false,
    ViewLegalExpert: true,
    IsShowHistoryVoteInExpert: true,
    IsMashhad: true,
    IsActiveToken: true,
    AgentDefineDraft: false,
    AccessExpertReportByTaskTitel: false,
    SetHistoryRowColorByCI_VoteType: false,
    ISShowCombo_Evaluatione: true,
    ShowHoghoghiButton: true,
    IsHideVoteTime: false,
    IsHideVoteDate: false,
    HideExecuteVote: true,
    UseEditVoteLimit: false,
    ShowVoteType: false,
    AllowPurchaseMethodeInPOS: true,
    HideRejectBadvi: true,
    ShowBadviMade63: true,
    ShowEslahiButton: true,
    SetRegionByUserLocation: false,
    CheckBadviVoteDate: false,
    OutOfRangeCI_BoundCodes: '2',
    CommissionReportPath: "/CommissionReports/ComReport/",
    HideMojazParvaneh: false,
    CheckK: true,
    IsClearCalculateTextBox: false,
    IsCheckAllTrepass: false,
    Commission_AddPrintPreviewParameter: false,
    CalculateBeforeAcceptVote: true,
    IsPerformKCoefficientInVote: false,
    CheckDeleteHoghoghi: false,
    ResetKCoeffiecient: false,
    UseGhararKartabl: true,
    ChangeRdlCommissionVoteOfAgentForQom: false,
    CheckRenderVoteInArchive: true,
    ExportToArchiveByAgentCount: false,
    AddToArchiveAfterSend: false,
    ReportToArchiveAfterSend: false,
    IsConnectToSara8: true,
    AcceptVoteByAgent: true,
    ShowBuildingPoliceTab: true,
    IsChechVoteOwner: true,
    ConfirmEditVote: true
  }
}
