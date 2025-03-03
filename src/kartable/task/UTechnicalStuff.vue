<template>
  <div class="column" style="min-height: inherit; position: relative;height: 100%;">
    <fit>
      <div class="alert alert-warning q-mb-sm" v-if="errorMsg">
        <q-btn @click="errorMsg=null" dense flat icon="close" round/>&nbsp;{{ errorMsg }}
      </div>
      <div v-if="loading" class="flex absolute-full justify-center items-center fit">
        <q-spinner color="green" size="lg"/>
      </div>
      <iframe :src="formUrl"
              @error="loading = false"
              @load="loading = false"
              class="fit" height="100%" style="border: none;" v-if="NidUrg" width="100%"/>
    </fit>
  </div>
</template>

<script>
// import baseFormMixin from 'src/mixins/baseFormMixin'
import { appendUrls } from 'src/utils'

export default {
  name: 'UTechnicalStuff',
  // mixins: [baseFormMixin],
  props: {
    taskInfo: Object
  },
  data () {
    return {
      NidUrg: null,
      errorMsg: null,
      loading: true
    }
  },
  computed: {
    formUrl () {
      // eslint-disable-next-line no-undef
      const baseUrl = window.getConfigValue('citizenBaseUrl')
      return appendUrls([baseUrl, `/?formName=UEmbeddedBase&state=${this.NidUrg}`])
    }
  },
  async created () {
    const payload = JSON.stringify({
      user: { ...this.$stSecurity.getters['authorize/user'] || {}, Token: null, token: null },
      token: this.$stSecurity.getters['authorize/token'] || '',
      nidSession: this.$stSecurity.getters['authorize/session'] || '',
      formName: 'UTechnicalStuff',
      props: {
        checkList: { ...this.taskInfo, nosaziCode: this.taskInfo.BizCode }
      }
    })

    const { data } = await this.$srvWorkflow.generateApiKey({ StrValue: payload })
    if (data.success) {
      this.NidUrg = data.data
    } else {
      this.errorMsg = data.msg
    }
  }
}
</script>
<style scoped>

</style>
