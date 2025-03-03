<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitterModel"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <safa-splitter
          v-model="verticalSplitterModel"
          vertical
          class="fit"
          margin="0"
        >
          <template v-slot:before>
<fit>
    <text-template
      label="توضیحات بر و کف"
      labelWidth="120px"
      v-model="results.Sh_BaroKaf.BarKafComments"
      m="r"
      formKey="9A84721F-6B52-42FC-8679-468E4AE120E8"
      class=" q-mb-sm"
      fit
    />
  </fit>
          </template>
          <template v-slot:after>
            <fit>
    <text-template
      label="توضیحات کنترل فنی"
      labelWidth="120px"
      v-model="results.Sh_MapControl.Comments"
      formKey="9A84721F-6B52-42FC-8679-468E4AE120E8"
      m="r"
      class=" q-mb-sm"
      fit

              height="100%"
    />
  </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <safa-splitter
          v-model="verticalSplitterModel"
          vertical
          class="fit"
          margin="0"
        >
          <template v-slot:before>
            <fit>
    <text-template
      label="توضیحات پروانه"
      labelWidth="120px"
      v-model="results.Sh_ExportParvaneh.Comments"
      formKey="9A84721F-6B52-42FC-8679-468E4AE120E8"
      :m="m"
      class=" q-mb-sm"
      fit

              height="100%"
    />
  </fit>
          </template>
          <template v-slot:after  >
            <fit>
    <safa-datatable
      title=" نامه ها"
      v-model="results.Base_Letter"
      ref="grid2"
      helper="parvanehComment"
      :m="m"
      class=" q-mt-sm"
      fit

              height="100%"
    />
  </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
  </fit>

</template>
<script>
export default {
  data () {
    return {
      horizontalSplitterModel: 50,
      verticalSplitterModel: 50

    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
