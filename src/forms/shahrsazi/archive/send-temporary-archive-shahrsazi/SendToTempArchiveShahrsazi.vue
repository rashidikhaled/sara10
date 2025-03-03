<template>
  <!-- <div> -->
  <!-- تغییر ساختار ظاهری به خواسته اقای حیدری -->
    <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <form-wrapper title="ارسال به بایگانی موقت در شهرسازی">
    <template #header>
      <safa-status :result="sendResult"/>
    </template>
    <div class="row">
      <safa-text
        v-model="status"
        :label-shrink="false"
        cdcName="status"
        class="col-12 col-md-3 col-sm-4"
        label="وضعیت پرونده"
      ></safa-text>
    </div>
    <template v-slot:footer>
      <div v-if="!isArchived">
        <btn-default
          label="ارسال به بایگانی موقت"
          @click="sendRequest"
        />
      </div>
      <div v-else>
        <btn-default
          label=" خروج از بایگانی موقت"
          @click="sendRequest"
        />
      </div>
    </template>
  </form-wrapper>
    </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/archive/send-tempArchive-shahrsazi',

  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'ارسال به بایگانی موقت در شهرسازی',
      formKey: '2E132C1A-DF76-40BC-9DC9-D602D2688E24',
      name: 'SendToTempArchiveShahrsazi',
      main: true,
      sidebarCompatible: true,
      sendResult: null,
      isArchived: null,
      status: ''
    }
  },
  mounted () {
    if (this.selectedRequest) {
      if (this.selectedRequest.EumTaskStatus !== 5) {
        this.isArchived = false
      }
      if (this.selectedRequest.EumTaskStatus === 0) {
        this.status = 'شروع نشده'
      } else if (this.selectedRequest.EumTaskStatus === 1) {
        this.status = 'جاری'
      } else if (this.selectedRequest.EumTaskStatus === 2) {
        this.status = 'منتظر'
      } else if (this.selectedRequest.EumTaskStatus === 3) {
        this.status = 'کامل شده'
      } else if (this.selectedRequest.EumTaskStatus === 4) {
        this.status = 'ابطال شده'
      } else {
        this.status = 'بایگانی موقت'
      }
    } else {
      this.showError('هیچ درخواستی از کارتابل انتخاب نشده است.')
    }
  },
  methods: {
    sendRequest () {
      this.showLoading()
      let data = {}
      if (this.selectedRequest.EumTaskStatus !== 5) {
        data = {
          pNidProc: this.selectedRequest.NidProc,
          pEumProcStatus: 5,
          pProcStatus: 'ارسال به بایگانی موقت در شهرسازی',
          pUser: this.currentUser
        }
      } else {
        data = {
          pNidProc: this.selectedRequest.NidProc,
          pEumProcStatus: 1,
          pProcStatus: 'خروج از بایگانی موقت در شهرسازی',
          pUser: this.currentUser
        }
      }

      this.$services.SC.changeProcStatus(data)
        .then(async ({ data }) => {
          this.sendResult = this.getResponse(data)

          if (this.sendResult.success) {
            this.showSuccess('ارسال به بایگانی موقت با موفقیت انجام شد.')
            await this.log({
              action: this.logActions.send,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              saveDesc: 'ارسال به بایگانی موقت در شهرسازی'
            })
          }
        })
        .catch((response) => {
          this.sendResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
