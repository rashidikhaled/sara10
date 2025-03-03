<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper vertical title="اعلام مامور بازدید">
      <template #header>
        <safa-status :result="getVisitorListResult" />
        <safa-status :result="saveVisitorInfoResult" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="نام مامور بازدید"
              v-model="selectedCI_Visitor"
              cdcName="selectedCI_Visitor"
              :options="model.CI_Visitor"
              source-type="local"
              :m="mode"
            />
          </FormControl>

          <FormControl>
            <safa-datepicker
              label="تاریخ بازدید"
              v-model="RevisitDate"
              cdcName="RevisitDate"
              :m="mode"
            />
          </FormControl>
           <!-- v-if="selectedRow && isEditable === true" -->
          <FormControl>
            <safa-combo
              label="زمان بازدید"
              v-model="Comments"
              cdcName="Comments"
              :options="timeCombo"
              source-type="local"
              :m="mode"
            />
          </FormControl>
        </FormRow>
        <safa-grid
          title="مامورین بازدید"
          :columns="VisitorList"
          v-model="model.Visitor_List"
          cdcName="Visitor_List"
          m="e"
          :suppressRowClickSelection="false"
          fit
          max-height="100%"
          height="100%"
          paginate
          :pageSize="20"
          :addRow="true"
          @row:click="selectItem"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          :showEditButton="selectedRow ? true : false"
          @edit="editRow"
          @cancel="reset"
          @save="saveObj"
        >
          <template v-slot:after>
            <btn-save v-if="!isEditable" label="جدید" @click="addNew" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import { uid } from "quasar"

export default {
  mixins: [baseFormMixin],
  main: true,

  data () {
    return {
      title: "اعلام مامور بازدید",
      formKey: "33479c1e-97a1-4600-a36d-ece907a26652",
      name: "FireRevisitAgentAssign",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      selectedRow: null,

      model: {
        CI_Visitor: [],
        Visitor_Info: {
          CI_Visitor: null,
          Comments: "",
          EnterDate: "",
          EnterTime: "",
          NIdRequest: "00000000-0000-0000-0000-000000000000",
          NIdUser: "00000000-0000-0000-0000-000000000000",
          NIdVisitor: "00000000-0000-0000-0000-000000000000",
          RevisitDate: "",
          UserName: ""
        },
        Visitor_List: []
      },
      timeCombo: [],
      NidRequestEdit: null,
      Comments: null,

      getVisitorListResult: null,
      saveVisitorInfoResult: null,
      RevisitDate: "",
      selectedCI_Visitor: 0
    }
  },
  computed: {
    VisitorList () {
      return [
        {
          field: "CI_Visitor",
          title: "نام مامور بازدید",
          width: 110,
          domain: "Fire",
          editor: "combo"
        },
        {
          field: "RevisitDate",
          title: "تاریخ بازدید",
          width: 100,
          editor: "date",
          editable: false,
          sort: "asc" // desc asc
        },
        {
          field: "Comments",
          title: "ساعت بازدید",
          width: 140
        },
        {
          field: "Revisit.RevisitCount",
          title: "تعداد بازدید",
          editable: false,
          width: 100
        },
        {
          field: "Revisit.RevisitCountRemain",
          title: "تعداد بازدید باقی مانده",
          editable: false,
          width: 100
        },
        {
          field: "UserName",
          title: "نام کاربر",
          editable: false,
          width: 100
        },
        {
          field: "EnterDate",
          title: "تاریخ",
          width: 100
        },
        {
          // cellRenderer: "AgComboListTime",
          field: "EnterTime",
          title: "ساعت",
          width: 100
        }
      ]
    },
    isFormEditable () {
      return this.m === "e"
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.setTimeCombo()
      this.getVisitorList()
    } else this.hideSidebar(this.name)
  },

  methods: {
    addNew () {
      this.selectedRow = null
      this.isEditable = true
      this.NidRequestEdit = null
      this.Comments = null
    },
    editRow () {
      this.isEditable = true
    },
    selectItem (e) {
      this.selectedRow = e.data
      this.selectedCI_Visitor = this.selectedRow.CI_Visitor
      this.Comments = this.selectedRow.Comments
      this.RevisitDate = this.selectedRow.RevisitDate
      this.NidRequestEdit = this.selectedRow.NIdRequest
    },
    setTimeCombo () {
      let startTime = 8
      let endTime = 22
      while (startTime <= endTime) {
        for (let index = 1; index <= 2; index++) {
          if (index === 1) {
            this.timeCombo.push({
              ID: `${startTime}:00`,
              Title: `${startTime}:00`
            })
          } else if (index === 2) {
            if (startTime === endTime) {
              return
            }
            this.timeCombo.push({
              ID: `${startTime}:30`,
              Title: `${startTime}:30`
            })
            startTime += 1
          }
        }
      }
    },
    async saveObj () {
      if (!this.isValidForm()) return
      const uuidHelp = uid()
      const payload = {
        PObj: {
          CI_Visitor: this.model.CI_Visitor,
          Visitor_Info: {
            CI_Visitor: this.selectedCI_Visitor,
            Comments: this.Comments ? this.Comments : null,
            EnterDate: currentDate(),
            EnterTime: null,
            NIdRequest: this.NidRequestEdit
              ? this.NidRequestEdit
              : this.selectedRequest.NidProc,
            NIdUser: this.getNidUser(),
            NIdVisitor: this.NidRequestEdit
              ? this.selectedRow.NIdVisitor
              : uuidHelp,
            RevisitDate:
              this.RevisitDate?.trim() !== ""
                ? this.RevisitDate
                : currentDate(),
            UserName: this.getUserDisplayName()
          },
          _NIdVisitor: this.NidRequestEdit
            ? this.selectedRow.NIdVisitor
            : uuidHelp,
          _NIdRequest: this.selectedRequest.NidProc,
          _RevisitDate:
            this.RevisitDate?.trim() !== "" ? this.RevisitDate : currentDate(),
          Visitor_List: this.model.Visitor_List.length > 0 ? this.model.Visitor_List : null,
          _NIdUser: this.getNidUser(),
          _UserName: this.getUserDisplayName()
        }
      }
      debugger
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.saveVisitorInfo(
          payload,
          { config: { District: this.selectedDistrict } }
        )
        this.saveVisitorInfoResult = this.getResponse(data)
        if (this.saveVisitorInfoResult.success) {
          this.showSuccess("اطلاعات باموفقیت ذخیره شد")
          this.isEditable = true
          await this.getVisitorList()
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (e) {
        this.showError("خطایی در سرویس رخ داد")
      } finally {
        this.hideLoading()
      }
    },
    async getVisitorList () {
      this.isEditable = false
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.getVisitorList(
          { pNIdProc: this.selectedRequest.NidProc },
          { config: { District: this.selectedDistrict } }
        )
        this.getVisitorListResult = this.getResponse(data)
        if (this.getVisitorListResult.success) {
          this.model = this.getVisitorListResult.data
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (e) {
        console.log(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    reset () {
      this.isEditable = false
      this.selectedCI_Visitor = null
      this.RevisitDate = ""
      this.Comments = ""
      this.resetValidation()
      // this.getVisitorList();
    }
  }
}
</script>
