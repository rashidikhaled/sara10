<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
  <form-wrapper :padding="false" :title="title" vertical>
    <safa-status :result="getIncomeRefund" />
    <safa-status :result="saveIncomeRefundRes" />
    <safa-tabs
      v-model="currentTab"
      fit
      :bordered="false"
      :padding="false"
      class="q-mb-sm"
    >
      <template v-slot:tabs>
        <tab-menu
          name="applicant_refund_income"
          label="متقاضی برگشت از درآمد"
        />
        <tab-menu name="comment_income" label="توضیحات درآمد" />
      </template>
      <tab-content name="applicant_refund_income">
        <safa-datatable2
          enableValidation
          :columns="returnIncomColumns"
          :bordered="false"
          :m="mode"
          v-model="dataContext.Income_RefundList"
          :defaultNewRow="{
            OwnerLastName: '',
            NationalCode: '',
            OwnerName: '',
            IDCardNo: '',
            Comments:''
          }"
          ref="returnIncomGrid"
        /> <!-- تاریخ قابل ویرایش نیست -->
      </tab-content>
      <tab-content name="comment_income">
        <safa-datatable2
          enableValidation
          :columns="commentColumns"
          :bordered="false"
          :m="mode"
          v-model="dataContext.Income_RefundList"
          :defaultNewRow="{
            RefundReason: ''
          }"
          ref="commentsGrid"
        />  <!-- تاریخ قابل ویرایش نیست -->
      </tab-content>
    </safa-tabs>
    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        :showEditButton="false"
        :showSaveButton="false"
        :showCancelButton="false"
      >
        <template #after>
          <btn-default
            v-if="
              currentTab === 'applicant_refund_income' &&
              canLegalChange === false
            "
            label="ویرایش و تأیید حقوقی"
            @click="editLegal"
          />
          <btn-save
            v-if="
              currentTab === 'applicant_refund_income' &&
              canLegalChange === true
            "
            label="تأیید حقوقی"
            @click="saveData(1)"
          />
          <btn-default
            v-if="
              currentTab === 'applicant_refund_income' &&
              canAccountingChange === false
            "
            label="ویرایش و تأیید حسابداری"
            @click="editAccount"
          />
          <btn-save
            v-if="
              currentTab === 'applicant_refund_income' &&
              canAccountingChange === true
            "
            label="تأیید حسابداری"
            @click="saveData(2)"
          />
          <btn-cancel
            v-if="
              currentTab === 'applicant_refund_income' &&
              (canAccountingChange === true || canLegalChange === true)
            "
            label="انصراف"
            @click="resetApplicantRefundIncome"
            icon="arrow_right_alt"
          >
          </btn-cancel>
          <btn-save
            v-if="currentTab === 'comment_income'"
            label="گزارش صدور گواهی"
          />
          <btn-default
            v-if="
              currentTab === 'comment_income' && canObserverChange === false
            "
            label="ویرایش و تأیید ناظر"
            @click="editObserver"
          />
          <btn-save
            v-if="currentTab === 'comment_income' && canObserverChange === true"
            label="تأیید ناظر"
            @click="saveData(3)"
          />
          <btn-default
            v-if="currentTab === 'comment_income' && canIncomeChange === false"
            label="ویرایش و تأیید درآمد"
            @click="editIncome"
          />
          <btn-save
            v-if="currentTab === 'comment_income' && canIncomeChange === true"
            label="تأیید درآمد"
            @click="saveData(4)"
          />
          <btn-cancel
            v-if="
              currentTab === 'comment_income' &&
              (canIncomeChange === true || canObserverChange === true)
            "
            label="انصراف"
            @click="resetCommentIncome"
            icon="arrow_right_alt"
          >
          </btn-cancel>
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import { currentDate, currentTime } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      currentTab: "applicant_refund_income",
      title: "برگشت از درآمد",
      name: "RefundIncome",
      formKey: "c6933323-7629-4ac9-ad65-4aca3187ab0c",
      main: true,
      saveIncomeRefundRes: null,
      getIncomeRefund: null,
      sidebarCompatible: true,
      canLegalChange: false,
      canAccountingChange: false,
      canObserverChange: false,
      canIncomeChange: false,
      dataContext: { Income_RefundList: [] }
    }
  },

  computed: {
    returnIncomColumns () {
      return [
        {
          field: "NidWorkItemRefund",
          title: "شماره درخواست گواهی",
          width: "150px",
          validations: "required,number"
          // editable: this.canLegalChange
        },
        {
          field: "EumOwnerCharacter",
          title: "شخصیت",
          width: "150px",
          editor: "combo",
          source: [
            { ID: 1, Title: "حقیقی" },
            { ID: 2, Title: "حقوقی" },
            { ID: 3, Title: "اتباع" }
          ]
          // editable: this.canLegalChange
        },
        {
          field: "OwnerName",
          title: "نام",
          width: "170px"
          // editable: this.canLegalChange,
          // validations: "required,string"
          // params: {
          //   pattern: ["[^$]", 'این فیلد نمیتواند خالی باشد!']
          // }
        },
        {
          field: "OwnerLastName",
          title: "نام خانوادگی",
          width: "170px"
          // editable: this.canLegalChange,
          // validations: "required,string"
          // params: {
          //   pattern: ["[^$]", 'این فیلد نمیتواند خالی باشد!']
          // }
        },
        {
          field: "NationalCode",
          title: "کد ملی / شناسه ملی",
          width: "110px"
          // editable: this.canLegalChange,
          // validations: "required,number"
          // params: {
          //   pattern: ["[^$]", 'این فیلد نمیتواند خالی باشد!']
          // }
        },
        {
          field: "ToftImpart",
          title: "درصد سهم",
          width: "70px"
          // editable: this.canLegalChange,
          // validations: "required,number"
        },
        {
          field: "IDCardNo",
          title: "شماره شبا",
          width: "150px",
          editable: this.canAccountingChange
          // validations: "required,number"
        },

        {
          field: "ConfirmHoghooghiDate",
          title: "تاریخ تایید حقوقی",
          editor: "date",
          width: "130px",
          editable: false
          // validations: "required,dateFa"
        },
        {
          field: "ConfirmHoghooghiTime",
          title: "ساعت تایید حقوقی",
          width: "130px",
          editable: false
        },
        {
          field: "ConfirmHoghooghiUserName",
          title: "کاربر تایید کننده حقوقی",
          width: "170px",
          editable: false
          // validations: "required,string"
        },
        {
          field: "ConfirmAccountantDate",
          title: "تاریخ تایید حسابداری",
          editor: "date",
          width: "130px",
          editable: false
          // validations: "required,dateFa"
        },
        {
          field: "ConfirmAccountantTime",
          title: "ساعت تایید حسابداری",
          width: "130px",
          editable: false
        },
        {
          field: "ConfirmAccountantUserName",
          title: "کاربر تاییدکننده حسابداری ",
          width: "170px",
          editable: false
          // validations: "required,string"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "300px"
          // editable: this.canLegalChange,
          // validations: "required,string"
          // params: {
          //   pattern: ["[^$]", 'این فیلد نمیتواند خالی باشد!']
          // }
        }
      ]
    },

    commentColumns () {
      return [
        {
          field: "NidWorkItemRefund",
          title: "شماره درخواست گواهی",
          width: "150px"
        },
        {
          field: "CI_IncomeRefundReason",
          title: "علت برگشت از درآمد",
          editor: "combo",
          width: "150px",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_IncomeRefund",
          title: "نوع برگشت از درآمد",
          editor: "combo",
          width: "150px",
          domain: "CI_SaraM1"
        },
        {
          field: "ConfirmSupervisorDate",
          title: "تاریخ تایید ناظر شهرسازی",
          editor: "date",
          width: "150px",
          editable: false
        },
        {
          field: "ConfirmSupervisorTime",
          title: "ساعت تایید ناظر شهرسازی",
          width: "150px",
          editable: false
        },
        {
          field: "ConfirmSupervisorUserName",
          title: "کاربر تایید کننده ناظر شهرسازی",
          width: "150px",
          editable: false
        },
        {
          field: "ConfirmIncomeDate",
          title: "تاریخ تایید کارشناس درآمد",
          editor: "date",
          width: "150px",
          editable: false
        },
        {
          field: "ConfirmIncomeUserName",
          title: "کاربر تایید کننده درآمد",
          width: "150px",
          editable: false
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "150px"
        }
      ]
    }
  },

  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.showLoading()
      const payload = {
        NidProc: this.selectedNidProc || "00000000-0000-0000-0000-000000000000"
      }

      this.$services.SD.getIncomeRefund(payload).then(({ data }) => {
        this.getIncomeRefund = this.getResponse(data)

        if (this.getIncomeRefund.success) {
          this.dataContext = this.getIncomeRefund.data
        }
      }).catch((ex) => {
        console.error(ex)
        this.serverError()
      }).finally(() => {
        this.hideLoading()
      })
    },
    resetApplicantRefundIncome () {
      this.canLegalChange = false
      this.canAccountingChange = false
    },
    resetCommentIncome () {
      this.canObserverChange = false
      this.canIncomeChange = false
    },
    editLegal () {
      this.isEditable = true
      this.canLegalChange = true
      this.canAccountingChange = false
    },
    editAccount () {
      this.isEditable = true
      this.canLegalChange = false
      this.canAccountingChange = true
    },
    editIncome () {
      this.isEditable = true
      this.canIncomeChange = true
      this.canObserverChange = false
    },
    editObserver () {
      this.isEditable = true
      this.canIncomeChange = false
      this.canObserverChange = true
    },
    confirmLegal () {
      const EumIncomeRefundUserType = 1
      this.saveData(EumIncomeRefundUserType)
    },
    normalizeSaveIncomeRefund () {
      this.dataContext.Income_RefundList = this.dataContext.Income_RefundList.map(x => {
        return {
          ...x,
          IDCardNo: x.IDCardNo || "",
          OwnerLastName: x.OwnerLastName || "",
          NationalCode: x.NationalCode || "",
          OwnerName: x.OwnerName || ""
        }
      })
    },
    async saveData (type) {
      if (!this.isValidForm()) return false

      this.showLoading()
      this.normalizeSaveIncomeRefund()

      const payload = {
        pUser: this.currentUser,
        EumIncomeRefundUserType: type,
        Income_RefundList: this.dataContext.Income_RefundList,
        NidProc: this.selectedNidProc || "00000000-0000-0000-0000-000000000000"
      }

      this.$services.SD.saveIncomeRefund(payload)
        .then(({ data }) => {
          this.saveIncomeRefundRes = this.getResponse(data)

          if (this.saveIncomeRefundRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.resetApplicantRefundIncome()
            this.loadData()
          }
        }).catch(ex => {
          console.error(ex)
          this.serverError()
        }).finally(() => {
          this.hideLoading()
        })
    },
    refreshReturnIncomGrid () {
      this.$forceUpdate()
      const self = this
      this.$nextTick(() => {
        self.$refs.returnIncomGrid.initialColumns()
        self.$refs.returnIncomGrid.initialGridRows()
        self.$refs.returnIncomGrid.rowEditing = {
          colKey: undefined,
          rowKey: undefined
        }
      })
    },
    refreshCommentsGrid () {
      this.$forceUpdate()
      const self = this
      this.$nextTick(() => {
        self.$refs.commentsGrid.initialColumns()
        self.$refs.commentsGrid.initialGridRows()
        self.$refs.commentsGrid.rowEditing = {
          colKey: undefined,
          rowKey: undefined
        }
      })
    }
  },
  watch: {
    canLegalChange: {
      handler () {
        this.refreshReturnIncomGrid()
      },
      immediate: true
    },
    canAccountingChange: {
      handler () {
        this.refreshReturnIncomGrid()
      },
      immediate: true
    },
    canObserverChange: {
      handler () {
        this.refreshCommentsGrid()
      },
      immediate: true
    },
    canIncomeChange: {
      handler () {
        this.refreshCommentsGrid()
      },
      immediate: true
    }
  }
}
</script>
