<template>
  <FormWrapper :padding="false">
    <template #header>
      <safa-status :result="sendObjRes" />
    </template>
    <fit>
      <text-template
        v-model="Comment"
        cdcName="Comment"
        type="textarea"
        height="100%"
      />
    </fit>
    <template #footer>
      <div class="q-gutter-sm">
        <btn-default label="ارسال" @click="sendObj" />
      </div>
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    selectedItem: {
      type: Object,
      default: () => {},
      required: true
    }
  },

  data () {
    return {
      // #services
      sendObjRes: null,

      // #variables
      Comment: ""
    }
  },

  methods: {
    sendObj () {
      this.showLoading()
      this.$services.engineers
        .addToPoliceSakhteman({
          pNidProc: this.selectedItem.data.NidProc,
          pDistrict: this.selectedItem.data.District,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          pDescription: this.Comment
        })
        .then(async ({ data }) => {
          this.sendObjRes = this.getResponse(data)
          if (this.sendObjRes.success) {
            this.showSuccess("درخواست با موفقیت انجام شد")
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedItem.data.NidProc,
              bizCodeTitle: "NidProc"
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
