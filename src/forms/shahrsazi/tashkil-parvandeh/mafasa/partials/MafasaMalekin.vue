<template>
  <fit>
    <safa-datatable
      v-model="results.Base_Owner"
      ref="grid2"
      helper="mafasaMalekin"
      title="مالکین"
      height="180px"
      max-height="180px"
      class="q-mb-xs"
    />
    <q-separator />
    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      horizontal
      margin="0"
      :min-height="$q.screen.lt.md ? '300px' : '150px'"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            fit
            height="100%"
            max-height="100%"
            v-model="results.Base_RegisterPlack"
            ref="grid2"
            helper="mafasaPelak"
            title="پلاک ثبتی"
            :bordered="false"
          />
          <q-separator />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-datatable
            fit
            height="100%"
            max-height="100%"
            v-model="results.Base_Installation"
            ref="grid2"
            helper="mafasaTasisat"
            title="تأسیسات"
            :bordered="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  data: function () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
