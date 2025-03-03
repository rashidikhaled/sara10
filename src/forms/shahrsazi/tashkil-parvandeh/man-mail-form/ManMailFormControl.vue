<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <form-wrapper :title="title">
    <safa-status :result="requestResult" />
    <div class="row q-gutter-sm q-pa-sm">
      <safa-text
        label="کد ملی"
        v-model="nationalCode"
        cdcName="nationalCode"
        class="col-md-2"
        @keyup.enter="searchBlackList"
      />
      <btn-search @click="searchBlackList" />
      <btn-default
        @click="loadData"
        label="بازآوری"
      />
    </div>
    <safa-datatable
      helper="userInblackList"
      v-model="formData.BlackList"
      @row-click="handelRowClick"
    />
    <template v-slot:footer>
      <btn-save
        class="q-mr-sm"
        label="ارسال به لیست کنترلی"
        @click="showEnterBlackList=true"
      />
      <btn-delete label="خروج از لیست کنترلی" @click="exitBlackList"/>
    </template>

    <safa-popup
      title="ارسال به لیست کنترلی من میل"
      v-model="showEnterBlackList"
      height="275px"
      width="400px"
    >
     <form-wrapper>
      <div class="row q-col-gutter-sm">
        <safa-text
          label-width="70px"
          label="کد ملی"
          v-model="newNatinalCode"
          class="col-12"
        />
        <safa-text
          label-width="70px"
          label="توضیحات"
          v-model="enterComment"
          class="col-12"
          type="textarea"
          rows="4"
        />
    </div>
      <template v-slot:footer>
        <btn-save
          label="ارسال"
          @click="sendToBlackList"
        />
      </template>
     </form-wrapper>
    </safa-popup>

    <safa-popup
      title="خروج از لیست کنترلی من میل"
      v-model="showExitBlackList"
      height="240px"
      width="400px"
    >
    <form-wrapper>
        <safa-text
          label-width="70px"
          label="توضیحات"
          v-model="exitComment"
          type="textarea"
          rows="6"
        />
      <template v-slot:footer>
        <btn-delete
          label="خروج"
          @click="exitFromUGPBlackList"
        />
      </template>
      </form-wrapper>
    </safa-popup>
  </form-wrapper>
 </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: 'ManMailFormControl',
      title: 'فرم کنترلی من میل',
      formKey: '40c90422-0f05-4e98-8e38-62e58ffe94eb',
      main: true,
      requestResult: null,
      formData: { BlackList: [] },
      nationalCode: '',
      newNatinalCode: '',
      enterComment: '',
      exitComment: '',
      showEnterBlackList: false,
      showExitBlackList: false,
      selectedUser: null
    }
  },
  methods: {
    loadData () {
      this.showLoading()
      let payload = {}
      this.$services.SA.getAllUGPBlackList(payload)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)

          if (this.requestResult.success) {
            this.formData = this.requestResult.data
            this.formData.BlackList = this.formData.BlackList.map((x) => {
              if (x.EumBlackListStatus === 0) {
                x.class = 'exit-black-list'
              } else if (x.EumBlackListStatus === 1) {
                x.class = 'enter-black-list'
              }
              return x
            }
            )
          }
        })
        .catch(response => {
          console.error('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    searchBlackList () {
      this.showLoading()
      let payload = {
        pFromRow: 0,
        pToRow: 100,
        pNationalCode: this.nationalCode
      }

      this.$services.SA.getUGPBlackListNationalCode(payload)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)

          if (this.requestResult.success) {
            this.formData = this.requestResult.data
            this.formData.BlackList = this.formData.BlackList.map((x) => {
              if (x.EumBlackListStatus === 0) {
                x.class = 'exit-black-list'
              } else if (x.EumBlackListStatus === 1) {
                x.class = 'enter-black-list'
              }
              return x
            })
          }
        })
        .catch(response => {
          console.error('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handelRowClick (e) {
      this.selectedUser = e
    },
    exitFromUGPBlackList () {
      this.showLoading()
      let payload = {
        pBlack: {
          NidBlack: this.selectedUser.NidBlack,
          UserExit: this.getUserDisplayName(),
          NidUserExit: this.getNidUser(),
          ExitComments: this.exitComment
        }
      }

      this.$services.SA.exitFromUGPBlackList(payload)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)

          if (this.requestResult.success) {
            if (this.requestResult.data.Exit) {
              this.showSuccess('کد ملی با موفقیت از لیست کنترلی خارج گردید.')
              this.showExitBlackList = false
              this.exitComment = ''
              this.loadData()
            }
          }
        })
        .catch(response => {
          console.error('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    exitBlackList () {
      if (!this.selectedUser) {
        this.showError('لطفا یک ردیف از جدول انتخاب نمایید.')
      } else if (this.selectedUser.EumBlackListStatus === 1) {
        this.showError('کد ملی انتخاب شده از لیست کنترلی من میل خارج شده است.')
      } else { this.showExitBlackList = true }
    },
    send () {
      this.showLoading()
      let payload = {
        pBlack: {
          NationalCode: this.newNatinalCode,
          UserEnter: this.getUserDisplayName(),
          NidUserEnter: this.getNidUser(),
          EnterComments: this.enterComment
        }
      }
      this.$services.SA.sendToUGPBlackList(payload)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)

          if (this.requestResult.success) {
            this.showSuccess('کد ملی با موفقیت وارد لیست کنترلی گردید.')
            this.showEnterBlackList = false
            this.newNatinalCode = ''
            this.enterComment = ''
            this.loadData()
          }
        })
        .catch(response => {
          console.error('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    sendToBlackList () {
      this.showLoading()
      let payload = {
        pNationalCode: this.newNatinalCode
      }

      this.$services.SA.isInUGPBlackListWithNationalCode(payload)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)

          if (this.requestResult.success) {
            if (this.requestResult.data.IsExist) {
              this.showError('کد ملی وارد شده در لیست کنترلی وجود دارد.')
            } else {
              this.send()
            }
          }
        })
        .catch(response => {
          console.error('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
