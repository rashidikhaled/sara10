<template>
  <fit>
    <safa-status :result="requestResult"/>
    <div class="q-mb-sm">
      <div class="row q-col-gutter-md ">
        <safa-combo
          v-model="region"
          :label-width="$q.screen.gt.sm ? 'auto' : '90px'"
          :options="districts"
          :use-input="false"
          cdcName="region"
          class="col-12 col-sm-4 col-md-auto"
          dir="ltr"
          label="منطقه"
          source-type="local"
          style="min-width: 120px;"
        ></safa-combo>

        <safa-text
          v-model="fishNo"
          :label-width="$q.screen.gt.sm ? 'auto': '90px'"
          :style="$q.screen.gt.sm ? 'max-width: 200px;':''"
          cdcName="fishNo"
          class="col-12 col-sm-4 col-md-auto"
          dir="ltr"
          label="شماره فیش"
          subtext="(آغاز شود با)"
          @keyup.enter="searchData"
        />

        <safa-text
          v-model="shenaseGhabz"
          :label-width="$q.screen.gt.sm ? 'auto': '90px'"
          :style="$q.screen.gt.sm ? 'max-width: 200px;':''"
          cdcName="shenaseGhabz"
          class="col-12 col-sm-4 col-md-auto"
          dir="ltr"
          label="شناسه قبض"
          subtext="(آغاز شود با)"
          @keyup.enter="searchData"
        />

        <safa-text
          v-model="shenasePardakht"
          :label-width="$q.screen.gt.sm ? 'auto': '90px'"
          :style="$q.screen.gt.sm ? 'max-width: 200px;':''"
          cdcName="shenasePardakht"
          class="col-12 col-sm-4 col-md-auto"
          dir="ltr"
          label="شناسه پرداخت"
          subtext="(آغاز شود با)"
          @keyup.enter="searchData"
        />
        <safa-custom-text
          v-model="price"
          :label-width="$q.screen.gt.sm ? 'auto': '90px'"
          :style="$q.screen.gt.sm ? 'max-width: 200px;':''"
          cdcName="price"
          class="col-12 col-sm-4 col-md-auto"
          dir="ltr"
          label="مبلغ قابل پرداخت"
          subtext="(آغاز شود با)"
          type="money"
          @keyup.enter="searchData"
        />
        <div class="col-12 col-sm-4 col-md-auto">
          <btn-search
            :class="$q.screen.gt.xs ? '': 'full-width'"
            label="جستجو"
            @click="searchData"
          />
        </div>
      </div>
    </div>
    <!-- <div style="min-height: 160px;"> -->
      <div class="fit q-pb-sm">
        <safa-datatable
          ref="grid"
          v-model="formModel.Duty_Fiche"
          :allowCopy="false"
          cdcName="searchCheckUnconfirmationFishes"
          fit
          height="100%"
          helper="nosazi.searchCheckUnconfirmationFishes"
          max-height="100%"
          name="grid"
          title="فیش ها"
          @selectedChange="selectedChange"
        ></safa-datatable>
      </div>
    <!-- </div> -->
    <div class="row q-gutter-x-sm">
      <safa-text
        v-model="fishCount"
        cdcName="fishCount"
        label="تعداد"
      />
      <btn-default
        label="ویرایش فایل بانکی"
        @click="editFileBank"
      />
    </div>

    <!-- <div class="q-pa-md">

    </div> -->
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import searchDataResponse from '../models/searchDataResponse.js'

