<template>
 <safa-form
      :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
  <form-wrapper :title="title">
    <fit>
      <expantion-section
        default-opened
        v-model="expansionState"
        title="شرایط گزارش"
      >
        <form-row>
          <form-control>
            <safa-datepicker
              label="تاریخ درخواست از"
              v-model="FromDate"
              label-width="100px"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تا "
              v-model="ToDate"
              label-width="40px"
            />
          </form-control>
          <form-control>
            <safa-combo
              label=" منطقه"
              :use-input="true"
              sourceType="local"
              v-model="Region"

              m="e"
              label-width="70px"
              domainName="engineer"
              ciName="CI_Region"
            />
          </form-control>
          <form-control>
            <safa-combo
              label=" نوع درخواست"
              :use-input="true"
              sourceType="local"
              v-model="RequestType"
              :options="options"
              m="e"
              label-width="70px"
            />
          </form-control>
        </form-row>
      </expantion-section>

      <expantion-section
        default-opened
        v-model="expansionState"
        title=" نحوه نمایش"
      >
        <form-row>
          <form-control>
            <safa-combo
              label=" سطر"
              :use-input="true"
              sourceType="local"
              v-model="Series"
              :options="options"
              m="e"
              label-width="70px"
            />
          </form-control>
          <form-control>
            <safa-combo
              label=" ستون "
              :use-input="true"
              sourceType="local"
              v-model="Column"
              :options="options"
              m="e"
              label-width="70px"
            />
          </form-control>
          <form-control>
            <safa-combo
              label=" تابع"
              :use-input="true"
              sourceType="local"
              v-model="AggregationFunc"
              :options="options"
              m="e"
              label-width="70px"
            />
          </form-control>
          <form-control>
            <safa-combo
              label="  مقدار"
              :use-input="true"
              sourceType="local"
              v-model="Value"
              :options="options"
              m="e"
              label-width="70px"
            />
          </form-control>
        </form-row>
      </expantion-section>
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
      name: "UanalyticalReportIssuedRequests",
      title: "گزارش تحلیلی درخواست های صادره",
      formKey: "0b4f37e5-e66e-48ed-97a7-9cf7d1305b77",
      main: true,
      FromDate: "",
      ToDate: "",
      Region: "",
      RequestType: "",
      Value: "",
      Series: "",
      AggregationFunc: "",
      Column: ""
    }
  }
}
</script>
