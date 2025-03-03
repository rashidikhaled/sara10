<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="تایید فایل بانکی نوسازی">
      <safa-status :result="requestResult" />
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              v-model="confirmPrequest.pFileFormat"
              cdcName="pFileFormat"
              ciName="ci_bankfiletype"
              domainName="CI_SaraM1"
              input-debounce="0"
              label="قالب فایل"
              label-width="60px"
              m="e"
            />
          </form-control>
          <form-control>
            <safa-combo
              v-model="selectedRegion"
              :options="districts"
              :use-input="false"
              cdcName="selectedRegion"
              label="منطقه"
              label-width="60px"
              m="e"
              source-type="local"
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
          <span class="self-center text-blue"
            >حجم مجاز: 5 مگابایت، فرمت مجاز: *.WRD,.TXT,.DAT,.380</span
          >
          <!-- <btn-default label="بازآوری" @click="reload" /> -->
        </form-row>
        <safa-splitter
          v-model="splitterModel"
          horizontal
          style="min-height: 350px"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                ref="grid"
                v-model="list"
                :allowCopy="false"
                :allowNewRow="false"
                :allowRemoveRow="false"
                cdcName="bigGridInNosaziFileBank"
                fit
                height="100%"
                helper="bigGridInNosaziFileBank"
                maxHeight="100%"
                minHeight="100%"
                name="grid"
                title="تایید فایل بانکی نوسازی"
                @selectedChange="fileSelectedChanged"
              ></safa-datatable>
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                ref="grid"
                v-model="items"
                :allowCopy="false"
                :allowNewRow="false"
                :allowRemoveRow="false"
                cdcName="smallGridInNosaziFileBank"
                fit
                helper="nosazi.smallGridInNosaziFileBank"
                maxHeight="100%"
                minHeight="100%"
                name="grid"
                title="تایید فایل بانکی نوسازی"
              ></safa-datatable>
            </fit>
          </template>
        </safa-splitter>

        <div
          :class="[
            'row q-gutter-x-sm q-mt-sm q-py-sm',
            $q.dark.isActive ? 'bg-lighten4 text-white' : 'bg-green-1',
          ]"
        >
          <div class="col-3">
            <safa-label>کل: {{ totalFiche }}</safa-label>
          </div>
          <div class="col-3">
            <safa-label>تایید شده: {{ confirmedFiche }}</safa-label>
          </div>
          <div class="col-3">
            <safa-label>تایید شده از قبل: {{ prviuseFiche }}</safa-label>
          </div>
          <div class="col-2">
            <safa-label>تایید نشده: {{ notConfirme }}</safa-label>
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
import baseFormMixin from "src/mixins/baseFormMixin.js"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تایید فایل بانکی نوسازی",
      formKey: "ff6f4fb4-7253-48a9-8109-25ee6be18b12",
      name: "UConfirmationNosaziFileBank",
      main: true,
      items: [],
      selectedRegion: 1,
      confirmPrequest: {
        pFileLines: {},
        pFileFormat: 0,
        pUserCode: "",
        pUserName: "",
        pObjOnPrice: 2,
        PDutyType: 1,
        pFilePath: "",
        pSetPayOffForConfirmYearly: true,
        pSetPayOffForConfirmCollective: true
      },
      requestResult: {},
      files: [],
      fileContent: [],
      splitterModel: 50,
      list: [],

      totalFiche: "0",
      confirmedFiche: "0",
      prviuseFiche: "0",
      notConfirme: "0"
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
      try {
        if (
          this.confirmPrequest.pFileFormat === "" ||
          this.confirmPrequest.pFileFormat === 0
        ) {
          this.showError("نوع فایل را مشخص نمایید")

          return
        }

        if (this.files.size === 0) { return this.showError("هیچ فایلی انتخاب نشده است") }
        const fileName = this.files.name
        const fileContent = this.fileContent

        const fileLines = [fileName, ...fileContent]
        this.confirmPrequest.pFileLines = fileLines
        this.confirmPrequest.pUserCode = this.getNidUser()
        this.confirmPrequest.pUserName = this.getUserDisplayName()
        this.confirmPrequest.pFilePath = fileName

        this.showSending()

        this.$services.SB.decodeAndConfirmBankFile(this.confirmPrequest, {
          config: {
            District: this.selectedDistrict
          }
        }).then(async (response) => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)
          this.requestResult.data &&
            this.requestResult.data.BankFileContract &&
            this.requestResult.data.BankFileContract.map((x) => {
              if (x.IsAccept === false) {
                x.class = "file-bank"
              }
              if (x.IsAccept === true) {
                x.class = "file-bank-confirm"
              }
            })

          if (!this.requestResult.hasError) {
            this.list = this.requestResult.data.BankFileContract
              ? [...this.requestResult.data.BankFileContract]
              : []

            this.totalFiche = this.requestResult.data.TotalFiche.toString()
            this.confirmedFiche =
              this.requestResult.data.ConfirmedFiche.toString()
            this.prviuseFiche =
              this.requestResult.data.PreviousConfirmedFiche.toString()
            this.notConfirme =
              this.requestResult.data.NotConfirmedFiche.toString()

            await this.log({
              action: this.logActions.save,
              bizCode: this.confirmPrequest.pFilePath,
              bizCodeTitle: "مسیر فایل"
            })

            this.showSuccess("عملیات با موفقیت انجام شد")
          }
        })
      } catch (error) {
        this.hideSending()

        this.showError(error.message)
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

          const payload = {
            pNidFiche: dataItem.NidFiche
          }

          this.$services.SB.getDutyFicheSubs(payload, {
            config: {
              District: this.selectedDistrict
            }
          })
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
            .catch((error) => {
              console.error(error)
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
