<template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            v-model="value.ClsRenewal_Request.Request_Info.CI_DigDelayTime"
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
            v-model="value.ClsRenewal_Request.Request_Info.CI_SplitType"
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
            v-model="value.ClsRenewal_Request.Request_Info.LetterNo"
            cdcName="LetterNo"
            label="شماره نامه"
            label-width="90px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.ClsRenewal_Request.Request_Info.LetterDate"
            cdcName="LetterDate"
            label="تاریخ نامه"
            label-width="90px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ClsRenewal_Request.Request_Info.RequesterRegion"
            cdcName="RegionPrice"
            label="قیمت منطقه ای"
            label-width="90px"
            :m="m"
          />
        </FormControl>
        <div class="row">
          <safa-checkbox
            v-model="value.ClsRenewal_Request.Request_Info.ConfilictWithOther"
            :m="m"
            label="تداخل با سایر طرح ها"
            cdcName="ConfilictWithOther"
          />
        </div>
      </FormRow>
      <safa-splitter v-model="horizontalSplitterModel" horizontal>
    <template v-slot:before>
      <fit>

        <safa-grid
                v-model="value.ClsRenewal_Request.Request_Operations"
                cdcName="Request_Operations"
                title="مشخصات عملیات حفاری"
                :columns="requestOperationsColumns"
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
        <safa-splitter v-model="verticalSplitterModel" vertical>
          <template v-slot:before>
            <fit>
              <safa-grid
                v-model="value.ClsRenewal_Request.Request_TimeMojavez"
                cdcName="Request_TimeMojavez"
                title="مدت و زمان اجرای عملیات حفاری (مجوز)"
                :columns="requestTimeMojavezColumns"
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
                v-model="value.Request_Time"
                cdcName="Request_Time"
                title="مدت و زمان اجرای عملیات حفاری (تمدید)"
                :columns="requestTimeColumns"
                :suppressRowClickSelection="false"
                :deleteRow="true"
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
      model: "",
      exState1: true,
      horizontalSplitterModel: 50,
      verticalSplitterModel: 50,
      drillingLicense: [],
      drillingOperations: [],
      requestTimeMojavezColumns: [
        // {
        //   field: "CI_Phase",
        //   title: "فاز",
        //   width: "160px",
        //   editor: "combo",
        //   domain: "Dig"
        // },
        {
          field: "StartDate",
          title: "تاریخ شروع",
          editor: "date",
          width: "100px"
        },
        {
          field: "EndDate",
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
      requestTimeColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: "120px",
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
          field: "Duration",
          title: "مدت (روز)",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "150px"
        }
      ],
      requestOperationsColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_Section",
          title: "مقطع",
          editor: "combo",
          domain: "Dig",
          width: "160px"
        },
        {
          field: "CI_DigType",
          title: "نوع حفاری",
          editor: "combo",
          domain: "Dig",
          width: "160px"
        },
        {
          field: "CI_MaterialsType",
          title: "جنس روسازی معبر",
          editor: "combo",
          domain: "Dig",
          width: "160px"
        },
        {
          field: "CI_PathType",
          title: "محل حفاری",
          editor: "combo",
          domain: "Dig",
          width: "160px"
        },
        {
          field: "CI_Diggings",
          title: "خاک برداری",
          editor: "combo",
          domain: "Dig",
          width: "160px"
        },
        {
          field: "Length",
          title: "طول",
          width: "120px"
        },
        {
          field: "Width",
          title: "عرض",
          width: "120px"
        },
        {
          field: "Depth",
          title: "عمق",
          width: "120px"
        },
        {
          field: "AsphaltLife",
          title: "عمر آسفالت",
          width: "160px"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          editor: "combo",
          domain: "Dig",
          width: "160px"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "160px"
        },
        {
          field: "CI_CrossType",
          editor: "combo",
          domain: "Dig",
          title: "نوع معبر",
          width: "160px"
        },
        {
          field: "CrossLength",
          title: "طول معبر",
          width: "160px"
        },
        {
          field: "DigLenghtExcess",
          title: "طول مازاد حفاری",
          width: "160px"
        },
        {
          field: "TrenchesWidthExcess",
          title: "عرض مازاد ترانشه",
          width: "160px"
        },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکرار حفاری",
          editor: "combo",
          domain: "Dig",
          width: "160px"
        },
        {
          field: "CavalryWidth",
          title: "عرض محل حفاری ",
          width: "160px"
        },
        { field: "Description", title: "توضیحات", width: "auto" }
      ]
    }
  }
}
</script>
