<template>
  <div class="q-ma-sm" >
    <div class="row items-center">
      <EngineerInfoBox
        class="col-md-12"
        label="کد عضویت مدیر"
        labelWidth="80px"
        v-model="value.EngOrgan_OfficeInfo.IdentityCodeCEO"
        @fetched="fetched"
      />
    </div>
    <q-separator class="q-my-sm" />
    <FormRow>
      <FormControl>
        <safa-text
          label="کد دفتر"
          label-width="80px"
          v-model="value.EngOrgan_OfficeInfo.OfficeCode"
          :m="m"
          cdcName="OfficeCode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام دفتر"
          label-width="80px"
          v-model="value.EngOrgan_OfficeInfo.OfficeName"
          :m="m"
          cdcName="OfficeName"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ثبت"
          label-width="80px"
          v-model="value.EngOrgan_OfficeInfo.RegisterDate"
          :m="m"
          cdcName="RegisterDate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن"
          label-width="80px"
          v-model="value.EngOrgan_OfficeInfo.OfficePhone"
          :m="m"
          cdcName="OfficePhone"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="فکس"
          label-width="80px"
          v-model="value.EngOrgan_OfficeInfo.OfficeFax"
          :m="m"
          cdcName="OfficeFax"
        />
      </FormControl>
      <text-template
        class="col-12"
        label="آدرس"
        label-width="80px"
        v-model="value.EngOrgan_OfficeInfo.OfficeAddress"
        :m="m"
        cdcName="OfficeAddress"
      />
    </FormRow>
    <div class="fit">
    <safa-datatable
      title="شهر"
      helper="cities"
      v-model="value.EngOrgan_OfficeCity"
      fit
      height="100%"
      max-height="100%"
      :allowMultipleSelection="false"
      :m="m"
      class="q-mt-sm"
      cdcName="EngOrgan_OfficeCity"
    />
  </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "OrganOffices"
    }
  },
  methods: {
    fetched (val) {
      // this.value.EngOrgan_OfficeInfo.IdentityCodeCEO = val.IdentityCode
      this.value.EngOrgan_OfficeInfo.NidEngCEO = val.NIdEng
      this.value.EngOrgan_OfficeInfo.OfficeCode = val.OfficeCode
      this.value.EngOrgan_OfficeInfo.OfficeName = val.Office_Name
    }
  }
}
</script>

<style>
</style>
