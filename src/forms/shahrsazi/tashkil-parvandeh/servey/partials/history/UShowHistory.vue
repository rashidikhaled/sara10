<template>
  <UBaroKafTabs
    :results="results"
  />
</template>

<script>
import UBaroKafTabs from '../historyDetails/UBaroKafTabsHistory.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'baro-kaf-info',
  mixins: [baseFormMixin],
  title: '1اطلاعات برو کف',
  data () {
    return {
      items: [],
      loadBarokafHistoryPrequset: {
        pNidNosaziCode: 'a2e0adf0-5b50-43dd-b2b6-bc064b2bed41'
      },
      historyResults: {},
      selectedHistoryDataRow: null,
      isShowModal: false
    }
  },
  components: {
    UBaroKafTabs
  },
  props: {
    results: Object
  },
  mounted () {},
  methods: {}
}
</script>
