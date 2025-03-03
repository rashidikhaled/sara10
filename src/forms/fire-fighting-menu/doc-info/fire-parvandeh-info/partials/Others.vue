<template>
  <fit>
    <!-- <safa-status :result="result" /> -->
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
                  title="تامین پارکینگ"
                  :columns="baseSupplyParking_Fire"
                  :m="m"
                  fit
                  height="100%"
                  max-height="100%"
                  :bordered="false"
                  v-model="value.Base_SupplyParking"
                  cdcName="Base_SupplyParking"
                  :suppressRowClickSelection="false"
                  :insertNewRowBefore="false"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  :m="m"
                  title="تأسیسات"
                  fit
                  height="100%"
                  max-height="100%"
                  :columns="Tasisat"
                  :bordered="false"
                  v-model="value.Base_Gap"
                  cdcName="Base_Gap"
                  :suppressRowClickSelection="false"
                  :insertNewRowBefore="false"
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
                  title="تأسیسات"
                  :m="m"
                  fit
                  height="100%"
                  max-height="100%"
                  :columns="baseInstallation"
                  v-model="value.Base_Installation"
                  cdcName="Base_Installation"
                  :suppressRowClickSelection="false"
                  :insertNewRowBefore="false"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  :m="m"
                  title="سایر امکانات"
                  fit
                  height="100%"
                  max-height="100%"
                  :paginate="false"
                  helper="otherEquipment_Fire"
                  v-model="value.Base_OtherEquipment"
                  cdcName="Base_OtherEquipment"
                  :suppressRowClickSelection="false"
                  :insertNewRowBefore="false"
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
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "Others",
  mixins: [baseFormMixin],

  data () {
    return {
      splitterModel: 50,
      // helper="baseSupplyParking_Fire"
      baseSupplyParking_Fire: [
        {
          field: "FloorNo",
          title: "طبقه",
          editor: "numeric",
          width: "70px"
        },
        {
          field: "CI_SupplyParkingType",
          title: "نوع تامين پارکينگ",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "130px"
        },
        {
          field: "CI_SupplyParkingHow",
          title: "نحوه تامين پارکينگ",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "135px"
        },
        {
          field: "DoorCount",
          title: "تعداد",
          editor: "numeric",
          width: "70px"
        },
        {
          field: "CI_OwnerParkingType",
          title: "نوع مالکیت پارکینگ",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "140px"
        },
        {
          field: "Area",
          title: "مساحت",
          editor: "decimal",
          width: "80px"
        }
      ],
      Tasisat: [
        {
          field: "CI_SideCode",
          editor: "combo",
          domain: "CI_SaraM1",
          title: "جهت ",
          width: "150px"
        },
        {
          field: "BarLen",
          editor: "decimal",
          title: " طول بر "
        },
        {
          field: "SpanArea",
          editor: "decimal",
          title: "مساحت حریم  "
        },
        {
          field: "SpanDepth",
          editor: "decimal",
          title: " عمق حریم  "
        },
        {
          field: "GapWidth",
          editor: "decimal",
          title: "عرض دهنه  "
        }
      ],
      baseInstallation: [
        {
          field: "CI_InstallationType",
          title: "نوع تاسیسات",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "160px"
        },
        {
          field: "InstallationValue",
          title: "مقدار",
          editor: "numeric",
          width: "160px"
        }
      ]
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
