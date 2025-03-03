<template>
  <fit>
    <ArchiveWrap
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
    />
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      requestResult: {},
      items: [],
      nosaziCode: '0-0-0-0-0-0-0',
      getDiscountPrequest: {
        pRayanehCode: null,
        pNationalCode: null,
        pRequesterName: null,
        pDistrict: '0',
        pRegion: '0',
        pBlock: '0',
        pHouse: '0',
        pBuilding: '0',
        pApartment: '0',
        pShop: '0',
        pFromRow: '0',
        pToRow: '1000'
      },
      loadResult: {},
      getBaseLibPrequest: {
        pNosaziCode: {
          Apartment: '6',
          Block: '3',
          Building: '5',
          CI_City: '0',
          District: '1',
          EumBaseInfoGroup: '0',
          EumNosaziCodeGroup: '0',
          EumNosaziCodeObjType: '0',
          EumRevisitGroup: '0',
          House: '4',
          Id: 'null',
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
          NidRevisit: '00000000-0000-0000-0000-000000000000',
          NidUser: '00000000-0000-0000-0000-000000000000',
          ParentId: 'null',
          Region: '2',
          Shop: '7',
          UserName: 'null'
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: 'false'
      },
      // baseNosaziCode: {
      //   District: 0,
      //   Region: 0,
      //   Block: 0,
      //   House: 0,
      //   Building: 0,
      //   Apartment: 0,
      //   Shop: 0
      // },
      getBaseLibResult: {},
      baseOwner: {},
      archiveBizCode: ''
    }
  },
  props: {
    baseNosaziCode: Object,
    formKey: String,
    name: String,
    value: Object,
    editMode: {
      type: String,
      default: 'e'
    }
  },
  components: {},
  mounted () {
    // this.getAllDiscountList()
    // this.getCiArciveType()
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore')
    }
  },
  watch: {
    selectedArchiveGrp () {
      this.getArchiveWrapper()
    },
    baseNosaziCode: {
      deep: true,
      handler: function (baseNosaziCode) {
        this.handleBaseNosaziCodeChanged() //  alert('baseNosaziCode')
      }
    }
  },

  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    handleBaseNosaziCodeChanged () {
      // getBaseLibInNosaziCode method
      this.ownerName = ''
      this.oldNosaziCode = ''
      let data = {
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
          IsRoot: 'false',
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
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            if (this.baseLibResults.ArchiveWrapper) {
              this.selectedArchiveGrp =
                this.baseLibResults.ArchiveWrapper.CI_ArchiveGroup
            }
            this.updateArchiveBizCode(
              this.baseLibResults.ArchiveWrapper.BizCode
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeArchive: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeTitle: 'BizCodeArchive',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch((response) => {
          this.workflowListResult = this.getResponse(response)
          console.error(response, 'error')
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      this.isEditable = true
      this.isSearch = true
    },
    openNewTab () {
      // this.$emit('onEmitopenNewTab')
    },
    getAllDiscountList () {
      this.getDiscountPrequest.pDistrict = this.baseNosaziCode.District
      this.getDiscountPrequest.pRegion = this.baseNosaziCode.Region
      this.getDiscountPrequest.pBlock = this.baseNosaziCode.Block
      this.getDiscountPrequest.pHouse = this.baseNosaziCode.House
      this.getDiscountPrequest.pBuilding = this.baseNosaziCode.Building
      this.getDiscountPrequest.pApartment = this.baseNosaziCode.Apartment
      this.getDiscountPrequest.pShop = this.baseNosaziCode.Shop

      this.showLoading()
      this.$services.SC.getAllDiscountList(this.getDiscountPrequest, {
        config: {
          District: 1
        }
      })
        .then((response) => {
          this.hideLoading()
          this.loadResult = this.getResponse(response.data)
          // console.log('///this.loadResult', this.loadResult)

          // if (response.data.BizErrors.length === 0) {
          //   this.showSuccess('عملیات با موفقیت انجام شد')

          //   this.goToReadonlyMode()
          // }
        })
        .catch((error) => {
          console.error(error, 'error')
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    nosaziChanged (e) {
      this.getBaseLibInNosaziCode()
      // console.log('///NosaziChanged', e)
    },
    getBaseLibInNosaziCode () {
      this.getBaseLibPrequest.pNosaziCode.District =
        this.baseNosaziCode.District
      this.getBaseLibPrequest.pNosaziCode.Region = this.baseNosaziCode.Region
      this.getBaseLibPrequest.pNosaziCode.Block = this.baseNosaziCode.Block
      this.getBaseLibPrequest.pNosaziCode.House = this.baseNosaziCode.House
      this.getBaseLibPrequest.pNosaziCode.Building =
        this.baseNosaziCode.Building
      this.getBaseLibPrequest.pNosaziCode.Apartment =
        this.baseNosaziCode.Apartment
      this.getBaseLibPrequest.pNosaziCode.Shop = this.baseNosaziCode.Shop

      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(this.getBaseLibPrequest, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.hideLoading()
          this.baseOwner = this.getResponse(response.data).data.Base_Owner
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })
        })
        .catch((error) => {
          console.error(error, 'error')
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
