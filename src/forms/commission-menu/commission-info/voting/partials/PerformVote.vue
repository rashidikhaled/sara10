<template>
  <form-wrapper title="اصلاح رای">
    <fit>
      <FormRow :sm="2" :md="2" :lg="2">
        <FormControl>
          <safa-text
            v-model="TxtNamehNo"
            cdcName="NamehNo"
            label="شماره نامه"
            label-width="75px"
            width="100px"
            required
            validations="required"
          />
        </FormControl>

        <FormControl>
          <safa-text
            v-model="TxtVoteNo"
            cdcName="VoteNo"
            label="شماره رای"
            label-width="75px"
            width="100px"
            required
            validations="required"
          />
        </FormControl>
      </FormRow>
    </fit>

    <template v-slot:footer>
      <form-actions :m="mode" :showEditButton="false">
        <btn-save label="تایید" @click="onPerformVote" />
        <btn-cancel label="انصراف" @click="hide" />
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      TxtNamehNo: null,
      TxtVoteNo: null
    }
  },

  methods: {
    onPerformVote () {
      if (!this.isValidForm()) return

      this.$emit("onPerformVote", {
        TxtNamehNo: this.TxtNamehNo,
        TxtVoteNo: this.TxtVoteNo
      })
    },

    hide () {
      this.$emit("hide")
    }
  }
}
</script>
