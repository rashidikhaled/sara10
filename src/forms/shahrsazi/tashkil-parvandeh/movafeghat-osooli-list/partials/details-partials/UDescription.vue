<template>
  <fit>
    <div class="q-mb-sm">
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <text-template
            :m="m"
            label="توضیحات موافقت اصولی"
            :labelWidth="$q.screen.lt.md ? '170px' : 'auto'"
            formKey="1a48626e-ec01-479a-81c0-d4c408c5500b"
            v-model="value.Sh_MovafeghatOsooli.Comments"
          />
        </div>
        <div class="col-12 col-md-6">
          <text-template
            :m="m"
            label="توضیحات کنترل فنی موافقت اصولی"
            :labelWidth="$q.screen.lt.md ? '170px' : 'auto'"
            formKey="3ff09ea8-201d-4557-9f81-03b214b997e6"
            v-model="value.Sh_MovafeghatOsooli.ControlComments"
          />
        </div>
      </div>
    </div>
    <fit>
      <safa-grid
        helper="baseAttachment"
        :add-row="true"
        :allow-copy="true"
        :copy-with-count="true"
        v-model="value.Base_Attachment"
        :m="m"
        title="ضمائم"
        fit
        height="100%"
        max-height="100%"
      />
    </fit>
  </fit>
</template>
<script>
export default {
  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
