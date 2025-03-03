<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="b65fe692-0000-40c9-0014-66b8eb0e9e77"
  >
  <safa-tabs v-model="activeTab">
    <template v-slot:tabs>
      <tab-menu name="requestsList" label="لیست درخواست ها" />
    </template>

    <!-- main tab  -->
    <tab-content name="requestsList" title="محتوای  لیست درخواست ها">
      <safa-form :id="formKey" :caption="title">
        <fit>
          <form-row>
            <form-control>
              <safa-text
                label="محل خدمت دفتر متخلف"
                label-width="100px"
                v-model="filter.JobLocationName"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ صدور رای از"
                v-model="filter.DateVoteFrom"
                label-width="100px"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ صدور رای تا"
                v-model="filter.DateVoteTo"
                label-width="100px"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ درخواست از"
                v-model="filter.DateFrom"
                label-width="100px"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ درخواست تا"
                v-model="filter.DateTo"
                label-width="100px"
              />
            </form-control>
            <form-control>
              <safa-text
                label="کد نوسازی محل تخلف"
                v-model="filter.JobLocationNosaziCode"
                label-width="100px"
              />
            </form-control>
            <form-control>
              <safa-text
                label="نام کاربر متخلف"
                v-model="filter.ComplainantName"
                label-width="100px"
              />
            </form-control>
            <form-control>
              <safa-text
                label="شماره درخواست"
                v-model="filter.NidWordItem"
                label-width="100px"
              />
            </form-control>
            <form-control>
              <!--   :options="options" -->
              <safa-combo
                label="عنوان تخلف"
                v-model="filter.CI_Violation"
                domainName="Analysis"
                ciName="CI_Violation"
                m="e"
                label-width="100px"
              />
            </form-control>
            <form-control class="q-mb-sm">
              <btn-search @click="loadObj" />
            </form-control>
          </form-row>

          <div class="q-mb-sm">
            <div>
              <safa-text
                label="توضیحات"
                v-model="filter.Description"
                label-width="100px"
              />
            </div>
          </div>

          <safa-grid
            title="لیست درخواست ها"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="OldRequestList"
            cdcName="userList"
            :columns="reqListColumns"
            paginate
            :m="mode"
            :take="20"
            :addRow="false"
            :allowCopy="false"
            :deleteRow="false"
            :isEditable="true"
            :suppressRowClickSelection="false"
            @selection:changed="selectedChange"
          />
        </fit>

        <!--  first popUp Votes -->
        <!-- <OfficeViolations /> -->
        <safa-popup
          v-model="showUploader"
          width="800px"
          height="600px"
          title="صدور رای تخلفات دفاتر"
        >
          <form-wrapper :title="title" :padding="false">
            <safa-tabs v-model="activeTabVoting">
              <template v-slot:tabs>
                <tab-menu name="Voting" label="صدور رای" />
                <tab-menu name="previousOfficesVotes" label="آرای قبلی دفاتر" />
                <tab-menu
                  name="PreviousUserVote"
                  label="آرای قبلی کاربر"
                  v-if="showPreviousUserVote"
                />
                <tab-menu name="Archive" label="آرشیو" />
              </template>

              <!-- first tab -->

              <tab-content name="Voting" title="votingContent">
                <fit>
                  <div class="row q-col-gutter-sm q-mb-sm">
                    <form-control>
                      <safa-text
                        label="محل خدمت دفتر متخلف"
                        v-model="jobLocation"
                        label-width="130px"
                      />
                    </form-control>
                    <form-control>
                      <safa-datepicker
                        label="تاریخ درخواست"
                        v-model="Date"
                        label-width="100px"
                      />
                    </form-control>
                    <form-control>
                      <safa-text
                        label="نام شاکی"
                        v-model="ComplainantName"
                        label-width="70px"
                      />
                    </form-control>
                  </div>

                  <div class="row q-col-gutter-sm q-mb-sm">
                    <form-control>
                      <safa-text
                        label="کد نوسازی محل تخلف"
                        v-model="JobLocationNosaziCode"
                        label-width="130px"
                      />
                    </form-control>

                    <form-control>
                      <safa-text
                        label="موبایل شاکی"
                        v-model="ComplainantMobile"
                        label-width="100px"
                      />
                    </form-control>
                  </div>

                  <safa-grid
                    title="صدور رای تخلفات کاربر"
                    fit
                    min-height="100px"
                    height="100%"
                    max-height="100%"
                    v-model="ViolationVoteList"
                    cdcName="userList"
                    :columns="voteUserViolations"
                    :m="mode"
                    :take="20"
                    :addRow="false"
                    :allowCopy="false"
                    :isEditable="true"
                    :deleteRow="false"
                    :suppressRowClickSelection="false"
                    @selection:changed="selectedChange"
                  />

                  <!-- <div class="row q-col-gutter-sm">
                  <div>
                    <btn-default label="گزارش" @click="showReports = true" />
                  </div>
                  <div>
                    <btn-cancel
                      label="خروج"
                      @click="showUploader = false"
                    />
                  </div>
                </div> -->
                </fit>
              </tab-content>

              <!-- second tab helper-->
              <tab-content name="previousOfficesVotes">
                <safa-grid
                  title="آرای قبلی دفاتر"
                  fit
                  min-height="100px"
                  height="100%"
                  max-height="100%"
                  v-model="ViolationVoteListOld"
                  cdcName="userList"
                  helper="agPreviousOfficesVote"
                  :suppressRowClickSelection="false"
                  :m="mode"
                  :take="20"
                  :addRow="false"
                  :allowCopy="false"
                  :isEditable="true"
                  :deleteRow="false"
                />
              </tab-content>

              <!-- third tab -->
              <tab-content
                name="PreviousUserVote"
                title="PreviousUserVoteContent"
              >
              <!-- helper -->
                <safa-grid
                  title="آرای قبلی کاربر"
                  fit
                  min-height="100px"
                  height="100%"
                  max-height="100%"
                  v-model="model.ViolationVoteUserListOld"
                  :suppressRowClickSelection="false"
                  cdcName="userList"
                  helper="agPreviousUserVote"
                  :m="mode"
                  :take="20"
                  :addRow="true"
                  :allowCopy="false"
                  :isEditable="true"
                  :deleteRow="false"
                />
              </tab-content>

              <!-- forth tab -->
              <tab-content name="Archive" title="archiveContent">
                <ArchiveWrap
                  :name="archiveConfig.username"
                  :pass="archiveConfig.password"
                />
              </tab-content>
            </safa-tabs>
            <template #footer v-if="activeTabVoting === 'Voting'">
              <div class="row q-gutter-sm">
                <div class="q-gutter-sm">
                  <btn-default label="گزارش" @click="btnReportClick" />
                </div>
                <div class="q-gutter-sm">
                  <btn-cancel label="خروج" @click="showUploader = false" />
                </div>
              </div>
            </template>
          </form-wrapper>
        </safa-popup>

        <!-- second popUP reports -->
        <!-- <safa-popup
          v-model="showReports"
          width="300px"
          height="200px"
          title="گزارش صدور رای"
        /> -->
      </safa-form>
    </tab-content>
  </safa-tabs>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'پاسخگوی تخلفات دفاتر',
      formKey: 'b65fe692-36ea-0001-0028-66b8eb0e9e77',
      name: 'officeViolationResponse',
      main: true,
      sidebarCompatible: true,

      issuingData: '',
      requestDate: '',
      activeTab: 'requestsList',
      nosaziCode: '',
      issuingDataNosazi: '',
      requestDateNosazi: '',
      userName: '',
      requestNum: '',
      Description: '',
      offendName: '',
      showUploader: false,
      // showReports: false,
      activeTabVoting: 'Voting',
      offenderName: '',

      showPreviousUserVote: false,
      userListResult: null,
      selectedRowValue: null,

      getAllViolationRequestRes: null,
      // first tab
      jobLocation: '',
      Date: '',
      ComplainantName: '',
      JobLocationNosaziCode: '',
      ComplainantMobile: '',

      // services
      getUsersFromJobLocationRes: null,
      getViolationRequestOldRes: null,
      getViolationRequestRes: null,
      nidRequest: "00000000-0000-0000-0000-000000000000",

      filter: {
        JobLocationName: '',
        DateVoteFrom: '',
        DateFrom: '',
        JobLocationNosaziCode: '',
        DateVoteTo: '',
        DateTo: '',
        ComplainantName: '',
        ComplainantMobile: '',
        NidWordItem: '',
        CI_Violation: null,
        Description: '',
        Date: "",
        DateVote: "",
        Monitoring: "",
        NidJobLocation: "",
        NidProc: "",
        RequestStatus: 0,
        RequestType: "",
        Time: "",
        ViolationVoteList: "",
        Vote: "",
        VoteDate: ""
      },
      model: {
        Request: {
          JobLocationName: '',
          JobLocationNosaziCode: '',
          Date: '',
          ComplainantName: '',
          ComplainantMobile: '',
          ViolationVoteList: [],
          DateVoteFrom: '',
          DateVoteTo: '',
          DateFrom: '',
          DateTo: '',
          NidWordItem: '',
          CI_Violation: null,
          Description: ''
        },
        ViolationVoteUserListOld: [],
        ExportVoteUsers: [],
        erxportVote: []
      },
      OldRequestList: [],
      totalValue: [],
      UserList: [],
      // Violation: {
      //   CI_Violation: null,
      //   CI_VoteMain: 0,
      //   CI_VoteSub: 0,
      //   Date: null,
      //   Description: null,
      //   DescriptionVote: null,
      //   NidRequest: '00000000-0000-0000-0000-000000000000',
      //   NidUserOffending: null,
      //   NidVote: '00000000-0000-0000-0000-000000000000',
      //   NidWorkItem: null,
      //   Time: null,
      //   UserNameOffending: null,
      //   ViolationCount: null
      // },
      ViolationVoteListOld: [],
      ViolationVoteList: [],

      // grids
      // لیست درخواست ها--> جدول صفحه اول

      reqListColumns: [
        {
          field: 'NidWordItem',
          title: 'شماره درخواست',
          width: '130px'
        },
        {
          field: 'CI_Violation',
          title: 'عنوان تخلف',
          width: '400px',
          editor: 'combo',
          domain: 'Analysis'
        },
        {
          field: 'RequestStatus',
          title: 'وضعیت',
          width: '100px',
          editor: 'combo',
          domain: 'Analysis',
          source: [
            { ID: 0, Title: 'جاری' },
            { ID: 3, Title: 'بایگانی دائم' },
            { ID: 4, Title: 'ابطال' }
          ]
        },
        {
          field: 'JobLocationName',
          title: 'محل خدمت',
          width: '140px'
        },
        {
          field: 'JobLocationNosaziCode',
          title: ' کد نوسازی محل خدمت',
          width: '200px'
        },
        {
          field: 'ComplainantName',
          title: 'نام شاکی',
          width: '100px'
        },
        {
          field: 'ComplainantMobile',
          title: 'موبایل شاکی',
          width: '120px'
        },
        {
          field: 'Date',
          title: 'تاریخ درخواست',
          width: '120px',
          editor: "date"
        },
        {
          field: 'Time',
          title: 'ساعت',
          width: '120px'
        },
        {
          field: 'DateVote',
          title: 'تاریخ صدور رای',
          width: '120px',
          editor: "date"
        },
        {
          field: 'RequestType',
          title: 'نوع درخواست',
          width: '120px'
        },
        {
          field: 'Description',
          title: 'توضیحات ',
          width: '120px'
        },
        {
          field: "agCallbackBtn",
          title: "",
          btnTitle: "نمایش فرم صدور رای تخلفات دفتر",
          callback: (params) => this.showVotesForm(params),
          width: '200px'
        }
      ],

      // صدور رای تخلفات کاربر -->جدول پاپ آپ - تب اول
      voteUserViolations: [
        {
          field: 'CI_Violation',
          title: 'عنوان تخلف',
          width: '100px',
          editor: 'combo',
          domain: 'Analysis'
        },
        {
          field: 'Description',
          title: 'توضیحات ',
          width: '120px'
        },
        {
          field: 'UserNameOffending',
          title: 'کاربر متخلف',
          width: '120px'
        },
        {
          field: 'CI_VoteMain',
          title: 'رای اصلی',
          width: '100px',
          editor: 'combo',
          domain: 'Analysis'
        },
        {
          field: 'CI_VoteSub',
          title: 'رای فرعی',
          width: '100px',
          editor: 'combo',
          domain: 'Analysis'
        },

        {
          field: 'ViolationCount',
          title: 'تعداد تخلف',
          width: '120px'
        },
        {
          field: 'DescriptionVote',
          title: 'شرح رای',
          width: '120px'
        },
        {
          field: 'Date',
          title: 'تاریخ صدور',
          width: '120px',
          editor: "date"
        },
        {
          field: 'Time',
          title: 'ساعت',
          width: '120px'
        },
        {
          field: "agCallbackBtn",
          title: "",
          btnTitle: "آرای قبلی کاربر",
          callback: (params) => this.showUserPreviousVote(params)
        },
        {
          width: '120px'
        }
      ]
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore')
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      const payload = {
        pClsViolation: {
          PageIndex: 0,
          PageSize: 5000,
          CountAll: 20,
          ErrorResult: "",
          ExportVoteUsers: "",
          OldRequestList: "",
          Request: {
            JobLocationName: this.filter.JobLocationName || null,
            DateVoteFrom: this.filter.DateVoteFrom || null,
            DateFrom: this.filter.DateFrom || null,
            JobLocationNosaziCode: this.filter.JobLocationNosaziCode || null,
            DateVoteTo: this.filter.DateVoteTo || null,
            DateTo: this.filter.DateTo || null,
            ComplainantName: this.filter.ComplainantName || null,
            ComplainantMobile: this.filter.ComplainantMobile || null,
            NidWordItem: this.filter.NidWordItem || null,
            CI_Violation: this.filter.CI_Violation || null,
            Description: this.filter.Description || null,
            Date: this.filter.Date || null,
            DateVote: this.filter.DateVote || null,
            Monitoring: this.filter.Monitoring || null,
            NidJobLocation: this.filter.NidJobLocation || null,
            NidProc: this.filter.NidProc || null,
            RequestStatus: this.filter.RequestStatus || 0,
            RequestType: this.filter.RequestType || null,
            Time: this.filter.Time || null,
            ViolationVoteList: this.filter.ViolationVoteList || null,
            Vote: this.filter.Vote || null,
            VoteDate: this.filter.VoteDate || null

          },
          Violation: "",
          ViolationVoteListOld: this.ViolationVoteListOld,
          ViolationVoteUserListOld: this.model.ViolationVoteUserListOld
        }
      }
      this.showLoading()
      this.$services.SJ.getAllViolationRequest(payload)
        .then(async ({ data }) => {
          this.getAllViolationRequestRes = this.getResponse(data)
          if (this.getAllViolationRequestRes.success) {
            const res = this.getAllViolationRequestRes.data
            this.model = res
            this.OldRequestList = res.OldRequestList
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "نمایش لیست درخواست ها"
            })
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },

    loadObjTab1 () {
      this.showLoading()
      let pnid = this.totalValue.NidProc
      const payload = {
        pNidProc: pnid
      }
      this.$services.SJ.getViolationRequest(payload)
        .then(async ({ data }) => {
          this.getViolationRequestRes = this.getResponse(data)
          if (this.getViolationRequestRes.success) {
            this.ViolationVoteListOld =
              this.getViolationRequestRes.data.ViolationVoteListOld
            this.ViolationVoteList =
              this.getViolationRequestRes.data.Request.ViolationVoteList
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "نمایش لیست در تب صدور رای"
            })
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },

    loadObjTab3 (PNidUserOffending, pNidRequest) {
      const payload = {
        PNidUserOffending: PNidUserOffending,
        // '02a3c326-b61f-4a70-b7a5-b194407cceca',
        pNidRequest: pNidRequest
        // '71cdfde5-ecd1-4e70-90c4-e38623dc27cb'
      }

      this.showLoading()
      this.$services.SJ.getViolationRequestOld(payload)
        .then(async ({ data }) => {
          this.getViolationRequestOldRes = this.getResponse(data)
          if (this.getViolationRequestOldRes.success) {
            this.model.ViolationVoteUserListOld = this.getViolationRequestOldRes.data.GetViolationRequestOldResult
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "نمایش لیست در تب آرای قبلی"
            })
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },

    showVotesForm (params) {
      this.showUploader = true
      this.jobLocation = params.JobLocationName
      this.ComplainantName = params.ComplainantName
      this.JobLocationNosaziCode = params.JobLocationNosaziCode
      this.ComplainantMobile = params.ComplainantMobile
      this.Date = params.Date
      this.erxportVote = params
      this.totalValue = params
      // this.NidWorkItem = params.NidWorkItem
      this.loadObjTab1()
    },

    showUserPreviousVote () {
      this.showPreviousUserVote = true
      this.activeTabVoting = 'PreviousUserVote'
      this.loadObjTab3()
    },
    selectedChange (params) {
      this.selectedRowValue = params.api.getSelectedRows()
      // this.selectedRowValue = e.selectedItems
    },
    btnReportClick () {
      const reportPath = "/PersonalResource/RptViolationVote"
      const queryParams = {
        NidRequest: this.nidRequest
        // this.nidRequest
        // NidRequest;6e7e7232-c9bc-4f9c-9052-34071e2749db
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.nidRequest,
        bizCodeTitle: "NidRequest",
        saveDesc: "نمایش گزارش"
      })
    }
  }
}
</script>
