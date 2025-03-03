// eslint-disable-next-line no-unused-vars
const appConfig = {
  IsMashhad: false,
  workflow: 'http://192.168.100.170:7000/SafaGateway/workflow', // workflow: 'http://192.168.100.170:7000/Api_workflow',
  // workflow: 'http://192.168.100.224:1002',

  //   systemReportUrl: 'http://192.168.100.170:7000/ReportSara10/Services/Services/SafaReportService.svc/json/',
  //   systemReportViewer: 'http://192.168.100.170:7000/ReportSara10/RptViewer14/Viewer/RptViewer.aspx',

  //   // formReportUrl: 'http://repservice.mashhad.ir:8007/Services/SafaReportService.svc',
  //   formReportUrl: 'http://repservice.mashhad.ir:8007/Services/SafaReportService.svc/json/',
  //   formRptViewerUrl: 'http://repservice.mashhad.ir:9000/Viewer/RptViewer.aspx',

  socket: {
    baseUrl: 'http://192.168.100.170:7000/Api_Security', path: '/socket.io/', enabled: false
  },
  ipfinder: 'http://192.168.100.170:3019',
  mapServiceUrl: 'http://192.168.100.170:7010/vsdisara',
  srvMapUrl: 'http://192.168.100.170:7000/SafaGateway/SrvMap/', // srvMapUrl: 'http://192.168.100.224:3037',
  MapExportUrl: 'http://192.168.100.224:3000/',
  PngUrl: 'http://192.168.100.224:3000/',
  MapSerachUrl: 'http://192.168.100.224:3000/',
  MapExportUrlFile: 'http://ngo.safarayaneh.com/ex/',
  mapConfig: {
    lat: 36.2963491060359,
    long: 59.6090542181629,
    center: [59.6090542181629, 36.2963491060359],
    Zoom: 18,
    maxZoom: 22,
    DefaultSelectLayer: 32,
    DefaultSelectLayerName: 'وضع موجود',
    DefaultSelectLayerBuffer: 0,
    MapNosaziCodeDigits: 4,
    DefaultDomain: 'ایران',
    PrintTitle: 'سـامانه یـــکپــارچـه سرا 10'
  },
  citizenBaseUrl: 'http://192.168.100.178:8041',
  serviceGateway: '', // serviceGateway: 'http://5.252.216.143:8001/Gateway/',
  archiveCore: {
    baseUrls: [{
      key: 'SrvArchive',
      value: 'http://192.168.100.170:7000/archive/archivecore/'
    }],
    username: 'sara10',
    password: 'Saf@#qc321',
    district: {
      1: { username: 'sara10', password: 'Saf@#qc321' },
      2: { username: 'sara10', password: 'Saf@#qc321' },
      3: { username: 'sara10', password: 'Saf@#qc321' },
      4: { username: 'sara10', password: 'Saf@#qc321' },
      5: { username: 'sara10', password: 'Saf@#qc321' },
      7: { username: 'sara10', password: 'Saf@#qc321' },
      8: { username: 'sara10', password: 'Saf@#qc321' }
    },
    options: {
      usePriority: true,
      highlightNewFile: true,
      defaultSort: 'asc' // 'desc' or 'asc'
    },
    subsystems: {
      approvalCertificate: {
        username: 'approvalcertificate', password: 'Saf@#qc321'
      },
      commission100: {
        username: 'sara10', password: 'Saf@#qc321'
      },
      police: {
        username: 'police', password: 'ark@2993'
      }
    }
  },
  archiveCommission: { username: 'sara10', password: 'Saf@#qc321' },
  archiveWebEng: { username: 'archiveengineer', password: 'Saf@#qc321' },
  archiveEngineersCertificate: { username: 'archiveengineercertificate', password: 'Saf@#qc321' },
  archivePolice: {
    username: 'police', password: 'ark@2993'
  },
  archivePlanBank: {
    // username: 'archivecore', password: 'archive@123'
    username: 'sara10', password: 'Saf@#qc321'
  },
  archiveCore2: {
    baseUrls: [{
      key: 'SrvArchive',
      value: 'http://192.168.100.170:7000/archive/archivecore/'
    }], // baseUrls: [{ key: 'SrvArchive', value: 'http://dev.safarayaneh.com:7000/SafaGateway/ArchiveCore/' }],
    // baseUrls: [{ key: 'SrvArchive', value: 'http://192.168.100.204/ArchiveCore' }],
    district: {
      1: { username: 'sara10', password: 'Saf@#qc321' },
      2: { username: 'sara10', password: 'Saf@#qc321' },
      3: { username: 'sara10', password: 'Saf@#qc321' },
      4: { username: 'sara10', password: 'Saf@#qc321' },
      5: { username: 'sara10', password: 'Saf@#qc321' },
      7: { username: 'sara10', password: 'Saf@#qc321' },
      8: { username: 'sara10', password: 'Saf@#qc321' },
      ApprovalCertificate: {
        username: 'approvalcertificate', password: 'Saf@#qc321'
      }
    },
    username: 'sara10',
    password: 'Saf@#qc321'
  },
  ArchiveDefaultSort: 'asc', // 'desc' or 'asc'
  archiveConfig: {
    usePriority: !0,
    highlightNewFile: !0
  },
  showUserNameWatermark: false,
  archiveEntities: { survey: 63 },
  archiveTablet: { username: 'saratablet', password: 'Saf@#qc321' },
  securityArchiveCore: {
    baseUrl: 'http://192.168.100.170:7000/SafaGateway/ArchiveCore', username: 'sara10', password: 'Saf@#qc321'
  }, // securityBaseUrl: 'http://192.168.100.178:3000',
  securityBaseUrl: 'http://192.168.100.170:7000/SafaGateway/Security/', // securityBaseUrl: 'http://192.168.100.116:3000',
  // securityBaseUrl: 'http://192.168.100.170:7000/Api_Security',
  // securityBaseUrl: 'http://192.168.100.170:3000', // http://shahr1.mashhad.ir/api_security, http://192.168.100.170:3000/'http://5.252.216.143:8004/,
  // avatarBaseUrl: 'http://5.252.216.143:8004/avatar/',
  task: 'http://192.168.100.170:7000/SaraSmart/Task_SaraSmart/TaskService.svc',
  engActivity: 'http://192.168.100.170:7000/Eng/Eng/Services/SrvEngineer.svc/json/',
  eng: 'http://192.168.100.170:7000/Eng/Eng/Services/SrvEngineer.svc', // engineers: 'http://192.168.100.170:7000/Eng/Eng/Services/SrvEngineer.svc/json/',
  // engineers: 'http://192.168.100.198/Engineer/Services/SrvEngineer.svc/json/',
  engineers: 'http://192.168.100.198/EngineeringSupervisor_Services/Services/SrvEngineer.svc/json/',
  // engineers: 'http://192.168.100.210/EngineeringSupervisor_Services/Services/SrvEngineer.svc/json/', // سیستم آقای صفری
  srvCommission: 'http://192.168.100.198/SrvCommission13/SrvCommission.svc/json/',
  commissions: 'http://192.168.100.198/CommissionService13/Services/CommissionService.svc/json/',
  // monitoring: 'http://192.168.100.170:6300/monitoring/', // monitoring: 'http://5.252.216.51/srvmonitoring/monitoring/',
  // monitoring: 'http://192.168.100.204/SafaMonitoringLog.Service/monitoring/',
  monitoring: 'http://192.168.100.170:6300/monitoring/',
  monitoringOptions: {
    allowShowPanel: false
  },
  excavation: 'http://192.168.100.198/DigServices/DigService.svc',
  safaAuth: 'http://192.168.100.170:7000/Security8/Service/SafaAuth.svc',
  dashboard: { show: true, serviceUrl: 'http://localhost:5079/api/Report/Dashboard' },
  ConfirmCellPhoneForRequest: !1,
  sendSMS: 'http://192.168.100.170:7000/SMSService/Sms/SrvScheduleSMS.svc',
  CiCity: '6',
  enumDutyFicheExportType: {
    isDangi: 6, isAllalHesab: 2, isTaghsit: 8
  },
  infoGroupCombo: {
    isShowBaseInfoGroupCombo: !0,
    isShowBaseInfoGroupComboForTajmiBasedOnRequest: !0,
    infoGroupOptions: [{
      ID: 0, Title: 'اطلاعات پرونده'
    }, {
      ID: 1, Title: 'بازدید'
    }, {
      ID: 3, Title: 'مجاز پایانکار'
    }]
  },
  formReportUrl: 'http://repservice.mashhad.ir:8007/Services/SafaReportService.svc',
  reportConfig: {
    treeVisibility: !0,
    ciServiceURL: 'http://192.168.100.170:3004', // ciServiceURL: 'http://192.168.100.170:7000/SafaGateway/CI/',
    // ciServiceURL: 'http://192.168.100.170:7000/Api_CI_manager_node',
    ciServiceDomain: 'CI_SaraM1',
    rootReport: { Path: '/', ReportName: 'Root', Description: 'Root' },
    reportManagerServiceURL: 'http://192.168.100.170:7000/ReportService/Services/Services/SafaReportService.svc',
    reportManagerServiceURL2: 'http://192.168.100.170:7000/ReportService/Services/Services/SafaReportService.svc',
    reportManagerServiceURL3: 'http://192.168.100.170:7000/ReportService/Services/Services/SafaReportService.svc',
    reportManagerServiceURL4: 'http://192.168.100.170:7000/ReportService/Services/Services/SafaReportService.svc'
  },
  reportUrl: 'http://safatest.mashhad.ir:8000/RptViewer/Viewer/RptViewer.aspx',
  crudBaseUrl: 'http://192.168.100.201/Wcf.Crowd/SrvCrowdNew.svc/json/',
  ReportRule: 'http://192.168.100.170:7000/ReportRule/ReportRule.svc', // ciServiceUrl: 'http://192.168.100.170:3004',
  ciServiceUrl: 'http://192.168.100.170:7000/SafaGateway/CI', // ciServiceUrl: 'http://192.168.100.170:7000/SafaGateway/CI/',
  // ciServiceUrl: 'http://192.168.100.170:7000/Api_CI_manager_node',
  systemReportUrl: 'http://192.168.100.170:7000/ReportService/Services/Services/SafaReportService.svc/json/',
  systemReportViewer: 'http://192.168.100.170:7000/ReportService/RptViewer14/Viewer/RptViewer.aspx',

  // ciServiceUrl: 'http://5.252.216.143:8001/ci_manager',
  SA: {
    1: 'http://192.168.100.170:7000/SafaGateway/SA1',
    2: 'http://192.168.100.170:7000/SafaGateway/SA2',
    3: 'http://192.168.100.170:7000/SafaGateway/SA3',
    4: 'http://192.168.100.170:7000/SafaGateway/SA4',
    5: 'http://192.168.100.170:7000/SafaGateway/SA5',
    6: 'http://192.168.100.170:7000/SafaGateway/SA6',
    7: 'http://192.168.100.170:7000/SafaGateway/SA7',
    8: 'http://192.168.100.170:7000/SafaGateway/SA8',
    9: 'http://192.168.100.170:7000/SafaGateway/SA9',
    10: 'http://192.168.100.170:7000/SafaGateway/SA10',
    11: 'http://192.168.100.170:7000/SafaGateway/SA11',
    12: 'http://192.168.100.170:7000/SafaGateway/SA12'
  },
  SB: {
    1: 'http://192.168.100.170:7000/SafaGateway/SB1',
    2: 'http://192.168.100.170:7000/SafaGateway/SB2',
    3: 'http://192.168.100.170:7000/SafaGateway/SB3',
    4: 'http://192.168.100.170:7000/SafaGateway/SB4',
    5: 'http://192.168.100.170:7000/SafaGateway/SB5',
    6: 'http://192.168.100.170:7000/SafaGateway/SB6',
    7: 'http://192.168.100.170:7000/SafaGateway/SB7',
    8: 'http://192.168.100.170:7000/SafaGateway/SB8',
    9: 'http://192.168.100.170:7000/SafaGateway/SB9',
    10: 'http://192.168.100.170:7000/SafaGateway/SB10',
    11: 'http://192.168.100.170:7000/SafaGateway/SB11',
    12: 'http://192.168.100.170:7000/SafaGateway/SB12'
  }, // SC: {
  //   1: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   2: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   3: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   4: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   5: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   6: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   7: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   8: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   9: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   10: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   11: 'http://192.168.100.194/WCF.SC/srvSC.svc',
  //   12: 'http://192.168.100.194/WCF.SC/srvSC.svc'
  // },
  SC: {
    1: 'http://192.168.100.170:7000/SafaGateway/Sc1',
    2: 'http://192.168.100.170:7000/SafaGateway/Sc2',
    3: 'http://192.168.100.170:7000/SafaGateway/Sc3',
    4: 'http://192.168.100.170:7000/SafaGateway/Sc4',
    5: 'http://192.168.100.170:7000/SafaGateway/Sc5',
    6: 'http://192.168.100.170:7000/SafaGateway/Sc6',
    7: 'http://192.168.100.170:7000/SafaGateway/Sc7',
    8: 'http://192.168.100.170:7000/SafaGateway/Sc8',
    9: 'http://192.168.100.170:7000/SafaGateway/Sc9',
    10: 'http://192.168.100.170:7000/SafaGateway/Sc10',
    11: 'http://192.168.100.170:7000/SafaGateway/Sc11',
    12: 'http://192.168.100.170:7000/SafaGateway/Sc12'
  },
  SD: {
    1: 'http://192.168.100.170:7000/SafaGateway/SD1',
    2: 'http://192.168.100.170:7000/SafaGateway/SD2',
    3: 'http://192.168.100.170:7000/SafaGateway/SD3',
    4: 'http://192.168.100.170:7000/SafaGateway/SD4',
    5: 'http://192.168.100.170:7000/SafaGateway/SD5',
    6: 'http://192.168.100.170:7000/SafaGateway/SD6',
    7: 'http://192.168.100.170:7000/SafaGateway/SD7',
    8: 'http://192.168.100.170:7000/SafaGateway/SD8',
    9: 'http://192.168.100.170:7000/SafaGateway/SD9',
    10: 'http://192.168.100.170:7000/SafaGateway/SD10',
    11: 'http://192.168.100.170:7000/SafaGateway/SD11',
    12: 'http://192.168.100.170:7000/SafaGateway/SD12'
  },
  SI: {
    1: 'http://192.168.100.170:7000/SafaGateway/SI1',
    2: 'http://192.168.100.170:7000/SafaGateway/SI2',
    3: 'http://192.168.100.170:7000/SafaGateway/SI3',
    4: 'http://192.168.100.170:7000/SafaGateway/SI4',
    5: 'http://192.168.100.170:7000/SafaGateway/SI5',
    6: 'http://192.168.100.170:7000/SafaGateway/SI6',
    7: 'http://192.168.100.170:7000/SafaGateway/SI7',
    8: 'http://192.168.100.170:7000/SafaGateway/SI8',
    9: 'http://192.168.100.170:7000/SafaGateway/SI9',
    10: 'http://192.168.100.170:7000/SafaGateway/SI10',
    11: 'http://192.168.100.170:7000/SafaGateway/SI11',
    12: 'http://192.168.100.170:7000/SafaGateway/SI12'
  },
  SQ: {
    1: 'http://192.168.100.170:7000/SafaGateway/SQ1',
    2: 'http://192.168.100.170:7000/SafaGateway/SQ2',
    3: 'http://192.168.100.170:7000/SafaGateway/SQ3',
    4: 'http://192.168.100.170:7000/SafaGateway/SQ4',
    5: 'http://192.168.100.170:7000/SafaGateway/SQ5',
    6: 'http://192.168.100.170:7000/SafaGateway/SQ6',
    7: 'http://192.168.100.170:7000/SafaGateway/SQ7',
    8: 'http://192.168.100.170:7000/SafaGateway/SQ8',
    9: 'http://192.168.100.170:7000/SafaGateway/SQ9',
    10: 'http://192.168.100.170:7000/SafaGateway/SQ10',
    11: 'http://192.168.100.170:7000/SafaGateway/SQ11',
    12: 'http://192.168.100.170:7000/SafaGateway/SQ12',
    13: 'http://192.168.100.170:7000/SafaGateway/SQ13',
    14: 'http://192.168.100.170:7000/SafaGateway/SQ14',
    15: 'http://192.168.100.170:7000/SafaGateway/SQ15'
  },
  SJ: 'http://192.168.100.170:7000/Monitoring/SJ/srvSJ.svc',
  SH: 'http://192.168.100.170:7000/SH/Srv/srvSH.svc',
  // SX: 'http://192.168.100.170:7000/SX/srvSX.svc',
  SX: 'http://192.168.100.194/WCF.SX/srvSX.svc', // سیستم خانم محمد باقری - تهران
  ES: 'http://192.168.100.170:7000/Estate/Estate/Services/SrvEstate.svc/',
  // ES: 'http://192.168.100.210/Estate_Module.Web/Services/SrvEstate.svc/', // سیستم آقای صفری - تهران
  // ST: {
  //   1: 'http://192.168.100.170:7000/ST_M1/SrvST.svc',
  //   2: 'http://192.168.100.170:7000/ST_M2/SrvST.svc',
  //   3: 'http://192.168.100.170:7000/ST_M3/SrvST.svc',
  //   4: 'http://192.168.100.170:7000/ST_M4/SrvST.svc',
  //   5: 'http://192.168.100.170:7000/ST_M5/SrvST.svc',
  // },
  generalIncome: 'http://192.168.100.170:7000/ST/SrvST.svc/json/',

  archiveEstate: { username: 'sara10', password: 'Saf@#qc321' },
  // CadWs: 'http://192.168.100.170:7000/developertest/labbafm/CadWs/CadWs.svc',
  CadWs: 'http://192.168.100.170:7000/Cadws/CadWs.svc',
  FireService: 'http://192.168.100.170:7000/Fire/FireService/FireService.svc',
  districts: [{
    Title: '1', ID: 1
  }, {
    Title: '2', ID: 2
  }, {
    Title: '3', ID: 3
  }, {
    Title: '4', ID: 4
  }, {
    Title: '5', ID: 5
  }, {
    Title: '6', ID: 6
  }, {
    Title: '7', ID: 7
  }, {
    Title: '8', ID: 8
  }, {
    Title: '9', ID: 9
  }, {
    Title: '10', ID: 10
  }, {
    Title: '11', ID: 11
  }, {
    Title: '12', ID: 12
  }, {
    Title: '13', ID: 13
  }, {
    Title: '17', ID: 17
  }, {
    Title: 'ثامن', ID: 80
  }],
  HasEngineeringSystem: 0,
  InsuranceDistricts: [13, 7, 1],
  EnumDutyFicheStatus: {
    Confirm: 1, PermanentExport: 0, Cancel: 2, TemporaryExport: 3
  },
  ignoreWorkflowDeffs: ['cb945550-b789-4b8c-9b11-6ff552195cdd'],
  sketchUrl: 'http://192.168.100.170:7000/SketchService',
  workflowNotSendMsgCaption: 'عنوان این قسمت از تنظیمات خوانده میشود:',
  limitIdleTime: 15,
  esupParams: {
    IsEditInExpertHasVote: true,
    TitleMeetinginExpert: 'با حضور نماینده',
    IsShowEstenkafiParameter: false,
    ReadOnlyCommissionDate: false,
    SetAgentDesc: false,
    IsCheckBalckList: true,
    ViewLegalExpert: true,
    IsShowHistoryVoteInExpert: true,
    IsMashhad: false,
    IsActiveToken: false,
    AgentDefineDraft: false,
    AccessExpertReportByTaskTitel: false,
    SetHistoryRowColorByCI_VoteType: 0,
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
    OutOfRangeCI_BoundCodes: '2',
    CheckK: true,
    IsClearCalculateTextBox: true,
    CommissionReportPath: '/CommissionReports/ComReport',
    IsCheckAllTrepass: true,
    Commission_AddPrintPreviewParameter: false,
    CalculateBeforeAcceptVote: false,
    IsPerformKCoefficientInVote: false,
    CheckDeleteHoghoghi: false,
    ResetKCoeffiecient: false,
    UseGhararKartabl: true,
    ChangeRdlCommissionVoteOfAgentForQom: false,
    CheckRenderVoteInArchive: false,
    ExportToArchiveByAgentCount: false,
    AddToArchiveAfterSend: true,
    ReportToArchiveAfterSend: true,
    IsConnectToSara8: true,
    AcceptVoteByAgent: true,
    ShowBuildingPoliceTab: false,
    IsChechVoteOwner: true,
    ConfirmEditVote: true,
    ShowEslahi: false,
    ShowBazdid: false,
    ShowRegPluque: false,
    AccessEditVoteButton: false,
    VoteTrepassesCellActions: true,
    hamedanCalculateVoteValue: true,
    AllowCancelGroupId: 'C1DA2ECE-2EBC-493A-94E3-687789CAE11C',
    Dig_NidWorkflowDeff: '884b57d2-d9f5-4500-a810-13e059411a5c',
    PersonelResource_NidWorkflowDeff: {
      User: '9b13a629-72e2-4348-b277-0db7d7f3b65b',
      Daftar: '7f1b13ea-8598-4535-979a-a1044c4463a7',
      Self: '43fb5d88-22c5-4e84-b1cd-0641c7411097',
      Cut: '33ecc90b-7985-43b9-b5e9-c603ed1b7380',
      Violation_NidWorkflowDeff: '7f1b13ea-8598-4535-979a-a1044c4463a7'
    },
    EngResource: {
      NidWorkflowDeff: 'B8261786-5435-471F-8D19-71B5C2EC5C04'
    },
    ConvertResource: {
      ConvertReqNidWorkflowDeff: 'b380547d-1e21-484c-a1a2-32f423c079d6'
    }
  },
  posProtocol: 'https:',
  sendToBackOldMethod: false, // Old Way If True
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
      field: 'ProcInitiatorName', width: 120
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
  nosaziCodePattern: '2-2-3-5-3-3-3',
  commission77: 'http://192.168.100.198/Commission77_Module.Web/Services/SrvCommission77.svc/json/',
  commission5: 'http://192.168.100.198/Commission5.Service/Commission5.svc/json/',
  archiveCommission77: { username: 'sara10', password: 'Saf@#qc321' },
  taskLauncherSendReferenceValidator: {
    persianChars: true,
    englishChars: true, // a-zA-Z
    speicalChars: false, // [_+)(*&^%$#@!)]
    digitChars: true, // 0-9
    spaceChars: true
  }
}
