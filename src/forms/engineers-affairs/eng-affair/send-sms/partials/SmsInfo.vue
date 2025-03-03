<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="گروه پیامها"
          label-width="80px"
          ciName="CI_SMSSendGroup"
          domainName="engineer"
          v-model="value.CI_SMSSendGroup"
          cdcName="CI_SMSSendGroup"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ مراجعه"
          label-width="80px"
          v-model="value.VisitDate"
          cdcName="VisitDate"
        />
      </FormControl>
      <FormControl>
        <safa-timepicker
          label="ساعت مراجعه"
          label-width="80px"
          v-model="value.VisitTime"
          cdcName="VisitTime"
        />
      </FormControl>
      <safa-text
        label="ورود دستی متن پیامک"
        label-width="80px"
        v-model="value.smsText"
        class="col-12"
        cdcName="smsText"
      />
    </FormRow>
    <safa-datatable
      title="لیست پیامها"
      helper="messagesList"
      v-model="messageList"
      height="100%"
      max-height="100%"
      m="r"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      fit
      paginate
      :take="20"
      :pageSize="20"
      :show-selected-checkbox="true"
      :allowMultipleSelection="true"
      @selectedChange="selectedMessage"
      cdcName="messageList"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    title: String,
    formKey: String
  },
  data () {
    return {
      name: "SmsInfo",
      messageList: []
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.engineers.getCISMSSendTxt({
          pCI_SMSSendGroup: this.value.CI_SMSSendGroup
        })
        const res = this.getResponse(data)
        if (res.success) {
          this.messageList = res.data?.GetCI_SMSSendTxtResult?.CI_SMSSendTxt ?? []
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.CI_SMSSendGroup,
            bizCodeTitle: "CI_SMSSendGroup"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    selectedMessage (e) {
      let message = e.dataItem.Title
      this.$emit("selectMessage", e.selectedItems.length !== 0 ? message : "")
    }
  },

  watch: {
    "value.CI_SMSSendGroup": {
      async handler () {
        await this.loadObj()
      },
      deep: true
    }
  }
}
</script>
