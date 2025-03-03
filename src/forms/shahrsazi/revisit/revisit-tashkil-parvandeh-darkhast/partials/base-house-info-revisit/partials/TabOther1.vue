<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      :min-height="$q.screen.lt.md ? '800px' : '150px'"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="firstVerticalSplitter"
            :horizontal="$q.screen.lt.md"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_Scuttle"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseScuttle"
                  max-height="100%"
                  min-height="150px"
                  title="عقب نشینی ها"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.Base_Bezel"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseBezel"
                  max-height="100%"
                  min-height="150px"
                  title="پخ ها"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="secondVerticalSplitter"
            :horizontal="$q.screen.lt.md"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_Neighbor"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseNeighbor"
                  max-height="100%"
                  min-height="150px"
                  title="مجاورین "
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.Base_GreenSpace"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseGreenSpace"
                  max-height="100%"
                  min-height="150px"
                  title="فضای سبز"
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
  name: 'TabOther1',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      horizontalSplitter: 50,
      secondVerticalSplitter: 50,
      firstVerticalSplitter: 50
    }
  }
}
</script>
