<template>
  <form-wrapper>
    <section class="UCanceledRefrence">
        <h1 class="form-title text-h6 q-mb-lg"><span>ارجاعات انصراف داده شده</span></h1>
        <div class="row q-col-gutter-md">

          <div class="col-12">
            کد نوسازی <RefreshCode
              @listForService="listForService"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              label="کد عضویت"
              v-model="searchCancelPrequest.pIdentityCode"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              label="نام"
              v-model="searchCancelPrequest.pEngName"
            />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <safa-text
              label="نام خانوادگی"
              v-model="searchCancelPrequest.pEngFamily"
            />
          </div>
          <div class="row q-col-gutter-md items-end">
            <div class="col-12 col-md-auto">
              <q-btn
                label="جستجو"
                color="green"
                @click="getRefEngineerCancelList"
              />
            </div>
            <div class ="col-12 col-md-auto">
              <q-btn
                label="پاک کردن"
                color="primary"
                @click="emptySearchCancelPrequest"
              />
            </div>
          </div>
          <safa-datatable
            height="calc(100vh - 400px)"
            v-model="cancelItems"
            helper="supervisorEng.canceledRefrence"
            :paginate="false"
            :hideHeader="true"
            @RejectClick="notConfirmRefEngineerCancel"
            @AcceptClick="confirmRefEngineerCancel"
          ></safa-datatable>
        </div>
    </section>
  </form-wrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import RefreshCode from '../../../../../components/RefreshCode'

export default {
  name: 'canceledRefrences',
  route: '/supervisor-engineering/engineers-affairs/canceled-refrences/UCanceledRefrences',
  mixins: [baseFormMixin],
  components: {
    RefreshCode
  },
  data () {
    return {
      cancelItems: null,
      searchCancelPrequest: {
        pIdentityCode: '',
        pEngName: '',
        pEngFamily: '',
        pCodeString: '',
        pFromRow: '0',
        pToRow: '50'
      },
      rejectAndConfirmCancelPrequest: {
        'pNidRef': '',
        'pNidUser': '7bc16d9a-9ac4-47af-bc28-adad1622a054',
        'pUserName': 'sa'
      }

    }
  },
  props: {
    results: {},
    isEditable: {
      type: Boolean,
      defalt: false
    }
  },
  watch: {
    isEditable (value) {
      if (value) {
        this.addGridRecord()
      } else {
        this.gridItems.map(row => {
          this.editRow(row, false)
        })

        // this.gridItems = this.results.pRequest.ClsEngineer.Eng_JobAgreement

        if (this.gridItems[0].isNew) {
          this.gridItems.splice(0, 1)
        }
      }
    },
    gridItems () {
      this.results.pRequest.ClsEngineer.Eng_JobAgreement = this.gridItems
    }
  },
  //   created () {
  //     this.gridItems = this.results.pRequest.ClsEngineer.Eng_JobAgreement
  //     this.gridKey = 'NIdJobAgreement'
  //   },
  mounted () {
    // this.gridItems = this.results.pRequest.ClsEngineer.Eng_JobAgreement

    // if (this.isEditable) {
    //   this.addGridRecord()
    // }

    this.getRefEngineerCancelList()
  },
  methods: {
    // rowClick (e) {
    //   if (this.isEditable) {
    //     this.editRow(e.dataItem)
    //   }
    getRefEngineerCancelList () {
      this.showLoading()
      this.$services.engineers
        .GetRefEngineerCancelList(this.searchCancelPrequest)
        .then(response => {
          this.hideLoading()

          this.cancelItems = this.getResponse(
            response.data
          ).data.GetRefEngineerCancel_ListResult.RefEngineerCancel_List
        })
        .catch(ex => {
          // this.$q.dialog({
          //   title: 'خطا در سرور',
          //   message: 'متاسفانه مشکلی در سیستم رخ داده است.'
          //   // message: ex.message
          // })
          this.serverError()
        })
    },
    listForService (e) {
      // let refreshCodeString = ''

      // for (let index = 0; index < e.length; index++) {
      //   if (index + 1 < e.length) {
      //     refreshCodeString += e[index] + '-'
      //   } else {
      //     refreshCodeString += e[index]
      //   }
      // }
      this.searchCancelPrequest.pCodeString = e
      this.getRefEngineerCancelList()
    },
    emptySearchCancelPrequest () {
      this.searchCancelPrequest = {
        pIdentityCode: '',
        pEngName: '',
        pEngFamily: '',
        pCodeString: '',
        pFromRow: '0',
        pToRow: '50'
      }

      this.getRefEngineerCancelList()
    },
    notConfirmRefEngineerCancel (e) {
      this.rejectAndConfirmCancelPrequest.pNidRef = e.dataItem.NidRef

      this.showLoading()
      this.$services.engineers
        .NotConfirmRefEngineerCancel(this.rejectAndConfirmCancelPrequest)
        .then(response => {
          this.hideLoading()

          let rejectResult = this.getResponse(
            response.data
          ).data

          if (rejectResult.NotConfirmRefEngineerCancelResult.ErrorResult.BizErrors.length > 0) {
            // this.$q.dialog({
            //   title: 'خطا در سرور',
            //   message: rejectResult.NotConfirmRefEngineerCancelResult.ErrorResult.BizErrors[0].ErrorTitel
            // // message: ex.message
            // })
            this.serverError()
          }
        })
        .catch(ex => {
          // this.$q.dialog({
          //   title: 'خطا در سرور',
          //   message: 'متاسفانه مشکلی در سیستم رخ داده است.'
          //   // message: ex.message
          // })
          this.serverError()
        })
    },
    confirmRefEngineerCancel (e) {
      this.rejectAndConfirmCancelPrequest.pNidRef = e.dataItem.NidRef

      this.showLoading()
      this.$services.engineers
        .ConfirmRefEngineerCancel(this.rejectAndConfirmCancelPrequest)
        .then(response => {
          this.hideLoading()

          let confirmResult = this.getResponse(
            response.data
          ).data

          if (confirmResult.ConfirmRefEngineerCancelResult.ErrorResult.BizErrors.length > 0) {
            // this.$q.dialog({
            //   title: 'خطا در سرور',
            //   message: confirmResult.ConfirmRefEngineerCancelResult.ErrorResult.BizErrors[0].ErrorTitel
            // // message: ex.message
            // })
            this.serverError()
          }
        })
        .catch(ex => {
          // this.$q.dialog({
          //   title: 'خطا در سرور',
          //   message: 'متاسفانه مشکلی در سیستم رخ داده است.'
          //   // message: ex.message
          // })
          this.serverError()
        })
    }
  }
}
</script>
