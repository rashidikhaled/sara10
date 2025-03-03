<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <FormWrapper :title="title">
      <template #header>
        <safa-status :result="searchObjRes" />
        <safa-status :result="rowClickObjRes" />
      </template>
      <fit>
        <div class="q-mb-sm">
          <div class="row q-col-gutter-sm">
            <safa-text
              class="col-12 col-sm-6 col-md-3"
              label="شماره درخواست"
              v-model="NidWorkItem"
              cdcName="NidWorkItem"
              @keyup.enter="searchObj"
            />
            <div v-if="!forceReadonly" class="col-12 col-sm-auto">
              <btn-default label="جستجو" @click="searchObj" />
            </div>
          </div>
        </div>
        <safa-splitter
          v-model="splitterModel"
          class="fit"
          horizontal
          margin="0"
          style="min-height: 150px"
        >
          <template v-slot:before>
            <safa-grid
              v-model="rowGrid1"
              cdcName="rowGrid1"
              :title="title"
              fit
              max-height="100%"
              height="100%"
              minHeight="100%"
              name="grid"
              :allowMultipleSelection="false"
              helper="ListIncome_Fiche_Dig"
              @row:click="rowClickObj"
            />
          </template>
          <template v-slot:after>
            <safa-grid
              class="q-sm-mt"
              v-model="rowGrid2"
              cdcName="rowGrid2"
              fit
              max-height="100%"
              height="100%"
              minHeight="100%"
              name="grid"
              :allowMultipleSelection="false"
              :columns="columns2"
              :hideHeader="true"
            />
          </template>
        </safa-splitter>
      </fit>
    </FormWrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "گزارش فیش درآمدی",
      formKey: "95aa6917-746c-41cf-86fa-d52a83665213",
      name: "UExcavationIncomeFich",
      main: true,
      NidWorkItem: "",
      loadObjRes: null,
      searchObjRes: null,
      rowClickObjRes: null,

      // grids
      splitterModel: 50,
      rowGrid1: [],
      rowGrid2: [],
      columns2: []
    }
  },
  methods: {
    async searchObj () {
      try {
        this.showLoading()
        const payload = {
          pRequest: {
            NidWorkItem: this.NidWorkItem
          }
        }
        const { data } = await this.$services.excavation.getIncomeFiche(
          payload
        )
        this.searchObjRes = this.getResponse(data)
        if (this.searchObjRes.success) {
          this.rowGrid1 =
            this.searchObjRes.data.GetIncomeFicheResult.ClsIncomeFiche.ListIncome_Fiche
          this.rowGrid2 = []
          this.columns2 = []
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `عملیات جستجو برای شماره درخواست ${this.NidWorkItem}`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeArray (e) {
      if (!Array.isArray(e)) return
      const val =
        e.map((a) =>
          Object.fromEntries(Object.entries(a).map(([k, v]) => [k, v.Value]))
        ) ?? []
      return val
    },
    async rowClickObj (dataItem) {
      try {
        this.showLoading()
        const payload = {
          pRequest: {
            NidProc: dataItem.data.NIdProc
          }
        }
        const { data } = await this.$services.excavation.getSubIncomeFiche(
          payload
        )
        this.rowClickObjRes = this.getResponse(data)
        if (this.rowClickObjRes.success) {
          const rows =
            this.rowClickObjRes.data.GetSubIncomeFicheResult.ClsIncomeFiche
              ?.ExportLicenseInfo.License_AsphaltCoating[0] ?? []
          // if (rows.length > 0) {
          this.columns2 = []
          for (let i in rows) {
            this.columns2.push({
              field: i,
              title: rows[i].Header,
              width: "150px"
            })
          }
          for (let i in rows) {
            this.rowGrid2.push({
              field: rows[i].Value,
              title: i,
              width: "150px"
            })
          }
          // this.rowGrid2 = this.normalizeArray(rows) ?? []
          // }
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `عملیات جستجو برای سطر انتخاب شده بر اساس ${this.NidProc}`
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
