<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="decodeAndConfirmBankFileRes" />
      </template>
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              label="قالب فایل"
              label-width="70px"
              ciName="ci_bankfiletype"
              domainName="CI_SaraM1"
              v-model="fileFormat"
              cdcName="fileFormat"
              m="e"
              :validations="['required', validations.fileFormat]"
            />
          </form-control>
          <form-control>
            <safa-file-uploader
              label="بارگذاری فایل"
              label-width="90px"
              cdcName="File"
              :max-size="5"
              type=".WRD,.TXT,.DAT,.380"
              @change="changeFile"
              required
              validations="required"
            />
          </form-control>
        </form-row>

        <safa-grid
          title="اطلاعات فیش"
              :getRowClass="getRowClass"
          :columns="fichInfoColumns"
          v-model="list"
          cdcName="confirmIncomeFromFile"
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
        />
        <div
          :class="[
            'row q-gutter-x-sm q-mt-sm q-pa-sm',
            $q.dark.isActive ? 'bg-lighten4 text-white' : 'bg-green-1',
          ]"
        >
          <div style="min-width: 150px">
            <safa-label>مجموع فایل ها: {{ totalFiche }}</safa-label>
          </div>
          <div style="min-width: 150px">
            <safa-label>تایید شده: {{ confirmedFiche }}</safa-label>
          </div>
          <div style="min-width: 150px">
            <safa-label
              >تایید شده از قبل: {{ previousConfirmedFiche }}</safa-label
            >
          </div>
          <div style="min-width: 150px">
            <safa-label>تایید نشده: {{ notConfirmedFiche }}</safa-label>
          </div>
        </div>
      </fit>
      <template v-slot:footer>
        <btn-save label="تایید فایل بانکی" @click="confirmFiche" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Joi from "joi"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تأیید فیش از فایل بانکی",
      formKey: "7dd6f384-3189-4f78-83a4-aca3457b9b3c",
      name: "UConfirmFishFromBankFile",
      main: true,
      items: [],
      fileFormat: 0,
      totalFiche: 0,
      confirmedFiche: 0,
      notConfirmedFiche: 0,
      previousConfirmedFiche: 0,
      decodeAndConfirmBankFileRes: null,
      sidebarCompatible: true,
      workflowCompatible: true,
      files: [],
      hasFile: false,
      fileContent: [],
      list: [],
      fichInfoColumns: [
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "120px"
        },
        {
          field: "BillID",
          title: "شناسه قبض",
          width: "120px"
        },
        {
          field: "PayID",
          title: "شناسه پرداخت",
          width: "120px"
        },

        {
          field: "Price",
          title: "مبلغ فیش",
          width: "120px"
        },
        {
          field: "PaymentDate",
          title: "تاریخ پرداخت فیش",
          width: "150px"
        },
        {
          field: "CI_ConfrimFicheType",
          title: "نوع پرداخت فیش",
          width: "150px"
        },
        {
          field: "AccountNo",
          title: "شماره حساب",
          width: "110px"
        },

        {
          field: "BranchNo",
          title: "کد شعبه",
          width: "100px"
        },
        {
          field: "InValidMessage",
          title: "وضعیت",
          width: "230px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "auto"
        }
      ],
      validations: {
        fileFormat: Joi.custom(
          function (value, helper) {
            if (this.fileFormat === 0 || this.fileFormat === null) {
              return helper.message(
                "مقدار نامشخص برای قالب فایل مجاز نمی باشد."
              )
            }
            return true
          }.bind(this)
        )
      }
    }
  },

  methods: {
    getRowClass (params) {
      let row = params.data
      // if (row.EumDutyFicheStatus === 0) return "bg-green-3"
      if (row.IsConfirm === true) return "bg-green-2"
      if (row.IsConfirm === false) return "bg-pink-2"
    },
    confirmFiche () {
      if (!this.isValidForm()) return
      try {
        if (this.files.size === 0) { return this.showError("هیچ فایلی انتخاب نشده است") }
        const fileName = this.files.name
        // const fileContent = this.fileContent
        // const fileLines = [fileName, ...fileContent]
        const payload = {
          pRequest: {
            ClsBankFile: {
              ConfirmedFiche: 0,
              FileContents: this.fileContent,
              FileFormat: this.fileFormat,
              FileName: this.files.name,
              NidUser: this.getNidUser(),
              UserName: this.getUserDisplayName(),
              NotConfirmedFiche: 0,
              PreviousConfirmedFiche: 0,
              TotalFiche: 0

            }

          }
        }
        this.showLoading()
        this.$services.excavation
          .decodeAndConfirmBankFile(payload)
          .then(async ({ data }) => {
            this.decodeAndConfirmBankFileRes = this.getResponse(data)
            if (this.decodeAndConfirmBankFileRes.success) {
              const res = this.decodeAndConfirmBankFileRes.data
              this.totalFiche = res.DecodeAndConfirmBankFileResult.ClsBankFile.TotalFiche ?? 0
              this.confirmedFiche = res.DecodeAndConfirmBankFileResult.ClsBankFile.ConfirmedFiche ?? 0
              this.notConfirmedFiche = res.DecodeAndConfirmBankFileResult.ClsBankFile.NotConfirmedFiche ?? 0
              this.previousConfirmedFiche = res.DecodeAndConfirmBankFileResult.ClsBankFile.PreviousConfirmedFiche ?? 0
              this.list = this.decodeAndConfirmBankFileRes.data.DecodeAndConfirmBankFileResult.ClsBankFile.BankFileTemplate
              await this.log({
                action: this.logActions.save,
                bizCode: fileName,
                bizCodeTitle: "مسیر فایل"
              })
              this.showSuccess("عملیات با موفقیت انجام شد")
            }
          })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    readFile (event) {
      this.fileContent = event.target.result.split('\r\n')
    },
    changeFile (file) {
      var reader = new FileReader()
      reader.addEventListener("load", this.readFile)
      reader.readAsText(file)
      this.files = file
    },

    fileSelectedChanged ({ dataItem }) {
      if (dataItem) {
        if (dataItem.NidFiche !== "00000000-0000-0000-0000-000000000000") {
          this.showLoading()
          this.$services.SB.getDutyFicheSubs(
            { pNidFiche: dataItem.NidFiche },
            { config: { District: this.selectedRegion } }
          )
            .then(({ data }) => {
              this.getDutyFicheSubsRes = this.getResponse(data)
              if (this.getDutyFicheSubsRes.success) {
                let tmpDutyFicheSub =
                  this.getDutyFicheSubsRes.data.DutyFicheSub || []
                // let tmpDutyFicheSub =
                //   this.getDutyFicheSubsRes.data.DutyFicheSub.sort(
                //     (f, x) => x.CI_DutyYear - f.CI_DutyYear
                //   ) || []
                this.items = tmpDutyFicheSub
              }
            })
            .catch((e) => {
              console.error(e)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        } else {
          this.showError(`NidFiche خالی میباشد: ${dataItem.NidFiche}`)
          this.items = []
        }
      }
    }
  }
}
</script>
