<template>
    <safa-form :id="formKey" :caption="title"
 >
   <fit>
     <safa-status :result="getInfoRes" />
     <safa-status :result="saveInfoRes" />

     <safa-tabs :padding="false" fit class="fit" v-model="activeTab">
       <template v-slot:tabs>
           <tab-menu name="ApartmentInfo" label="مشخصات ساختمان" />
           <tab-menu name="Installation" label= "تاسیسات"/>
           <tab-menu name="Using" label="کاربریها و بالکن ها" />

       </template>
       <tab-content name="ApartmentInfo">
         <ApartmentInfo

         v-model="model.dataContext"

         />
       </tab-content>
       <tab-content name="Installation">
         <Installation
         v-model="model.dataContext"

         />
       </tab-content>
       <tab-content name="Using">
         <Using
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
import ApartmentInfo from "./partials/ApartmentInfo"
import Installation from "./partials/Installation"
import Using from "./partials/Using"

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
// const defaultNosaziCodeStr = "0-0-0-0-0-0-0"
const defaultModel = {
  nosaziCodeEnable: "",
  preNosaziCode: "",
  preNosaziCodeEnable: "",
  Base_Info: {
    NorgirArea: "",
    TajavozArea: "",
    StartDate: "",
    EndDate: "",
    CI_BuildingStep: "",
    CI_BuildingPosition: "",
    CI_QuestionnaireType: "",
    Comments: ""

  },
  Base_Installation: {},
  Base_Using: {},
  Base_Front: {}

}

export default {
  name: "UUCBuilding",
  mixins: [baseFormMixin],
  components: {
    ApartmentInfo,
    Installation,
    Using

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
      title: "ممیزی- اطلاعات ساختمان",
      formKey: "208D978A-F60B-44D4-9B65-2425720CD68D",
      main: true,
      model: { dataContext: { ...defaultModel } },

      nosaziCode: { ...defaultNosaziCode },
      nosaziPreCode: "",
      nosaziPreCodeEnable: false,

      // Labels
      labels: {
        surveyor: ""
      },

      activeTab: "ApartmentInfo",

      // Visibility
      visibility: {},

      // Responses
      getInfoRes: null,
      saveInfoRes: null
    }
  },

  methods: {
    async loadObj () {
      if (!this.params.IsLoadedFromMenu) {
        this.visibility.showHeader = false
      }

      this.showLoading()

      await this.$services.SO.getInfo({
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

      this.$services.SO.saveInfo({
        pObj: tmpObj
      })
        .then(async ({ data }) => {
          this.saveInfoRes = this.getResponse(data)

          if (this.saveInfoRes.success) {
            this.showSuccess("ذخیره ساختمان با موفقیت انجام شد !")
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
