<template>
  <safa-form
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getComplaintsRes" />
        <safa-status :result="getDecisionsRes" />
        <safa-status :result="getOtherDecisionsRes" />
        <safa-status :result="saveDecisionRes" />
        <safa-status :result="saveDecisionOtherRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="issueDecision77" label="صدور تصمیم" />
            <tab-menu
              name="historyIssueDecision"
              label="تاریخچه صدور تصمیم"
              @loadObj="getDecisions"
            />
            <tab-menu name="other" label="سایر" @click="getOtherDecisions" />
          </template>
          <tab-content name="issueDecision77">
            <Issuedecision77
              :baseNosaziCode="baseNosaziCode"
              @txtDescriptionDecisionHandler="txtDescriptionDecisionHandler"
              v-model="model"
              :issueDecision77="issueDecision77"
              @grdComplaintListSelectionChanged="
                grdComplaintListSelectionChanged
              "
              :m="mode"
            />
          </tab-content>
          <tab-content name="historyIssueDecision">
            <Historyissuedecision
              v-model="model"
              @grdDecisionListSelectionChanged="grdDecisionListSelectionChanged"
              :m="mode"
              ref="history"
            />
          </tab-content>
          <tab-content name="other">
            <Otherdecision
              :model="model"
              @grdOtherDecisionSelectionChanged="
                grdOtherDecisionSelectionChanged
              "
              :m="mode"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <form-actions
          :showEditButton="ShowEditBtn"
          :showNewButton="ShowNewBtn"
          @edit="onEditClick"
          @newInfo="onNewClick"
          @save="save"
          :m="mode"
          :editButtonTitle="activeTab === 'issueDecision77' ? 'ثبت تصمیم' : 'ویرایش'"
          @cancel="onCancelClick"
        >
          <btn-default v-if="showInIssueDecission" label="چاپ" @click="print" />
          <btn-cancel v-if="showdelete" label="حذف" @click="onDelete" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import Issuedecision77 from "./partials/Issuedecision77.vue"
