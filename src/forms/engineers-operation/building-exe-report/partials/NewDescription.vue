<template>
  <fit>
    <text-template
      v-model="newComment"
      cdcName="newComment"
      formKey="9e663d80-4a63-4fee-9502-c1ef56510d1c"
      m="e"
      label="توضیحات جدید"
    />
    <q-separator class="q-mb-sm"/>
    <div class="q-gutter-sm">
      <btn-save label="ثبت توضیحات جدید" @click="submition" />
    </div>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      newComment: ""
    }
  },
  methods: {
    submition () {
      this.$emit("submition", this.newComment)
    }
  }
}
</script>
