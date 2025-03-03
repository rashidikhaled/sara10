<template>
  <!-- <div> -->
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="خروج از بایگانی موقت در شهرسازی"
  >
    <form-wrapper
      :padding="false"
      title="خروج از بایگانی موقت در شهرسازی"
      vertical
    >
      <safa-status :results="result"></safa-status>
      <safa-status :results="sendResult"></safa-status>
      <fit>
        <safa-datatable
          ref="grid2"
          v-model="listArchive"
          :addRow="false"
          :allowMultipleSelection="false"
          :bordered="false"
          :clickable="true"
          :deleteRow="false"
          :filterable="true"
          :paginate="false"
          :perPage="[12]"
          :selectable="true"
          cdcName="listArchive"
          height="100%"
          helper="exitTempArchive"
          max-height="100%"
          min-height="100%"
          title="بایگانی موقت"
          @selection-change="selectedChange"
        ></safa-datatable>
      </fit>
      <template v-slot:footer>
        <btn-default label="خروج از بایگانی موقت شهرسازی" @click="exit"/>
      </template>
    </form-wrapper>
  </safa-form>
  <!-- </div> -->
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/archive/exit-tempArchive-shahrsazi',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: ' خروج از بایگانی موقت در شهرسازی',
      // formKey: "00cf9cbe-7190-4e60-9ec1-acee0f100645",
      formKey: '2a894751-244a-4d12-a00f-08b01f3f169e',
      name: 'ExitTempArchiveShahrsazi',
      main: true,
      sidebarCompatible: true,
      // pNidProc: '',
      results: [],
      listArchive: [],
      sendResult: null,
      result: null,
      selectedRow: null,
      isView: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  // mounted () {
  //   this.load()
  // },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.showLoading()
      this.listArchive = []
      let payLoad = {
        pFromRow: 0,
        pToRow: 100,
        pWhere:
          'OR (EumProcStatus=0 and ProcStatus like N\'%خروج از بایگانی موقت%\'))'
      }
      this.$services.SC.getAllListArchiveTemporaryShahrsazi(payLoad, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data.ListArchiveTemporaryShahrsazi

            this.results.forEach((item) => {
              this.listArchive.push({
                ...item.ArchiveTemporaryShahrsazi,
                ...item.TemporaryKartabl
              })
            })
            this.listArchive.forEach((itm) => {
              if (itm.EumProcStatus === 0) {
                itm.class = 'request-Status'
              } else {
                itm.class = 'request-Status-temp'
              }

              // itm.class="green"
            })
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode:
                  'OR (EumProcStatus=0 and ProcStatus like N\'%خروج از بایگانی موقت%',
                bizCodeTitle: 'pWhere'
              })
            }
            this.isView = true
          }
        })
        .catch((response) => {
          this.serverError()
          // console.log(response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (selectedRows) {
      this.selectedRow = selectedRows[0]
    },
    exit () {
      if (this.selectedRow !== null) {
        this.changeStatus()
      } else {
        this.showError('لطفا یکی از درخواست ها را انتخاب نمایید.')
      }
    },
    changeStatus () {
      this.showLoading()
      let payLoad = {
        pNidProc: this.selectedRow.NidProc,
        pEumProcStatus: 0,
        pProcStatus: 'خروج از بایگانی موقت در شهرسازی',
        pUser: this.currentUser
      }
      this.$services.SC.changeProcStatus(payLoad, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async ({ data }) => {
          this.sendResult = this.getResponse(data)
          if (this.sendResult.success) {
            this.showSuccess('پرونده به وضعیت جاری تبدیل شد.')
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRow.NidProc,
              bizCodeTitle: 'NidProc'
            })
            this.load()
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
