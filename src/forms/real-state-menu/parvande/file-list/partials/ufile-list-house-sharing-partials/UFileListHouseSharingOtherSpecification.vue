<template>
  <fit>
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-text
          label="شماره سند عرصه"
          label-width="90px"
          v-model="value.Base_HouseInfo.ArsehDocNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره سند اعیان"
          label-width="90px"
          v-model="value.Base_HouseInfo.AyanDocNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره قطعه"
          label-width="90px"
          v-model="value.Base_HouseInfo.PieceNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="محدوده"
          label-width="90px"
          v-model="value.Base_HouseInfo.CI_BoundCode"
          :m="m"
          ciName="CI_BoundCode"
          domainName="Estate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت خاص"
          label-width="90px"
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
          :m="m"
          ciName="CI_SpecialStatus"
          domainName="Estate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="جمعیت"
          label-width="90px"
          v-model="value.Base_HouseInfo.Populations"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع حصار"
          label-width="90px"
          v-model="value.Base_HouseInfo.CI_IncloseType"
          :m="m"
          ciName="CI_IncloseType"
          domainName="Estate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع ملک"
          label-width="90px"
          v-model="value.Base_HouseInfo.CI_HouseType"
          :m="m"
          ciName="CI_HouseType"
          domainName="Estate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="مرجع صدور سند"
          label-width="90px"
          v-model="value.Base_HouseInfo.CI_DocRefrence"
          :m="m"
          ciName="CI_DocRefrence"
          domainName="Estate"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="splitterValueHorizontal" horizontal>
      <template v-slot:before>
        <fit>
          <safa-splitter v-model="splitterValueVerticalTop">
            <template v-slot:before>
                <safa-grid
                  title="عقب نشینی ها"
                  v-model="value.Base_Scuttle"
                  :columns="baseScuttleColumn"
                  fit
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
            </template>
            <template v-slot:after>
                <safa-grid
                  title="مجاورین"
                  v-model="value.Base_Neighbor"
                  :columns="neighborColumn"
                  fit
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter v-model="splitterValueVerticalBottom">
            <template v-slot:before>
                <safa-grid
                  title="فضای سبز "
                  v-model="value.Base_GreenSpace"
                  :columns="greenSpaceColumn"
                  fit
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
            </template>
            <template v-slot:after>
                <safa-grid
                  title="دیوارها "
                  v-model="value.Base_Wall"
                  :columns="wallsColumn"
                  fit
                  min-height="150px"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
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
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      splitterValueHorizontal: 50,
      splitterValueVertical: 50,
      splitterValueVerticalTop: 50,
      splitterValueVerticalBottom: 50,
      baseScuttleColumn: [
        {
          field: "CI_Scuttle",
          editor: "combo",
          domain: "Estate",
          title: "عقب نشینی",
          width: ""
        },
        { field: "ScuttleValue", title: "مقدار", width: "" }
      ],
      neighborColumn: [
        {
          field: "CI_NeighborType",
          editor: "combo",
          domain: "Estate",
          title: "نوع",
          width: ""
        },
        {
          field: "CI_SideCode",
          editor: "combo",
          domain: "Estate",
          title: "سمت",
          width: ""
        },
        { field: "NeighborValue", title: "مقدار", width: "" }
      ],
      greenSpaceColumn: [
        {
          field: "CI_GreenSpaceType",
          editor: "combo",
          domain: "Estate",
          title: "نوع فضای سبز",
          width: ""
        },
        { field: "GreenSpaceValue", title: "مقدار", width: "" }
      ],

      wallsColumn: [
        {
          field: "CI_SideCode",
          editor: "combo",
          domain: "Estate",
          title: "جهت معبر",
          width: ""
        },
        {
          field: "CI_WallType",
          editor: "combo",
          domain: "Estate",
          title: "جنس دیوار",
          width: ""
        },
        {
          field: "CI_ViewCode",
          editor: "combo",
          domain: "Estate",
          title: "نوع نما",
          width: ""
        },
        { field: "Length", title: "طول", width: "" },
        { field: "Height", title: "ارتفاع", width: "" },
        { field: "CreateYear", title: "سال ساخت", width: "" }
      ]
    }
  }
}
</script>
