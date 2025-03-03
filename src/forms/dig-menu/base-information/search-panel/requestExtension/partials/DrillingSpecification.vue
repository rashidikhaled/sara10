<template>
  <fit>
      <FormRow class="q-my-sm">
        <FormControl>
          <safa-combo
            v-model="model.cIDigDelayTime"
            cdcName="CI_DigDelayTime"
            ciName="CI_DigDelayTime"
            domain-name="Dig"
            label="مدت تاخیر حفاری"
            label-width="90px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="model.cISplitType"
            cdcName="CI_SplitType"
            ciName="CI_SplitType"
            domain-name="Dig"
            label="نوع انشعاب"
            label-width="90px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.letterNo"
            cdcName="LetterNo"
            label="شماره نامه"
            label-width="90px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="model.letterDate"
            cdcName="LetterDate"
            label="تاریخ نامه"
            label-width="90px"
            m="r"
          />
        </FormControl>
        <div class="row">
          <safa-checkbox
            v-model="model.confilictWithOther"
            m="r"
            label="تداخل با سایر طرح ها"
            cdcName="ConfilictWithOther"
          />
        </div>
      </FormRow>
    <fit>
      <safa-splitter v-model="spliterModel" horizontal fit class="">
        <template #before>
          <fit>
            <safa-splitter v-model="spliterModel" fit class="q-mt-sm">
              <template #before>
                <fit>
                  <safa-grid
                    v-model="model.requestTimeMojavez"
                    cdcName="drillingLicense"
                    title="مدت و زمان اجرای عملیات حفاری (مجوز)"
                    :columns="drillingLicenseColumns"
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
                    v-model="model.requestTime"
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
              v-model="model.requestOperations"
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
      model: {
        cIDigDelayTime: this.value?.ClsRenewal_Request?.Request_Info?.CI_DigDelayTime || "",
        cISplitType: this.value?.ClsRenewal_Request?.Request_Info?.CI_SplitType || "",
        letterNo: this.value?.ClsRenewal_Request?.Request_Info?.LetterNo || "",
        letterDate: this.value?.ClsRenewal_Request?.Request_Info?.LetterDate || "",
        confilictWithOther: this.value?.ClsRenewal_Request?.Request_Info?.ConfilictWithOther || false,
        requestTimeMojavez: this.value?.ClsRenewal_Request?.Request_TimeMojavez || Array.isArray(this.value?.ClsRenewal_Request?.Request_TimeMojavez) ? this.value?.ClsRenewal_Request?.Request_TimeMojavez : [],
        requestTime: this.value?.ClsRenewal_Request?.Request_Time || [],
        requestOperations: this.value?.ClsRenewal_Request?.Request_Operations || []

      },
      spliterModel: 50,
      drillingLicenseColumns: [
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
      drillingExtensionColumns: [
        {
          field: "TimeRenew",
          title: "نوبت تمدید",
          width: "100px"
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
          field: "CI_CauseRenewal",
          title: "علت تمدید",
          width: "100px",
          editor: "combo",
          domain: "Dig"
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
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          width: "130px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "170px"
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
          title: "عرض مازاد حفاری",
          width: "150px"
        },
        {
          field: "CavalryWidth",
          title: "عرض معبر",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ]
    }
  }
}
</script>
