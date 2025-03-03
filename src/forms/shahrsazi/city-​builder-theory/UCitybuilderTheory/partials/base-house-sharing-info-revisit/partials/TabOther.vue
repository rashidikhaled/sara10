<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      :min-height="$q.screen.lt.md ? '800px' : '200px'"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <div class="fit">
          <div class="row q-col-gutter-x-sm full-height">
            <div class="col-12 col-md-4 q-mb-sm q-mb-md-none">
              <fit>
                <safa-datatable
                  v-model="value.Base_GreenSpace"
                  cdcName="Base_GreenSpace"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseGreenSpace"
                  max-height="100%"
                  title="فضای سبز"
                />
              </fit>
            </div>
            <div class="col-12 col-md-4 q-mb-sm q-mb-md-none">
              <fit>
                <safa-datatable
                  v-model="value.Base_Scuttle"
                  cdcName="Base_Scuttle"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseScuttle"
                  max-height="100%"
                  title="عقب نشینی ها"
                />
              </fit>
            </div>
            <div class="col-12 col-md-4 q-mb-sm q-mb-md-none">
              <fit>
                <safa-datatable
                  v-model="value.Base_Neighbor"
                  cdcName="Base_Neighbor"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseNeighbor"
                  max-height="100%"
                  title="مجاورین "
                />
              </fit>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <div class="fit">
          <div class="row q-col-gutter-x-sm full-height">
            <div class="col-12 col-md-6 q-mb-sm q-mb-md-none">
              <fit>
                <safa-datatable
                  v-model="value.Base_Door"
                  cdcName="Base_Door"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseDoor"
                  max-height="100%"
                  title="مشخصات درها "
                />
              </fit>
            </div>
            <div class="col-12 col-md-6 q-mb-sm q-mb-md-none">
              <fit>
                <safa-datatable
                  v-model="value.Base_Wall"
                  cdcName="Base_Wall"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseWall"
                  max-height="100%"
                  title="مشخصات دیوارها "
                />
              </fit>
            </div>
          </div>
        </div>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabOther',

  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    m: String
  },
  data () {
    return {
      horizontalSplitter: 50
    }
  }
}
</script>
