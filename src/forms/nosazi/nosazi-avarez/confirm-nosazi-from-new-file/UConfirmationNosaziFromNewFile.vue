<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="تایید فایل بانکی نوسازی">
      <safa-status :result="saveRes" />
      <safa-status :result="getDutyFicheSubsRes" />
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="قالب فایل"
              label-width="90px"
              v-model="confirmPrequest.pFileFormat"
              cdcName="pFileFormat"
              ciName="ci_bankfiletype"
              domainName="CI_SaraM1"
              m="e"
              required
              :validations="['required', validations.FileFormat]"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="منطقه"
              label-width="90px"
              v-model="selectedRegion"
              cdcName="selectedRegion"
              :options="districts"
              source-type="local"
              m="e"
            />
          </FormControl>
          <FormControl>
            <safa-file-uploader
              label="بارگذاری فایل"
              label-width="90px"
              cdcName="File"
              :max-size="5"
              type=".WRD,.TXT,.DAT,.380, .187, .256"
              @change="changeFile"
              required
              validations="required"
            />
          </FormControl>
                    <FormControl>
            <safa-text
              label="شماره شیفریه"
              label-width="90px"
              v-model="model.ShifrieNO"
              cdcName="ShifriyeNumber"
              dir="ltr"
              m="r"
            />
          </FormControl>
        </FormRow>
        <safa-splitter
          v-model="splitterModel"
          horizontal
          style="min-height: 300px"
          fit
        >
          <template v-slot:before>
            <fit>
              <safa-grid
                title="فایل بانکی نوسازی"
                v-model="model.BankFileContractNew"
                cdcName="BankFileContractNew"
                helper="nosazi.bigGridInNosaziFileBank"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                fit
                height="100%"
                maxHeight="100%"
                minHeight="300px"
                @row:click="selecBankFileContract"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                title="جزئیات فیش"
                v-model="tmpDutyFicheSub"
                cdcName="DutyFicheSub"
                helper="nosazi.smallGridInNosaziFileBank"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                fit
                height="100%"
                maxHeight="100%"
                minHeight="300px"
              />
            </fit>
          </template>
        </safa-splitter>
        <FormRow class="q-pa-sm" :class="[$q.dark.isActive ? 'bg-lighten4 text-white' : 'bg-green-1']">
          <FormControl>
            <safa-text
              cdcName="TotalFiche"
              dir="ltr"
              label="کل"
              label-width="90px"
              m="r"
              v-model="model.TotalFiche"
            />
          </FormControl>
          <FormControl>
            <safa-text
              cdcName="ConfirmedFiche"
              dir="ltr"
              label="تایید شده"
              label-width="90px"
              m="r"
              v-model="model.ConfirmedFiche"
            />
          </FormControl>
          <FormControl>
            <safa-text
              cdcName="NotConfirmedFiche"
              dir="ltr"
              label="تایید شده از قبل"
              label-width="90px"
              m="r"
              v-model="model.PreviousConfirmedFiche"
            />
          </FormControl>
          <FormControl>
            <safa-text
              cdcName="NotConfirmedFiche"
              dir="ltr"
              label="تایید نشده"
              label-width="90px"
              m="r"
              v-model="model.NotConfirmedFiche"
            />
          </FormControl>
        </FormRow>
      </fit>
      <template v-slot:footer>
        <btn-save label="تایید فایل بانکی" @click="confirmFiche" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import Joi from "joi"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تایید فیش از فایل جدید",
      formKey: "26d9fabc-1a29-4c0d-9868-8401c5318a02",
      name: "UConfirmationNosaziFromNewFile",
      main: true,
      validations: {
        FileFormat: Joi.custom(
          function (value, helper) {
            if (this.confirmPrequest.pFileFormat === "" ||
            this.confirmPrequest.pFileFormat === 0) {
              return helper.message("انتخاب نوع فایل الزامی می باشد")
            }
            return true
          }.bind(this)
        )
      },
      getDutyFicheSubsRes: null,
      saveRes: {},

      nosaziSetting: null,
      tmpDutyFicheSub: [],
      model: {
        BankFileContract: null,
        TotalFiche: null,
        ConfirmedFiche: null,
        PreviousConfirmedFiche: null,
        ShifrieNO: null,
        NotConfirmedFiche: null,
        BankFileContractNew: []
      },
      selectedRegion: 1,
      confirmPrequest: {
        pFileLines: {},
        pFileFormat: 0,
        pUserCode: "",
        pUserName: "",
        pObjOnPrice: "0",
        PDutyType: "0",
        pFilePath: "",
        pSetPayOffForConfirmCollective: false,
        pSetPayOffForConfirmTaghsit: false
      },
      files: [],
      fileContent: [],
      splitterModel: 50
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  },
  methods: {
    async confirmFiche () {
      if (!this.isValidForm()) return
      try {
        if (this.files.size === 0) { return this.showError("هیچ فایلی انتخاب نشده است") }
        const fileName = this.files.name
        this.fileContent.unshift(fileName)
        this.fileContent.unshift(fileName)
        this.confirmPrequest.pFileLines = this.fileContent
        this.confirmPrequest.pUserCode = this.getNidUser()
        this.confirmPrequest.pUserName = this.getUserDisplayName()
        this.confirmPrequest.pFilePath = fileName
        this.confirmPrequest.pSetPayOffForConfirmCollective =
          this.nosaziSetting?.AvarezSettings?.setPayOffForConfirmCollective ??
          false
        this.confirmPrequest.pSetPayOffForConfirmTaghsit =
          this.nosaziSetting?.AvarezSettings?.setPayOffForConfirmTaghsit ??
          false

        this.showLoading()
        const { data } = await this.$services.SB.decodeAndConfirmBankFileNew(this.confirmPrequest, {
          config: { District: this.selectedRegion }
        })
        this.saveRes = this.getResponse(data)
        if (this.saveRes.success) {
          this.model = this.saveRes.data
          await this.log({
            action: this.logActions.confirmFiche,
            bizCode: this.confirmPrequest.pFilePath,
            bizCodeTitle: "مسیر فایل",
            saveDesc: "تایید فایل بانکی انجام گردید."
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    selecBankFileContract ({ data }) {
      this.resetValidation()
      if (data.NidFiche !== "00000000-0000-0000-0000-000000000000") {
        this.showLoading()
        this.$services.SB.getDutyFicheSubs(
          { pNidFiche: data.NidFiche },
          { config: { District: this.selectedRegion } }
        )
          .then(({ data }) => {
            this.getDutyFicheSubsRes = this.getResponse(data)
            if (this.getDutyFicheSubsRes.success) {
              this.tmpDutyFicheSub =
                this.getDutyFicheSubsRes?.data?.DutyFicheSub?.reverse(
                  (x) => x.CI_DutyYear
                ) ?? []
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
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
    }
  },

  async created () {
    this.nosaziSetting = await this.loadFormSetting("nosaziSettings", {
      nidProc: GLOBAL_SETTINGS_GUID
    })
  }
}
</script>
