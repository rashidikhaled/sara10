<template>
  <fit>
    <internal-section class="q-mb-sm">
      <FormRow :sm="2" :md="2" :lg="2" :xl="2">
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.ShaftNo"
            :m="m"
            label="شناسه"
            label-width="80px"
            type="number"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.LicenseNo"
            :m="m"
            label="شماره پروانه"
            label-width="80px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.Shaft_Info.LicenseDate"
            :m="m"
            label="تاریخ صدور"
            label-width="80px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.Shaft_Info.CreditTime"
            :m="m"
            label="مدت اعتبار"
            label-width="80px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="value.Shaft_Info.CI_ShaftStatus"
            :m="m"
            label="وضعیت فعلی"
            label-width="80px"
            domainName="Estate"
            ciName="CI_ShaftStatus"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-model="value.Shaft_Info.CI_ShaftLicenseType"
            :m="m"
            label="نوع پروانه"
            label-width="80px"
            domainName="Estate"
            ciName="CI_ShaftLicenseType"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            v-model="value.Shaft_Info.IsTemporaryLicense"
            :m="m"
            label="پروانه موقت می باشد"
            label-width="80px"
          ></safa-checkbox>
        </FormControl>
      </FormRow>
    </internal-section>
      <safa-grid
        v-model="value.Shaft_Owner"
        helper="shaftOwnerColumns"
        :m="m"
        fit
        min-height="150px"
        height="100%"
        max-height="100%"
        :showRowNumber="false"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
      />
    <internal-section class="q-mt-sm">
      <text-template
        v-model="value.Shaft_Info.Description"
        label="توضیحات  "
        label-width="80px"
        cdcName="description"
        :formKey="formKey"
        :m="m"
        :rows="3"
      ></text-template>
    </internal-section>
    <internal-section>
      <btn-delete label="حذف" @click="$emit('btnDeleteClick')" />
    </internal-section>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    formKey: {
      type: String,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  }
}
</script>
