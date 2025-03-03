<template>
  <!-- <safa-form :id="formKey" :caption="title"> -->
  <form-wrapper vertical :title="title">
    <template #header>
      <safa-status :result="getArchivesRes"/>
    </template>
    <fit>
      <div class="row">
        <safa-combo
          v-model="ciArchiveGroup"
          cdcName="CI_ArchiveGroup"
          ciName="CI_ArchiveGroup"
          domainName="CI_SaraM1"
          label="گروه آرشیو"
          label-width="70px"
          class="col-12 col-md-3 col-lg-3 col-sm-3"
        />
      </div>
      <div class="fit">
        <ArchiveWrap
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
        />
      </div>
    </fit>
  </form-wrapper>
  <!-- </safa-form> -->
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import kartableMixin from 'src/kartable/mixins/kartableMixin'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin, kartableMixin],
  data () {
    return {
      title: 'آرشیو اجرای احکام',
      name: 'UStatisticArchive',
      formKey: "681cc636-7fd9-49a5-a9b1-3dc680635402",
      main: true,

      ciArchiveGroup: 0,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      getArchivesRes: null,
      nidNosaziCode: null,
      archiveBizCode: ''
    }
  },
  mounted () {
    this.baseNosaziCode = convertStringToNosaziCodeObject(
      this.taskInfo.BizCode
    ) // "1-2-3-5-0-0-0"
    this.getArchives()
  },
  methods: {
    async getArchives () {
      this.showLoading()
      try {
        const { data } = await this.$services.commissions.getArchives({
          pNidCommission: this.selectedNidCommission
        })
        this.getArchivesRes = this.getResponse(data)
        if (this.getArchivesRes.success) {
          // this.model =
          //   this.getArchivesRes.data.GetArchivesResult.Commission_Archive
          this.getBaseLibInNosaziCode()
        }
      } catch (e) {
        this.serverError()
        console.error('error', e)
      } finally {
        this.hideLoading()
      }
    },

    getBaseLibInNosaziCode () {
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
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payload)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            if (res.data.ArchiveWrapper) {
              // this.ciArchiveGroup = res.data.ArchiveWrapper.CI_ArchiveGroup;
              this.nidNosaziCode = res.data.ArchiveWrapper.NidNosaziCode
              this.getArchiveWrapper()
            } else {
              this.showError(res.errors && res.errors[0].text)
            }
          }
        })
        .catch((err) => {
          console.log('error getBaseLibInNosaziCode', err)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async getArchiveWrapper () {
      try {
        this.showLoading()
        debugger
        const payLoad = {
          pNidNosaziCode: this.nidNosaziCode,
          pCI_ArchiveGroup: this.ciArchiveGroup
        }
        const { data } = await this.$services.SA.getArchiveWrapper(payLoad, {
          config: {
            District:
              this.baseNosaziCode.District === 0
                ? 1
                : this.baseNosaziCode.District
          }
        })
        const res = this.getResponse(data)
        if (res.success) {
          if (res.data.ArchiveWrapper) {
            this.updateArchiveBizCode(res.data.ArchiveWrapper.BizCode)
            await this.log({
              action: this.logActions.view,
              bizCode: res.data.ArchiveWrapper.BizCode,
              bizCodeArchive: res.data.ArchiveWrapper.BizCode,
              bizCodeTitle: 'BizCodeArchive',
              nosaziCode: this.taskInfo.BizCode
            })
          }
        }
      } catch (err) {
        console.log('error', err)
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
      return window.getConfigValue('archiveCommission')
    }
  },
  watch: {
    ciArchiveGroup: {
      handler () {
        this.getArchiveWrapper()
      },
      deep: true
    }
  }
}
</script>
