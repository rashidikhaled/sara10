<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              v-model="selectedCombo"
              label="تایید پاسخ"
              label-width="80px"
              :options="comboList"
              cdcName="selectedCombo"
              source-type="local"
            />
          </FormControl>
          <FormControl v-if="selectedCombo === 2 ? false : true">
            <safa-text
              v-model="InActiveInquiriesReportt.NidWorkItem"
              cdcName="NIdWorkItem"
              label="کد رهگیری"
              label-width="80px"
              @keyup.enter="loadObj"
            >
              <template v-slot:append>
                <q-icon
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="loadObj"
                  color="primary"
                  name="search"
                  :class="isEditable ? 'not-allowed' : 'cursor-pointer'"
                  title="جستجو"
                />
              </template>
            </safa-text>
          </FormControl>
        </FormRow>
        <template v-if="showPannel">
          <safa-grid
            :columns="columns"
            :getRowStyle="getRowStyle"
            height="100%"
            max-height="100%"
            min-height="100px"
            v-model="InActiveInquiriesReportt.Result"
            fit
          />
        </template>
      </fit>
      <safa-popup
        title="تایید استعلام"
        v-model="showHy_AcceptManager"
        width="1100px"
        height="600px"
      >
        <UAcceptInquiry
          :selectedItem="selectedItem"
          @hide="hideAcceptInquiry"
        />
      </safa-popup>
      <safa-popup
        title="بررسی استعلام"
        v-model="showHy_Estealam"
        width="1100px"
        height="600px"
      >
        <URequestService
          v-if="selectedItem?.RequestType === 1"
          :selectedItem="selectedItem"
        />
        <URequest
          v-if="selectedItem?.RequestType === 0"
          :selectedItem="selectedItem"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import UAcceptInquiry from "./partials/acceptInquiry/UAcceptInquiry"
import URequest from "./partials/request/URequest.vue"
import URequestService from "./partials/requestService/URequestService.vue"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin],
  components: {
    UAcceptInquiry,
    URequestService,
    URequest
  },
  data () {
    return {
      title: "تایید پاسخ استعلام",
      formKey: "KK7014AD-A20A-49A1-862F-2012DD44C166",
      name: "UInActiveInquiry",
      main: true,

      expantionState: false,
      showPannel: false,
      loadObjRes: null,
      NidWorkItem: "0",
      selectedItem: {},

      showHy_AcceptManager: false,
      showHy_Estealam: false,

      // model
      InActiveInquiriesReportt: {
        FromDate: "",
        IsDelivery: false,
        IsReNewal: false,
        NIdRequestService: "00000000-0000-0000-0000-000000000000",
        NidSelectedRedirect: "0",
        NidSelectedResponsibleRedirect: "138",
        NidSelectedResponsibleRequester: "0",
        NidWorkItem: "0",
        PageNumber: "1",
        Result: [],
        RowCount: "100",
        ToDate: currentDate()
      },

      beforeMonth: "",
      selectedCombo: 1,
      comboList: [
        // {
        //   ID: 0,
        //   Title: "لطفا یک گزینه را انتخاب کنید"
        // },
        {
          ID: 1,
          Title: "تایید پاسخ استعلام تاسیسات"
        },
        {
          ID: 2,
          Title: " تایید پاسخ استعلام خسارت"
        },
        {
          ID: 3,
          Title: "تایید پاسخ استعلام مجدد"
        }
      ]
    }
  },
  computed: {
    // IsDelivery () {
    //   return this.selectedCombo === 2
    // },
    // IsReNewal () {
    //   return this.selectedCombo === 3
    // },
    columns () {
      let helpCol = [
        {
          field: "",
          title: "",
          editor: "action",
          width: "80px",
          cellStyle: {
            padding: 0,
            margin: 5
          },
          btnTitle: "تایید استعلام",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.Hy_AcceptManager(params)
        },
        {
          field: "",
          title: "",
          editor: "action",
          width: "80px",
          cellStyle: {
            padding: 0,
            margin: 5
          },
          btnTitle: "بررسی استعلام",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.Hy_Estealam(params)
        },
        {
          field: "NIdWorkItem",
          title: "کد رهگیری",
          width: "100px"
        },
        {
          field: "SelfRedirectName",
          title: "شرکت درخواست دهنده",
          width: "160px"
        },
        {
          field: "Date",
          title: "تاریخ استعلام",
          width: "150px"
        },
        {
          field: "RedirectName",
          title: "شرکت پاسخ دهنده",
          width: "150px"
        },
        {
          field: "AcceptDate",
          title: "تاریخ پاسخ",
          width: "150px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ]
      if (!this.InActiveInquiriesReportt.IsDelivery) {
        helpCol.splice(4, 0, {
          field: "CI_TypeAcceptInquiry",
          title: "نوع پاسخ",
          editor: "combo",
          domain: "Dig",
          width: "150px"
        })
      }
      return helpCol
    }
  },
  watch: {
    selectedCombo: function () {
      // if (this.selectedCombo === 0) {
      //   this.showPannel = false
      //   return
      // }
      if (this.selectedCombo === 1) {
        this.InActiveInquiriesReportt.IsDelivery = false
        this.InActiveInquiriesReportt.IsReNewal = false
      }
      if (this.selectedCombo === 2) {
        this.InActiveInquiriesReportt.IsDelivery = true
        this.InActiveInquiriesReportt.IsReNewal = false
      }
      if (this.selectedCombo === 3) {
        this.InActiveInquiriesReportt.IsDelivery = false
        this.InActiveInquiriesReportt.IsReNewal = true
      }
      this.loadObj()
    }
  },

  mounted () {
    this.beforeMonthMethod()
    this.InActiveInquiriesReportt.FromDate =
      this.CalculateStartDateBaseOnTimeSpan(1)
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()

      const payload = {
        pRequest: {
          DoNotChangeConfirmDate: false,
          InActiveInquiriesReport: { ...this.InActiveInquiriesReportt }
        }
      }

      this.$services.excavation
        .getInActiveInquiriesReport(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            debugger
            this.InActiveInquiriesReportt =
              this.loadObjRes.data.GetInActiveInquiriesReportResult?.InActiveInquiriesReport
            this.showPannel = true
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
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
    beforeMonthMethod () {
      this.beforeMonth = currentDate()
    },
    updateToday () {
      PersianDate.toCalendar("persian")
      return new PersianDate().toLocale("en").format("L")
    },
    Hy_AcceptManager (e) {
      this.selectedItem = e
      this.showHy_AcceptManager = true
    },
    CalculateStartDateBaseOnTimeSpan (p) {
      const date = this.updateToday()
      const normalizeDate = new PersianDate(
        date.split("/").map((x) => Number(x))
      )

      return normalizeDate.subtract("months", p).toLocale("en").format("L")
    },
    Hy_Estealam (e) {
      this.selectedItem = e
      this.showHy_Estealam = true
    },
    hideAcceptInquiry () {
      this.showHy_AcceptManager = false
      this.loadObj()
    },
    getRowStyle (params) {
      if (params.data?.CI_TypeAcceptInquiry === 1) return { background: "#bcf5bc" }
      if (params.data?.CI_TypeAcceptInquiry === 2) return { background: "#d58585" }
    }
  }
}
</script>
