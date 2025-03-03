<template>
  <form-wrapper :title="title" :padding="true">
    <MapForm ShowّApply="true" :TaskInfo="taskInfo" :NidProc="taskInfo.NidProc"/>
  </form-wrapper>
</template>

<script>
import MapForm from './Versioningbyproc'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'FinalConfirmLayer',
  mixins: [baseFormMixin],
  data () {
    return {
      main: true,
      name: 'FinalConfirmLayer',
      title: 'تایید و اعمال تغییرات',
      formKey: 'ba542538-11cb-4cce-b406-f00405d6a2f3'
    }
  },
  components: {
    MapForm
  }
}
</script>
