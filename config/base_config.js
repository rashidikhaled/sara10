// eslint-disable-next-line no-unused-vars
const appConfig = {
  ArchiveDefaultSort: "desc", // 'desc' or 'asc'
  showUserNameWatermark: !1,
  InsuranceDistricts: [13, 7, 1],
  EnumDutyFicheStatus: {
    Confirm: 1,
    PermanentExport: 0,
    Cancel: 2,
    TemporaryExport: 3
  },
  nosaziCodePattern: "2-2-5-5-3-3-3",
  engineer: {
    userGroups: [
      "06191D4D-8D9D-44FC-9FE8-0756E0CFD984",
      "37ECEDC1-5E95-4F98-B752-FEBB89482D2F"
    ]
  }, // هنگام لاگین یوزرهای مهندس ،کارتابل ارجاعات در کنار کارتابل اصلی لود میشود
  // EngineerGroupGuid: [],
  // esupParams:{IsEditInExpertHasVote:!1,TitleMeetinginExpert:!1,IsCheckBalckList:!1,ViewLegalExpert:!1,IsShowHistoryVoteInExpert:!1,IsMashhad:!1,IsActiveToken:!1,AgentDefineDraft:!0,ISShowCombo_Evaluatione:!1,ShowHoghoghiButton:!0,IsHideVoteTime:!1,IsHideVoteDate:!1,HideMojazParvaneh:!1,HideExecuteVote:!1,UseEditVoteLimit:!1,ShowVoteType:!0,AllowPurchaseMethodeInPOS:!0},
  sketchUrl: "http://dev.safarayaneh.com:7000/SketchService",
  workflowNotSendMsgCaption: "عنوان این قسمت از تنظیمات خوانده میشود:",
  ignoreWorkflowDeffs: [
    "D1094A8B-4251-4785-A09D-C5E0A2565503",
    "083a69f2-38f9-44c9-8d19-2d27c44742fc",
    "9D3A93C8-AF0C-4D46-B66B-C36FFC3A80D2"
  ],
  // mapServiceUrl: 'http://dev.safarayaneh.com:7000/vsdisara/',
  srvMapUrl: "http://dev.safarayaneh.com:7000/SafaGateway/SrvMap/",
  MapExportUrl: "http://dev.safarayaneh.com:7000/Api_MapExport/",
  MapExportUrlFile: "http://dev.safarayaneh.com:7000/ex/",
  MapNetworkUrl: "http://dev.safarayaneh.com:7000/SafaGateway/GasRelight",
  PngUrl: "http://dev.safarayaneh.com:7000/PNG/", // MapSerachUrl: "http://192.168.110.11/SearchService/",
  MapSerachUrl: "http://dev.safarayaneh.com:7000/SearchService/engine/search/",
  mapConfig: {
    lat: 36.29,
    long: 50.0,
    center: [36.2958183, 50.00956034],

    Zoom: 18,
    NidLayer: 32,
    maxZoom: 22,
    mojoodLayerIDs: "32,775",
    DefaultSelectLayer: 32,
    DefaultSelectLayerName: "لایه وضع موجود",
    DefaultSelectLayerBuffer: 0,
    MapNosaziCodeDigits: 4,
    DefaultDomain: "ایران",
    PrintTitle: "صفارایانه"
  },

  PanoUrl: "http://dev.safarayaneh.com:7000/ShahrNama/GisProxy/PanoService/",
  panoConfig: {
    layerSets: {
      1393: [1],
      1392: [2, 102],
      1391: [3]
    },
    layerSet: "1393"
  },

  limitIdleTime: 15,
  enumDutyFicheExportType: {
    isDangi: 6,
    isAllalHesab: 2,
    isTaghsit: 8
  },
  citizenBaseUrl: "http://dev.safarayaneh.com:7000/Citizen",
  archiveEntities: {
    survey: 63
  },
  archiveSendUserGroup: false,
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
      Id: 2
    },
    {
      Title: "5",
      Id: 2
    }
  ],
  ciServiceUrl: "http://dev.safarayaneh.com:7000/SafaGateway/CI",
  HasEngineeringSystem: 2,
  SO: "http://dev.safarayaneh.com:7000/SafaGateway/SO",
  engineers: "http://dev.safarayaneh.com:7000/SafaGateway/SrvEng",
  engActivity: "http://dev.safarayaneh.com:7000/SafaGateway/SrvEng",
  FireService: "http://dev.safarayaneh.com:7000/SafaGateway/Fire",
  SA: {
    1: "http://dev.safarayaneh.com:7000/SafaGateway/SA1",
    2: "http://dev.safarayaneh.com:7000/SafaGateway/SA2",
    3: "http://dev.safarayaneh.com:7000/SafaGateway/SA3"
  },
  SB: {
    1: "http://dev.safarayaneh.com:7000/SafaGateway/SB1",
    2: "http://dev.safarayaneh.com:7000/SafaGateway/SB2",
    3: "http://dev.safarayaneh.com:7000/SafaGateway/SB3"
  },
  SC: {
    1: "http://dev.safarayaneh.com:7000/SafaGateway/SC1",
    2: "http://dev.safarayaneh.com:7000/SafaGateway/SC2",
    3: "http://dev.safarayaneh.com:7000/SafaGateway/SC3"
  },
  SD: {
    1: "http://dev.safarayaneh.com:7000/SafaGateway/SD1",
    2: "http://dev.safarayaneh.com:7000/SafaGateway/SD2",
    3: "http://dev.safarayaneh.com:7000/SafaGateway/SD3"
  },
  SI: {
    1: "http://dev.safarayaneh.com:7000/SafaGateway/SI1",
    2: "http://dev.safarayaneh.com:7000/SafaGateway/SI2",
    3: "http://dev.safarayaneh.com:7000/SafaGateway/SI3"
  },
  SX: {
    1: "http://192.168.100.170/SafaGateway/SX1",
    2: "http://192.168.100.170/SafaGateway/SX2"
  },
  SQ: "http://dev.safarayaneh.com:7000/SafaGateway/SQ1",
  SJ: "http://dev.safarayaneh.com:7000/SafaGateway/SJ",
  ES: "http://dev.safarayaneh.com:7000/SafaGateway/Estate",
  SH: "http://dev.safarayaneh.com:7000/SafaGateway/SH",
  generalIncome: "http://dev.safarayaneh.com:7000/SafaGateway/ST",
  CadWs: "http://dev.safarayaneh.com:7000/Cadws/CadWs.svc",
  comSad: {
    1: "http://dev.safarayaneh.com:7000/SafaGateway/CommissionService"
  },
  commissions: "http://dev.safarayaneh.com:7000/SafaGateway/CommissionService",
  srvCommission: "http://dev.safarayaneh.com:7000/SafaGateway/SrvCommission",
  commission77: "http://dev.safarayaneh.com:7000/SafaGateway/SrvCommission77",
  commission5: "http://dev.safarayaneh.com:7000/SafaGateway/SrvCommission5",
  excavation: "http://dev.safarayaneh.com:7000/SafaGateway/Dig",
  posProtocol: "http:", // این کانفیگ برای تعیین پروتکل در بانک شهر استفاده شده و فعلا این دستگاه در حالت اچ تی تی پی کار میکند.
  Commission77ReportPath: "/Com77",

  esupParams: {
    IsEditInExpertHasVote: false,
    TitleMeetinginExpert: false,
    IsCheckBalckList: true,
    ViewLegalExpert: false,
    IsShowHistoryVoteInExpert: false,
    IsMashhad: false,
    IsActiveToken: false,
    AgentDefineDraft: true,
    AccessExpertReportByTaskTitel: false,
    SetHistoryRowColorByCI_VoteType: false,
    ISShowCombo_Evaluatione: false,
    ShowHoghoghiButton: true,
    IsHideVoteTime: false,
    IsHideVoteDate: false,
    HideMojazParvaneh: false,
    HideExecuteVote: false,
    UseEditVoteLimit: false,
    ShowVoteType: true,
    AllowPurchaseMethodeInPOS: true,
    HideRejectBadvi: false,
    ShowBadviMade63: true,
    ShowEslahiButton: true,
    SetRegionByUserLocation: false,
    CheckBadviVoteDate: false,
    TokenCount: 1,
    OutOfRangeCI_BoundCodes: "2",
    CheckAgentsOpinionForActivationPrintVote: true,
    SetListOfAgentModeBasedOnToken: false, //   این برای حالتی هست که نماینده ای که توکن فعال به سیستم را دارد فقط بتونه اعلام نظر کند
    CheckK: false,
    IsClearCalculateTextBox: true,
    CommissionReportPath: "/CommissionReports/ComReport/",
    IsCheckAllTrepass: false,
    Commission_AddPrintPreviewParameter: false,
    CalculateBeforeAcceptVote: false,
    IsPerformKCoefficientInVote: false,
    CheckDeleteHoghoghi: false,
    ResetKCoeffiecient: false,
    ShowVotePrintAgain: true,
    UseGhararKartabl: true,
    ChangeRdlCommissionVoteOfAgentForQom: false,
    CheckRenderVoteInArchive: false,
    ExportToArchiveByAgentCount: false,
    AddToArchiveAfterSend: true,
    ReportToArchiveAfterSend: false,
    ValidationCheckInTransmitter: true, // بررسی ضرورت اینپوت در فرم انتقال سند - املاک
    IsConnectToSara8: true,
    AcceptVoteByAgent: true,
    ShowBuildingPoliceTab: false,
    IsChechVoteOwner: true,
    ConfirmEditVote: true,
    DefaultArchiveGroupTitle: "بایگانی",
    IsShowEstenkafiParameter: false,
    checkingUserNationalCodeAfterLogin: false,
    Com77NidWorkflowDeff: {
      NidWorkflowDeff: "abd03b6c-9984-4225-a0cd-162c347249f5"
    },
    ShowVotingMaxMinPenaltyBtn: true, // درصورت ترو بودن یا عدم وجود این مقدار: نمایش دکمه محاسبه حداقل و حداکثر جریمه در فرم صدور رای. درصورت فالس بودن: جمع اعداد ستون رو نمایش میدهد
    ReadOnlyCommissionDate: false,
    SetAgentDesc: false,
    AllowCancelGroupId: "C1DA2ECE-2EBC-493A-94E3-687789CAE11C", // گه مقدار true باشه مثل حالت قدیم دکمه بازگشت گردش کار کار می کند اگه هم فالس بود شیوه جدید پیاده میشه
    sendToBackOldMethod: true, // Old Way If True
    // Dig_NidWorkflowDeff: '884b57d2-d9f5-4500-a810-13e059411a5c',
    Dig_NidWorkflowDeff: {
      NidWorkFlowDef_Request: "48e0511f-67d8-4bf8-91a8-accc4a3c15b9", // "ثبت درخواست انشعابات شخصی"
      NidWorkFlowDef_Request_Service: "884b57d2-d9f5-4500-a810-13e059411a5c", // "ثبت درخواست طرح های توسعه"
      NidWorkFlowDef_Request_Events: "67e0e796-68e6-4515-b4ee-b28ef0050bd9", // "ثبت درخواست اتفاقات"
      RequestIncome: {
        IncomeReqNidWorkflowDeff: "4C14150E-06E2-4F01-AEA7-8A64D6883C8D"
      }
    },
    ClsDigParams: {
      // تنظیمات مربوط به زیرسیستم حفاری
      DigUsersNidGroup: "b6358998-83ee-412d-9dfc-2f54cda273ce",
      IsMashhad: !1,
      ISConfrimFicheByPose: !1,
      OnlinePaymentNosaziUrl: !1,
      ShowPriceRegion: !1,
      DoNotSaveFullUserNameInInquiry: "",
      ReportDirectoryPath: ""
    }
  },
  VoteTrepassesCellActions: true,
  taskSendToBackReasonValidator: {
    persianChars: true,
    englishChars: true, // a-zA-Z
    speicalChars: false, // [_+)(*&^%$#@!)]
    digitChars: true, // 0-9
    spaceChars: true
  },
  eng: "http://dev.safarayaneh.com:7000/SafaGateway/SrvEng",
  esup: "http://dev.safarayaneh.com:7000/Esup/EsupService.svc",
  task: "http://dev.safarayaneh.com:7000/Task/TaskService.svc",
  workflow: "http://dev.safarayaneh.com:7000/SafaGateway/workflow",
  securityBaseUrl: "http://dev.safarayaneh.com:7000/SafaGateway/Security",
  socket: {
    enabled: false,
    baseUrl: "http://dev.safarayaneh.com:7000/SafaGateway/Security"
  },
  security: {
    suppressShowNewSessionDialog: true,
    suppressMessagePopup: true,
    suppressClearSession: true,
    clearSessionOnCloseBrowser: true,
    settingPayloadBase64: false,
    autocomplete: true,
    togglePasswordVisibility: true,
    allowResetPassword: true,
    showOtherLoginMethods: true,
    showArchiveDWG: true,
    allowHardwareToken: true
  },
  securityPanel: {
    url: "http://localhost:3008/",
    target: '_blank'
  },
  monitoring:
    "http://dev.safarayaneh.com:7000/SafaGateway/srvmonitoring/monitoring/",
  safaAuth: "http://dev.safarayaneh.com:7000/Security8/Service/SafaAuth.svc",
  dashboardServiceURL: "http://sdi.mashhad.ir:8040/Dashbord/Dashbord",
  ConfirmCellPhoneForRequest: !1,
  sendSMS: "http://dev.safarayaneh.com:7000/SMSService/Sms/SrvScheduleSMS.svc",
  CiCity: "6",
  archiveCore: {
    baseUrls: [
      {
        key: "SrvArchive",
        value: "http://dev.safarayaneh.com:7000/SafaGateway/ArchiveCore/"
      }
    ],
    district: {
      1: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      2: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      3: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      4: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      5: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      7: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      8: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      ApprovalCertificate: {
        username: "approvalcertificate",
        password: "Saf@#qc321"
      }
    },
    username: "sara10",
    password: "Saf@#qc321"
  },
  archiveCitizen: {
    nidTree: 65,
    district: {
      1: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      2: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      3: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      4: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      5: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      7: {
        username: "sara10",
        password: "Saf@#qc321"
      },
      8: {
        username: "sara10",
        password: "Saf@#qc321"
      }
    },
    username: "sara10",
    password: "Saf@#qc321"
  },
  archiveConfig: {
    usePriority: true,
    highlightNewFile: true,
    EntityIdArchive: 0
  },
  archiveTablet: {
    username: "saratablet",
    password: "Saf@#qc321"
  },
  archiveEngineer: {
    username: "archiveengineer",
    password: "Saf@#qc321"
  },
  archiveUGP: {
    username: "archiveUGP",
    password: "Saf@#qc321"
  },
  archiveEngineersCertificate: {
    username: "archiveengineercertificate",
    password: "Saf@#qc321"
  },
  archivePolice: {
    username: "buildingpolice",
    password: "Saf@#qc321"
  },
  archivePlanBank: {
    username: "sara10",
    password: "Saf@#qc321"
  },
  archiveEstate: {
    username: "sara10",
    password: "Saf@#qc321"
  },
  archiveCommission: {
    username: "comm100",
    password: "Saf@#qc321"
  },
  archiveCommission77: {
    username: "comm77",
    password: "Saf@#qc321"
  },
  archiveDig: {
    username: "archiveDig",
    password: "Saf@#qc321"
  },
  archiveSurvay: {
    username: "Survey",
    password: "Saf@#qc321"
  },
  securityArchiveCore: {
    baseUrl: "http://dev.safarayaneh.com:7000/SafaGateway/ArchiveCore",
    username: "sara10",
    password: "Saf@#qc321"
  }, // infoGroupCombo: { isShowBaseInfoGroupCombo: !0, isShowBaseInfoGroupComboForTajmiBasedOnRequest: !0 },
  infoGroupCombo: {
    isShowBaseInfoGroupCombo: !0,
    isShowBaseInfoGroupComboForTajmiBasedOnRequest: !0,
    infoGroupOptions: [
      {
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
      },
      {
        ID: 100,
        Title: " نوسازی "
      }
    ]
  },
  reportConfig: {
    treeVisibility: !0,
    ciServiceURL: "http://dev.safarayaneh.com:7000/SafaGateway/CI",
    ciServiceDomain: "CI_SaraM1",
    rootReport: {
      Path: "/",
      ReportName: "Root",
      Description: "Root"
    },
    reportManagerServiceURL:
      "http://dev.safarayaneh.com:7000/SafaGateway/RptService",
    reportManagerServiceURL2:
      "http://dev.safarayaneh.com:7000/SafaGateway/RptService",
    reportManagerServiceURL3:
      "http://dev.safarayaneh.com:7000/SafaGateway/RptService",
    reportManagerServiceURL4:
      "http://dev.safarayaneh.com:7000/SafaGateway/RptService"
  },
  systemReportUrl: "http://dev.safarayaneh.com:7000/SafaGateway/RptService",
  systemReportViewer:
    "http://dev.safarayaneh.com:7000/ReportService/RptViewer14/Viewer/RptViewer.aspx",
  formReportUrl: "http://dev.safarayaneh.com:7000/SafaGateway/RptService",
  formRptViewerUrl:
    "http://dev.safarayaneh.com:7000/ReportService/RptViewer14/Viewer/RptViewer.aspx",
  dashboard: {
    show: true,
    serviceUrl: "http://localhost:6040/api/Report/Dashboard"
  },
  serviceGateway: "",
  crudBaseUrl: "http://dev.safarayaneh.com:7000/SafaGateway/crowd/",
  reportUrl:
    "http://dev.safarayaneh.com:7000/ReportService/RptViewer14/Viewer/RptViewer.aspx",
  avatarBaseUrl: "http://dev.safarayaneh.com:7000/SafaGateway/Security/avatar/",
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
  shahrsazi: {
    UElameZabeteCommission: {
      archive: {
        username: "commission100",
        password: "@rch!v3C0re",
        district: {
          1: {
            username: "archivem1",
            password: "@rch!v3C0re"
          },
          2: {
            username: "archivem2",
            password: "@rch!v3C0re"
          },
          3: {
            username: "archivem3",
            password: "@rch!v3C0re"
          },
          4: {
            username: "archivem4",
            password: "@rch!v3C0re"
          },
          5: {
            username: "archivem5",
            password: "@rch!v3C0re"
          },
          6: {
            username: "archivem6",
            password: "@rch!v3C0re"
          },
          7: {
            username: "archivem7",
            password: "@rch!v3C0re"
          },
          8: {
            username: "archivem8",
            password: "@rch!v3C0re"
          },
          9: {
            username: "archivem9",
            password: "@rch!v3C0re"
          },
          10: {
            username: "archivem10",
            password: "@rch!v3C0re"
          },
          11: {
            username: "archivem11",
            password: "@rch!v3C0re"
          },
          12: {
            username: "archivem12",
            password: "@rch!v3C0re"
          },
          13: {
            username: "archivem13",
            password: "@rch!v3C0re"
          },
          14: {
            username: "archivem14",
            password: "@rch!v3C0re"
          },
          15: {
            username: "archivem15",
            password: "@rch!v3C0re"
          },
          ApprovalCertificate: {
            username: "approvalcertificate",
            password: "@rch!v3C0re"
          }
        }
      }
    },
    UNewCodeRequest: {
      archive: {
        username: "UGP",
        password: "***"
      }
    }
  },
  StatisticReports: {
    ParentID: "E577CFF0-99EF-4B93-B97E-697299F7161F",
    ID: "35C2EF51-B0CA-4BED-81A0-3A8C12239AE8"
  },
  dig: {
    digReportPath: "/Dig/DigRpt"
  },
  // برای زیر سیستم امور مهندسین و عملکرد مهندسین
  engineersConfig: {
    reportPath: "/Engineers",
    hideEmptyEngineerInfoBox: true // عدم نمایش پاپاپ در زمان خالی بودن اطلاعات مهندس
  },
  "commission100": { ShowHouseArchiveOnly: false, disableVoteCheckForBackMethod: false }, // SARA10-287; لود آرشیو ملک در فرم های صدوررای و کارشناسی ( تب آرشیو شهرسازی ) در کمیسیون ماده 100
  gridOptions: {
    exportable: true, // فعال بودن/نبودن خروجی گرید شامل خروجی اکسل و غیره
    singleClickEdit: false, // ویرایش سطرها با یک کلیک
    groupable: true // فعال شدن قابلیت گروه بندی در گرید ها
  },
  "RevisitAgent": { disableTimeCheckForSelection: false }
}
