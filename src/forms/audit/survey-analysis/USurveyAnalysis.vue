<template>
  <safa-form
    appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getSurveyAnalysisRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              v-model="model.HouseCountInBlock"
              m="r"
              cdcName="txtHouseCount"
              label="تعداد املاک موجود در بلوک"
              label-width="120px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="model.HouseRequestCountInBlock"
              m="r"
              cdcName="txtRequestCount"
              label="تعداد املاک که درخواست جاری دارند"
              label-width="120px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="model.HouseCountInMap"
              m="r"
              cdcName="txtMap"
              label="تعداد املاک که جانمایی بر روی نقشه دارند"
              label-width="120px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="model.HouseCountNotInMap"
              m="r"
              cdcName="txtMap"
              label="تعداد املاک که جانمایی بر روی نقشه ندارند"
              label-width="120px"
            />
          </FormControl>
          <nosazi-code-input
            v-model="baseNosaziCode"
            @enter="loadObj"
            cdcName="baseNosaziCode"
            label-width="90px"
          />
          <div>
            <btn-search @click="loadObj" />
          </div>
        </FormRow>
        <safa-splitter v-model="spModel" vertical>
          <template v-slot:before>
            <fit>
              <safa-grid
                v-model="model.HouseCountNotInMap"
                cdcName="gvMapList"
                helper="gvMapListColumns"
                m="r"
                fit
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                v-model="model.HouseNotInMapList"
                cdcName="gvNotMapList"
                helper="gvMapListColumns"
                m="r"
                fit
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "آنالیز اطلاعات ملک",
      formKey: "37EA1BC4-F5ED-4739-B6B1-E2B57C014E8E",
      name: "USurveyAnalysis",
      main: true,

      spModel: 50,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        HouseCountInBlock: "",
        HouseRequestCountInBlock: "",
        HouseCountInMap: "",
        HouseCountNotInMap: "",
        HouseInMapList: [],
        HouseNotInMapList: []
      },
      getSurveyAnalysisRes: null
    }
  },
  methods: {
    async loadObj () {
      this.showLoading()
      const pNosaziCodeStr = convertNosaziCodeObjectToString(
        this.baseNosaziCode
      )
      try {
        const { data } = await this.$services.SO.getSurveyAnalysis({
          pNosaziCodeStr
        })
        this.getSurveyAnalysisRes = this.getResponse(data)
        if (this.getSurveyAnalysisRes.success) {
          this.model = this.getSurveyAnalysisRes.data
          await this.log({
            action: this.logActions.view,
            bizCode: pNosaziCodeStr,
            bizCodeTitle: "NosaziCode",
            nosaziCode: pNosaziCodeStr,
            saveDesc: `نمایش اطلاعات برای فرم آنالیز اطلاعات ملک با کد نوسازی ${pNosaziCodeStr} انجام گردید.`
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
