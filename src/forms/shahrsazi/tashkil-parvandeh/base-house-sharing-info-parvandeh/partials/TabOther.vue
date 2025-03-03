<template>
  <fit>
    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <div class="fit">
          <div class="row q-col-gutter-x-sm full-height">
            <div
              class=" col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  helper="baseGreenSpace"
                  :m="m"
                  v-model="value.Base_GreenSpace"
                  cdcName="Base_GreenSpace"
                  title="فضای سبز"
                  :selectable="false"
                  :emptyRowLimit="1"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </div>

            <div
              class=" col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  helper="baseScuttle"
                  :m="m"
                  v-model="value.Base_Scuttle"
                  cdcName="Base_Scuttle"
                  title="عقب نشینی ها"
                  :selectable="false"
                  :emptyRowLimit="1"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </div>
            <div
              class=" col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  helper="baseNeighbor"
                  :m="m"
                  v-model="value.Base_Neighbor"
                  cdcName="Base_Neighbor"
                  title="مجاورین"
                  :selectable="false"
                  :emptyRowLimit="1"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <fit>
          <div class="fit">
            <div class="row q-col-gutter-x-sm full-height">
              <div
                class=" col-md-6 col-sm-12 q-mb-sm q-mb-md-none"
                style="min-height:150px"
              >
                <fit>
                  <safa-datatable
                    helper="baseDoor"
                    :m="m"
                    v-model="value.Base_Door"
                    cdcName="Base_Door"
                    title="مشخصات درها"
                    :selectable="false"
                    :emptyRowLimit="1"
                    fit
                    height="100%"
                    max-height="100%"
                  />
                </fit>
              </div>

              <div
                class=" col-md-6 col-sm-12 q-mb-sm q-mb-md-none"
                style="min-height:150px"
              >
                <fit>
                  <safa-datatable
                    helper="baseWall"
                    :m="m"
                    v-model="value.Base_Wall"
                    cdcName="Base_Wall"
                    title="مشخصات دیوارها"
                    :selectable="false"
                    :emptyRowLimit="1"
                    fit
                    height="100%"
                    max-height="100%"
                  />
                </fit>
              </div>
            </div>
          </div>
        </fit>
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
      gridSplitter: 50
    }
  }
}
</script>
