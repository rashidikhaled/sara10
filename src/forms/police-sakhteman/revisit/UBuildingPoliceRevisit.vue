<template>
  <safa-form
    :id="formKey"
    caption="پلیس ساختمان- بازدید"
    app-id="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-status :result="result" />
      <safa-status :result="saveResult" />
      <fit>
        <safa-tabs v-model="activeTab" :padding="false">
          <template v-slot:tabs>
            <tab-menu
              name="revisitsList"
              label="لیست بازدید ها"
              @click="showDetailsBtn = true"
            />
            <tab-menu
              name="revisitsInfo"
              label="اطلاعات بازدید "
              v-if="isdetails"
              @click="showDetailsBtn = false"
            />
          </template>

          <tab-content name="revisitsList">
            <safa-grid
              fit
              title="لیست بازدید"
              height="100%"
              max-height="100%"
              helper="revisitsList"
              :allowMultipleSelection="false"
              :paginate="true"
              m="r"
              @row:dblclick="showDetails"
              v-model="RevisitsList"
              :bordered="false"
              cdcName="revisitsList"
            />
          </tab-content>
          <tab-content name="revisitsInfo">
            <div class="column full-height">
              <FormRow class="q-my-sm q-pl-sm">
                <FormControl>
                  <safa-datepicker
                    label="تاریخ"
                    label-width="50px"
                    v-model="model.Revisit.RevisitDate"
                    :m="mode"
                    cdcName="RevisitDate"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="ساعت"
                    label-width="50px"
                    :m="mode"
                    v-model="model.Revisit.RevisitTime"
                    cdcName="RevisitTime"
                  />
                </FormControl>
              </FormRow>
              <form-row class="q-mb-sm">
                <text-template
                  label="توضیحات"
                  label-width="50px"
                  formKey="fd2dbd07-471d-4d8c-81c6-6a0ae3e0e739"
                  :m="mode"
                  v-model="model.Revisit.Comments"
                  cdcName="Comments"
                />
              </form-row>
              <div style="flex: 1">
                <safa-grid
                  title="اطلاعات بازدید"
                  fit
                  height="100%"
                  max-height="100%"
                  helper="revisitReason"
                  :allowMultipleSelection="false"
                  :paginate="true"
                  m="r"
                  v-model="model.Warning_CauseList"
                  min-height="150px"
                  cdcName="Warning_CauseList"
                />
              </div>
            </div>
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
        </FormActions>
        <btn-default v-if="showDetailsBtn" label="جدید" @click="openDetails" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate, currentTime } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "بازدید",
      name: "UBuildingPoliceRevisit",
      formKey: "09d42f6a-fd2e-44e7-970b-b1c6b2be0b2b",
      main: true,
      activeTab: "revisitsList",
      isdetails: false,
      showDetailsBtn: true,
      RevisitsList: [],
      model: {
        Revisit: {
          RevisitDate: "",
          RevisitTime: "",
          Comments: ""
        },
        Warning_CauseList: []
      },
      result: null,
      nidProc: "00000000-0000-0000-0000-000000000000",
      nidWarning: "00000000-0000-0000-0000-000000000000",
      saveResult: null,
      nidRevisit: "00000000-0000-0000-0000-000000000000"
    }
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.nidProc = this.selectedRequest.NidProc
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    openDetails () {
      this.isdetails = true
      this.showDetailsBtn = false
      this.activeTab = "revisitsInfo"
      this.model.Revisit.RevisitDate = currentDate()
      this.model.Revisit.RevisitTime = currentTime()
      this.getRevisit("00000000-0000-0000-0000-000000000000")
    },
    loadObj () {
      this.showLoading()
      const payload = {
        pNidProc: this.nidProc
        // pNidProc: '02ea0b01-a703-4232-b369-5157f5533b66'
      }
      this.$services.SH.getRevisitListInNidProc(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.RevisitsList = this.result.data.RevisitList
            this.nidWarning = this.result.data.NidWarning
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش لیست بازدید روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
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
    getRevisit (NIDRevisit) {
      this.showLoading()
      const payload = {
        pNidRevisit: NIDRevisit,
        pNidWarning: this.nidWarning
      }
      this.$services.SH.getRevisit(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش بازدید روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.model = this.result.data
            if (this.model.Revisit.EnterTime === null) {
              this.model.Revisit.RevisitTime = currentTime()
            }
            if (this.model.Revisit.EnterDate === null) {
              this.model.Revisit.RevisitDate = currentDate()
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
        ...this.model.Revisit
      }
      mergedRequest.NidWarning = this.nidWarning
      mergedRequest.NidUser = this.getNidUser()
      this.model.Revisit = mergedRequest
      const payload = {
        pRevisit: {
          ...this.model,
          NidWarning: this.nidWarning
        }
      }
      this.$services.SH.saveRevisit(payload)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره بازدید روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.activeTab = "revisitsList"
            this.showDetailsBtn = true
            this.getRevisit()
            this.loadObj()
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
    showDetails ({ data: row }) {
      this.nidRevisit = row.NidRevisit
      this.isdetails = true
      this.showDetailsBtn = false
      this.isEditable = false
      this.activeTab = "revisitsInfo"
      this.getRevisit(this.nidRevisit)
    }
  }
}
</script>
