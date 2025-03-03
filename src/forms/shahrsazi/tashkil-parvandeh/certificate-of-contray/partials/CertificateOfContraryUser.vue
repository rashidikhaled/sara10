<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      class="fit"
      horizontal
      style="min-height:200px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable2
            v-model="results.Base_Using"
            ref="grid2"
            helper="CertificateOfContraryUser"
            title=" کاربری ها"
            fit
            paginate
            height="100%"
            max-height="100%"
            :bordered="false"
          />
          <q-separator />

        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <!-- v-model="getData" -->
          <safa-datatable
            ref="grid2"
            helper="CertificateOfContraryPishamadegi"
            title="پیش آمدگی ها"
            fit
            height="100%"
            max-height="100%"
            :bordered="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data: function () {
    return { splitterValue: 50 }
  },
  props: {
    results: Object
  }
}
</script>
