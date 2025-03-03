<template>
  <FormWrapper>
    <template>
      <safa-status :result="addToArchiveRes" />
      <safa-status :result="addLayeheToArchiveRes" />
    </template>
    <fit>
      <FormRow v-if="printIllustration === 'default'">
        <FormControl>
          <safa-combo
            label="متقاضی"
            label-width="80px"
            source-type="local"
            :options="requesterOptions"
            v-model="defaultModel.Motaghazi"
            cdcName="Motaghazi"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="دفاعیات"
            label-width="80px"
            source-type="local"
            :options="defendsOptions"
            v-model="defaultModel.Defaie"
            cdcName="Defaie"
          />
        </FormControl>
      </FormRow>
      <FormRow v-if="printIllustration === 'UHamArzParameter'">
        <FormControl>
          <safa-text
            label="شماره دادنامه"
            label-width="80px"
            v-model="hamArzModel.DadnamehNo"
            cdcName="DadnamehNo"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="مورخ"
            label-width="80px"
            v-model="hamArzModel.DadnamehDate"
            cdcName="DadnamehDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره رای منقوض"
            label-width="80px"
            v-model="hamArzModel.CommissionNo"
            cdcName="CommissionNo"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="اجرای رای"
            label-width="80px"
            v-model="hamArzModel.Ghatei"
            cdcName="Ghatei"
            source-type="local"
            :options="ghateiOptions"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نقض"
            label-width="80px"
            v-model="hamArzModel.Naghz"
            cdcName="Naghz"
            source-type="local"
            :options="naghzOptions"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ کمیسیون قبلی"
            label-width="80px"
            v-model="hamArzModel.OldCommissionDate"
            cdcName="OldCommissionDate"
          />
        </FormControl>
      </FormRow>
      <FormRow v-if="printIllustration === 'UTajdidNazarParameter'">
        <FormControl>
          <safa-text
            label="شماره "
            label-width="80px"
            v-model="tajdidNazarModel.NamehNo"
            cdcName="NamehNo"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع"
            label-width="80px"
            v-model="tajdidNazarModel.TypeRequester"
            cdcName="TypeRequester"
            source-type="local"
            :options="zinafOptions"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="اصدار"
            label-width="80px"
            v-model="tajdidNazarModel.Esdar"
            cdcName="Esdar"
            source-type="local"
            :options="esdarOptions"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ "
            label-width="80px"
            v-model="tajdidNazarModel.Date"
            cdcName="Date"
          />
        </FormControl>
      </FormRow>
    </fit>

    <template v-slot:footer>
      <btn-save label="تایید" @click="confirmPrint" />
    </template>
  </FormWrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  props: {
    printIllustration: String,
    isShowPrint: Boolean,
    BizCode: Object
  },
  data () {
    return {
      defendsOptions: [
        { Id: 0, Title: "مطالعه دفاعیات" },
        { Id: 1, Title: "استماع اظهارات" },
        { Id: 2, Title: "هردو" },
        { Id: 3, Title: "عدم ارائه دفاعیات" }
      ],
      requesterOptions: [
        { Id: 0, Title: "مالک" },
        { Id: 1, Title: "ذینفع" },
        { Id: 2, Title: "نماینده قانونی" }
      ],
      addToArchiveRes: null,
      addLayeheToArchiveRes: null,
      hamArzModel: {
        DadnamehNo: "",
        DadnamehDate: "",
        CommissionNo: "",
        OldCommissionDate: "",
        Naghz: null,
        Ghatei: null
      },
      naghzOptions: [
        { Id: 0, Title: "تمام" },
        { Id: 1, Title: "قسمتی" }
      ],
      ghateiOptions: [
        { Id: 0, Title: "قطعی" },
        { Id: 1, Title: "غیر قطعی" }
      ],
      keyValueOfParameters: [],
      defaultModel: {
        Motaghazi: null,
        Defaie: null
      },
      isArchive: 1,
      parameters: [],
      reportName: "",
      zinafOptions: [
        { Id: 0, Title: "ذینفع" },
        { Id: 1, Title: "شهرداری" },
        { Id: 2, Title: "ذینفع و شهرداری" }
      ],
      esdarOptions: [
        { Id: 0, Title: "یافته" },
        { Id: 1, Title: "نیافته" }
      ],
      tajdidNazarModel: {
        NamehNo: "",
        TypeRequester: null,
        Esdar: null,
        Date: ""
      }
    }
  },
  methods: {
    confirmPrint () {
      const payload = {
        PRequest: {
          Commission_PrintLog: {
            Comments: "چاپ رای",
            NidCommission: this.selectedNidCommission,
            NidPrintLog: "00000000-0000-0000-0000-000000000000",
            UserCode: 0,
            UserName: this.getUserDisplayName()
          }
        }
      }
      this.showLoading()
      this.$services.commissions
        .saveCommissionPrintLog(payload)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.addToArchive()
            this.showSuccess("انجام شد")
            this.$emit("closePrintForm")
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    setKeyValueOfParameters () {
      if (this.printIllustration === "UBadviParameter") {
        this.keyValueOfParameters = [
          {
            Key: "NidUser",
            Value: this.getNidUser()
          },
          {
            Key: "Motaghazi",
            Value: this.defaultModel.Motaghazi
          },
          {
            Key: "Defaie",
            Value: this.defaultModel.Defaie
          },
          {
            Key: "NidCommission",
            Value: this.selectedNidCommission
          },
          {
            Key: "IsArchive",
            Value: this.isArchive
          },
          {
            Key: "PrintPreview",
            Value: false
          }
        ]
        this.reportName = "/ComReport/RptBadvi8"
      } else if (this.printIllustration === "UHamArzParameter") {
        this.keyValueOfParameters = [
          {
            Key: "NidUser",
            Value: this.getNidUser()
          },
          {
            Key: "Motaghazi",
            Value: this.hamArzModel.DadnamehNo
          },
          {
            Key: "DadnamehDate",
            Value: this.hamArzModel.DadnamehDate
          },
          {
            Key: "Naghz",
            Value: this.hamArzModel.Naghz
          },
          {
            Key: "Ghatei",
            Value: this.hamArzModel.Ghatei
          },
          {
            Key: "CommissionNo",
            Value: this.hamArzModel.CommissionNo
          },
          {
            Key: "NidCommission",
            Value: this.selectedNidCommission
          },
          {
            Key: "OldCommissionDate",
            Value: this.hamArzModel.OldCommissionDate
          },
          {
            Key: "IsArchive",
            Value: this.isArchive
          },
          {
            Key: "PrintPreview",
            Value: false
          }
        ]
        this.reportName = "/ComReport/RptDivanEdalat"
      } else if (this.printIllustration === "UTajdidNazarParameter") {
        this.keyValueOfParameters = [
          {
            Key: "NidUser",
            Value: this.getNidUser()
          },
          {
            Key: "NamehNo",
            Value: this.tajdidNazarModel.NamehNo
          },
          {
            Key: "TypeRequester",
            Value: this.tajdidNazarModel.TypeRequester
          },
          {
            Key: "Esdar",
            Value: this.tajdidNazarModel.Esdar
          },

          {
            Key: "NidCommission",
            Value: this.selectedNidCommission
          },
          {
            Key: "IsArchive",
            Value: this.isArchive
          },
          {
            Key: "Date",
            Value: this.tajdidNazarModel.Date
          },
          {
            Key: "PrintPreview",
            Value: false
          }
        ]
        this.reportName = "/ComReport/RptTajdidNazar"
      } else if (this.printIllustration === "default") {
        this.keyValueOfParameters = [
          {
            Key: "NidCommission",
            Value: this.selectedNidCommission
          },
          {
            Key: "IsArchive",
            Value: 0
          }
        ]
      }

      //   let params = [];
      this.keyValueOfParameters.forEach((element) => {
        this.parameters.push(element)
      })
      return this.parameters
    },
    addToArchive () {
      this.setKeyValueOfParameters()
      const payload = {
        parameters: this.parameters,
        ReportName: this.reportName,
        BizCode: this.BizCode.RootSubject,
        NidCommission: this.selectedNidCommission,
        DomainName: "Commission",
        pUserName: this.getUserDisplayName(),
        pUserId: this.getNidUser()
      }
      this.showLoading()
      this.$services.commissions
        .addToArchive(payload)
        .then(({ data }) => {
          this.addToArchiveRes = this.getResponse(data)
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    addLayeheToArchive () {
      const payload = {
        BizCode: this.selectedCommission.BizCode,
        pNidCommission: this.selectedNidCommission,
        DomainName: "Commission",
        pUserName: this.getUserDisplayName(),
        pUserId: this.getNidUser()
      }
      this.showLoading()
      this.$services.commissions
        .addLayeheToArchive(payload)
        .then(({ data }) => {
          this.addLayeheToArchiveRes = this.getResponse(data)
          if (this.addLayeheToArchiveRes.success) {
            this.showSuccess("انجام شد")
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
