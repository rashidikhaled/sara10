<template>
  <fit>

    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            vertical
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="عقب نشینی ها"
                  class="col-sm-12 col-md-6"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  helper="baseScuttle"
                  :m="m"
                  v-model="value.Base_Scuttle"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit >
                <safa-datatable
                  title="پخ ها"
                  class="col-sm-12 col-md-6"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  helper="baseBezel"
                  :m="m"
                  v-model="value.Base_Bezel"
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
            vertical
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="مجاورین"
                  class="col-sm-12 col-md-6"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  helper="baseNeighbor"
                  :m="m"
                  v-model="value.Base_Neighbor"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="فضای سبز"
                  class="col-sm-12 col-md-6"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  helper="baseGreenSpace"
                  :m="m"
                  v-model="value.Base_GreenSpace"
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
