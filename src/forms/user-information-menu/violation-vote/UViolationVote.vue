<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="B65FE692-0000-40C9-0014-66B8EB0E9E77"
  >
  <form-wrapper title="صدور رای تخلفات دفاتر" :padding="false">
    <template #header>
      <safa-status :result="getViolationRequestRes"/>
      <safa-status :result="getUsersFromJobLocationRes"/>
      <safa-status :result="getViolationRequestOldRes"/>
      <safa-status :result="saveViolationRes"/>
    </template>
    <fit>
      <safa-tabs fit v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu label="صدور رای" name="ViolationVoteVoting"/>
          <tab-menu
            label="آرای قبلی دفاتر"
            name="ViolationVotePreviousVotesOfOffices"
          />
          <tab-menu
            label="آرای قبلی کاربر"
            name="ViolationVotePreviousUserVotes"
            :disabled="!isTabUserOldEnabled"
          />
          <tab-menu
            label="آرشیو"
            name="ViolationVoteArchive"
            :disabled="!isTabArchiveEnabled"
          />
        </template>

        <tab-content name="ViolationVoteVoting">
          <ViolationVoteVoting
            ref="ViolationVoteVoting"
            :m="mode"
            v-model="dataContext"
            @userVoteUserOld="userVoteUserOld"
          />
        </tab-content>
        <tab-content name="ViolationVotePreviousVotesOfOffices">
          <ViolationVotePreviousVotesOfOffices
            ref="ViolationVotePreviousVotesOfOffices"
            :m="mode"
            v-model="dataContext"
          />
        </tab-content>
        <tab-content name="ViolationVotePreviousUserVotes">
          <ViolationVotePreviousUserVotes
            ref="ViolationVotePreviousUserVotes"
            :m="mode"
            v-model="dataContext"
          />
        </tab-content>
        <tab-content name="ViolationVoteArchive">
          <ViolationVoteArchive
            ref="ViolationVoteArchive"
            :m="mode"
            v-model="dataContext"
            :taskInfo="taskInfo"
          />
        </tab-content>
      </safa-tabs>
    </fit>

    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        saveButtonTitle="ثبت"
        @save="btnCreateClick"
      >
        <template v-slot:after v-if="activeTab == 'ViolationVoteVoting'">
          <btn-default label="گزارش" @click="btnReportClick"/>
          <btn-cancel label="خروج" @click="btnExitClick"/>
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
// Mixin
import baseFormMixin from 'src/mixins/baseFormMixin'

// Partails
import ViolationVoteVoting from './partials/ViolationVoteVoting.vue'
import ViolationVotePreviousVotesOfOffices from './partials/ViolationVotePreviousVotesOfOffices.vue'
import ViolationVotePreviousUserVotes from './partials/ViolationVotePreviousUserVotes.vue'
import ViolationVoteArchive from './partials/ViolationVoteArchive.vue'

// Utils
import { currentDate, currentTime } from 'src/utils/index'

