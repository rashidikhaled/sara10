<template>
  <safa-form
    appId="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    caption="پلیس ساختمان- عملیات پلمب"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <FormRow>
          <FormControl>
            <safa-text
              label="کد ارجاع"
              label-width="70px"
              v-model="NidWorkitem"
              cdcName="NidWorkitem"
              @keyup.enter="loadObj"
            />
          </FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            label-width="70px"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            @enter="loadObj"
          />
          <div>
            <btn-search @click="loadObj" />
          </div>
        </FormRow>
        <safa-grid
          mode="r"
          fit
          paginate
          :columns="sealedOperationListColumns"
          min-height="150px"
          height="100%"
          max-height="100%"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          class="q-mt-sm"
          v-model="model.SealedOperationList"
          cdcName="SealedOperationList"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "عملیات پلمب",
      formKey: "8ccb67a0-56d7-4086-a0c3-bad24f5b693a",
      name: "UBuildingPoliceHistory",
      main: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      NidWorkitem: 0,
      model: {
        SealedOperationList: []
      },
      result: null,
      selectedRow: {},
      isView: false,
      sealedOperationListColumns: [
        {
          field: "NidWorkItem",
          title: "کد ارجاع",
          width: "100px"
        },
        {
          field: "NosaziCode",
          title: "کد نوسازی",
          width: "120px"
        },
        {
          field: "SealedOperationType",
          title: "نوع عملیات",
          width: "120px"
        },
        {
          field: "OperationNo",
          title: "شماره عملیات",
          width: "115px"
        },
        {
          field: "OperationDate",
          title: "تاریخ عملیات",
          width: "125"
        },
        {
          field: "OperationTime",
          title: "ساعت عملیات",
          width: "115px"
        },
        {
          field: "UserName",
          title: "کاربر",
          width: "120px"
        },
        {
          field: "EnterDate",
          title: "تاریخ ثبت",
          width: "120px"
        },
        {
          field: "EnterTime",
          title: "ساعت ثبت",
          width: "100px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "200px"
        },
        {
          field: "agCallbackBtn",
          title: "گزارش",
          btnTitle: "گزارش",
          callback: (params) => this.onOpenReport(params)
        }
      ]
    }
  },

  created () {
    if (this.selectedRequest) {
      this.NidWorkitem = this.selectedRequest.NidWorkItem
    }
  },

  methods: {
    loadObj () {
      if (this.NidWorkitem === "") {
        this.NidWorkitem = 0
      }
      this.showLoading()
      const payload = {
        // pNidWorkitem: '333465',
        pNidWorkitem: this.NidWorkitem,
        pNosaziCode:
          this.baseNosaziCode.District === 0 &&
          this.baseNosaziCode.Region === 0 &&
          this.baseNosaziCode.Block === 0 &&
          this.baseNosaziCode.House === 0 &&
          this.baseNosaziCode.Building === 0 &&
          this.baseNosaziCode.Apartment === 0 &&
          this.baseNosaziCode.Shop === 0
            ? null
            : convertNosaziCodeObjectToString(this.baseNosaziCode)
      }

      this.$services.SH.getSealedOperationList2(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.model.SealedOperationList =
              this.result.data.SealedOperationList
            if (this.model.SealedOperationList.length === 0) {
              this.showError("موردی یافت نشد")
            }
            if (!this.isView) {
              const strNosazi = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              await this.log({
                action: this.logActions.view,
                bizCode: strNosazi,
                bizCodeTitle: "کدنوسازی",
                nidWorkItem: this.NidWorkitem ?? "",
                nosaziCode: strNosazi,
                saveDesc: `نمایش فرم عملیات پلمب برای کد نوسازی ${strNosazi} انجام گردید.`
              })
            }
            this.isView = true
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    onOpenReport (dataItem) {
      this.selectedRow = dataItem
      this.report()
    },
    async report () {
      let ReportName = ""
      if (this.selectedRow.EumSealedOperationType === 8) {
        ReportName = "DastoorePolomp"
      } else if (this.selectedRow.EumSealedOperationType === 6) {
        ReportName = "RptDastoorRafePolomp"
      } else if (this.selectedRow.EumSealedOperationType === 2) {
        ReportName = "SMPolomp"
      } else if (this.selectedRow.EumSealedOperationType === 5) {
        ReportName = "ElamFakePolomp"
      } else if (this.selectedRow.EumSealedOperationType === 1) {
        ReportName = "DastoorePolomp"
      } else if (this.selectedRow.EumSealedOperationType === 4) {
        ReportName = "RptDastoorRafePolomp"
      } else if (this.selectedRow.EumSealedOperationType === 7) {
        ReportName = "WarrantRun"
      } else if (this.selectedRow.EumSealedOperationType === 9) {
        ReportName = "DastoorePolomp"
      } else if (this.selectedRow.EumSealedOperationType === 10) {
        ReportName = "LackPolomp"
      } else if (this.selectedRow.EumSealedOperationType === 11) {
        ReportName = "Execution"
      } else if (this.selectedRow.EumSealedOperationType === 12) {
        ReportName = "RequestRemoveSealed"
      }
      const reportPath = `/BuildingPolice/${ReportName}`
      const queryParams = {
        NidProc: this.selectedRow.NidProc,
        NidOper: this.selectedRow.NidOper
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: ReportName,
        bizCodeTitle: "گزارش"
      })
      const strNosazi = convertNosaziCodeObjectToString(this.baseNosaziCode)
      await this.log({
        action: this.logActions.printReport,
        bizCode: strNosazi,
        bizCodeTitle: "کدنوسازی",
        nidWorkItem: this.NidWorkitem ?? "",
        nosaziCode: strNosazi,
        saveDesc: `نمایش گزارش در فرم عملیات پلمب برای کد نوسازی ${strNosazi} انجام گردید.`
      })
    }
  }
}
</script>
