<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90BBA2FE-5569-45B3-9A7B-EB92B3B19CA1"
  >
    <form-wrapper :title="title">
    <template #header>
        <safa-status :result="result" /></template>
      <fit>
        <FormRow class="q-my-sm">
          <FormControl>
            <safa-text
              label="کدارجاع"
              label-width="70px"
              v-model="model.NidWorkItem"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              locale="fa"
              placeholder="از تاریخ"
              format="jYYYY/jMM/jDD"
              display-format="dddd jDD jMMMM jYYYY"
              label="از تاریخ"
              label-width="70px"
              v-model="model.ReturnedDateFrom"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              locale="fa"
              placeholder="تا"
              format="jYYYY/jMM/jDD"
              display-format="dddd jDD jMMMM jYYYY"
              label="تا"
              label-width="70px"
              v-model="model.ReturnedDateTo"
            />
          </FormControl>
          <div>
            <btn-default label="بازآوری" @click="loadObj" />
          </div>
        </FormRow>
           <safa-datatable
            :columns="CheckerColumn"
            :m="mode"
            height="100%"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
            fit
            max-height="100%"
            min-height="100%"
            v-model="model.Ref_Checker_Kartabl"
            @CheckingDetailsClick="CheckingDetails"
            @CheckingInfoCalculatorClick="OnOpenCheckingInfoCalculator"
          />
      </fit>
      <safa-popup v-model="ShowCheckingInfoCalculator" width="800px" >
          <UCheckingInfoCalculator :selectedRow="selectedRow"/>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UCheckingInfoCalculator from "../checking-info-calculator/UCheckingInfoCalculator.vue"

export default {
  mixins: [baseFormMixin],
  components: { UCheckingInfoCalculator },
  data () {
    return {
      title: "بازبینی های برگشت خورده",
      formKey: "78EBEA4F-ABB8-4ACA-A18B-1BDFAD400FCF",
      name: "UReturnedCheckers",
      main: true,
      CheckerColumn: [
        {
          field: "CheckingDetails",
          title: "جزییات بازبین",
          editor: "action",
          width: "150px"
        },
        {
          field: "CheckingInfoCalculator",
          title: "اطلاعات بازبین محاسب",
          editor: "action",
          width: "150px"
        },
        {
          field: "NidWorkItem",
          title: "کد ارجاع",
          width: "150px"
        },
        {
          field: "CodeString",
          title: "کد نوسازی",
          width: "150px"
        },
        {
          field: "OwnerName_Full",
          title: "مالک",
          width: "150px"
        },
        {
          field: "RegisterPlack",
          title: "پلاک ثبتی",
          width: "150px"
        },
        {
          field: "infrastructure",
          title: "زیربنا",
          width: "150px"
        },
        {
          field: "SendToCheckerUserName",
          title: "کاربر ارسال کننده به بازبین",
          width: "150px"
        },
        {
          field: "SendToCheckerDate",
          title: "تاریخ ارسال به بازبین",
          width: "150px",
          editor: "date"
        },
        {
          field: "SendToCheckerTime",
          title: "ساعت ارسال به بازبین",
          width: "150px"
        },
        {
          field: "ReturnedDate",
          title: "تاریخ برگشت",
          width: "150px",
          editor: "date"
        },
        {
          field: "ReturnedTime",
          title: "ساعت برگشت",
          width: "150px"
        }
      ],
      result: null,
      model: {
        NidWorkItem: 0,
        EumRefCheckerStatus: 3,
        ReturnedDateFrom: "",
        ReturnedDateTo: "",
        Ref_Checker_Kartabl: []
      },
      ShowCheckingInfoCalculator: false,
      nidRef: "00000000-0000-0000-0000-000000000000",
      selectedRow: {}
    }
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pNIdEng_Checker: "00000000-0000-0000-0000-000000000000",
        pNIdEng_Refer: this.getNidUser(),
        pNidWorkItem: this.model.NidWorkItem,
        pEumRefCheckerStatus: this.model.EumRefCheckerStatus,
        pReturnedDate_From: this.model.ReturnedDateFrom,
        pReturnedDate_To: this.model.ReturnedDateTo,
        pFromRow: 0,
        pToRow: 50
      }
      this.$services.eng
        .getRefCheckerKartabl(payload)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.model = this.result.data.GetRef_Checker_KartablResult
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
    CheckingDetails () {
      this.loadObj()
    },
    OnOpenCheckingInfoCalculator ({ dataItem }) {
      this.ShowCheckingInfoCalculator = true
      this.selectedRow = dataItem
      this.nidRef = dataItem.NIdRef
    }
  },
  created () {
    this.loadObj()
  }
}
</script>
