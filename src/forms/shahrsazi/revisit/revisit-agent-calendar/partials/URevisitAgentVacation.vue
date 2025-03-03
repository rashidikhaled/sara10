<template>
  <safa-form
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    :id="formKey"
    caption="تعطیلات مامورین بازدید"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getRevisitAgentVacationRes" />
        <safa-status :result="saveRevisitAgentVacationRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              v-model="agentName"
              label="نام مامور بازدید"
              label-width="85px"
              m="r"
            />
          </FormControl>
        </FormRow>
        <safa-grid
          title="لیست مرخصی مامورین بازدید"
          v-model="agentVacationList"
          cdcName="agentVacationList"
          :columns="columns"
          :allow-multiple-selection="false"
          m="r"
          fit
          paginate
          @row:click="selectedChange"
          ref="grdAgentVacation"
          :suppressRowClickSelection="false"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @cancel="btnCancelClick"
          @edit="isEditable = true"
          @save="btnSaveClick"
        >
        <!-- v-if  به درخواست مشهد اضافه شد -->
          <template v-if="isEditable" #before>
            <btn-new @click="addNewDialogState = true" />
            <btn-delete @click="btnDelClick" />
            <!-- spId="b20796c0-59e7-46df-8451-09a184b90eae"
              spCaption="حذف مرخصی مامور بازدید" -->
          </template>
        </form-actions>
      </template>

      <safa-popup
        v-model="addNewDialogState"
        height="300px"
        title="تعطیلات مامور بازدید"
        vertical
        width="400px"
      >
        <URevisitAgentVacationNew
          @hide="addNewDialogState = false"
          @input="handleAddNew"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
import { currentTime } from "src/utils/index"
import URevisitAgentVacationNew from "./URevisitAgentVacationNew"

