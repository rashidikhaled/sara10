<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <fit>
      <div class="row items-center q-gutter-x-md q-mb-md">
        <div class="col-auto">
          <nosazi-code-input
            @enter="filterTextChanged"
            m="e"
            v-model="filterModel.NosaziCode"
            cdcName="NosaziCode"
          />
        </div>
      </div>
      <form-row class="q-mb-sm">
        <form-control>
          <safa-combo
            domainName="engineer"
            ciName="CI_FilesType"
            label="تاریخ تائید دستور تمدید"
            v-model="filterModel.CI_FilesType"
            cdcName="CI_FilesType"
            @input="filterTextChanged"
            label-width="70px"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            clearable
            label="تاریخ دستور"
            v-model="filterModel.StrNoTownDabir"
            cdcName="StrNoTownDabir"
            @change="filterTextChanged"
            label-width="70px"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            clearable
            label="تاریخ تقاضای تمدید"
            v-model="filterModel.StrNoTownDabir"
            cdcName="StrNoTownDabir"
            @change="filterTextChanged"
            label-width="70px"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره تایید دستور تمدید"
            v-model="filterModel.Address"
            cdcName="Address"
            @change="filterTextChanged"
            label-width="70px"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره دستور"
            v-model="filterModel.Address"
            cdcName="Address"
            @change="filterTextChanged"
            label-width="70px"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره تقاضای تمدید"
            v-model="filterModel.Address"
            cdcName="Address"
            @change="filterTextChanged"
            label-width="70px"
          />
        </form-control>
      </form-row>
    </fit>

    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @newInfo="clearData"
        @cancel="isEditable = false"
      >
        <template v-slot:after>
          <btn-default @click="confirm" label="تایید" />
          <btn-default @click="print" label="چاپ" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

const defaultmodel = {
  NosaziCode: {
    District: 0,
    Region: 0,
    Block: 0,
    House: 0,
    Building: 0,
    Apartment: 0,
    Shop: 0
  },
  BizCode: "",
  WorkflowTitel: "",
  ProcRequester: "",
  Apartment: "",
  Block: "",
  Building: "",
  District: "",
  House: "",
  Region: "",
  Shop: "",
  NidWorkItem: "",
  CI_FilesType: [],
  CI_Region: [],
  CI_RequestType: [],
  CI_Years: [],
  CI_FilesTypeSelected: [],
  From: 0,
  To: 50,
  CI_YearsSelected: [],
  UrbanNidKartablItem: "",
  StrNoTownDabir: "",
  RegisterPlack: "",
  OwnerName: "",
  ExportLicenseDate: "",
  Address: ""
}

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تقاضای نیابات قضایی",
      name: "UTaghazaNiabatGhazaee",
      formKey: "33e7876c-210c-4d2d-93ef-16dea5da3333",
      main: true,
      loading: false,
      filter: null,
      showall: false,
      showGardeshParvandeh: false,
      filterModel: {
        ...defaultmodel
      },
      currentData: []
    }
  }
}
</script>
