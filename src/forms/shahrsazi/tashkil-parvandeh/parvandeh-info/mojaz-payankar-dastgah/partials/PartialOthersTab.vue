<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      fit
      horizontal
      style="min-height:200px"
    >
      <template #before>
        <div class="fit">
          <div class="row q-col-gutter-x-sm full-height">
            <div
              class="col-12 col-md-4 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  helper="baseGreenSpace"
                  title="فضای سبز"
                  :m="m"
                  fit
                  height="100%"
                  max-height="100%"
                  v-model="value.Base_GreenSpace"
                />
              </fit>
            </div>
            <div
              class="col-12 col-md-4 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  helper="baseScuttleMojazPayankarDastgah"
                  :m="m"
                  title="عقب نشینی ها"
                  fit
                  height="100%"
                  max-height="100%"
                  v-model="value.Base_Scuttle"
                />

              </fit>
            </div>
            <div
              class="col-12 col-md-4 q-mb-sm q-mb-md-none"
              style="min-height:150px"
            >
              <fit>
                <safa-datatable
                  helper="baseNeighborMojazPayankarDastgah"
                  title="مجاورین"
                  :m="m"
                  fit
                  height="100%"
                  max-height="100%"
                  v-model="value.Base_Neighbor"
                />
              </fit>
            </div>
          </div>
        </div>
      </template>
      <template #after>
        <safa-splitter
          v-model="splitterValue"
          fit
          vertical
        >
          <template #before>
            <fit>
              <safa-datatable
                helper="principalAgreementDoor"
                title="مشخصات درها"
                :m="m"
                fit
                height="100%"
                max-height="100%"
                v-model="value.Base_Door"
              />
            </fit>
          </template>
          <template #after>
            <fit>
              <safa-datatable
                helper="principalAgreementWall"
                title="مشخصات دیوارها"
                :m="m"
                fit
                height="100%"
                max-height="100%"
                v-model="value.Base_Wall"
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
  name: 'PartialOthersTab',
  data () {
    return {
      splitterValue: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
