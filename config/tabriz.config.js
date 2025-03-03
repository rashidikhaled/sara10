// eslint-disable-next-line no-unused-vars
const appConfig = {
  ArchiveDefaultSort: "desc",
  showUserNameWatermark: !1,
  InsuranceDistricts: [13, 7, 1],
  EnumDutyFicheStatus: {
    Confirm: 1,
    PermanentExport: 0,
    Cancel: 2,
    TemporaryExport: 3
  },
  security: {
    suppressShowNewSessionDialog: true,
    suppressClearSession: true
  },
  nosaziCodePattern: "2-4-5-5-5-5-3",
  sketchUrl: "https://esup.tabriz.ir/SketchService",
  workflowNotSendMsgCaption: "عنوان این قسمت از تنظیمات خوانده میشود:",
  ignoreWorkflowDeffs: ["D1094A8B-4251-4785-A09D-C5E0A2565503", "083a69f2-38f9-44c9-8d19-2d27c44742fc", "9D3A93C8-AF0C-4D46-B66B-C36FFC3A80D2", "9aefba51-e4e0-4849-812c-a2b29eb0808b", "42a8c76f-30bc-49b8-9384-0839502ca2b4"],
  srvMapUrl: "https://esup.tabriz.ir/Gateway/map/",
  srvMapUrl2: "https://esup.tabriz.ir/Gateway/map/",
  MapExportUrl: "https://esup.tabriz.ir/Gateway/map",
  MapExportUrlFile: "https://esup.tabriz.ir/ex/",
  MapNetworkUrl: "https://esup.tabriz.ir/Gateway/GasRelight",
  PngUrl: "https://esup.tabriz.ir/PNG/",
  MapSerachUrl: "https://esup.tabriz.ir/Gateway/SearchServic/engine/search/",
  ipfinder: "https://esup.tabriz.ir:3019",
  mapConfig: {
    lat: 34.7983,
    long: 48.5148,
    center: [46.27, 38.06],
    Zoom: 16,
    NidLayer: 277,
    maxZoom: 22,
    mojoodLayerIDs: "277",
    DefaultSelectLayer: 277,
    DefaultSelectLayerName: "لایه وضع موجود",
    DefaultSelectLayerBuffer: 0,
    MapNosaziCodeDigits: 4,
    DefaultDomain: "ایران",
    PrintTitle: "صفارایانه",
    patterns: {
      KARBARI_1: {
        path: "map/patterns/KARBARI/_KARBARI_A1-MASKUNI-PL.png"
      },
      KARBARI_2: {
        path: "map/patterns/KARBARI/_KARBARI_A2-MASKUNI VIZHE ATRAFE MADIHA-PL.png"
      },
      KARBARI_3: {
        path: "map/patterns/KARBARI/_KARBARI_B1-TEJARI VIZHE BA ARZSH TARIKHI-PL.png"
      },
      KARBARI_4: {
        path: "map/patterns/KARBARI/_KARBARI_B2-BAZARE ROOZ-PL.png"
      },
      KARBARI_5: {
        path: "map/patterns/KARBARI/_KARBARI_C1-TEJARI KHADAMATI-PL.png"
      },
      KARBARI_6: {
        path: "map/patterns/KARBARI/_KARBARI_C2-MASKUNI TEJARI KHADAMATI-PL.png"
      },
      KARBARI_7: {
        path: "map/patterns/KARBARI/_KARBARI_C3-MASKUNI KHADAMATI-PL.png"
      }
    }
  },
  PanoUrl: "https://esup.tabriz.ir/Gateway/shahrnama/PanoService/",
  panoConfig: {
    layerSets: {
      1393: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    },
    layerSet: '1393',
    layerSet93: "1"

  },
  limitIdleTime: 15,
  enumDutyFicheExportType: {
    isDangi: 6,
    isAllalHesab: 2,
    isTaghsit: 8
  },
  citizenBaseUrl: "https://esup.tabriz.ir/Citizen",
  archiveEntities: {
    survey: 63
  },
  districts: [{
    Title: "1",
    Id: 1
  }, {
    Title: "2",
    Id: 2
  }, {
    Title: "3",
    Id: 3
  }, {
    Title: "4",
    Id: 4
  }, {
    Title: "5",
    Id: 5
  },
  {
    Title: "6",
    Id: 6
  }, {
    Title: "7",
    Id: 7
  }, {
    Title: "8",
    Id: 8
  }, {
    Title: "9",
    Id: 9
  }, {
    Title: "10",
    Id: 10
  }, {
    Title: "99",
    Id: 99
  }],
  ciServiceUrl: "https://esup.tabriz.ir/Gateway/CiService",
  HasEngineeringSystem: 2,
  SO: "https://esup.tabriz.ir/Gateway/SO",
  engineers: "https://esup.tabriz.ir/Gateway/engineer",
  engActivity: "https://esup.tabriz.ir/Gateway/engineer",
  FireService: "https://esup.tabriz.ir/Gateway/Fire",
  SA: {
    1: "https://esup.tabriz.ir/Gateway/SrvSA1",
    2: "https://esup.tabriz.ir/Gateway/SrvSA2",
    3: "https://esup.tabriz.ir/Gateway/SrvSA3",
    4: "https://esup.tabriz.ir/Gateway/SrvSA4",
    5: "https://esup.tabriz.ir/Gateway/SrvSA5",
    6: "https://esup.tabriz.ir/Gateway/SrvSA6",
    7: "https://esup.tabriz.ir/Gateway/SrvSA7",
    8: "https://esup.tabriz.ir/Gateway/SrvSA8",
    9: "https://esup.tabriz.ir/Gateway/SrvSA9",
    10: "https://esup.tabriz.ir/Gateway/SrvSA10",
    99: "https://esup.tabriz.ir/Gateway/SrvSA99"
  },
  SB: {
    1: "https://esup.tabriz.ir/Gateway/SrvSB1",
    2: "https://esup.tabriz.ir/Gateway/SrvSB2",
    3: "https://esup.tabriz.ir/Gateway/SrvSB3",
    4: "https://esup.tabriz.ir/Gateway/SrvSB4",
    5: "https://esup.tabriz.ir/Gateway/SrvSB5",
    6: "https://esup.tabriz.ir/Gateway/SrvSB6",
    7: "https://esup.tabriz.ir/Gateway/SrvSB7",
    8: "https://esup.tabriz.ir/Gateway/SrvSB8",
    9: "https://esup.tabriz.ir/Gateway/SrvSB9",
    10: "https://esup.tabriz.ir/Gateway/SrvSB10",
    99: "https://esup.tabriz.ir/Gateway/SrvSB99"
  },
  SC: {
    1: "https://esup.tabriz.ir/Gateway/SrvSC1",
    2: "https://esup.tabriz.ir/Gateway/SrvSC2",
    3: "https://esup.tabriz.ir/Gateway/SrvSC3",
    4: "https://esup.tabriz.ir/Gateway/SrvSC4",
    5: "https://esup.tabriz.ir/Gateway/SrvSC5",
    6: "https://esup.tabriz.ir/Gateway/SrvSC6",
    7: "https://esup.tabriz.ir/Gateway/SrvSC7",
    8: "https://esup.tabriz.ir/Gateway/SrvSC8",
    9: "https://esup.tabriz.ir/Gateway/SrvSC9",
    10: "https://esup.tabriz.ir/Gateway/SrvSC10",
    99: "https://esup.tabriz.ir/Gateway/SrvSC199"
  },
  SD: {
    1: "https://esup.tabriz.ir/Gateway/SrvSD1",
    2: "https://esup.tabriz.ir/Gateway/SrvSD2",
    3: "https://esup.tabriz.ir/Gateway/SrvSD3",
    4: "https://esup.tabriz.ir/Gateway/SrvSD4",
    5: "https://esup.tabriz.ir/Gateway/SrvSD5",
    6: "https://esup.tabriz.ir/Gateway/SrvSD6",
    7: "https://esup.tabriz.ir/Gateway/SrvSD7",
    8: "https://esup.tabriz.ir/Gateway/SrvSD8",
    9: "https://esup.tabriz.ir/Gateway/SrvSD9",
    10: "https://esup.tabriz.ir/Gateway/SrvSD10",
    99: "https://esup.tabriz.ir/Gateway/SrvSD99"
  },
  SI: {
    1: "https://esup.tabriz.ir/Gateway/SI1",
    2: "https://esup.tabriz.ir/Gateway/SI2",
    3: "https://esup.tabriz.ir/Gateway/SI3",
    4: "https://esup.tabriz.ir/Gateway/SI4",
    5: "https://esup.tabriz.ir/Gateway/SI5",
    6: "https://esup.tabriz.ir/Gateway/SI6",
    7: "https://esup.tabriz.ir/Gateway/SI7",
    8: "https://esup.tabriz.ir/Gateway/SI8",
    9: "https://esup.tabriz.ir/Gateway/SI9",
    10: "https://esup.tabriz.ir/Gateway/SI10",
    99: "https://esup.tabriz.ir/Gateway/SI99"
  },
  SQ: {
    1: "https://11111111/Gateway/SQ",
    2: "https://11111111/Gateway/SQ",
    3: "https://11111111/Gateway/SQ",
    4: "https://11111111/Gateway/SQ"
  },
  SJ: "https://esup.tabriz.ir/Gateway/SJ",
  SX: "https://esup.tabriz.ir/Gateway/SX",
  ES: "https://esup.tabriz.ir/Gateway/Estate",
  SH: "https://esup.tabriz.ir/Gateway/SH",
  generalIncome: "https://esup.tabriz.ir/Gateway/ST",
  CadWs: "https://esup.tabriz.ir/Cadws/CadWs.svc",
  comSad: {
    1: "https://esup.tabriz.ir/Gateway/CommissionService"
  },
  commissions: "https://esup.tabriz.ir/Gateway/CommissionService",
  srvCommission: "https://esup.tabriz.ir/Gateway/SrvCommission",
  commission77: "https://esup.tabriz.ir/Gateway/SrvCommission77",
  commission5: "https://esup.tabriz.ir/Gateway/SrvCommission5",
  excavation: "https://esup.tabriz.ir/Gateway/Dig",
  Commission77ReportPath: "/Com77",

  esupParams: {
    IsEditInExpertHasVote: !1,
    TitleMeetinginExpert: !1,
    IsCheckBalckList: !0,
    ViewLegalExpert: !1,
    IsShowHistoryVoteInExpert: !1,
    IsMashhad: !1,
    IsActiveToken: !1,
    AgentDefineDraft: !0,
    AccessExpertReportByTaskTitel: !1,
    SetHistoryRowColorByCI_VoteType: !1,
    ISShowCombo_Evaluatione: !1,
    ShowHoghoghiButton: !0,
    IsHideVoteTime: !1,
    IsHideVoteDate: !1,
    HideMojazParvaneh: !1,
    HideExecuteVote: !1,
    UseEditVoteLimit: !1,
    ShowVoteType: !0,
    AllowPurchaseMethodeInPOS: !0,
    HideRejectBadvi: !1,
    ShowBadviMade63: !0,
    ShowEslahiButton: !0,
    SetRegionByUserLocation: !1,
    CheckBadviVoteDate: !1,
    OutOfRangeCI_BoundCodes: "2",
    CheckK: !1,
    IsClearCalculateTextBox: !0,
    CommissionReportPath: "/CommissionReports/ComReport/",
    IsCheckAllTrepass: !1,
    Commission_AddPrintPreviewParameter: !1,
    CalculateBeforeAcceptVote: !1,
    IsPerformKCoefficientInVote: !1,
    CheckDeleteHoghoghi: !1,
    ResetKCoeffiecient: !1,
    UseGhararKartabl: !0,
    ChangeRdlCommissionVoteOfAgentForQom: !1,
    CheckRenderVoteInArchive: !1,
    ExportToArchiveByAgentCount: !1,
    AddToArchiveAfterSend: !0,
    ReportToArchiveAfterSend: !1,
    IsConnectToSara8: !0,
    AcceptVoteByAgent: !0,
    ShowBuildingPoliceTab: !1,
    IsChechVoteOwner: !0,
    ConfirmEditVote: !0,
    DefaultArchiveGroupTitle: "بایگانی",
    IsShowEstenkafiParameter: !1,
    checkingUserNationalCodeAfterLogin: !1,
    Com77NidWorkflowDeff: {
      NidWorkflowDeff: "abd03b6c-9984-4225-a0cd-162c347249f5"
    },
    ReadOnlyCommissionDate: !1,
    SetAgentDesc: !1,
    AllowCancelGroupId: "E75CC2A0-1E42-4EC8-AB07-36B6F9E7760D",
    sendToBackOldMethod: !0,
    Dig_NidWorkflowDeff: {
      NidWorkFlowDef_Request: "48e0511f-67d8-4bf8-91a8-accc4a3c15b9",
      NidWorkFlowDef_Request_Service: "884b57d2-d9f5-4500-a810-13e059411a5c",
      NidWorkFlowDef_Request_Events: "67e0e796-68e6-4515-b4ee-b28ef0050bd9",
      RequestIncome: {
        IncomeReqNidWorkflowDeff: "4C14150E-06E2-4F01-AEA7-8A64D6883C8D"
      }
    }
  },
  VoteTrepassesCellActions: !0,
  taskSendToBackReasonValidator: {
    persianChars: !0,
    englishChars: !0,
    speicalChars: !1,
    digitChars: !0,
    spaceChars: !0
  },
  eng: "https://esup.tabriz.ir/Gateway/engineer",
  esup: "https://esup.tabriz.ir/Gateway/esup",
  task: "https://esup.tabriz.ir/Gateway/task",
  workflow: "https://esup.tabriz.ir/Gateway/workflow",
  securityBaseUrl: "https://esup.tabriz.ir/Gateway/security",

  socket: {
    enabled: !1,
    baseUrl: "https://esup.tabriz.ir/security10/api_security"
  },
  monitoring: "https://esup.tabriz.ir/Gateway/srvmonitoring/monitoring",
  safaAuth: "https://esup.tabriz.ir/Security8/Service/SafaAuth.svc",
  dashboardServiceURL: "https://esup.tabriz.ir/Gateway/Dashbord/Dashbord",
  ConfirmCellPhoneForRequest: !1,
  sendSMS: "https://esup.tabriz.ir/Gateway/sms",
  CiCity: "70",
  archiveCore: {
    baseUrls: [{
      key: "SrvArchive",
      value: "https://esup.tabriz.ir/Gateway/ArchiveCore"
    }],
    district: {
      1: {
        username: "archivem1",
        password: "safa@123"
      },
      2: {
        username: "archivemantaghe2",
        password: "safa@123"
      },
      3: {
        username: "archivem3",
        password: "Sh@Hg0l!"
      },
      4: {
        username: "archivemantaghe4",
        password: "Sh@Hg0l!"
      },
      5: {
        username: "archivemantaghe5",
        password: "Sh@Hg0l!"
      },
      6: {
        username: "archivemantaghe6",
        password: "Sh@Hg0l!"
      },
      7: {
        username: "archivemantaghe7",
        password: "Sh@Hg0l!"
      },
      8: {
        username: "archivemantaghe8",
        password: "Sh@Hg0l!"
      },
      9: {
        username: "archivemantaghe9",
        password: "Sh@Hg0l!"
      },
      10: {
        username: "archivemantaghe10",
        password: "Sh@Hg0l!"
      },
      ApprovalCertificate: {
        username: "approvalcertificate",
        password: "safa@123"
      }
    },
    username: "approvalcertificate",
    password: "safa@123"
  },
  archiveConfig: {
    usePriority: !0,
    highlightNewFile: !0,
    showTooltip: !0,
    tileHeightSize: 90
  },
  archiveTablet: {
    username: "saratablet",
    password: "safa@123"
  },
  archiveEngineer: {
    username: "archiveengineer",
    password: "safa@123"
  },
  archiveUGP: {
    username: "archiveUGP",
    password: "safa@123"
  },
  archiveEngineersCertificate: {
    username: "archivewebengcertificate",
    password: "Sh@Hg0l!"
  },
  archivePolice: {
    username: "buildingpolice",
    password: "safa@123"
  },
  archivePlanBank: {
    username: "sara10",
    password: "safa@123"
  },
  archiveEstate: {
    username: "sara10",
    password: "safa@123"
  },
  archiveCommission: {
    username: "commission",
    password: "safa@123"
  },
  archiveCommission77: {
    username: "comm77",
    password: "safa@123"
  },
  archiveDig: {
    username: "archiveDig",
    password: "safa@123"
  },
  archiveSurvay: {
    username: "Survey",
    password: "safa@123"
  },
  securityArchiveCore: {
    baseUrl: "https://esup.tabriz.ir/Gateway/ArchiveCore",
    username: "sara10",
    password: "Saf@#qc321"
  },
  infoGroupCombo: {
    isShowBaseInfoGroupCombo: !0,
    isShowBaseInfoGroupComboForTajmiBasedOnRequest: !0,
    infoGroupOptions: [{
      ID: 0,
      Title: "اطلاعات پرونده"
    }, {
      ID: 1,
      Title: "بازدید"
    }, {
      ID: 3,
      Title: "مجاز پایانکار"
    }, {
      ID: 100,
      Title: " نوسازی "
    }]
  },

  reportConfig: {
    treeVisibility: !0,
    ciServiceURL: "https://esup.tabriz.ir/Gateway/CiService/json/",
    ciServiceDomain: "CI_SafaGateway1",
    rootReport: {
      Path: "/",
      ReportName: "Root",
      Description: "Root"
    },
    reportManagerServiceURL: "https://esup.tabriz.ir/Gateway/RptService",
    reportManagerServiceURL2: "https://esup.tabriz.ir/Gateway/RptService",
    reportManagerServiceURL3: "https://esup.tabriz.ir/Gateway/RptService",
    reportManagerServiceURL4: "https://esup.tabriz.ir/Gateway/RptService"
  },

  systemReportUrl: "https://esup.tabriz.ir/Gateway/RptService",
  systemReportViewer: "https://esupb.tabriz.ir/SafaReportManager/RptViewer/Viewer/RptViewer.aspx",
  formReportUrl: "https://esup.tabriz.ir/Gateway/RptService",
  formRptViewerUrl: "https://esupb.tabriz.ir/SafaReportManager/RptViewer/Viewer/RptViewer.aspx",
  dashboard: {
    show: !0,
    serviceUrl: "https://localhost:6040/api/Report/Dashboard"
  },
  StatisticReports: {
    ParentID: "E577CFF0-99EF-4B93-B97E-697299F7161F",
    ID: "86FCC7AA-E0DD-4A55-ADEB-DE7FCF8DDE62"
  },

  serviceGateway: "",
  crudBaseUrl: "https://esup.tabriz.ir/Gateway/crowd/",
  reportUrl: "https://esupb.tabriz.ir/SafaReportManager/RptViewer/Viewer/RptViewer.aspx",
  avatarBaseUrl: "https://esup.tabriz.ir/Gateway/Security/avatar/",
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
      width: 100
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

  engineersConfig: {
    reportPath: "/Engineers"
  },

  engineer: {
    userGroups: ["747CC8BD-81F0-4F82-ABEB-B927C1CBFE8B", "37ECEDC1-5E95-4F98-B752-FEBB89482D2F"]
  } // هنگام لاگین یوزرهای مهندس ،کارتابل ارجاعات در کنار کارتابل اصلی لود میشود

}
