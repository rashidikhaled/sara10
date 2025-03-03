<template>
  <fit>
    <safa-status v-if="result" :result="result" />
    <div
      :class="['q-py-sm q-px-md', $q.dark.isActive ? 'bg-dark' : 'bg-grey-2']"
    >
      <safa-combo
        :searchValue="false"
        style="width: 220px; max-width: 100%"
        :options="filteredArchiveWrapperOptions"
        source-type="local"
        @input="getArchiveWrapper"
        v-model="selectedArchiveGrp" />
    </div>
    <q-separator />
    <ArchiveWrap
      v-if="archiveBizCode"
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :userLoginId="nidUser"
      :userLoginName="username"
      :biz-code="archiveBizCode"
      :options="archiveOptions"
      class="fit"
    ></ArchiveWrap>
  </fit>
</template>

<script>
import { convertStringToNosaziCodeObject } from "../utils/nosaziCodeOperation"
import archiveGroupPermissionMixin from "./archiveGroupPermissionMixin"
/* eslint-disable no-undef */

export default {
  name: "TaskArchive",
  data () {
    return {
      archiveWrapperList: [],
      archiveBizCode: '',
      selectedArchiveGrp: 1,
      baseLibResults: null,
      result: null,
      archiveOptions: {
        showOnlyStates: null,
        showTree: true
      }
    }
  },
  mixins: [archiveGroupPermissionMixin],
  props: {
    taskInfo: Object
  },
  computed: {
    filteredArchiveWrapperOptions () {
      return this.archiveWrapperList
        .filter((x) =>
          this.allowedArchiveGroupCiIds.includes(x.ID)
        )
    },
    archiveConfig () {
      // eslint-disable-next-line no-undef
      if (!this.taskInfo) return window.getConfigValue("archiveCore")
      // eslint-disable-next-line no-undef
      const districtConfig = window.getConfigValue("archiveCore.district", {})
      const district =
        (this.taskInfo.BizCode && this.taskInfo.BizCode.split("-")[0]) || -1

      // eslint-disable-next-line no-undef
      return districtConfig[district] || window.getConfigValue("archiveCore")
    },
    nidUser () {
      return this.$stSecurity.getters["authorize/userId"]
    },
    username () {
      return this.$stSecurity.getters["authorize/username"]
    }
  },
  beforeDestroy () {
    this.archiveOptions.showOnlyStates = null
  },
  methods: {
    async getCIArchiveGroup () {
      try {
        const { data } = await this.$services.CiSrvSara.getCI({
          ciName: "CI_ArchiveGroup",
          domainName: "CI_SaraM1"
        })
        const getCIRes = this.getResponse(data)
        if (getCIRes.success) {
          this.archiveWrapperList = getCIRes.data?.list ?? []
        }
      } catch (e) {
        console.error(e)
      }
    },
    async loadNosaziInfo () {
      const codeObj = convertStringToNosaziCodeObject(this.taskInfo.BizCode)
      try {
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          {
            pNosaziCode: {
              CI_City: 0,
              EumBaseInfoGroup: 0,
              EumNosaziCodeGroup: 0,
              EumNosaziCodeObjType: 0,
              EumRevisitGroup: 0,
              IsRoot: "false",
              NidBase: "00000000-0000-0000-0000-000000000000",
              NidNosaziCode: "00000000-0000-0000-0000-000000000000",
              ...codeObj
            },
            pLoadFunc: "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo,Sh_RequestInfo",
            pIsLoadDeletedNosaziCode: false
          },
          // this.config
          {
            config: {
              District: codeObj.District
            }
          }
        )
        this.result = this.getResponse(data)
        if (!this.result.success) {
          this.baseLibResults = null
          this.$emit("error", {
            errors: this.result.errors,
            data: codeObj
          })
          return
        }
        this.baseLibResults = data
        await this.getArchiveWrapper()
      } catch (ex) {
        console.log("error ..........", ex)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
      }
    },
    updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    },
    getArchiveWrapper () {
      let payLoad = {
        pNidNosaziCode: this.baseLibResults.ArchiveWrapper.NidNosaziCode,
        pCI_ArchiveGroup: this.selectedArchiveGrp
      }
      this.$services.SA.getArchiveWrapper(payLoad, {
        config: {
          District: convertStringToNosaziCodeObject(this.taskInfo.BizCode).District || 1
        }
      }
      )
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = data
            this.updateArchiveBizCode(
              this.baseLibResults.ArchiveWrapper.BizCode
            )
            this.showArchive = true
          }
        })
        .catch((response) => {
          this.serverError()
          this.showArchive = false
          console.log("error", response)
        })
        .finally(() => {
        })
    }
  },
  watch: {

    archiveBizCode () {
      this.archiveOptions.showOnlyStates = [
        { key: `${this.taskInfo.NidWorkItem}`, isSelected: false }
      ]
    }

  },
  async created () {
    await this.checkArchiveGroupsCiByUserPermission()
    this.archiveOptions.showTree = true
    await this.getCIArchiveGroup()
    await this.loadNosaziInfo()
  }
}
</script>

<style lang="scss">
.archive-container {
  width: 100%;
  height: 100%;
}
</style>
