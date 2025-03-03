<template>
  <fit>
    <div class="row q-col-gutter-sm q-mb-sm">
      <form-control>
        <safa-combo
          label="محدوده"
          label-width="100px"
          ciName="CI_Region"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_BoundCode"
          :m="m"
        />
      </form-control>

      <form-control>
        <safa-combo
          label=" وضعیت خاص"
          label-width="100px"
          ciName="CI_SpecialStatus"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_SpecialStatus"
          :m="m"
        />
      </form-control>

      <form-control>
        <safa-text
          label="جمعیت"
          v-model="getHouseResult.Base_CommonEstate.Populations"
          label-width="100px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="نوع حصار"
          label-width="100px"
          ciName="CI_IncloseType"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_IncloseType"
          :m="m"
        />
      </form-control>

      <form-control>
        <safa-combo
          label="نوع ملک"
          label-width="100px"
          ciName="CI_HouseType"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_HouseType"
          :m="m"
        />
      </form-control>

      <form-control>
        <safa-combo
          label="مرجع صدور سند"
          label-width="100px"
          ciName="CI_DocRefrence"
          domainName="Estate"
          v-model="getHouseResult.Base_HouseInfo.CI_DocRefrence"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="شماره قطعه"
          v-model="getHouseResult.Base_HouseInfo.PieceNo"
          label-width="100px"
          :m="m"
        />
      </form-control>
    </div>
    <safa-grid
      title="شماره سند ملک"
      fit
      min-height="100px"
      height="100%"
      max-height="100%"
      v-model="getHouseResult.Base_HouseDoc"
      helper="melkDocumentNumberColumns"
      :m="m"
      pagination
      :addRow="true"
    />
  </fit>
</template>

<script>
export default {
  props: {
    getHouseResult: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  }
}
</script>
