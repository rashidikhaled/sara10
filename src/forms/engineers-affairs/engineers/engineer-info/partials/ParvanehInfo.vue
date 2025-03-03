<template>
  <safa-splitter v-model="splitterModel" horizontal style="min-height: 350px">
    <template v-slot:before>
      <fit>
        <safa-datatable
          title="پروانه اشتغال"
          v-model="model.ClsEngineer.Eng_JobAgreement"
          cdcName="Eng_JobAgreement"
          :m="m"
          fit
          height="100%"
          max-height="100%"
          min-height="150px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          class="q-mb-sm"
          addRow
          deleteRow
          allowCopy
          helper="engJobAgreement"
        />
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <safa-datatable
          title="صلاحیت ها"
          helper="EngCompetence"
          v-model="model.ClsEngineer.Eng_Competence"
          cdcName="Eng_Competence"
          :m="m"
          fit
          height="100%"
          max-height="100%"
          min-height="150px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          addRow
          deleteRow
          allowCopy
        />
      </fit>
    </template>
  </safa-splitter>
</template>

<script>
export default {
  props: {
    model: Object,
    m: String,
    formKey: String,
    title: String
  },
  data () {
    return {
      name: "ParvanehInfo",
      splitterModel: 50
    }
  }
}
</script>
