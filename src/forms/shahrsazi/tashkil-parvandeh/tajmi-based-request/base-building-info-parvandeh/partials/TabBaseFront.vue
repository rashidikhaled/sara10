<template>
  <safa-form
    id="b5723e30-f485-45ec-9fa4-992386e88eaa"
    caption="شهرسازی- تشکیل پرونده ساختمان"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <fit>
      <safa-securityPanel
        id="92643e73-3540-4bd4-bb65-e4fb94d502c8"
        caption="پیش آمدگی"
        tag="div"
         class="fit"
      >
        <safa-datatable2
          v-model="value.Base_Front"
          :allow-copy="true"
          :copy-with-count="true"
          :m="m"
          class="fit"
          margin="0"
          height="100%"
          max-height="100%"
          min-height="100px"
          helper="baseFront"
          title="پیش آمدگی ها"
      :bordered="false"
        />   <!-- ولیدیشن قرار داده شد -->
      </safa-securityPanel>
      <safa-securityPanel
        id="7836704e-8654-428b-9172-e3e6ddec3052"
        caption="پیش آمدگی-تاریخ احداث"
        tag="div"
         class="fit"
      >
        <safa-datatable2
          v-model="value.Base_Front"
          :allow-copy="true"
          :copy-with-count="true"
          :m="m"
          class="fit"
          margin="0"
          height="100%"
          max-height="100%"
          min-height="100px"
          helper="baseFront"
          title="پیش آمدگی ها"
      :bordered="false"
        />   <!-- ولیدیشن قرار داده شد -->
      </safa-securityPanel>
    </fit>
  </safa-form>
</template>

<script>
export default {
  name: 'TabBaseFront',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
