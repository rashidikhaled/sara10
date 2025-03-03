<template>
  <fit>
    <fit>
      <safa-splitter v-model="splitterModel" horizontal class="fit" margin="0">
        <template v-slot:before>
          <safa-splitter
            vertical
            class="fit"
            margin="0"
            v-model="splitterModel"
          >
            <template v-slot:before>
              <fit>

                <safa-grid
                  title="مشخصات پیمانکار و ناظرین "
                  :columns="licensePersonColumns"
                  v-model="value.ClsLicense.License_Person"
                  cdcName="License_Person"
                  fit
                  max-height="100%"
                  height="100%"
                  minHeight="100%"
                  m="r"
                />

              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  title="مدت و زمان اجرای عملیات حفاری "
                  v-model="value.ClsLicense.License_Time"
                  cdcName="License_Time"
                  :columns="licenseTimeColumns"
                  fit
                  max-height="100%"
                  height="100%"
                  minHeight="100%"
                  m="r"
                />

              </fit>
            </template>
          </safa-splitter>
        </template>
        <template v-slot:after>
          <safa-splitter
            v-model="splitterModel"
            vertical
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-grid
                  title="تمدید مجوز"
                  v-model="value.ClsLicense.RenewalRequestService_Time"
                  cdcName="RenewalRequestService_Time"
                  :columns="renewalRequestServiceTimeColumns"
                  fit
                  max-height="100%"
                  height="100%"
                  minHeight="100%"
                  m="r"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
          <safa-grid
            title="مشخصات عملیات حفاری"
            v-model="value.ClsLicense.License_Operation"
            cdcName="License_Operation"
            :columns="licenseOperationColumns"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            m="r"
          />
        </fit>
            </template>
          </safa-splitter>
        </template>
      </safa-splitter>
    </fit>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object
  },

  data () {
    return {
      splitterModel: 50,
      licensePersonColumns: [
        { title: "نوع شرکت", field: "CompanyType" },
        { title: "نام شرکت", field: "CompanyName" },
        { title: "نام و نام خانوادگی", field: "PersonName" },
        { title: "تلفن همراه", field: "PersonTel" },
        { title: "نمابر", field: "PersonFax" },
        { title: "توضیحات", field: "Description" }
      ],
      licenseTimeColumns: [
        { title: "فاز", field: "Phase" },
        { title: "تاریخ شروع", field: "StartDate" },
        { title: "تاریخ اتمام", field: "EndDate" },
        { title: "مدت (روز)", field: "Duration" },
        { title: "توضیحات", field: "Description" }
      ],
      renewalRequestServiceTimeColumns: [
        { title: "فاز", field: "CI_Phase" },
        { title: "تاریخ شروع", field: "StartDateExtension" },
        { title: "تاریخ اتمام", field: "EndDateExtension" },
        { title: "مدت (روز)", field: "Duration" },
        { title: "توضیحات", field: "Description" }
      ],
      licenseOperationColumns: [
        { title: "فاز", field: "Phase" },
        { title: "نوع حفاری", field: "CI_DigType" },
        { title: "جنس روسازی معبر", field: "MaterialsType" },
        { title: "محل حفاری", field: "PathType" },
        { title: "خاک برداری", field: "Diggings" },
        { title: "طول", field: "Length" },
        { title: "عرض", field: "Width" },
        { title: "عمق", field: "Depth" },
        { title: "عمر آسفالت", field: "AsphaltLife" },
        { title: "ضریب کیفیت آسفالت", field: "AsphaltQuality" },
        { title: "ضخامت آسفالت روکش", field: "AsphaltThickness" },
        { title: "طول معبر", field: "CrossLength" },
        { title: "طول مازاد حفاری", field: "DigLenghtExcess" },
        { title: "عرض مازاد ترانشه", field: "TrenchesWidthExcess" },
        { title: "ضریب تکرار حفاری", field: "RepeatDigCoefficient" },
        { title: "عرض معبر", field: "CavalryWidth" }
      ]
    }
  }
}
</script>
