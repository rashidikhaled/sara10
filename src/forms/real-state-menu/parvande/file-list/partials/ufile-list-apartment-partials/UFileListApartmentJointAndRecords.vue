<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontal" horizontal>
      <template v-slot:before>
        <fit>
          <safa-splitter v-model="splitterValueVertivalTop" vertical>
            <template v-slot:before>
                <safa-grid
                  v-model="value.Base_SharingInfrastructure"
                  :columns="totalJointColumn"
                  fit
                  title="زیر بنای مشترکات"
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
            </template>
            <template v-slot:after>
                <safa-grid
                  v-model="value.Base_SubScription"
                  :columns="facilitiesColumn"
                  fit
                  title="تاسیسات"
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter v-model="splitterValueVertivalBottom" vertical>
            <template v-slot:before>
                <safa-grid
                  v-model="value.Base_Installation"
                  :columns="pointsAndSubScriptionColumn"
                  fit
                  title="امتیازات و انشعابات"
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
            </template>
            <template v-slot:after>
                <safa-grid
                  v-model="value.Base_ShahrsaziArchive"
                  :columns="shahrsaziRecordsColumn"
                  fit
                  title="سوابق شهرسازی"
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      splitterValueHorizontal: 50,
      splitterValueVertivalTop: 50,
      splitterValueVertivalBottom: 50,

      totalJointColumn: [
        {
          field: "CI_UsingGroup",
          editor: "combo",
          domain: "Estate",
          title: "اصلی",
          width: ""
        },
        {
          field: "CI_UsingType",
          editor: "combo",
          domain: "Estate",
          ignoreCi: false,
          title: "فرعی",
          width: ""
        },
        {
          field: "CI_SharingInfrastructureState",
          editor: "combo",
          domain: "Estate",
          title: "کد وضعیت زیر بنای مشترکات",
          width: ""
        }
      ],

      facilitiesColumn: [
        {
          field: "CI_InstallationType",
          editor: "combo",
          domain: "Estate",
          title: "کد نوع تاسیسات",
          width: ""
        },
        { field: "InstallationValue", title: "مقدار", width: "" }
      ],

      pointsAndSubScriptionColumn: [
        {
          field: "CI_SubScriptionType",
          editor: "combo",
          domain: "Estate",
          title: "نوع اشتراکات",
          width: ""
        },
        { field: "SubScriptionVal", title: "شماره اشتراکات", width: "" }
      ],

      shahrsaziRecordsColumn: [
        {
          field: "CI_ShahrsaziArchiveKind",
          editor: "combo",
          domain: "Estate",
          title: "نوع سوابق شهرسازی",
          width: ""
        },
        {
          field: "CI_LicenceExportationRefrence",
          editor: "combo",
          domain: "Estate",
          title: "مرجع صدور مجوز",
          width: ""
        },
        { field: "CertificateNo", title: "شماره گواهی", width: "" },
        { field: "CertificateDate", title: "تاریخ گواهی", width: "" },
        {
          field: "IsValid",
          title: "آیا معتبر است؟",
          editor: "checkbox",
          width: ""
        },
        { field: "CreditDate", title: "تاریخ اعتبار", width: "" },
        { field: "Comments", title: "توضیحات", width: "" }
      ]
    }
  }
}
</script>
