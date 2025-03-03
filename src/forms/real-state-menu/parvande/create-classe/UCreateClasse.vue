<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title">
      <safa-status :result="searchObjRes" />
      <safa-status :result="saveObjRes" />
      <fit>
        <form-row>
          <safa-text
            v-model="nidWorkItem"
            cdcName="nidWorkItem"
            label="کد ارجاع"
            label-width="103px"
            class="col-12"
            @keypress.enter="searchObj"
          >
            <template v-slot:append>
              <q-icon
                style="position: relative; right: 5px; font-size: 18px"
                @click="searchObj"
                color="primary"
                name="search"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
          <!-- <nosazi-code-input
            label="کد نوسازی"
            label-width="100px"
            :actions="false"
            v-model="baseNosaziCode"
            m="r"
            class="col-12"
          /> -->
        </form-row>
        <form-row class="q-mt-sm">
          <nosazi-code-input
            label="کد نوسازی"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label-width="66px"
            m="r"
          />
          <ClasseParvandeh
            label="کلاسه پرونده"
            label-width="100px"
            v-model="classeCode"
            m="e"
            class="col-12"
          />
        </form-row>
      </fit>
      <template #footer>
        <btn-save label="تایید" @click="saveObj" :disable="validationsBtn" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { uid } from "quasar"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
const defaultModel = {
  Legal_Info: {
    BeneficCurent: null,
    CI_AssignmentCapability: null,
    CI_BeneficCurent: 0,
    CI_CessionKind: 0,
    CI_CessionOwner: 0,
    EndowmentName: "",
    LegalDesc: "",
    NIdCopy_tmp: 0,
    NIdLegal: "",
    NIdSupplySources: "",
    NId_tmp: 0,
    NidRequest: "",
    SupplySourcesDesc: null,
    SupplySourcesSerial: null
  },
  Legal_RelatedClasse: [],
  _CodeString: "",
  _NIdLegal: "",
  _NidRequest: ""
}
const classeCodeDefault = {
  District: 0,
  Region: 0,
  Block: 0,
  House: 0
}

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "UCreateClasse",
      title: "ایجاد کلاسه بایگانی",
      formKey: "7C54B279-B853-4E23-8158-03448FFC1B75",
      main: true,

      // #services
      searchObjRes: null,
      saveObjRes: null,

      // #variabels
      nidWorkItem: 0,
      validationsBtn: true,
      model: { ...defaultModel },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      classeCode: { ...classeCodeDefault }
    }
  },
  watch: {
    "classeCode.District" () {
      this.checkValidations()
    },
    "classeCode.Region" () {
      this.checkValidations()
    },
    "classeCode.Block" () {
      this.checkValidations()
    },
    "classeCode.House" () {
      this.checkValidations()
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.nidWorkItem = this.selectedRequest.NidWorkItem
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
    }
  },

  methods: {
    searchObj () {
      this.classeCode = { ...classeCodeDefault }
      this.showLoading()
      this.$services.ES.getCreateClasse({
        PNIdWorkItem: this.nidWorkItem
      })
        .then(({ data }) => {
          this.searchObjRes = this.getResponse(data)
          if (this.searchObjRes.success) {
            this.model = this.searchObjRes?.data?.GetCreateClasseResult ?? {
              ...defaultModel
            }
            this.classeCode = this.setClasseCode(
              this.model?.Legal_RelatedClasse[0]?.Classe ?? "0-0-0-0"
            )
            if (!this.selectedRequest) {
              this.baseNosaziCode = this.model?._CodeString || ""
            }
            this.log({
              action: this.logActions.view,
              bizCode: this.nidWorkItem,
              bizCodeTitle: "NidWorkItem",
              saveDesc: "بارگزاری فرم ایجاد کلاسه بایگانی"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      const calsseCodeHelp = this.ClasseCodeToString(this.classeCode)
      if (
        Array.isArray(this.model.Legal_RelatedClasse) &&
        this.model.Legal_RelatedClasse.length > 0 &&
        this.model.Legal_RelatedClasse[0].Classe === calsseCodeHelp &&
        this.model.Legal_RelatedClasse[0].NIdLegal === this.model._NIdLegal
      ) {
        this.showError("کلاسه بایگانی قبلا ایجاد شده است.")
        return
      }
      const legalRelatedClasse = [
        {
          Classe: this.normalizedClasseParvandeh(this.classeCode),
          Description: null,
          NIdCodeInfo_tmp: "0",
          NIdCopy_tmp: "0",
          NIdLegal: this.model.Legal_Info.NIdLegal,
          NIdRelatedClasse: uid(),
          NId_tmp: "0"
        }
      ]
      const payload = {
        PObj: {
          ...this.model,
          Legal_RelatedClasse: legalRelatedClasse
        }
      }
      this.showLoading()
      this.$services.ES.saveCreateClasse(payload)
        .then(({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            if (
              this.saveObjRes?.data?.SaveCreateClasseResult.Legal_RelatedClasse
            ) {
              this.showSuccess("کلاسه بایگانی با موفقیت ایجاد شد")
            }
            this.log({
              action: this.logActions.save,
              bizCode: this.nidWorkItem,
              bizCodeTitle: "NidWorkItem",
              nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
              nidWorkItem: this.nidWorkItem,
              saveDesc: `SaveCreateClasse For ${payload.Classe}`
            })
            this.searchObj()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    setClasseCode (model) {
      const help = model.split("-")
      return {
        District: help[0],
        Region: help[1],
        Block: help[2],
        House: help[3]
      }
    },
    ClasseCodeToString (model) {
      const help = `${model.District}-${model.Region}-${model.Block}-${model.House}`
      return help
    },
    checkValidations () {
      debugger
      if (this.searchObjRes.data.GetCreateClasseResult) {
        if (
          this.classeCode.District !== 0 &&
          this.classeCode.Region !== 0 &&
          this.classeCode.Block !== 0 &&
          this.classeCode.House !== 0
        ) {
          this.validationsBtn = false
        } else {
          this.validationsBtn = true
        }
      } else {
        this.validationsBtn = true
      }
    },
    normalizedClasseParvandeh (code) {
      var a = this.convertClasseParvandehCodeToString(code)
      var parts = a.split("-")
      var b = ""
      for (var i = 0; i < parts.length; i++) {
        var n = Number(parts[i])
        var s = n.toString().padStart(5, "0")
        b += s + "-"
      }
      b = b.slice(0, -1)
      return b
    }
  }
}
</script>
