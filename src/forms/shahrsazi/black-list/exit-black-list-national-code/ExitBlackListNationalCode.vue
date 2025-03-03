<template>
<safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    :caption="title"
  >
  <form-wrapper
    title="خروج از لیست سیاه با کد ملی"
    vertical
  >
    <safa-status :result="result"/>
    <safa-status :result="exitBlacKListResult"/>
    <fit>
      <div class="row q-gutter-sm q-mb-sm">
        <safa-text
          v-model="nationalCode"
          :maxlength="10"
          cdcName="nationalCode"
          class="col-12 col-md-3 col-sm-5"
          dir="ltr"
          label="کد ملی"
          label-width="51px"
          mask="##########"
          @keyup.enter="getNationalCodeBlackList"
        ></safa-text>
        <safa-combo
          v-model="results.NationalCodeBlackList.CI_BlackListCause"
          cdcName="BlackListCause"
          ciName="CI_BlackListCause"
          class="col-12 col-md-3 col-sm-5"
          domainName="CI_SaraM1"
          label="علت ورود"
          label-width="51px"
          m="r"
        ></safa-combo>
        <safa-combo-enum
          v-model="results.NationalCodeBlackList.EumBlackListControl"
          cdcName="BlackListControl"
          class="col-12 col-md-3 col-sm-5"
          enum-name="EumBlackListControl"
          label="نوع کنترل"
          label-width="51px"
          m="r"
        />
      </div>
      <div>
        <text-template
          v-model="results.NationalCodeBlackList.EnterComments"
          cdcName="EnterComments"
          class="fit"
          formKey="5C94C341-61FC-4674-AF03-13C74E959E8D"
          label="توضیحات"
          label-width="51px"
          margin="0"
        />
      </div>
    </fit>
    <template v-slot:footer>
      <div class="row q-gutter-md">
        <btn-default
          v-if="entereNationalCode"
          label="خروج از لیست سیاه"
          @click="exit"
        ></btn-default>
      </div>
    </template>
  </form-wrapper>
</safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/black-list/ExitBlackListNationalCode',

  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'خروج از لیست سیاه با کد ملی',
      formKey: '5C94C341-61FC-4674-AF03-13C74E959E8D',
      name: 'ExitBlackListNationalCode',
      main: true,
      selectedStatus: 0,
      entryCause: 0,
      comments: '',
      firstName: '',
      NidNosaziCode: '00000000-0000-0000-0000-000000000000',
      lastName: '',
      nationalcode: '',
      result: null,
      results: { NationalCodeBlackList: {} },
      selectedContact: null,
      entereNationalCode: false,
      nationalCode: '',
      exitBlacKListResult: null
    }
  },
  mounted () {
    this.results = {
      NationalCodeBlackList: {
        CI_BlackListCause: 0,
        EumBlackListControl: 0
      }
    }
  },
  methods: {
    getNationalCodeBlackList () {
      this.showLoading()
      let data = { pNationalCode: this.nationalCode }
      this.$services.SA.getNationalCodeBlackList(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            this.entereNationalCode = true

            await this.log({
              action: this.logActions.view,
              bizCode: this.nationalCode,
              bizCodeTitle: 'pNationalCode'
            })
          }
        })
        .catch(response => {
          console.error(response, 'load error')
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    exit () {
      this.showLoading()
      let payload = { pBlackListOwner: this.results.NationalCodeBlackList }
      payload.pBlackListOwner.NationalCode = this.nationalCode
      payload.pBlackListOwner.UserExit = this.getUserDisplayName()
      payload.pBlackListOwner.NidUserExit = this.getNidUser()
      payload.pBlackListOwner.NidNosaziCode = this.NidNosaziCode
      // let data = { pBlackListOwner: this.results.NationalCodeBlackList }
      this.$services.SA.exitFromBlackListWithNationalCode(payload)
        .then(async ({ data }) => {
          this.exitBlacKListResult = this.getResponse(data)
          if (this.exitBlacKListResult.success) {
            this.results.NationalCodeBlackList.CI_BlackListCause = 0
            this.results.NationalCodeBlackList.EumBlackListControl = 0
            this.results.NationalCodeBlackList.EnterComments = ''
            this.entereNationalCode = false

            await this.log({
              action: this.logActions.save,
              bizCode: this.nationalCode,
              bizCodeTitle: 'pNationalCode'
            })
            this.showSuccess('خروج لیست سیاه با موفقیت انجام شد.')
          }
        })
        .catch(response => {
          console.error(response, 'exit')
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
