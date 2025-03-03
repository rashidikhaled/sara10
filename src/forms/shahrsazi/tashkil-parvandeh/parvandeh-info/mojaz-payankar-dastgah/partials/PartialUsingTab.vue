<template>
  <fit>
    <fit>
      <safa-datatable
        helper="baseFront1"
        v-model="value.Base_Front"
        height="100%"
        max-height="100%"
        :bordered="false"
        :allowCopy="true"
        :m="m"
        title="پیش آمدگیها"
      />
    </fit>
    <safa-splitter
      v-model="splitterValue"
      fit
      horizontal
      style="min-height:200px"
    >
      <template #before>
        <fit>
      <safa-datatable2
        helper="baseUsingMojazPayankarDastgah"
        title="کاربری ها "
        v-model="value.Base_Using"
        height="100%"
        max-height="100%"
        :bordered="false"
        :allowCopy="true"
        :m="m"
      />  <!-- ولیدیشن قرار داده شد -->
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-datatable
            helper="baseFrontِDastgahMojazPayankar"
            :m="m"
            v-model="value.Base_Front"
            height="100%"
            max-height="100%"
            title="پیش آمدگیها-تاریخ احداث"
            fit
            :allowCopy="true"
          />
        </fit>
      </template>
    </safa-splitter>

  </fit>
</template>

<script>
export default {
  name: 'PartialUsingTab',
  data: function () {
    return {
      splitterValue: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
