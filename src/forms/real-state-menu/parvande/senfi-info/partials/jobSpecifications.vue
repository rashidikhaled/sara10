<template>
<fit>
    <div class="row q-col-gutter-sm q-mb-sm">
      <form-control>
        <safa-text
          label="نام واحد شغلی"
          label-width="100px"
          v-model="Result.Base_JobInfo.JobUnitName"
          :m="mode"
        ></safa-text>
      </form-control>
    </div>

    <div class="row q-col-gutter-sm q-mb-sm">
      <form-control>
        <safa-combo
          label="نوع محل کسب"
          label-width="100px"
          ciName="CI_BusinessLocaleType"
          domainName="Estate"
          v-model="Result.Base_JobInfo.CI_BusinessLocaleType"
          :m="mode"
        ></safa-combo>
      </form-control>
    </div>

    <div class="row q-col-gutter-sm q-mb-sm">
      <form-control>
        <safa-text
          label="طبقه وقوع "
          label-width="100px"
          v-model="Result.Base_JobInfo.FloorDone"
          :m="mode"
        ></safa-text>
      </form-control>
    </div>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

const defaultModel = {
  Base_JobInfo: {
    CI_BusinessLocaleType: "",
    CI_DutyYear: "",
    CI_HoldKind: "",
    CI_JobCode: "",
    Comments: "",
    FloorDone: "",
    JobActivateDate: "",
    JobDeActivateDate: "",
    JobUnitName: "",
    Nid: "",
    NidCopy: "",
    NidJobInfo: "",
    WorkerCount: ""
  }
}

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "jobSpecifications",

      Result: {
        Base_JobInfo: { ...defaultModel }
      }
    }
  }
}
</script>

<style>
