<template>
  <fit>
    <safa-checkbox
      v-model="isShow"
      cdcName="isShow"
      label="نمایش مجاورین"
      class="q-mb-sm"
    />

    <safa-datatable
      ref="grid"
      :allowCopy="false"
      :allowNewRow="false"
      :allowRemoveRow="false"
      :hideHeader="true"
      :v-model="items"
      cdcName="items"
      helper="mojaverin"
      name="grid"
      height="100%"
      maxHeight="100%"
      minHeight="200px"
      class="fit"
      margin="0"
      title="مجاورین"
    />
  </fit>
</template>

<script>
export default {
  name: 'baro-kaf-info',
  title: 'اطلاعات برو کف',
  data () {
    return {
      items: [],
      isShowModal: false,
      isShow: false
    }
  },
  components: {},
  methods: {}
}
</script>
