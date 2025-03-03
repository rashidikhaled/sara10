<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getAllSealedNotCommissionRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="منطقه"
              label-width="50px"
              v-model="district"
              cdcName="district"
              source-type="local"
              :options="districts"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="از تاریخ"
              v-model="fromDate"
              cdcName="fromDate"
              label-width="50px"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label=" تا تاریخ"
              v-model="toDate"
              cdcName="toDate"
              label-width="50px"
            />
          </FormControl>
          <div>
            <btn-search @click="loadObj" />
          </div>
        </FormRow>
        <safa-grid
          title="لیست پلمپ هایی که به کمیسیون ارسال نشده اند"
          v-model="allSealedNotComList"
          cdcName="allSealedNotComList"
          helper="allSealedNotComListColumns"
          min-height="100px"
          height="100%"
          max-height="100%"
          paginate
          fit
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
      title: "پلمپ های بدون کمیسیون",
      formKey: "DC78A6C9-7947-4182-94D0-6529D21B6665",
      name: "UPolompNotComission",
      main: true,
      sidebarCompatible: true,

      // #variables
      fromDate: "",
      toDate: "",
      district: 0,
      allSealedNotComList: [],

      // #services
      getAllSealedNotCommissionRes: null
    }
  },

  mounted () {
    this.district = this.districts[0].ID ?? 1
    this.loadObj()
  },
  methods: {
    loadObj () {
      const payload = {
        pFromRow: 1,
        pToRow: 100,
        FromDate: this.fromDate,
        ToDate: this.toDate,
        District: this.district
      }
      this.showLoading()
      this.$services.SH.GetAllSealedNotCommission(payload)
        .then(async ({ data }) => {
          this.getAllSealedNotCommissionRes = this.getResponse(data)
          if (this.getAllSealedNotCommissionRes.success) {
            this.allSealedNotComList =
              this.getAllSealedNotCommissionRes.data
                ?.GetAllSealedNotCommissionResult?.AllSealedNotComList ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `نمایش اطلاعات فرم پلمپ های بدون کمیسیون انجام گردید.`
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  }
}
</script>
