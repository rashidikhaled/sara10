// eslint-disable-next-line no-unused-vars
const appConfig = {
  remainDays: 30,
  remainDaysNotice: 'کاربر گرامی، تا {0} روز دیگر حساب کاربری شما غیرفعال خواهد شد.',
  socket: {
    baseUrl: 'http://192.168.110.117/Api_Security/', path: '/socket.io/', enabled: !1
  },
  EnumDutyFicheStatus: {
    Confirm: 1, PermanentExport: 0, Cancel: 2, TemporaryExport: 3
  },
  FireService: '',
  mapServiceUrl: 'http://map.hamedan.ir/MapService/MapService.svc',
  srvMapUrl: 'http://192.168.110.117/Api_Mapsrv/',
  MapExportUrl: 'http://map.hamedan.ir/PNG/',
  PngUrl: 'http://map.hamedan.ir/PNG/',
  MapSerachUrl: 'http://esup.hamedan.ir/SearchService/engine/search/',

  systemReportUrl: 'http://192.168.110.117/Report/RptService/Services/SafaReportService.svc/json/',
  systemReportViewer: 'http://192.168.110.117/Report/RptViewer/Viewer/RptViewer.aspx',
  formReportUrl: 'http://192.168.110.117/Report/RptService/Services/SafaReportService.svc/json/',
  formRptViewerUrl: 'http://192.168.110.117/Report/RptViewer/Viewer/RptViewer.aspx',

  ipfinder: 'http://192.168.110.117/Api_ipfinder',
  mapConfig: {
    lat: 34.7983,
    long: 48.5148,
    center: [48.5148, 34.7983],
    Zoom: 12,
    NidLayer: 1,
    maxZoom: 22,
    DefaultSelectLayer: 1,
    DefaultSelectLayerName: 'وضع موجود',
    DefaultSelectLayerBuffer: 0,
    MapNosaziCodeDigits: 4
  },
  PanoUrl: 'http://shahrnama.hameda.ir:8000/GisProxy/panoservice/',
  panoConfig: {
    layerSets: {
      1401: [1, 2, 3, 4, 5]
    },
    layerSet: '1401'
  },
  ReportRule: 'http://192.168.110.117/ReportRule/ReportRule.svc',
  citizenBaseUrl: 'http://192.168.110.117/Citizen/',
  enumDutyFicheExportType: {
    isDangi: 6, isAllalHesab: 2, isTaghsit: 8
  },
  archiveEntities: {
    survey: 4
  },
  districts: [{
    Title: '1', Id: 1
  }, {
    Title: '2', Id: 2
  }, {
    Title: '3', Id: 3
  }, {
    Title: '4', Id: 4
  }],
  ArchiveDefaultSort: 'desc',
  showUserNameWatermark: true,
  ciServiceUrl: 'http://192.168.110.117/Api_CI_Service',
  HasEngineeringSystem: 0,
  engineers: 'http://192.168.110.117:8005/EngForTestSara10/Services/SrvEngineer.svc/json/',
  engActivity: 'http://192.168.110.117:7000/Eng/Eng/Services/SrvEngineer.svc/json/',
  sketchUrl: 'http://192.168.110.117/SketchService',
  SA: {
    1: 'http://192.168.110.117/SaraM/SA/srvSA.svc',
    2: 'http://192.168.110.117/SaraM/SA/srvSA.svc',
    3: 'http://192.168.110.117/SaraM/SA/srvSA.svc',
    4: 'http://192.168.110.117/SaraM/SA/srvSA.svc'
  },
  SB: {
    1: 'http://192.168.110.117/SaraM/SB/srvSB.svc',
    2: 'http://192.168.110.117/SaraM/SB/srvSB.svc',
    3: 'http://192.168.110.117/SaraM/SB/srvSB.svc',
    4: 'http://192.168.110.117/SaraM/SB/srvSB.svc'
  },
  SC: {
    1: 'http://192.168.110.117/SaraM/SC/srvSC.svc',
    2: 'http://192.168.110.117/SaraM/SC/srvSC.svc',
    3: 'http://192.168.110.117/SaraM/SC/srvSC.svc',
    4: 'http://192.168.110.117/SaraM/SC/srvSC.svc'
  },
  SD: {
    1: 'http://192.168.110.117/SaraM/SD/srvSD.svc',
    2: 'http://192.168.110.117/SaraM/SD/srvSD.svc',
    3: 'http://192.168.110.117/SaraM/SD/srvSD.svc',
    4: 'http://192.168.110.117/SaraM/SD/srvSD.svc'
  },
  SI: {
    1: 'http://192.168.110.117/SaraM/SI/srvSI.svc',
    2: 'http://192.168.110.117/SaraM/SI/srvSI.svc',
    3: 'http://192.168.110.117/SaraM/SI/srvSI.svc',
    4: 'http://192.168.110.117/SaraM/SI/srvSI.svc'
  },
  SQ: {
    1: 'http://192.168.100.170:7010/SaraM/SQ/SrvSQ.svc',
    2: 'http://192.168.100.170:7010/SaraM/SQ/SrvSQ.svc',
    3: 'http://192.168.100.170:7010/SaraM/SQ/SrvSQ.svc',
    4: 'http://192.168.100.170:7010/SaraM/SQ/SrvSQ.svc'
  },
  SJ: 'http://11111111111111/SJ/srvSJ.svc',
  generalIncome: 'http://192.168.110.117/SaraM/ST/SrvST.svc/json/',
  CadWs: 'http://192.168.110.117/CadWs/CadWs.svc',
  comSad: { 1: 'http://192.168.110.117/Commission10/CommissionService10/Services/CommissionService.svc' },
  commissions: 'http://192.168.110.117/Commission10/CommissionService10/Services/CommissionService.svc/json/',
  srvCommission: 'http://192.168.110.117/Commission10/SrvCommission10/SrvCommission.svc/json/',
  commissionService10: 'http://192.168.110.117/Commission10/CommissionService10/Services/CommissionService.svc/json/',
  eng: 'http://192.168.110.117:7000/Eng/Eng/Services/SrvEngineer.svc',
  esup: 'http://192.168.110.117/esup10/EsupService.svc',
  task: 'http://192.168.110.117/Api_WorkFlow/',
  workflow: 'http://192.168.110.117/Api_WorkFlow/',
  securityBaseUrl: 'http://192.168.110.117/Api_Security/',
  monitoring: 'http://192.168.110.117:50004/monitoring/',
  monitoringOptions: {
    allowShowPanel: false
  },
  safaAuth: 'http://192.168.110.117:84/Service/SafaAuth.svc',
  dashboard: { show: true, serviceUrl: 'http://localhost:6040/api/Report/Dashboard' },
  ConfirmCellPhoneForRequest: !1,
  sendSMS: 'http://192.168.110.117/SMS/SrvScheduleSMS.svc',
  CiCity: '233',
  limitIdleTime: 15,
  archiveCommission: {
    username: 'commission', password: 'safa@123'
  },
  archiveCore: {
    baseUrls: [{
      key: 'SrvArchive', value: 'http://192.168.110.117/ArchiveCore/'
    }],
    district: {
      1: {
        username: 'archivem1', password: 'safa@123'
      },
      2: {
        username: 'archivem2', password: 'safa@123'
      },
      3: {
        username: 'archivem3', password: 'safa@123'
      },
      4: {
        username: 'archivem4', password: 'safa@123'
      },
      ApprovalCertificate: {
        username: 'approvalcertificate', password: 'safa@123'
      }
    },
    username: 'approvalcertificate',
    password: 'safa@123'
  },
  archiveTablet: {
    username: 'saratablet', password: 'safa@123'
  },
  archivePolice: {
    username: 'police', password: 'ark@2993'
  },
  securityArchiveCore: {
    baseUrl: 'http://192.168.110.117/ArchiveCoreUI/', username: 'logface', password: '123'
  },
  btnSodorGavahi: !1,
  infoGroupCombo: {
    isShowBaseInfoGroupCombo: !0,
    isShowBaseInfoGroupComboForTajmiBasedOnRequest: !0,
    infoGroupOptions: [{
      ID: 0, Title: 'اطلاعات پرونده'
    }, {
      ID: 1, Title: 'بازدید'
    }, {
      ID: 3, Title: 'مجاز پایانکار'
    }, {
      ID: 100, Title: ' نوسازی '
    }]
  },
  reportConfig: {
    treeVisibility: !0,
    ciServiceURL: 'http://192.168.110.117/ci_manager',
    ciServiceDomain: 'CI_SaraM1',
    rootReport: {
      Path: '/', ReportName: 'Root', Description: 'Root'
    },
    reportManagerServiceURL: 'http://192.168.110.117/Report/RptService/Services/SafaReportService.svc',
    reportManagerServiceURL2: 'http://192.168.110.117/Report/RptService/Services/SafaReportService.svc',
    reportManagerServiceURL3: 'http://192.168.110.117/Report/RptService/Services/SafaReportService.svc',
    reportManagerServiceURL4: 'http://192.168.110.117/Report/RptService/Services/SafaReportService.svc'
  },
  serviceGateway: '',
  crudBaseUrl: 'http://192.168.110.117/Crowd/SrvCrowdNew.svc/json/',
  reportUrl: 'http://192.168.110.117/Report/RptViewer/Viewer/RptViewer.aspx',
  avatarBaseUrl: 'http://192.168.110.117/api_security/avatar/',
  esupParams: {
    IsEditInExpertHasVote: false,
    TitleMeetinginExpert: 'با حضور نماینده',
    IsCheckBalckList: true,
    ViewLegalExpert: false,
    IsShowHistoryVoteInExpert: true,
    IsMashhad: false,
    IsActiveToken: false,
    AgentDefineDraft: false,
    ISShowCombo_Evaluatione: false,
    ShowHoghoghiButton: true,
    IsHideVoteTime: false,
    IsHideVoteDate: false,
    HideMojazParvaneh: true,
    HideExecuteVote: false,
    UseEditVoteLimit: false,
    ShowVoteType: true,
    AllowPurchaseMethodeInPOS: true,
    HideRejectBadvi: false,
    ShowBadviMade63: false,
    ShowEslahiButton: false,
    CheckBadviVoteDate: true,
    CheckK: true,
    IsClearCalculateTextBox: true,
    CommissionReportPath: '/CommissionReports/ComReport/',
    IsCheckAllTrepass: true,
    Commission_AddPrintPreviewParameter: false,
    CalculateBeforeAcceptVote: false,
    IsPerformKCoefficientInVote: false,
    CheckDeleteHoghoghi: false,
    ResetKCoeffiecient: false,
    UseGhararKartabl: true,
    ChangeRdlCommissionVoteOfAgentForQom: false,
    CheckRenderVoteInArchive: false,
    AddToArchiveAfterSend: true,
    ReportToArchiveAfterSend: false,
    IsConnectToSara8: true,
    AcceptVoteByAgent: false,
    ShowBuildingPoliceTab: false,
    IsChechVoteOwner: false,
    ConfirmEditVote: false,
    IsShowEstenkafiParameter: false,
    ReadOnlyCommissionDate: false,
    SetAgentDesc: false,
    DefaultArchiveGroupTitle: 'بایگانی',
    VoteTrepassesCellActions: true,
    AllowCancelGroupId: 'C1DA2ECE-2EBC-493A-94E3-687789CAE11C',
    RequestIncome: {
      IncomeReqNidWorkflowDeff: '4C14150E-06E2-4F01-AEA7-8A64D6883C8D'
    }
  },
  workflowNotSendMsgCaption: 'کاربر محترم ارسال پرونده به دلایل ذیل امکان پذیر نیست',
  kartableConfig: {
    columns: [{
      field: 'NidWorkItem', width: 70
    }, {
      field: 'Task', width: 300
    }, {
      field: 'WorkflowTitel', width: 100
    }, {
      field: 'BizCode', width: 200
    }, {
      field: 'IconUrl', width: 80
    }, {
      field: 'ProcInitiatorName', width: 100
    }, {
      field: 'GroupTitel', width: 100
    }, {
      field: 'StartDate', width: 120
    }, {
      field: 'StartDate', width: 120
    }, {
      field: 'Comments', width: 200
    }]
  },
  InsuranceDistricts: [13, 7, 1],
  SH: 'http://192.168.100.170:7000/DeveloperTest/LabbafM/SH/Srv/srvsh.svc',
  ignoreWorkflowDeffs: ['D1094A8B-4251-4785-A09D-C5E0A2565503', '083a69f2-38f9-44c9-8d19-2d27c44742fc', '9D3A93C8-AF0C-4D46-B66B-C36FFC3A80D2'],
  commission77: 'http://192.168.100.198/Commission77_Module.Web/Services/SrvCommission77.svc/json/',
  commission5: 'http://192.168.100.198/Commission5.Service/Commission5.svc/json/',
  archiveCommission77: { username: 'sara10', password: 'Saf@#qc321' },
  Dig_NidWorkflowDeff: {
    NidWorkFlowDef_Request: 'd51895ed-1cbd-4cbf-945c-ab97f6953ba8', // "ثبت درخواست انشعابات شخصی"
    NidWorkFlowDef_Request_Service: '665b8bcd-d71d-4b03-a05d-a3e1fccc5852', // "ثبت درخواست طرح های توسعه"
    NidWorkFlowDef_Request_Events: 'ea889f45-b36a-4c46-9752-42d826c0940b' // "ثبت درخواست اتفاقات"
  }
}
