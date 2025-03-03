<template>
  <div>
    <safa-status :result="requestResult"/>
    <div class="q-pa-sm">
      <div class="row q-col-gutter-sm">
        <div class="col-auto">
          <!-- <btn-default label="ایجاد گروه" @click="isShowCopyDataModal = true"/> -->
        </div>
      </div>
      <q-separator class="q-mt-sm"/>
    </div>
    <!-- <MiniArchiveUploader
      uploaderTitle="سند مالکیت"
      :userName="archiveConfig.username"
      :password="archiveConfig.password"
      :showDescription="false"
      bizcode="9c9cd7a6-7acd-435c-a3b5-d9dcf9df1aaf"
    ></MiniArchiveUploader> -->
    <AutoCadUpploader
      :allFiles="allFiles"
      @added="saveDWGFile"
      :bizcode="selectedRow.NidDWG"
      :UserGuid="currentUser.GUID"
    />
    <!-- <ArchiveWrap  :name="archiveConfig.username"
      :bizCode="getAllGroupResult[0].GUID"
      :pass="archiveConfig.password"
      :userLoginId="nidUser"
      :userLoginName="username" class="fit">
      </ArchiveWrap> -->

    <safa-popup
      title="ایجاد گروه"
      v-model="isShowCopyDataModal"
      width="200px"
      height="180px"
    >
    <fit>
      <div class="row justify-center">
        <div class="col-auto">
          <safa-text label="نام گروه"></safa-text>
        </div>
      </div>
        <div class="row q-gutter-x-sm">
          <btn-default label="اضافه کردن"/>
        </div>
    </fit>
    </safa-popup>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import AutoCadUpploader from './AutoCadUpploader.vue'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  components: { AutoCadUpploader },
  data () {
    return {
      name: 'InternalMapTab',
      isShowCopyDataModal: false,
      requestResult: null,
      groupData: {},
      getAllGroupResult: [],
      allFiles: []
    }
  },
  props: {
    selectedRow: Object,
    baseNosaziCode: Object,
    formKey: String,
    title: String
  },
  computed: {
    nidUser () {
      return this.$stSecurity.getters['authorize/userId']
    },
    username () {
      return this.$stSecurity.getters['authorize/username']
    },
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore')
    }
  },
  methods: {
    loadData () {
      this.showLoading()
      let payLoad = { BizId: this.selectedRow.NidDWG }
      this.$services.CadWs.getAllGroup(payLoad, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          if (this.requestResult.success) {
            this.getAllGroupResult = this.requestResult.data
            if (this.getAllGroupResult.length > 0) {
              this.getAllFiles()
            }
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch((e) => {
          this.serverError()
          console.log('load error:', e)
        })
        .finally(this.hideLoading())
    },
    getAllFiles () {
      this.showLoading()
      let payLoad = {
        BizId: this.selectedRow.NidDWG,
        GroupGuid: this.getAllGroupResult[0].GUID,
        PageNum: 1,
        AmountOfPage: 28
      }
      this.$services.CadWs.getAllFiles(payLoad, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          if (this.requestResult.success) {
            this.allFiles = this.requestResult.data.CadFiles
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch((e) => {
          this.serverError()
          console.log('load error:', e)
        })
        .finally(this.hideLoading())
    },
    saveDWGFile ({ File, FileName }) {
      this.showLoading()
      let payLoad = {
        DwgFile: File,
        BizID: this.selectedRow.NidDWG,
        // BizID: 'df1a2363-6b22-45e4-b33e-bf51b991bc60',
        GroupGuid: '00000000-0000-0000-0000-000000000000',
        FileName: FileName
        // ColorStr: '#FFFFFFFF',
        // pUserGuid:this.getNidUser()
      }
      this.$services.CadWs.saveDWGJson(payLoad, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          if (this.requestResult.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد')
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch((e) => {
          this.serverError()
          console.log('load error:', e)
        })
        .finally(this.hideLoading())
    }
  },
  async created () {
    await this.loadData()
  }
}
</script>
