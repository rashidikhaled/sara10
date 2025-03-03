<template>
  <fit>
    <safa-splitter v-model="gridSplitterTop" horizontal>
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="eUsingRevisitColumns"
            v-model="value.Contrast_BuildingUsing_Revisit"
            cdcName="Contrast_BuildingUsing_Revisit"
            title="فاقد وضعیت مجاز"
            class="fit"
            height="100%"
            max-height="100%"
            :min-height="$q.screen.lt.md ? '200px' : '155px'"
            margin="0"
            :bordered="false"
        /></fit>
      </template>
      <template v-slot:after>
        <fit>
          <!-- <q-separator /> -->
          <safa-splitter
            v-model="gridSplitter"
            class="fit q-mt-sm"
            horizontal
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  helper="eUsingOtherColumns"
                  v-model="value.Contrast_BuildingUsing_Other"
                  cdcName="Contrast_BuildingUsing_Other"
                  title="مجازهای استفاده نشده"
                  class="fit"
                  margin="0"
                  height="100%"
                  max-height="100%"
                  :bordered="false"
                  :min-height="$q.screen.lt.md ? '100px' : '150px'"
                />
                <!-- <q-separator /> -->
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <q-separator />
                <safa-datatable
                  helper="eUsingContColumns"
                  v-model="value.Contrast_BuildingUsing_Contrast"
                  cdcName="Contrast_BuildingUsing_Contrast"
                  title="مغایرت"
                  class="fit"
                  margin="0"
                  height="100%"
                  :bordered="false"
                  max-height="100%"
                  :min-height="$q.screen.lt.md ? '100px' : '150px'"
                />
              </fit>
            </template> </safa-splitter
        ></fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabBaseUsingContrast",
  props: {
    value: Object
  },

  data () {
    return {
      gridSplitter: 50,
      gridSplitterTop: 50,
      eUsingRevisit: true,
      eUsingOther: true,
      eUsingCont: true
    }
  }
}
</script>
