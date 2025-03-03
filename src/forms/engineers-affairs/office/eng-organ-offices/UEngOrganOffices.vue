<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20c96248-c0c2-4da0-bb07-9480b0c95dce"
  >
    <form-wrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="loadDataRes" />
      <safa-status :result="result" />
      <safa-status :result="saveResult" />
    </template>
      <OfficesList v-model="model.engOrgOffice" @selectRow="selectRow" />

      <safa-popup title="دفتر نظام مهندسی" v-model="showOrganOffice" height="450px">
        <form-wrapper :padding="false">
          <OrganOffice
            v-model="model.engOrgOffice"
            @saveData="saveData"
            :m="mode"
          />
          <template v-slot:footer>
            <form-actions
              :m="mode"
              @edit="isEditable = true"
              @cancel="isEditable = false"
              @save="saveData"
            >
            </form-actions>
          </template>
        </form-wrapper>
      </safa-popup>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          showEditButton
          showNewButton
          @edit="editData"
          @newInfo="newData"
          @cancel="loadData"
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import OrganOffice from "./partials/OrganOffice.vue"
import OfficesList from "./partials/OfficesList.vue"

const defaultModel = {
  EngOrgan_OfficeCity: [],
  EngOrgan_OfficeCityList: [],
  EngOrgan_OfficeInfo: null,
  EngOrgan_OfficeInfoList: [],
  NidEngOrgOff: "00000000-0000-0000-0000-000000000000"
}

export default {
  components: { OfficesList, OrganOffice },
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UEngOrganOffices",
      formKey: "327289f5-9628-4c1c-9f1d-0eeaee727779",
      title: "دفاتر نظام مهندسی",
      main: true,
      showOrganOffice: false,
      model: { engOrgOffice: { ...defaultModel } },
      loadEngOrganOfficeRes: null,
      loadDataRes: null,
      saveResult: null,
      result: null
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.showLoading()
      this.isEditable = false
      let payLoad = {
        pRequest: {}
      }
      this.$services.engineers
        .getEngOrganOfficeInfoList(payLoad)
        .then(async ({ data }) => {
          this.loadDataRes = this.getResponse(data)
          if (this.loadDataRes.success) {
            this.model.engOrgOffice.EngOrgan_OfficeInfoList =
              this.loadDataRes.data.GetEngOrgan_OfficeInfoListResult.EngOrgan_OfficeInfoList
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadEngOrganOffice () {
      this.showLoading()
      let payLoad = {
        pNidEngOrgOff: this.model.engOrgOffice.NidEngOrgOff
          ? this.model.engOrgOffice.NidEngOrgOff
          : "00000000-0000-0000-0000-000000000000"
      }
      this.$services.engineers
        .LoadEngOrganOffice(payLoad)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.loadEngOrganOfficeRes =
              this.result.data.Load_EngOrgan_OfficeResult
            if (
              this.result.data.Load_EngOrgan_OfficeResult
                .EngOrgan_OfficeInfo !== null
            ) {
              this.model.engOrgOffice.EngOrgan_OfficeInfo =
                this.result.data.Load_EngOrgan_OfficeResult.EngOrgan_OfficeInfo
            }

            if (
              this.result.data.Load_EngOrgan_OfficeResult.EngOrgan_OfficeCity
                .length > 0
            ) {
              this.model.engOrgOffice.EngOrgan_OfficeCity =
                this.result.data.Load_EngOrgan_OfficeResult.EngOrgan_OfficeCity
            }
            this.loadData()
            await this.log({
              action: this.logActions.view,
              bizCode: this.model.engOrgOffice.NidEngOrgOff,
              bizCodeTitle: "NidEngOrgOff"
            })
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    editData () {
      if (
        this.model.engOrgOffice.NidEngOrgOff ===
        "00000000-0000-0000-0000-000000000000"
      ) {
        return this.showError("لطفا ردیف مورد نظر را انتخاب نمایید")
      } else {
        this.loadEngOrganOffice()
        this.showOrganOffice = true
      }
    },
    selectRow (row) {
      this.model.engOrgOffice.NidEngOrgOff = row.NidEngOrgOff
    },
    newData () {
      this.model.engOrgOffice = {
        EngOrgan_OfficeCity: [],
        EngOrgan_OfficeCityList: null,
        EngOrgan_OfficeInfo: {
          IdentityCodeCEO: null,
          NidEngCEO: null,
          NidEngOrgOff: "00000000-0000-0000-0000-000000000000",
          OfficeAddress: null,
          OfficeCode: null,
          OfficeFax: null,
          OfficeName: null,
          OfficePhone: null,
          RegisterDate: null
        },
        EngOrgan_OfficeInfoList: [],
        NidEngOrgOff: "00000000-0000-0000-0000-000000000000"
      }
      this.loadEngOrganOffice()
      this.showOrganOffice = true
    },
    saveData () {
      if (
        this.model.engOrgOffice.EngOrgan_OfficeInfo.NidEngCEO === null ||
        this.model.engOrgOffice.EngOrgan_OfficeInfo.NidEngCEO ===
          "00000000-0000-0000-0000-000000000000"
      ) {
        return this.showError("مدیر دفتر انتخاب نشده است.")
      }
      this.loadEngOrganOfficeRes.EngOrgan_OfficeCity = this.model.engOrgOffice.EngOrgan_OfficeCity.map(x => {
        return {
          ...x,
          CI_City: x.CI_City,
          NidEngOrgOff: "00000000-0000-0000-0000-000000000000",
          NidEngOrgOffCity: "00000000-0000-0000-0000-000000000000"
        }
      })
      this.showLoading()
      let payLoad = {
        pObj: this.loadEngOrganOfficeRes
      }
      this.$services.engineers
        .SaveEngOrganOffice(payLoad)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess("عملیات با موفقیت انجام گردید.")
            this.showOrganOffice = false
            this.loadData()
            await this.log({
              action: this.logActions.save,
              bizCode: this.model.engOrgOffice.NidEngOrgOff,
              bizCodeTitle: "NidEngOrgOff"
            })
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
