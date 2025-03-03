<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper :title="title">
      <safa-status :result="result" />
      <!-- <safa-status :result="saveResult" /> -->
      <fit>
        <expantion-section
          v-model="expantionState1"
          default-open
          title="مشخصات"
        >
          <form-row>
            <form-control>
              <safa-text
                label="شماره دبیرخانه"
                label-width="90px"
                m="r"
                v-model="model.ClsRequest_Info.Request_Info.SecretariatNo"
                cdcName="SecretariatNo"
              />
            </form-control>
              <nosazi-code-input
                label-width="50px"
                label="کد نوسازی"
                m="r"
                v-model="model.ClsRequest_Info.Request_Info.NosaziCode"
              />
            <form-control>
              <safa-text
                label="نام مالک"
                label-width="90px"
                m="r"
                v-model="model.ClsRequest_Info.Request_Info.OwnerName"
                cdcName="OwnerName"
              />
            </form-control>
            <form-control>
              <safa-text
                label="آدرس"
                label-width="90px"
                m="r"
                v-model="model.ClsRequest_Info.Request_Info.Address"
                cdcName="Address"
              />
            </form-control>
          </form-row>
        </expantion-section>
        <expantion-section
          v-model="expantionState2"
          default-open
          title="اطلاعات کمیسیون"
        >
          <form-row>
            <form-control>
              <safa-combo
                label="شماره کمیسیون"
                label-width="90px"
                m="r"
                domainName="Commission77"
                ciName="CI_Commission"
                v-model="model.ClsRequest_Info.Request_Info.CI_Commission"
                cdcName="CI_Commission"
              />
            </form-control>

            <form-control>
              <safa-text
                label="گروه کمیسیون"
                label-width="90px"
                m="r"
                domainName="Commission77"
                ciName="CI_RequestType"
                v-model="model.ClsRequest_Info.Request_Info.CI_RequestType"
                cdcName="CI_RequestType"
              />
            </form-control>
            <form-control>
              <safa-text
                label="شماره درخواست"
                label-width="90px"
                m="r"
                v-model="model.ClsRequest_Info.Request_Info.NidWorkItem"
                cdcName="NidWorkItem"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ برگزاری کمیسیون"
                label-width="90px"
                m="r"
                v-model="model.ClsRequest_Info.Request_Info.HoldingDate"
                cdcName="HoldingDate"
              />
            </form-control>
          </form-row>
        </expantion-section>
      </fit>
      <template v-slot:footer>
        <btn-default label="ابطال درخواست" @click="cancelRequest" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "ابطال درخواست",
      formKey: "5E797731-9D80-4D6D-812E-CDBC7C0ADA16",
      name: "UCancelRequest",
      main: true,
      expantionState1: false,
      expantionState2: false,
      model: {
        ClsRequest_Info: {
          Request_Info: {
            SecretariatNo: "",
            NosaziCode: "",
            OwnerName: "",
            Address: "",
            CI_Commission: 0,
            CI_RequestType: 0,
            NidWorkItem: "",
            HoldingDate: ""
          }
        },
        ClsRequest_Notice: null,
        ClsRequest_Vote: null
      },
      result: null
    }
  },
  created () {
    if (this.selectedRequest) {
      this.loadObj()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمائید")
      this.$nextTick(() => {
        this.hideSidebar(this.name)
      })
    }
  },
  methods: {
    loadObj () {
      this.showLoading()
      let payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "37455496-5038-44e3-b02e-7b607153f7f2"
        }
      }
      this.$services.commission77
        .getRequestVote(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.model = this.result.data.GetRequestVoteResult
            this.model.ClsRequest_Info.Request_Info =
              this.result.data.GetRequestVoteResult.ClsRequest_Info.Request_Info
            this.model.ClsRequest_Info =
              this.result.data.GetRequestVoteResult.ClsRequest_Info
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nidWorkItem: this.selectedRequest.NidWorkitem,
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancelRequest () {
      //   if (
      //     this.model.ClsRequest_Notice === null &&
      //     this.model.ClsRequest_Vote === null &&
      //     this.model.ClsRequest_Info.Request_Info.AnnouncementNo === null
      //   ) {
      this.showConfirm("آیا از ابطال درخواست مورد نظر مطمئن هستید؟")
        .onOk(() => {
          this.cancelRequestInfo()
        })
    //   }
    //    else {
    //     this.showError("امکان ابطال درخواست وجود ندارد")
    //   }
    },
    async cancelRequestInfo () {
      this.showLoading()
      let payload = {
        pRequest: {
          ClsRequest_Info: this.model.ClsRequest_Info
        }
      }
      await this.$services.commission77
        .cancelRequestInfo(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.cancelResult = this.result.data
            this.showSuccess("ابطال در خواست مورد نظر با موفقعیت انجام شد")
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nidWorkItem: this.selectedRequest.NidWorkitem,
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `عملیات ابطال در فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
