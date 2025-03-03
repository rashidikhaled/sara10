<template>
  <safa-form
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetched"
          :actions="false"
        />
      </template>
      <fit>
        <div class="fit">
          <ArchiveWrap
            :name="archiveConfig.username"
            :pass="archiveConfig.password"
            :bizCode="archiveBizCode"
          />
        </div>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "UFilesDig",
      title: "فایلهای نقشه حفاری",
      formKey: "9DCAD301-A253-469F-BFC2-5E3EE5A64DCB",
      main: true,
      nidWorkItem: "",
      nosaziCodeInfo: null,
      loadObjRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      archiveBizCode: ""
    }
  },
  computed: {
    archiveConfig () {
      // if (!this.selectedDistrict) {
      //   // eslint-disable-next-line no-undef
      //   return window.getConfigValue("archiveCore")
      // } else {
      //   // eslint-disable-next-line no-undef
      //   const districtConfig =
      //     window.getConfigValue("archiveCore").district || {}
      //   return districtConfig[this.selectedDistrict]
      // }
      return window.getConfigValue("archiveCore")
    }
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
      // console.log(archiveStore)
    },
    loadObj () {
      this.showLoading()
      this.$services.commission77
        .getArchiveBizCodeFromNosaziCode({
          pNosaziCode: convertNosaziCodeObjectToString(this.selectedNosaziCode),
          pCI_ArchiveGroup: 1
        })
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.archiveBizCode =
              this.loadObjRes.data?.GetArchiveBizCode_FromNosaziCodeResult?.ArchiveBizCode
            this.updateArchiveBizCode(this.archiveBizCode)
            // const strNosaziCode = convertNosaziCodeObjectToString(
            //   this.baseNosaziCode
            // )
            // this.log({
            //   action: this.logActions.view,
            //   bizCode: strNosaziCode,
            //   bizCodeTitle: "کد نوسازی",
            //   nosaziCode: strNosaziCode
            // })
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
