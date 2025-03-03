<template>
  <div>
    <div class="row q-mb-sm">
      <safa-combo
        v-model="RevokeModel.revokeReasons"
        ciName="CI_InsuranceRevokeReason"
        class="col-12"
        domainName="Analysis"
        label="علت ابطال"
        label-width="80px"
      />
    </div>

    <text-template
      v-model="RevokeModel.Description"
      :rows="3"
      class="col-12"
      formKey="519C4D95-D280-43AD-D42E-06CBD72DC80C"
      label="توضیحات"
      label-width="80px"
    />
  </div>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      // revokeReasonsOptions: [
      //   {
      //     ID: 1,
      //     Title: "اشتباه کاربر",
      //   },
      //   {
      //     ID: 2,
      //     Title: "لغو درخواست",
      //   },
      // ],
      revokeReasons: null,
      RevokeReason: ''
    }
  },
  props: {
    title: String,
    formKey: String,
    name: String,
    RevokeModel: Object
  },
  methods: {}
}
</script>
