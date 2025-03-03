<template>
  <fit>
    <safa-form
      :id="formKey"
      :caption="title"
    >
      <safa-splitter
        v-model="gridSplitter"
        class="fit"
        horizontal
        margin="0"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              title=" کاربری ها"
              v-model="results.Base_Using"
              ref="grid2"
              helper="shahrsazi.baseUsing"
              height="100%"
              max-height="100%"
              min-height="100px"
              fit
            >
            </safa-datatable>
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-datatable
              title=" پیش آمدگی ها و سایر کاربرهای های خاص"
              v-model="results.Base_Front"
              ref="grid2"
              helper="baseFront"
              height="100%"
              max-height="100%"
              min-height="100px"
              fit
            >
            </safa-datatable>
          </fit>
        </template>
      </safa-splitter>
    </safa-form>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    results: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>
