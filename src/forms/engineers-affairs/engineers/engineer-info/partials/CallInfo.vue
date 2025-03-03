<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.Email"
          cdcName="Email"
          :m="m"
          label="آدرس پست الکترونیکی"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.Tel"
          cdcName="Tel"
          :m="m"
          label="تلفن منزل"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.MobileNo"
          cdcName="MobileNo"
          :m="m"
          required
          validations="required"
          label="تلفن همراه"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.PostalCode"
          cdcName="PostalCode"
          :m="m"
          label="کد پستی"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="model.ClsEngineer.Eng_Info.CI_Region"
          cdcName="CI_Region"
          ciName="CI_Region"
          domainName="engineer"
          :m="m"
          input-debounce="0"
          label="منطقه شهرداری محل کار"
          label-width="100px"
        />
      </FormControl>
      <!-- :options="jobPlaceRegionDataSource"
        :option-value="item => (item === null ? null : item.id || item.Id)"
        :option-label="
            item => (item === null ? null : item.title || item.Title)
          "
         -->
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.PostalCodeWork"
          cdcName="PostalCodeWork"
          :m="m"
          label="کد پستی محل کار"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.AccCode"
          cdcName="AccCode"
          :m="m"
          label="شماره حساب"
          label-width="100px"
        />
      </FormControl>
      <safa-text
        v-model="model.ClsEngineer.Eng_Info.Address"
        cdcName="Address"
        :m="m"
        label="آدرس محل سکونت"
        label-width="100px"
        class="col-12"
        type="textarea"
      />
      <safa-text
        v-model="model.ClsEngineer.Eng_Info.AddressWork"
        cdcName="AddressWork"
        :m="m"
        label="آدرس دفتر"
        label-width="100px"
        class="col-12"
        type="textarea"
      />
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    model: Object,
    m: String
  },
  data () {
    return {
      name: "CallInfo"
    }
  }
}
</script>
