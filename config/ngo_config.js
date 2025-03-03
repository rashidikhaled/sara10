// eslint-disable-next-line no-unused-vars
const appConfig = {
  serviceGateway: '',
  workflow: 'http://ngo.safarayaneh.com/Api_Workflow/',
  mapServiceUrl: '',
  srvMapUrl: 'http://ngo.safarayaneh.com/srvmap/',
  mapUrl: 'http://ngo.safarayaneh.com/srvmap/',
  MapExportUrl: 'http://ngo.safarayaneh.com/MapExport/',
  PngUrl: 'http://ngo.safarayaneh.com/png/',
  MapExportUrlFile: 'http://ngo.safarayaneh.com/ex/',
  MapNetworkUrl: 'http://ngo.safarayaneh.com:3011/',
  MapSerachUrl: 'http://ngo.safarayaneh.com/se/engine/search',
  mapConfig: {
    'lat': 36.2963491060359,
    'long': 59.6090542181629,
    'center': [59.6090542181629, 36.2963491060359],
    'Zoom': 18,
    'maxZoom': 22,
    'mojoodLayerIDs': '5'
  },
  socket: {
    enabled: false, baseUrl: 'http://ngo.safarayaneh.com/api_security/', path: '/socket.io'
  },
  center: 'http://ngo.safarayaneh.com:3052',
  ciServiceUrl: 'http://ngo.safarayaneh.com/API_CIManager',
  securityBaseUrl: 'http://ngo.safarayaneh.com/api_security',
  monitoring: '',
  monitoringOptions: {
    allowShowPanel: false
  },
  safaAuth: '',
  dashboardServiceURL: '',
  ConfirmCellPhoneForRequest: !1,
  sendSMS: 'http://shahr5.mashhad.ir:8011/SrvScheduleSMS.svc',
  CiCity: '2',
  archiveCore: {
    baseUrls: [{
      key: 'SrvArchive', value: 'http://ngo.safarayaneh.com/ArchiveCore/', username: 'nigct', password: 'Nigct@123'
    }],
    district: { 1: { username: 'nigct', password: 'Nigct@123' } },
    username: 'nigct',
    password: 'Nigct@123'
  },
  securityArchiveCore: { baseUrl: 'http://ngo.safarayaneh.com/ArchiveCore/', username: 'nigct', password: 'Nigct@123' },
  reportConfig: {
    treeVisibility: !0,
    ciServiceURL: 'http://ngo.safarayaneh.com:3002',
    ciServiceDomain: 'RtoE_Domain',
    rootReport: { Path: '/', ReportName: 'Root', Description: 'Root' },
    reportManagerServiceURL: 'http://ngo.safarayaneh.com/ReportService/Services/Services/SafaReportService.svc',
    reportManagerServiceURL2: 'http://ngo.safarayaneh.com/ReportService/Services/Services/SafaReportService.svc',
    reportManagerServiceURL3: 'http://ngo.safarayaneh.com/ReportService/Services/Services/SafaReportService.svc',
    reportManagerServiceURL4: 'http://ngo.safarayaneh.com/ReportService/Services/Services/SafaReportService.svc'
  },
  reportUrl: 'http://ngo.safarayaneh.com/RptViewer/Viewer/RptViewer.aspx',
  crudBaseUrl: '',
  kartableConfig: {
    columns: [{ field: 'NidWorkItem', width: 70 }, {
      field: 'Task', width: 300
    }, { field: 'WorkflowTitel', width: 100 }, { field: 'BizCode', width: 200 }, {
      field: 'IconUrl', width: 80
    }, { field: 'ProcInitiatorName', width: 120 }, { field: 'GroupTitel', width: 100 }, {
      field: 'StartDate', width: 120
    }, { field: 'StartDate', width: 120 }, { field: 'Comments', width: 200 }]
  }
}
