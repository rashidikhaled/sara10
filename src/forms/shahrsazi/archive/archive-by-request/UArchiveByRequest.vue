<template>
    <!-- <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  > -->
  <form-wrapper :hideTitle="value" :title="title" :padding="false">
      <template #header>
        <div>
          <form-header-by-nosazi-code v-model="archiveBizCode" />
        </div>
        <safa-status :result="loadObjRes" />
      </template>
      <fit>
        <ArchiveWrap
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
        />
      </fit>
    </form-wrapper>
  <!-- </safa-form> -->
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  props: {
    value: String
  },
  data () {
    return {
      title: "آرشیو بر اساس درخواست",
      formKey: "23942F6A-47A1-4FCB-A45E-9D79806C9015",
      name: "UArchiveByRequest",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      loadObjRes: null,
      showArchive: false,
      archiveWrapperModel: null,
      archiveWrapperList: [],
      archiveBizCode: '',
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore')
    },
    config () {
      return {
        config: {
          District:
            this.BaseNosaziCode?.District === 0
              ? 1
              : this.BaseNosaziCode?.District
        }
      }
    }
  },
  // watch: {
  //   selectedArchiveGrp () {
  //     this.getArchiveWrapper()
  //   }
  // },
  // beforeMount () {
  //   if (this.selectedRequest) {
  //     this.baseNosaziCode = this.convertToNosaziCodeObject(this.selectedRequest.BizCode)
  //     // this.updateArchiveBizCode(this.selectedRequest.BizCode)
  //   }
  // },
  mounted () {
    if (!this.selectedRequest) {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
      this.hideSidebar(this.name)
    } else {
      this.archiveBizCode = this.selectedRequest.BizCode
      this.loadObj()
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    },
    fetchWrapperList () {
      this.updateArchiveBizCode(this.BaseNosaziCode)
    },
    loadObj () {
      this.showLoading()
      const payload = {
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
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(payload)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            debugger
            this.baseLibResults = this.loadObjRes.data
            if (this.baseLibResults.ArchiveWrapper) {
              this.updateArchiveBizCode(
                this.baseLibResults.ArchiveWrapper.BizCode
              )
            }
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