export default {
  data () {
    return {
      region: 1,
      fishNo: '',
      shenaseGhabz: '',
      shenasePardakht: '',
      price: '',
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
      selectedRegion: 1,
      requestResult: {},
      searchPrequest: {
        pWhere: ''
      },
      searchFormModels: {
        region: '1',
        fishNo: '',
        shenaseGhabz: '',
        shenasePardakht: '',
        price: ''
      },
      formModel: searchDataResponse,
      fishCount: 0,
      selectedGridRow: null
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  mixins: [baseFormMixin],
  props: {
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
    }
  },
  methods: {
    searchData () {
      try {
        let queryBuilder = []
        let preQuery = 'Where'
        let postQuery = ''
        this.searchFormModels.region = this.region
        this.searchFormModels.fishNo = this.fishNo
        this.searchFormModels.shenaseGhabz = this.shenaseGhabz
        this.searchFormModels.price = this.price

        if (
          !this.searchFormModels.region &&
          !this.searchFormModels.fishNo &&
          !this.searchFormModels.shenaseGhabz &&
          !this.searchFormModels.shenasePardakht &&
          !this.searchFormModels.price
        ) {
          this.showError('لطفا آیتم های جستجو را وارد نمایید')

          return
        }

        if (this.searchFormModels.region) {
          queryBuilder.push(`EumDutyType=${this.searchFormModels.region}`)
        }
        if (this.searchFormModels.fishNo) {
          queryBuilder.push(`FicheNo Like '${this.searchFormModels.fishNo}%'`)
        }
        if (this.searchFormModels.shenaseGhabz) {
          queryBuilder.push(
            `BillID Like '${this.searchFormModels.shenaseGhabz}%'`
          )
        }
        if (this.searchFormModels.shenasePardakht) {
          queryBuilder.push(
            `PaymentID Like'${this.searchFormModels.shenasePardakht}%'`
          )
        }
        if (this.searchFormModels.price) {
          queryBuilder.push(
            `PayablePrice Like'${this.searchFormModels.price}%'`
          )
        }

        // console.log('queryBuilder', queryBuilder)
        // if (this.searchFormModels.price === '') {
        //   whereClause = `Where EumDutyType = ${this.searchFormModels.region} And FicheNo Like'${this.searchFormModels.fishNo}%' And BillID Like'${this.searchFormModels.shenaseGhabz}%' And PaymentID Like'${this.searchFormModels.shenasePardakht}%'`
        // } else {
        //   whereClause = `Where EumDutyType = ${this.searchFormModels.region} And FicheNo Like'${this.searchFormModels.fishNo}%' And BillID Like'${this.searchFormModels.shenaseGhabz}%' And PaymentID Like'${this.searchFormModels.shenasePardakht}%' And PayablePrice = ${this.searchFormModels.price}`
        // }

        // whereClause = `Where EumDutyType = ${this.searchFormModels.region} And FicheNo Like'${this.searchFormModels.fishNo}%'`

        // if (!this.searchFormModels.region) {
        //   whereClause = `Where EumDutyType = ${this.searchFormModels.region}`
        // } else if (!this.searchFormModels.fishNo) {
        //   whereClause = `Where FicheNo Like'${this.searchFormModels.fishNo}%'`
        // } else if (!this.searchFormModels.shenaseGhabz) {
        //   whereClause = `Where BillID Like'${this.searchFormModels.shenaseGhabz}%'`
        // } else if (!this.searchFormModels.shenasePardakht) {
        //   whereClause = `Where PaymentID Like'${this.searchFormModels.shenasePardakht}%'`
        // } else if (!this.searchFormModels.region) {
        //   whereClause = `Where EumDutyType = ${this.searchFormModels.region} And FicheNo Like'${this.searchFormModels.fishNo}%' And BillID Like'${this.searchFormModels.shenaseGhabz}%' And PaymentID Like'${this.searchFormModels.shenasePardakht}%' And PayablePrice = ${this.searchFormModels.price}`
        // }

        // // console.log('////////////whereClause', whereClause)
        this.searchPrequest.pWhere = `${preQuery} ${queryBuilder.join(
          ' AND '
        )} ${postQuery}`
        // console.log('pWhere', this.searchPrequest.pWhere)
        this.showLoading()
        this.$services.SB.getDutyFicheForBankFile(this.searchPrequest, {
          config: {
            District: this.region
          }
        }).then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          await this.log({
            action: this.logActions.view,
            bizCode: this.fishNo,
            bizCodeTitle: 'fishNo'
          })

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            this.fishCount = this.formModel.Duty_Fiche.length

            if (this.formModel.Duty_Fiche.length === 0) {
              this.showError('فیش با این مشخصات پیدا نشد')
            }
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
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

      this.$q.loading.show()
      this.$services.SC.saveEngineerInfo(this.savePrequest, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.$q.loading.hide()

          if (response.data.BizErrors.length === 0) {
            this.showSuccess('عملیات با موفقیت انجام شد')

            await this.log({
              action: this.logActions.save,
              bizCode: this.engineerInfo.NidEng,
              bizCodeTitle: 'NidEng'
            })
            this.goToReadonlyMode()
          }
        })
        .catch((ex) => {
          this.$q.dialog({
            title: 'خطا در سرور',
            message: ex.message
          })
        })
    },
    selectedChange (e) {
      this.selectedGridRow = e.dataItem
    },
    editFileBank () {
      this.showConfirm('آیا از ویرایش فایل بانکی اطمینان دارید؟').onOk(() => {
        // console.log('///////this.formModel', this.formModel)

        // console.log('///////this.selectedGridRow', this.selectedGridRow)

        if (!this.selectedGridRow) {
          this.showError('لطفا یک ردیف را انتخاب نمایید')

          return
        } else {
          if (this.selectedGridRow.EumDutyFicheStatus === 4) {
            this.showError('فیش قبلا تایید شده')

            return
          } else if (
            this.formModel.Duty_Fiche[0].PayablePrice ===
            this.selectedGridRow.PayablePrice
          ) {
            this.showError('مبلغ فیش با مبلغ فیش در فایل بانکی متفاوت است')

            return
          }
        }

        return true
      })
    }
  }
}
</script>
