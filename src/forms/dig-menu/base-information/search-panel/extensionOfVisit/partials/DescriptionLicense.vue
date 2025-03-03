<template>
  <fit>
    <FormControl>
      <text-template
        v-model="description"
        cdcName="Description"
        label="توضیحات تمدید مجوز"
        label-width="120px"
        class="col-12"
        :rows="20"
        m="r"
      />
    </FormControl>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    rowSelectData: Object
  },
  data () {
    return {
      description: this.value?.RevisitRenewal_Request?.Request_Info?.Description || ""
    }
  },
  methods: {},
  mounted () {}
}
</script>
