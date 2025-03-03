<template>
  <fit>
    <div class="row q-col-gutter-sm q-mb-sm">
      <form-control>
        <safa-combo
          label="محل وقوع ساختمان"
          label-width="110px"
          ciName="CI_BuildingPosition"
          domainName="Estate"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          :m="m"
        />
      </form-control>

      <form-control>
        <safa-text
          label="قدمت ساختمان بعد از"
          label-width="110px"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          :m="m"
        />
      </form-control>

      <form-control>
        <safa-text
          label="قدمت ساختمان قبل از"
          label-width="110px"
          v-model="value.Base_BuildingInfo.CreateYearTo"
          :m="m"
        />
      </form-control>
    </div>

    <div class="row q-col-gutter-sm q-mb-sm">
      <form-control>
        <safa-text
          label="مساحت کل زیربنا "
          label-width="110px"
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          :m="m"
        />
      </form-control>

      <form-control>
        <safa-text
          label=" کد پستی"
          label-width="110px"
          v-model="value.Base_BuildingInfo.PostCode"
          :m="m"
        />
      </form-control>

      <form-control>
        <safa-text
          label=" کد اقتصادی"
          label-width="110px"
          v-model="value.Base_BuildingInfo.EconomicCode"
          :m="m"
        />
      </form-control>
    </div>
    <div>
      <text-template
        label="توضیحات"
        v-model="value.Base_CommonEstate.Comments"
        :rows="5"
        cdcName="Description"
        :m="m"
      />
    </div>
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
      name: "buildingSpecifications"
    }
  }
}
</script>
