<template>
  <fit>
    <safa-status :result="getArchiveBizCodeFromNosaziCodeRes" />
    <internal-section>
      <FormRow :lg="3" :xl="4" :md="3" :sm="3">
        <FormControl>
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            :actions="true"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            cdcName="cboArchiveGroup"
            ciName="CI_ArchiveGroup"
            domainName="CI_SaraM1"
            label="گروه آرشیو"
            v-model="cboArchiveGroup"
            ref="cboArchiveGroup"
          />
        </FormControl>
        <FormControl>
          <btn-default label="جستجو" @click="btnSubmitClick" />
        </FormControl>
      </FormRow>
    </internal-section>
    <div class="fit" v-if="archiveConfig && archiveConfig.username">
      <ArchiveWrap
        v-if="showArchive"
        style="min-height: 300px"
        class="fit"
        ref="archiveRef"
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :bizCode="archiveBizCode"
      />
    </div>
  </fit>
</template>

<script>
/* eslint-disable no-undef */
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  props: {
    lazy: Boolean,
    isLoadDeletedNosaziCode: {
      type: Boolean,
      default: false
    },
    formKey: String,
    pLoadFunc: {
      type: String,
      default:
        "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo,Sh_RequestInfo"
    }
  },
  data () {
    return {
      title: "آرشیو شهرسازی",
      name: "UrbanPlanningArchive",
      cboArchiveGroup: null,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {
          BizCode: null
        },
        Base_RegisterPlack_Str: null
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      bizCode: "",
      showArchive: false,
      nidNosaziCode: "00000000-0000-0000-0000-000000000000",
      getArchiveBizCodeFromNosaziCodeRes: null
    }
  },

  methods: {
    // async getBizCode (selecteditem = null, pCode = {}) {
    //   // با زمل متفاوت هست اما ساختار جدید هست
    //   let data = {
    //     pNosaziCode: {
    //       CI_City: 0,
    //       EumBaseInfoGroup: 0,
    //       EumNosaziCodeGroup: 0,
    //       EumNosaziCodeObjType: 0,
    //       EumRevisitGroup: 0,
    //       IsRoot: "false",
    //       NidBase: "00000000-0000-0000-0000-000000000000",
    //       NidNosaziCode: "00000000-0000-0000-0000-000000000000",
    //       ...pCode
    //     },
    //     pLoadFunc: this.pLoadFunc,
    //     pIsLoadDeletedNosaziCode: this.isLoadDeletedNosaziCode
    //   }
    //   this.showLoading()
    //   await this.$services.SA.getBaseLibInNosaziCode(data, this.config)
    //     .then(({ data }) => {
    //       this.requestResult = this.getResponse(data)
    //       if (this.requestResult.success) {
    //         this.baseLibResults = this.requestResult.data

    //         if (this.baseLibResults.ArchiveWrapper) {
    //           this.updateArchiveBizCode(
    //             this.baseLibResults.ArchiveWrapper.BizCode
    //           )
    //           this.showArchive = true
    //         } else {
    //           this.showArchive = false
    //         }
    //       }
    //     })
    //     .catch((response) => {
    //       console.log("error", response)
    //       this.showError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },

    async getBizCode (selecteditem = null, pCode = null, pFromSearch = false) {
      if (pCode != null) {
        this.baseNosaziCode = convertStringToNosaziCodeObject(pCode)
      }

      let defaultArchiveGroupTitle =
        (this.getApplicationParam.hasOwnProperty("DefaultArchiveGroupTitle") &&
          this.getApplicationParam.DefaultArchiveGroupTitle) ||
        ""

      // eslint-disable-next-line eqeqeq
      if (pFromSearch == false && defaultArchiveGroupTitle) {
        let cIArchiveGroupNew = 0
        if (this.$refs.cboArchiveGroup.datasource?.length > 0) {
          this.$refs.cboArchiveGroup.datasource.every((item) => {
            if (item.Title.includes(defaultArchiveGroupTitle)) {
              cIArchiveGroupNew = item.ID
              return false
            }
            return true
          })
        }
        if (this.cboArchiveGroup == null) {
          this.cboArchiveGroup = cIArchiveGroupNew
          selecteditem = cIArchiveGroupNew
        } else if (cIArchiveGroupNew > 0) {
          this.cboArchiveGroup = cIArchiveGroupNew
          selecteditem = cIArchiveGroupNew
        }
      }

      if (this.cboArchiveGroup != null) {
        this.showLoading()

        const payload = {
          pNosaziCode: { ...this.baseNosaziCode },
          pCI_ArchiveGroup: this.selecteditem
            ? this.selecteditem
            : this.cboArchiveGroup
        }

        this.$services.commissions
          .getArchiveBizCodeFromNosaziCode(payload)
          .then(async ({ data }) => {
            this.getArchiveBizCodeFromNosaziCodeRes = this.getResponse(data)
            if (this.getArchiveBizCodeFromNosaziCodeRes.success) {
              this.bizCode =
                this.getArchiveBizCodeFromNosaziCodeRes.data.GetArchiveBizCode_FromNosaziCodeResult.ArchiveBizCode
              this.domain = this.baseNosaziCode.District
              this.log({
                action: this.logActions.view,
                bizCode: this.bizCode,
                bizCodeTitle: "ArchiveBizCode",
                saveDesc: `بارگذاری اطلاعات در ${this.title} انجام گردید.`
              })
              this.updateArchiveBizCode(this.bizCode)
              this.showArchive = true
            } else {
              this.showArchive = false
            }
          })
          .catch((e) => {
            console.error(e)
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },

    btnSubmitClick () {
      this.getBizCode(null, null, true)
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return window.getConfigValue("archiveCore").district[
        (this.baseNosaziCode && this.baseNosaziCode.District) || 1
      ]
    },
    config () {
      return {
        config: {
          District:
            this.baseNosaziCode.District === 0
              ? 1
              : this.baseNosaziCode.District
        }
      }
    }
  }
}
</script>
