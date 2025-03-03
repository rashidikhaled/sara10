<template>
  <fit>
    <FormRow class="q-mb-sm">
        <nosazi-code-input
          label="کدنوسازی"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          label-width="80px"
          m="r"
        />
      <FormControl>
        <safa-combo
          label="معاونت تخصصی"
          ciName="CI_SpecialAssistance"
          cdcName="CI_SpecialAssistance"
          domainName="Estate"
          label-width="120px"
          :m="m"
          v-model="value.Owned_Info.CI_SpecialAssistance"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="تملک از محل بودجه"
          ciName="CI_Year"
          domainName="Estate"
          label-width="120px"
          cdcName="CI_Year"
          :m="m"
          v-model="value.Owned_Info.CI_Year"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="عنوان بودجه مورد تملک"
          label-width="120px"
          :m="m"
          v-model="value.Owned_Info.BudgetTitle"
          cdcName="BudgetTitle"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره صلح نامه"
          label-width="120px"
          :m="m"
          v-model="value.Owned_Info.ContractNo"
          cdcName="ContractNo"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ صلح نامه"
          label-width="120px"
          :m="m"
          v-model="value.Owned_Info.ContractDate"
          cdcName="ContractDate"
        />
      </FormControl>
      <safa-text
        label="آدرس"
        label-width="120px"
        :m="m"
        v-model="value.Owned_Info.Address"
        cdcName="Address"
        class="col-12"
      />
      <text-template
        v-model="value.Owned_Info.Description"
        label-width="120px"
        cdcName="Description"
        :rows="1"
        :m="m"
        formKey="3B9A44AD-260F-45F4-80BB-99801FC59CEE"
        label="توضیحات"
        class="col-12"
      />
    </FormRow>
    <safa-grid
      v-model="value.Owned_InfoList"
      cdcName="Owned_InfoList"
      helper="Owned_InfoListCol"
      :suppressRowClickSelection="false"
      fit
      :m="m"
      paginate
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: { type: Object },
    baseNosaziCode: { type: Object },
    m: { type: String }
  },
  data () {
    return {
      name: "InfoEstate"
    }
  }
}
</script>
