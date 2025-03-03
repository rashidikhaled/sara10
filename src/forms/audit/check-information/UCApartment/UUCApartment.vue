<template>
    <safa-form :id="formKey" :caption="title"
 >
   <fit>
     <safa-status :result="getInfoRes" />
     <safa-status :result="saveInfoRes" />

     <safa-tabs :padding="false" fit class="fit" v-model="activeTab">
       <template v-slot:tabs>
           <tab-menu name="BaseInfo" label="مشخصات آپارتمان" />
           <tab-menu name="Installation" label="تاسیسات" />
           <tab-menu name="Subscriptions" label="مجوزات و اشتراکات" />
           <tab-menu name="UsingFront" label="کاربریها و پیش آمدگیها" />

       </template>
       <tab-content name="BaseInfo">
         <BaseInfo

         v-model="model.dataContext"

         />
       </tab-content>
       <tab-content name="Installation">
         <Installation
         v-model="model.dataContext"

         />
       </tab-content>
       <tab-content name="Subscriptions">
         <Subscriptions
         v-model="model.dataContext"

         />
       </tab-content>
       <tab-content name="UsingFront">
         <UsingFront
         v-model="model.dataContext"

         />
       </tab-content>
     </safa-tabs>
   </fit>
</safa-form>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
// Components
import BaseInfo from "./partials/BaseInfo"
import Installation from "./partials/Installation"
import Subscriptions from "./partials/Subscriptions"
import UsingFront from "./partials/UsingFront"

// Utils
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"

// Constants
const defaultNosaziCode = {
  District: 0,
  Region: 0,
  Block: 0,
  House: 0,
  Building: 0,
  Apartment: 0,
  Shop: 0
}
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"
// const defaultNosaziCodeStr = "0-0-0-0-0-0-0"
const defaultModel = {
  nosaziCode: "",
  nosaziCodeEnable: "",
  preNosaziCode: "",
  preNosaziCodeEnable: "",
  Base_Info: {
    MainAddress: "",
    FamousRegion: "",
    Plack: "",
    BlockNo: "",
    PostCode: "",
    FloorDone: "",
    Asli: "",
    Fari: "",
    RegisterSection: "",
    DocArea: "",
    CI_HouseStatus: "",
    CurrentArea: "",
    CI_DocType: "",
    CI_OwnerType: "",
    CI_DocStatus: "",
    MafrooziDoc: "",
    BuildingCount: "",
    ApartmentCount: "",
    ShopCount: "",
    FloorCount: "",
    CI_PoolType: "",
    ToftImpart: "",
    AntenType: "",
    PoolCubature: "",
    ShaftCount: "",
    CI_OperatorType: "",
    Ghete: "",
    UsefulTreeCount: "",
    AntenHeight: "",
    NonUsefulTreeCount: "",
    ApartmentFrontArea: "",
    GlasshouseArea: "",
    TotalArea_Apartment: "",
    FamilyCount: "",
    InsideTreeType: "",
    OutsideTreeType: "",
    ParkingRamp: "",
    HasRegularShape: "",
    CI_SideCode: "",
    ApartmentMoshaArea: "",
    CarCount: "",
    HasAb: "",
    SubScription_Ab: "",
    HasBargh: "",
    SubScription_Bargh: "",
    HasGaz: "",
    SubScription_Gaz: "",
    HasTel: "",
    SubScription_Telephon: "",
    ParkingCount: "",
    Populations: "",
    ApartmentUsefulArea: "",
    ParkingArea: "",
    CI_FrontType: "",
    AnbarArea: "",
    LastMafasa_Value: "",
    TajavozArea: "",
    Comments: "",
    LastFiche_FicheNo: "",
    LastFiche_Credit: "",
    LastFiche_PaymentDate: "",
    LastFiche_FromToYear: "",
    LastPayankar_CertificateNo: "",
    LastMafasa: "",
    LastMafasa_Date: "",
    CI_QuestionnaireType: "",
    LastParvaneh_CertificateNo: "",
    LastPayankar_CertificateDate: "",
    LastParvaneh_CertificateDate: ""

  },
  Base_Installation: {},
  Base_Front: {},
  Base_Using: {}

}

