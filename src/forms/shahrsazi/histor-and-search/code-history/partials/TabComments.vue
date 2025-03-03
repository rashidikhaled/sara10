<template>
  <fit>
    <task-comments :nidProc="request.NidProc" :readonly="true"/>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import TaskComments from '../../../../../kartable/task/TaskComments.vue'

export default {
  components: { TaskComments },
  name: 'TabComments',
  mixins: [baseFormMixin],
  props: {
    request: Object
  }
}
</script>