export default {
  mixins: [baseFormMixin],
  components: { URevisitAgentVacationNew },

  props: {
    revisitAgent: {
      type: Object,
      required: true,
      default: () => ({})
    },
    revisitList: Array,
    revisitAgentAssignInOneDay: Object,
    config: Object
  },

  data () {
    return {
      title: "تعطیلات مامورین بازدید",
      formKey: "4D094EDD-6FE9-4302-BC8C-561BA5F7A28C",
      name: "URevisitAgentVacation",
      main: true,

      // #services
      getRevisitAgentVacationRes: null,
      saveRevisitAgentVacationRes: null,
      selectedVacation: null,
      addNewDialogState: false,

      // #variables
      selectedRow: null,
      model: {
        Sh_RevisitAgentVacation: [],
        Sh_RevisitAgentVacation_ByDate: null,
        _NidRevisitAgent: ""
      },
      agentVacationList: [],
      currentDate: "",
      isVacationDay: false,
      isHourlyVacation: false,
      columns: [
        {
          field: "VacationDate",
          title: "تاریخ مرخصی",
          editor: "date",
          width: "90px"
        },
        {
          field: "IsWholeDay",
          title: "مرخصی روزانه",
          editor: "checkbox",
          width: "120px"
        },
        {
          field: "FromTime",
          title: "ساعت شروع",
          width: "120px"
        },
        {
          field: "ToTime",
          title: "ساعت پایان",
          width: "120px"
        },
        {
          field: "IsDeleted",
          title: "حذف",
          width: "120px",
          editor: "checkbox"
        },
        {
          field: "CreateDate",
          title: "تاریخ ایجاد مرخصی",
          editor: "date",
          width: "162px"
        },
        {
          field: "DeleteDate",
          title: "تاریخ حذف مرخصی",
          editor: "date",
          width: "162px"
        }
      ],
      customCDCReport: [],
      changedValue: false
    }
  },

  computed: {
    agentName () {
      if (!this.revisitAgent) return "تعیین نشده"
      const { UserName, Name, LastName, Phone } = this.revisitAgent
      return `${UserName} - ${Name} ${LastName} ${Phone && ` - [ ${Phone} ]`}`
    }
  },

  methods: {
    async loadObj () {
      if (!this.revisitAgent || !this.revisitAgent.NidRevisitAgent) {
        this.showError("مامور بازدید اتخاب نشده است")
        return
      }

      this.showLoading()
      this.$services.SC.getRevisitAgentVacation(
        { pNidRevisitAgent: this.revisitAgent.NidRevisitAgent },
        this.config
      )
        .then(({ data }) => {
          this.getRevisitAgentVacationRes = this.getResponse(data)
          if (this.getRevisitAgentVacationRes.success) {
            this.model = this.getRevisitAgentVacationRes.data
            this.agentVacationList =
              this.getRevisitAgentVacationRes?.data?.Sh_RevisitAgentVacation?.map(
                (x) => {
                  return {
                    ...x,
                    class: x.IsDeleted === true ? "deleted-request" : "unset"
                  }
                }
              ).sort((x, y) => x.VacationDate - y.VacationDate) ?? []
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

    btnSaveClick () {
      this.showLoading()
      this.$services.SC.saveRevisitAgentVacation(
        { pRevisitAgentVacation: this.model },
        this.config
      )
        .then(async ({ data }) => {
          this.saveRevisitAgentVacationRes = this.getResponse(data)
          if (this.saveRevisitAgentVacationRes.success) {
            this.isEditable = false
            this.showSuccess('عملیات ذخیره با موفقیت انجام گردید.')
            await this.log({
              action: this.logActions.save,
              bizCode: this.revisitAgent.NidRevisitAgent,
              bizCodeTitle: "NidRevisitAgent",
              saveDesc: `ذخیره تعطیلات کارشناس بازدید ${this.revisitAgent?.UserName ?? ''} انجام گردید!`
            })
            this.resetCdc()
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

    convertNumbers2English (val) {
      return val
        .replace(/[\u0660-\u0669]/g, function (c) {
          return c.charCodeAt(0) - 0x0660
        })
        .replace(/[\u06f0-\u06f9]/g, function (c) {
          return c.charCodeAt(0) - 0x06f0
        })
    },

    normalizeDate (val) {
      val = this.convertNumbers2English(val)
      let newDateArray = val.split(":")
      if (newDateArray[0].length === 1) {
        newDateArray[0] = "0" + newDateArray[0]
        return `${newDateArray[0]}:${newDateArray[1]}:${newDateArray[2]}`
      } else {
        return val
      }
    },

    handleAddNew (vacation) {
      this.model.Sh_RevisitAgentVacation.unshift(vacation)
      this.customCDCReport.push({
        IsNew: true,
        ...vacation
      })
      this.changedValue = true
      this.agentVacationList = this.model.Sh_RevisitAgentVacation
      this.addNewDialogState = false
    },

    selectedChange ({ data }) {
      this.selectedRow = data ?? null
    },

    btnDelClick () {
      if (!this.selectedRow) {
        return this.showError("لطفا یک ردیف را انتخاب کنید.")
      }
      let selectedRevisitAgent = this.selectedRow
      let currentShamsiDateString = new PersianDate([
        ...this.currentDate.split("/").map((x) => Number(x))
      ])
      let vacationDate = new PersianDate([
        ...selectedRevisitAgent.VacationDate.split("/").map((x) => Number(x))
      ])
      if (
        // eslint-disable-next-line eqeqeq
        selectedRevisitAgent.IsWholeDay == true &&
        vacationDate.diff(currentShamsiDateString, "days") < 0
      ) {
        this.showError("تاریخ مرخصی گذشته، قادر به حذف آن نمی باشید")
        return false
      }
      if (vacationDate.diff(currentShamsiDateString, "days") === 0) {
        this.showError(
          "تاریخ مرخصی با روز جاری یکی می باشد، قادر به حذف آن نمی باشید"
        )
        return false
      }
      // eslint-disable-next-line eqeqeq
      if (
        // eslint-disable-next-line eqeqeq
        (selectedRevisitAgent.IsWholeDay == false ||
          selectedRevisitAgent.IsWholeDay == null) &&
        (vacationDate.diff(currentShamsiDateString, "days") < 0 ||
          // eslint-disable-next-line eqeqeq
          (vacationDate.diff(currentShamsiDateString, "days") == 0 &&
            (selectedRevisitAgent.FromTime,
            currentTime < 0 && selectedRevisitAgent.ToTime,
            currentTime < 0)))
      ) {
        this.showError("تاریخ یا ساعت مرخصی گذشته، قادر به حذف آن نمی باشید")
        return false
      }
      this.model.Sh_RevisitAgentVacation =
        this.model.Sh_RevisitAgentVacation.map((x) => {
          const r = { ...x }
          if (
            selectedRevisitAgent.NidRevisitAgentVacation ===
            x.NidRevisitAgentVacation
          ) {
            r.IsDeleted = true
            r.DeleteDate = this.currentDate
            r.DeleteTime = currentTime()

            const foundCdc = this.customCDCReport.find(
              (e) =>
                e.NidRevisitAgentVacation ===
                  selectedRevisitAgent.NidRevisitAgentVacation && e.IsDeleted
            )
            if (!foundCdc) {
              this.customCDCReport.push({ ...r })
              this.changedValue = true
            }
            // foundCdc && ['IsDeleted', 'DeleteDate', 'DeleteTime'].forEach(e => { foundCdc[e] = r[e] })
          }
          return r
        })
      this.agentVacationList = this.model.Sh_RevisitAgentVacation
    },

    async btnCancelClick () {
      this.isEditable = false
      await this.loadObj()
      this.resetCdc()
    },

    generateCdcReport () {
      if (!Array.isArray(this.customCDCReport) || this.customCDCReport.length === 0) return []

      const currentRevisitAgentUserName = this.revisitAgent?.UserName ?? ''

      return this.customCDCReport.reduce((changeSet, { IsDeleted, IsNew, IsWholeDay, FromTime, ToTime, VacationDate }) => {
        let FieldCaption, NewValue
        if (IsDeleted) {
          FieldCaption = "حذف مرخصی"
          NewValue = `مرخصی در تاریخ ${VacationDate} برای کاربر ${currentRevisitAgentUserName} حذف شد.`
        } else if (IsNew) {
          FieldCaption = "مرخصی جدید"
          NewValue = IsWholeDay
            ? `مرخصی روزانه جدید در تاریخ ${VacationDate} برای کاربر ${currentRevisitAgentUserName} درج گردید.`
            : `مرخصی ساعتی در تاریخ ${VacationDate} در ساعت ${FromTime.trim() || "نامشخص"} تا ${ToTime.trim() || "نامشخص"} برای کاربر ${currentRevisitAgentUserName} درج گردید.`
        }
        if (NewValue) {
          changeSet.push({
            FieldCaption,
            FieldType: "text",
            OldValue: "",
            NewValue,
            ColumnSchemaInfos: [],
            OldValues: [],
            NewValues: []
          })
        }
        return changeSet
      }, [])
    },
    resetCdc () {
      this.customCDCReport = []
    }
  },

  mounted () {
    this.currentDate = new PersianDate().toLocale("en").format("L")
    this.loadObj()
  }
}
</script>
