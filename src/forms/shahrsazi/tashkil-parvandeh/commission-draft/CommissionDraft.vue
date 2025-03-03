<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper title="پیش نویس کمیسیون" vertical :padding="false">
      <safa-status :result="loadObjRes" />
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="Commission" label="کمیسیون" />
          <tab-menu name="specifucation" label="مشخصات" />
          <tab-menu name="archiveTab" label="سوابق کمیسیون" v-if="showHistory === true" />
        </template>
        <tab-content name="Commission" :padding="false">
          <Commission
            :formKey="formKey"
            :title="title"
            :name="name"
            v-model="model"
            @selectedComHandler="selectedComHandler"
            @newBtn="handleNewClick"
          />
        </tab-content>
        <tab-content name="specifucation" :padding="false">
          <specifucation
            :formKey="formKey"
            :title="title"
            :name="name"
            @saveCommission="saveCommission"
            @save="save"
            @showHistory="showHistoryHandler"
            :selectedCom="selectedCom"
            :newCommission="newCommission"
            ref="spec"
          />
        </tab-content>
        <tab-content name="archiveTab" :padding="false" v-if="selectedCom !== null">
          <u-commission-archive v-model="selectedCom.NidCommission" />
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Commission from "./partials/Commission"
import specifucation from "./partials/specifucation"
import UCommissionArchive from "../../archive/archive-commission/UCommissionArchive.vue"

export default {
  mixins: [baseFormMixin],
  components: { specifucation, Commission, UCommissionArchive },
  data () {
    return {
      title: "پیش نویس کمیسیون",
      formKey: "632cec62-4fbd-4c27-a925-965b3354bef9",
      name: "CommissionDraft",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      loadObjRes: null,

      isView: false,
      showHistory: false,
      activeTab: "Commission",
      model: { CommissionList_InNidProc: [] },
      selectedCom: null,
      showOtherBtn: false,
      newCommission: false
    }
  },
  watch: {
    activeTab () {
      this.showOtherBtn = this.activeTab !== "Commission"
    },
    isEditable () {
      this.showOtherBtn = this.isEditable === false
    }
  },
  computed: {
    config () {
      return { config: { District: this.selectedDistrict } }
    },
    showEditButton () {
      return this.activeTab === "specifucation"
    }
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SC.getCommissionListInNidProc(
        { pNidProc: this.selectedRequest.NidProc },
        this.config
      )
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (!this.loadObjRes.hasError) {
            this.model = {
              ...this.loadObjRes.data,
              CommissionList_InNidProc:
                this.loadObjRes.data.CommissionList_InNidProc ?? []
            }
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `بارگذاری اطلاعات فرم ${this.title} برای درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
              })
            }
            this.isView = true
          }
        })
        .catch((e) => {
          this.serverError()
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.$refs.spec.saveData()
    },
    handleNewClick () {
      this.selectedCom = { NidCommission: "00000000-0000-0000-0000-000000000000" }
      this.activeTab = "specifucation"
      this.isEditable = true
      this.showHistory = false
    },
    selectedComHandler (value) {
      this.activeTab = "specifucation"
      this.selectedCom = value
      this.newCommission = false
    },
    cancel () {
      this.isEditable = false
      this.showOtherBtn = true
      this.showHistory = false
    },
    showHistoryHandler () {
      this.activeTab = "archiveTab"
      this.showHistory = true
    },
    saveCommission () {
      this.isEditable = false
      this.activeTab = "Commission"
      this.loadObj()
      this.showHistory = false
    }
  },

  created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  }
}
</script>
