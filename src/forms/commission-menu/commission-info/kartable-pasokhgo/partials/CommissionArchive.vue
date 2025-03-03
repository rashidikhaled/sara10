<template>
  <fit>
    <!-- <div class="row">
      <safa-combo
        ref="selectedArchiveGrp"
        v-model="selectedArchiveGrp"
        label="گروه آرشیو"
        source-type="local"
        :options="comboAllBizCodeOptions"
        class="col-12 col-md-3 col-lg-3 col-sm-3"
      />
    </div> -->
    <ArchiveWrap
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBaseBizCode"
    ></ArchiveWrap>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: 'آرشیو',
      name: 'CommissionArchive',
      showArchive: false,
      selectedArchiveGrp: 0,
      comboAllBizCodeOptions: [],
      nidNosaziCode: null,
      archiveBaseBizCode: null,
      nosaziCode: null
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCommission')
    },
    config () {
      return {
        config: {
          District:
            this.nosaziCode.District === 0 ? 1 : this.nosaziCode.District
        }
      }
    }

  },
  methods: {
    updateBaseBizCode (archiveBizCode) {
      this.archiveBaseBizCode = archiveBizCode
    }
  }
}
</script>
