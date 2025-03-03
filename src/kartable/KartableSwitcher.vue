<template>
  <safa-form ignore caption="کارتابل" id="0B2E9901-CAEF-4DCA-A2F2-D1DD2582C40B">
    <section id="kartable-switcher" class="mark-as-resize">
      <safa-securityPanel caption="نسخه محدود کارتابل" id="B8F2A528-1E26-448B-8489-78038B244C32">
        <!-- <simple-kartable/> -->
        <simple-kartable v-bind="$attrs" :layoutMode="layoutMode" :layoutSplitterWidth="layoutSplitterWidth"
                         :defaultActiveTab="defaultActiveTab"/>
      </safa-securityPanel>
      <safa-securityPanel caption="کارتابل" id="B8F2A528-1E26-448B-8489-78038B244C32" v-sp-else>
        <!-- <kartable/> -->
        <kartable v-bind="$attrs" :layoutMode="layoutMode" :layoutSplitterWidth="layoutSplitterWidth"
                  :defaultActiveTab="defaultActiveTab"/>
      </safa-securityPanel>
    </section>
    <!--    <kartable/>-->
  </safa-form>
</template>

<script>
import Kartable from './kartable'
import SimpleKartable from './SimpleKartable'

export default {
  name: 'KartableSwitcher',
  components: {
    Kartable,
    SimpleKartable
  },
  props: {
    layoutMode: String,
    defaultActiveTab: String,
    layoutSplitterWidth: Number
  }
}
</script>

<style scoped>
#kartable-switcher {
  height: 100%;
  /*height: calc(100vh - 50px);*/
}

.safa-panel {
  height: 100%;
}

</style>