export default {
  name: 'UViolationVote',

  mixins: [baseFormMixin],

  components: {
    ViolationVoteVoting,
    ViolationVotePreviousVotesOfOffices,
    ViolationVotePreviousUserVotes,
    ViolationVoteArchive
  },

  data () {
    return {
      title: 'صدور رای تخلفات دفاتر',
      formKey: 'B65FE692-36EA-0001-0027-66B8EB0E9E77',
      name: 'UViolationVote',
      main: true,

      // Model
      dataContext: {
        Request: {},
        ViolationVoteUserListOld: [],
        OldRequestList: []
      },
      tmpUsers: [],
      nidProc: '00000000-0000-0000-0000-000000000000',

      // Responses
      getViolationRequestRes: null,
      getUsersFromJobLocationRes: null,
      getViolationRequestOldRes: null,
      saveViolationRes: null,

      // Tabs
      activeTab: 'ViolationVoteVoting',
      isTabUserOldEnabled: false,
      isTabArchiveEnabled: true
    }
  },

  methods: {
    loadObj () {
      // eslint-disable-next-line eqeqeq
      if (
        this.nidProc == null ||
        // eslint-disable-next-line eqeqeq
        this.nidProc == '00000000-0000-0000-0000-000000000000'
      ) {
        if (!this.selectedRequest) {
          this.showError('لطفا یک مورد از کارتابل انتخاب نمایید')
          return false
        }

        this.nidProc = this.selectedNidProc
      }

      this.showLoading()

      const payload = {
        pNidProc: this.nidProc
      }

      this.$services.SJ.getViolationRequest(payload)
        .then(({ data }) => {
          this.getViolationRequestRes = this.getResponse(data)

          if (this.getViolationRequestRes.success) {
            this.dataContext =
              this.getViolationRequestRes.data.GetViolationRequestResult
            if (
              this.dataContext.Request.ViolationVoteList != null &&
              this.dataContext.Request.ViolationVoteList.length > 0
            ) {
              if (!this.dataContext.Request.ViolationVoteList[0].Date) {
                this.dataContext.Request.ViolationVoteList[0].Date =
                  currentDate()
              }
              if (!this.dataContext.Request.ViolationVoteList[0].Time) {
                currentTime()
              }
            }

            this.getUsersOfJobLocation()
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })

      if (this.isSelectFromMenu) this.isTabArchiveEnabled = false
    },

    getUsersOfJobLocation (pClsCombo = null) {
      if (this.dataContext.Request != null) {
        let pJobLocationGuid = this.dataContext.Request.NidJobLocation
        if (pJobLocationGuid) {
          this.showLoading()

          const payLoad = {
            NidJobLocation: pJobLocationGuid,
            from: 1,
            to: 200,
            search: ''
          }
          this.$services.security
            .getUsersFromJobLocation(payLoad)
            .then(({ data }) => {
              this.getUsersFromJobLocationRes = this.getResponse(data)
              if (this.getUsersFromJobLocationRes.success) {
                var tmpres = this.getUsersFromJobLocationRes?.data?.data?.list.map(
                  (f) => {
                    return {
                      UserName: f.username,
                      FirstName: `${f.firstName} ${f.lastName} (${f.username})`,
                      GUID: f.jobLocation.NidJobLocation
                    }
                  }
                ) || []

                this.tmpUsers = tmpres
                if (this[pClsCombo]) this[pClsCombo] = this.tmpUsers
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
    },

    userVoteUserOld (PNidUserOffending, pNidRequest) {
      this.isTabUserOldEnabled = true
      this.activeTab = 'ViolationVotePreviousUserVotes'

      this.showLoading()
      const payload = {
        PNidUserOffending: PNidUserOffending,
        pNidRequest: pNidRequest
      }

      this.showLoading()
      this.$services.SJ.getViolationRequestOld(payload)
        .then(({ data }) => {
          this.getViolationRequestOldRes = this.getResponse(data)
          if (this.getViolationRequestOldRes.success) {
            this.$refs.ViolationVotePreviousVotesOfOffices.dataContext = this.getViolationRequestOldRes.data.GetViolationRequestOldResult
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

    btnReportClick () {
      if (!this.dataContext?.Request?.NidRequest) return
      const reportPath =
        '/PersonalResource/RptViolationVote'
      const queryParams = {
        NidRequest: this.dataContext.Request.NidRequest
      }
      this.showReport(reportPath, queryParams)
    },
    btnCreateClick () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        pClsViolation: {
          ...this.dataContext
        }
      }
      this.$services.SJ.saveViolation(payload)
        .then(({ data }) => {
          this.saveViolationRes = this.getResponse(data)

          if (this.saveViolationRes.success) {
            this.showSuccess('اطلاعات با موفقیت ذخیره شد')
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
    btnExitClick () {
      this.$root.$emit('close-form')
    }
  },

  created () {
    if (!this.selectedRequest) {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
      this.hideSidebar('UViolationVote')
      this.redirectToKartable()
    }

    this.loadObj()
  }
}
</script>
