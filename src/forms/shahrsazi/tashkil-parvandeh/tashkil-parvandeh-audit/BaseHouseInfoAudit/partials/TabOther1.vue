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
              <fit >
                <safa-datatable
                  title="عقب نشینی ها"
                  helper="baseScuttle"
                  :m="m"
                  v-model="value.Base_Scuttle"
                     class="fit"
                margin="0"
                height="100%"
                min-height="100px"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit >
                <safa-datatable
                  title="پخ ها"
                  helper="baseBezel"
                  :m="m"
                  v-model="value.Base_Bezel"
                 class="fit"
                margin="0"
                height="100%"
                min-height="100px"
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
              <fit >
                <safa-datatable
                  title="مجاورین"
                  helper="baseNeighbor"
                  :m="m"
                  v-model="value.Base_Neighbor"
                 class="fit"
                margin="0"
                height="100%"
                min-height="100px"
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
                    class="fit"
                margin="0"
                height="100%"
                min-height="100px"
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
    value: {
      type: Object,
      default: () => ({})
    },
    m: String
  },
  data () {
    return {
      horizontalSplitter: 50,
      verticalSplitter: 50
    }
  }
}
</script>
