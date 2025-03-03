<!-- eslint-disable indent -->
<template>
  <fit>
    <safa-status :result="getBaseLibInNosaziCodeRes"/>
    <safa-status :result="getArchiveWrapperRes"/>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="گروه آرشیو"
          ciName="CI_ArchiveGroup"
          domainName="CI_SaraM1"
          label-width="60px"
          v-model="selectedArchiveGrp"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کلید آرشیو"
          v-model="baseLibResults.ArchiveWrapper.BizCode"
          label-width="60px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک ثبتی"
          label-width="60px"
          v-model="baseLibResults.Base_RegisterPlack_Str"
        />
      </FormControl>
    </FormRow>
    <div class="fit">
      <ArchiveWrap
        ::biz-code="archiveBizCode"
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        style="min-height: 300px"
      />
    </div>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  props: { value: Object },

  data () {
    return {
      archiveBizCode: '',
      title: 'آرشیو تاریخچه تجمیع براساس درخواست',
      name: 'ArchiveForm',
      formKey: '4ab33ba3-67ee-415e-bb68-db5b53d66566',
      main: true,

      getBaseLibInNosaziCodeRes: null,
      getArchiveWrapperRes: null,
      selectedArchiveGrp: null,
      nidNosaziCode: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResults: {
        ArchiveWrapper: {}
      }
    }
  },

  async mounted () {
    if (!this.value) return
    this.baseNosaziCode = this.value
    console.log('conf', window.getConfigValue('archiveCore'))
    await this.loadObj()
  },

  methods: {
    async loadObj () {
      try {
        const payload = {
          pNosaziCode: {
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            CI_City: 0,
            District: this.baseNosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: this.baseNosaziCode.House,
            IsRoot: false,
            NidBase: '00000000-0000-0000-0000-000000000000',
            NidNosaziCode: '00000000-0000-0000-0000-000000000000',
            Region: this.baseNosaziCode.Region,
            Shop: this.baseNosaziCode.Shop
          },
          pLoadFunc:
            'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo',
          pIsLoadDeletedNosaziCode: true
        }
        this.showLoading()
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payload,
          this.config
        )
        this.getBaseLibInNosaziCodeRes = this.getResponse(data)
        if (this.getBaseLibInNosaziCodeRes.success) {
          this.baseLibResults = this.getBaseLibInNosaziCodeRes.data
          if (this.baseLibResults.ArchiveWrapper) {
            this.archiveBizCode = this.baseLibResults.ArchiveWrapper.BizCode
            this.selectedArchiveGrp =
              this.baseLibResults.ArchiveWrapper.CI_ArchiveGroup
            this.nidNosaziCode =
              this.baseLibResults.ArchiveWrapper.NidNosaziCode
            // await this.getArchiveWrapper()
          }
        }
      } catch (e) {
        console.log('error', e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async getArchiveWrapper () {
      try {
        this.showLoading()
        console.log('nidNosaziCode', this.nidNosaziCode)
        const payLoad = {
          pNidNosaziCode: this.nidNosaziCode,
          pCI_ArchiveGroup: this.selectedArchiveGrp
        }
        const { data } = await this.$services.SA.getArchiveWrapper(
          payLoad,
          this.config
        )
        this.getArchiveWrapperRes = this.getResponse(data)
        if (this.getArchiveWrapperRes.success) {
          this.archiveBizCode = this.getArchiveWrapperRes.data.ArchiveWrapper.BizCode
        }
      } catch (e) {
        console.log('error', e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore')
    },
    config () {
      return {
        config: { District: this.baseNosaziCode.District }
      }
    }
  }

  // watch: {
  //   selectedArchiveGrp () {
  //     if (this.nidNosaziCode) {
  //       this.getArchiveWrapper()
  //     }
  //   }
  // }
}
</script>
