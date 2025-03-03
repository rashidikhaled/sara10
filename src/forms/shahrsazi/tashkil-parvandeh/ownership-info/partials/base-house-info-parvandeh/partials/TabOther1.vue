<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitterModel"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <safa-splitter
          v-model="verticalSplitterModel"
          vertical
          class="fit"
          margin="0"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                helper="baseScuttle"
                :m="m"
                v-model="value.Base_Scuttle"
                title="عقب نشینی ها"
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
      </template>
      <template v-slot:after>
        <safa-splitter
          v-model="verticalSplitterModel"
          vertical
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
                class="fit"
                margin="0"
                height="100%"
                min-height="100px"
              />
            </fit>
          </template>
          <template v-slot:after  >
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
      horizontalSplitterModel: 50,
      verticalSplitterModel: 50

    }
  }
}
</script>
