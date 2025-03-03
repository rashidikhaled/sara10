<template>
  <fit>
    <safa-status :result="OtherResult" />
    <div class="row q-gutter-sm q-mb-sm">
      <safa-combo
        class="col-12 col-sm-6 col-md-3"
        label="اطلاعات دبیرخانه"
      />
      <btn-default
        v-if="!forceReadonly"
        label="ثبت دبیرخانه"
        @click="saveRequestSecInDabirkhaneh"
        class="col-auto"
      />
    </div>
    <safa-datatable
      helper="peaceList"
      v-model="results.Sh_Peace_List"
      @dbclick="dbclick"
      fit
      :bordered="true"
      max-height="100%"
      height="100%"
      min-height="100px"
      hide-header
      title="لیست صلحنامه"
    />
  </fit>
</template>
<script>
import loaderMixin from "src/mixins/loaderMixin.js"
export default {
  mixins: [loaderMixin],
  data: function () {
    return {
      title: "شهرسازی- لیست صلحنامه",
      // formKey:"7145CB3E-42D7-4DDA-AF7F-3C24117A4CFB",
      OtherResult: null
    }
  },
  props: {
    results: Object,
    selectedRequestFromParent: Object,
    forceReadonly: Boolean
  },
  methods: {
    saveRequestSecInDabirkhaneh () {
      // let self = this

      console.log(
        "/////////@@@@@@this.selectedRequest.NidProc",
        this.selectedRequestFromParent
      )

      let payload = {
        pRequestSec: {
          ErrorResult: null,
          EumSecNoGroup: "13",
          NidProc: "269df9f0-5348-4466-903f-2cb17025ab8f",
          SecretariatReceiver: null,
          SecretariatSummary: null,
          SecretariatTypeDesc: null,
          Sh_RequestSec: {
            EumSecNoGroup: "13",
            NidProc: "269df9f0-5348-4466-903f-2cb17025ab8f",
            NidSec: "00000000-0000-0000-0000-000000000000",
            ReportPath: "/Sara8Reports/RptPeace",
            SecDate: null,
            SecNo: null
          },
          Sh_RequestSec_List: null
        },
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: "baea57df-4bb2-4ba2-956b-1617ba73a85d",
          WorkflowGuid: "5ca8477d-2a3a-4962-9c63-a8690ff8975c"
        }
      }

      this.$services.SI.saveRequestSec(payload)
        .then(async ({ data }) => {
          this.OtherResult = this.getResponse(data)

          await this.log({
            action: this.logActions.view
          })
        })
        .catch(err => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    dbclick (e) {
      this.$emit("datatableDbclick", e.row)
    }
    // خطای سرویس میدهد
    // saveRequestSec () {
    //   this.showLoading()
    //   let data = {
    //     pRequestSec: {
    //       EumSecNoGroup: 13,
    //       NidProc: this.selectedRequest.NidProc,
    //       Sh_RequestSec: {
    //         EumSecNoGroup: 13,
    //         NidProc: this.selectedRequest.NidProc,
    //         NidSec: '00000000-0000-0000-0000-000000000000',
    //         ReportPath: '/Sara8Reports/RptPeace'
    //       },
    //       pUser: this.currentUser,
    //       pDtoWorkflowData: {
    //         StateName: 'baea57df-4bb2-4ba2-956b-1617ba73a85d',
    //         WorkflowGuid: 'baea57df-4bb2-4ba2-956b-1617ba73a85d'
    //       }
    //     }
    //   }
    //   this.$services.SI.saveRequestSec(data)
    //     .then(({ data }) => {
    //       this.OtherResult = this.getResponse(data)
    //     })
    //     .catch(response => {
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // }
  }
}
</script>
