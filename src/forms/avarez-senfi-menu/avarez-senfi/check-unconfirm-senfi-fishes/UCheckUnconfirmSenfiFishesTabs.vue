<template>
  <div>
  <safa-form :id="formKey" :caption="title"
    app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc">
    <form-wrapper
      :ignoreTab="true"
      :hasFooter="false"
      title="بررسی فیش های تایید نشده از فایل بانکی"
      :padding="false"
    >
     <template #header>
        <safa-status :result="result"/>
     </template>
      <fit>
        <safa-datatable
          ref="grid"
          name="grid"
          helper="checkUncorfirmSenfiFishes"
          :hideToolbar="true"
          title="فیش های تایید نشده از فایل بانکی"
          height="250px"
          max-height="100%"
          v-model="notConfirmFishes"
        />
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu
              name="fishesInfo"
              label="اطلاعات فیش ها"
              @click="fishesInfo=true"
            />

            <tab-menu
              name="fishSearch"
              label="جستجوی فیش"
              @click="fishesInfo=false"
            />
          </template>
          <tab-content
            name="fishesInfo"
            :padding="false"
          >
            <UFishesInfo
              :name="name"
              :title="title"
              :formKey="formKey"
              :results="results"
            />
          </tab-content>

          <tab-content name="fishSearch">
            <UFishSearch
              :name="name"
              :title="title"
              :formKey="formKey"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>

        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          v-if="!fishesInfo"
        />
        <btn-save
          v-if="fishesInfo"
          label="تأیید"
        />
      </template>
    </form-wrapper>
  </safa-form>
  </div>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'
import UFishesInfo from './partials/UFishesInfo'
import UFishSearch from './partials/UFishSearch'

export default {
  mixins: [baseFormMixin, loaderMixin],
  route: 'avareze-senfi/check-uncorfirm-senfi-fishes',
  components: {
    UFishesInfo,
    UFishSearch
  },
  data: function () {
    return {
      name: 'UCheckUnconfirmSenfiFishesTabs',
      title: 'بررسی فیش های تایید نشده از فایل بانکی',
      formKey: '427b2744-498a-4294-abf4-f2add3720e01',
      main: true,
      fishesInfo: true,
      result: null,
      results: { BankFilesError: [] },
      activeTab: 'fishesInfo',
      notConfirmFishes: []
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.showLoading()
      let data = {
        pEumObjOnPrice: 3
      }
      this.$services.SB.getBankFileError(data, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data

            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
