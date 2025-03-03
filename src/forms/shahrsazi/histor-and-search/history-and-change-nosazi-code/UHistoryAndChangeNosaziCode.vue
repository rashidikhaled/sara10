<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      :title="title"
      vertical
    >
      <fit>
        <nosazi-code-input
          v-model="baseNosaziCode"
          @enter="getBaseLibInNosaziCode"
          :actions="true"
          label="کد نوسازی"
          cdcName="baseNosaziCode"
        />
        <safa-datatable
          v-model="items"
          helper="nosaziCodeHistory"
          m="editMode"
          :allowMultipleSelection="false"
          :loadingAnimation="false"
          fit
          class="q-mt-sm"
          title="تاریخچه"
          paginate
          cdcName="nosaziCodeHistory"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
export default {
  route: 'history-search/history-change-nosazi',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تاریخچه تغییر و انتقال کد نوسازی',
      formKey: 'cb4911df-74c1-4b12-8a4f-f36d5c23bedc',
      name: 'UHistoryAndChangeNosaziCode',
      main: true,
      sidebarCompatible: true,
      loadPrequest: {
        pNosaziCode: ''
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      loadResult: {},
      items: [],
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
      fillGidPrequest: {
        pNidNosaziCode: null
      }
    }
  },
  components: {},
  mounted () {},
  methods: {
    loadFireFightingLog () {
      this.showLoading()
      this.$services.SC.loadFireFightingLog(this.loadPrequest, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.hideLoading()
          this.loadPrequest = this.getResponse(response.data)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          // let pNosaziCode = convertNosaziCodeObjectToString(this.loadPrequest.pNosaziCode)
          console.log(this.loadPrequest, 'this.loadPrequest')
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })

          // if (response.data.ErrorResult.BizErrors.length === 0) {
          //   this.showSuccess('عملیات با موفقیت انجام شد')
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
      this.getParcel()
    },
    getParcel () {
      this.loadPrequest.pNosaziCode =
        this.baseNosaziCode.District +
        '-' +
        this.baseNosaziCode.Region +
        '-' +
        this.baseNosaziCode.Block +
        '-' +
        this.baseNosaziCode.House +
        '-' +
        this.baseNosaziCode.Building +
        '-' +
        this.baseNosaziCode.Apartment +
        '-' +
        this.baseNosaziCode.Shop

      this.showLoading()
      this.$services.SC.getParcel(this.loadPrequest, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.hideLoading()

          this.loadResult = this.getResponse(response.data)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
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
    },
    getBaseLibInNosaziCode (e) {
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
          this.getBaseLibResult = this.getResponse(response.data)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })

          this.fillGidPrequest.pNidNosaziCode =
            this.getBaseLibResult.data.ArchiveWrapper.NidNosaziCode
          this.nosaziArray = e
          this.$services.SC.getBaseNidActionList(this.fillGidPrequest, {
            config: {
              District: 1
            }
          })
            .then(async (response) => {
              this.hideLoading()
              this.items = this.getResponse(
                response.data
              ).data.Base_NidActionList
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
