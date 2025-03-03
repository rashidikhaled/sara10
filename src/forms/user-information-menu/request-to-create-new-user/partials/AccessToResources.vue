<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="منابع اصلی"
          sourceType="local"
          label-width="80px"
          :m="m"
          cdcName=""
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="منابع زیرمجموعه"
          sourceType="local"
          label-width="80px"
          :m="m"
          cdcName=""
        />
      </FormControl>
    </FormRow>
    <safa-grid
      :columns="accessToResourcesColumns"
      height="100%"
      max-height="100%"
      min-height="100%"
      :show-selected-checkbox="false"
      :allowMultipleSelection="false"
      :suppressRowClickSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
      fit
      :m="m"
      cdcName=""
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "AccessToResources",
      accessToResourcesColumns: [
        {
          field: "ParentName",
          title: "منبع اصلی",
          width: "100px"
        },
        {
          field: "Name",
          title: "نام منبع",
          width: "auto"
        }
      ]
    }
  }
}
</script>
