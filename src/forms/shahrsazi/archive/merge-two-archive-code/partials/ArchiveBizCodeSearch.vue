<template>
  <!-- <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  > -->
    <form-wrapper :padding="false" :title="title">
      <template #header>
        <safa-status :result="getArchiveWrapperRes"/>
        <safa-status :result="archiveWrapperRes"/>
      </template>
      <fit>
        <UNosaziCodeSearch
          :NosaziCode="baseNosaziCode"
          :formKey="formKey"
          :name="name"
          :selectable="true"
          :title="title"
          @selectNosaziCode="selectNosaziCode"
        />
      </fit>
    </form-wrapper>
  <!-- </safa-form> -->
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import UNosaziCodeSearch from '../../../histor-and-search/nosazi-code-search/UNosaziCodeSearch.vue'

export default {
  components: { UNosaziCodeSearch },
  mixins: [baseFormMixin],
  props: {
    baseNosaziCode: {
      type: Object,
      default: () => {
      }
    },
    selectedArchiveGrp: Number
  },

  data () {
    return {
      name: 'ArchiveBizCodeSearch',
      title: 'جستجوی کلید آرشیو',
      formKey: 'C4284638-4FBB-4d31-84DB-C5D6274DD0A4',
      main: true,
      sidebarCompatible: true,

      baseLibResults: { ArchiveWrapper: { BizCode: '' } },
      getArchiveWrapperRes: null,
      getBaseLibInNosaziCodeRes: null,
      archiveWrapperRes: null,
      selectedArchiveGroup: null,
      baseNosaziCode2: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      newOwnerName: '',
      newAddress: ''
    }
  },

  methods: {
    selectNosaziCode (selectNosaziCode) {
      this.baseNosaziCode2 = selectNosaziCode
      this.getBaseLibInNosaziCode()
    },

    getBaseLibInNosaziCode () {
      const payload = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode2.Apartment,
          Block: this.baseNosaziCode2.Block,
          Building: this.baseNosaziCode2.Building,
          CI_City: 0,
          District: this.baseNosaziCode2.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode2.House,
          IsRoot: false,
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
          NidRevisit: '00000000-0000-0000-0000-000000000000',
          NidUser: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode2.Region,
          Shop: this.baseNosaziCode2.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payload)
        .then(async ({ data }) => {
          this.getBaseLibInNosaziCodeRes = this.getResponse(data)
          if (this.getBaseLibInNosaziCodeRes.success) {
            this.baseLibResults = this.getBaseLibInNosaziCodeRes.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode2
            )
            if (this.baseLibResults.Base_Owner) {
              const x = this.baseLibResults.Base_Owner.map(
                (m) => m.OwnerName + ' ' + m.OwnerLastName
              ).toString()
              this.newOwnerName = x
              const y = this.baseLibResults.Base_Owner.map(
                (m) => m.Address
              ).toString()
              this.newAddress = y
            }
            if (this.baseLibResults.ArchiveWrapper) {
              this.selectedArchiveGroup =
                this.baseLibResults.ArchiveWrapper &&
                this.baseLibResults.ArchiveWrapper.CI_ArchiveGroup
            }
            await this.log({
              action: this.logActions.save,
              bizCode: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeArchive: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeTitle: 'BizCodeArchive',
              nosaziCode: strNosaziCode
            })
            this.getArchiveWrapper()
          }
        })
        .catch((err) => {
          this.serverError()
          console.error('error', err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getArchiveWrapper () {
      this.showLoading()
      let payLoad = {
        pNidNosaziCode:
          (this.baseLibResults.ArchiveWrapper &&
            this.baseLibResults.ArchiveWrapper.NidNosaziCode) ||
          '',
        pCI_ArchiveGroup: this.selectedArchiveGroup || this.selectedArchiveGrp
      }
      this.$services.SA.getArchiveWrapper(payLoad, {
        config: { District: this.baseNosaziCode2.District }
      })
        .then(async ({ data }) => {
          this.getArchiveWrapperRes = this.getResponse(data)
          if (this.getArchiveWrapperRes.success) {
            this.archiveWrapperRes = this.getArchiveWrapperRes.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode2
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              nosaziCode: strNosaziCode,
              bizCodeArchive:
                (this.archiveWrapperRes.ArchiveWrapper &&
                  this.archiveWrapperRes.ArchiveWrapper.BizCode) ||
                '',
              bizCodeTitle: 'کد نوسازی'
            })
            this.$emit('getNewBaseNosaziCode', {
              newOwnerName: this.newOwnerName,
              newAddress: this.newAddress,
              newBizCode: this.archiveWrapperRes.ArchiveWrapper.BizCode
            })
          }
        })
        .catch((err) => {
          this.serverError()
          console.log('error', err)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
