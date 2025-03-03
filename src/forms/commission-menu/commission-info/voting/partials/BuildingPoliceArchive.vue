<template>
  <fit>
    <ArchiveWrap
      v-if="showArchive"
      style="min-height: 300px"
      class="fit"
      ref="archiveRef"
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
    >
    </ArchiveWrap>
  </fit>
</template>

<script>
export default {
  props: {
    BaseNosaziCode: Object,
    NidProc: String
  },
  data () {
    return {
      title: 'آرشیو پلیس ساختمان',
      name: 'BuildingPoliceArchive',
      showArchive: false,
      archiveWrapperModel: null,
      archiveWrapperList: [],
      archiveBizCode: ''
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archivePolice')
    },
    config () {
      return {
        config: {
          District:
            this.BaseNosaziCode?.District === 0
              ? 1
              : this.BaseNosaziCode?.District
        }
      }
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      let ClsNosaziCode = bizCode
      let housecode = ClsNosaziCode.District + "-" + ClsNosaziCode.Region + "-" + ClsNosaziCode.Block + "-" + ClsNosaziCode.House + "-" + "0-0-0"
      this.archiveBizCode = housecode
    },
    fetchWrapperList () {
      this.updateArchiveBizCode(this.BaseNosaziCode)
      // this.$services.SC.getArchiveWrapperListByNidProc({ به درخواست مشهد ساختار این بخش عوض شد
      //   pNidProc: this.NidProc === null ? '00000000-0000-0000-0000-000000000000' : this.NidProc
      // }, this.config).then(({ data }) => {
      //   this.archiveWrapperList = data.ArchiveWrapperListByNidProc || []
      //   this.selectDefaultItem()
      // }).catch(ex => {
      //   this.showError('خطا در سرویس')
      //   console.error(ex)
      // })
    }
    // selectDefaultItem () {
    //   if (this.archiveWrapperList.length === 0) return
    //   const defaultItem = this.archiveWrapperList.filter(x => x.CI_ArchiveGroup === 1)[0]
    //   if (defaultItem) {
    //     this.archiveWrapperModel = defaultItem.BizCode
    //   } else {
    //     this.archiveWrapperModel = this.archiveWrapperList[0].BizCode
    //   }
    //   this.updateArchiveBizCode(this.archiveWrapperModel)
    // }
  }
}
</script>
