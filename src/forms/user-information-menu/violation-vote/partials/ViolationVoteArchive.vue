<template>
  <fit>
    <div class="fit" v-if="archiveConfig && archiveConfig.username">
      <ArchiveWrap
        v-if="showArchive"
        style="min-height: 300px"
        class="fit"
        ref="archiveRef"
        :biz-code="archiveBizCode"
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
      >
      </ArchiveWrap>
    </div>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],

  props: {
    value: Object,
    m: String,
    taskInfo: Object
  },

  data () {
    return {
      name: 'ViolationVoteArchive',
      showArchive: false,
      archiveBizCode: ''
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing, no-undef
      return window.getConfigValue('archiveCore').district[this.nosaziCode.District || 1]
    },
    config () {
      return {
        config: {
          District: this.nosaziCode.District === 0 ? 1 : this.nosaziCode.District
        }
      }
    },

    nosaziCode () {
      return convertStringToNosaziCodeObject(this.taskInfo.BizCode)
    }
  },

  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },

    async getBaseLibInNosaziCode () {
      let data = {
        pNosaziCode: {
          CI_City: 0,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          ...this.nosaziCode
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo,Sh_RequestInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      await this.$services.SA.getBaseLibInNosaziCode(data, this.config)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data

            if (this.baseLibResults.ArchiveWrapper) {
              this.updateArchiveBizCode(
                this.baseLibResults.ArchiveWrapper.BizCode
              )
              this.showArchive = true
            } else {
              this.showArchive = false
            }
          }
        })
        .catch((error) => {
          console.error(error)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  mounted () {
    this.getBaseLibInNosaziCode()
  }
}
</script>

<style></style>