export default {
  name: "UUCApartment",
  mixins: [baseFormMixin],
  components: {
    BaseInfo,
    Installation,
    Subscriptions,
    UsingFront

  },

  props: {
    params: Object,
    m: {
      type: String,
      default: "r"
    },
    name: String
  },

  data () {
    return {
      title: "اممیزی- اطلاعات آپارتمان",
      formKey: "DDAFE145-3CE5-4480-9B92-DDECF0C79D5C",
      main: true,
      model: { dataContext: { ...defaultModel } },

      nosaziCode: { ...defaultNosaziCode },
      nosaziPreCode: "",
      nosaziPreCodeEnable: false,

      // Labels
      labels: {
        surveyor: ""
      },

      activeTab: "BaseInfo",

      // Visibility
      visibility: {},

      // Responses
      getInfoRes: null,
      saveInfoRes: null
    }
  },

  methods: {
    loadObj () {
      this.loadHouseInfo()

      if (!this.params.IsLoadedFromMenu) {
        this.visibility.showHeader = false
      }
    },

    loadHouseInfo () {
      this.showLoading()

      this.$services.SO.getInfo({
        pNidBase: this.params.NidBase,
        pIsCopy: !this.params.IsLoadedFromMenu
      })
        .then(async ({ data }) => {
          this.getInfoRes = this.getResponse(data)

          if (this.getInfoRes.success) {
            this.$emit("setSurveyor", this.getInfoRes.data.Surveyor)

            this.dataContext.mainContext = this.getInfoRes.data
            this.labels.surveyor = this.getInfoRes.data.Surveyor

            if (this.getInfoRes.data.Base_Info) {
              this.dataContext.preNosaziCode = convertStringToNosaziCodeObject(
                `${this.getInfoRes.data.Base_Info.Survey_District}-${this.getInfoRes.data.Base_Info.Survey_Region}-${this.getInfoRes.data.Base_Info.Survey_Block}-${this.getInfoRes.data.Base_Info.Survey_House}-${this.getInfoRes.data.Base_Info.Survey_Building}-${this.getInfoRes.data.Base_Info.Survey_Apartment}-${this.getInfoRes.data.Base_Info.Survey_Shop}}`
              )
              this.dataContext.nosaziCode = convertStringToNosaziCodeObject(
                `${this.getInfoRes.data.Base_Info.District}-${this.getInfoRes.data.Base_Info.Region}-${this.getInfoRes.data.Base_Info.Block}-${this.getInfoRes.data.Base_Info.House}-${this.getInfoRes.data.Base_Info.Building}-${this.getInfoRes.data.Base_Info.Apartment}-${this.getInfoRes.data.Base_Info.Shop}}`
              )

              if (this.getInfoRes.data._CanEditPreCode) {
                this.dataContext.preNosaziCodeEnable = true
                this.dataContext.nosaziCodeEnable = true
              }

              await this.log({
                action: this.logActions.view,
                bizCode: this.params.NidBase,
                bizCodeTitle: "NidBase",
                saveDesc: `نمایش اطلاعات در فرم ${this.title} انجام گردید.`
              })
            }
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveAction () {
      this.showLoading()

      const tmpObj = { ...this.dataContext.mainContext }

      Object.entries(this.dataContext.preNosaziCode).forEach(
        ([property, value]) => {
          tmpObj.Base_Info[`Survey_${property}`] = value
        }
      )

      Object.entries(this.dataContext.nosaziCode).forEach(
        ([property, value]) => {
          tmpObj.Base_Info[property] = value
        }
      )

      tmpObj.Base_PreCodeInfo = [
        {
          ID: 0,
          NidBase: EMPTY_GUID,
          NidPreCode: EMPTY_GUID,
          PreCode: this.dataContext.nosaziPreCode,
          PreCode2: "",
          Status: ""
        }
      ]

      this.$services.SO.saveInfo({
        pObj: tmpObj
      })
        .then(async ({ data }) => {
          this.saveInfoRes = this.getResponse(data)

          if (this.saveInfoRes.success) {
            this.showSuccess("ذخیره عرصه با موفقیت انجام شد !")
            this.$emit("updateIsEditable", false)

            await this.log({
              action: this.logActions.save,
              bizCode: convertNosaziCodeObjectToString(
                this.dataContext.nosaziCode
              ),
              bizCodeTitle: "NosaziCode",
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.loadObj()
          } else {
            this.hideLoading()
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
          this.hideLoading()
        })
        .finally(() => {
          // this.hideLoading()
        })
    }
  }
}
</script>
