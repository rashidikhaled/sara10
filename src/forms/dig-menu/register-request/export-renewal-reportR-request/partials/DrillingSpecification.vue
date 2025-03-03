<template>
  <fit>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-combo
          v-model="model2.Delivery.Request_Info.CI_DigDelayTime"
          cdcName="CI_DigDelayTime"
          ciName="CI_DigDelayTime"
          domain-name="Dig"
          label="مدت تاخیر حفاری"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="model2.Delivery.Request_Info.CI_SplitType"
          cdcName="CI_SplitType"
          ciName="CI_SplitType"
          domain-name="Dig"
          label="نوع انشعاب"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model2.Delivery.Request_Info.LetterNo"
          cdcName="LetterNo"
          label="شماره نامه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="model2.Delivery.Request_Info.LetterDate"
          cdcName="LetterDate"
          label="تاریخ نامه"
          label-width="80px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="model2.Delivery.Request_Info.ConfilictWithOther"
          cdcName="ConfilictWithOther"
          label="تداخل با سایر طرح ها"
          label-width="80px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="splitterValue" class="fit" horizontal margin="0">
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="verticalsplitterValue"
            class="fit"
            vertical
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-grid
                  title="مدت و زمان اجرای عملیات حفاری (مجوز)"
                  v-model="value.ClsRenewal_Request.Request_TimeMojavez"
                  :columns="PermistionDrillingtimeColumns"
                  :show-selected-checkbox="true"
                  :allowMultipleSelection="false"
                  :addRow="false"
                  :deleteRow="false"
                  :allowCopy="false"
                  fit
                  paginate
                  cdcName="Request_TimeMojavez"
                  m="r"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  title="مدت و زمان اجرای عملیات حفاری (تمدید)"
                  v-model="value.ClsRenewal_Request.Request_Time"
                  :columns="RenewalDrillingtimeColumns"
                  :show-selected-checkbox="true"
                  :allowMultipleSelection="false"
                  :addRow="false"
                  :deleteRow="false"
                  :allowCopy="false"
                  fit
                  paginate
                  cdcName="Request_Time"
                  :m="m"
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
            v-model="value.ClsRenewal_Request.Request_Operations"
            :columns="ExecutiveSpecificationColumns"
            :show-selected-checkbox="true"
            :allowMultipleSelection="false"
            :addRow="true"
            :deleteRow="false"
            :allowCopy="false"
            fit
            paginate
            cdcName="Request_Operations"
            :m="m"
          /> </fit
      ></template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    model2: Object,
    value: Object
  },
  components: {},
  data () {
    return {
      PermistionDrillingtimeColumns: [
        {
          field: "StartDate",
          title: "تاریخ شروع",
          width: "100px",
          editor: "date"
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          width: "100px",
          editor: "date"
        },
        {
          field: "Duration",
          title: "مدت(روز)",
          width: "100px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px"
        }
      ],
      RenewalDrillingtimeColumns: [
        {
          field: "",
          title: "نوبت تمدید",
          width: "100px",
          isEditable: false
        },
        {
          field: "StartDate",
          title: "تاریخ شروع",
          width: "100px",
          editor: "date",
          isEditable: false
        },
        {
          field: "EndDate",
          title: "تاریخ اتمام",
          width: "100px",
          editor: "date"
        },
        {
          field: "CI_CauseRenewal",
          title: "علت تمدید",
          width: "100px",
          editor: "combo",
          domain: "Dig",
          isEditable: false
        },
        {
          field: "Duration",
          title: "مدت(روز)",
          width: "100px",
          isEditable: false
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "100px",
          isEditable: false
        }
      ],
      ExecutiveSpecificationColumns: [
        {
          field: "CI_Phase",
          title: "فاز",
          width: "100px",
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
          width: "100px",
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
          width: "100px"
        },
        {
          field: "Width",
          title: "عرض",
          width: "100px"
        },
        {
          field: "Depth",
          title: "عمق",
          width: "100px"
        },
        {
          field: "AsphaltLife",
          title: "عمر آسفالت",
          width: "100px"
        },
        {
          field: "CI_AsphaltQuality",
          title: "کیفیت آسفالت",
          width: "100px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "AsphaltThickness",
          title: "ضخامت آسفالت روکش",
          width: "100px"
        },
        {
          field: "CI_CrossType",
          title: "نوع معبر",
          width: "200px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "DigLenghtExcess",
          title: "طول مازاد حفاری",
          width: "100px"
        },
        {
          field: "TrenchesWidthExcess",
          title: "عرضه مازاد ترانشه",
          width: "100px"
        },
        {
          field: "CI_DigRepeat",
          title: "ضریب تکراری حفاری",
          width: "100px",
          editor: "combo",
          domain: "Dig"
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
      ],
      ExecutiveSpecificationList: [],
      splitterValue: 50,
      verticalsplitterValue: 50
    }
  },
  methods: {}
}
</script>
