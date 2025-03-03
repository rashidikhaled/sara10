<template>
    <safa-form :id="formKey" :caption="title" appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
        <form-wrapper :title="title" vertical>
            <template #header>
            </template>
            <fit>
                <safa-tabs :padding="false" fit class="fit" v-model="activeTab">
                    <template v-slot:tabs>
                        <tab-menu name="details" label="مشخصات" />
                        <tab-menu name="archive" label="آرشیو" />

                    </template>
                    <tab-content name="details">
                    </tab-content>
                    <tab-content name="archive">
                    </tab-content>
                </safa-tabs>
            </fit>
        </form-wrapper>
    </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import axios from 'axios'

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'نتیجه رای کمیسیون 77',
      formKey: '997b735a-94c4-4026-951c-e81e1e1176bb',
      name: 'Commission77VoteResult',
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      url: null
    }
  },
  components: {
  },
  async created () {
    await this.combinedBillData()
  },
  methods: {
    async combinedBillData () {
      this.url = "https://c77.mashhad.ir:8080/services/Incomes/CombinedBillData" //  ببرش داخل کانفیگ
      const data = await this.fetchToken()
      this.authorizationToken = `bearer ${data.access_token}`
      if (!this.url) return
      return new Promise((resolve, reject) => {
        axios.get(this.url, {
          headers: {
            contentType: 'application/json',
            Authorization: this.authorizationToken
          },
          withCredentials: true,
          timeout: 120 * 1000
        }).then(({ data }) => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>
