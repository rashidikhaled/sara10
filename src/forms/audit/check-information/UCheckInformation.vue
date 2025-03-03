<template>
  <safa-form :id="formKey" :caption="title">
    <fit>
      <component
        :is="activeComponent.formKey"
        v-bind="activeComponent.props"
        ref="innerChild"
      />
    </fit>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import USearchUTreeInfo from "../search/partials/USearchUTreeInfo.vue"

export default {
  mixins: [baseFormMixin],

  components: { USearchUTreeInfo },

  data () {
    return {
      title: " بررسی اطلاعات",
      formKey: "90DE710F-2A78-4439-8287-008BB3170C50",
      name: "UCheckInformation",
      main: true,

      activeComponent: {}
    }
  },

  mounted () {
    const tmpItem = convertStringToNosaziCodeObject(this.taskInfo?.BizCode ?? "0-0-0-0-0-0-0")
    this.activeComponent = {
      formKey: "USearchUTreeInfo",
      props: {
        formKey: this.formKey,
        title: this.title,
        name: this.name,
        activeHouseTreeContainer: {
          list: [],
          treeSize: 0,
          current: 1,
          pageSize: 20
        },
        params: {
          IsLoadedFromMenu: false,
          NosaziCode: { ...tmpItem },
          taskInfo: this.taskInfo
        }
      }
    }
  }
}
</script>
