<template>
    <fit>
      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-combo
            label="محدوده"
            label-width="100px"
            ciName="CI_Region"
            domainName="CI_SaraM1"
            v-model="Region"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label=" وضعیت خاص"
            label-width="100px"
            ciName="CI_SpecialStatus"
            domainName="CI_SaraM1"
            v-model="SpecialStatus"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-text
            label="جمعیت"
            v-model="Population"
            label-width="100px"
          ></safa-text>
        </form-control>
        <form-control>
          <safa-combo
            label="نوع حصار"
            label-width="100px"
            ciName="CI_IncloseType"
            domainName="CI_SaraM1"
            v-model="IncloseType"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="نوع ملک"
            label-width="100px"
            ciName="CI_HouseType"
            domainName="CI_SaraM1"
            v-model="HouseType"
            m="e"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-combo
            label="مرجع صدور سند"
            label-width="100px"
            ciName="CI_DocRefrence"
            domainName="CI_SaraM1"
            v-model="DocRefrence"
            m="e"
          ></safa-combo>
        </form-control>
        <form-control>
          <safa-text
            label="شماره قطعه"
            v-model="comNumber"
            label-width="100px"
          ></safa-text>
        </form-control>
      </div>

      <safa-datatable
        title="شماره سند ملک"
        fit
        min-height="100px"
        height="100%"
        max-height="100%"
        v-model="melkDocumentNumber"
        helper="melkDocumentNumberColumns"
        :m="mode"
        :take="20"
        :addRow="false"
        :allowCopy="false"
        :deleteRow="false"
        :isEditable="true"
      />
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "otherSpecifications",
      Region: "",
      SpecialStatus: "",
      IncloseType: "",
      HouseType: "",
      DocRefrence: "",
      Population: "",
      comNumber: "",
      melkDocumentNumber: []
      // melkDocumentNumberColumns: [
      //   { field: "ArsehDocNo", title: " شماره سند عرصه" },
      //   { field: "AyanDocNo", title: "شماره سند اعیان" },
      // ],
    }
  }
}
</script>
