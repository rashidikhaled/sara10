<template>
  <form-wrapper vertical>
    <safa-status :result="result"/>

    <div class="row q-col-gutter-y-sm">
      <safa-text
        v-model="newTitle"
        cdcName="composedName"
        label="نام ترکیبی"
      />
    </div>
    <template #footer>
      <btn-save class="q-mr-sm" label="تایید" @click="accept"/>
      <btn-cancel label="انصراف" @click="cancel"/>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'

export default {
  mixins: [baseFormMixin, loaderMixin, messageMixin],
  data: function () {
    return {
      newTitle: '',
      result: {}
    }
  },
  props: {
    selectedPrice: Object,
    selectDist: Number
  },
  methods: {
    accept () {
      this.showLoading()
      let data = {
        pCITableName: this.selectedPrice.CITableName,
        pTableTitle: this.newTitle
      }
      this.$services.SB.renameTableTitle(data, {
        config: { District: this.selectDist }
      })
        .then(({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.$emit('reload')
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.$emit('reload')
    }
  }
}
</script>
