<template>
  <form-wrapper :title="title" vertical>
    <template #header>
      <small style="letter-spacing: 1px; font-size: 12px; opacity: .7">کد:&nbsp;{{bizCode}}</small>
    </template>
    <Fit>
      <ArchiveWrap
        v-if="bizCode"
        :biz-code="bizCode"
        :name="archiveAuth.username"
        :pass="archiveAuth.password"
        :options="archiveOptions"
      ></ArchiveWrap>
    </Fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "UArchive",
  mixins: [baseFormMixin],
  data () {
    return {
      title: "آرشیو شهروندسپاری",
      name: 'UArchive',
      formKey: '7294DCB7-79BA-43F7-A8FC-2D75DEEABDC0',
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true,
      serviceResponse: {},
      bizCode: null
    }
  },
  computed: {
    archiveConfig () {
      return window.getConfigValue("archiveCitizen", {})
    },
    archiveAuth () {
      const conf = this.archiveConfig.district[this.District]
      return {
        username: conf?.username,
        password: conf?.password
      }
    },
    archiveOptions () {
      // const nidTree = this.archiveConfig.nidTree
      return {
        // showOnlyStates: null,
        showTree: true,
        // nidTree,
        showToolbar: false,
        showTreeMenu: true
        // treeIDSelected: nidTree
      }
    },
    NidProc () {
      return this.taskInfo.NidProc
    },
    District () {
      return Number(this.taskInfo.Domain || '1')
    }
  },
  methods: {
    async setAuthOptions () {
      try {
        this.showLoading()
        let payLoad = {
          pNidProc: this.NidProc
        }
        const { data } = await this.$services.SC.getArchiveWrapperListByNidProc(
          payLoad,
          {
            config: { District: this.District }
          }
        )
        this.serviceResponse = this.getResponse(data)
        console.log(this.serviceResponse.data)
        if (this.serviceResponse.success) {
          this.bizCode = this.serviceResponse.data?.ArchiveWrapperListByNidProc[0]?.BizCode
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    if (!window.getConfigValue('archiveCitizen', null)) return this.showError('کانفیگ archiveCitizen تعریف نشده است.')
    this.setAuthOptions()
  }
}
</script>
