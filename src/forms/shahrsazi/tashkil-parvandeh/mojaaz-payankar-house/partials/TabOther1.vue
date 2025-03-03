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
                  helper="baseScuttle"
                  :m="m"
                  v-model="value.Base_Scuttle"
                  :addRow="true"
                  fit
                  height="100%"
                  max-height="100%"
                  paginate

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
                  paginate
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
                  helper="baseNeighbor"
                  :m="m"
                  v-model="value.Base_Neighbor"
                  fit
                  height="100%"
                  max-height="100%"
                  paginate
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
                  paginate
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>
 <safa-splitter
        v-model="verticalSplitter"
        horizontal
        margin="0"
        class="fit"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              helper="baseDoor"
              title="مشخصات درها"
              :m="m"
              v-model="value.Base_Door"
              fit
              height="100%"
              max-height="100%"
              min-height="200px"
              class="q-mt-sm"
              paginate
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-datatable
              helper="baseWall"
              title="مشخصات دیوارها"
              :m="m"
              v-model="value.Base_Wall"
              fit
              height="100%"
              max-height="100%"
              min-height="200px"
              paginate
            />
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
