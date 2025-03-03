<template>
  <safa-form :id="formKey" :caption="title" app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc">
     <template #header><safa-status :result="requestResult"/></template>
    <form-wrapper title="تایید فیش صنفی از فایل">
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
              label-width="60px"
              cdcName="pFileFormat"
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
        <safa-splitter
          v-model="splitterModel"
          horizontal
          style="min-height: 350px"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                v-model="list"
                cdcName="BankFileContract"
                ref="grid"
                name="grid"
                helper="confirmIncomeFromFile"
                fit
                :allowNewRow="false"
                :allowRemoveRow="false"
                :allowCopy="false"
                :hideToolbar="true"
                title="فایل ها"
                height="100%"
                max-height="100%"
                min-height="120px"
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
                title="تایید فایل بانکی صنفی"
                cdcName="smallGridInNosaziFileBank"
              />
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
            <safa-label>کل:</safa-label>
          </div>
          <div class="col-3">
            <safa-label>تایید شده:</safa-label>
          </div>
          <div class="col-3">
            <safa-label>تایید شده از قبل:</safa-label>
          </div>
          <div class="col-2">
            <safa-label>تایید نشده:</safa-label>
          </div>
        </div>
      </fit>
      <template v-slot:footer>
        <btn-save label="تایید فایل بانکی" @click="confirmFiche"/>
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
      title: 'تایید فیش صنفی از فایل',
      formKey: 'e2bd67e9-d7e2-464c-8b87-77675ba0ae00',
      name: 'UConfirmSenfiFishFromFile',
      main: true,
      total: null,
      confirmNo: null,
      hadConfirmedNo: null,
      unConfirmedNo: null,
      items: [],
      selectedRegion: 1,
      confirmPrequest: {
        pFileLines: {},
        pFileFormat: 0,
        pUserCode: '',
        pUserName: '',
        pObjOnPrice: 2,
        PDutyType: 2,
        pFilePath: '',
        pSetPayOffForConfirmYearly: true,
        pSetPayOffForConfirmCollective: true
      },
      requestResult: {},
      files: [],
      fileContent: [],
      splitterModel: 50,
      list: [],
      requestResults: { BankFileContract: [] },
      isView: false
    }
  },
  mounted () {
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
        this.$services.SB.decodeAndConfirmBankFile(this.confirmPrequest, {
          config: { District: this.selectedDistrict }
        }).then(async (response) => {
          this.hideSending()
          this.requestResult = this.getResponse(response.data)
          this.requestResult.data.BankFileContract && this.requestResult.data.BankFileContract.map((x) => {
            if (x.IsAccept === false) {
              x.class = 'file-bank'
            }
            if (x.IsAccept === true) {
              x.class = 'file-bank-confirm'
            }
          })
          if (!this.requestResult.hasError) {
            this.showSuccess('عملیات با موفقیت انجام شد')
            this.list = this.requestResult.data.BankFileContract
              ? [...this.requestResult.data.BankFileContract]
              : []
            await this.log({
              action: this.logActions.save,
              bizCode: this.confirmPrequest.pFilePath,
              bizCodeTitle: 'مسیر فایل',
              saveDesc: "تایید فایل بانکی انجام گردید."
            })
          }
        })
      } catch (error) {
        this.hideSending()

        this.showError(error.message)
      }
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
            .then(async ({ data }) => {
              this.getDutyFicheSubsRes = this.getResponse(data)

              if (this.getDutyFicheSubsRes.success) {
                let tmpDutyFicheSub =
                  this.getDutyFicheSubsRes.data.DutyFicheSub || []

                // let tmpDutyFicheSub =
                //   this.getDutyFicheSubsRes.data.DutyFicheSub.sort(
                //     (f, x) => x.CI_DutyYear - f.CI_DutyYear
                //   ) || []

                this.items = tmpDutyFicheSub

                await this.log({
                  action: this.logActions.view,
                  bizCode: dataItem.NidFiche,
                  bizCodeTitle: 'NidFiche',
                  saveDesc: `بارگذاری جزئیات فیش در فرم ${this.title} انجام گردید.`
                })
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
    },
    readFile (event) {
      this.fileContent = event.target.result.split('\r\n')
    },
    changeFile (file) {
      var reader = new FileReader()
      reader.addEventListener("load", this.readFile)
      reader.readAsText(file)
      this.files = file
    }
  }
}
</script>
