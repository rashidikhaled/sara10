<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="تاریخچه شیفریه" vertical>
      <fit>
        <FormRow :xl="4" :lg="4" :md="3" :sm="3" class="q-mb-sm">
          <FormControl>
            <safa-combo-enum
              v-model="selectedObjOnPrice"
              cdcName="selectedObjOnPrice"
              enumName="EumObjOnPrice"
              label="زیر سیستم"
              label-width="80px"
            ></safa-combo-enum>
          </FormControl>
          <FormControl>
            <safa-text
              v-model="engineerInfo.pShifrieNo"
              :m="m"
              cdcName="pShifrieNo"
              label="شماره شیفریه"
              label-width="80px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="engineerInfo.pFileName"
              m="r"
              cdcName="pFileName"
              label="اسم فایل"
              label-width="80px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="engineerInfo.UserName"
              m="r"
              cdcName="UserName"
              label="کاربر تایید کننده"
              label-width="80px"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              ref="gDatepicker"
              v-model="engineerInfo.ImportDate"
              m="r"
              cdcName="ImportDate"
              label="تاریخ تایید"
              label-width="80px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="engineerInfo.ImportTime"
              m="r"
              cdcName="ImportTime"
              label="زمان تایید"
              label-width="80px"
            />
          </FormControl>
          <div class="col-auto">
            <btn-search label="جستجو" v-on:click="getShifrieInfo" />
          </div>
        </FormRow>
        <safa-datatable
          ref="grid"
          v-model="items"
          cdcName="shBankFileDetailsList"
          fit
          height="100%"
          helper="shBankFileDetailsList"
          max-height="100%"
          min-height="300px"
          name="grid"
          title="تاریخچه"
        ></safa-datatable>
        <div
          :class="[
            'row q-gutter-x-md q-mt-sm q-py-sm',
            $q.dark.isActive ? 'bg-lighten4 text-white' : 'bg-green-1',
          ]"
        >
          <div class="col-3">
            <safa-label>تعداد کل:</safa-label>
          </div>
          <div class="col-3">
            <safa-label>تعداد فیش های تایید شده:</safa-label>
          </div>
          <div class="col-3">
            <safa-label>مبلغ کل فیش های تایید شده:</safa-label>
          </div>
        </div>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  route: "/nosazi-avarez/shiferiye-history",

  mixins: [baseFormMixin],
  data () {
    return {
      title: "تاریخچه شیفریه",
      formKey: "2efc90a1-fd75-47cc-8004-49c89ad04258",
      name: "UShiferiyeHistory",
      main: true,
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
          NidEng: "00000000-0000-0000-0000-000000000000",
          Sh_EngineerInfo: {
            CI_Ability: "6",
            CI_EngStudyField: "2",
            CommitmentNo: "11",
            CommitmentSupervisionDate: "1399/01/07",
            CommitmentSupervisionNo: "12",
            ControllerCode: "456",
            ControllerFamily: "سمیعی",
            ControllerName: "مجید",
            EngBase: "پایه",
            JobAgreement: "789",
            MembershipNo: "10",
            NidEng: "00000000-0000-0000-0000-000000000000",
            UrbanityCode: "123"
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
      selectedObjOnPrice: 1
    }
  },
  props: {
    value: Object,
    m: String,
    engineerInfo: {
      type: Object,
      default: () => ({
        pShifrieNo: "",
        pFileName: "",
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
        NidEng: "",
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
      this.engineerInfo.NidEng = ""
      this.engineerInfo.TotalCount = 0
      this.engineerInfo.UrbanityCode = null
    }
  },
  methods: {
    getShifrieInfo () {
      try {
        if (
          !this.engineerInfo ||
          (this.engineerInfo.pFileName === "" &&
            this.engineerInfo.pShifrieNo === "")
        ) {
          this.showError("لطفا فیلد شماره شیفریه یا اسم فایل را پر نمایید")
          return
        }

        this.showLoading()
        this.$services.SB.getShifrieInfo({
          pFileName: this.engineerInfo.pFileName,
          pShifrieNo: this.engineerInfo.pShifrieNo
        }).then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.engineerInfo.pShifrieNo,
              bizCodeTitle: "شماره شیفریه"
            })

            this.items = this.formModel.Sh_BankFileDetailsList
            if (this.formModel.Sh_BankFileHeader !== null) {
              this.formModel.ConfirmFichePrice =
                this.formModel.Sh_BankFileDetailsList.Where(
                  (f) => f.IsFind === 1
                )
                  .Sum((f) => f.FichePrice)
                  .ToString()
              // DataContext = this.formModel;
              this.formModel.TotalFicheCount.Text =
                this.formModel.Sh_BankFileDetailsList.Count().ToString()
              this.formModel.ConfirmedFicheCount.Text =
                this.formModel.Sh_BankFileDetailsList.Where(
                  (f) => f.IsFind === 1
                )
                  .Count()
                  .ToString()
              // txt_ConfirmFichePrice.Text = this.formModel.Sh_BankFileDetailsList.Where(f => f.IsFind == 1).Sum(f => f.FichePrice).ToString();
            } else {
              this.showError("اطلاعات شیفریه مورد نظر در سیستم یافت نشد")
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
        .then((response) => {
          this.$q.loading.hide()

          if (response.data.BizErrors.length === 0) {
            this.showSuccess("عملیات با موفقیت انجام شد")

            this.isEditable = false
          }
        })
        .catch((ex) => {
          this.$q.dialog({
            title: "خطا در سرور",
            message: ex.message
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.splitter
  color green
</style>
