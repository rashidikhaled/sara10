<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="کد عضویت"
          label-width="80px"
          v-model="value.IdentityCode"
          cdcName="IdentityCode"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="رشته تحصیلی"
          label-width="80px"
          ciName="CI_StudyField"
          domainName="engineer"
          v-model="value.CI_StudyField"
          cdcName="CI_StudyField"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام مهندس"
          label-width="80px"
          v-model="value.EngName"
          cdcName="EngName"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="دانشگاه"
          label-width="80px"
          ciName="CI_University"
          domainName="engineer"
          v-model="value.CI_University"
          cdcName="CI_University"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع صلاحیت"
          label-width="80px"
          ciName="CI_Ability"
          domainName="engineer"
          v-model="value.CI_Ability"
          cdcName="CI_Ability"
        />
      </FormControl>
      <div>
        <btn-search label="جستجو" @click="loadObj" />
      </div>
    </FormRow>
    <safa-datatable
      helper="engineersList"
      title="لیست مهندسین"
      v-model="engineersList"
      cdcName="engineersList"
      :show-selected-checkbox="true"
      :allowMultipleSelection="true"
      m="r"
      height="100%"
      max-height="100%"
      fit
      paginate
      :deleteRow="false"
      :addRow="false"
      :take="20"
      :pageSize="20"
      :allowCopy="false"
      @selectedChange="selectedChange"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    title: String,
    formKey: String
  },
  data () {
    return {
      name: "Engineers",
      engineersList: []
    }
  },
  created () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.engineers.getEngListInCondition({
          pWhere_IdentityCode: this.value.IdentityCode,
          pWhere_EngName: this.value.EngName,
          pWhere_StudyField: this.value.CI_StudyField,
          pWhere_CI_Ability: this.value.CI_Ability,
          pWhere_University: this.value.CI_University,
          pFromRow: 0,
          pToRow: 20
        })
        const res = this.getResponse(data)
        if (res.success) {
          await this.log({
            action: this.logActions.send,
            bizCode: this.value.IdentityCode,
            bizCodeTitle: "IdentityCode"
          })
          this.engineersList =
            res.data?.GetEngList_InConditionResult?.EngList_InCondition ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    selectedChange (e) {
      this.$emit("selectEngineers", e.selectedItems)
    }
  }
}
</script>
