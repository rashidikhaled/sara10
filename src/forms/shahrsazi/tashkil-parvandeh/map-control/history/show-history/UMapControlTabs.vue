<template>
  <fit>
    <safa-tabs v-model="activeTab" class="fit">
      <template v-slot:tabs>
        <tab-menu label="مشخصات" name="specifications" />
        <tab-menu label="کاربری ها" name="karbariha" />
        <tab-menu label="پیش آمدگیها" name="pishamadegiha" />
        <tab-menu label="مهندسین" name="engineers" />
        <tab-menu label="سایر مشخصات" name="otherSpecification" />
        <tab-menu label="طرح های تفصیلی و سایر امکانات" name="tafsil" />
        <tab-menu label="پارکینگ و کروکی" name="parkingAndKroki" />
        <tab-menu label="توضیحات" name="description" />
      </template>

      <tab-content name="specifications" title="مشخصات">
        <USpecifications :results="model.history" m="r" />
      </tab-content>
      <tab-content name="karbariha" title="کاربری ها" :padding="false">
        <UKarbariha :results="model.history" m="r" />
      </tab-content>
      <tab-content name="pishamadegiha" title="پیش آمدگی ها" :padding="false">
        <UPishamadegiha :results="model.history" m="r" />
      </tab-content>
      <tab-content name="engineers" title="مهندسین" :padding="false">
        <UEngineersTab
          :results="model.history"
          m="r"
          :title="title"
          :formKey="formKey"
          :name="name"
        />
      </tab-content>
      <tab-content name="otherSpecification" title="سایر مشخصات">
        <UOtherSpecifications :results="model.history" m="r" />
      </tab-content>
      <tab-content name="tafsil" title="طرح تفضیلی و سایر امکانات">
        <UTafsil :results="model.history" m="r" />
      </tab-content>
      <tab-content
        name="parkingAndKroki"
        title="پارکینگ و کروکی"
        :padding="false"
      >
        <UParkingAndKroki :results="model.history" m="r" />
      </tab-content>

      <tab-content name="description" title="توضیحات">
        <UDescription :results="model.history" m="r" />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import loadMapControlResponse from "../../models/loadMapControlResponse"

import USpecifications from "./../../partials/USpecifications"
import UKarbariha from "./../../partials/UKarbariha"
import UPishamadegiha from "./../../partials/UPishamadegiha"
import UEngineersTab from "./../../partials/UEngineersTab"
import UOtherSpecifications from "./../../partials/UOtherSpecifications"
import UTafsil from "./../../partials/UTafsil"
import UParkingAndKroki from "./../../partials/UParkingAndKroki"
import UDescription from "./../../partials/UDescription"

const defaultModel = loadMapControlResponse

