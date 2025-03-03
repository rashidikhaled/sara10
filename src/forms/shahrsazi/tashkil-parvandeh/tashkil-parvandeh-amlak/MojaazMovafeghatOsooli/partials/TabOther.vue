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
                  title="درها"
                  helper="baseDoor"
                  :m="m"
                  v-model="value.Base_Door"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="دیوارها"
                  helper="baseWall"
                  :m="m"
                  v-model="value.Base_Wall"
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
                  title="دهانه"
                  helper="baseGap"
                  :m="m"
                  v-model="value.Base_Gap"
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
