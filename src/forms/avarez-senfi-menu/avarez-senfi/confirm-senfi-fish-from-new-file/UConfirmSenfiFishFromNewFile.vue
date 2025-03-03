<template>
  <safa-form :id="formKey" :caption="title" app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc">
    <form-wrapper title="تایید فیش صنفی از فایل جدید">
      <fit>
      <template #header>
        <safa-status :result="requestResult"/>
      </template>
        <form-row>
          <form-control>
            <safa-combo
              source-type="local"
              :options="districts"
              label="منطقه"
              :use-input="false"
              label-width="65px"
              v-model="selectedRegion"
              cdcName="selectedRegion"
            />
          </form-control>
          <form-control>
            <safa-combo
              label="قالب فایل"
              label-width="65px"
              m="e"
              ciName="ci_bankfiletype"
              domainName="CI_SaraM1"
              v-model="confirmPrequest.pFileFormat"
              cdcName="pFileFormat"
            />
          </form-control>
          <form-control>
            <btn-default
              label="بازآوری"
              @click="reload"
              :style="$q.screen.gt.xs ? '' : 'margin-top:20px'"
            />
          </form-control>
        </form-row>
        <q-separator class="q-my-sm"></q-separator>
        <form-row class="q-mb-sm">
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
          <form-control>
            <safa-text
              label="شماره شیفریه"
              m="r"
              v-model="requestResults.ShifrieNO"
              cdcName="ShifrieNO"
            />
          </form-control>
        </form-row>

        <safa-datatable
          v-model="requestResults.BankFileContract"
          cdcName="BankFileContract"
          ref="grid"
          name="grid"
          helper="confirmIncomeFromFile"
          fit
          :hideHeader="true"
          min-height="120px"
          height="100%"
          max-height="100%"
          title="فایل ها"
        />

        <form-row class="q-mt-sm">
          <form-control>
            <safa-text
              label="کل"
              m="r"
              v-model="requestResults.TotalFiche"
              cdcName="TotalFiche"
            />
          </form-control>
          <form-control>
            <safa-text
              label="تأیید شده"
              m="r"
              v-model="requestResults.ConfirmedFiche"
              cdcName="ConfirmedFiche"
            />
          </form-control>
          <form-control>
            <safa-text
              label="تأیید شده از قبل"
              m="r"
              v-model="requestResults.PreviousConfirmedFiche"
              cdcName="PreviousConfirmedFiche"
            />
          </form-control>
          <form-control>
            <safa-text
              label="تأیید نشده"
              m="r"
              v-model="requestResults.NotConfirmedFiche"
              cdcName="NotConfirmedFiche"
            />
          </form-control>
        </form-row>
      </fit>
      <template v-slot:footer>
        <btn-save label=" تأیید فایل بانکی" @click="reload"/>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: 'avareze-senfi/confirm-senfi-fish-from-new-file',
  mixins: [baseFormMixin],
  data () {
    return {
      formKey: '192b1f93-49f9-4302-8893-b9fdfc6a16ba',
      name: 'UConfirmSenfiFishFromNewFile',
      title: 'تایید فیش صنفی از فایل جدید',
      main: true,
      total: null,
      confirmNo: null,
      hadConfirmedNo: null,
      unConfirmedNo: null,
      selectedRegion: 1,
      confirmPrequest: {
        pFileLines: {},
        pFileFormat: '',
        pUserCode: '',
        pUserName: '',
        pObjOnPrice: '3',
        pFilePath: '',
        PDutyType: '2',
        pSetPayOffForConfirmYearly: false,
        pSetPayOffForConfirmCollective: false
      },
      requestResult: {},
      requestResults: { BankFileContract: [] },
      files: [],
      fileContent: [],
      isView: false
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  methods: {
    reload () {
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
        const fileLines = {
          string: [fileName, fileContent[0], fileContent[1]]
        }
        let file = []
        file.push(fileLines.string[1])
        this.confirmPrequest.pFileLines = file
        this.confirmPrequest.pUserCode = this.getNidUser()
        this.confirmPrequest.pUserName = this.getUserDisplayName()
        this.confirmPrequest.pFilePath = fileName

        this.showSending()
        this.$services.SB.decodeAndConfirmBankFileNew(
          this.confirmPrequest,
          {
            config: {
              District: this.selectedRegion
            }
          }
        ).then(async (response) => {
          this.hideSending()
          this.requestResult = this.getResponse(response.data)
          this.requestResults = this.requestResult.data
          // if (!this.requestResult.hasError) {
          if (!this.isView) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.confirmPrequest.pFilePath,
              bizCodeTitle: 'مسیر فایل',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
          this.isView = true
          this.showSuccess('عملیات با موفقیت انجام شد')
          // }
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
    }
  }
}
</script>
