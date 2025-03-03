<template>
  <fit>
    <safa-status :result="getInfoRes" />
    <safa-status :result="saveInfoRes" />

    <safa-tabs :padding="false" fit class="fit" v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu
          v-for="tab in tabsList"
          :key="tab.key"
          :name="tab.key"
          :label="tab.label"
        />
      </template>
      <tab-content v-for="tab in tabsList" :key="tab.key" :name="tab.key">
        <component
          :is="`USearchUTreeInfoUApartment${tab.key}`"
          :ref="`USearchUTreeInfoUApartment${tab.key}`"
          :dataContext="dataContext"
          :isLoadedFromMenu="params.IsLoadedFromMenu"
          :m="m"
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"

// Components
import USearchUTreeInfoUApartmentBaseInfo from "./u-search-u-treeInfo-u-apartment-partials/USearchUTreeInfoUApartmentBaseInfo"
import USearchUTreeInfoUApartmentInstallation from "./u-search-u-treeInfo-u-apartment-partials/USearchUTreeInfoUApartmentInstallation"
import USearchUTreeInfoUApartmentOwner from "./u-search-u-treeInfo-u-apartment-partials/USearchUTreeInfoUApartmentOwner"
import USearchUTreeInfoUApartmentUsingFront from "./u-search-u-treeInfo-u-apartment-partials/USearchUTreeInfoUApartmentUsingFront"

// Utils
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"
import { uid } from "quasar"

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

export default {
  name: "USearchUTreeInfoUApartment",

  mixins: [baseFormMixin],

  components: {
    USearchUTreeInfoUApartmentBaseInfo,
    USearchUTreeInfoUApartmentInstallation,
    USearchUTreeInfoUApartmentOwner,
    USearchUTreeInfoUApartmentUsingFront
  },

  props: {
    params: Object,
    m: {
      type: String,
      default: "r"
    },
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      // Context
      dataContext: {
        mainContext: {
          Base_Info: {},
          Base_NosaziCode: {},
          Base_BlockInfo: {},
          Base_Front: [],
          Base_Using: [],
          Base_Owner: [],
          Base_Edge: [],
          Base_Installation: [],
          Base_OtherEquipment: []
        },
        preNosaziCode: { ...defaultNosaziCode },
        nosaziCode: { ...defaultNosaziCode },
        nosaziPreCode: "",
        preNosaziCodeEnable: true,
        nosaziCodeEnable: false,
        nosaziPreCodeEnable: false
      },

      // Labels
      labels: {
        surveyor: ""
      },

      // Tabs
      tabsList: [
        {
          key: "BaseInfo",
          label: "مشخصات"
        },
        {
          key: "Installation",
          label: "تاسیسات"
        },
        {
          key: "Owner",
          label: "مالکین"
        },
        {
          key: "UsingFront",
          label: "کاربریها و پیش آمدگیها"
        }
      ],
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
      if (!this.params.IsLoadedFromMenu) {
        this.visibility.showHeader = false
      }

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
                `${this.getInfoRes.data.Base_Info.Survey_District}-${this.getInfoRes.data.Base_Info.Survey_Region}-${this.getInfoRes.data.Base_Info.Survey_Block}-${this.getInfoRes.data.Base_Info.Survey_House}-${this.getInfoRes.data.Base_Info.Survey_Building}-${this.getInfoRes.data.Base_Info.Survey_Apartment}-${this.getInfoRes.data.Base_Info.Survey_Shop}`
              )
              this.dataContext.nosaziCode = convertStringToNosaziCodeObject(
                `${this.getInfoRes.data.Base_Info.District}-${this.getInfoRes.data.Base_Info.Region}-${this.getInfoRes.data.Base_Info.Block}-${this.getInfoRes.data.Base_Info.House}-${this.getInfoRes.data.Base_Info.Building}-${this.getInfoRes.data.Base_Info.Apartment}-${this.getInfoRes.data.Base_Info.Shop}`
              )

              if (this.getInfoRes.data._CanEditPreCode) {
                this.dataContext.preNosaziCodeEnable = true
                this.dataContext.nosaziCodeEnable = true
              }

              await this.log({
                action: this.logActions.view,
                bizCode: this.params.NidBase,
                bizCodeTitle: "NidBase",
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
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
      this.dataContext.mainContext.Base_Using.filter((e, index, self) =>
        self.findIndex((x) => x.NidUsing === e.NidUsing) !== index).forEach((e) => {
        e.NidUsing = uid()
      })

      Object.entries(this.dataContext.nosaziCode).forEach(
        ([property, value]) => {
          tmpObj.Base_Info[property] = value
        }
      )

      this.$services.SO.saveInfo({
        pObj: tmpObj
      })
        .then(async ({ data }) => {
          this.saveInfoRes = this.getResponse(data)

          if (this.saveInfoRes.success) {
            this.showSuccess("ذخیره آپارتمان با موفقیت انجام شد !")
            this.$emit("updateIsEditable", false)

            await this.log({
              action: this.logActions.save,
              bizCode: convertNosaziCodeObjectToString(
                this.dataContext.nosaziCode
              ),
              bizCodeTitle: "NosaziCode",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
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
