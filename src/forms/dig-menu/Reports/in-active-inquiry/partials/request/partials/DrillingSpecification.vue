<template>
  <fit>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-combo
          v-model="value.ClsRequest_Info.Request_Info.CI_DigDelayTime"
          cdcName="CI_DigDelayTime"
          ciName="CI_DigDelayTime"
          domain-name="Dig"
          label="مدت تاخیر حفاری"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsRequest_Info.Request_Info.CI_SplitType"
          cdcName="CI_SplitType"
          ciName="CI_SplitType"
          domain-name="Dig"
          label="نوع انشعاب"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRequest_Info.Request_Info.LetterNo"
          cdcName="LetterNo"
          label="شماره نامه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.ClsRequest_Info.Request_Info.LetterDate"
          cdcName="LetterDate"
          label="تاریخ نامه"
          label-width="80px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="splitterValue" class="fit" horizontal margin="0">
      <template v-slot:before>
        <fit>
          <safa-grid
            title="مدت و زمان اجرای عملیات حفاری (پیشنهادی درخواست)"
            v-model="value.ClsRequest_Info.Request_Time"
            :columns="PermistionDrillingtimeColumns"
            fit
            paginate
            cdcName="Request_TimeMojavez"
            m="r"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="مشخصات عملیات حفاری"
            v-model="value.ClsRequest_Info.Request_Operations"
            :columns="ExecutiveSpecificationColumns"
            fit
            spId="75456489-4318-444b-816f-4d3c12345ghf"
            paginate
            cdcName="Request_Operations"
            m="r"
          /> </fit
      ></template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    model2: Object,
    value: Object
  },
  components: {},
  data () {
    return {
      PermistionDrillingtimeColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "StartDate",
          title: "تاریخ شروع",
          width: "100px",
          editor: "date"
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          width: "100px",
          editor: "date"
        },
        {
          field: "Duration",
          title: "مدت(روز)",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ],
      RenewalDrillingtimeColumns: [
        {
          field: "",
          title: "نوبت تمدید",
          width: "100px",
          isEditable: false
        },
        {
          field: "StartDate",
          title: "تاریخ شروع",
          width: "100px",
          editor: "date",
          isEditable: false
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          width: "100px",
          editor: "date"
        },
        {
          field: "CI_CauseRenewal",
          title: "علت تمدید",
          width: "100px",
          editor: "combo",
          domain: "Dig",
          isEditable: false
        },
        {
          field: "Duration",
          title: "مدت(روز)",
          width: "100px",
          isEditable: false
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px",
          isEditable: false
        }
      ],
      ExecutiveSpecificationColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_Section",
          title: "مقطع",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی معبر",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_Diggings",
          title: "خاک برداری",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "Length",
          title: "طول",
          width: "100px"
        },
        {
          field: "Width",
          title: "عرض",
          width: "100px"
        },
        {
          field: "Depth",
          title: "عمق",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ],
      splitterValue: 50
    }
  },
  methods: {}
}
</script>
