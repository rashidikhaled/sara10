<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <form-wrapper title="تایید از فایل درآمد">
      <safa-status :result="requestResult"/>
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              ciName="ci_bankfiletype"
              domainName="CI_SaraM1"
              input-debounce="0"
              label="قالب فایل"
              v-model="confirmPrequest.pFileFormat"
              m="e"
              class="col-12 col-sm-auto col-md-3"
              label-width="60px"
              cdcName="pFileFormat"
            />
          </form-control>
          <form-control>
            <safa-combo
              source-type="local"
              :options="districts"
              label="منطقه"
              :use-input="false"
              v-model="selectedRegion"
              m="e"
              cdcName="selectedRegion"
              label-width="60px"
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
        <safa-splitter
          v-model="splitterModel"
          horizontal
          style="min-height: 350px"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                v-model="list"
                ref="grid"
                name="grid"
                helper="confirmIncomeFromFile"
                fit
                :allowNewRow="false"
                :allowRemoveRow="false"
                :allowCopy="false"
                height="100%"
                minHeight="100%"
                maxHeight="100%"
                title="فایل ها"
                cdcName="confirmIncomeFromFile"
                @selectedChange="fileSelectedChanged"

              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                v-model="items"
                ref="grid"
                name="grid"
                helper="nosazi.smallGridInNosaziFileBank"
                :allowNewRow="false"
                :allowRemoveRow="false"
                :allowCopy="false"
                minHeight="100%"
                maxHeight="100%"
                fit
                title="تایید فایل بانکی درآمد"
                cdcName="smallGridInNosaziFileBank"
              />
            </fit>
          </template>
        </safa-splitter>
        <div :class="['row q-gutter-x-sm q-mt-sm q-pa-sm', $q.dark.isActive?'bg-lighten4 text-white':'bg-green-1']">
          <div class="col-3">
            <safa-label>کل:</safa-label>
          </div>
          <div class="col-2">
            <safa-label>تایید شده:</safa-label>
          </div>
          <div class="col-3">
            <safa-label>تایید شده از قبل:</safa-label>
          </div>
          <div class="col-3">
            <safa-label>تایید نشده:</safa-label>
          </div>
        </div>
      </fit>
      <template v-slot:footer>
        <btn-save
          label="تأیید فایل"
          @click="confirmFiche"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تایید از فایل درآمد',
      formKey: '7b9e4c20-d69d-46ec-9275-4da92b5b74c4',
      name: 'UConfirmationIncomeFromFile',
      main: true,
      total: null,
      confirmNo: null,
      hadConfirmedNo: null,
      unConfirmedNo: null,
      items: [],
      splitterModel: 50,
      selectedRegion: 1,
      confirmPrequest: {
        pFileLines: {},
        pFileFormat: 0,
        pUserCode: '',
        pUserName: '',
        pObjOnPrice: 2,
        PDutyType: 1,
        pFilePath: '',
        pSetPayOffForConfirmYearly: true,
        pSetPayOffForConfirmCollective: true
      },
      requestResult: {},
      requestResults: { BankFileContract: [] },
      files: [],
      fileContent: [],
      list: []
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
      try {
        if (
          this.confirmPrequest.pFileFormat === '' ||
          this.confirmPrequest.pFileFormat === 0
        ) {
          this.showError('نوع فایل را مشخص نمایید')

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

        this.$services.SD.decodeAndConfirmBankFile(this.confirmPrequest, {
          config: { District: this.selectedDistrict }
        }).then(async response => {
          this.hideSending()

          this.requestResult = this.getResponse(response.data)
          this.requestResult.data.BankFileContract.map((x) => {
            if (x.IsAccept === false) {
              x.class = 'file-bank'
            }
            if (x.IsAccept === true) {
              x.class = 'file-bank-confirm'
            }
          })
          if (!this.requestResult.hasError) {
            this.list = this.requestResult.data.BankFileContract
              ? [...this.requestResult.data.BankFileContract]
              : []
            await this.log({
              action: this.logActions.save,
              bizCode: this.confirmPrequest.pFilePath,
              bizCodeTitle: 'مسیر فایل',
              saveDesc: "تایید فایل بانکی انجام گردید."
            })
            this.showSuccess('عملیات با موفقیت انجام شد')
          }
        })
      } catch (error) {
        this.hideSending()

        this.showError(error.message)
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
        if (dataItem.NidFiche !== '00000000-0000-0000-0000-000000000000') {
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
