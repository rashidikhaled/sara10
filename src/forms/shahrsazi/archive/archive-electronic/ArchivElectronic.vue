<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="آرشیو الکترونیکی"
  >
    <form-wrapper class="minimialScreen" :title="title">
      <template v-slot:header>
        <div class="flex wrap justify-between items-center">
          <span
            :title="`کد قدیم: ${basePreCodes || '---'}`"
            class="ellipsis"
            style="max-width: 200px; margin-left: 5px"
          >
            کد قدیم: {{ ` ${basePreCodes} , ` || "---" }}
          </span>
          <form-header-by-nosazi-code
            v-model="baseNosaziCode"
            @fetched="fetched"
            class="col"
          />
        </div>
      </template>
      <fit>
        <internal-section>
          <div class="row q-col-gutter-lg">
            <!-- <safa-combo
              v-model="selectedArchiveGrp"
              cdcName="selectedArchiveGrp"
              ciName="CI_ArchiveGroup"
              class="col-12 col-md-3"
              domainName="CI_SaraM1"
              label="گروه آرشیو"
            /> -->
            <safa-combo
              v-model="selectedArchiveGrp"
              :options="archiveWrapperOptions"
              :loading="ciArchiveGroupLoading"
              source-type="local"
              class="col-12 col-md-3"
              label="گروه آرشیو"
              @input="getArchiveWrapper"
            />
            <safa-text
              v-model="baseLibResults.Base_RegisterPlack_Str"
              cdcName="Base_RegisterPlack_Str"
              class="col-12 col-md-3"
              label="پلاک ثبتی"
              read-only
            />
            <safa-text
              v-if="archiveBizCode"
              v-model="archiveBizCode"
              class="col-12 col-md-3"
              label="کلید آرشیو"
              read-only
            />
            <div v-else class="flex items-center col-12 col-md-3">
              <span class="text-grey"
                ><q-icon color="amber" name="warning" size="xs" />&nbsp; اطلاعات
                کد نوسازی معتبر نمی باشد.</span
              >
            </div>
            <div
              v-if="showArchiveTajmi"
              class="flex items-center col-12 col-md-3"
            >
              <span class="bg-red-2 text-dark">&nbsp; آرشیو تجمیعی</span>
            </div>
          </div>
        </internal-section>
        <div v-if="archiveConfig && archiveConfig.username" class="fit">
          <ArchiveWrap
            v-if="showArchive"
            ref="archiveRef"
            :name="archiveConfig.username"
            :pass="archiveConfig.password"
            :biz-code="archiveBizCode"
            :options="archiveOptions"
            class="fit"
            style="min-height: 300px"
          ></ArchiveWrap>
        </div>
        <div v-else class="flex items-center full-height justify-center">
          <span class="text-grey"
            >عدم یافتن تنظیمات مرتبط با آرشیو ... ({{
              baseNosaziCode.District
            }})</span
          >
        </div>
      </fit>
      <template #footer>
        <safa-securityPanel
          id="2384f927-5e2f-3998-8baa-c768616287f5"
          caption="انتقال آرشیو"
          :force="true"
        >
          <btn-default label="انتقال آرشیو" @click="showTransferModal = true" />
        </safa-securityPanel>
      </template>
    </form-wrapper>
    <safa-popup
      v-model="showTransferModal"
      title="انتقال آرشیو"
      width="600px"
      height="300px"
    >
      <UTransferArchive
        @hide="showTransferModal = false"
        @transfer="transferArchive"
        :oldBizCode="baseLibResults.ArchiveWrapper.BizCode"
        :selectedArchiveGrp="selectedArchiveGrp"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
/* eslint-disable no-undef */

import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import archiveGroupPermissionMixin from "src/kartable/task/archiveGroupPermissionMixin"
import UTransferArchive from "./partials/UTransferArchive.vue"