import Historyissuedecision from "./partials/HistoryIssueDecision.vue"
import Otherdecision from "./partials/OtherDecision.vue"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { currentDate, currentTime } from "src/utils/index"
import { uid } from "quasar"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  components: {
    Issuedecision77,
    Historyissuedecision,
    Otherdecision
  },

  data () {
    return {
      name: "UDecision",
      title: "صدور تصمیم",
      formKey: "6A6DDC13-30CF-99A1-A4E1-D66AA83FC7FF",
      main: true,
      ShowNewBtn: false,
      ShowEditBtn: false,
      showInIssueDecission: true,
      activeTab: "issueDecision77",
      txtDescriptionDecision: "",
      issueDecision77: {
        CI_Character: 0,
        FirstName: "",
        LastName: "",
        CI_Gender: 0,
        FatherName: "",
        NaturalCode: "",
        PhoneNumber: "",
        Wicked: "",
        CI_ComplaintType: 0,
        Description: "",
        UserName: "",
        Address: "",
        DescriptionDecision: ""
      },
      model: {

        ClsComplaint: {
          ComplaintList: []
        },
        ClsDecision: {
          Description: "",
          Decision: [],
          OtherDecisions: []
        },
        historyIssueDecision: {
          tozihatTasmim: ""
        },
        otherdecision: {
          exactHour: "",
          file: "",
          from: "",
          applyingFor: "",
          messageTo: "",
          amountDemanded: "",
          against: "",
          other: "",
          tozihatOther: ""
        }
      },
      getComplaintsRes: null,
      getDecisionsRes: null,
      getOtherDecisionsRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectRow: false,
      selectGrdComplaintList: null,
      complaintNumber: "",
      nidComplaint: "00000000-0000-0000-0000-000000000000",
      saveDecisionRes: null,
      selectGrdDecisionList: null,
      SelectedNidDecision: "00000000-0000-0000-0000-000000000000",
      selectOtherDecision: null,
      saveDecisionOther: null,
      IsNewOther: false,
      saveDecisionOtherRes: null
    }
  },

  created () {
    this.onShowBtn(this.activeTab)
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadObj()
    } else {
      this.$nextTick(() => {
        this.hideSidebar(this.name)
      })
    }
  },
  methods: {
    onCancelClick () {
      this.isEditable = false
      if (this.activeTab === "issueDecision77") {
        this.showdelete = false
      } else {
        this.showdelete = true
      }
    },
    onEditClick () {
      this.isEditable = true
      if (this.activeTab === "other" || this.activeTab === "issueDecision77") {
        this.showdelete = false
      } else {
        this.showdelete = true
      }
    },
    onNewClick () {
      this.ShowNewBtn = true
      this.isEditable = true
      if (this.activeTab === "other") {
        this.showdelete = false
      } else {
        this.showdelete = true
      }
    },
    onShowBtn (val) {
      this.isEditable = false
      switch (val) {
        case "issueDecision77":
          this.ShowNewBtn = false
          this.ShowEditBtn = true
          this.showdelete = false
          break

        case "historyIssueDecision":
          this.ShowNewBtn = false
          this.ShowEditBtn = true
          this.showdelete = true

          break

        case "other":
          this.ShowNewBtn = true
          this.ShowEditBtn = true
          this.showdelete = true
          break

        default:
          break
      }
    },
    onDelete () {
      switch (this.activeTab) {
        case "historyIssueDecision":
          this.deleteRow()
          break
        case "other":
          this.deleteOther()
          break
        default:
          break
      }
    },
    grdComplaintListSelectionChanged (row) {
      this.issueDecision77 = {
        ...row
        // Wicked: row.UserName
      }
      this.selectGrdComplaintList = row
      this.complaintNumber = row.ComplaintNumber
      this.nidComplaint = row.NidComplaint
    },
    async loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "96431e07-ab01-4e13-ada9-9939a30680ba"
        }
      }
      try {
        const { data } = await this.$services.commission77.getComplaints(payload)
        this.getComplaintsRes = this.getResponse(data)
        if (this.getComplaintsRes.success) {
          this.model.ClsComplaint.ComplaintList = this.getComplaintsRes?.data?.GetComplaintsResult?.ClsComplaint.ComplaintList.sort((a, b) => {
            if (a.CreateDate === b.CreateDate) {
              return b.CreateTime - a.CreateTime
            }
            return b.CreateDate - a.CreateDate
          })
          if (this.model.ClsComplaint.ComplaintList.length > 0) {
            this.issueDecision77 =
                this.model.ClsComplaint.ComplaintList[0]
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc"
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    save () {
      switch (this.activeTab) {
        case "issueDecision77":
          this.saveObj()
          break

        case "historyIssueDecision":
          this.saveDecision()
          break

        case "other":
          this.saveOther()
          break
        default:
          break
      }
    },
    async saveObj () {
      if (!this.txtDescriptionDecision) {
        this.showError("توضیحات تصمیم وارد نشده است")
        return
      }
      if (!this.selectGrdComplaintList) {
        this.showError("لطفا ردیف مورد نظر را انتخاب نمایید.")
        return
      }
      let tmpDecisions = {}
      tmpDecisions.NidDecision = uid()
      tmpDecisions.NidProc = this.selectedRequest.NidProc
      tmpDecisions.CreateDate = currentDate()
      tmpDecisions.CreateTime = currentTime()
      tmpDecisions.NidUser = this.getNidUser()
      tmpDecisions.UserName = this.currentUser.UserName
      tmpDecisions.NidComplaint = this.nidComplaint
      tmpDecisions.ComplaintNumber = this.complaintNumber
      tmpDecisions.Description = this.txtDescriptionDecision
      tmpDecisions.IsRemoved = false
      const payload = {
        pRequest: {
          ClsDecision: {
            Decision: {
              ...tmpDecisions
            }
          }
        }
      }
      try {
        this.showLoading()
        const { data } = await this.$services.commission77.saveDecision(payload)
        this.saveDecisionRes = this.getResponse(data)
        if (this.saveDecisionRes.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          this.isEditable = false
          this.model.ClsDecision.Decision.push(tmpDecisions)
          await this.getDecisions()
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc"
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async saveDecision () {
      if (this.selectGrdDecisionList) {
        let tmpDecisions = {}
        tmpDecisions.NidDecision = this.SelectedNidDecision
          ? this.SelectedNidDecision
          : "00000000-0000-0000-0000-000000000000"
        // tmpDecisions.NidDecision = "480a5461-ca98-40c4-baf2-fa9acac28bda"
        tmpDecisions.EditDate = currentDate()
        tmpDecisions.EditTime = currentTime()
        tmpDecisions.EditorNidUser = this.getNidUser()
        tmpDecisions.EditorUserName = this.currentUser.UserName
        tmpDecisions.Description =
        this.$refs.history.txtHistory
        tmpDecisions.IsRemoved = false
        const payload = {
          pRequest: {
            ClsDecision: {
              Decision: {
                ...tmpDecisions
              }
            }
          }
        }
        this.showLoading()
        try {
          const { data } = await this.$services.commission77
            .saveDecision(payload)
          this.saveDecisionRes = this.getResponse(data)
          if (this.saveDecisionRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.isEditable = false
            await this.getDecisions()
            await this.log({
              action: this.logActions.save,
              bizCode: this.SelectedNidDecision,
              bizCodeTitle: "NidDecision"
            })
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.hideLoading()
        }
      } else {
        return this.showError("لطفا ردیف مورد نظر را انتخاب نمایید.")
      }
    },
    async saveOther () {
      if (this.model.otherdecision.tozihatOther === "") {
        this.showError("توضیحات سایر وارد نشده است")
        return
      }
      if (this.selectGrdDecisionList) {
        let tmpDecisions = {}
        if (this.IsNewOther === true) {
          tmpDecisions.NidOtherDecisions = uid()
          tmpDecisions.NidDecision = this.SelectedNidDecision
          tmpDecisions.CreateDate = currentDate()
          tmpDecisions.CreateTime = currentTime()
          tmpDecisions.NidUser = this.getNidUser()
          tmpDecisions.UserName = this.currentUser.UserName
          tmpDecisions.IsRemoved = false
          tmpDecisions.Time = this.model.otherdecision.exactHour
          tmpDecisions.File = this.model.otherdecision.file
          tmpDecisions.From = this.model.otherdecision.from
          tmpDecisions.Request = this.model.otherdecision.applyingFor
          tmpDecisions.Toward = this.model.otherdecision.messageTo
          tmpDecisions.Price = this.model.otherdecision.amountDemanded
          tmpDecisions.Against = this.model.otherdecision.against
          tmpDecisions.Other = this.model.otherdecision.other
          tmpDecisions.Description = this.model.otherdecision.tozihatOther
        } else {
          if (!this.selectOtherDecision) {
            this.showError("ردیفی جهت ویرایش وجود ندارد")
            return
          } else {
            tmpDecisions.NidOtherDecisions =
              this.selectOtherDecision.NidOtherDecisions
            tmpDecisions.Time = this.model.otherdecision.exactHour
            tmpDecisions.File = this.model.otherdecision.file
            tmpDecisions.From = this.model.otherdecision.from
            tmpDecisions.Request = this.model.otherdecision.applyingFor
            tmpDecisions.Toward = this.model.otherdecision.messageTo
            tmpDecisions.Price = this.model.otherdecision.amountDemanded
            tmpDecisions.Against = this.model.otherdecision.against
            tmpDecisions.Other = this.model.otherdecision.other
            tmpDecisions.Description = this.model.otherdecision.tozihatOther
            tmpDecisions.EditDate = currentDate()
            tmpDecisions.EditTime = currentTime()
            tmpDecisions.EditorUserName = this.currentUser.UserName
            tmpDecisions.EditorNidUser = this.getNidUser()
          }
        }

        const payload = {
          pRequest: {
            ClsDecision: {
              OtherDecision: {
                ...tmpDecisions
              }
            }
          }
        }
        this.showLoading()
        try {
          const { data } = await this.$services.commission77
            .saveDecisionOther(payload)
          this.saveDecisionOtherRes = this.getResponse(data)
          if (this.saveDecisionOtherRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.isEditable = false
            await this.getOtherDecisions()
            await this.log({
              action: this.logActions.save,
              bizCode: this.SelectedNidDecision,
              bizCodeTitle: "NidDecision"
            })
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.hideLoading()
        }
      } else {
        return this.showError("ابتدا ردیف تصمیم مورد نظر را انتخاب نمایید")
      }
    },
    async print () {
      const reportPath = `${window.getConfigValue('Commission77ReportPath')}/RptDecision`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NIdProc,
        bizCodeTitle: 'NIdProc'
      })
    },
    grdDecisionListSelectionChanged (row) {
      this.$refs.history.txtHistory = row.Description
      this.selectGrdDecisionList = row
      // this.model.historyIssueDecision.tozihatTasmim = row.Description
      this.SelectedNidDecision = row.NidDecision
    },
    async getDecisions () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "8c29a417-41e7-4fc4-90b1-f331dc0ed6a7"
        }
      }
      try {
        const { data } = await this.$services.commission77.getDecisions(payload)
        this.getDecisionsRes = this.getResponse(data)
        if (this.getDecisionsRes.success) {
          this.model.ClsDecision.Decision =
              this.getDecisionsRes.data.GetDecisionsResult.ClsDecision.Decisions.filter(
                (x) => x.IsRemoved === false
              )
          if (this.model.ClsDecision.Decision.length > 0) {
            this.model.historyIssueDecision.tozihatTasmim =
                this.model.ClsDecision.Decision[0].Description
          }

          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc"
          })
          await this.loadObj()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    deleteRow () {
      this.showConfirm("آیا از حذف تصمیم مورد نظر اطمینان دارید؟").onOk(() => {
        this.deleteDecision()
      })
    },
    deleteDecision () {
      if (this.selectGrdDecisionList) {
        let tmpDecisions = {}
        tmpDecisions.NidDecision = this.SelectedNidDecision
        tmpDecisions.RemovalDate = currentDate()
        tmpDecisions.RemovalTime = currentTime()
        tmpDecisions.RemovalNidUser = this.getNidUser()
        tmpDecisions.RemovalUserName = this.currentUser.UserName
        tmpDecisions.IsRemoved = true
        const payload = {
          pRequest: {
            ClsDecision: {
              Decision: {
                ...tmpDecisions
              }
            }
          }
        }
        this.showLoading()
        this.$services.commission77
          .saveDecision(payload)
          .then(async ({ data }) => {
            this.saveDecisionRes = this.getResponse(data)
            if (this.saveDecisionRes.success) {
              this.showSuccess("حذف با موفقیت انجام شد.")
              this.isEditable = false
              await this.getDecisions()
              await this.log({
                action: this.logActions.save,
                bizCode: this.SelectedNidDecision,
                bizCodeTitle: "NidDecision"
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
      } else {
        return this.showError("لطفا ردیف مورد نظر را انتخاب نمایید.")
      }
    },
    // otherTab
    async getOtherDecisions () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidDecision: this.SelectedNidDecision
            ? this.SelectedNidDecision
            : "00000000-0000-0000-0000-000000000000"
        }
      }
      try {
        const { data } = await this.$services.commission77.getOtherDecisions(payload)
        this.getOtherDecisionsRes = this.getResponse(data)
        if (this.getOtherDecisionsRes.success) {
          this.model.ClsDecision.OtherDecisions =
              this.getOtherDecisionsRes.data.ClsDecision.OtherDecisions.filter(
                (x) => x.IsRemoved === false
              )
          if (this.model.ClsDecision.OtherDecisions.length > 0) {
            this.model.otherdecision.exactHour =
                this.model.ClsDecision.OtherDecisions[0].Time
            this.model.otherdecision.file =
                this.model.ClsDecision.OtherDecisions[0].File
            this.model.otherdecision.from =
                this.model.ClsDecision.OtherDecisions[0].From
            this.model.otherdecision.applyingFor =
                this.model.ClsDecision.OtherDecisions[0].Request
            this.model.otherdecision.messageTo =
                this.model.ClsDecision.OtherDecisions[0].Toward
            this.model.otherdecision.amountDemanded =
                this.model.ClsDecision.OtherDecisions[0].Price
            this.model.otherdecision.against =
                this.model.ClsDecision.OtherDecisions[0].Against
            this.model.otherdecision.other =
                this.model.ClsDecision.OtherDecisions[0].Other
            this.model.otherdecision.tozihatOther =
                this.model.ClsDecision.OtherDecisions[0].Description
          }

          await this.log({
            action: this.logActions.view,
            bizCode: this.SelectedNidDecision,
            bizCodeTitle: "NidDecision"
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    grdOtherDecisionSelectionChanged (row) {
      this.selectOtherDecision = row
      this.model.otherdecision.exactHour = this.selectOtherDecision.Time
      this.model.otherdecision.file = this.selectOtherDecision.File
      this.model.otherdecision.from = this.selectOtherDecision.From
      this.model.otherdecision.applyingFor = this.selectOtherDecision.Request
      this.model.otherdecision.messageTo = this.selectOtherDecision.Toward
      this.model.otherdecision.amountDemanded = this.selectOtherDecision.Price
      this.model.otherdecision.against = this.selectOtherDecision.Against
      this.model.otherdecision.other = this.selectOtherDecision.Other
      this.model.otherdecision.tozihatOther =
        this.selectOtherDecision.Description
    },
    editOtherMode () {
      this.isEditable = true
      this.IsNewOther = false
    },
    resetOther () {
      this.model.otherdecision.exactHour = ""
      this.model.otherdecision.file = ""
      this.model.otherdecision.from = ""
      this.model.otherdecision.applyingFor = ""
      this.model.otherdecision.messageTo = ""
      this.model.otherdecision.amountDemanded = ""
      this.model.otherdecision.against = ""
      this.model.otherdecision.other = ""
      this.model.otherdecision.tozihatOther = ""
    },
    newOtherMode () {
      this.isEditable = true
      this.IsNewOther = true
      this.resetOther()
    },
    deleteOther () {
      this.showConfirm("آیا از حذف آیتم مورد نظر اطمینان دارید؟").onOk(() => {
        this.deleteOtherDecision()
      })
    },

    deleteOtherDecision () {
      let tmpDecisions = {}
      if (!this.selectOtherDecision) {
        this.showError("ردیفی جهت ویرایش وجود ندارد")
        return
      }
      tmpDecisions.NidOtherDecisions =
        this.selectOtherDecision.NidOtherDecisions
      tmpDecisions.RemovalDate = currentDate()
      tmpDecisions.RemovalTime = currentTime()
      tmpDecisions.RemovalNidUser = this.getNidUser()
      tmpDecisions.RemovalUserName = this.currentUser.UserName
      tmpDecisions.IsRemoved = true
      const payload = {
        pRequest: {
          ClsDecision: {
            OtherDecision: {
              ...tmpDecisions
            }
          }
        }
      }
      this.showLoading()
      this.$services.commission77
        .saveDecisionOther(payload)
        .then(async ({ data }) => {
          this.saveDecisionOtherRes = this.getResponse(data)
          if (this.saveDecisionOtherRes.success) {
            this.showSuccess("حذف با موفقیت انجام شد.")
            this.isEditable = false
            await this.getOtherDecisions()
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectOtherDecision.NidOtherDecisions,
              bizCodeTitle: "NidOtherDecisions"
            })
            this.resetOther()
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
    txtDescriptionDecisionHandler (e) {
      this.txtDescriptionDecision = e
    }
  },
  watch: {
    activeTab: {
      handler () {
        if (this.activeTab === "issueDecision77") {
          this.showInIssueDecission = true
        }

        if (this.activeTab === "historyIssueDecision") {
          this.showInIssueDecission = false
          this.getDecisions()
        }
        if (this.activeTab === "other") {
          this.showInIssueDecission = false
        }
        this.onShowBtn(this.activeTab)
      },
      deep: true
    }
  }
}
</script>
