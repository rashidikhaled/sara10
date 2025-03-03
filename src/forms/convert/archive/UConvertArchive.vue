<template>
  <safa-form
    :id="formKey"
    appId="1887A97D-54FA-4B00-9C89-47127AC6FC99"
    caption="کانورت"
  >
    <form-wrapper :title="title">
      <fit>
        <FormRow :lg="2" :md="2" :sm="2" :xs="2" class="q-mb-sm">
          <FormControl>
            <safa-text
              v-model="RequestCode"
              cdcName="RequestCode"
              label="کد درخواست"
              label-width="100px"
              m="r"
            />
          </FormControl>
        </FormRow>
        <ArchiveWrap
          v-if="showArchive"
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "آرشیو",
      formKey: "8f143551-8a17-45f6-853f-8e6af87f352e",
      name: "UConvertArchive",
      main: true,
      showArchive: false,
      RequestCode: "",
      archiveBizCode: ""
    }
  },

  computed: {
    archiveConfig () {
      return window.getConfigValue("archiveCore")
    }
  },

  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-trailing-spaces, no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    }
  },
  async mounted () {
    if (this.selectedRequest) {
      this.RequestCode = this.selectedRequest.NidWorkItem
      this.showArchive = true
      await this.log({
        action: this.logActions.view,
        bizCode: "",
        bizCodeTitle: "",
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `نمایش آرشیو کانورت برای درخواست ${this.selectedRequest.NidWorkItem} انجام شد`
      })
      this.updateArchiveBizCode(this.selectedRequest.BizCode)
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
  }
}
</script>
