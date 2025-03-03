<template>
  <fit>
    <safa-splitter v-model="spliterModel" horizontal fit class="">
      <template #before>
        <fit>
          <safa-splitter v-model="spliterModel" fit class="q-mt-sm">
            <template #before>
              <fit>
                <safa-grid
                  v-model="value.ClsLicense.License_Person"
                  cdcName="drillingLicense"
                  title="مشخصات پیمانکار و ناظرین"
                  :columns="DetailsSupervisorsColumns"
                  height="100%"
                  max-height="100%"
                  min-height="200px"
                  fit
                  m="r"
                  paginate
                  :pageSize="20"
                />
              </fit>
            </template>
            <template #after>
              <fit>
                <safa-grid
                  v-model="value.ClsLicense.License_Time"
                  cdcName="drillingExtension"
                  title="مدت و زمان اجرای عملیات حفاری (تمدید)"
                  :columns="drillingExtensionColumns"
                  height="100%"
                  max-height="100%"
                  min-height="200px"
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
      <template #after>
        <fit>
          <safa-grid
            v-model="value.ClsLicense.License_Operation"
            cdcName="drillingOperations"
            title="مشخصات عملیات حفاری"
            :columns="drillingOperationsColumns"
            height="100%"
            max-height="100%"
            min-height="200px"
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
    rowSelectData: Object
  },
  data () {
    return {
      spliterModel: 50,
      DetailsSupervisorsColumns: [
        {
          field: "CompanyType",
          title: "نوع شرکت",
          width: "100px"
        },
        {
          field: "CompanyName",
          title: "نام شرکت",
          editor: "date"
        },
        {
          field: "PersonName",
          title: "نام و نام خانوادگی",
          width: "100px"
        },
        {
          field: "PersonTel",
          title: "تلفن همراه",
          width: "150px"
        },
        {
          field: "PersonFax",
          title: "نمابر",
          width: "150px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "150px"
        }
      ],
      drillingExtensionColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: "80px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "StartDateExtension",
          title: "تاریخ شروع",
          editor: "date",
          width: "100px"
        },
        {
          field: "EndDateExtension",
          title: "تاریخ اتمام",
          width: "100px",
          editor: "date"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
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
        {
          field: "AsphaltLife",
          title: "عمر آسفالت",
          width: "100px"
        },
        {
          field: "AsphaltQuality",
          title: "ضریب کیفیت آسفالت",
          width: "130px"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "170px"
        },
        {
          field: "CrossLength",
          title: "طول معبر",
          width: "100px"
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
          title: "عرض معبر",
          width: "100px"
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>
