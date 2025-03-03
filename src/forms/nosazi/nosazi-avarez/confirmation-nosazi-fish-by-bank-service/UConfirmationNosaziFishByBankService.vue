<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
  <form-wrapper :title="title" :padding="true">
    <template #header>
      <safa-status :result="requestResult" />
      <safa-status :result="decodeAndConfirmViaWebServiceRes" />

    </template>
      <fit>
      <form-row>
        <form-control>
          <safa-combo
            v-model="model.regionName"
            :options="districts"
            :use-input="false"
            cdcName="selectedRegion"
            class="col"
            label="منطقه"
            label-width="75px"
            source-type="local"
            required
            validations="required"
          ></safa-combo>
        </form-control>
        <form-control>
          <safa-datepicker
            v-model="model.fromDate"
            cdcName="fromDate"
            label="از تاریخ"
            required
            validations="required"
          ></safa-datepicker>
        </form-control>
        <form-control>
          <safa-datepicker
            v-model="model.toDate"
            cdcName="toDate"
            label="تا تاریخ"
            required
            validations="required"
          ></safa-datepicker>
        </form-control>
      </form-row>
      <safa-datatable
        ref="grid"
        :allowCopy="false"
        :allowNewRow="false"
        :allowRemoveRow="false"
        :data-items="items"
        :columns="columns"
        cdcName="confirmFicheByBankWebService"
          v-model="recieptInfo"
        class="q-my-sm"
        fit
        height="100%"
        max-height="100%"

        title="تایید فیش نوسازی از طریق وب سرویس بانک"
      />
      <div
          :class="[
            'row q-gutter-x-sm q-mt-sm q-pa-sm',
            $q.dark.isActive ? 'bg-lighten4 text-white' : 'bg-green-1',
          ]"
        >
          <div style="min-width: 150px">
            <safa-label>کل: {{  }}</safa-label>
          </div>
          <div style="min-width: 150px">
            <safa-label>تایید شده: {{  }}</safa-label>
          </div>
          <div style="min-width: 150px">
            <safa-label
              >تایید شده از قبل: {{  }}</safa-label
            >
          </div>
          <div style="min-width: 150px">
            <safa-label>تایید نشده: {{  }}</safa-label>
          </div>
        </div>
      </fit>
      <template v-slot:footer>
        <form-actions
        :showEditButton="false"
        :showNewButton="false"
      >
        <btn-save label="تایید" @click="decodeAndConfirm" />
        <btn-cancel label="خروج" @click="exit" />
      </form-actions>

      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"

export default {

  mixins: [baseFormMixin],
  data () {
    return {
      title: "تایید فیش از طریق وب سرویس بانک",
      formKey: "396ed5ed-9ca6-44a3-8f9e-e52f688437dc",
      name: "UConfirmationNosaziFishByBankService",
      main: true,
      sidebarCompatible: true,
      columns: [
        { field: 'NosaziCode', title: 'کد نوسازی ' },
        { field: 'FicheNo', title: ' شماره فیش' },
        { field: 'BillID', title: ' شناسه قبض' },
        { field: 'PaymentID', title: ' شناسه پرداخت' },
        { field: 'Price', title: 'مبلغ فیش ', cell: 'grid-money-format' },
        { field: 'FishePaymentDate', title: 'تاریخ پرداخت فیش ', editor: 'date' },
        { field: 'AccountNo', title: ' شماره حساب' },
        { field: 'BranchNo', title: 'کد شعبه ' },
        { field: 'InValidMessage', title: ' توضیحات' }

      ],
      items: [],
      // regionItems: [
      //   { ID: 1, Title: 1 },
      //   { ID: 2, Title: 2 },
      //   { ID: 3, Title: 3 },
      //   { ID: 4, Title: 4 },
      //   { ID: 5, Title: 5 },
      //   { ID: 6, Title: 6 }
      // ],
      selectedRegion: "",
      decodeAndConfirmViaWebServiceRes: null,
      requestResult: {},
      recieptInfo: [],
      model: {
        regionName: "",
        fromDate: "",
        toDate: ""
      }
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  },
  methods: {
    async decodeAndConfirm () {
      if (!this.isValidForm()) return
      const payload = {
        pRegion: this.model.regionName,
        pStartDate: this.model.fromDate,
        pEndDate: this.model.toDate,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pSetPayOffForConfirmYearly: true,
        pSetPayOffForConfirmCollective: false,
        pDutyFicheType: 0
      }
      this.$services.SB.decodeAndConfirmViaWebService(payload, {
        config: {
          District: this.selectedRegion
        }
      }
      )
        .then(async ({ data }) => {
          this.decodeAndConfirmViaWebServiceRes = this.getResponse(data)
          if (this.decodeAndConfirmViaWebServiceRes.success) {
            this.recieptInfo =
                this.decodeAndConfirmViaWebServiceRes.data.DecodeAndConfirmViaWebServiceResult.ClsBankWebService.BankFileContract
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `عملیات جستجو بر اساس تاریخ و منطقه ${this.model.toDate}و${this.model.fromDate}و${this.model.regionName}`
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    //  async decodeAndConfirm () {
    //     try {
    //       if (!this.isValidForm()) return
    //       this.decodeAndConfirmPrequest.pRegion = this.selectedRegion
    //       this.decodeAndConfirmPrequest.pStartDate = this.formModel.fromDate
    //       this.decodeAndConfirmPrequest.pEndDate = this.formModel.toDate
    //       this.decodeAndConfirmPrequest.pUserCode = this.getNidUser()
    //       this.decodeAndConfirmPrequest.pUserName = this.getUserDisplayName()
    //       this.showSending()
    //       this.$services.SB.decodeAndConfirmViaWebService(
    //         this.decodeAndConfirmPrequest,
    //         {
    //           config: {
    //             District: this.selectedRegion
    //           }
    //         }
    //       ).then(async (response) => {
    //         this.hideSending()

    //         this.requestResult = this.getResponse(response.data)

    //         if (!this.requestResult.hasError) {
    //           await this.log({
    //             action: this.logActions.save,
    //             bizCode: this.selectedRegion.toString(),
    //             bizCodeTitle: "منطقه انتخاب شده"
    //           })
    //           this.showSuccess("عملیات با موفقیت انجام شد")
    //         }
    //       })
    //     } catch (error) {
    //       this.hideSending()

    //       this.showError(error.message)
    //     }
    //   },
    exit () {
      this.hideSidebar("UConfirmationNosaziFishByBankService")
      this.redirectToKartable()
    }
  }
}
</script>
