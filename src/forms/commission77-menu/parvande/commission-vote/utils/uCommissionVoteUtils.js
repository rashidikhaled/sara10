/* eslint-disable camelcase */
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"

const generateClsRequestVote = ({
  NidRequest = EMPTY_GUID,
  NidVote = EMPTY_GUID,
  ListFicheInVote = [],
  RequestInfo = {},
  Request_Vote = {},
  ListRequest_Vote = [],
  ListRequest_VoteFiche = []
} = {}) => {
  return {
    NidRequest,
    NidVote,
    RequestInfo: {
      Address: "",
      AnnouncementDate: "",
      AnnouncementNo: "",
      CI_Commission: 0,
      CI_RequestType: 0,
      CreateDate: "",
      CreateTime: "",
      CreatorID: EMPTY_GUID,
      CreatorUserName: "",
      DataDeliveryNotice: "",
      DateDeliveryProclamation: "",
      DateDeliveryVote: "",
      DescAnnouncemen: "",
      DescRequest: "",
      Description: "",
      Distrcit: 0,
      FromDate: "",
      HoldingDate: "",
      HoldingTime: "",
      IsAnnouncement: false,
      NidFiche: EMPTY_GUID,
      NidNosaziCode: EMPTY_GUID,
      NidProc: EMPTY_GUID,
      NidProcIncome: EMPTY_GUID,
      NidRequest: EMPTY_GUID,
      NidWorkItem: 0,
      NosaziCode: "",
      OwnerName: "",
      PostCode: "",
      Price: 0,
      SecretariatNo: "",
      SysCI_RequestStatus: 0,
      TitleRequest: "",
      ToDate: "",
      UserDescription: "",
      ...RequestInfo
    },
    Request_Vote: {
      CI_VoteType: 0,
      Cash: 0,
      Discount: 0,
      DutyPrice: 0,
      IsAbsolution: false,
      IsCancel: false,
      NidRequest: EMPTY_GUID,
      NidUser: EMPTY_GUID,
      NidVote: EMPTY_GUID,
      NumberOfInstallments: 0,
      UserName: 0,
      VoteDate: null,
      VoteDescryption: "",
      VoteNoe: 0,
      VoteValue: 0,
      ...Request_Vote
    },
    ListFicheInVote: [
      ListFicheInVote.length > 0
        ? [...ListFicheInVote]
        : {
          IsSelected: false,
          SubFicheDetail: [],
          DutyFicheLog: []
        }
    ],
    ListRequest_Vote: [
      ListRequest_Vote.length > 0
        ? [...ListRequest_Vote]
        : {
          CI_Commission: 0,
          CI_IncomeAccountGroup: null,
          CI_VoteType: 0,
          Cash: 0,
          Discount: 0,
          DutyPrice: 0,
          FicheNo: "",
          IncomeStatusFiche: "",
          IsCancel: false,
          NidRequest: EMPTY_GUID,
          NidUser: EMPTY_GUID,
          NidVote: EMPTY_GUID,
          NidWorkItem: 0,
          NosaziCode: "",
          NumberOfInstallments: 0,
          OwnerName: "",
          PriceFiche: 0,
          UserName: "",
          VoteDate: "",
          VoteDescryption: "",
          VoteNoe: "",
          VoteValue: 0
        }
    ],
    ListRequest_VoteFiche: [
      ListRequest_VoteFiche.length > 0
        ? [...ListRequest_VoteFiche]
        : {
          NidFicheDetail: EMPTY_GUID,
          NidVF: EMPTY_GUID,
          NidVote: EMPTY_GUID
        }
    ]
  }
}

const generateClsRequestVoteParam = (param) => {
  const generatedClsRequestVote = generateClsRequestVote()
  return generatedClsRequestVote.hasOwnProperty(param)
    ? generatedClsRequestVote[param]
    : {}
}

const generateRequestVote = (params = {}) => {
  return {
    CI_VoteTypeNew: params?.CI_VoteTypeNew ? params.CI_VoteTypeNew : 0,
    ...params
  }
}

const generateClsOtherVote = ({
  OtherVote1 = {},
  OtherVote1List = [],
  OtherVote2 = {},
  OtherVote2List = []
} = {}) => {
  return {
    NidVote: EMPTY_GUID,

    OtherVote1: generateOtherVote1(OtherVote1),
    OtherVote1List: [...OtherVote1List, generateOtherVote1()],
    OtherVote2: generateOtherVote2(OtherVote2),
    OtherVote2List: [...OtherVote2List, generateOtherVote2()]
  }
}

const generateOtherVote1 = (params = {}) => {
  return {
    BankAccountNumber: "",
    Branch: "",
    CreateDate: "",
    CreateTime: "",
    Date: "",
    Dated: "",
    Description: "",
    EditDate: "",
    EditTime: "",
    EditorNidUser: EMPTY_GUID,
    EditorUserName: "",
    InDate: "",
    IsRemoved: false,
    NidOtherVote1: EMPTY_GUID,
    NidUser: EMPTY_GUID,
    NidVote: EMPTY_GUID,
    Number: "",
    Other: "",
    RemovalDate: "",
    RemovalNidUser: EMPTY_GUID,
    RemovalTime: "",
    RemovalUserName: "",
    Transferee: "",
    UserName: "",
    ...params
  }
}

const generateOtherVote2 = (params = {}) => {
  return {
    Against: "",
    AttendanceMeeting: "",
    Bank: "",
    Commission: "",
    Complaint: "",
    CreateDate: "",
    CreateTime: "",
    Demand: "",
    Description: "",
    EditDate: "",
    EditTime: "",
    EditorNidUser: EMPTY_GUID,
    EditorUserName: "",
    File: "",
    FileContents: "",
    IsRemoved: false,
    LocatedAt: "",
    Matter77: "",
    NidOtherVote2: EMPTY_GUID,
    NidUser: EMPTY_GUID,
    NidVote: EMPTY_GUID,
    OnTheLackOf: "",
    Other: "",
    Payment: "",
    RemovalDate: "",
    RemovalNidUser: EMPTY_GUID,
    RemovalTime: "",
    RemovalUserName: "",
    UserName: "",
    ...params
  }
}

export {
  EMPTY_GUID,
  generateClsRequestVote,
  generateClsRequestVoteParam,
  generateRequestVote,
  generateClsOtherVote,
  generateOtherVote1,
  generateOtherVote2
}
