<template>
  <div>
    <form-row>
      <form-control>
        <safa-text
          label=" نام موقوفه"
          label-width="100px"
          v-model="value.Legal_Info.EndowmentName"
          cdcName="EndowmentName"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-combo
          ciName="CI_BeneficCurent"
          domain-name="Estate"
          label="بهره برداری(موجود)"
          label-width="100px"
          v-model="value.Legal_Info.CI_BeneficCurent"
          cdcName="CI_BeneficCurent"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="بهره بردار"
          label-width="100px"
          v-model="value.Legal_Info.BeneficCurent"
          cdcName="BeneficCurent"
          :rows="1"
          class="col-12"
          fit
          :m="m"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm">
      <text-template
        label="توضیحات حقوقی"
        label-width="100px"
        v-model="value.Legal_Info.LegalDesc"
        cdcName="LegalDesc"
        :rows="2"
        formKey="A47F65C1-408D-4F20-820C-4B684EE73607"
        class="col-12"
        :m="m"
      />
    </form-row>
    <form-row class="q-mt-sm">
      <form-control>
        <safa-combo
          label="کد منبع تامین"
          v-model="value.Legal_Info.NIdSupplySources"
          cdcName="NIdSupplySources"
          :options="SupplySources"
          sourceType="local"
          label-width="100px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label=" عنوان منبع تامین"
          label-width="100px"
          v-model="helpModel.SupplySourcesTitle"
          cdcName="SupplySourcesTitle"
          m="r"
        />
      </form-control>
      <form-control>
        <safa-text
          label="نحوه دریافت"
          label-width="100px"
          v-model="helpModel.GettingKind"
          cdcName="GettingKind"
          m="r"
        />
      </form-control>
      <form-control>
        <safa-text
          label="مالکیت دریافتی"
          label-width="100px"
          v-model="helpModel.GettingOwner"
          cdcName="GettingOwner"
          m="r"
        />
      </form-control>
      <form-control>
        <safa-combo
          ciName="CI_CessionKind"
          domain-name="Estate"
          label="نحوه واگذاری"
          label-width="100px"
          v-model="value.Legal_Info.CI_CessionKind"
          cdcName="CI_CessionKind"
          :m="m"
          required
          :validations="['required', 'number']"
        />
      </form-control>
      <form-control>
        <safa-combo
          ciName="CI_CessionOwner"
          domain-name="Estate"
          label="مالکیت واگذاری"
          label-width="100px"
          v-model="value.Legal_Info.CI_CessionOwner"
          cdcName="CI_CessionOwner"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-combo
          ciName="CI_AssignmentCapability"
          domain-name="Estate"
          label="قابلیت واگذاری"
          label-width="100px"
          v-model="value.Legal_Info.CI_AssignmentCapability"
          cdcName="CI_AssignmentCapability"
          :m="m"
        />
      </form-control>
    </form-row>
    <form-row class="q-mt-sm">
      <text-template
        label="توضیحات تامین"
        label-width="100px"
        v-model="value.Legal_Info.SupplySourcesDesc"
        cdcName="SupplySourcesDesc"
        :rows="2"
        formKey="F19985C6-9A02-4547-B830-9CA412CBE899"
        class="col-12"
        :m="m"
      />
    </form-row>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    title: String,
    name: String,
    value: Object,
    m: String,
    SupplySources: Array
  },
  data () {
    return {
      helpModel: {
        SupplySourcesTitle: "",
        GettingKind: "",
        GettingOwner: ""
      }
    }
  },

  watch: {
    "value.Legal_Info.NIdSupplySources" (value) {
      this.SupplySources.forEach((e) => {
        if (e.ID === value) {
          this.helpModel.SupplySourcesTitle = e.SupplySourcesTitle
          this.helpModel.GettingKind = e.GettingKind
          this.helpModel.GettingOwner = e.GettingOwner
        }
      })
      this.$emit("helpModelUpdate", this.helpModel)
    }
  },
  methods: {}
}
</script>
