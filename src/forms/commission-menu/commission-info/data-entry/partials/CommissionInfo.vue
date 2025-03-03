<template>
  <FormRow>
    <FormControl>
      <safa-combo
        ciName="CI_Commission"
        domainName="Commission100"
        label="شماره کمیسیون"
        label-width="90px"
        v-model="value.CI_Commission"
        cdcName="CI_Commission"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-combo
        ciName="CI_CommissionType"
        domainName="Commission100"
        label="نوع کمیسیون"
        label-width="90px"
        v-model="value.CI_CommissionType"
        cdcName="CI_CommissionType"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شماره ارجاع منطقه"
        label-width="90px"
        v-model="value.UrbanNidKartablItem"
        cdcName="UrbanNidKartablItem"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="تراکم"
        label-width="90px"
        v-model="value.Density"
        cdcName="Density"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="مساحت موجود"
        label-width="90px"
        v-model="value.CurrentArea"
        cdcName="CurrentArea"
        type="decimal"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="مساحت طبق سند"
        type="decimal"
        label-width="90px"
        v-model="value.DocArea"
        cdcName="DocArea"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-combo
        ciName="CI_Region"
        domainName="Commission100"
        label="منطقه"
        label-width="90px"
        v-model="value.CI_Region"
        cdcName="CI_Region"
        :required="value.CI_Region === 0 ? true : false"
        :validations="value.CI_Region === 0 ? 'required' : ''"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="نام مالک "
        label-width="90px"
        v-model="value.OwnerName"
        cdcName="OwnerName"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شماره پروانه"
        label-width="90px"
        v-model="value.NoLicence"
        cdcName="NoLicence"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-datepicker
        label="تاریخ پروانه"
        label-width="90px"
        v-model="value.DateLicence"
        cdcName="DateLicence"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="کد پستی"
        label-width="90px"
        v-model="value.PostCode"
        cdcName="PostCode"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="تبصره"
        label-width="90px"
        v-model="value.Remark"
        cdcName="Remark"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="پلاک ثبتی"
        label-width="90px"
        v-model="value.Regplaque"
        cdcName="Regplaque"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شماره کلاسه"
        label-width="90px"
        v-model="value.PreCode"
        cdcName="PreCode"
        :m="m"
      />
    </FormControl>
    <nosazi-code-input
      label="کد نوسازی"
      label-width="90px"
      :actions="false"
      v-model="baseNosaziCode"
      cdcName="baseNosaziCode"
      @enter="changedNosaziCode"
      @fetched="changedNosaziCode"
      required
      validations="required"
    />
    <text-template
      label="آدرس"
      label-width="90px"
      class="col-12"
      :rows="1"
      v-model="value.Address"
      cdcName="Address"
      :m="m"
    />
    <text-template
      label="توضیحات"
      label-width="90px"
      class="col-12"
      :rows="9"
      v-model="value.Comments"
      cdcName="Comments"
      :m="m"
    />
  </FormRow>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: ""
    },
    nosaziCode: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      name: "CommissionInfo",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  methods: {
    changedNosaziCode (baseNosaziCode) {
      this.$emit("changedNosaziCode", baseNosaziCode)
    }
  }
}
</script>
