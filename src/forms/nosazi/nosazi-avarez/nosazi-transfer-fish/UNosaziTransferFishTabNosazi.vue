<template>
  <div class="row q-mt-sm q-col-gutter-md">
    <!-- کد نوسازی شروع -->
    <!-- {{engineerInfo.baseNosaziCode}} -->
    <div class="col-6">
      <safa-text
        v-model="engineerInfo.owner"
        label="نام مالک"
        m="r"
      />
    </div>
    <!-- {{engineerInfo.baseNosaziCode}} -->
    <div class="col-5">
      <nosazi-code-input
        v-model="engineerInfo.baseNosaziCode"
        @enter="getCodeInfo"
      >
      </nosazi-code-input>
    </div>

    <div class="col-12">
      <safa-text
        v-model="formModel.Base_AddressInfo.MainAddress"
        label="آدرس"
        m="r"
      />
    </div>
    <!-- {{engineerInfo.FicheCount}} -->
    <div class="col-2">
      <safa-text
        v-model="engineerInfo.FicheCount
"
        label="تعداد فیش"
        m="r"
      />
    </div>

    <!-- کد نوسازی پایان -->

    <!-- فیش -->
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      formModel: { FicheCount: 0, Base_AddressInfo: { MainAddress: '' } },
      tab: 'nosazi',
      activeTab: 'baroKafInfo',

      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: true,
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
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      selectedRegion: 1
    }
  },
  props: {
    value: Object,
    m: String,
    // engineerInfo.FicheCount
    engineerInfo: {
      type: Object,
      default: () => ({
        FicheCount: 0,
        Base_AddressInfo: { MainAddress: '' },
        FicheNo: '',
        pPaymentID: '',
        pBillID: '',
        CI_Ability: 0,
        CI_EngStudyField: 0,
        CommitmentNo: null,
        CommitmentSupervisionDate: null,
        CommitmentSupervisionNo: null,
        ControllerCode: null,
        ControllerFamily: null,
        ControllerName: null,
        EngBase: null,
        JobAgreement: null,
        MembershipNo: null,
        NidEng: '',
        TotalCount: 0,
        UrbanityCode: null,
        baseNosaziCode: {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
      })
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.isNew) {
      this.engineerInfo.CI_Ability = 0
      this.engineerInfo.CI_EngStudyField = 0
      this.engineerInfo.CommitmentNo = null
      this.engineerInfo.CommitmentSupervisionDate = null
      this.engineerInfo.CommitmentSupervisionNo = null
      this.engineerInfo.ControllerCode = null
      this.engineerInfo.ControllerFamily = null
      this.engineerInfo.ControllerName = null
      this.engineerInfo.EngBase = null
      this.engineerInfo.JobAgreement = null
      this.engineerInfo.MembershipNo = null
      this.engineerInfo.NidEng = ''
      this.engineerInfo.TotalCount = 0
      this.engineerInfo.UrbanityCode = null
    }
  },
  methods: {
    SetOwner (baseOwner, pTextBox) {
      pTextBox = ''
      for (let index = 0; index < baseOwner.length; index++) {
        // const element = baseOwner[index]
        if (baseOwner[index].OwnerName || baseOwner[index].OwnerLastName) {
          if (!pTextBox === '') {
            pTextBox += ', '
          }
          pTextBox += baseOwner[index].OwnerName + ' ' + baseOwner[index].OwnerLastName
        }
      }
      return pTextBox
      //   baseOwner.forEach(item => {
      //     if (item.OwnerName || item.OwnerLastName) {
      //       if (!pTextBox === '') {
      //         pTextBox += ', '
      //       }
      //       pTextBox.Value += item.OwnerName + ' ' + item.OwnerLastName
      //     }
      //   })
    },
    getCodeInfo () {
      try {
        this.showLoading()
        this.$services.SB.getCodeInfo({
          pDistrict: this.engineerInfo.baseNosaziCode.District,
          pRegion: this.engineerInfo.baseNosaziCode.Region,
          pBlock: this.engineerInfo.baseNosaziCode.Block,
          pHouse: this.engineerInfo.baseNosaziCode.House,
          pBuilding: this.engineerInfo.baseNosaziCode.Building,
          pApartment: this.engineerInfo.baseNosaziCode.Apartment,
          pShop: this.engineerInfo.baseNosaziCode.Shop
        }).then(response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data
            if (this.formModel.Base_Owner) {
              this.engineerInfo.owner = this.SetOwner(this.formModel.Base_Owner)
            }

            this.getDutyFiches(this.formModel.NidList)
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    getDutyFiches (NidList) {
      try {
        this.showLoading()
        this.$services.SB.getDutyFiches({
          pNidList: NidList,
          pSysCiDutyType: 1,
          pUnLoadCancelFiches: false
        }).then(response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            // this.formModel = this.requestResult.data
            this.formModel.DutyFiches = this.requestResult.data.DutyFiches
            this.engineerInfo.FicheCount = this.formModel.DutyFiches.length
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    GetFicheByFicheNo () {
      if (this.engineerInfo.FicheNo === '') {
        this.showError('شماره فیش وارد نشده است')
      }

      try {
        this.showLoading()
        this.$services.SB.getDutyFicheByFicheNo({
          pFicheNo: this.engineerInfo.FicheNo,
          pPaymentID: this.engineerInfo.PaymentID,
          pBillID: this.engineerInfo.BillID
        }).then(response => {
          this.hideLoading()
          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data
            if (this.formModel.Duty_FicheByFicheNo === null) {
              this.showError('فیشی با این مشخطات یافت نشد')
            }
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    saveEngineerInfo () {
      // console.log('/////this.isNew', this.isNew)

      if (!this.isNew) {
        this.savePrequest.pEng.NidEng = this.engineerInfo.NidEng

        this.savePrequest.pEng.Sh_EngineerInfo = this.engineerInfo
      }

      this.$q.loading.show()
      this.$services.SC.saveEngineerInfo(this.savePrequest, {
        config: {
          District: 1
        }
      })
        .then(response => {
          this.$q.loading.hide()

          if (response.data.BizErrors.length === 0) {
            this.showSuccess('عملیات با موفقیت انجام شد')

            this.isEditable = false
          }
        })
        .catch(ex => {
          this.$q.dialog({
            title: 'خطا در سرور',
            message: ex.message
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.splitter {
  color: green;
}
</style>
