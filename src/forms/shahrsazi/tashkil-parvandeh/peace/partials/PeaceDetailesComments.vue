<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-combo
        label="مرجع تأیید کاربری"
        ciName="CI_UsingConfirmRefrence"
        domainName="CI_SaraM1"
        v-model="results.Sh_Peace.CI_UsingConfirmRefrence"
        :m="mode"
        class="col-12 col-sm-4"
        label-width="95px"
      />
    </div>
    <div class="row">
      <text-template
        label="توضیحات صلحنامه"
        formKey="5de5d1e1-cfb2-47be-aa30-72e45fed1f9a"
        v-model="results.Sh_Peace.Comments"
        :m="mode"
        label-width="95px"
        class="col "
      />
    </div>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {}
  },
  props: {
    results: Object,
    mode: String
  }
}
</script>