export default {
  components: {
    USpecifications,
    UKarbariha,
    UPishamadegiha,
    UEngineersTab,
    UOtherSpecifications,
    UTafsil,
    UParkingAndKroki,
    UDescription
  },

  props: {
    value: {
      type: Object,
      default: () => {}
    },
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      activeTab: "specifications",
      model: { history: { ...defaultModel } }
    }
  },
  mounted () {
    if (this.value) {
      this.model.history = this.normalizeModel()
    } else this.model = { history: { ...defaultModel } }
  },
  methods: {
    normalizeArray (e) {
      debugger
      if (!Array.isArray(e)) return
      return e.map(a => Object.fromEntries(Object.entries(a).map(([k, v]) => [k, v._text]))) ?? []
      // debugger
    },
    normalizeModel () {
      const tmp = this.value
      // console.log("tmp :>> ", tmp)
      const res = {
        Base_Bezel: this.normalizeArray(tmp.Base_Bezel?.Base_Bezel || []),
        Base_BuildingInfo: {
          ActDate: tmp.Base_BuildingInfo?.ActDate?._text ?? null,
          AllowableDensityLicence: tmp.Base_BuildingInfo?.AllowableDensityLicence?._text ?? null,
          BusyArea: tmp.Base_BuildingInfo?.BusyArea?._text ?? null,
          CI_BuildingPosition: tmp.Base_BuildingInfo?.CI_BuildingPosition?._text ?? null,
          CI_CreateDesign: tmp.Base_BuildingInfo?.CI_CreateDesign?._text ?? null,
          CI_Criterion: tmp.Base_BuildingInfo?.CI_Criterion?._text ?? null,
          CI_HistoricalStatus: tmp.Base_BuildingInfo?.CI_HistoricalStatus?._text ?? null,
          CI_QuotaDuty: tmp.Base_BuildingInfo?.CI_QuotaDuty?._text ?? null,
          CI_RoofType: tmp.Base_BuildingInfo?.CI_RoofType?._text ?? null,
          CI_StableStatus: tmp.Base_BuildingInfo?.CI_StableStatus?._text ?? null,
          CI_VergeType: tmp.Base_BuildingInfo?.CI_VergeType?._text ?? null,
          CommercialGapDepth: tmp.Base_BuildingInfo?.CommercialGapDepth?._text ?? null,
          CreateYearFrom: tmp.Base_BuildingInfo?.CreateYearFrom?._text ?? null,
          CreateYearTo: tmp.Base_BuildingInfo?.CreateYearTo?._text ?? null,
          Defilade: tmp.Base_BuildingInfo?.Defilade?._text ?? null,
          DownerHeight: tmp.Base_BuildingInfo?.DownerHeight?._text ?? null,
          EndDate: tmp.Base_BuildingInfo?.EndDate?._text ?? null,
          Height: tmp.Base_BuildingInfo?.Height?._text ?? null,
          HeightKorsi: tmp.Base_BuildingInfo?.HeightKorsi?._text ?? null,
          InfrastructureArea: tmp.Base_BuildingInfo?.InfrastructureArea?._text ?? null,
          LightfastArea: tmp.Base_BuildingInfo?.LightfastArea?._text ?? null,
          MultiBuildingToftImpartArea: tmp.Base_BuildingInfo?.MultiBuildingToftImpartArea?._text ?? null,
          NidBase: tmp.Base_BuildingInfo?.NidBase?._text ?? null,
          ParkingGet: tmp.Base_BuildingInfo?.ParkingGet?._text ?? null,
          ParkingNeedCount: tmp.Base_BuildingInfo?.ParkingNeedCount?._text ?? null,
          ParkingSupplyCount: tmp.Base_BuildingInfo?.ParkingSupplyCount?._text ?? null,
          PlackWidth: tmp.Base_BuildingInfo?.PlackWidth?._text ?? null,
          PrivacyCourtyardArea: tmp.Base_BuildingInfo?.PrivacyCourtyardArea?._text ?? null,
          PrivacyCourtyardWidth: tmp.Base_BuildingInfo?.PrivacyCourtyardWidth?._text ?? null,
          RampArea: tmp.Base_BuildingInfo?.RampArea?._text ?? null,
          StartDate: tmp.Base_BuildingInfo?.StartDate?._text ?? null,
          UpperHeight: tmp.Base_BuildingInfo?.UpperHeight?._text ?? null
        },
        Base_CommonEstate: {
          BlockNo: tmp.Base_CommonEstate?.BlockNo?._text ?? null,
          CI_BuildingStep: tmp.Base_CommonEstate?.CI_BuildingStep?._text ?? null,
          CI_DocRefrence: tmp.Base_CommonEstate?.CI_DocRefrence?._text ?? null,
          CI_DocStatus: tmp.Base_CommonEstate?.CI_DocStatus?._text ?? null,
          CI_DocType: tmp.Base_CommonEstate?.CI_DocType?._text ?? null,
          CI_HouseUser: tmp.Base_CommonEstate?.CI_HouseUser?._text ?? null,
          CI_OwnerType: tmp.Base_CommonEstate?.CI_OwnerType?._text ?? null,
          CI_SideCode: tmp.Base_CommonEstate?.CI_SideCode?._text ?? null,
          CI_UsingGroup: tmp.Base_CommonEstate?.CI_UsingGroup?._text ?? null,
          CI_UsingType: tmp.Base_CommonEstate?.CI_UsingType?._text ?? null,
          CI_ViewCode: tmp.Base_CommonEstate?.CI_ViewCode?._text ?? null,
          Comments: tmp.Base_CommonEstate?.Comments?._text ?? null,
          CommercialGapWidth: tmp.Base_CommonEstate?.CommercialGapWidth?._text ?? null,
          DevotionName: tmp.Base_CommonEstate?.DevotionName?._text ?? null,
          DocComments: tmp.Base_CommonEstate?.DocComments?._text ?? null,
          DocExportDate: tmp.Base_CommonEstate?.DocExportDate?._text ?? null,
          DocTransferDate: tmp.Base_CommonEstate?.DocTransferDate?._text ?? null,
          FloorDone: tmp.Base_CommonEstate?.FloorDone?._text ?? null,
          NidAddress: tmp.Base_CommonEstate?.NidAddress?._text ?? null,
          NidBase: tmp.Base_CommonEstate?.NidBase?._text ?? null,
          Plack: tmp.Base_CommonEstate?.Plack?._text ?? null,
          Populations: tmp.Base_CommonEstate?.Populations?._text ?? null,
          PostOfficePrice: tmp.Base_CommonEstate?.PostOfficePrice?._text ?? null,
          RegisterSection: tmp.Base_CommonEstate?.RegisterSection?._text ?? null,
          TafkikComments: tmp.Base_CommonEstate?.TafkikComments?._text ?? null,
          TafkikDate: tmp.Base_CommonEstate?.TafkikDate?._text ?? null,
          TafkikNo: tmp.Base_CommonEstate?.TafkikNo?._text ?? null,
          Telephone: tmp.Base_CommonEstate?.Telephone?._text ?? null,
          TrusteeName: tmp.Base_CommonEstate?.TrusteeName?._text ?? null,
          Vahed: tmp.Base_CommonEstate?.Vahed?._text ?? null,
          ViewArea: tmp.Base_CommonEstate?.ViewArea?._text ?? null,
          ViewCommitment: tmp.Base_CommonEstate?.ViewCommitment?._text ?? null,
          ViewCommitmentDate: tmp.Base_CommonEstate?.ViewCommitmentDate?._text ?? null
        },
        Base_ControllerInfo: this.normalizeArray(tmp.Base_ControllerInfo?.Base_ControllerInfo || []),
        Base_ControllerInfo_EngineerSubSys: this.normalizeArray(tmp.Base_ControllerInfo_EngineerSubSys?.Base_ControllerInfo_EngineerSubSys || []),
        Base_Door: this.normalizeArray(tmp.Base_Door?.Base_Door || []),
        Base_Edge: this.normalizeArray(tmp.Base_Edge?.Base_Edge || []),
        Base_Front: this.normalizeArray(tmp.Base_Front?.Base_Front || []),
        Base_Gap: this.normalizeArray(tmp.Base_Gap?.Base_Gap || []),
        Base_GreenSpace: this.normalizeArray(tmp.Base_GreenSpace?.Base_GreenSpace || []),
        Base_HouseInfo: {
          ActDate: tmp.Base_HouseInfo?.ActDate?._text ?? null,
          AreaAfterEdit: tmp.Base_HouseInfo?.AreaAfterEdit?._text ?? null,
          AreaAfterScuttle: tmp.Base_HouseInfo?.AreaAfterScuttle?._text ?? null,
          ArsehDocNo: tmp.Base_HouseInfo?.ArsehDocNo?._text ?? null,
          AyanDocNo: tmp.Base_HouseInfo?.AyanDocNo?._text ?? null,
          BusyAreaWidth: tmp.Base_HouseInfo?.BusyAreaWidth?._text ?? null,
          CI_BoundCode: tmp.Base_HouseInfo?.CI_BoundCode?._text ?? null,
          CI_GeoStatus: tmp.Base_HouseInfo?.CI_GeoStatus?._text ?? null,
          CI_GlasshouseType: tmp.Base_HouseInfo?.CI_GlasshouseType?._text ?? null,
          CI_HouseStatus: tmp.Base_HouseInfo?.CI_HouseStatus?._text ?? null,
          CI_HouseType: tmp.Base_HouseInfo?.CI_HouseType?._text ?? null,
          CI_IncloseType: tmp.Base_HouseInfo?.CI_IncloseType?._text ?? null,
          CI_MotherDocStatus: tmp.Base_HouseInfo?.CI_MotherDocStatus?._text ?? null,
          CI_ParvanehType: tmp.Base_HouseInfo?.CI_ParvanehType?._text ?? null,
          CI_PoolType: tmp.Base_HouseInfo?.CI_PoolType?._text ?? null,
          CI_ShaftType: tmp.Base_HouseInfo?.CI_ShaftType?._text ?? null,
          CI_SpecialStatus: tmp.Base_HouseInfo?.CI_SpecialStatus?._text ?? null,
          CadastreCode: tmp.Base_HouseInfo?.CadastreCode?._text ?? null,
          CurrentArea: tmp.Base_HouseInfo?.CurrentArea?._text ?? null,
          DeepShaftCount: tmp.Base_HouseInfo?.DeepShaftCount?._text ?? null,
          DocArea: tmp.Base_HouseInfo?.DocArea?._text ?? null,
          GlasshouseArea: tmp.Base_HouseInfo?.GlasshouseArea?._text ?? null,
          HasPenalty: tmp.Base_HouseInfo?.HasPenalty?._text ?? null,
          HoughogheErtefaghi: tmp.Base_HouseInfo?.HoughogheErtefaghi?._text ?? null,
          MamarArea: tmp.Base_HouseInfo?.MamarArea?._text ?? null,
          MotherDocArea: tmp.Base_HouseInfo?.MotherDocArea?._text ?? null,
          NidBase: tmp.Base_HouseInfo?.NidBase?._text ?? null,
          PieceNo: tmp.Base_HouseInfo?.PieceNo?._text ?? null,
          PoolArea: tmp.Base_HouseInfo?.PoolArea?._text ?? null,
          PoolCubature: tmp.Base_HouseInfo?.PoolCubature?._text ?? null,
          RemainArea: tmp.Base_HouseInfo?.RemainArea?._text ?? null
        },
        Base_Neighbor: this.normalizeArray(tmp.Base_Neighbor?.Base_Neighbor || []),
        Base_OtherEquipment: this.normalizeArray(tmp.Base_OtherEquipment?.Base_OtherEquipment || []),
        Base_Parking: this.normalizeArray(tmp.Base_Parking?.Base_Parking || []),
        Base_PlanForWork: this.normalizeArray(tmp.Base_PlanForWork?.Base_PlanForWork || []),
        Base_PlanMojaz: this.normalizeArray(tmp.Base_PlanMojaz?.Base_PlanMojaz || []),
        Base_PlanMosavab: this.normalizeArray(tmp.Base_PlanMosavab?.Base_PlanMosavab || []),
        Base_RegisterPlack: this.normalizeArray(tmp.Base_RegisterPlack?.Base_RegisterPlack || []),
        Base_SupplyParking: this.normalizeArray(tmp.Base_SupplyParking?.Base_SupplyParking || []),
        Base_Using: this.normalizeArray(tmp.Base_Using?.Base_Using || []),
        Base_Using_PlanOrder: this.normalizeArray(tmp.Base_Using_PlanOrder?.Base_Using_PlanOrder || []),
        Base_Wall: this.normalizeArray(tmp.Base_Wall?.Base_Wall || []),
        MapControl_History: tmp.MapControl_History?._text ?? null,
        MapImage: tmp.MapImage?._text ?? null,
        NidBaseGlobal: tmp.NidBaseGlobal?._text ?? null,
        NidBase_Parvandeh_HouseOrDastgah: tmp.NidBase_Parvandeh_HouseOrDastgah?._text ?? null,
        NidLib: {
          RAgreement: tmp.NidLib?.RAgreement?._text ?? null,
          RApartment: tmp.NidLib?.RApartment?._text ?? null,
          RBuilding: tmp.NidLib?.RBuilding?._text ?? null,
          RDastgah: tmp.NidLib?.RDastgah?._text ?? null,
          REngineer: tmp.NidLib?.REngineer?._text ?? null,
          RHouse: {
            EumBaseInfoGroup: tmp.NidLib?.RHouse?.EumBaseInfoGroup?._text ?? null,
            EumRevisitGroup: tmp.NidLib?.RHouse?.EumRevisitGroup?._text ?? null,
            NidBase: tmp.NidLib?.RHouse?.NidBase?._text ?? null,
            NidNosaziCode: tmp.NidLib?.RHouse?.NidNosaziCode?._text ?? null,
            NidRevisit: tmp.NidLib?.RHouse?.NidRevisit?._text ?? null
          },
          RMain: {
            EumBaseInfoGroup: tmp.NidLib?.RMain?.EumBaseInfoGroup?._text ?? null,
            EumRevisitGroup: tmp.NidLib?.RMain?.EumRevisitGroup?._text ?? null,
            NidBase: tmp.NidLib?.RMain?.NidBase?._text ?? null,
            NidNosaziCode: tmp.NidLib?.RMain?.NidNosaziCode?._text ?? null,
            NidRevisit: tmp.NidLib?.RMain?.NidRevisit?._text ?? null
          },
          RMainCodeInfo: {
            Apartment: tmp.NidLib?.RMainCodeInfo?.Apartment,
            Block: tmp.NidLib?.RMainCodeInfo?.Block,
            Building: tmp.NidLib?.RMainCodeInfo?.Building,
            CI_City: tmp.NidLib?.RMainCodeInfo?.CI_City,
            CreateDate: tmp.NidLib?.RMainCodeInfo?.CreateDate,
            CreateTime: tmp.NidLib?.RMainCodeInfo?.CreateTime,
            DeleteDate: tmp.NidLib?.RMainCodeInfo?.DeleteDate,
            DeleteTime: tmp.NidLib?.RMainCodeInfo?.DeleteTime,
            DeletedID: tmp.NidLib?.RMainCodeInfo?.DeletedID,
            DeletedNidUser: tmp.NidLib?.RMainCodeInfo?.DeletedNidUser,
            DeletedUserName: tmp.NidLib?.RMainCodeInfo?.DeletedUserName,
            District: tmp.NidLib?.RMainCodeInfo?.District,
            EumNosaziCodeGroup: tmp.NidLib?.RMainCodeInfo?.EumNosaziCodeGroup,
            EumNosaziCodeObjType: tmp.NidLib?.RMainCodeInfo?.EumNosaziCodeObjType,
            House: tmp.NidLib?.RMainCodeInfo?.House,
            NidNosaziCode: tmp.NidLib?.RMainCodeInfo?.NidNosaziCode,
            NidNosaziCode_Parent: tmp.NidLib?.RMainCodeInfo?.NidNosaziCode_Parent,
            NidUser: tmp.NidLib?.RMainCodeInfo?.NidUser,
            Region: tmp.NidLib?.RMainCodeInfo?.Region,
            Shop: tmp.NidLib?.RMainCodeInfo?.Shop,
            UserName: tmp.NidLib?.RMainCodeInfo?.UserName
          },
          RMapControl: {
            EumBaseInfoGroup: tmp.NidLib?.RMapControl?.EumBaseInfoGroup?._text ?? null,
            EumRevisitGroup: tmp.NidLib?.RMapControl?.EumRevisitGroup?._text ?? null,
            NidBase: tmp.NidLib?.RMapControl?.NidBase?._text ?? null,
            NidNosaziCode: tmp.NidLib?.RMapControl?.NidNosaziCode?._text ?? null,
            NidRevisit: tmp.NidLib?.RMapControl?.NidRevisit?._text ?? null
          },
          RMovafeghatOsooli: tmp.NidLib?.RMovafeghatOsooli?._text ?? null,
          RPeace: tmp.NidLib?.RPeace?._text ?? null,
          RPlanOrder: tmp.NidLib?.RPlanOrder?._text ?? null,
          RRequest: {
            AbsoluteUnit: tmp.NidLib?.RRequest?.AbsoluteUnit?._text ?? null,
            ActiveNidAnalysisBuilding_Khalaf: tmp.NidLib?.RRequest?.ActiveNidAnalysisBuilding_Khalaf?._text ?? null,
            ActiveNidAnalysisBuilding_MovafeghatOsooli: tmp.NidLib?.RRequest?.ActiveNidAnalysisBuilding_MovafeghatOsooli?._text ?? null,
            ActiveNidAnalysisBuilding_Parvaneh: tmp.NidLib?.RRequest?.ActiveNidAnalysisBuilding_Parvaneh?._text ?? null,
            ActiveNidIncome: tmp.NidLib?.RRequest?.ActiveNidIncome?._text ?? null,
            ActiveNidZabeteh: tmp.NidLib?.RRequest?.ActiveNidZabeteh?._text ?? null,
            AutomationNid: tmp.NidLib?.RRequest?.AutomationNid?._text ?? null,
            AutomationNo: tmp.NidLib?.RRequest?.AutomationNo?._text ?? null,
            BuyerCellphone: tmp.NidLib?.RRequest?.BuyerCellphone?._text ?? null,
            BuyerName: tmp.NidLib?.RRequest?.BuyerName?._text ?? null,
            BuyerNationalCode: tmp.NidLib?.RRequest?.BuyerNationalCode?._text ?? null,
            CI_GarbageArchiveCause: tmp.NidLib?.RRequest?.CI_GarbageArchiveCause?._text ?? null,
            CI_Requester: tmp.NidLib?.RRequest?.CI_Requester?._text ?? null,
            CI_RequesterOwnerType: tmp.NidLib?.RRequest?.CI_RequesterOwnerType?._text ?? null,
            Cellphone: tmp.NidLib?.RRequest?.Cellphone?._text ?? null,
            Comment: tmp.NidLib?.RRequest?.Comment?._text ?? null,
            CommentsGarbageKartabl: tmp.NidLib?.RRequest?.CommentsGarbageKartabl?._text ?? null,
            CommentsPermanentKartabl: tmp.NidLib?.RRequest?.CommentsPermanentKartabl?._text ?? null,
            EMail: tmp.NidLib?.RRequest?.EMail?._text ?? null,
            EumRequestStatus: tmp.NidLib?.RRequest?.EumRequestStatus?._text ?? null,
            GarbageKartablDate: tmp.NidLib?.RRequest?.GarbageKartablDate?._text ?? null,
            GarbageKartablTime: tmp.NidLib?.RRequest?.GarbageKartablTime?._text ?? null,
            IsOthersReqAttached: tmp.NidLib?.RRequest?.IsOthersReqAttached?._text ?? null,
            IsParallel: tmp.NidLib?.RRequest?.IsParallel?._text ?? null,
            IsRegisterFromUGP: tmp.NidLib?.RRequest?.IsRegisterFromUGP?._text ?? null,
            LastRequestState: tmp.NidLib?.RRequest?.LastRequestState?._text ?? null,
            MainRequesterDate: tmp.NidLib?.RRequest?.MainRequesterDate?._text ?? null,
            MainRequesterName: tmp.NidLib?.RRequest?.MainRequesterName?._text ?? null,
            MainRequesterNo: tmp.NidLib?.RRequest?.MainRequesterNo?._text ?? null,
            MandateDate: tmp.NidLib?.RRequest?.MandateDate?._text ?? null,
            MandateNo: tmp.NidLib?.RRequest?.MandateNo?._text ?? null,
            NidNosaziCode: tmp.NidLib?.RRequest?.NidNosaziCode?._text ?? null,
            NidProc: tmp.NidLib?.RRequest?.NidProc?._text ?? null,
            NidProc_Attached: tmp.NidLib?.RRequest?.NidProc_Attached?._text ?? null,
            NidRevisit: tmp.NidLib?.RRequest?.NidRevisit?._text ?? null,
            NidTemporaryKartabl_Last: tmp.NidLib?.RRequest?.NidTemporaryKartabl_Last?._text ?? null,
            NidUserGarbageKartabl: tmp.NidLib?.RRequest?.NidUserGarbageKartabl?._text ?? null,
            NidUserPermanentKartabl: tmp.NidLib?.RRequest?.NidUserPermanentKartabl?._text ?? null,
            NidWorkItem: tmp.NidLib?.RRequest?.NidWorkItem?._text ?? null,
            NidWorkItemOld: tmp.NidLib?.RRequest?.NidWorkItemOld?._text ?? null,
            NidWorkflowDeff: tmp.NidLib?.RRequest?.NidWorkflowDeff?._text ?? null,
            PermanentKartablDate: tmp.NidLib?.RRequest?.PermanentKartablDate?._text ?? null,
            PermanentKartablTime: tmp.NidLib?.RRequest?.PermanentKartablTime?._text ?? null,
            PostCode: tmp.NidLib?.RRequest?.PostCode?._text ?? null,
            RequestDate: tmp.NidLib?.RRequest?.RequestDate?._text ?? null,
            RequestTime: tmp.NidLib?.RRequest?.RequestTime?._text ?? null,
            RequesterAddress: tmp.NidLib?.RRequest?.RequesterAddress?._text ?? null,
            RequesterName: tmp.NidLib?.RRequest?.RequesterName?._text ?? null,
            RequesterNationalCode: tmp.NidLib?.RRequest?.RequesterNationalCode?._text ?? null,
            SecretariatComments: tmp.NidLib?.RRequest?.SecretariatComments?._text ?? null,
            SecretariatDate: tmp.NidLib?.RRequest?.SecretariatDate?._text ?? null,
            SecretariatNo: tmp.NidLib?.RRequest?.SecretariatNo?._text ?? null,
            TelephoneNo: tmp.NidLib?.RRequest?.TelephoneNo?._text ?? null,
            TransferDang: tmp.NidLib?.RRequest?.TransferDang?._text ?? null,
            UserNameGarbageKartabl: tmp.NidLib?.RRequest?.UserNameGarbageKartabl?._text ?? null,
            UserNamePermanentKartabl: tmp.NidLib?.RRequest?.UserNamePermanentKartabl?._text ?? null,
            WorkflowTitel: tmp.NidLib?.RRequest?.WorkflowTitel?._text ?? null
          },
          RSenfi: tmp.NidLib?.RSenfi?._text ?? null,
          RTechnicalBoard: tmp.NidLib?.RTechnicalBoard?._text ?? null,
          RZabetehChideman: {
            EumBaseInfoGroup: tmp.NidLib?.RZabetehChideman?.EumBaseInfoGroup?._text ?? null,
            EumRevisitGroup: tmp.NidLib?.RZabetehChideman?.EumRevisitGroup?._text ?? null,
            NidBase: tmp.NidLib?.RZabetehChideman?.NidBase?._text ?? null,
            NidNosaziCode: tmp.NidLib?.RZabetehChideman?.NidNosaziCode?._text ?? null,
            NidRevisit: tmp.NidLib?.RZabetehChideman?.NidRevisit?._text ?? null
          }
        },
        NidProc: tmp.NidProc?._text ?? null,
        Sh_BaroKaf: {
          BarKafComments: tmp.Sh_BaroKaf?.BarKafComments?._text ?? null,
          CI_AreaType: tmp.Sh_BaroKaf?.CI_AreaType?._text ?? null,
          CI_Criterion: tmp.Sh_BaroKaf?.CI_Criterion?._text ?? null,
          CI_Frontage: tmp.Sh_BaroKaf?.CI_Frontage?._text ?? null,
          CI_QuotaDuty: tmp.Sh_BaroKaf?.CI_QuotaDuty?._text ?? null,
          CI_Train: tmp.Sh_BaroKaf?.CI_Train?._text ?? null,
          CI_VergeType: tmp.Sh_BaroKaf?.CI_VergeType?._text ?? null,
          GreenArea: tmp.Sh_BaroKaf?.GreenArea?._text ?? null,
          IsTransferToUrban: tmp.Sh_BaroKaf?.IsTransferToUrban?._text ?? null,
          KorokiDate: tmp.Sh_BaroKaf?.KorokiDate?._text ?? null,
          KorokiNumber: tmp.Sh_BaroKaf?.KorokiNumber?._text ?? null,
          NidBase: tmp.Sh_BaroKaf?.NidBase?._text ?? null,
          PathValue: tmp.Sh_BaroKaf?.PathValue?._text ?? null,
          PathValueBaseonDeed: tmp.Sh_BaroKaf?.PathValueBaseonDeed?._text ?? null,
          ToAdjusentArea: tmp.Sh_BaroKaf?.ToAdjusentArea?._text ?? null,
          ToAdjusentLen: tmp.Sh_BaroKaf?.ToAdjusentLen?._text ?? null,
          ToGangwayArea: tmp.Sh_BaroKaf?.ToGangwayArea?._text ?? null,
          ToGangwayLen: tmp.Sh_BaroKaf?.ToGangwayLen?._text ?? null,
          ValueAddedChangeUsing: tmp.Sh_BaroKaf?.ValueAddedChangeUsing?._text ?? null,
          ValueAddedChangeWith: tmp.Sh_BaroKaf?.ValueAddedChangeWith?._text ?? null,
          ValueAddedPriorityUsing: tmp.Sh_BaroKaf?.ValueAddedPriorityUsing?._text ?? null
        },
        Sh_MapControl: {
          Comments: tmp.Sh_MapControl?.Comments?._text ?? null,
          NidBase: tmp.Sh_MapControl?.NidBase?._text ?? null,
          SerialNo: tmp.Sh_MapControl?.SerialNo?._text ?? null
        },
        Sh_PlanOrder: {
          AllowableDensityLicence: tmp.Sh_PlanOrder?.AllowableDensityLicence?._text ?? null,
          Comments: tmp.Sh_PlanOrder?.Comments?._text ?? null,
          Defilade: tmp.Sh_PlanOrder?.Defilade?._text ?? null,
          DensityInPerformance: tmp.Sh_PlanOrder?.DensityInPerformance?._text ?? null,
          Height: tmp.Sh_PlanOrder?.Height?._text ?? null,
          NidBase: tmp.Sh_PlanOrder?.NidBase?._text ?? null,
          PlanOrderDate: tmp.Sh_PlanOrder?.PlanOrderDate?._text ?? null,
          PlanOrderNo: tmp.Sh_PlanOrder?.PlanOrderNo?._text ?? null
        },
        pUser: tmp.pUser?._text ?? null
      }
      // console.log("res :>> ", res)
      return res
    }
  }
}
</script>
