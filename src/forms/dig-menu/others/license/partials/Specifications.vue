<template>
  <fit>
    <safa-splitter v-model="splitterModel" horizontal margin="0">
      <template v-slot:before>
        <safa-splitter v-model="splitterModel2" vertical margin="0">
          <template v-slot:before>
            <safa-grid
              title="مشخصات پیمانکار و ناظرین"
              v-model="value.License_Person"
              cdcName="LicensePerson"
              :columns="licensePersonColumns"
              :m="m"
              min-height="200px"
              fit
              :pageSize="20"
              paginate
            />
          </template>
          <template v-slot:after>
            <safa-grid
              title="مدت و زمان اجرای عملیات حفاری"
              v-model="value.License_Time"
              cdcName="LicenseTime"
              :columns="licenseTimeColumns"
              :m="m"
              min-height="200px"
              fit
              :pageSize="20"
              paginate
            />
          </template>
        </safa-splitter>
      </template>

      <template v-slot:after>
        <fit>
          <safa-grid
            title="مشخصات عملیات حفاری"
            v-model="value.License_Operation"
            cdcName="LicenseOperation"
            :columns="licenseOperationColumns"
            :m="m"
            min-height="200px"
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
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      splitterModel: 50,
      splitterModel2: 50,
      licensePersonColumns: [
        { title: "نوع شرکت", field: "CompanyType", width: "150px" },
        { title: "نام شرکت", field: "CompanyName", width: "150px" },
        { title: "نام و نام خانوادگی", field: "PersonName", width: "150px" },
        { title: "تلفن همراه", field: "PersonTel", width: "150px" },
        { title: "نمابر", field: "PersonFax", width: "150px" },
        { title: "توضیحات", field: "Description", width: "150px" }
      ],
      licenseTimeColumns: [
        { title: "فاز", field: "Phase", width: "150px" },
        {
          title: "تاریخ شروع",
          field: "StartDate",
          editor: "date",
          width: "150px"
        },
        {
          title: "تاریخ اتمام",
          field: "EndDate",
          editor: "date",
          width: "150px"
        },
        { title: "مدت (روز)", field: "Duration", width: "150px" },
        { title: "توضیحات", field: "Description", width: "300px" }
      ],
      licenseOperationColumns: [
        { title: "نوع حفاری", field: "Phase", width: "150px" },
        {
          title: "نوع حفاری",
          field: "CI_DigType",
          width: "150px",
          editor: "combo",
          domain: "Dig"
        },
        { title: "جنس روسازی معبر", field: "MaterialsType", width: "150px" },
        { title: "محل حفاری", field: "PathType", width: "150px" },
        { title: "خاک برداری", field: "Diggings", width: "150px" },
        { title: "طول ", field: "Length", width: "120px" },
        { title: "عرض", field: "Width", width: "120px" },
        { title: "عمق ", field: "Depth", width: "120px" },
        { title: "عمر آسفالت", field: "AsphaltLife", width: "120px" },
        { title: "ضریب کیفیت آسفالت", field: "AsphaltQuality", width: "120px" },
        {
          title: "ضخامت آسفالت روکش",
          field: "AsphaltThickness",
          width: "120px"
        },
        { title: "طول معبر", field: "CrossLength", width: "120px" },
        { title: "طول مازاد حفاری", field: "DigLenghtExcess", width: "120px" },
        {
          title: "عرض مازاد ترانشه",
          field: "TrenchesWidthExcess",
          width: "120px"
        },
        {
          title: "ضریب تکرار حفاری",
          field: "RepeatDigCoefficient",
          width: "120px"
        },
        { title: "عرض معبر ", field: "CavalryWidth", width: "120px" }
      ]
    }
  }
}
</script>
