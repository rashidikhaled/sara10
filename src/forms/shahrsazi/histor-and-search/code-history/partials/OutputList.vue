<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          v-model="filterOutputNo"
          cdcName="filterOutputNo"
          label="شماره گواهی"
          label-width="70px"
          @keypress.enter="$emit('getOutputList')"
        >
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              color="primary"
              name="search"
              size="xs"
              style="position: relative; right: 5px"
              @click="$emit('getOutputList')"
            />
          </template>
        </safa-text>
      </FormControl>
    </FormRow>
    <safa-grid
      title="لیست گواهی ها"
      helper="outputList"
      v-model="value.OutputList"
      cdcName="outputList"
      height="100%"
      max-height="100%"
      min-height="200px"
      m="r"
      fit
      paginate
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      name: 'OutputList',
      filterOutputNo: ''
    }
  }
}
</script>
