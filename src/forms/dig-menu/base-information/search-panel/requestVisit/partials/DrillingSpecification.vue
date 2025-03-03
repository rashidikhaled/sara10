<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_Request.Request_Info.CI_DigDelayTime"
          cdcName="CI_DigDelayTime"
          ciName="CI_DigDelayTime"
          domain-name="Dig"
          label="مدت تاخیر حفاری"
          label-width="90px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.ClsRevisit_Request.Request_Info.CI_SplitType"
          cdcName="CI_SplitType"
          ciName="CI_SplitType"
          domain-name="Dig"
          label="نوع انشعاب"
          label-width="90px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.ClsRevisit_Request.Request_Info.LetterNo"
          cdcName="LetterNo"
          label="شماره نامه"
          label-width="90px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.ClsRevisit_Request.Request_Info.LetterDate"
          cdcName="LetterDate"
          label="تاریخ نامه"
          label-width="90px"
          :m="m"
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
          :m="m"
          label="تداخل با سایر طرح ها"
          cdcName="ConfilictWithOther"
        />
      </div>
    </FormRow>
    <fit>
      <safa-splitter v-model="spliterModel" horizontal fit class="q-mt-sm">
        <template #before>
          <fit>
            <safa-datatable
              v-model="value.ClsRevisit_Request.Request_Time"
              cdcName="Request_Time"
              title="مدت و زمان اجرای عملیات حفاری (مجوز)"
              :columns="drillingLicenseColumns"
              :show-selected-checkbox="false"
              :allowMultipleSelection="false"
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
        <template #after>
          <fit>
            <safa-datatable
              v-model="value.ClsRevisit_Request.Request_Operations"
              cdcName="drillingOperations"
              title="مشخصات عملیات حفاری"
              :columns="drillingOperationsColumns"
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
      </safa-splitter>
    </fit>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "DrillingSpecification",
      model: "",
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
          width: "125px"
        },
        {
          field: "EndDateExtension",
          title: "تاریخ اتمام",
          width: "125px",
          editor: "date"
        },
        {
          field: "Duration",
          title: "مدت (روز)",
          width: "100px"
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
        // {
        //   field: "Length",
        //   title: "طول",
        //   width: "80px"
        // },
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
        {
          field: "AsphaltLife",
          title: "عمر آسفالت",
          width: "100px"
        },
        {
          field: "CI_CrossType",
          title: "نوع معبر",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          width: "110px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "110px"
        },
        {
          field: "CoverLength",
          title: "طول روکش",
          width: "120px"
        },
        {
          field: "CoverWidth",
          title: "عرض روکش",
          width: "120px"
        },
        {
          field: "Length",
          title: "طول معبر",
          width: "80px"
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
          width: "130px",
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
  },
  mounted () {}
}
</script>
