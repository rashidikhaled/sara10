<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-custom-text
          label="مساحت وضع موجود"
          label-width="80px"
          :m="m"
          v-model="Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          type="decimal"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع ملک"
          label-width="80px"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_HouseType"
          cdcName="CI_HouseType"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اثر"
          label-width="80px"
          :m="m"
          v-model="value.Base_HouseInfo.ActDate"
          cdcName="ActDate"
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
    />
  </fit>
</template>

<script>
export default {
  name: "TabAddress",

  props: {
    m: String,
    value: {
      type: Object
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
