<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getRequestVoteRes" />
        <safa-status :result="bayganiRes" />
      </template>
      <fit>
        <expantion-section v-model="ex1" default-open title="مشخصات">
          <FormRow class="q-mb-sm">
            <FormControl>
              <safa-text
                label="شماره دبیرخانه"
                label-width="90px"
                v-model="model.ClsRequest_Info.Request_Info.SecretariatNo"
                cdcName="SecretariatNo"
                m="r"
              />
            </FormControl>
            <nosazi-code-input
              label="کد نوسازی"
              label-width="52px"
              v-model="model.ClsRequest_Info.Request_Info.NosaziCode"
              cdcName="NosaziCode"
              m="r"
            />
            <FormControl>
              <safa-text
                label="نام مالک"
                label-width="90px"
                v-model="model.ClsRequest_Info.Request_Info.OwnerName"
                cdcName="OwnerName"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="آدرس"
                label-width="90px"
                v-model="model.ClsRequest_Info.Request_Info.Address"
                cdcName="Address"
                m="r"
              />
            </FormControl>
          </FormRow>
        </expantion-section>
        <expantion-section v-model="ex2" default-open title="اطلاعات کمیسیون">
          <FormRow>
            <FormControl>
              <safa-combo
                label="شماره کمیسیون"
                label-width="90px"
                v-model="model.ClsRequest_Info.Request_Info.CI_Commission"
                cdcName="CI_Commission"
                domainName="Commission77"
                ciName="CI_Commission"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="گروه کمیسیون"
                label-width="90px"
                v-model="model.ClsRequest_Info.Request_Info.CI_RequestType"
                cdcName="CI_RequestType"
                domainName="Commission77"
                ciName="CI_RequestType"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره درخواست"
                label-width="90px"
                v-model="model.ClsRequest_Info.Request_Info.NidWorkItem"
                cdcName="NidWorkItem"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ برگزاری کمیسیون"
                label-width="90px"
                v-model="model.ClsRequest_Info.Request_Info.HoldingDate"
                cdcName="HoldingDate"
                m="r"
              />
            </FormControl>
          </FormRow>
        </expantion-section>
      </fit>
      <template v-slot:footer>
        <btn-default label="بایگانی درخواست" @click="saveObj" />
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
      title: "بایگانی درخواست",
      formKey: "5E797731-9D80-4D6D-812E-CDBC7C0ADA16",
      name: "UBaygani",
      main: true,

      // #variables
      ex1: false,
      ex2: false,
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
        ClsRequest_Vote: null,
        ClsBaygani: null
      },

      // #services
      getRequestVoteRes: null,
      bayganiRes: null
    }
  },
  created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else {
      this.$nextTick(() => {
        this.hideSidebar(this.name)
      })
    }
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        let payload = {
          pRequest: {
            NidProc: this.selectedRequest.NidProc
            // NidProc: "8c29a417-41e7-4fc4-90b1-f331dc0ed6a7"
          }
        }
        const { data } = await this.$services.commission77.getRequestVote(
          payload
        )
        this.getRequestVoteRes = this.getResponse(data)
        if (this.getRequestVoteRes.success) {
          this.model = this.getRequestVoteRes.data.GetRequestVoteResult
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "کدنوسازی",
            nidWorkItem: this.selectedRequest.NidWorkitem,
            nosaziCode: this.selectedRequest.BizCode,
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      const handler = async () => {
        try {
          this.showLoading()
          const { data } = await this.$services.commission77.baygani({
            pRequest: {
              ClsBaygani: {
                NidProc: this.model.ClsRequest_Info.NidProc,
                NidUser: this.getNidUser(),
                ReqestInfo: this.model.ClsRequest_Info.Request_Info,
                UserName: this.getUserDisplayName()
              }
            }
          })
          this.bayganiRes = this.getResponse(data)
          if (this.bayganiRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "کدنوسازی",
              nidWorkItem: this.selectedRequest.NidWorkitem,
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.showSuccess("بایگانی در خواست مورد نظر با موفقعیت انجام شد")
            this.loadObj()
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از بایگانی درخواست مورد نظر مطمئن هستید؟").onOk(
        handler
      )
    }
  }
}
</script>
