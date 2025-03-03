<template>
  <safa-form
    :id="formKey"
    appId="ae980dcf-08ef-4ff0-be47-30e18a8dcb6e"
    caption="درآمد- درخواستهای بایگانی و ابطالی در بیمه"
  >
    <form-wrapper :title="title">
      <fit>
        <FormRow :lg="3" :md="2" :sm="1" :xl="4" class="q-mb-sm">
          <Form-Control>
            <safa-text
              v-model="model.insurance.WorkFlowCode"
              label="کد درخواست"
              label-width="80px"
              @keyup.enter="loadData"
            />
          </Form-Control>
          <Form-Control>
            <safa-datepicker
              v-model="model.insurance.CreateDate"
              label="از تاریخ"
              label-width="80px"
            />
          </Form-Control>
          <Form-Control>
            <safa-datepicker
              v-model="model.insurance.Todate"
              label="تا تاریخ"
              label-width="80px"
            />
          </Form-Control>
          <Form-Control>
            <safa-text
              v-model="model.insurance.WorkshopCode"
              label="کد کارگاه"
              label-width="80px"
              @keyup.enter="loadData"
            />
          </Form-Control>
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            class="col"
            label="کد نوسازی"
            label-width="80px"
            @enter="loadData"
          />
          <div class="flex justify-end q-gutter-sm items-center">
            <btn-search @click="loadData"/>
            <btn-delete label="پاک کردن" @click="reset"/>
            <btn-default label="بازآوری" @click="loadData"/>
          </div>
        </FormRow>
        <safa-grid
          v-model="allInsuranceList"
          :allowMultipleSelection="false"
          :paginate="true"
          fit
          height="100%"
          helper="allInsuranceList"
          m="r"
          maxHeight="100%"
          minHeight="100px"
          title="لیست درخواست های بایگانی و ابطال شده در بیمه"
          @row:click="selectedChange"
          :getRowClass="getRowClass"

        />
      </fit>

      <template #footer>
        <form-actions :showEditButton="false" m="r">
          <btn-default
            :disable="exitRevokeListStatus"
            label="خروج درخواست از حالت ابطال"
            spCaption="بیمه-خروج درخواست از حالت ابطال"
            spId="1c38ef85-6d50-420e-8000-467ff061ca72"
            @click="exitEbtal"
          />
          <btn-default
            :disable="exitBayganiListStatus"
            label="خروج درخواست از بایگانی"
            spCaption="بیمه-خروج درخواست از بایگانی"
            spId="dc80a609-4bbd-40c6-ae29-76b8bd5acc33"
            @click="exitBaygani"
          />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
const defaultModel = {
  WorkshopCode: '',
  WorkFlowCode: '',
  CreateDate: '',
  Todate: ''
}

import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import { currentDate, currentTime } from 'src/utils/index'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'بایگانی و ابطال',
      formKey: 'e5fa61a9-025e-4550-bc0b-67235c35405a',
      name: 'UArchivingAndCancellation',
      main: true,
      allInsuranceList: [],
      selectedRow: {},
      exitRevokeListStatus: false,
      exitBayganiListStatus: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      model: {
        insurance: { ...defaultModel }
      },
      tempKartabl: [],
      NidInsuranceFiche: '00000000-0000-0000-0000-000000000000',
      EumIncomeInsuranceState: {
        InsuraceLetter: 0,
        PaymentID: 1,
        ConfimeFirst: 2,
        ConfimeFinal: 3,
        Baygani: 4,
        IsDeleted: 5
      }
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.showLoading()
      let NosaziCodeStr = convertNosaziCodeObjectToString(this.baseNosaziCode)
      let conditionStr = ''
      if (NosaziCodeStr !== '0-0-0-0-0-0-0') {
        NosaziCodeStr = `NosaziCodeStr = '${NosaziCodeStr}'`
        conditionStr += ' AND ' + NosaziCodeStr
      }
      if (this.model.insurance.WorkFlowCode !== '') {
        let WorkFlowCode = 'WorkFlowCode = ' + this.model.insurance.WorkFlowCode
        conditionStr += ' AND ' + WorkFlowCode
      } else {
        this.model.insurance.WorkFlowCode = ''
      }
      if (this.model.insurance.WorkshopCode !== '') {
        let WorkshopCode =
          'WorkshopCode = ' + `'${this.model.insurance.WorkshopCode}'`
        conditionStr += ' AND  ' + WorkshopCode
      } else {
        this.model.insurance.WorkshopCode = ''
      }
      if (this.model.insurance.CreateDate !== '') {
        let CreateDate = `CreateDate BETWEEN '${this.model.insurance.CreateDate}' AND '${this.model.insurance.Todate}'`
        conditionStr += '  AND  ' + CreateDate
      } else {
        this.model.insurance.CreateDate = ''
      }
      // if (this.model.insurance.Todate !== "") {
      //   let Todate = `Todate = '${this.model.insurance.Todate}'`;
      //   conditionStr += " AND  " + Todate;
      // } else {
      //   this.model.insurance.Todate = "";
      // }
      const payload = {
        pFrom: 0,
        pTo: 50,
        pWhereCondition:
          `Where EumIncomeInsuranceState BETWEEN '4'AND '5' ` + conditionStr
      }
      this.$services.SQ.getAllInsurance(payload, this.config)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.allInsuranceList = res.data.GetAllInsuranceList
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getRowClass (params) {
      let row = params.data
      if (row.EumIncomeInsuranceState === 4) return "bg-green-2"
      if (row.EumIncomeInsuranceState === 5) return "bg-orange-5"

      return { background: "transparent" }
    },
    selectedChange (row) {
      if (row.data.EumIncomeInsuranceState === 4) {
        this.exitBayganiListStatus = false
        this.exitRevokeListStatus = true
      } else {
        this.exitBayganiListStatus = true
        this.exitRevokeListStatus = false
      }
      this.NidInsuranceFiche = row.NidInsuranceFiche
    },
    exitBaygani () {
      this.showConfirm('آیا تمایل به خروج درخواست از حالت بایگانی دارید؟').onOk(
        () => {
          this.changeStatusRequestInInsurance()
        }
      )
    },
    changeStatusRequestInInsurance () {
      this.showLoading()
      const payload = {
        pNidInsurance: this.NidInsuranceFiche,
        pInsuranceStatus: this.EumIncomeInsuranceState.InsuraceLetter,
        pStartDate: currentDate(),
        pStartTime: currentTime(),
        pNiduser: this.getNidUser(),
        pUsernameSender: this.getUserDisplayName()
      }
      this.$services.SQ.changeStatusRequestInInsurance(payload)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess('با موفقیت انجام شد')
            this.loadData()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    exitEbtal () {
      this.showConfirm(
        'آیا تمایل به برگشت درخواست به درخواست های جاری بیمه را دارید؟'
      ).onOk(() => {
        this.changeStatusRequestInInsurance()
      })
    },
    reset () {
      this.model = { insurance: { ...defaultModel } }
      this.baseNosaziCode.District = 0
      this.baseNosaziCode.Region = 0
      this.baseNosaziCode.Block = 0
      this.baseNosaziCode.Building = 0
      this.baseNosaziCode.Apartment = 0
      this.baseNosaziCode.Shop = 0
      this.baseNosaziCode.House = 0
      this.loadData()
    }
  }
}
</script>
