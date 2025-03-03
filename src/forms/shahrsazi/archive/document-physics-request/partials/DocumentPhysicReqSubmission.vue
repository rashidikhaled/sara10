<template>
  <fit>
    <safa-status :results="result"></safa-status>
    <div class="row q-px-sm">
      <div class="col-12">
        <text-template
          v-model="comment"
          :m='editmode'
          cdcName="comment"
          class="q-mt-sm"
          formKey="A9C0DE5E-23F4-4177-A612-EBF09B87A2EF"
          label="توضیحات"
        />
      </div>
    </div>
  </fit>

</template>
<script>
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin, messageMixin],
  data: function () {
    return {
      result: null,
      comment: '',
      sendDocBtn: false,
      printArray: null,
      sendDocArray: null
    }
  },
  props: {
    nosaziCode: {
      type: String,
      default: ''
    },
    results: Object,
    editmode: String,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  // watch: {
  //   nosaziCode () {
  //     this.recieveDoc()
  //   }
  // },
  methods: {
    printRequest () {
      this.showLoading()
      let data = {
        pPrintRequest: {
          PrintRequest: {
            Comment: this.comment,
            DateRequest: '',
            NidNosaziCode: this.nosaziCode,
            NidPrintRequest: '00000000-0000-0000-0000-000000000000',
            RequestStatus: 1,
            RequestUser: '7bc16d9a-9ac4-47af-bc28-adad1622a053',
            RequestUserName: 'مدیر سیستم',
            TimeRequest: ''
          },
          PrintRequestList: []
        }
      }
      if (this.sendDocBtn) {
        data.pPrintRequest.PrintRequest.RequestStatus = 2
      }

      this.$services.SC.printRequest(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.showSuccess('عملیات با موفقیت انجام شد.')
            await this.log({
              action: this.logActions.save,
              bizCode: this.nosaziCode,
              bizCodeTitle: 'nosaziCode'
            })
            this.sendDocBtn = false
            this.$emit('backToMainForm', true)
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    recieveDoc () {
      if (this.nosaziCode !== '') {
        this.printArray = this.results.PrintRequestList.find(
          element =>
            element.NidNosaziCode === this.nosaziCode &&
            element.RequestStatus === 1
        )
        this.sendDocArray = this.results.PrintRequestList.find(
          element =>
            element.NidNosaziCode === this.nosaziCode &&
            element.RequestStatus === 2
        )

        if (this.printArray === undefined) {
          this.printRequest()
        } else if (
          this.printArray !== undefined &&
          this.sendDocArray !== undefined
        ) {
          if (
            (this.sendDocArray.DateRequest === this.printArray.DateRequest &&
              this.sendDocArray.TimeRequest > this.printArray.TimeRequest) ||
            this.sendDocArray.DateRequest > this.printArray.DateRequest
          ) {
            this.printRequest()
          } else {
            this.showError(
              'کاربر گرامی قبلا درخواست دریافت پرونده توسط شما ثبت شده است.'
            )
          }
        } else {
          this.showError(
            'کاربر گرامی قبلا درخواست دریافت پرونده توسط شما ثبت شده است.'
          )
        }
      } else {
        this.showError('لطفا کد نوسازی را وارد نمایید.')
      }
    },
    sendDoc () {
      if (this.nosaziCode !== '') {
        // debugger
        this.sendDocBtn = true
        this.printArray = this.results.PrintRequestList.find(
          element =>
            element.NidNosaziCode === this.nosaziCode &&
            element.RequestStatus === 1
        )
        this.sendDocArray = this.results.PrintRequestList.find(
          element =>
            element.NidNosaziCode === this.nosaziCode &&
            element.RequestStatus === 2
        )
        if (this.sendDocArray === undefined && this.printArray === undefined) {
          // (this.sendDocArray === undefined && this.printArray !== undefined)
          this.printRequest()
        } else if (
          this.printArray !== undefined &&
          this.sendDocArray !== undefined
        ) {
          if (
            (this.sendDocArray.DateRequest === this.printArray.DateRequest &&
              this.sendDocArray.TimeRequest < this.printArray.TimeRequest) ||
            this.sendDocArray.DateRequest < this.printArray.DateRequest
          ) {
            this.printRequest()
          } else {
            this.showError(
              'کاربر گرامی قبلا درخواست تحویل پرونده توسط شما ثبت شده است.'
            )
          }
        } else if (
          this.sendDocArray === undefined &&
          this.printArray === undefined
        ) {
          this.showError(
            'کاربر گرامی ابتدا باید درخواست دریافت پرونده را ثبت کنید.'
          )
        } else {
          this.showError(
            'کاربر گرامی قبلا درخواست تحویل پرونده توسط شما ثبت شده است.'
          )
        }
      } else {
        this.showError('لطفا کد نوسازی را وارد نمایید.')
      }
    }
  }
}
</script>
