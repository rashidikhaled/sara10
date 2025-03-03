<template>
<safa-form :id="formKey" :caption="title" app-id="92404D00-D287-4A09-9596-29FCC9BC9DB9">
  <form-wrapper :title="title" :padding="false">
  <template #header>
    <safa-status :result="result" />
    <safa-status :result="saveResult" />
    <safa-status :result="GetEngInfoWithEngineerCodeResult" />
    </template>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="reqList" label="لیست بررسی" @click="loadObj" />
        <tab-menu name="userInfo" label="مشخصات فردی" @click="fetched" />
      </template>
      <tab-content name="reqList" :padding="false">
        <safa-datatable
          helper="requestListEng"
          fit
          m="r"
          height="100%"
          max-height="100%"
          min-height="200px"
          paginate
          title="لیست بررسی"
          cdcName="reqList"
          v-model="model.Eng_CapacityReqList"
          @dbclick="dbclick"
          @row-click="selectedRow"
          :allowMultipleSelection="false"
          :bordered="false"
        />
      </tab-content>
      <tab-content name="userInfo">
        <Fit>
          <div class="row q-mb-sm">
            <EngineerInfoBox
              label="کد عضویت"
              label-width="80px"
              v-model="identityCode"
              @fetched="fetched"
            />
          </div>
          <!-- <FormRow class="q-mb-sm">
            <form-control>
              <EngineerInfoBox
                label="کد عضویت"
                label-width="80px"
                v-model="identityCode"
                @fetched="fetched"
              />
            </form-control>
          </FormRow> -->
          <FormRow>
            <FormControl>
              <safa-text
                m="r"
                label="نام"
                v-model="model.userInfo.EngName"
                label-width="102px"
                cdcName="EngName"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="نام خانوادگی"
                label-width="80px"
                v-model="model.userInfo.EngFamily"
                cdcName="EngFamily"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="نام پدر"
                label-width="80px"
                v-model="model.userInfo.FatherName"
                cdcName="FatherName"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="شماره شناسنامه"
                label-width="80px"
                v-model="model.userInfo.IdNo"
                cdcName="IdNo"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="کد ملی"
                label-width="80px"
                v-model="model.userInfo.NationalCode"
                cdcName="NationalCode"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                ciName="CI_Years"
                domainName="engineer"
                label="سال کاری"
                :m="mode"
                label-width="80px"
                v-model="model.userInfo.CI_Years"
                cdcName="CI_Years"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="کد دفتر جاری"
                label-width="102px"
                cdcName="OfficeCode"
                v-model="model.userInfo.OfficeCode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="شماره عضویت نظام مهندسی"
                label-width="80px"
                v-model="model.userInfo.MunicipalityCode"
                cdcName="MunicipalityCode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                m="r"
                label="کد نظام معماری"
                label-width="80px"
                v-model="model.userInfo.ArchitectureCode"
                cdcName="ArchitectureCode"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                label="مدرک تحصیلی"
                label-width="80px"
                domainName="engineer"
                ciName="CI_Degree"
                v-model="model.userInfo.CI_Degree"
                cdcName="CI_Degree"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                label="محل اخذ"
                label-width="80px"
                domainName="engineer"
                ciName="CI_University"
                v-model="model.userInfo.CI_University"
                cdcName="CI_University"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                m="r"
                label="تاریخ آخرین مدرک"
                label-width="80px"
                v-model="model.userInfo.LastDegreeDate"
                cdcName="LastDegreeDate"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                domainName="engineer"
                ciName="CI_StudyField"
                label="رشته تحصیلی"
                label-width="102px"
                v-model="model.userInfo.CI_StudyField"
                cdcName="CI_StudyField"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                label="امتیاز"
                label-width="80px"
                domainName="engineer"
                ciName="CI_SCORE"
                v-model="model.userInfo.CI_Score"
                cdcName="CI_Score"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                m="r"
                label="وضعیت نظام وظیفه"
                label-width="80px"
                domainName="engineer"
                ciName="CI_MilitaryService"
                v-model="model.userInfo.CI_MilitaryService"
                cdcName="CI_MilitaryService"
              />
            </FormControl>
            <text-template
              label="توضیحات"
              :m="mode"
              :rows="1"
              v-model="model.userInfo.EngComments"
              label-width="102px"
              class="col-12"
              cdcName="EngComments"
            />
          </FormRow>
          <safa-datatable
            helper="userInfoEng"
            v-model="model.Eng_CapacityReq"
            title="مشخصات فردی"
            :m="mode"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            show-selected-checkbox
            :allowMultipleSelection="false"
            class="q-mt-sm"
            paginate
            :padding="false"
            cdcName="Eng_CapacityReq"
          />
        </Fit>
      </tab-content>
    </safa-tabs>

    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @cancel="isEditable = false"
      >
        <template v-slot:after v-if="activeTab === 'reqList'">
          <btn-cancel label="تایید" v-if="!isEditable" @click="confirm" />
          <btn-cancel label="ابطال" v-if="!isEditable" @click="revoke" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { uid } from "quasar"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "بررسی درخواست ظرفیت سالانه",
      formKey: "c8e962f3-17d3-4fa4-97de-985023a5aa85",
      name: "EngCapacityReq",
      main: true,
      activeTab: "reqList",
      identityCode: null,
      model: {
        userInfo: {
          CI_Years: 0,
          ArchitectureCode: null,
          CI_Ability: 0,
          CI_Degree: 0,
          CI_MilitaryService: 0,
          CI_Score: 0,
          CI_University: 0,
          EngComments: "",
          EngFamily: "",
          EngName: "",
          FatherName: "",
          IdNo: "",
          IdentityCode: "",
          LastDegreeDate: "",
          MunicipalityCode: "",
          OfficeCode: ""
        },
        Eng_CapacityReq: [],
        Eng_CapacityReqList: []
      },
      GetEngInfoWithEngineerCodeResult: null,
      getEngInfoResult: null,
      saveResult: null,
      nidEngineer: "00000000-0000-0000-0000-000000000000",
      clsEngineerCapacity: null,
      selectRow: null,
      result: null
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          NidEngineer: uid()
          // NidEngineer: "34d8abe9-50e4-436a-99c3-ed98a0120808"
        }
      }
      this.$services.engineers
        .GetEngCapacityReq(payLoad)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.model.Eng_CapacityReqList =
              this.result.data.GetEngCapacityReqResult.ClsEngineerCapacity.Eng_CapacityReqList
            this.clsEngineerCapacity =
              this.result.data.GetEngCapacityReqResult.ClsEngineerCapacity
            await this.log({
              action: this.logActions.view,
              bizCode: uid(),
              bizCodeTitle: "NidEngineer"
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    fetched (val) {
      if (this.selectRow) {
        val = this.selectRow
      }
      this.identityCode = val.IdentityCode
      this.getEngInfoWithEngineerCode()
    },
    async getEngInfoWithEngineerCode () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          EngineerCode: this.identityCode
        }
      }
      await this.$services.engineers
        .GetEngInfoWithEngineerCode(payLoad)
        .then(async (response) => {
          this.GetEngInfoWithEngineerCodeResult = this.getResponse(
            response.data
          )
          if (this.GetEngInfoWithEngineerCodeResult.success) {
            this.getEngInfoResult =
              this.GetEngInfoWithEngineerCodeResult.data.GetEng_InfoWithEngineerCodeResult.ClsEngineer
            this.model.userInfo =
              this.GetEngInfoWithEngineerCodeResult.data.GetEng_InfoWithEngineerCodeResult.ClsEngineer.ClsEngineerCapacity.Eng_Info
            if (
              this.GetEngInfoWithEngineerCodeResult.data
                .GetEng_InfoWithEngineerCodeResult.ClsEngineer
                .ClsEngineerCapacity.Eng_CapacityReq.length > 0
            ) {
              this.model.Eng_CapacityReq =
                this.GetEngInfoWithEngineerCodeResult.data.GetEng_InfoWithEngineerCodeResult.ClsEngineer.ClsEngineerCapacity.Eng_CapacityReq
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت مهندس"
            })
          }
        })
        .catch((error) => {
          console.error("GetEngInfoWithEngineerCode Error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {
      this.showLoading()
      this.getEngInfoResult.ClsEngineerCapacity.CI_Year = this.model.CI_Years
      this.getEngInfoResult.ClsEngineerCapacity.Eng_CapacityReq =
        this.model.Eng_CapacityReq

      let payLoad = {
        pRequest: {
          ...this.getEngInfoResult
        }
      }
      this.$services.engineers
        .SaveEngCapacityReq(payLoad)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess("ذخیره با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: ""
            })
            this.isEditable = false
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    dbclick (value) {
      this.fetched(value.row)
      this.activeTab = "userInfo"
    },
    selectedRow (row) {
      this.selectRow = row
      this.nidEngineer = row.NIdEng
    },
    confirm () {
      if (this.selectRow === null) {
        this.showError("لطفا یک سطر از گرید انتخاب نمائید")
        return
      }
      this.showLoading()
      let payLoad = {
        pRequest: {
          ClsEngineerCapacity: { ...this.clsEngineerCapacity },
          NidEngineer: this.nidEngineer
        }
      }
      this.$services.engineers
        .confirmEngCapacityReq(payLoad)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.nidEngineer,
              bizCodeTitle: "NidEngineer"
            })
            this.isEditable = false
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    revoke () {
      if (this.selectRow === null) {
        this.showError("لطفا یک سطر از گرید انتخاب نمائید")
        return
      }
      this.showLoading()
      let payLoad = {
        pRequest: {
          ClsEngineerCapacity: { ...this.clsEngineerCapacity },
          NidEngineer: this.nidEngineer
        }
      }
      this.$services.engineers
        .revokeEngCapacityReq(payLoad)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.nidEngineer,
              bizCodeTitle: "NidEngineer"
            })
            this.isEditable = false
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
