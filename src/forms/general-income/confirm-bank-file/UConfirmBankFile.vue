<template>
  <safa-form
    appId="c254f209-304e-41f0-a95a-174cf1279618"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="decodeAndConfirmBankFileRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="قالب فایل"
              label-width="90px"
              v-model="fileFormat"
              cdcName="fileFormat"
              ciName="ci_bankfiletype"
              domainName="CI_SaraM1"
              input-debounce="0"
              :validations="['required', validations.fileFormat]"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="منطقه"
              label-width="90px"
              v-model="selectedRegion"
              cdcName="selectedRegion"
              source-type="local"
              :options="districts"
              required
              validations="required"
            />
          </FormControl>
          <FormControl>
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
          </FormControl>
          <!-- <div>
              <btn-default label="بازآوری" @click="reload" />
            </div> -->
        </FormRow>
        <!-- <safa-splitter
          v-model="splitterModel"
          horizontal
          style="min-height: 350px"
        >
          <template v-slot:before>
            <fit> -->
              <safa-grid
          title="فایل ها"
          helper="confirmGeneralIncomeFromFileColumns"
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
        <!-- @selectedChange="fileSelectedChanged" -->
        <!-- </fit> -->
        <!-- </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                title="تایید فایل بانکی درآمد"
                helper="nosazi.smallGridInNosaziFileBank"
                v-model="items"
                cdcName="smallGridInNosaziFileBank"
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
            </fit>
          </template>
        </safa-splitter> -->

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
        <btn-save label="تأیید فایل" @click="confirmFiche" />
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
      name: "UConfirmBankFile",
      title: "تایید فایل بانکی درآمدهای عمومی",
      formKey: "BAC891AB-DD3F-4FF7-BDC3-03555460E715",
      main: true,

      items: [],
      splitterModel: 50,
      selectedRegion: 1,
      fileFormat: 0,
      totalFiche: 0,
      confirmedFiche: 0,
      notConfirmedFiche: 0,
      previousConfirmedFiche: 0,
      decodeAndConfirmBankFileRes: null,
      files: [],
      hasFile: false,
      fileContent: [],
      list: [],
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
      return window.getConfigValue("districts")
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
          pObjOnPrice: 7, // درآمدهای عمومی از EumObjOnPrice
          pFilePath: fileName
        }

        this.showLoading()
        this.$services.generalIncome
          .decodeAndConfirmBankFile(payload)
          .then(async ({ data }) => {
            this.decodeAndConfirmBankFileRes = this.getResponse(data)

            if (this.decodeAndConfirmBankFileRes.success) {
              const res = this.decodeAndConfirmBankFileRes.data
              this.totalFiche = res.TotalFiche ?? 0
              this.confirmedFiche = res.ConfirmedFiche ?? 0
              this.notConfirmedFiche = res.NotConfirmedFiche ?? 0
              this.previousConfirmedFiche = res.PreviousConfirmedFiche ?? 0
              this.list = this.decodeAndConfirmBankFileRes.data.BankFileContract
              this.list =
                res.BankFileContract.map((m) => {
                  return {
                    ...m,
                    class:
                      m.IsAccept === !0 ? "file-bank" : "file-bank-confirm"
                  }
                }) ?? []
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
      this.fileContent = event.target.result.split("\r\n")
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
