<template>
  <fit>
    <safa-datatable
      v-model="model.ClsEngineer.Eng_Picture_Change"
      cdcName="Eng_Picture_Change"
      hideHeader
      helper="engPictureChange"
      m="r"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      addRow
      deleteRow
      allowCopy
    />
  </fit>
</template>

<script>
export default {
  props: {
    model: Object
  },
  data () {
    return {
      name: "ChangeScanPic"
    }
  }
}
</script>
