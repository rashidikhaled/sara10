<template>
  <form-wrapper :padding="false" title="سوابق جلسات">
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="History" label="تاریخچه جلسات" />
        <tab-menu
          name="Info"
          label="اطلاعات جلسه"
          v-if="activeTab === 'Info'"
        />
      </template>
      <tab-content name="History">
        <safa-datatable
          helper="sessionHistoryColumns"
          title="لیست تاریخچه سوابق"
          v-model="meetingVoteList"
          cdcName="meetingVoteList"
          m="r"
          @row-click="selectRow"
          min-height="200px"
          max-height="100%"
          height="100%"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
        />
      </tab-content>
      <tab-content name="Info">
        <fit>
          <text-template
            v-model="model.sessionHistory.Agent1Comment"
            cdcName="Agent1Comment"
            label="توضیحات کارشناس اول"
            label-width="70px"
            :rows="2"
            formKey="1b20a6bb-3dff-49c5-a09f-5a145f1ca65a"
            class="q-mb-sm"
          />
          <text-template
            v-model="model.sessionHistory.Agent2Comment"
            cdcName="Agent2Comment"
            label="توضیحات کارشناس دوم"
            label-width="70px"
            :rows="2"
            class="q-mb-sm"
            formKey="386da9b8-226f-41b4-930c-0f9cb8dc21dc"
          />
          <text-template
            v-model="model.sessionHistory.Agent3Comment"
            cdcName="Agent3Comment"
            label="توضیحات کارشناس سوم"
            :rows="2"
            label-width="70px"
            formKey="9ac355ab-7d29-4470-8384-84ed09d9a43d"
          />
        </fit>
      </tab-content>
    </safa-tabs>
    <template v-slot:footer>
      <form-actions
        :showEditButton="activeTab === 'Info'"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        :m="mode"
        @save="saveMeeting"
      >
        <template v-slot:after>
          <btn-new v-if="activeTab === 'History'" @click="newHandler" />
          <btn-edit
            v-if="activeTab === 'History'"
            @click="editHandler"
            :disable="selectedRow === null ? true : false"
          />
          <btn-delete
            v-if="activeTab === 'History'"
            @click="deleteMeeting"
            :disable="selectedRow === null ? true : false"
          />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

const defaultModel = {
  Agent1Comment: "",
  Agent2Comment: "",
  Agent3Comment: "",
  CreateDate: null,
  CreateTime: null,
  NidAgent1: null,
  NidAgent2: null,
  NidAgent3: null,
  NidMeetingVote: "00000000-0000-0000-0000-000000000000",
  NidCommission: "00000000-0000-0000-0000-000000000000"
}

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  props: {
    formKey: String
  },
  data () {
    return {
      activeTab: "History",
      name: "SessionHistory",
      title: "سوابق جلسات",
      model: { sessionHistory: { ...defaultModel } },
      meetingVoteList: [],
      selectedRow: null,
      isView: false
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      try {
        const payload = {
          pNidCommission: this.selectedNidCommission
        }
        this.showLoading()
        const { data } =
          await this.$services.commissions.getCommissionMeetingVoteList(
            payload
          )
        const res = this.getResponse(data)
        if (res.success) {
          this.meetingVoteList =
            res.data.GetCommission_MeetingVoteListResult.Commission_MeetingVoteList
          if (!this.isView) {
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedNidCommission.BizCode,
              saveDesc: `بارگذاری اطلاعات ${this.title} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async saveMeeting () {
      this.model.sessionHistory.NidCommission = this.selectedNidCommission
      try {
        this.showLoading()
        const { data } =
          await this.$services.commissions.saveCommissionMeetingVote({
            pObj: {
              Commission_MeetingVote: this.model.sessionHistory,
              NidMeetingVote: this.model.sessionHistory.NidMeetingVote
            }
          })
        const res = this.getResponse(data)
        if (res.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          this.log({
            action: this.logActions.save,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: "NidCommission",
            nosaziCode: this.selectedNidCommission.BizCode,
            saveDesc: `ذخیره اطلاعات ${this.title} انجام گردید.`
          })
          this.reset()
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.hideLoading()
      }
    },

    deleteMeeting () {
      this.showConfirm("آیا حذف این مورد مطمئن هستید؟").onOk(async () => {
        try {
          const payload = {
            pObj: {
              Commission_MeetingVote: this.selectedRow,
              NidMeetingVote: "00000000-0000-0000-0000-000000000000"
            }
          }
          this.showLoading()
          const { data } =
            await this.$services.commissions.deleteCommissionMeetingVote(
              payload
            )
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            this.log({
              action: this.logActions.delete,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedNidCommission.BizCode,
              saveDesc: `حذف اطلاعات در ${this.title} انجام گردید.`
            })
            this.reset()
          }
        } catch (error) {
          console.error(error)
        } finally {
          this.hideLoading()
        }
      })
    },

    selectRow (val) {
      this.selectedRow = val
    },

    reset () {
      this.model = { sessionHistory: { ...defaultModel } }
      this.activeTab = "History"
      this.isEditable = false
      this.loadData()
    },

    newHandler () {
      this.model = { sessionHistory: { ...defaultModel } }
      this.activeTab = "Info"
      this.isEditable = true
    },

    editHandler () {
      this.model.sessionHistory = this.selectedRow
      this.activeTab = "Info"
      this.isEditable = true
    }
  },

  watch: {
    isEditable: {
      handler () {
        if (this.isEditable === false) this.activeTab = "History"
      },
      deep: true
    },
    activeTab: {
      handler () {
        if (this.activeTab === "History" && this.isEditable === true) {
          this.isEditable = false
        }
      },
      deep: true
    }
  }
}
</script>
