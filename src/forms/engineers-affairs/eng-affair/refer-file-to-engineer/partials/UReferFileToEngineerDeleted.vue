<template>
  <form-wrapper>
    <div>
      <div class="row q-col-gutter-sm">
        <safa-text
          m="e"
          v-model="model.releaseLetterNo"
          label="شماره نامه"
          label-width="60px"
          class="col-12"
          cdcName="releaseLetterNo"
        />
        <safa-datepicker
          m="e"
          v-model="model.releaseLetterDate"
          label="تاریخ نامه"
          label-width="60px"
          class="col-12"
          cdcName="releaseLetterDate"
        />
        <safa-checkbox
          label=" با صلاح دید مدیریت"
          v-model="model.isWithManagerConfirm"
          class="col-12"
          cdcName="isWithManagerConfirm"
        />
      </div>
      <text-template
       v-model="model.comment"
       cdcName="comment"
       formKey="c2917194-1969-4ec8-8caa-1a9ac3df18d6"
       class="q-mt-sm"
        />
    </div>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-save label="تایید" @click="confirmDelete" />
        <btn-cancel @click="cancelDelete" />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
export default {
  data () {
    return {
      name: 'UReferFileToEngineerDeleted',
      model: {
        releaseLetterNo: "",
        releaseLetterDate: "",
        isWithManagerConfirm: false,
        comment: null
      }
    }
  },
  methods: {
    confirmDelete () {
      this.$emit("confirmDelete", this.model)
    },

    cancelDelete () {
      this.$emit("hide")
    }
  }
}
</script>
