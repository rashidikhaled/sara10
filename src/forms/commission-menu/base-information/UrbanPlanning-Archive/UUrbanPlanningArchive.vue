<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <fit>
    <FormRow class="q-pa-sm">
      <nosazi-code-input
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
        label-width="70px"
        :actions="false"
      />
      <form-control>
        <safa-combo
          ciName="CI_ArchiveGroup"
          domainName="Comission "
          label-width="60px"
          v-model="archiveResults.ArchiveWrapper.CI_ArchiveGroup"
          cdcName="ArchiveGroup"
        />
      </form-control>
      <div>
        <btn-default label="جستجو" />
      </div>
    </FormRow>
  </fit>
  </safa-form>
</template>

<script>
/* eslint-disable no-undef */
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "آرشیو شهرسازی",
      name: "UrbanPlanningArchive",
      formKey: "1cf53820-677d-433c-9343-17c2d1cee9c6",
      main: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedArchiveGrp: null,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {
          BizCode: null
        },
        Base_RegisterPlack_Str: null
      },
      archiveResults: { ArchiveWrapper: {} },
      resourcePermissionResult: null,
      resourceResult: null,
      ciResult: null,
      ciArchiveGroup: [],
      payLoad: {
        pNidNosaziCode: null,
        pCI_ArchiveGroup: null
      },
      showArchive: false,
      archiveBizCode: ""
    }
  },

  mounted () {
    this.GetBaseLib_InNosaziCode()
    console.log("dataItem", this.dataItem)
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    GetBaseLib_InNosaziCode () {
      let data = {
        pNosaziCode: {
          Apartment: this.dataItem.Apartment,
          Block: this.dataItem.Block,
          Building: this.dataItem.Building,
          CI_City: 0,
          District: this.dataItem.District,
          EumBaseInfoGroup: this.dataItem.EumBaseInfoGroup,
          EumNosaziCodeGroup: this.dataItem.EumNosaziCodeGroup,
          EumNosaziCodeObjType: this.dataItem.EumNosaziCodeObjType,
          EumRevisitGroup: this.dataItem.EumRevisitGroup,
          House: this.dataItem.House,
          IsRoot: false,
          NidBase: this.dataItem.NidNosaziCode,
          NidNosaziCode: this.dataItem.NidNosaziCode,
          Region: this.dataItem.Region,
          Shop: this.dataItem.Shop
        }
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data, {
        config: {
          District: this.baseNosaziCode.District
        } })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            this.payLoad = {
              pNidNosaziCode: this.baseLibResults.ArchiveWrapper.NidNosaziCode,
              pCI_ArchiveGroup: this.selectedArchiveGrp
            }
            this.getArchiveWrapper()
          }
        })
        .catch((response) => {
          console.log("error", response)
          this.showError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getArchiveWrapper () {
      let data = {
        pNidNosaziCode: this.dataItem.NidNosaziCode,
        pCI_ArchiveGroup: this.selectedArchiveGrp || 1
      }
      this.$services.SA.getArchiveWrapper(data)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.archiveResults = this.requestResult.data
            if (this.archiveResults.ArchiveWrapper) {
              this.updateArchiveBizCode(
                this.archiveResults.ArchiveWrapper.BizCode
              )
              this.showArchive = true
            }
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeArchive: this.baseLibResults.ArchiveWrapper.BizCode,
              bizCodeTitle: "BizCodeArchive",
              nosaziCode: strNosaziCode,
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          } else {
            this.showArchive = false
          }
        })
        .catch((response) => {
          //   // this.serverError() // test serverError
          this.showError("اسناد این شماره پرونده موجود نمیباشد.")
          console.log("error", response)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  computed: {
    archiveConfig () {
      console.log(window.getConfigValue("archiveCore").district)
      console.log(
        window.getConfigValue("archiveCore").district[this.dataItem.District]
      )
      return window.getConfigValue("archiveCore").district[this.dataItem.District || 1]
    }
  },
  watch: {
    selectedArchiveGrp () {
      this.GetBaseLib_InNosaziCode()
    },
    archiveConfig () {
      this.$forceUpdate()
      const self = this
      this.$nextTick(function () {
        if (self.$refs.archiveRef) {
          self.$refs.archiveRef.login()
        }
      })
    }
  }
}
</script>
