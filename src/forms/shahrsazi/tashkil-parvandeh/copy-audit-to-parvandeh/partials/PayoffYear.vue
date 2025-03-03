<template>
  <FormWrapper :hideTitle="hideTitle" :title="title">
    <safa-status  :result="result" />
    <fit>
      <!-- <section class="row justify-center items-center q-col-gutter-md"> -->
      <FormRow :xs="1" :sm="1" :lg="1" :md="1" :xl="1" class="q-mb-md">
        <FormControl>
          <nosazi-code-input label="کدنوسازی تشکیل پرونده:" label-width="100px" v-model="baseNosaziCodeAudit" actions
            @input="handleNosaziCodeChanged" />
        </FormControl>
        <FormControl>
          <safa-combo label="کد نوسازی:" label-width="100px"  source-type="local" use-input
            :options="nosaziCodeList" v-model="selectedNidFk" @input="handleSelectedNidFkChanged" />
        </FormControl>
        <FormControl>
          <safa-combo label="سال تسویه" label-width="100px"  ci-name="CI_DutyYear"
            domain-name="CI_SaraM1" v-model="ciDutyYear" />
        </FormControl>
        <FormControl>
          <safa-text label="سال تسویه ملک" label-width="100px"  m="r" :value="payoffYearHouse" />
        </FormControl>
        <FormControl>
          <safa-combo label="علت تسویه" label-width="100px"  ci-name="CI_DutyPayoffCause"
            domain-name="CI_SaraM1" v-model="ciPayoffCause" />
        </FormControl>
      </FormRow>
      <!-- </section> -->
    </fit>
    <template v-slot:footer>
      <btn-default label="تایید سال تسویه" @click="handleAcceptPayoffYear" class="q-mr-sm" />
      <btn-default label="حذف سال تسویه" @click="handleRejectPayoffYear" />
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'PayoffYear',

  data () {
    return {
      result: null,
      resultSave: null,
      selectedNidFk: null,
      ciDutyYear: 0,
      ciPayoffCause: 0,
      // baseNosaziCode: {
      //   District: 1,
      //   Region: 2,
      //   Block: 3,
      //   House: 4,
      //   Building: 0,
      //   Apartment: 0,
      //   Shop: 0
      // },
      baseLibInNosaziCode: null,
      codeInfoForNosazi: null,
      payoffData: null,
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      }
    }
  },
  mixins: [baseFormMixin],
  props: {
    hideTitle: Boolean,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCodeAudit: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCodeAudit.District
        }
      }
    },
    nosaziCodeList () {
      if (!this.codeInfoForNosazi || !this.codeInfoForNosazi['NickNameNids']) {
        return []
      }
      const list = this.codeInfoForNosazi['NickNameNids']
        .map((nickname, i) => ({
          Id: this.codeInfoForNosazi['NidList'][i],
          Title: nickname
        }))

      return list
    },
    payoffYearHouse () {
      return this.payoffData ? this.payoffData['CI_DutyYear_Payoff'] : 0
    }
  },

  methods: {
    async handleNosaziCodeChanged () {
      this.showLoading()
      try {
        let response = await this.$services.SA
          .getBaseLibInNosaziCode({
            pNosaziCode: {
              ...this.baseNosaziCodeAudit,
              ...this.options,
              NidUser: this.getNidUser()
            },
            pLoadFunc: 'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
            pIsLoadDeletedNosaziCode: false
          }, this.config)

        this.result = this.getResponse(response.data)
        if (!this.result.success) {
          this.showError('کد نوسازی معتبر نمیباشد')

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCodeAudit
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })

          return
        }
        this.baseLibInNosaziCode = this.result.data

        response = await this.$services.SC
          .getCodeInfoForNosazi({
            pDistrict: this.baseNosaziCodeAudit.District,
            pRegion: this.baseNosaziCodeAudit.Region,
            pBlock: this.baseNosaziCodeAudit.Block,
            pHouse: this.baseNosaziCodeAudit.House,
            pBuilding: this.baseNosaziCodeAudit.Building,
            pApartment: this.baseNosaziCodeAudit.Apartment,
            pShop: this.baseNosaziCodeAudit.Shop,
            pDutyType: 1, // 'Renovation',
            pEumNosaziCodeGroup: 0, // 'Parvande',
            pIncludeShop: false,
            pToCurrentObject: false,
            pIsLoadDeletedNosaziCode: false
          }, this.config)

        this.result = this.getResponse(response.data)
        if (!this.result.success) {
          this.showError('اطلاعات کد نوسازی بارگذاری نشد')

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCodeAudit
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })

          return
        }
        this.codeInfoForNosazi = this.result.data
      } catch (e) {
        console.error(e)
        this.showError('متاسفانه خطایی رخ داده است')
      } finally {
        this.hideLoading()
      }
    },

    async handleSelectedNidFkChanged () {
      this.payoffData = null
      if (!this.selectedNidFk) {
        return
      }
      try {
        this.showLoading()
        const response = await this.$services.SC
          .getPayOffYear({
            pNidFK: this.selectedNidFk,
            pSysCiDutyType: 1 // 'Renovation'
          }, this.config)

        this.result = this.getResponse(response.data)
        if (!this.result.success) {
          this.showError('اطلاعات سال تسویه بارگذاری نشد')

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCodeAudit
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })
          return
        }
        this.payoffData = this.result.data['PayOffYear'] || {}
        this.ciDutyYear = this.payoffData['CI_DutyYear'] || 0
      } catch (e) {
        console.error(e)
        this.showError('متاسفانه خطایی رخ داد')
      } finally {
        this.hideLoading()
      }
    },

    handleAcceptPayoffYear () {
      this.showConfirm('آیا از تایید سال تسویه اطمینان دارید؟')
        .onOk(() => {
          this.showLoading()
          this.$services.SC
            .setPayOffyear({
              pNidFK: this.selectedNidFk,
              PPayOffYear: this.ciDutyYear,
              PCI_DutyPayoffCause: this.ciPayoffCause,
              pSysCiDutyType: 1, // 'Renovation'
              pUserCode: this.getNidUser(),
              pUserName: this.getUserDisplayName(),
              pIsDeleted: true
            }, this.config)
            .then(async ({ data }) => {
              this.resultSave = this.getResponse(data)
              if (this.resultSave.success) {
                this.showSuccess('عملیات باموفقیت انجام شد')

                const strNosaziCode = convertNosaziCodeObjectToString(
                  this.baseNosaziCodeAudit
                )

                await this.log({
                  action: this.logActions.save,
                  bizCode: strNosaziCode,
                  bizCodeTitle: 'کد نوسازی',
                  nosaziCode: strNosaziCode
                })
              } else {
                this.showError('عملیات ناموفق بود')
              }
            })
            .catch(() => {
              this.showError('متاسفانه خطایی رخ داد')
            })
            .finally(() => {
              this.hideLoading()
            })
        })
    },
    handleRejectPayoffYear () {
      this.showConfirm('آیا از حذف سال تسویه اطمینان دارید؟')
        .onOk(() => {
          this.showLoading()
          this.$services.SC
            .setPayOffyear({
              pNidFK: this.selectedNidFk,
              PPayOffYear: 0, // this.ciDutyYear,
              PCI_DutyPayoffCause: 0, // this.ciPayoffCause,
              pSysCiDutyType: 1, // 'Renovation'
              pUserCode: this.getNidUser(),
              pUserName: this.getUserDisplayName(),
              pIsDeleted: true
            }, this.config)
            .then(async ({ data }) => {
              this.resultSave = this.getResponse(data)
              if (this.resultSave.success) {
                this.showSuccess('عملیات باموفقیت انجام شد')

                const strNosaziCode = convertNosaziCodeObjectToString(
                  this.baseNosaziCodeAudit
                )

                await this.log({
                  action: this.logActions.delete,
                  bizCode: strNosaziCode,
                  bizCodeTitle: 'کد نوسازی',
                  nosaziCode: strNosaziCode
                })
              } else {
                this.showError('عملیات ناموفق بود')
              }
            })
            .catch(() => {
              this.showError('متاسفانه خطایی رخ داد')
            })
            .finally(() => {
              this.hideLoading()
            })
        })
    }
  }
}
</script>
