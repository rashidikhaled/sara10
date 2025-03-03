<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          source-type="local"
          :options="districts"
          label="منطقه"
          label-width="78px"
          :use-input="false"
          v-model="value.District"
          cdcName="District"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام متقاضی"
          label-width="78px"
          v-model="value.RequesterName"
          m="r"
          cdcName="RequesterName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره ملی متقاضی"
          label-width="78px"
          m="r"
          v-model="value.NationalCode"
          cdcName="NationalCode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره همراه"
          label-width="78px"
          m="r"
          v-model="value.CellPhone"
          cdcName="CellPhone"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی"
          label-width="78px"
          m="r"
          v-model="value.PostalCode"
          cdcName="PostalCode"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          source-type="local"
          :options="preMokatebatItems"
          label="مکاتبات قبلی"
          label-width="78px"
          v-model="value.PreMokatebat"
          cdcName="PreMokatebat"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کاربری مصوب"
          label-width="78px"
          m="r"
          v-model="value.KarbariMosavab"
          cdcName="KarbariMosavab"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          source-type="local"
          :options="preMokatebatItems"
          label="اولویت اجرایی کاربری مصوب"
          label-width="78px"
          v-model="value.KarbariMosavabPriority"
          cdcName="KarbariMosavabPriority"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_ActionType"
          domainName="engineer"
          input-debounce="0"
          label="نوع اقدام"
          label-width="78px"
          m="r"
          v-model="value.CI_ActionType"
          cdcName="ActionType"
        />
      </FormControl>
      <FormControl>
        <nosazi-code-input
          v-model="baseNosaziCode"
          :actions="false"
          cdcName="baseNosaziCode"
          label="کد نوسازی"
          label-width="68px"
          m="r"
        />
      </FormControl>
      <safa-text
        label="آدرس"
        label-width="78px"
        m="r"
        v-model="value.Address"
        cdcName="Address"
        class="col-12"
      />
    </FormRow>
    <text-template
      label="شرح اقدام"
      label-width="78px"
      v-model="value.ActionDetailes"
      m="r"
      fit
      cdcName="ActionDetailes"
    />
  </fit>
</template>

<script>
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  data () {
    return {
      preMokatebatItems: [
        { ID: 0, Title: 'دارد' },
        { ID: 1, Title: 'ندارد' }
      ]
    }
  },
  props: {
    value: Object
  },

  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    },
    baseNosaziCode () {
      if (this.value && this.value.NosaziCodeStr) {
        return convertStringToNosaziCodeObject(this.value.NosaziCodeStr)
      }
      return {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  }
}
</script>
