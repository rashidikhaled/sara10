<template>
     <safa-form
    :id="formKey"
    :caption="title"
    app-id='3C1CAD2C-BC81-4568-B146-501ED62FFA23'
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="decodeAndConfirmBankFileResult " />
      </template>
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              ciName="ci_bankfiletype"
              domainName="CI_SaraM1"
              label="قالب فایل"
              v-model="fileFormat"
              m="e"
              label-width="70px"
              cdcName="ci_bankfiletype"
              :validations="['required', validations.fileFormat]"
            />
          </form-control>
          <form-control>
            <safa-combo
              source-type="local"
              :options="districts"
              label="منطقه"
              label-width="60px"
              :use-input="false"
              v-model="selectedRegion"
              m="e"
              cdcName="selectedRegion"
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

        <safa-datatable
          title="اطلاعات فیش"
          :columns="fichInfoColumns"
          v-model="list"
          cdcName="BankFileContract"
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
      title: 'تایید فیش پسماند از فایل',
      formKey: "182a5237-7484-4934-8ef3-60d8a0d34407",
      name: "UGarbageBankConfirmFiche",
      main: true,

      selectedRegion: 1,
      fileFormat: 0,
      totalFiche: 0,
      confirmedFiche: 0,
      notConfirmedFiche: 0,
      previousConfirmedFiche: 0,
      decodeAndConfirmBankFileResult: null,
      files: [],
      hasFile: false,
      fileContent: [],
      list: [],
      fichInfoColumns: [
        {
          field: "NosaziCode",
          title: "کد نوسازی",
          width: "100px"
        },
        {
          field: "FicheNo",
          title: "شماره قبض",
          width: "100px"
        },
        {
          field: "BillID",
          title: "شناسه قبض",
          width: "120px"
        },

        {
          field: "PaymentID",
          title: "شناسه پرداخت",
          width: "100px"
        },
        {
          field: "Price",
          title: "مبلغ فیش",
          width: "135px"
        },
        {
          field: "FishePaymentDate",
          title: "تاریخ پرداخت فیش",
          width: "130px"
        },
        {
          field: "EumFicheConfirmMethode",
          title: "نوع پرداخت فیش",
          width: "110px"
        },

        {
          field: "AccountNo",
          title: "شماره حساب",
          width: "100px"
        },
        {
          field: "BranchNo",
          title: "کد شعبه",
          width: "100px"
        },
        {
          field: "InValidMessage",
          title: "وضعیت",
          width: "200px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "200px"
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
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },

  methods: {
    confirmFiche () {
      if (!this.isValidForm()) return
      try {
        if (this.files.size === 0) { return this.showError("هیچ فایلی انتخاب نشده است") }
        const fileName = this.files.name
        const fileContent = this.fileContent
        const fileLines = [fileName, ...fileContent]

        const payload = {
          pFileLines: fileLines,
          pFileFormat: this.fileFormat,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          pObjOnPrice: 4, // پسماند   EumObjOnPrice
          pFilePath: fileName
        }

        this.showLoading()
        this.$services.SB
          .decodeAndConfirmBankFile(payload, { config: {
            District: this.selectedDistrict
          } })
          .then(async ({ data }) => {
            this.decodeAndConfirmBankFileResult = this.getResponse(data)
            if (this.decodeAndConfirmBankFileResult.success) {
              const res = this.decodeAndConfirmBankFileResult.data
              this.totalFiche = res.TotalFiche ?? 0
              this.confirmedFiche = res.ConfirmedFiche ?? 0
              this.notConfirmedFiche = res.NotConfirmedFiche ?? 0
              this.previousConfirmedFiche = res.PreviousConfirmedFiche ?? 0
              this.list = this.decodeAndConfirmBankFileResult.data.BankFileContract
              this.decodeAndConfirmBankFileResult.data.BankFileContract.map((x) => {
                if (x.IsAccept === false) {
                  x.class = 'file-bank'
                }
                if (x.IsAccept === true) {
                  x.class = 'file-bank-confirm'
                }
              })
              await this.log({
                action: this.logActions.save,
                bizCode: fileName,
                bizCodeTitle: "مسیر فایل"
              })
            //   this.showSuccess("عملیات با موفقیت انجام شد")
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
      this.files = file
      var reader = new FileReader()
      reader.addEventListener("load", this.readFile)
      reader.readAsText(file)
    }
  }
}
</script>
