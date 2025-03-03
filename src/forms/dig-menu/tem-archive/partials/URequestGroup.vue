<template>
  <fit>
    <div class="q-mt-sm q-mr-sm q-ml-sm">
      <form-row>
        <form-control>
          <safa-text
            label="کد ارجاع "
            label-width="70px"
            v-model="value.ByganiItem.NidWorkItem"
            cdcName="NidWorkItem"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            label="نوع حفاری"
            label-width="70px"
            v-model="value.ByganiItem.DigType"
            cdcName="DigType"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره مجوز"
            label-width="70px"
            v-model="value.ByganiItem.ExportLicenseNo"
            cdcName="ExportLicenseNo"
            m="r"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ مجوز"
            v-model="value.ByganiItem.ExportLicenseDate"
            cdcName="ExportLicenseDate"
            label-width="70px"
            m="r"
          />
        </form-control>
        <form-control class="flex items-center">
          <safa-checkbox
            label="ارسال به بایگانی دائم"
            label-width="70px"
            v-model="value.IsBaygani"
            cdcName="IsBaygani"
          />
        </form-control>
      </form-row>
    </div>
  </fit>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    IsBaygani: {
      type: Boolean
    }
  },
  data () {
    return {
      name: "URequestGroup"
    }
  }
}
</script>
