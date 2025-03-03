<template>
  <fit>
    <div class="row">
      <safa-combo
        ref="selectedArchiveGrpRef"
        v-model="selectedArchiveGrp"
        cdcName="selectedArchiveGrp"
        optionValue="RootSubject"
        optionLabel="Caption"
        label="گروه آرشیو"
        source-type="local"
        :options="filteredArchiveWrapperOptions"
        class="col-12 col-md-3 col-lg-3 col-sm-3"
      />
    </div>
      <ArchiveWrap
        v-if="showArchive && archiveBizCode"
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :bizCode="selectedArchiveGrp"
      ></ArchiveWrap>
      <SafaNotice class="q-mt-sm" v-else
      >
      *بیز کد آرشیو لود نشده است *
    </SafaNotice>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import kartableCommissionMixin from 'src/forms/commission-menu/mixins/kartableCommissionMixin.js'
import archiveGroupPermissionMixin from "src/kartable/task/archiveGroupPermissionMixin"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin, archiveGroupPermissionMixin],

  data () {
    return {
      title: 'آرشیو',
      name: 'VotingArchive',
      showArchive: false,
      selectedArchiveGrp: '',
      archiveOptions: {
        showOnlyStates: null,
        showTree: true
      },
      archiveBizCodebasedonGroup: '',
      comboAllBizCodeOptions: [],
      filteredArchiveWrapperOptions: [],
      nidNosaziCode: null,
      defaultBizCode: null,
      getDomain: null,
      archiveConfig: null,
      nosaziCode: null
    }
  },
  props: {
    domain: String //   بر اساس این دامنه ما باید به آشیو لاگین کنیم که این دیتا از سرویس میاد
  },
  // computed: {
  //   // archiveConfig () {
  //   //   debugger
  //   //   if (this.domain === "Commission") {
  //   //     return window.getConfigValue('archiveCommission')
  //   //   } else {
  //   //     let district = parseInt(this.domain) || 1
  //   //     return window.getConfig("archiveCore").district[district]
  //   //   }
  //   //   // eslint-disable-next-line no-undef
  //   // },
  //   // config () {
  //   //   return {
  //   //     config: {
  //   //       District:
  //   //         this.nosaziCode.District === 0 ? 1 : this.nosaziCode.District
  //   //     }
  //   //   }
  //   // }
  // },
  created () {
    this.resetArchive()
    this.checkArchiveGroupsCiByUserPermission()
  },
  mounted () {
    if (this.archiveBizCode) {
      this.onShowArchive()
    }
  },
  watch: {
    comboAllBizCodeOptions (newVal) {
      this.onSetFilteredArchiveWrapperOptions()
      this.onSetDefaultBizCode()
      this.onSetGetDomain()
      // let getDomain = this.$refs?.selectedArchiveGrpRef?.selectedItem?.Domain || "Commission"
      this.loadBizCode(this.defaultBizCode, this.getDomain)
    },
    archiveBizCode () {
      if (this.archiveBizCode) {
        this.onShowArchive()
      }
    },
    selectedArchiveGrp () {
      this.archiveOptions.showOnlyStates = [
        { key: `${this.archiveBizCode}`, isSelected: false }
      ]
    },
    defaultBizCode: {
      handler () {
        if (
          !this.selectedArchiveGrp &&
          this.selectedArchiveGrp !== this.defaultBizCode
        ) {
          this.selectedArchiveGrp = this.defaultBizCode
        }
      },
      immediate: true
    },
    domain: {
      handler () {
        if (this.domain === "Commission") {
          this.archiveConfig = window.getConfigValue('archiveCommission')
        } else {
          let district = parseInt(this.domain) || 1
          this.archiveConfig = window.getConfig("archiveCore").district[district]
        }
      },
      immediate: true
    }
  },
  methods: {
    resetArchive () {
      this.selectedArchiveGrp = null
      this.archiveOptions = {
        showOnlyStates: null,
        showTree: true
      }
    },
    onSetGetDomain () {
      if (this.filteredArchiveWrapperOptions.length === 0) return
      const defaultItem = this.filteredArchiveWrapperOptions.filter(
        (x) => x.CI_ArchiveGroup === 1
      )[0]
      if (defaultItem) {
        this.getDomain = defaultItem.Domain
      } else if (this.filteredArchiveWrapperOptions.length) {
        this.getDomain = this.filteredArchiveWrapperOptions[0].Domain
      } else {
        this.getDomain = "Commission"
      }
    },
    onSetDefaultBizCode () {
      if (this.filteredArchiveWrapperOptions.length === 0) return
      const defaultItem = this.filteredArchiveWrapperOptions.filter(
        (x) => x.CI_ArchiveGroup === 1
      )[0]
      if (defaultItem) {
        this.defaultBizCode = defaultItem.RootSubject
      } else if (this.filteredArchiveWrapperOptions.length) {
        this.defaultBizCode = this.filteredArchiveWrapperOptions[0].RootSubject
      }
      else {
        this.defaultBizCode = ""
      }
    },
    onSetFilteredArchiveWrapperOptions () {
      this.filteredArchiveWrapperOptions = this.comboAllBizCodeOptions
        .filter((x) =>
          this.allowedArchiveGroupCiIds.includes(x.CI_ArchiveGroup)
        )
        .map((x) => ({
          ...x,
          label: x.Caption,
          value: x.RootSubject
        }))
    },
    loadBizCode (pBizCode, pDomianName) {
      if (pBizCode && pDomianName) {
        this.showArchive = false
        this.updateArchiveBizCode(pBizCode, pDomianName)
        this.showArchive = true
      }
    },
    async onShowArchive () {
      this.showArchive = false
      await this.$nextTick()
      setTimeout(() => {
        this.showArchive = true
      }, 100)
    }
  }
}
</script>
