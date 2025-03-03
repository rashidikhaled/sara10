<template>
  <form-wrapper :title="title" :padding="false">
    <safa-status :result="result" />
    <safa-status :result="saveResult" />
    <fit>
      <safa-tabs v-model="activeTab" :padding="false">
        <template v-slot:tabs>
          <tab-menu name="list" label="لیست" @click="showDetailsBtn = true" />
          <tab-menu
            name="newConstructionCouncil"
            label="صورتمجلس جدید"
            v-if="isdetails"
            @click="showDetailsBtn = false"
          />
        </template>

        <tab-content name="list">
          <div class="fit">
            <safa-datatable
              fit
              height="100%"
              max-height="100%"
              helper="PreventConstruction"
              :allowMultipleSelection="false"
              :paginate="true"
              v-model="PreventConstructionCouncilList"
              cdcName="PreventConstructionCouncilList"
              m="r"
              :bordered="false"
              @dbclick="showDetails"
            />
          </div>
        </tab-content>
        <tab-content name="newConstructionCouncil">
          <safa-tabs v-model="activeTab2">
            <template v-slot:tabs>
              <tab-menu name="Council" label="صورتمجلس" />
              <tab-menu name="eblagh" label="ابلاغ" />
            </template>
            <tab-content name="Council">
              <FormRow class="q-mb-sm" :xl="2" :lg="2" :md="2" :xxl="2">
                <FormControl>
                  <safa-text
                    label="شماره صورتمجلس"
                    label-width="100px"
                    v-model="
                      model.PreventConstructionCouncil
                        .PreventConstructionCouncilNo
                    "
                    cdcName="PreventConstructionCouncilNo"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ"
                    label-width="80px"
                    v-model="
                      model.PreventConstructionCouncil
                        .PreventConstructionCouncilDate
                    "
                    cdcName="PreventConstructionCouncilDate"
                    :m="mode"
                  >
                  </safa-datepicker>
                </FormControl>
              </FormRow>
              <div class="row">
                <text-template
                  label="توضیحات"
                  class="col-12"
                  label-width="100px"
                  v-model="model.PreventConstructionCouncil.Comments"
                  cdcName="Comments"
                  formKey="fd2dbd07-471d-4d8c-81c6-6a0ae3e0e734"
                  :m="mode"
                />
              </div>
              <FormRow class="q-my-sm">
                <FormControl>
                  <safa-datepicker
                    label="تاریخ بازدید"
                    label-width="100px"
                    v-model="model.Revisit.RevisitDate"
                    cdcName="RevisitDate"
                    :m="mode"
                    :validations="['required', 'string']"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="ساعت بازدید"
                    label-width="80px"
                    v-model="model.Revisit.RevisitTime"
                    cdcName="RevisitTime"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    label="عملیات ساختمانی"
                    domainName="BuildingPolice"
                    ciName="CI_WarningType"
                    label-width="80px"
                    v-model="model.Revisit.CI_BuildingOperation"
                    cdcName="CI_BuildingOperation"
                    :m="mode"
                  >
                  </safa-combo>
                </FormControl>
              </FormRow>
              <div class="row">
                <text-template
                  label="توضیحات بازدید"
                  label-width="100px"
                  v-model="model.Revisit.Comments"
                  cdcName="Comments"
                  class="col-12"
                  formKey="b1822a9b-e9c9-4f79-a288-f205a8e96f3b"
                  :m="mode"
                />
              </div>
            </tab-content>
            <tab-content name="eblagh">
              <safa-notice>شرایط ابلاغ قانونی</safa-notice>
              <FormRow :xl="4" :lg="4" :md="2" :xxl="4">
                <FormControl>
                  <safa-combo
                    label="عنوان ماده ابلاغ"
                    label-width="100px"
                    v-model="model.ClsProphecy.Prophecy.CI_Article"
                    cdcName="CI_Article"
                    :m="mode"
                    domainName="BuildingPolice"
                    ciName="CI_Article"
                  ></safa-combo>
                </FormControl>

                <FormControl>
                  <safa-text
                    label="نام و نام خانوادگی تحویل گیرنده"
                    label-width="100px"
                    v-model="model.ClsProphecy.Prophecy.RecipientName"
                    cdcName="RecipientName"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="سمت"
                    label-width="100px"
                    v-model="model.ClsProphecy.Prophecy.Post"
                    cdcName="Post"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="مامور ابلاغ "
                    label-width="100px"
                    v-model="model.ClsProphecy.Prophecy.NotificationOfficer"
                    cdcName="NotificationOfficer"
                    :m="mode"
                  />
                </FormControl>
              </FormRow>
            </tab-content>
          </safa-tabs>
        </tab-content>
      </safa-tabs>
    </fit>
    <template #footer>
      <FormActions
        v-if="!showDetailsBtn"
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveObj"
      >
        <btn-default label="گزارش" @click="Report" />
      </FormActions>
      <btn-default
        v-if="showDetailsBtn"
        label="صورتمجلس جدید"
        @click="openDetails"
      />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate, currentTime } from "src/utils/index"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "صورتمجلس جلوگیری از عملیات ساختمانی",
      name: "ConstructionCouncil",
      activeTab: "list",
      PreventConstructionCouncilList: [],
      isdetails: false,
      showDetailsBtn: true,
      model: {
        PreventConstructionCouncil: {
          PreventConstructionCouncilNo: 0,
          PreventConstructionCouncilDate: "",
          Comments: ""
        },
        Revisit: {
          RevisitDate: "",
          RevisitTime: "",
          CI_BuildingOperation: null,
          Comments: ""
        },
        ClsProphecy: {
          Prophecy: {
            CI_Article: 0,
            RecipientName: "",
            Post: "",
            NotificationOfficer: ""
          }
        }
      },
      activeTab2: "Council",
      result: null,
      getDetailsResult: null,
      nidPrevent: "00000000-0000-0000-0000-000000000000",
      saveResult: null
    }
  },
  props: {
    selectedRow: Object
  },
  mounted () {},
  methods: {
    openDetails () {
      this.isdetails = true
      this.showDetailsBtn = false
      this.activeTab = "newConstructionCouncil"
      this.getPreventConstructionCouncil()
      this.model.PreventConstructionCouncil.PreventConstructionCouncilDate =
        currentDate()
    },
    loadObj () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRow.NidWarning
      }
      this.$services.SH.getPreventConstructionCouncilList(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.PreventConstructionCouncilList =
              this.result.data.PreventConstructionCouncilList
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow.NosaziCode ?? '',
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRow.NosaziCode ?? '',
              saveDesc: `نمایش فرم صورتمجلس جلوگیری از عملیات ساختمانی برای شماره ${this.selectedRow.WarningNo} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getPreventConstructionCouncil () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRow
          ? this.selectedRow.NidWarning
          : "00000000-0000-0000-0000-000000000000",
        pNidPrevent: this.nidPrevent
          ? this.nidPrevent
          : "00000000-0000-0000-0000-000000000000"
      }
      this.$services.SH.getPreventConstructionCouncil(payload)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.getDetailsResult = this.result.data
            this.model = this.result.data
            if (this.getDetailsResult.Revisit.EnterTime === null) {
              this.model.Revisit.RevisitTime = currentTime()
            }
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      let mergedRequest = {
        ...this.getDetailsResult.PreventConstructionCouncil,
        ...this.model.PreventConstructionCouncil
      }
      mergedRequest.NidProc = this.selectedRow && this.selectedRow.NidWarning
      mergedRequest.NidUser = this.getNidUser()
      mergedRequest.UserName = this.getUserDisplayName()
      this.getDetailsResult.PreventConstructionCouncil = mergedRequest
      this.getDetailsResult.Revisit = this.model.Revisit
      this.getDetailsResult.ClsProphecy.Prophecy =
        this.model.ClsProphecy.Prophecy
      const payload = {
        pPreventConstructionCouncil: {
          ...this.getDetailsResult,
          NidProc: this.selectedRow
            ? this.selectedRow.NidWarning
            : "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.SH.savePreventConstructionCouncil(payload)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRow.NosaziCode ?? '',
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRow.NosaziCode ?? '',
              saveDesc: `ذخیره فرم صورتمجلس جلوگیری از عملیات ساختمانی برای شماره ${this.selectedRow.WarningNo} انجام گردید.`
            })
            this.getPreventConstructionCouncil()
            this.loadObj()
            this.activeTab = "list"
            this.isEditable = false
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    showDetails (val) {
      this.nidPrevent = val.row.NidPrevent
      this.isdetails = true
      this.showDetailsBtn = false
      this.activeTab = "newConstructionCouncil"
      this.getPreventConstructionCouncil()
    },
    async Report () {
      const reportPath =
        "/BuildingPolice/RptCounstructionCouncil"
      const queryParams = {
        NidPrevent: this.nidPrevent
          ? this.nidPrevent
          : "00000000-0000-0000-0000-000000000000",
        NIdWarning: this.selectedRow
          ? this.selectedRow.NidWarning
          : "00000000-0000-0000-0000-000000000000"
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NosaziCode ?? '',
        bizCodeTitle: "کدنوسازی",
        nosaziCode: this.selectedRow.NosaziCode ?? '',
        saveDesc: `گزارش فرم صورتمجلس جلوگیری از عملیات ساختمانی برای شماره ${this.selectedRow.WarningNo} انجام گردید.`
      })
    }
  }
}
</script>
