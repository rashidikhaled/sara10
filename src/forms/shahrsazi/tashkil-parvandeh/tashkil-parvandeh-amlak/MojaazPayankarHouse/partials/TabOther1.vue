<template>
  <fit>

    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '800px' : '200px'"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            :horizontal="$q.screen.lt.lg"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="عقب نشینی ها"
                  helper="baseScuttle"
                  :m="m"
                  v-model="value.Base_Scuttle"
                  :addRow="true"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="پخ ها"
                  helper="baseBezel"
                  :m="m"
                  v-model="value.Base_Bezel"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            :horizontal="$q.screen.lt.lg"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="مجاورین"
                  helper="baseNeighbor"
                  :m="m"
                  v-model="value.Base_Neighbor"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="فضای سبز"
                  helper="baseGreenSpace"
                  :m="m"
                  v-model="value.Base_GreenSpace"
                  fit
                  height="100%"
                  max-height="100%"
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
      verticalSplitter: 50
    }
  }
}
</script>
