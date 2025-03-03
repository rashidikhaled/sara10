<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetched"
          :actions="false"
        />
      </template>
      <fit>
        <q-separator class="q-mb-sm"/>
        <ArchiveWrap
          v-if="showArchive"
          :biz-code="archiveBizCode"
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'آرشیو',
      name: 'UBuildingPoliceArchive',
      formKey: '59bd5650-016f-484e-8266-c015b430264d',
      main: true,
      baseLibResults: {},
      sidebarCompatible: true,
      showArchive: false,
      workflowCompatible: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedArchiveGrp: null,
      nidNosaziCode: null,
      archiveBizCode: ''
    }
  },

  // mounted () {
  //   if (this.selectedRequest) {
  //     this.fetched(value)
  //   }
  // },

  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    async fetched (value) {
      this.showArchive = true
      this.baseLibResults = value
      if (value.ArchiveWrapper) {
        this.selectedArchiveGrp = value.ArchiveWrapper.CI_ArchiveGroup
        this.nidNosaziCode = value.ArchiveWrapper.NidNosaziCode
        this.getArchiveWrapper()
        // this.updateArchiveBizCode(this.baseLibResults.ArchiveWrapper.BizCode);
      }
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
        const res = this.getResponse(data)
        if (res.success) {
          const str =
              convertNosaziCodeObjectToString(this.baseNosaziCode) ?? ""
          this.updateArchiveBizCode(str)
          await this.log({
            action: this.logActions.view,
            bizCode: str,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: str,
            saveDesc: `نمایش آرشیو پلیس ساختمان با کدنوسازی ${str} انجام گردید.`
          })
        }
      } catch (response) {
        this.serverError()
        console.log('error', response)
      } finally {
        this.hideLoading()
      }
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
            this.baseNosaziCode.District === 0
              ? 1
              : this.baseNosaziCode.District
        }
      }
    }
  }
}
</script>
