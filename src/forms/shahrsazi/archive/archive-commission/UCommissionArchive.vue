<template>
  <!-- <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  > -->
    <form-wrapper :hideTitle="value" :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="loadCommissionRes" />
      </template>
      <fit>
        <ArchiveWrap
          v-if="showArchive"
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
          fit
        />
      </fit>
    </form-wrapper>
  <!-- </safa-form> -->
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: String
  },
  data () {
    return {
      title: "آرشیو کمیسیون",
      formKey: "86AD904E-7D36-45CC-A602-CEC3344C3A18",
      name: "UCommissionArchive",
      main: true,
      // sidebarCompatible: true,
      // workflowCompatible: true,

      model: {
        CommissionList_InNidProc: null,
        Commission_ArchiveRoot: ""
      },
      pNidCommission: null,
      loadObjRes: null,
      loadCommissionRes: null,
      showArchive: false,
      selectedArchiveGrp: 1,
      archiveBizCode: ""
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },

    async loadObj (pNidProc) {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getCommissionListInNidProc(
          { pNidProc },
          this.config
        )
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          let list = this.loadObjRes?.data?.CommissionList_InNidProc ?? null
          if (Array.isArray(list) && list.length > 0)
          { await this.loadCommission(list[0].NidCommission) }
        }
      } catch (e) {
        this.serverError()
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async loadCommission (pNidCommission) {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.loadCommission(
          { pNidCommission },
          this.config
        )
        this.loadCommissionRes = this.getResponse(data)
        if (this.loadCommissionRes.success) {
          this.showArchive = true
          this.model = this.loadCommissionRes.data
          this.updateArchiveBizCode(this.model.Commission_ArchiveRoot)
          await this.log({
            action: this.logActions.view,
            bizCode: pNidCommission,
            bizCodeTitle: "NidCommission",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `بارگذاری  ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        this.serverError()
        console.error(e)
      } finally {
        this.hideLoading()
      }
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCommission")
    },
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  },

  async mounted () {
    if (this.value) {
      await this.loadCommission(this.value)
    } else if (this.isSelectedRequest()) {
      await this.loadObj(this.selectedRequest.NidProc)
    } else this.hideSidebar(this.name)
  }
}
</script>
