<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="value.Request_Info.CI_DigDelayTime"
          cdcName="CI_DigDelayTime"
          ciName="CI_DigDelayTime"
          domainName="Dig"
          label="مدت تاخیر حفاری"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.Request_Info.CI_SplitType"
          cdcName="CI_SplitType"
          ciName="CI_SplitType"
          domainName="Dig"
          label="نوع انشعاب"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.Request_Info.LetterNo"
          cdcName="LetterNo"
          label="شماره نامه"
          label-width="80px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.Request_Info.LetterDate"
          cdcName="LetterDate"
          label="تاریخ نامه"
          label-width="80px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="spModel" horizontal>
      <template v-slot:before>
        <fit>
          <safa-grid
            title="مدت و زمان اجرای عملیات حفاری (پیشنهاد درخواست)"
            v-model="value.Request_Time"
            cdcName="Request_Time"
            :columns="requestTimeColumns"
            required
            validations="required"
            :suppressRowClickSelection="false"
            :defaultNewRow="defaultNewRequestTime"
            :m="m"
            fit
            :pageSize="20"
            paginate
            ref="requestTime"
          />
          <!-- @model:update="onRequestTimeUpdate" -->
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="مشخصات عملیات حفاری"
            v-model="value.Request_Operations"
            :columns="requestOperationsColumns"
            cdcName="inquiryRenewedReportList"
            required
            validations="required"
            :suppressRowClickSelection="false"
            :defaultNewRow="defaultNewRequestOperations"
            :m="m"
            fit
            :pageSize="20"
            paginate
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          Request_Info: {
            CI_DigDelayTime: 0,
            CI_SplitType: 0,
            LetterNo: "",
            LetterDate: ""
          },
          Request_Time: [],
          Request_Operations: []
        }
      }
    },
    m: {
      type: String,
      default: "r"
    }
  },
  computed: {
    requestTimeColumns () {
      return [
        {
          field: "CI_Phase",
          title: "فاز",
          domain: "Dig",
          editor: "combo",
          width: "150px"
        },
        {
          field: "StartDate",
          title: "تاریخ شروع",
          editor: "date",
          validations: "required",
          width: "120px"
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          editor: "date",
          validations: "required",
          width: "120px"
        },
        {
          field: "Duration",
          title: "مدت(روز)",
          width: "120px",
          valueGetter: (col, params) => {
            return this.setDuration(params.data)
          },
          editable: false
        },
        { field: "Description", title: "توضیحات", width: "300px" }
      ]
    }
  },
  data () {
    return {
      spModel: 50,
      defaultNewRequestTime: {
        AgainRenewal: null,
        CI_CauseRenewal: null,
        CI_Phase: 0,
        Delay: null,
        Description: null,
        Duration: 0,
        EndDate: "",
        EndTime: null,
        NIdRequest: "00000000-0000-0000-0000-000000000000",
        NIdTime: "00000000-0000-0000-0000-000000000000",
        RegDate: null,
        StartDate: currentDate(),
        StartTime: null,
        Total: 0
      },
      defaultNewRequestOperations: {
        Area: "0",
        AsphaltLife: "0",
        AsphaltThickness: "0",
        CI_AsphaltQuality: 0,
        CI_CrossType: 0,
        CI_CutType: 0,
        CI_DigRepeat: 0,
        CI_DigTime: 0,
        CI_DigType: 0,
        CI_Diggings: 0,
        CI_MaterialsType: 0,
        CI_PathType: 0,
        CI_Phase: 0,
        CI_Section: 1,
        CavalryWidth: "0",
        Depth: 0,
        Description: null,
        DigLenghtExcess: "0",
        Length: 0,
        NIdRequest: "00000000-0000-0000-0000-000000000000",
        NIdRequestOperations: "00000000-0000-0000-0000-000000000000",
        RegionPrice: null,
        ShowingCrossing: null,
        TrenchesWidthExcess: "0",
        Width: 0
      },
      // requestTimeColumns: [
      //   {
      //     field: "CI_Phase",
      //     title: "فاز",
      //     domain: "Dig",
      //     editor: "combo",
      //     width: "150px"
      //   },
      //   {
      //     field: "StartDate",
      //     title: "تاریخ شروع",
      //     editor: "date",
      //     validations: "required",
      //     width: "120px"
      //   },
      //   {
      //     field: "EndDate",
      //     title: "تاریخ اتمام",
      //     editor: "date",
      //     validations: "required",
      //     width: "120px"
      //   },
      //   { field: "Duration", title: "مدت(روز)", width: "120px" },
      //   { field: "Description", title: "توضیحات", width: "auto" }
      // ],
      requestOperationsColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          domain: "Dig",
          editor: "combo",
          width: "120px"
        },
        {
          field: "CI_Section",
          title: "مقطع",
          domain: "Dig",
          editor: "combo",
          width: "120px"
        },
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          domain: "Dig",
          editor: "combo",
          width: "120px"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی معبر",
          domain: "Dig",
          editor: "combo",
          width: "150px"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          domain: "Dig",
          editor: "combo",
          width: "120px"
        },
        {
          field: "CI_Diggings",
          title: "خاک برداری",
          domain: "Dig",
          editor: "combo",
          width: "120px"
        },
        {
          field: "Length",
          title: "طول",
          validations: "required",
          width: "120px"
        },
        {
          field: "Width",
          title: "عرض",
          validations: "required",
          width: "120px"
        },
        {
          field: "Depth",
          title: "عمق",
          validations: "required",
          width: "120px"
        },
        { field: "Description", title: "توضیحات", width: "300px" }
      ]
    }
  },
  methods: {
    setDuration (params) {
      try {
        if (params.StartDate === "") return 0
        if (params.EndDate === "") return 0
        return this.compareDays(params.StartDate, params.EndDate)
      } catch {
        return 0
      }
    },
    compareDays (date1, date2) {
      if (!date1 || !date2) return ""
      PersianDate.toCalendar("persian")
      const _d1 = new PersianDate(date1.split("/").map((x) => Number(x)))
      const _d2 = new PersianDate(date2.split("/").map((x) => Number(x)))
      const res = _d2.diff(_d1, "days")
      return res
    }
  }
}
</script>
