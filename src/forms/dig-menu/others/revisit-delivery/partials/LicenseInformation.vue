<template>
  <fit>
    <safa-splitter v-model="sp1" horizontal>
      <template v-slot:before>
        <fit>
          <safa-splitter v-model="sp2" vertical>
            <template v-slot:before>
              <fit>
                <safa-grid
                  title="مشخصات پیمانکار و ناظرین"
                  v-model="value.License_Person"
                  cdcName="License_Person"
                  :columns="licensePersonColumns"
                  :suppressRowClickSelection="false"
                  fit
                  :pageSize="20"
                  paginate
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  title="مدت و زمان اجرای عملیات حفاری "
                  v-model="value.License_Time"
                  cdcName="License_Time"
                  :columns="licenseTimeColumns"
                  :suppressRowClickSelection="false"
                  fit
                  :pageSize="20"
                  paginate
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            title="مشخصات عملیات حفاری"
            v-model="value.License_Operation"
            cdcName="License_Operation"
            :columns="licenseOperationColumns"
            :suppressRowClickSelection="false"
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
export default {
  props: { value: Object },

  data () {
    return {
      sp1: 50,
      sp2: 50,
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
          field: "PersonTel"
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
      ]
    }
  }
}
</script>
