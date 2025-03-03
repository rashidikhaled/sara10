<template>
  <fit>
    <safa-splitter v-model="gridSplitterTop" horizontal>
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="eFrontRevisitColumns"
            v-model="value.Contrast_BuildingFront_Revisit"
            cdcName="Contrast_BuildingFront_Revisit"
            title="فاقد وضعیت مجاز"
            class="fit"
            margin="0"
            height="100%"
            max-height="100%"
            :min-height="$q.screen.lt.md ? '100px' : '155px'"
            :bordered="false"
          />
        </fit>
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
                  helper="eFrontOtherColumns"
                  v-model="value.Contrast_BuildingFront_Other"
                  cdcName="Contrast_BuildingFront_Other"
                  title="مجازهای استفاده نشده"
                  class="fit"
                  margin="0"
                  height="100%"
                  :min-height="$q.screen.lt.md ? '100px' : '150px'"
                  :bordered="false"
                />
                <q-separator />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <q-separator />
                <safa-datatable
                  helper="eFrontContColumns"
                  v-model="value.Contrast_BuildingFront_Contrast"
                  cdcName="Contrast_BuildingFront_Contrast"
                  title="مغایرت"
                  class="fit"
                  margin="0"
                  height="100%"
                  :min-height="$q.screen.lt.md ? '100px' : '150px'"
                  :bordered="false"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabBaseFrontContrast",
  props: {
    value: Object
  },

  data () {
    return {
      gridSplitter: 50,
      gridSplitterTop: 50,
      eFrontRevisit: true,
      eFrontOther: true,
      eFrontCont: true
    }
  }
}
</script>
