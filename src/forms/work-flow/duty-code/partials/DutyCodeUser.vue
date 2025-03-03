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
          <safa-grid
            helper="agfoulUsing"
            fit
            min-height="150px"
            height="100%"
            max-height="100%"
            title="کاربری ها"
            :m="m"
            v-model="results.Foul_Using"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-datatable
            class="fit"
            height="100%"
            max-height="100%"
            :bordered="false"
            title=" پیش آمدگی ها"
            :m="m"
            v-model="results.Foul_Front"
            ref="grid2"
            helper="foulFront"
          ></safa-datatable>
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
    results: Object,
    m: String
  }
}
</script>
