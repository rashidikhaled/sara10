<template>
  <fit>
    <ArchiveWrap
      v-if="showArchive"
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
      style="min-height: 300px"
      class="fit"
      ref="archiveRef"
    ></ArchiveWrap>
  </fit>
</template>

<script>
/* eslint-disable no-undef */
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  props: {
    nosaziCode: Object
  },
  data () {
    return {
      title: 'آرشیو',
      name: 'ViolationSendRequestArchive',
      selectedArchiveGrp: 1,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {
          BizCode: null
        },
        Base_RegisterPlack_Str: null
      },
      archiveResults: { ArchiveWrapper: {} },
      showArchive: false,
      nidNosaziCode: '00000000-0000-0000-0000-000000000000',
      archiveBizCode: ''
    }
  },

  created () {
    this.showArchive = true
    this.updateArchiveBizCode(this.selectedRequest.BizCode)
    this.$nextTick(() => {
      this.GetBaseLib_InNosaziCode()
    })
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    GetBaseLib_InNosaziCode () {
      let data = {
        pNosaziCode: {
          Apartment: this.nosaziCode.Apartment,
          Block: this.nosaziCode.Block,
          Building: this.nosaziCode.Building,
          CI_City: 0,
          District: this.nosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.nosaziCode.House,
          IsRoot: false,
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.nosaziCode.Region,
          Shop: this.nosaziCode.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            if (this.baseLibResults.ArchiveWrapper) {
              // this.selectedArchiveGrp = res.data.ArchiveWrapper.CI_ArchiveGroup;
              this.nidNosaziCode =
                this.baseLibResults.ArchiveWrapper.NidNosaziCode
              // this.getArchiveWrapper();
            } else {
              this.showError(res.errors && res.errors[0].text)
            }
          }
        })
        .catch((response) => {
          console.log('error', response)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async getArchiveWrapper () {
      try {
        this.showLoading()
        let payLoad = {
          pNidNosaziCode: this.nidNosaziCode,
          pCI_ArchiveGroup: this.selectedArchiveGrp
        }
        const { data } = await this.$services.SA.getArchiveWrapper(
          payLoad,
          this.config
        )

        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.archiveResults = this.requestResult.data
          if (this.archiveResults.ArchiveWrapper) {
            this.updateArchiveBizCode(
              this.archiveResults.ArchiveWrapper.BizCode
            )
            this.showArchive = true
          }
        } else {
          this.showArchive = false
        }
      } catch (response) {
        //   this.serverError()
        this.showError('اسناد این شماره پرونده موجود نمی باشد.')
        console.log('error', response)
      } finally {
        this.hideLoading()
      }
    }
  },
  computed: {
    archiveConfig () {
      // return window.getConfigValue('archiveCore').district[this.nosaziCode.District || 1];
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
  watch: {
    // selectedArchiveGrp() {
    //   // this.GetBaseLib_InNosaziCode();
    // },
  }
}
</script>
