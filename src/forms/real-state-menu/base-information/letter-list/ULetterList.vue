<template>
  <safa-form
    :caption="title"
    :id="formKey"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="preLoadObjRes" />
        <safa-status :result="loadObjRes" />
      </template>
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              v-model="NIdYear"
              ciName="NIdYear"
              domainName="Estate"
              label="سال"
              m="r"
              label-width="70px"
              cdcName="NIdYear"
            />
          </form-control>
          <form-control>
            <safa-combo
              v-model="LetterType"
              source-type="local"
              :options="optionsCombo"
              label="نوع نامه"
              m="r"
              label-width="70px"
              cdcName="LetterType"
            />
          </form-control>
        </form-row>
        <safa-datatable
          v-model="Letter_Info"
          cdcName="Letter_Info"
          title="نامه"
          fit
          height="100%"
          helper="Letter_Info_Col"
          m="r"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "ULetterList",
      title: "مکاتبات",
      formKey: "9E170E98-30A5-4DE6-81FF-B6C6276308FF",
      main: true,

      // variables
      ListItem: [],
      optionsCombo: [
        { ID: 0, title: "وارده" },
        { ID: 1, title: "صادره" },
        { ID: 2, title: "داخلي" }
      ],
      NIdYear: 0,
      LetterType: null,

      // services
      preLoadObjRes: null,
      loadObjRes: null,

      // grids
      Letter_Info: []
    }
  },
  created () {
    this.preLoadObj()
    this.loadObj()
  },
  methods: {
    async preLoadObj () {
      this.showLoading()
      try {
        const { data } = await this.$services.ES.getLetterInfoMessage({})
        this.preLoadObjRes = this.getResponse(data)
        if (this.preLoadObjRes.success) {
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadObj () {
      this.showLoading()
      try {
        const { data } = await this.$services.ES.getLetterInfo({
          PNIdYear: this.NIdYear,
          PSysCI_LetterType: this.LetterType ? this.LetterType + 1 : "1"
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.Letter_Info =
            this.loadObjRes.data.GetLetter_InfoResult.Letter_Info ?? []
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `نمایش فرم لیست نامه ها`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
