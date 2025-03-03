<template>
  <safa-form
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getListCommissions" />
      </template>
      <fit>
        <internal-section
          class="q-mb-sm"
          title="پنل گزارش"
        >
          <FormRow class="q-mb-sm">
            <FormControl>
              <safa-combo
                label="گروه کمیسیون"
                :use-input="false"
                domainName="Commission77"
                cdcName="CI_Commission"
                ciName="CI_Commission"
                v-model="CI_Commission"
                label-width="90px"
                validations="required"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                label="نوع درخواست"
                domainName="Commission77"
                ciName="CI_RequestType"
                cdcName="CI_RequestType"
                v-model="CI_RequestType"
                :use-input="false"
                label-width="90px"
                validations="required"
              />
            </FormControl>
            <form-control>
              <safa-datepicker
                label="از تاریخ"
                label-width="90px"
                v-model="FromDate"
                cdcName="FromDate"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تا تاریخ"
                label-width="90px"
                v-model="ToDate"
                cdcName="ToDate"
              />
            </form-control>
            <div>
              <btn-default
                label="نمایش"
                @click="loadObj"
              />
            </div>
          </FormRow>
        </internal-section>
        <safa-splitter
          v-model="splitterValue"
          horizontal
          class="fit"
          margin="0"
          style="min-height: 300px"
        >
          <template v-slot:before>
            <safa-grid
              title="لیست کمیسیون ها"
              v-model="CommissionsList"
              helper="CommissionsListColumns77"
              cdcName="CommissionsList"
              height="100%"
              min-height="150px"
              fit
              paginate
              showRowNumber
              allow-multiple-selection
              suppressRowClickSelection
            />
          </template>
          <template v-slot:after>
            <safa-grid
              title="لیست آرا"
              v-model="VotesList"
              helper="VotesListColumns"
              cdcName="VotesList"
              height="100%"
              min-height="150px"
              fit
              paginate
              showRowNumber
              allow-multiple-selection
              suppressRowClickSelection
            />
          </template>
        </safa-splitter>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "UReportCommissions",
      title: "گزارش برگزاری کمیسیون",
      formKey: "FC8F11B1-E38F-41DA-BAA1-DD50E50CF94D",
      main: true,

      // combo Options
      CI_Commission: null,
      CI_RequestType: null,

      // filters
      FromDate: "",
      ToDate: "",
      splitterValue: 50,
      CommissionsList: [], // rows grid CommissionsList
      VotesList: [], // rows grid VotesList

      // services response
      getListCommissions: null
    }
  },
  methods: {
    async loadObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        PRequest: {
          ClsAgent: "",
          ClsBaygani: "",
          ClsComplaint: "",
          ClsDecision: "",
          ClsDelivery: "",
          ClsExpert: "",
          ClsOtherRequestInfo: "",
          ClsOtherVote: "",
          ClsProclamation: "",
          ClsPublicIncome: "",
          ClsRandomCommission: "",
          ClsRequest_Info: "",
          ClsRequest_Notice: "",
          ClsRequest_Vote: "",
          ClsSearchRequest_info: {
            CI_Region: {
              CI_Region: [
                {
                  ID: 1,
                  Title: "منطقه 1"
                },
                {
                  ID: 2,
                  Title: "منطقه 2"
                }
              ]
            },
            CI_RegionSelected: "",
            ErrorResult: "",
            NoticeNo: "",
            Request_Info: {
              Address: "",
              AnnouncementDate: "",
              AnnouncementNo: "",
              CI_Commission: this.CI_Commission,
              CI_RequestType: this.CI_RequestType,
              CreateDate: "",
              CreateTime: "",
              CreatorID: "00000000-0000-0000-0000-000000000000",
              CreatorUserName: "",
              DataDeliveryNotice: "",
              DateDeliveryProclamation: "",
              DateDeliveryVote: "",
              DescAnnouncemen: "",
              DescRequest: "",
              Description: "",
              Distrcit: 0,
              FromDate: this.FromDate,
              HoldingDate: "",
              HoldingTime: "",
              IsAnnouncement: false,
              NidFiche: "00000000-0000-0000-0000-000000000000",
              NidNosaziCode: "00000000-0000-0000-0000-000000000000",
              NidProc: "00000000-0000-0000-0000-000000000000",
              NidProcIncome: "00000000-0000-0000-0000-000000000000",
              NidRequest: "00000000-0000-0000-0000-000000000000",
              NidWorkItem: 0,
              NosaziCode: "0-0-0-0-0-0-0",
              OwnerName: "",
              PostCode: "",
              Price: 0,
              SecretariatNo: "",
              SysCI_RequestStatus: 0,
              TitleRequest: "",
              ToDate: this.ToDate,
              UserDescription: ""
            },
            ResultSearch_RequestInfo: "",
            SysCI_Request: {
              SysCI_RequestStatus: [
                {
                  ColorRow: "#FFDD88AA",
                  ID: 0,
                  Title: "ثبت درخواست"
                },
                {
                  ColorRow: "#FFF5F087",
                  ID: 1,
                  Title: "اخطاريه"
                },
                {
                  ColorRow: "#FF84F3C1",
                  ID: 2,
                  Title: "ابلاغيه"
                },
                {
                  ColorRow: "#FF84D5F3",
                  ID: 3,
                  Title: "کارشناسي"
                },
                {
                  ColorRow: "#FF8489F3",
                  ID: 4,
                  Title: "کميسيون بند تصادفي"
                },
                {
                  ColorRow: "#FFF39BF3",
                  ID: 5,
                  Title: "صدور راي"
                },
                {
                  ColorRow: "#FFF78484",
                  ID: 99,
                  Title: "ابطال درخواست"
                }
              ]
            },
            SysCI_RequestSelected: "",
            VoteNo: ""
          },
          ListClsRequest_Info: "",
          NidAgent: "00000000-0000-0000-0000-000000000000",
          NidDecision: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          NidVote: "00000000-0000-0000-0000-000000000000",
          NidWorkItem: 0,
          NosaziCode: "",
          SelectItemsRequestInfo: "",
          UserName: "",
          Agent: "",
          District: "",
          From: 1,
          Request_Info: "",
          Request_Notice: "",
          Request_Vote: "",
          To: 100
        }
      }

      try {
        const { data } = await this.$services.commission77.getSearchRequestInfo(
          payload
        )
        this.getListCommissions = this.getResponse(data)
        if (this.getListCommissions.success) {
          console.log(this.getListCommissions)
          this.CommissionsList = this.getListCommissions.data.GetSearch_RequestInfoResult.ClsSearchRequest_info.ResultSearch_RequestInfo
          await this.log({
            action: this.logActions.view,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
