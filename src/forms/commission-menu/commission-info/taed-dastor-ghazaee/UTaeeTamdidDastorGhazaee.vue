<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <fit>
      <div class="row items-center q-gutter-x-md q-mb-md flex justify-end">
        <div class="col-auto">
          <nosazi-code-input
            m="r"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            :actions="false"
            label-width="120px"
          />
        </div>
      </div>
      <!-- </div> -->
      <form-row class="q-mb-sm">
        <form-control>
          <safa-datepicker
            label="تاریخ تائید دستور تمدید"
            label-width="120px"
            :m="mode"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy
                .RenewalConfirmDate
            "
            cdcName="RenewalConfirmDate"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            clearable
            label="تاریخ دستور"
            label-width="120px"
            m="r"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy.OrderDate
            "
            cdcName="OrderDate"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            clearable
            label="تاریخ تقاضای تمدید"
            label-width="120px"
            m="r"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy
                .RenewalRequestDate
            "
            cdcName="RenewalRequestDate"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره تایید دستور تمدید"
            label-width="120px"
            :m="mode"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy
                .RenewalConfirmNumber
            "
            cdcName="RenewalConfirmNumber"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره دستور"
            label-width="120px"
            m="r"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy.OrderNumber
            "
            cdcName="OrderNumber"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره تقاضای تمدید"
            label-width="120px"
            m="r"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy
                .RenewalRequestNumber
            "
            cdcName="RenewalRequestNumber"
          />
        </form-control>
      </form-row>
    </fit>

    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @newInfo="clearData"
        @cancel="isEditable = false"
      >
        <template v-slot:after>
          <btn-default @click="confirm" label="تایید" />
          <btn-default @click="print" label="چاپ" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  data () {
    return {
      title: "تایید تمدیددستور نائب قضایی",
      name: "UTaeeTamdidDastorGhazaee",
      formKey: "33e7876c-210c-4d2d-93ef-16dea5da3333",
      main: true,
      baseNosaziCode: {},
      model: {
        CommissionInfo: {
          OwnerName: "",
          CodeString: ""
        },
        ClsCommission_LegalProxy: {
          Commission_LegalProxy: {
            RenewalConfirmDate: "",
            RenewalConfirmNumber: "",
            OrderDate: "",
            OrderNumber: "",
            RenewalRequestDate: "",
            RenewalRequestNumber: "",
            NidCommission: "00000000-0000-0000-0000-000000000000",
            CreateUserId: "00000000-0000-0000-0000-000000000000"
          }
        }
      }
    }
  },
  mounted () {
    if (this.selectedNidCommission !== null) {
      this.loadData(this.selectedNidCommission)
    } else {
      return this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
  },
  methods: {
    loadData (NidCommission) {
      this.isEditable = false
      this.showLoading()
      const payload = {
        PRequest: {
          NIDCommission: NidCommission
        }
      }
      this.$services.commissions
        .getAllCommissionDetails(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model = res.data.GetAllCommissionDetailsResult
            this.nosaziCode = convertStringToNosaziCodeObject(
              res.data.GetAllCommissionDetailsResult.CommissionInfo.CodeString
            )
            await this.log({
              action: this.logActions.view,
              bizCode: this.nosaziCode,
              bizCodeTitle: "NosaziCode",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // saveData() {
    //   if (this.selectedNidCommission === null)
    //     return this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.");
    //   const payload = {
    //     pRequest: {
    //       ...this.model,
    //     },
    //   };
    //   this.showLoading();
    //   this.$services.commissions
    //     .saveCommissionLegalProxy(payload)
    //     .then(({ data }) => {
    //       const res = this.getResponse(data);
    //       if (res.success) {
    //         this.loadData(
    //           res.data.SaveCommission_LegalProxyResult.CommissionInfo
    //             .NidCommission
    //         );
    //         this.showSuccess("عملیات با موفقیت انجام شد.");
    //         await this.log({
    //           action: this.logActions.save,
    //           bizCode: this.model.NidCommission,
    //           bizCodeTitle: "NidCommission",
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       // this.serverError() // test serverError;
    //     })
    //     .finally(() => {
    //       this.hideLoading();
    //     });
    // },
    confirm () {
      return this.showError("برای این درخواست تقاضای تمدید ثبت نشده است")
    }
  }
}
</script>

<style></style>
