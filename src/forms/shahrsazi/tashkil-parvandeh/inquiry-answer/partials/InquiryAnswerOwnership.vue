<template>
  <!-- <div> -->
    <!--   <div class="row q-mt-sm q-mb-sm"> -->
    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title=" مالکین"
            v-model="results.Base_Owner"
            ref="grid2"
            helper="inquiryAnswerBaseOwner"
            height="100%"
            max-height="100%"
            fit
          ></safa-datatable>
          <q-separator />
        </fit>
      </template>
      <!-- </div> -->
      <!-- <div class="row"> -->
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-grid
            title="جهات اربعه"
            v-model="results.Base_Edge"
            ref="grid2"
            helper="baseEdge"
            height="100%"
            max-height="100%"
            fit
          />
        </fit>
      </template>
      <!-- </div> -->
    </safa-splitter>
  <!-- </div> -->
</template>
<script>
export default {
  data: function () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    results: Object
  }
}
</script>
