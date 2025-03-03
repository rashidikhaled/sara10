<template>
  <form-wrapper :title="title">
    <template v-slot:header>
      <safa-status :result="getBaseLibInNosaziCodeRes" />
      <div class="flex wrap justify-between items-center">
        <span
          :title="`کد قبلی: ${basePreCodes || '---'}`"
          class="ellipsis"
          style="max-width: 200px; margin-left: 5px"
        >
          کد قبلی: {{ ` ${basePreCodes} , ` || "---" }}
        </span>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          ref="baseNosaziCode"
          m="r"
          class="col"
          :actions="false"
        />
      </div>
    </template>
    <fit>
      <div v-if="archiveConfig && archiveConfig.username" class="fit">
        <ArchiveWrap
          v-if="showArchive"
          ref="archiveRef"
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
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
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  props: {
    selectedRow: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      name: "ReportsArchive",
      title: "آرشیو گزارشات",

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
      getBaseLibInNosaziCodeRes: null,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {}
      },
      resourcePermissionResult: null,
      resourceResult: null,
      ciResult: null,
      ciArchiveGroup: [],
      showArchive: false,
      showArchiveTajmi: false,
      archiveBizCode: ""
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfig("archiveEngineersCertificate")
    },
    basePreCodes () {
      const tmp = this.baseLibResults ?? {}
      if (tmp && tmp.Base_PreCodeInfo) {
        return tmp.Base_PreCodeInfo.map((m) => m.PreCode).toString() || "---"
      } else return "---"
    }
  },

  mounted () {
    this.baseNosaziCode = convertStringToNosaziCodeObject(
      this.selectedRow.CodeString
    )
    // this.loadObj()
    this.updateArchiveBizCode()
  },
  methods: {
    // async loadObj () {
    //   try {
    //     const payload = {
    //       pNosaziCode: {
    //         Apartment: this.baseNosaziCode.Apartment,
    //         Block: this.baseNosaziCode.Block,
    //         Building: this.baseNosaziCode.Building,
    //         CI_City: 0,
    //         District: this.baseNosaziCode.District,
    //         EumBaseInfoGroup: 0,
    //         EumNosaziCodeGroup: 0,
    //         EumNosaziCodeObjType: 0,
    //         EumRevisitGroup: 0,
    //         House: this.baseNosaziCode.House,
    //         IsRoot: false,
    //         NidBase: "00000000-0000-0000-0000-000000000000",
    //         NidNosaziCode: "00000000-0000-0000-0000-000000000000",
    //         Region: this.baseNosaziCode.Region,
    //         Shop: this.baseNosaziCode.Shop
    //       },
    //       pLoadFunc: "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str",
    //       pIsLoadDeletedNosaziCode: false
    //     }
    //     this.showLoading()
    //     const { data } = await this.$services.SA.getBaseLibInNosaziCode(
    //       payload,
    //       { config: { District: this.baseNosaziCode.District } }
    //     )
    //     this.getBaseLibInNosaziCodeRes = this.getResponse(data)
    //     if (this.getBaseLibInNosaziCodeRes.success) {
    //       this.baseLibResults =
    //         this.getBaseLibInNosaziCodeRes.data
    //       this.getArchiveWrapper()
    //     }
    //   } catch (e) {
    //     console.error(e)
    //     this.serverError()
    //   } finally {
    //     this.hideLoading()
    //   }
    // },
    // getArchiveWrapper () {
    //   this.showLoading()
    //   let payLoad = {
    //     pNidNosaziCode: this.baseLibResults.ArchiveWrapper.NidNosaziCode,
    //     pCI_ArchiveGroup: this.selectedArchiveGrp
    //   }
    //   this.$services.SA.getArchiveWrapper(payLoad)
    //     .then(({ data }) => {
    //       this.requestResult = this.getResponse(data)
    //       if (this.requestResult.success) {
    //         this.baseLibResults = this.requestResult.data
    //         this.updateArchiveBizCode(
    //           this.baseLibResults.ArchiveWrapper.BizCode
    //         )

    //         const strNosaziCode = convertNosaziCodeObjectToString(
    //           this.baseNosaziCode
    //         )
    //         this.log({
    //           action: this.logActions.view,
    //           bizCode: strNosaziCode,
    //           nosaziCode: strNosaziCode,
    //           bizCodeArchive: this.baseLibResults.ArchiveWrapper.BizCode,
    //           bizCodeTitle: "کد نوسازی"
    //         })
    //         this.showArchive = true
    //       }
    //     })
    //     .catch((e) => {
    //       this.serverError()
    //       this.showArchive = false
    //       console.log(e)
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
    updateArchiveBizCode () {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = this.selectedRow?.NidProc || "00000000-0000-0000-0000-000000000000"
      this.showArchive = true
    }
  }
}
</script>
