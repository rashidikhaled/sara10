<template>
    <fit>
      <safa-splitter v-model="splitterHorizontalModel" horizontal>
        <template v-slot:before>
          <fit>
            <safa-splitter v-model="splitterVerticalModel" vertical>
              <template v-slot:before>
                <fit>
                  <safa-grid
                    title="مشخصات پیمانکار و ناظرین"
                    v-model="value.ClsLicense.License_Person"
                    :columns="licensePersonColumns"
                    :suppressRowClickSelection="false"
                    fit
                    paginate
                    cdcName="License_Person"
                    m="r"
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-grid
                    title="مدت و زمان اجرای عملیات حفاری "
                    v-model="value.ClsLicense.License_Time"
                    :columns="licenseTimeColumns"
                    :suppressRowClickSelection="false"
                    fit
                    paginate
                    cdcName="License_Time"
                    m="r"
                  />
                </fit>
              </template>
            </safa-splitter> </fit
        ></template>
        <template v-slot:after>
          <fit>
            <safa-grid
              title="مشخصات عملیات حفاری"
              v-model="value.ClsLicense.License_Operation"
              :columns="licenseOperationColumns"
              :suppressRowClickSelection="false"
              fit
              paginate
              cdcName="License_Operation"
              m="r"
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
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      licensePersonColumns: [
        {
          title: "نوع شرکت",
          field: "CompanyType"
        },
        {
          title: "نام شرکت",
          field: "CompanyName"
        },
        {
          title: "نام و نام خانوادگی",
          field: "PersonName"
        },
        {
          title: "تلفن همراه",
          field: "ManagerTel"
        },
        {
          title: "نمابر",
          field: "PersonFax"
        },
        {
          title: "توضیحات",
          field: "Description"
        }
      ],
      licenseTimeColumns: [
        {
          title: "فاز",
          field: "Phase"
        },
        {
          title: "تاریخ شروع",
          field: "StartDate"
        },
        {
          title: "تاریخ اتمام",
          field: "EndDate"
        },
        {
          title: "مدت (روز)",
          field: "Duration"
        },
        {
          title: "توضیحات",
          field: "Description"
        }
      ],
      licenseOperationColumns: [
        {
          title: "فاز",
          field: "Phase"
        },
        {
          title: "نوع حفاری",
          field: "CI_DigType",
          editor: "combo",
          domain: "dig"
        },
        {
          title: "جنس روسازی معبر",
          field: "MaterialsType"
        },
        {
          title: "محل حفاری",
          field: "PathType"
        },
        {
          title: "خاک برداری",
          field: "Diggings"
        },
        {
          title: "طول ",
          field: "Length"
        },
        {
          title: "عرض",
          field: "Width"
        },
        {
          title: "عمق",
          field: "Depth"
        },
        {
          title: "عمر آسفالت",
          field: "AsphaltLife"
        },
        {
          title: "ضریب کیفیت آسفالت",
          field: "AsphaltQuality"
        },
        {
          title: "ضخامت آسفالت روکش",
          field: "AsphaltThickness"
        },
        {
          title: "طول معبر",
          field: "CrossLength"
        },
        {
          title: "طول مازاد حفاری",
          field: "DigLenghtExcess"
        },
        {
          title: "عرض مازاد ترانشه",
          field: "TrenchesWidthExcess"
        },
        {
          title: "ضریب تکرار حفاری",
          field: "RepeatDigCoefficient"
        },
        {
          title: "عرض معبر ",
          field: "CavalryWidth"
        }
      ],
      splitterHorizontalModel: 50,
      splitterVerticalModel: 50
    }
  }
}
</script>
