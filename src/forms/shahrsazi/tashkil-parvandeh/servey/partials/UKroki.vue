<template>
   <fit>
     <umap v-show="!showArchive" class="fit" :taskInfo="selectedRequest"/>
     <UDWGArchive @isShowBackBtn="isShowBackBtn" v-show="showArchive"/>
   </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import UDWGArchive from './UDWGArchive'
export default {
  name: 'baro-kaf-info',
  title: 'اطلاعات برو کف',
  mixins: [baseFormMixin],
  components: { UDWGArchive },
  data () {
    return {
      items: [],
      isShowModal: false,
      showArchive: false
    }
  },
  props: {
    results: Object
  },
  methods: {
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    },
    isShowBackBtn () {
      this.$emit('isShowBackBtn')
    },
    hideArchive () {
      this.showArchive = false
    }
  }
}
</script>
