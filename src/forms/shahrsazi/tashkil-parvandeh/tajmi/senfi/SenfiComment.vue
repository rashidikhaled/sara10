<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-combo
        label="کد نوسازی"
        domainName="CI_SaraM1"
        ciName="CI_ShahrsaziArchiveKind"
        class="col-md-3"
      />
    </div>
    <safa-datatable
      helper="senfiComment"
      v-model="commentResults"
      height="100%"
      min-height="100px"
      max-height="100%"
      title="توضیحات"
    />
    <template>
      <div class="q-gutter-sm q-mt-sm">
        <btn-new class="btn-new"/>
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
