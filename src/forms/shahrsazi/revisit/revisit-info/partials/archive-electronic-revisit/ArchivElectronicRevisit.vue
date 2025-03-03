<template>
  <fit>
    <template v-slot:header>
      <form-header-by-nosazi-code
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
        @fetched="handleBaseNosaziCodeChanged"
      />
    </template>
    <div class="row q-col-gutter-sm q-pa-sm items-center">
      <q-btn
        v-if="isShowArchiveTab"
        class="show-when-hover q-mr-sm"
        color="primary"
        dense
        flat
        round
        size="sm"
        title="مشاهده آرشیو"
        @click="handleShowArchiveModal"
      >
        <q-icon name="camera_enhance" size="md" />
      </q-btn>
      <safa-combo
        v-model="selectedArchiveGrp"
        cdcName="selectedArchiveGrp"
        ciName="CI_ArchiveGroup"
        class="col"
        domainName="CI_SaraM1"
        label="گروه آرشیو"
      />
      <safa-text
        v-model="baseLibResults.ArchiveWrapper.BizCode"
        cdcName="BizCode"
        class="col"
        label="کلید آرشیو"
      />
      <safa-text
        v-model="baseLibResults.Base_RegisterPlack_Str"
        cdcName="Base_RegisterPlack_Str"
        class="col"
        label="پلاک ثبتی"
      />
    </div>
    <ArchiveWrap
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "ArchivElectronicRevisit",
  mixins: [baseFormMixin],
  components: {},

  data () {
    return {
      selectedArchiveGrp: null,
      requestResult: null,
      archiveBizCode: "",
      baseLibResults: {
        ArchiveWrapper: {}
      },
      resourcePermissionResult: null,
      resourceResult: null,
      ciResult: null,
      ciArchiveGroup: []
    }
  },
  props: {
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    baseNosaziCode: Object,
    isShowArchiveTab: Boolean
  },
  methods: {
    handleShowArchiveModal () {
      this.$emit("handleShowArchiveModal")
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
      // eslint-disable-next-line no-undef
    },
    async handleBaseNosaziCodeChanged () {
      try {
        let payload = {
          pNosaziCode: {
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            CI_City: 0,
            District: this.baseNosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: this.baseNosaziCode.House,
            IsRoot: false,
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            Region: this.baseNosaziCode.Region,
            Shop: this.baseNosaziCode.Shop
          },
          pLoadFunc:
            "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo",
          pIsLoadDeletedNosaziCode: false
        }
        this.showLoading()
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payload,
          { config: { District: this.selectedDistrict } }
        )
        this.requestResult = this.getResponse(data)

        if (this.requestResult.success) {
          this.baseLibResults = this.requestResult.data
          if (this.baseLibResults.ArchiveWrapper) {
            this.selectedArchiveGrp =
              this.baseLibResults.ArchiveWrapper.CI_ArchiveGroup
          }
          // this.updateArchiveBizCode(this.baseLibResults.ArchiveWrapper.BizCode);
        }
      } catch (e) {
        console.log(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
      this.isEditable = true
      this.isSearch = true
    },

    async getArchiveWrapper () {
      try {
        this.showLoading()
        let payLoad = {
          pNidNosaziCode: this.baseLibResults.ArchiveWrapper.NidNosaziCode,
          pCI_ArchiveGroup: this.selectedArchiveGrp
        }
        const { data } = await this.$services.SA.getArchiveWrapper(
          payLoad,
          { config: { District: this.selectedDistrict } }
        )
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.baseLibResults = this.requestResult.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            bizCodeArchive: this.baseLibResults?.ArchiveWrapper?.BizCode ?? '',
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `نمایش اطلاعات آرشیو برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
          this.updateArchiveBizCode(this.baseLibResults.ArchiveWrapper.BizCode)
        }
      } catch (e) {
        console.log(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  computed: {
    archiveConfig () {
      if (!this.selectedDistrict) {
        // eslint-disable-next-line no-undef
        return window.getConfigValue("archiveCore")
      } else {
        // eslint-disable-next-line no-undef
        const districtConfig =
          window.getConfigValue("archiveCore").district || {}
        if (districtConfig[this.selectedDistrict] === undefined) {
          return districtConfig[1]
        } else {
          return districtConfig[this.selectedDistrict]
        }
      }
    }
  },
  watch: {
    selectedArchiveGrp () {
      this.getArchiveWrapper()
    }
  },
  mounted () {
    this.handleBaseNosaziCodeChanged()
    if (this.baseLibResults.ArchiveWrapper) {
      this.updateArchiveBizCode(this.baseLibResults.ArchiveWrapper.BizCode)
    }
  }
}
</script>
