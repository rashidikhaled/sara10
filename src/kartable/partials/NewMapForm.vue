<template>
  <form-wrapper :title="title" :padding="true">
    <MapForm ShowClose="true" :TaskInfo="taskInfo" :NidProc="taskInfo.NidProc" />
  </form-wrapper>
</template>

<script>
import MapForm from './Versioningbyproc'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'NewMapForm',
  mixins: [baseFormMixin],
  data () {
    return {
      main: true,
      name: 'NewMapForm',
      title: 'دیتا ورژنینگ',
      formKey: 'FC9D387F-9953-44F9-B4D9-89175BBB7993'
    }
  },
  components: {
    MapForm
  }
}
</script>
