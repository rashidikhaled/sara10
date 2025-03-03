<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-combo
        label="کد نوسازی"
        sourceType="local"
        :options="nosaziCode"
        v-model="code"
      class="col-md-3"
      >
      </safa-combo>
    </div>
    <safa-datatable
      helper="nosaziComment"
      v-model="commentResults"
      title="توضیحات"
      height="100%"
      min-height="100px"
      max-height="100%"
    />
    <template>
      <div class="q-gutter-sm q-mt-sm">
        <btn-new class="btn-new"></btn-new>
      </div>
    </template>
  </fit>
</template>
<script>
export default {
  props: {
    commentResults: Object
  }
}
</script>
