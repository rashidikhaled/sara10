<template>
  <fit>
    <div class="q-mb-sm">
      <div class="row q-col-gutter-sm">
        <safa-combo
          ciName="CI_VergeType"
          domainName="CI_SaraM11"
          class="col-12 col-sm-6 col-md-3"
          label="اطلاعات دبیرخانه"
        />
        <div v-if="!forceReadonly" class="col-12 col-sm-auto">
          <btn-default label="ثبت دبیرخانه" @click="dabirkhaneSave" />
        </div>
      </div>
    </div>
    <safa-grid
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      v-model="formModel.Sh_Agreement_List"
      cdcName="Sh_Agreement_List"
      ref="engineer-list-grid"
      name="grid"
      :columns="agreementListCol"
      :allowMultipleSelection="false"
      @row:dblclick="dbclick"
      :hideHeader="true"
      title="لیست توافقنامه"
    />
  </fit>
</template>

<script>
import BaseFormMixin from "src/mixins/BaseFormMixin.js"
// import dabirkahneSavePrequest from '../models/dabirkahneSavePrequest.js'

export default {
  data () {
    return {
      searchPrequest: {
        pName: "",
        pFamilly: "",
        pUrbanityCode: "",
        pFromRow: "0",
        pToRow: "50"
      },
      loadResult: null,
      items: [],
      requestResult: {},
      loadDataPrequest: {
        pNidProc: this.selectedRequest
      },
      // col
      agreementListCol: [
        {
          field: "UserName",
          title: "کاربر",
          width: "80px"
        },
        {
          field: "AgreementDate",
          title: "تاریخ",
          editor: "date",
          width: "100px",
          sort: "desc"// asc or desc
        },
        {
          field: "AgreementTime",
          title: "ساعت",
          width: "100px",
          sort: "desc"// asc or desc
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "auto"
        }
      ]
    }
  },
  mixins: [BaseFormMixin],
  props: {
    value: Object,
    editMode: {
      type: String,
      default: "e"
    },
    formModel: {
      type: Object,
      default () {
        return {}
      }
    },
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    forceReadonly: Boolean
  },
  components: {},
  mounted () {
    // this.loadDataFromparent()
  },
  methods: {
    openNewTab () {
      this.$emit("onEmitopenNewTab")
    },
    dbclick (e) {
      this.$emit("dbclick", e.data)
    },
    dabirkhaneSave () {
      this.showLoading()
      let payLoad = {
        pRequestSec: {
          EumSecNoGroup: 13,
          NidProc: this.selectedRequest.NidProc,
          SecretariatReceiver: null,
          SecretariatSummary: null,
          SecretariatTypeDesc: null,
          Sh_RequestSec: {
            EumSecNoGroup: 13,
            NidProc: this.selectedRequest.NidProc,
            NidSec: "00000000-0000-0000-0000-000000000000",
            ReportPath: "/Sara8Reports/RptAgreement",
            SecDate: null,
            SecNo: null
          },
          Sh_RequestSec_List: null
        },
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.SI.saveRequestSec(payLoad, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "َشماره درخواست"
            })

            this.showSuccess("عملیات با موفقیت انجام شد")
          }
        })
        .catch((error) => {
          console.error("load error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
  // loadDataFromparent () {
  //   this.$emit('loadDataFromparent')
  // }
}
</script>
