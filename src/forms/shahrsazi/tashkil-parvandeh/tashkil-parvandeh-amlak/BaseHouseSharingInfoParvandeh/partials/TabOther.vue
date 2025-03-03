<template>
  <fit>
    <safa-datatable
      title="مجاورین"
      helper="baseNeighbor"
      :m="m"
      v-model="value.Base_Neighbor"
      height="200px"
      class="q-mb-sm"
    />
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.gt.md? '200px' : '800px'"
    >
      <template v-slot:before>
        <div class="fit">
          <div class="row q-col-gutter-x-sm full-height">
            <div
              class="col-12 col-md-6 q-mb-sm q-mb-md-none"
            >
              <fit>
                <safa-datatable
                  title="فضای سبز"
                  helper="baseGreenSpace"
                  :m="m"
                  v-model="value.Base_GreenSpace"
                />
              </fit>
            </div>
            <div
              class="col-12 col-md-6 q-mb-sm q-mb-md-none"
            >
              <fit>
                <safa-datatable
                  title="عقب نشینی ها"
                  helper="baseScuttle"
                  :m="m"
                  v-model="value.Base_Scuttle"
                />
              </fit>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <div class="fit">
          <div class="row q-col-gutter-x-sm full-height">
            <div
              class="col-12 col-md-6 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  title="مشخصات درها"
                  helper="baseDoor"
                  :m="m"
                  v-model="value.Base_Door"
                />

              </fit>
            </div>
            <div
              class="col-12 col-md-6 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  title="مشخصات دیوارها"
                  helper="baseWall"
                  :m="m"
                  v-model="value.Base_Wall"
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
      horizontalSplitter: 50,
      verticalSplitter: 50,
      splitterModel: 60
    }
  }
}
</script>
