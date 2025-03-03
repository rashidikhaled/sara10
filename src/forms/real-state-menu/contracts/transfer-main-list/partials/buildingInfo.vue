<template>
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
                  title="مشخصات تحویل دهنده"
                  v-model="value.TransferMain_Other03"
                  helper="agTransferMain_Other03Columns"
                  fit
                  cdcName="TransferMain_Other03"
                  :m="m"
                  class="q-mb-sm"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  title="مشخصات تحویل گیرنده"
                  v-model="value.TransferMain_Other04"
                  helper="agTransferMain_Other04Columns"
                  fit
                  cdcName="TransferMain_Other04"
                  :m="m"
                  class="q-mb-sm"
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
                  title="مشخصات تحویل گیرنده"
                  v-model="value.TransferMain_Other05"
                  helper="agTransferMain_Other05Columns"
                  fit
                  cdcName="TransferMain_Other05"
                  :m="m"
                  class="q-mb-sm"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  title="مشخصات تحویل گیرنده"
                  v-model="value.TransferMain_Other06"
                  helper="agTransferMain_Other06Columns"
                  fit
                  cdcName="TransferMain_Other06"
                  :m="m"
                  class="q-mb-sm"
                />
              </fit>
            </template>
          </safa-splitter>
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
      name: "buildingInfo",
      splitterModel: 50

      // value: {
      //   TransferMain_Other03: [],
      //   TransferMain_Other04: [],
      //   TransferMain_Other05: [],
      //   TransferMain_Other06: []
      // },
      // agTransferMain_Other03Columns: [
      //   {
      //     title: "نوع سیستم سرمایش",
      //     field: "CI_CoolingType",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "نوع سیستم گرمایش",
      //     field: "CI_HeatingType",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "رادیاتور",
      //     field: "CI_Questionc01",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "سیستم اطفا حریق",
      //     field: "CI_Questionc02",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "سیستم روشنایی",
      //     field: "CI_Questionc03",
      //     domain: "Estate",
      //     editor: "combo"
      //   }
      // ],
      // agTransferMain_Other04Columns: [
      //   {
      //     title: "آسانسور",
      //     field: "CI_Questiond01",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "پله اضطراری",
      //     field: "CI_Questiond02",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "کابینت",
      //     field: "CI_CabinType",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "جاروبرقی مرکزی",
      //     field: "CI_Questiond03",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "استخر",
      //     field: "CI_Questiond04",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "سونا",
      //     field: "CI_Questiond05",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "حموم",
      //     field: "CI_Questionc06",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "جکوزی",
      //     field: "CI_Questionc07",
      //     domain: "Estate",
      //     editor: "combo"
      //   }
      // ],
      // agTransferMain_Other05Columns: [
      //   {
      //     title: "درب اتوماتیک",
      //     field: "CI_Question",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "آیفون",
      //     field: "CI_IphoneType",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "شومینه",
      //     field: "CI_Question",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "شیرآلات",
      //     field: "CI_Question",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "تهویه سرویس ها",
      //     field: "CI_Question",
      //     domain: "Estate",
      //     editor: "combo"
      //   }
      // ],
      // agTransferMain_Other06Columns: [
      //   {
      //     title: "نوع پوشش کف",
      //     field: "CI_FloorCoveringType",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "فلاش تانک",
      //     field: "CI_Question",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "هود",
      //     field: "CI_Question",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "پرده",
      //     field: "CI_Question",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "شماره اشتراکات برق عمومی",
      //     field: "sharedNum"
      //   }
      // ]
    }
  }
}
</script>
