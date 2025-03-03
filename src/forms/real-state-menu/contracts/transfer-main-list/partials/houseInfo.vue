<template>
    <fit>
      <safa-splitter v-model="spModel" vertical fit>
        <template v-slot:before>
          <fit>
            <safa-grid
              v-model="value.SysCI_TransferMainType"
              helper="agSysCI_TransferMainTypeColumn"
              fit
              cdcName="SysCI_TransferMainType"
              :m="m"
              class="q-mb-sm"
            />
          </fit>
        </template>
        <template #after>
          <fit>
            <safa-grid
              title=""
              v-model="value.TransferMain_Person_2"
              helper="agtransferMainColumnPerson2HouseTab"
              fit
              cdcName="TransferDoc_Person_2"
              :m="m"
              class="q-mb-sm"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: "r"
    }
  },
  data () {
    return {
      name: "houseInfo",
      spModel: 50

      // SysCI_TransferMainType: [],
      // agSysCI_TransferMainTypeColumn: [
      //   {
      //     title: "کدنوسازی",
      //     field: "nosaziCode"
      //   },
      //   {
      //     title: "محل دقیق وقوع ملک",
      //     field: "exactLocate"
      //   },
      //   {
      //     title: "تعداد واحد مسکونی",
      //     field: "residentialUnitsNumbers"
      //   },
      //   {
      //     title: "تعداد واحد اداری",
      //     field: "officialUnitsNumbers"
      //   },
      //   {
      //     title: "تعداد واحد تجاری",
      //     field: "commercialUnitsNumbers"
      //   },
      //   {
      //     title: "تعداد پارکینگ",
      //     field: "parkingsNumber"
      //   },
      //   {
      //     title: "متراژ اعیان",
      //     field: "metrajAyan"
      //   },
      //   {
      //     title: "متراژ عرصه",
      //     field: "metrajArse"
      //   },
      //   {
      //     title: "مساحت درمسیر اعیان",
      //     field: "ayanArea"
      //   },
      //   {
      //     title: "مساحت درمسیر عرصه",
      //     field: "arseArea"
      //   }
      // ],

      // TransferMain_Person_2: [],
      // agtransferMainColumnPerson2HouseTab: [
      //   {
      //     title: "سایر توضیحات",
      //     field: "CI_Question",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "کاربری",
      //     field: "CI_UsingGroup",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "مشخصات پلاک ثبتی",
      //     field: "pelakInfo"
      //   },
      //   {
      //     title: "شماره گواهی",
      //     field: "certificationNum"
      //   },
      //   {
      //     title: "نوع گواهی",
      //     field: "certificationType"
      //   },
      //   {
      //     title: "تاریخ گواهی",
      //     field: "certificationDate"
      //   },
      //   {
      //     title: "شماره سند عرصه",
      //     field: "arseNum"
      //   },
      //   {
      //     title: "نوع سند عرصه",
      //     field: "arseType"
      //   },
      //   {
      //     title: "وضعیت سند",
      //     field: "arseStatus"
      //   }
      // ]
    }
  }
}
</script>
