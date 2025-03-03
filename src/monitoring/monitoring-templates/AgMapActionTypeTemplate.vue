<template>
    <td style="display: flex;">
      <div class="flexCenter">
        {{ detectValidActiontype()}}
      </div>
    </td>
</template>

<script>
import actionTypeMixin from '../mixins/monitoringMixin'
export default {
  mixins: [actionTypeMixin],
  name: 'AgMapActionTypeTemplate',
  props: ['dataItem', 'field'],
  data () {
    return {
      validActiontype: ''
    }
  },
  methods: {
    detectValidActiontype () {
      this.validActiontype = this.dataItem.filter(x => x.actionType === this.field)[0].actionType.toString()
      return this.actionTypeCodeToTitle(this.validActiontype)
    }
  }

}
</script>
