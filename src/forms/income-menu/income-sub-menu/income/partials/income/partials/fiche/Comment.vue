<template>
  <div>
    <safa-status :result="result"></safa-status>
    <safa-text
      label="شماره فیش"
      v-model="selectedRow.FicheNo"
      cdcName="FicheNo"
      m="r"
      label-width="70px"
    />
    <text-template
      label="توضیحات"
      class="q-my-md"
      formKey="ee4724cf-b8a6-402d-86e4-b9b7e7989725"
      label-width="70px"
      v-model="selectedRow.Comments"
      cdcName="Comments"
      type="textarea"
    />

    <div class="row q-gutter-md">
      <btn-save label="تأیید" @click="confirmComment" />
      <btn-cancel label="انصراف" @click="cancel" />
    </div>
  </div>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      result: null
    }
  },
  props: {
    config: Object,
    selectedRow: Object,
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
    }
  },
  methods: {
    confirmComment () {
      this.showLoading()
      this.$services.SD.updateIncomeFicheComments(
        {
          pNidFiche: this.selectedRow.NidFiche,
          pComments: this.selectedRow.Comments
        },
        this.config
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("توضیحات فیش با موفقیت ویرایش شد.")
            await this.log({
              action: this.logActions.update,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `توضیحات فیش با شماره ${this.selectedRow.FicheNo} ویرایش شد.`
            })
            this.cancel()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    cancel () {
      this.$emit("backToFicheTab")
    }
  }
}
</script>
