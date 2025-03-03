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
                  title="درها"
                  helper="baseDoor"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  :m="m"
                  v-model="value.Base_Door"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="دیوارها"
                  helper="baseWall"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  :m="m"
                  v-model="value.Base_Wall"
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
                  title="پخ ها"
                  helper="baseBezel"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  :m="m"
                  v-model="value.Base_Bezel"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="دهانه"
                  helper="baseGap"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  :m="m"
                  v-model="value.Base_Gap"
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
  name: 'TabOther',

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
