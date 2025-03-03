<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-custom-text
          label="مساحت وضع موجود"
          :m="m"
          v-model="Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          label-width="100px"
          type="decimal"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع ملک"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_HouseType"
          cdcName="CI_HouseType"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اثر"
          :m="m"
          v-model="value.Base_HouseInfo.ActDate"
          cdcName="ActDate"
          label-width="85px"
        />
      </FormControl>
    </FormRow>
    <safa-grid
      helper="baseEdge"
      title="جهات اربعه"
      :m="m"
      v-model="value.Base_Edge"
      cdcName="Base_Edge"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
    />
  </fit>
</template>

<script>
export default {
  name: "TabAddress",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    Base_AddressInfo () {
      return this.value.Base_AddressInfo || {}
    },
    Base_CommonEstate () {
      return this.value.Base_CommonEstate || {}
    },
    Base_HouseInfo () {
      return this.value.Base_HouseInfo || {}
    }
  }
}
</script>
