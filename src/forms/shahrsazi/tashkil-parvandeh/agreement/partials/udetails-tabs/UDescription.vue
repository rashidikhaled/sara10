<template>
  <fit>
    <div class="row">
      <safa-combo
        ciName="CI_UsingConfirmRefrence"
        domainName="CI_SaraM1"
        label="مرجع تایید کاربری"
        v-model="formModel.Sh_Agreement.CI_UsingConfirmRefrence"
        cdcName="CI_UsingConfirmRefrence"
        :m="m"
        label-width="110px"
        class="col-12 col-md-3"
      />
    </div>
    <text-template
      label="توضیحات شهرداری"
      formKey="d423bd3e-12aa-4efa-86b8-036aa2a44cfb"
      v-model="formModel.Sh_Agreement.Comments"
      cdcName="Comments"
      :m="m"
      class="fit q-my-sm"
      label-width="110px"
    />
    <text-template
      label="توضیحات ملک"
      formKey="298cfcde-f6a6-41b7-b853-d6b3e6f4bd43"
      v-model="formModel.Sh_Agreement.OwnerComments"
      cdcName="OwnerComments"
      :m="m"
      class="fit"
      margin="0"
      label-width="110px"
    />

  </fit>
</template>

<script>
export default {
  props: {
    formModel: {
      type: Object,
      default () {
        return {}
      }
    },
    m: {
      type: String,
      default: 'e'
    }
  }
}
</script>
