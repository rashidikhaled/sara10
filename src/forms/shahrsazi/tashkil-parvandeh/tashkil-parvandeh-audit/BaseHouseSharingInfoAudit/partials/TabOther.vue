<template>
  <fit>
    <div class="row q-col-gutter-x-md">
      <safa-datatable
        title="فضای سبز"
        helper="baseGreenSpace"
        :m="m"
        v-model="value.Base_GreenSpace"
        class="col-12 col-md-6"
        height="150px"
      />
      <safa-datatable
        title="عقب نشینی ها"
        helper="baseScuttle"
        :m="m"
        v-model="value.Base_Scuttle"
        class="col-12 col-md-6"
       height="150px"
      />
    </div>

    <div class="q-my-sm">
      <div class="row q-col-gutter-x-md">

        <safa-datatable
          title="مشخصات درها"
          helper="baseDoor"
          :m="m"
          v-model="value.Base_Door"
           height="150px"
          class="col-12 col-md-6"
        />
        <safa-datatable
          title="مشخصات دیوارها"
          helper="baseWall"
          :m="m"
          v-model="value.Base_Wall"
          class="col-12 col-md-6"
         height="150px"
        />
      </div>
    </div>
    <fit>
      <safa-datatable
        title="مجاورین"
        helper="baseNeighbor"
        :m="m"
        v-model="value.Base_Neighbor"
        fit
        height="100%"
        max-height="100%"
        min-height="150px"
      />
    </fit>

  </fit>
</template>

<script>
export default {
  name: 'TabOther',

  props: {
    m: String,
    value: Object
  }
}
</script>