export default {
  mixins: [baseFormMixin, mapMixin, archiveGroupPermissionMixin],
  components: { UTransferArchive },

  data () {
    return {
      title: "آرشیو الکترونیک",
      // formKey: '6bbad028-3bcb-4e39-8428-b214168077c5',
      // formKey: "fc9e3020-c00f-467e-b241-1a4ca32dfc00",
      formKey: "7CD5F300-DE95-4003-B2CD-4726C2530629",
      name: "ArchivElectronic",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      archiveOptions: {
        showOnlyStates: null,
        showTree: true
      },

      showTransferModal: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedArchiveGrp: 1,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {}
      },
      resourcePermissionResult: null,
      resourceResult: null,
      ciResult: null,
      ciArchiveGroup: [],
      ciArchiveGroupLoading: false,
      showArchive: false,
      showArchiveTajmi: false,
      archiveBizCode: ""
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfig("archiveCore").district[
        (this.baseNosaziCode && this.baseNosaziCode.District) || 1
      ]
    },
    basePreCodes () {
      const tmp = this.baseLibResults ?? {}
      if (tmp && tmp.Base_PreCodeInfo) {
        return (
          tmp.Base_PreCodeInfo.map((x) => x.PreCode || "")
            .map((x) => x.split("-").reverse().join("-"))
            .join("، ")
            .toString() || "---"
        )
      } else return "---"
    },
    archiveWrapperOptions () {
      return this.ciArchiveGroup.filter((x) =>
        this.allowedArchiveGroupCiIds.includes(x.ID)
      )
    }
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
          this.ciArchiveGroup = data?.data?.list ?? []
        }
      } catch (e) {
        console.error(e)
      }
    },
    transferArchive () {
      this.showLoading()
      this.showArchive = false
      setTimeout(() => {
        this.showArchive = true
        this.hideLoading()
      }, 1000)
    },
    changeNosazi (code) {
      console.log(code)
      // this.baseNosaziCode
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },

    fetched (value) {
      if (value.IsExistInTajmi_ === true) {
        this.showArchiveTajmi = true
      } else {
        this.showArchiveTajmi = false
      }
      this.baseLibResults = value
      // if (value.ArchiveWrapper) {
      //   this.updateArchiveBizCode(this.baseLibResults.ArchiveWrapper.BizCode)
      //   this.showArchive = true
      // } else {
      //   this.showArchive = false
      // }
      const strNosaziCode = convertNosaziCodeObjectToString(
        value?._NosaziCode ?? "0-0-0-0-0-0-0"
      )
      this.showCodeOnMap(strNosaziCode)
      this.getArchiveWrapper()
    },
    // handelChangeCmb
    getArchiveWrapper () {
      this.showLoading()
      let payLoad = {
        pNidNosaziCode: this.baseLibResults.ArchiveWrapper.NidNosaziCode,
        pCI_ArchiveGroup: this.selectedArchiveGrp
      }
      this.$services.SA.getArchiveWrapper(payLoad, {
        config: {
          District: this.baseNosaziCode.District
        } }
      ).then(async ({ data }) => {
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.updateArchiveBizCode(
            this.requestResult.data.ArchiveWrapper.BizCode
          )

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            nosaziCode: strNosaziCode,
            bizCodeArchive: this.requestResult.data.ArchiveWrapper.BizCode,
            bizCodeTitle: "کد نوسازی"
          })
          this.showArchive = true
        }
      })
        .catch((response) => {
          this.serverError()
          this.showArchive = false
          console.log("error", response)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  watch: {
    selectedArchiveGrp () {
      this.archiveOptions.showOnlyStates = [
        { key: `${this.selectedRequest.NidWorkItem}`, isSelected: false }
      ]
    }
  },
  beforeMount () {
    this.archiveOptions.showTree = true
  },

  beforeDestroy () {
    this.archiveOptions.showOnlyStates = null
  },
  async created () {
    await this.checkArchiveGroupsCiByUserPermission()
    await this.getCIArchiveGroup()
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 550px) {
  .flex.wrap.justify-between.items-center {
    display: contents;
  }
  .nosazi-header.flex.items-center.no-wrap.ellipsis.justify-between.col {
    display: contents;
  }
  .minimialScreen .form-title {
    display: none !important;
  }
}
</style>
