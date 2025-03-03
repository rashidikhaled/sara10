<template>
   <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper vertical title="اعلام مامور بازدید" :padding="false">
      <fit>
        <template #header>
          <!-- <safa-status :result="result" /> -->
        </template>
        <FormRow class="q-pa-sm" :lg="3" :md="3" :sm="3" :xl="3">
          <form-control>
            <safa-combo
              label="نام مامور بازدید"
              :m="mode"
              :options="model.CI_Visitor"
              v-model="selectedCI_Visitor"
              source-type="local"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              format="jYYYY/jMM/jDD"
              display-format="dddd jDD jMMMM jYYYY"
              label="تاریخ بازدید"
              :m="mode"
              v-model="model._RevisitDate"
            >
            </safa-datepicker>
          </form-control>
        </FormRow>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="load"
          @save="save"
        >
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import { currentDate, currentTime } from "src/utils/index"
// import { uid } from "quasar"

export default {
  mixins: [baseFormMixin],
  main: true,

  data () {
    return {
      title: "راهنما",
      formKey: "8f7fcfbb-067e-495d-ae77-90e175c2ed79",
      name: "UFireHelp",
      main: true,
      result: null,
      model: {
        Visitor_Info: {
          CI_Visitor: null,
          NIdRequest: "00000000-0000-0000-0000-000000000000",
          NIdUser: "00000000-0000-0000-0000-000000000000",
          NIdVisitor: "00000000-0000-0000-0000-000000000000",
          RevisitDate: "",
          Comments: "",
          EnterDate: "",
          EnterTime: ""
        },
        CI_Visitor: [],
        ErrorResult: {},
        Visitor_List: [],
        _NIdRequest: "00000000-0000-0000-0000-000000000000",
        _NIdVisitor: "00000000-0000-0000-0000-000000000000",
        _RevisitDate: ""
      },
      selectedCI_Visitor: 0
    }
  },

  methods: {},

  mounted () {}
}
</script>
