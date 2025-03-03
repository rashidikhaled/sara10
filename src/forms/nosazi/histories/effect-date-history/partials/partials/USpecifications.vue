<template>
  <fit>
    <safa-group :m="m" label-width="90px">
      <safa-combo
        v-model="engineerInfo.CI_HouseStatus"
        cdcName="HouseStatus"
        ciName="CI_HouseStatus"
        class="col-12 col-md-3 col-sm-4"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="وضعیت ملک"
        label-width="90px"
      ></safa-combo>
      <safa-combo
        v-model="engineerInfo.CI_GeoStatus"
        cdcName="GeoStatus"
        ciName="CI_GeoStatus"
        class="col-12 col-md-3 col-sm-4"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="موقعیت زمین"
        label-width="90px"
      ></safa-combo>
      <safa-combo
        v-model="engineerInfo.CI_HouseType"
        cdcName="HouseType"
        ciName="CI_HouseType"
        class="col-12 col-md-3 col-sm-4"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="نوع ملک"
        label-width="90px"
      ></safa-combo>
      <safa-custom-text
        v-model="engineerInfo.CurrentArea"
        :m="m"
        cdcName="CurrentArea"
        class="col-12 col-md-3 col-sm-4"
        label="مساحت وضع موجود"
        label-width="90px"
        type="decimal"
      />
      <safa-custom-text
        v-model="engineerInfo.DocArea"
        :m="m"
        cdcName="DocArea"
        class="col-12 col-md-3 col-sm-4"
        label="مساحت طبق سند"
        label-width="90px"
        type="decimal"
      />
      <safa-custom-text
        v-model="engineerInfo.GlasshouseArea"
        :m="m"
        cdcName="GlasshouseArea"
        class="col-12 col-md-3 col-sm-4"
        label="مساحت گلخانه"
        label-width="90px"
        type="decimal"
      />
      <safa-text
        v-model="engineerInfo.DeepShaftCount"
        cdcName="DeepShaftCount"
        class="col-12 col-md-3 col-sm-4"
        label="تعداد چاه"
        label-width="90px"
      />
      <safa-custom-text
        v-model="engineerInfo.PoolCubature"
        :m="m"
        cdcName="PoolCubature"
        class="col-12 col-md-3 col-sm-4"
        label="حجم استخر"
        label-width="90px"
        type="decimal"
      />
    </safa-group>
  </fit>
</template>

<script>
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  data () {
    return {
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
      }
    }
  },
  props: {
    value: Object,
    m: String,
    engineerInfo: {
      type: Object,
      default: () => ({
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
        UrbanityCode: null
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
    goToEditMode () {
      this.isGoToEdit = true

      this.editMode = 'e'

      // console.log('/////this.mode', this.mode)
    },
    goToReadonlyMode () {
      this.isGoToEdit = false

      this.editMode = 'r'
    },
    saveEngineerInfo () {
      // console.log('/////this.isNew', this.isNew)

      if (!this.isNew) {
        this.savePrequest.pEng.NidEng = this.engineerInfo.NidEng

        this.savePrequest.pEng.Sh_EngineerInfo = this.engineerInfo
      }

      this.showLoading()

      this.$services.SC.saveEngineerInfo(this.savePrequest, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async (response) => {
          if (response.data.BizErrors.length === 0) {
            this.showSuccess('عملیات با موفقیت انجام شد')
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
            this.goToReadonlyMode()
          }
        })
        .catch((ex) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
