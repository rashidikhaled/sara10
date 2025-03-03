<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title" :padding="false">
      <safa-tabs v-model="activeTab" class="fit">
        <template v-slot:tabs>
          <tab-menu name="request" label="درخواست ها" />
          <tab-menu name="contracts" label="قراردادها" />
          <tab-menu name="sourcesOfSupply" label="منابع تأمین" />
        </template>
        <tab-content name="request">
          <Request :name="name" :title="title" :formKey="formKey" />
        </tab-content>
        <tab-content name="contracts">
          <contracts :name="name" :title="title" :formKey="formKey" />
        </tab-content>
        <tab-content name="sourcesOfSupply">
          <SourcesOfSupply :name="name" :title="title" :formKey="formKey" />
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>

<script>
import Request from "./partials/Request.vue"
import Contracts from "./partials/Contracts.vue"
import SourcesOfSupply from "./partials/SourcesOfSupply.vue"

export default {
  components: {
    Request,
    Contracts,
    SourcesOfSupply
  },
  data () {
    return {
      name: "UAnalyticReport",
      title: "گزارشات تحلیلی املاک و مستغلات",
      formKey: "5E8BE857-A8EB-4585-B84C-5AA6613CDE7B",
      main: true,

      activeTab: "request"
    }
  }
}
</script>
