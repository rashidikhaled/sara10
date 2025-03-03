<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getArchiveWrapperRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetched"
        />
      </template>
      <fit>
        <ArchiveWrap
          v-if="showArchive && archiveConfig && archiveConfig.username"
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
        />
        <div v-else-if="!archiveConfig" class="flex items-center full-height justify-center">
          <span class="text-grey"
            >عدم یافتن تنظیمات مرتبط با آرشیو ... ({{
              baseNosaziCode.District
            }})</span
          >
        </div>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "آرشیو",
      name: "UFireArchive",
      formKey: "09bb2a88-43a2-4aa2-be55-0c181248947a",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      // #regin services
      getArchiveWrapperRes: false,
      // #endregin

      // #regin variables
      showArchive: false,
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
      // #endregin
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
    async fetched (val) {
      if (this.baseNosaziCode.District === 0) {
        this.showArchive = false
        return this.showError("کد نوسازی وارد شده معتبر نمی باشد.")
      }
      else {
        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )
        this.updateArchiveBizCode(strNosaziCode) // طبق زمل  از همون کد نوسازی برای بیز کد استفاده می کند
        this.showArchive = true
      }
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archivefire")
    }
  }
}
</script>
