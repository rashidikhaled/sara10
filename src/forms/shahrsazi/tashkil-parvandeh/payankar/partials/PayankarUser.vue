<template>
  <diV class="full-height">
    <safa-splitter
      v-model="gridsplitter"
      class="fit"
      horizontal
      margin="0"
      :min-height="$q.screen.lt.md ? '300px' :'420px'"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            class="fit"
            v-model="value.Base_Using"
            ref="grid2"
            helper="payankarUser"
            title="کاربری ها"
            height="100%"
            max-height="100%"
            :bordered="false"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            class="fit"
            v-model="value.Base_Front"
            ref="grid2"
            helper="payankarPishamadegi"
            title="پیش آمدگی ها "
            height="100%"
            max-height="100%"
            :bordered="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </diV>
</template>
<script>
export default {
  data: function () {
    return {
      gridsplitter: 50
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
