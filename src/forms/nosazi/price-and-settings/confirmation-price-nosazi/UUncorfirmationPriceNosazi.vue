<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper
      :hasFooter="false"
      :title="title"
    >
    <template #header>
      <safa-status :result="requestResult"/>
      </template>
      <fit>
        <div class="row q-col-gutter-lg items-center">
          <!-- دسته اطلاعاتی در مشهد وجود ندارد -->
          <div class="col-12 col-sm-auto col-md-3">
            <safa-combo
              v-if="isShowBaseInfoGroupCombo"
              v-model="selectedItem"
              :options="infoGroupOptions"
              label="دسته اطلاعاتی"
              source-type="local"
              @input="infoGroupChange"
            >
            </safa-combo>
          </div>
          <!-- <div class="col-12 col-sm-auto col-md-auto">
            <safa-label>کد نوسازی :</safa-label>
          </div> -->
          <div class="col-12 col-sm-auto col-md-auto ">
            <nosazi-code-input
              v-model="baseNosaziCode"
              cdcName="baseNosaziCode"
              @enter="loadData"
            >
            </nosazi-code-input>
          </div>
        </div>
        <safa-datatable
          ref="grid"
          v-model="formModel.Sh_EconomicPriceInNosaziCode"
          :hide-toolbar="true"
          :loadingAnimation="false"
          :m="mode"
          cdcName="notCorfirmationsPrice"
          class="q-mt-sm"
          fit
          height="100%"
          helper="nosazi.notCorfirmationsPrice"
          max-height="100%"
          name="grid"
          title='قیمت منطقه ای تایید نشده بر اساس کد نوسازی'
          @selectedChange="selectedChange"
        ></safa-datatable>

      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/price-settings/unconfirmation-price-nosazi',
  // cleanRows
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'قیمت منطقه ای تایید نشده بر اساس کد نوسازی',
      formKey: '013cc4d5-46e5-4fa1-a3ea-07b46a0a8b18',
      name: 'UUncorfirmationPriceNosazi',
      main: true,
      selectedItem: 0,
      infoGroupItems: [
        {
          ID: 0,
          title: 'اطلاعات پرونده'
        },
        {
          ID: 100,
          title: 'نوسازی'
        }
      ],
      NidBase: null,
      mode: 'r',
      formActionEditMode: 'r',
      editMode: 'r',
      isShowModal: false,
      isEditable: false,
      shEconomicPriceInNosaziCodeIsSelcted: { NidEconomic: null },
      baseNosaziCode: {},
      formModel: {
        Sh_EconomicPriceInNosaziCode: [],
        Base_AddressInfo: { MainAddress: '' }
      },
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: false,
      items: [],
      savePrequest: {
        pEng: {
          EngineerInfo_List: null,
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          },
          NidEng: '00000000-0000-0000-0000-000000000000',
          Sh_EngineerInfo: {
            CI_Ability: '6',
            CI_EngStudyField: '2',
            CommitmentNo: '11',
            CommitmentSupervisionDate: '1399/01/07',
            CommitmentSupervisionNo: '12',
            ControllerCode: '456',
            ControllerFamily: 'سمیعی',
            ControllerName: 'مجید',
            EngBase: 'پایه',
            JobAgreement: '789',
            MembershipNo: '10',
            NidEng: '00000000-0000-0000-0000-000000000000',
            UrbanityCode: '123'
          }
        }
      },

      // formActionEditMode: 'r',
      loadDataPrequest: {
        pDistrict: '0',
        pRegion: '0',
        pBlock: '0',
        pHouse: '0',
        pBuilding: '0',
        pApartment: '0',
        pShop: '0',
        pDutyType: '0',
        pEumNosaziCodeGroup: '0',
        pEumBaseInfoGroup: '0'
      }
    }
  },
  computed: {
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').isShowBaseInfoGroupCombo
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').infoGroupOptions
    }
  },
  methods: {
    SavePrices () {
      try {
        this.showLoading()
        this.$services.SB.savePrices({
          pClsDutyPrice: {
            Sh_EconomicPriceInNosaziCode: this.formModel.Sh_EconomicPriceInNosaziCode.cleanRows(),
            _NidBase: this.NidBase
          },
          pUserCode: 'e4f32c98-cb86-4907-9c7b-b0a26a5d827a',
          pFullUserName: 'uitest تست (uitest)',
          pUserName: 'uitest'
        }).then(async response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            // this.formModel = this.requestResult.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.showSuccess('باموفقیت ذخیره شد')
            this.goToReadonlyMode()
          } else {
            this.showError(this.requestResult.data.ErrorResult.BizErrors[0])
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    selectedChange (e) {
      this.shEconomicPriceInNosaziCodeIsSelcted = e.dataItem
    },
    loadData () {
      // Sh_EconomicPriceInNosaziCode
      try {
        this.loadDataPrequest.pDistrict = this.baseNosaziCode.District
        this.loadDataPrequest.pRegion = this.baseNosaziCode.Region
        this.loadDataPrequest.pBlock = this.baseNosaziCode.Block
        this.loadDataPrequest.pHouse = this.baseNosaziCode.House
        this.loadDataPrequest.pBuilding = this.baseNosaziCode.Building
        this.loadDataPrequest.pApartment = this.baseNosaziCode.Apartment
        this.loadDataPrequest.pShop = this.baseNosaziCode.Shop
        this.loadDataPrequest.pEumBaseInfoGroup = this.selectedItem

        this.showLoading()

        this.$services.SB.getNidBase(this.loadDataPrequest, {
          config: {
            District: this.selectedDistrict
          }
        }).then(async response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            if (this.requestResult.data.NidBase) {
              this.NidBase = this.requestResult.data.NidBase
              this.getEconomicPriceInNosaziCode(
                this.requestResult.data.NidBase
              )
            }
            this.requestR.data.Sh_EconomicPriceInNosaziCode = this.loadFormModel(
              this.requestResult.data.NidBase
            )
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },

    getEconomicPriceInNosaziCode (pNidBase) {
      // Sh_EconomicPriceInNosaziCode
      try {
        this.loadDataPrequest.pNidBase = pNidBase

        this.showLoading()

        this.$services.SB.getEconomicPriceInNosaziCode(this.loadDataPrequest, {
          config: {
            District: this.selectedDistrict
          }
        }).then(async response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel.Sh_EconomicPriceInNosaziCode = this.requestResult.data.Sh_EconomicPriceInNosaziCode

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            // this.requestR.data.Sh_EconomicPriceInNosaziCode = this.loadFormModel(
            //   this.requestResult.data.NidBase
            // )
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    confirmShEconomicPriceInNosaziCode () {
      // Sh_EconomicPriceInNosaziCode
      try {
        this.loadDataPrequest.pNidEconomic = this.shEconomicPriceInNosaziCodeIsSelcted.NidEconomic

        this.showLoading()
        this.$services.SB.confirmShEconomicPriceInNosaziCode(
          this.loadDataPrequest,
          {
            config: {
              District: 1
            }
          }
        ).then(response => {
          this.hideLoading()
          this.isShowModal = false
          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.showSuccess('با موفقیت تایید شد')
            this.shEconomicPriceInNosaziCodeIsSelcted.NidEconomic = null
            // this.formModel.Sh_EconomicPriceInNosaziCode = this.requestResult.data.Sh_EconomicPriceInNosaziCode
            // this.requestR.data.Sh_EconomicPriceInNosaziCode = this.loadFormModel(
            //   this.requestResult.data.NidBase
            // )
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },

    loadFormModel (nidBase) {
      try {
        const loadDataRequest = {
          pNidBase: '546f0e76-3642-428d-9132-65f2e3944914'
        }

        loadDataRequest.pNidBase = nidBase

        this.showLoading()

        this.$services.SB.getEconomicPriceInEdge(loadDataRequest, {
          config: {
            District: this.selectedDistrict
          }
        }).then(async response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    // saveData () {
    //   try {
    //     savePrequest.pClsDutyPrice.Sh_EconomicPriceInEdge = this.formModel.Sh_EconomicPriceInEdge

    //     savePrequest.pClsDutyPrice._NidBase = this.formModel._NidBase

    //     savePrequest.pClsDutyPrice.pUserCode = this.getNidUser()

    //     savePrequest.pClsDutyPrice.pUserName = this.getUserDisplayName()

    //     savePrequest.pClsDutyPrice.Sh_EconomicPriceInEdge =
    //     savePrequest.pClsDutyPrice.Sh_EconomicPriceInEdge.cleanRows()

    //     this.showSending()
    //     this.$services.SB.savePrices(savePrequest, {
    //       config: {
    //         District: 1
    //       }
    //     }).then(response => {
    //       this.hideSending()

    //       this.requestResult = this.getResponse(response.data)

    //       if (!this.requestResult.hasError) {
    //         this.showSuccess('عملیات با موفقیت انجام شد')

    //         this.goToReadonlyMode()

    //         this.loadData()
    //       }
    //     })
    //   } catch (error) {
    //     this.hideSending()

    //     this.showError(error.message)
    //   }
    // },
    goToEditMode () {
      this.mode = 'e'

      this.formActionEditMode = 'e'

      this.editMode = 'e'

      this.isEditable = true
    },
    goToReadonlyMode () {
      this.formActionEditMode = 'r'

      this.editMode = 'r'
      this.mode = 'r'

      this.isEditable = false
    },
    infoGroupChange (e) {
      this.loadData()
    }
  }
}
</script>

<style lang="stylus" scoped>
.splitter {
  color: green;
}
</style>
