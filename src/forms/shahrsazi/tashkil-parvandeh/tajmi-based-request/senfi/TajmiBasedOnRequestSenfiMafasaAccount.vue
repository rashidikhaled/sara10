<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-combo
        class="col-md-3"
        label="عنوان شغل"
        sourceType="local"
        :options="nosaziCode"
        v-model="code">
      </safa-combo>
    </div>
    <safa-datatable
      helper="mafasaHesabList"
      v-model="mafasaHesabResults"
      title="مفاصا حساب"
      height="100%"
      min-height="100px"
      max-height="100%"
      fit
    />
    <form-actions
      :m="mode"
      class="q-mt-sm"
      @edit="isEditable = true"
      @save="save"
      @cancel="load"
    ></form-actions>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      nosaziCode: [{ ID: 0, Title: '' }],
      code: 0
    }
  },
  computed: {},
  props: {
    mafasaHesabResults: Object,
    selectedNosaziCode: Object
  },
  mounted () {
    // this.nosaziCode[0].Title = this.selectedNosaziCode.CodeFrom
  }
}
</script>
