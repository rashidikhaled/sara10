<template>
  <safa-form :id="formKey" :caption="title" appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE">
    <form-wrapper :title="title" vertical>
        <template #header>
          <safa-status :result="result" />
        </template>
        <div class="q-mb-sm">

          <OfficeInfoBox
            v-model="identityCode"
            label-width="80px"
            @fetched="loadData"
          />

        </div>

    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "عضویت در دفتر",
      formKey: "4b9b76dd-4b9d-42f2-b72d-72b3b23ffd30",
      name: "Umembership",
      main: true,
      isShowModal: false

    }
  } }

</script>
<style></style>
