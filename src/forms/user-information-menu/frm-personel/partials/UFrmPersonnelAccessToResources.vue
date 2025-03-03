<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-combo label="منابع اصلی" sourceType="local" label-width="80px" />
      </FormControl>
      <FormControl>
        <safa-combo
          label="منابع زیرمجموعه"
          sourceType="local"
          label-width="80px"
        />
      </FormControl>
    </FormRow>
    <safa-datatable
      :columns="accessToResourcesColumns"
      height="100%"
      max-height="100%"
      min-height="100%"
      paginate
      :perPage="[10, 20, 30, 50]"
      fit
      serve-side
      class="q-mt-sm"
    />
    <!--
      @row-click="rowClick"
      @dbclick="showDetail"
     -->
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
      name: "UFrmPersonnelAccessToResources",
      accessToResourcesColumns: [
        {
          field: "",
          title: "منبع اصلی",
          width: "100px"
        },
        {
          field: "",
          title: "نام منبع",
          width: "auto"
        }
      ]
    }
  }
}
</script>

<style></style>
