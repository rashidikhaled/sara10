<template>
  <div class="archive-dwg full-height fit">
    <!-- :bizcode="baseLibResults.ArchiveWrapper.BizCode" -->
    <MiniArchiveUploader
      :userName="archiveConfig.username"
      :password="archiveConfig.password"
      :showDescription="false"
      :nidTree="archiveEntitiesConfig.survey"
      fileTypes=".dwg,jpg,png,tif"
      :bizcode="archiveBizCode?.toUpperCase()"
      uploaderTitle="آرشیو DWG"
      @reject="onError"
      @uploaded="onUploaded"
    ></MiniArchiveUploader>
    <div style="width: 800px; max-width: 100%;margin: auto">
      <div class="alert alert-warning" v-show="errorMsg">{{ errorMsg }}</div>
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      requestResult: null,
      baseLibResults: {},
      selectedArchiveGrp: null,
      showBackBtn: false,
      errorMsg: '',
      archiveBizCode: ''
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfig('archiveCore').district[
        (this.baseNosaziCode && this.baseNosaziCode.District) || 1
      ]
    },
    archiveEntitiesConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveEntities')
    }
  },
  methods: {
    onError (msg) {
      this.errorMsg = msg
    },
    onUploaded () {
      this.errorMsg = ''
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    handleBaseNosaziCodeChanged () {
      let baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      let data = {
        pNosaziCode: {
          Apartment: baseNosaziCode.Apartment,
          Block: baseNosaziCode.Block,
          Building: baseNosaziCode.Building,
          CI_City: 0,
          District: baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: baseNosaziCode.House,
          IsRoot: false,
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: baseNosaziCode.Region,
          Shop: baseNosaziCode.Shop
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
              this.selectedArchiveGrp = this.baseLibResults.ArchiveWrapper.CI_ArchiveGroup
            }
            this.updateArchiveBizCode(
              this.baseLibResults.ArchiveWrapper.BizCode
            )
            this.showBackBtn = true
            this.$emit('isShowBackBtn', this.showBackBtn)
          }
        })
        .catch(response => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      this.isEditable = true
      this.isSearch = true
    }
  },
  mounted () {
    this.handleBaseNosaziCodeChanged()
  }
}
</script>
<style lang="scss">
.archive-dwg{
  .archive_min_uploader{
    margin:0 9px !important;
    height: 100%;
      div:last-child {
        flex-basis: 100%;
        display: flex !important;
        align-items: flex-end;
        .q-btn{
            height: 36px;
            margin-top:5px !important;
            margin-right:5px !important;
          }
      }
      .q-uploader__list{
        display:flex;
        flex-wrap: wrap;
      }
      .q-uploader__file{
        flex: 0 1 auto;
        margin-right: 10px;
      }
      .q-uploader__list > div:last-child{
        flex-basis: 100%;
        display: flex !important;
        align-items: flex-end;
      }
      .q-uploader__list > div:last-child .q-btn{
        flex:0 1 auto;
        max-width: 150px;
      }
  }
  .archive_min_uploader .archive_min_uploader_q{
    height: 400px;
  }
}
</style>
