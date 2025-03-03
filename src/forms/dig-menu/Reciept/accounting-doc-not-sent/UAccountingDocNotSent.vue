<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="reSendToFinancialSysRes" />
      </template>
      <fit>
        <!-- helper="ColAccountingDocNotSent" -->
        <safa-grid
          title="فیش های ارسال نشده به سیستم مالی"
          fit
          v-model="fichInfo"
          :columns="columns"
          cdcName="fichInfo"
          height="100%"
          min-height="100px"
          max-height="100%"
          page
          paginate
          :m="mode"
          :suppressRowClickSelection="false"
        />
      </fit>
      <template v-slot:footer>
        <btn-default
          label="ارسال"
          class="q-mr-sm"
          @click="reSendToFinancialSystem"
        />
        <btn-save label="ارسال همه" @click="reSendToFinancialSystem" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "فیش های ارسال نشده به سیستم مالی",
      formKey: "7195fa11-b0e9-42fe-8de5-fe005bc14a38",
      name: "UAccountingDocNotSent",
      main: true,

      // regionServices
      loadObjRes: null,

      // regionVariables
      gridValue: [],
      fichInfo: [],
      reSendToFinancialSysRes: [],
      columns: [
        // {
        //   field: "isSelected",
        //   width: 41,
        //   headerCheckboxSelection: true,
        //   checkboxSelection: true,
        //   align: "center",
        //   headerAlign: "center",
        //   pinned: "right",
        //   lockPosition: true,
        //   filter: false,
        //   filterable: false
        // },
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "100px"
        },
        {
          field: "EumObjOnPrice",
          title: "نوع فیش",
          width: "100px"
        },
        {
          field: "EumAccountingDocumentingCause",
          title: "نوع سند",
          width: "100px",
          editor: "combo",
          ignoreCI: true,
          source: [
            {
              ID: 1,
              Title: "صدور"
            },
            {
              ID: 2,
              Title: "تأیید"
            },
            {
              ID: 3,
              Title: "چاپ"
            },
            {
              ID: 4,
              Title: " ابطال صدور"
            },
            {
              ID: 5,
              Title: "ابطال تایید"
            },
            {
              ID: 6,
              Title: "استرداد"
            },
            {
              ID: 7,
              Title: "چک"
            }
          ]
        },
        {
          field: "InsertDate",
          title: "تاریخ ایجاد",
          width: "110px"
        },
        {
          field: "InsertTime",
          title: "زمان ایجاد",
          width: "110px"
        },
        {
          field: "SentDate",
          title: "تاریخ ارسال",
          width: "110px"
        },
        {
          field: "SentTime",
          title: "زمان ارسال",
          width: "110px"
        },
        {
          field: "Comment",
          title: "توضیحات",
          width: "140px"
        },
        {
          field: "SendCount",
          title: "تعداد دفعات ارسال",
          width: "140px"
        },

        {
          field: "showDetail",
          btnTitle: "خروج از لیست",
          cellRenderer: "agCallbackBtn",
          width: 160,
          callback: (params) => this.deleteRecord(params),
          cellStyle: {
            padding: 0
          }
        }
      ]
    }
  },

  methods: {
    async loadObj () {
      try {
        const payload = {
          pRequest: {
            DoNotChangeConfirmDate: false,
            NIdRequest: "00000000-0000-0000-0000-000000000000",
            NIdRequestInfoService: "00000000-0000-0000-0000-000000000000",
            NidProc: "00000000-0000-0000-0000-000000000000",
            NidWorkItem: 0,
            CI_Bank: 0,
            CheckApprovalDate: false,
            EumAccountingDocumentingCause: 0,
            EumLicenseStatus: 0,
            EumObjOnPrice: 0,
            FicheNo: 0,
            InquiryDay: 0,
            IsApproval: false,
            IsBaygani: false,
            IsConfirm: false,
            IsDelivery: false,
            IssuancecostsRequestType: 0,
            NIdBlackList: "00000000-0000-0000-0000-000000000000",
            NIdFiche: "00000000-0000-0000-0000-000000000000",
            NIdRunMonitoringHeader: "00000000-0000-0000-0000-000000000000",
            NIdTask: "00000000-0000-0000-0000-000000000000",
            NidBaygani: "00000000-0000-0000-0000-000000000000",
            NidCompany: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000"
          }
        }
        this.showLoading()
        const { data } =
          await this.$services.excavation.getAccountingDocNotSentList(payload)
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.fichInfo =
            this.loadObjRes.data.GetAccounting_DocNotSentListResult.ClsAccountingDocNotSent.Accounting_DocNotSent
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    deleteRecord (val) {
      this.showConfirm("آیا از حذف اطمینان دارید؟").onOk(async () => {
        try {
          const payload = {
            pAccounting_DocNotSent: {
              EumAccountingDocumentingCause: val.EumAccountingDocumentingCause,
              EumObjOnPrice: val.EumObjOnPrice,
              FicheNo: val.FicheNo,
              IsSent: val.IsSent,
              MaxSendCount: val.MaxSendCount,
              SendCount: val.SendCount
            }
          }
          this.showLoading()
          const { data } =
            await this.$services.excavation.deleteAccountingDocNotSent(payload)
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            this.loadObj()
            await this.log({
              action: this.logActions.delete,
              bizCode: val.FicheNo,
              bizCodeTitle: "FicheNo",
              saveDesc: `حذف فیش ${val.FicheNo} انجام گردید.`
            })
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      })
    },

    reSendToFinancialSystem () {
      this.showLoading()
      const payload = { pRequest: {} }
      this.$services.excavation
        .reSendToFinancialSystem(payload)
        .then(({ data }) => {
          this.reSendToFinancialSysRes = this.getResponse(data)
          if (this.reSendToFinancialSysRes.success) {
            // this.fichInfo = this.reSendToFinancialSysRes.data.reSendToFinancialSystemResult;
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
    }
  },

  mounted () {
    this.loadObj()
  }
}
</script>
