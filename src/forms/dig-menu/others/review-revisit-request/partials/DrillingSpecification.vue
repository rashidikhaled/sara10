<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_Request.Request_Info.CI_DigDelayTime"
          cdcName="CI_DigDelayTime"
          ciName="CI_DigDelayTime"
          domainName="Dig"
          label="مدت تاخیر حفاری"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_Request.Request_Info.CI_SplitType"
          cdcName="CI_SplitType"
          ciName="CI_SplitType"
          domainName="Dig"
          label="نوع انشعاب"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.LetterNo"
          cdcName="LetterNo"
          label="شماره نامه"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.ClsRevisit_Request.Request_Info.LetterDate"
          cdcName="LetterDate"
          label="تاریخ نامه"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.RequesterRegion"
          cdcName="RegionPrice"
          label="قیمت منطقه ای"
          label-width="90px"
          :m="m"
        />
      </FormControl>
      <div class="row">
        <safa-checkbox
          v-model="value.ClsRevisit_Request.Request_Info.ConfilictWithOther"
          m="r"
          label="تداخل با سایر طرح ها"
          cdcName="ConfilictWithOther"
        />
      </div>
    </FormRow>
    <safa-splitter v-model="spliterModel" horizontal fit>
      <template v-slot:before>
        <fit>
          <safa-datatable
              v-model="value.ClsRevisit_Request.Request_Time"
              cdcName="drillingLicense"
              title="مدت و زمان اجرای عملیات حفاری"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
              :columns="drillingLicenseColumns"
              @update="updateRequestServiceTime"
              height="100%"
              max-height="100%"
              min-height="180px"
              fit
              :m="m"
              paginate
              :pageSize="20"
            />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
              v-model="value.ClsRevisit_Request.Request_Operations"
              cdcName="drillingOperations"
              title="مشخصات عملیات حفاری"
              :columns="drillingOperationsColumns"
              height="100%"
              max-height="100%"
              min-height="180px"
              fit
              m="r"
              paginate
              :pageSize="20"
            />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      exState1: true,
      spliterModel: 50,
      drillingLicense: [],
      drillingOperations: [],
      drillingLicenseColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "StartDateExtension",
          title: "تاریخ شروع",
          editor: "date",
          width: "120px"
        },
        {
          field: "EndDateExtension",
          title: "تاریخ اتمام",
          width: "120px",
          editor: "date"
        },
        {
          field: "Duration",
          title: "مدت (روز)",
          width: "120px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ],
      drillingOperationsColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: "80px",
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
          width: "150px",
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
          width: "80px"
        },
        {
          field: "Width",
          title: "عرض",
          width: "80px"
        },
        {
          field: "Depth",
          title: "عمق",
          width: "80px"
        },
        // {
        //   field: "Depth",
        //   title: "طول معبر",
        //   width: "100px"
        // },
        {
          field: "AsphaltLife",
          title: "عمر آسفالت",
          width: "100px"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          width: "130px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "250px"
        },
        {
          field: "CI_CrossType",
          title: "نوع معبر",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "DigLenghtExcess",
          title: "طول مازاد حفاری",
          width: "150px"
        },
        {
          field: "TrenchesWidthExcess",
          title: "عرض مازاد ترانشه",
          width: "150px"
        },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکرار حفاری",
          width: "150px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CavalryWidth",
          title: "عرض محل حفاری",
          width: "150px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ]
    }
  },
  methods: {
    updateRequestServiceTime () {
      this.$emit("updateRequestServiceTime")
    }
  }
}
</script>
