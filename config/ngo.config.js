// eslint-disable-next-line no-unused-vars
const appConfig = {
  InsuranceDistricts: [13, 7, 1],
  EnumDutyFicheStatus: {
    Confirm: 1,
    PermanentExport: 0,
    Cancel: 2,
    TemporaryExport: 3
  },
  nosaziCodePattern: "2-2-5-5-3-3-3",
  captcha: { enabled: 1 },
  workflowNotSendMsgCaption: "عنوان این قسمت از تنظیمات خوانده میشود:",
  ignoreWorkflowDeffs: [
    "D1094A8B-4251-4785-A09D-C5E0A2565503",
    "083a69f2-38f9-44c9-8d19-2d27c44742fc",
    "9D3A93C8-AF0C-4D46-B66B-C36FFC3A80D2"
  ],
  mapServiceUrl: "http://ngo.safarayaneh.com/IGNGateway/SrvMap/",
  srvMapUrl: "http://ngo.safarayaneh.com/IGNGateway/SrvMap/",
  MapExportUrlFile: "http://ngo.safarayaneh.com/ex/",
  MapExportUrl: "http://ngo.safarayaneh.com/IGNGateway/MapExport/",
  PngUrl: "http://ngo.safarayaneh.com/png/",
  MapNetworkUrl: "http://ngo.safarayaneh.com/IGNGateway/GasRelight/",
  center: "http://ngo.safarayaneh.com/IGNGateway/ngo_services",
  MapSerachUrl: "",
  ipfinder: "",
  mapConfig: {
    lat: 36.29,
    long: 50,
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
  PanoUrl: "",
  panoConfig: {
    layerSets: { 1393: [1], 1392: [2, 102], 1391: [3] },
    layerSet: "1393"
  },
  limitIdleTime: 15,
  enumDutyFicheExportType: { isDangi: 6, isAllalHesab: 2, isTaghsit: 8 },
  citizenBaseUrl: "",
  archiveEntities: { survey: 63 },
  districts: [
    { Title: "1", Id: 1 },
    { Title: "2", Id: 2 },
    { Title: "3", Id: 3 },
    { Title: "4", Id: 2 },
    {
      Title: "5",
      Id: 2
    }
  ],
  ciServiceUrl: "http://ngo.safarayaneh.com/IGNGateway/CIManager",
  HasEngineeringSystem: 2,
  engineers: "",
  engActivity: "",
  FireService: "",
  generalIncome: "",
  CadWs: "",
  comSad: { 1: "" },
  commissions: "",
  srvCommission: "",
  commission77: "",
  commission5: " ",
  checkingUserNationalCodeAfterLogin: !1,
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
    ReadOnlyCommissionDate: !1,
    SetAgentDesc: !1,
    AllowCancelGroupId: "C1DA2ECE-2EBC-493A-94E3-687789CAE11C",
    sendToBackOldMethod: !0,
    Dig_NidWorkflowDeff: "884b57d2-d9f5-4500-a810-13e059411a5c"
  },
  VoteTrepassesCellActions: !0,
  taskSendToBackReasonValidator: {
    persianChars: !0,
    englishChars: !0,
    speicalChars: !1,
    digitChars: !0,
    spaceChars: !0
  },
  eng: "",
  esup: "",
  task: "http://ngo.safarayaneh.com/IGNGateway/TaskManager/",
  workflow: "http://ngo.safarayaneh.com/IGNGateway/TaskManager/",
  securityBaseUrl: "http://ngo.safarayaneh.com/IGNGateway/UserManager",
  socket: {
    enabled: !1,
    baseUrl: "http://ngo.safarayaneh.com/IGNGateway/UserManager/",
    path: "/socket.io"
  },
  monitoring: '',
  monitoringOptions: {
    allowShowPanel: false
  },
  safaAuth: "",
  dashboardServiceURL: "",
  ConfirmCellPhoneForRequest: !1,
  sendSMS: "",
  CiCity: "6",
  archiveConfig: {
    usePriority: !0,
    highlightNewFile: !0,
    defaultSort: "desc",
    showUserNameWatermark: !1,
    sendNidSessionAndToken: !1,
    username: "nigct",
    password: "Nigct@123",
    baseUrl: "http://ngo.safarayaneh.com/ArchiveCore/",
    baseUrls: [
      { key: "SrvArchive", value: "http://ngo.safarayaneh.com/ArchiveCore/" }
    ]
  },
  reportConfig: {
    treeVisibility: !0,
    ciServiceURL: "http://ngo.safarayaneh.com/IGNGateway/CIManager",
    ciServiceDomain: "CI_SaraM1",
    rootReport: { Path: "/", ReportName: "Root", Description: "Root" },
    reportManagerServiceURL:
      "http://ngo.safarayaneh.com/RptService/Services/SafaReportService.svc",
    reportManagerServiceURL2:
      "http://ngo.safarayaneh.com/RptService/Services/SafaReportService.svc",
    reportManagerServiceURL3:
      "http://ngo.safarayaneh.com/RptService/Services/SafaReportService.svc",
    reportManagerServiceURL4:
      "http://ngo.safarayaneh.com/RptService/Services/SafaReportService.svc"
  },
  systemReportUrl:
    "http://ngo.safarayaneh.com/RptService/Services/SafaReportService.svc/json/",
  systemReportViewer:
    "http://ngo.safarayaneh.com/RptViewer/Viewer/RptViewer.aspx",
  formReportUrl:
    "http://ngo.safarayaneh.com/RptService/Services/SafaReportService.svc/json/",
  formRptViewerUrl:
    "http://ngo.safarayaneh.com/RptViewer/Viewer/RptViewer.aspx",
  dashboard: { show: !0, serviceUrl: "" },
  serviceGateway: "",
  crudBaseUrl: "",
  reportUrl:
    "http://ngo.safarayaneh.com/RptService/Services/SafaReportService.svc",
  avatarBaseUrl: "http://ngo.safarayaneh.com/IGNGateway/UserManager/avatar/",
  kartableConfig: {
    columns: [
      { field: "NidWorkItem", width: 70 },
      {
        field: "Task",
        width: 300
      },
      { field: "WorkflowTitel", width: 100 },
      { field: "BizCode", width: 200 },
      {
        field: "IconUrl",
        width: 80
      },
      { field: "ProcInitiatorName", width: 100 },
      { field: "GroupTitel", width: 100 },
      {
        field: "StartDate",
        width: 120
      },
      { field: "StartDate", width: 120 },
      { field: "Comments", width: 200 }
    ]
  }
}
