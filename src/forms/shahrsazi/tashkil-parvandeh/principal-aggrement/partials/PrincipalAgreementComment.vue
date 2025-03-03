<template>
  <fit>
    <FormRow class="q-mb-sm">
      <text-template
        label="توضیحات "
        label-width="100px"
        v-model="value.Sh_MovafeghatOsooli.Comments"
        cdcName="Comments"
        :m="m"
        formKey="4b18a2d1-77f2-4a82-ba91-d291f57347bc"
        class="col-12"
        :rows="2"
      />
      <text-template
        label="توضیحات کنترل فنی"
        label-width="100px"
        v-model="value.Sh_MovafeghatOsooli.ControlComments"
        cdcName="ControlComments"
        :m="m"
        formKey="4b18a2d1-77f2-4a82-ba91-d291f57347bc"
        class="col-12"
        :rows="2"
      />
    </FormRow>
    <safa-grid
      title="ضمائم"
      v-model="value.Base_Attachment"
      cdcName="Base_Attachment"
      helper="principalAgreementComment"
      :m="m"
      min-height="140px"
      max-height="100%"
      height="100%"
      fit
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  }
}
</script>
