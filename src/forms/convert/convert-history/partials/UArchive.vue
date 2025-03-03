<template>
  <fit>
    <safa-status :result="baseLibResult" />
    <FormRow class="q-pa-sm">
      <FormControl>
        <safa-text
          v-model="value.NidWorkItem"
          cdcName="RequestCode"
          label="کد درخواست"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <ArchiveWrap
      fit
      v-if="showArchive"
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
      ref="archiveRef"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      archiveBizCode: "",
      baseLibResult: null,
      archiveResult: null,
      showArchive: false
    }
  },

  computed: {
    archiveConfig () {
      return window.getConfigValue("archiveCore")
    }
  },

  methods: {
    loadObj (pNidWorkItem) {
      this.showLoading()
      this.$services.SA.getBaseLibInNidWorkItem(
        { pNidWorkItem }
        // , {
        //   config: { District: this.dmSearch.district }
        // }
      )
        .then(async ({ data }) => {
          this.baseLibResult = this.getResponse(data)
          if (this.baseLibResult.success) {
            const res = this.baseLibResult.data
            if (res.ArchiveWrapper && res.ArchiveWrapper.BizCode) {
              this.updateArchiveBizCode(res.ArchiveWrapper.BizCode)
              this.showArchive = true
            } else this.showArchive = false
          } else this.showArchive = false
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // getArchiveWrapper () {
    //   let data = {
    //     pNidNosaziCode: this.dataItem.NidNosaziCode,
    //     pCI_ArchiveGroup: 1
    //   }
    //   this.$services.SA.getArchiveWrapper(data)
    //     .then(async ({ data }) => {
    //       this.archiveResult = this.getResponse(data)
    //       // if (this.requestResult.success) {
    //       //   this.archiveResults = this.requestResult.data
    //       //   if (this.archiveResults.ArchiveWrapper) {
    //       //     this.updateArchiveBizCode(
    //       //       this.archiveResults.ArchiveWrapper.BizCode
    //       //     )
    //       //     this.showArchive = true
    //       //   }
    //       // } else {
    //       // }
    //     })
    //     .catch((e) => {
    //       console.log(e)
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-trailing-spaces, no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    }
  },
  async mounted () {
    this.loadObj(this.value.NidWorkItem)
  }
}
</script>
