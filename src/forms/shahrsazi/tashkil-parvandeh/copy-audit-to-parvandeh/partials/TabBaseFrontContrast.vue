<template>

  <safa-splitter
    v-model="splitterModel"
    horizontal
  >
    <template v-slot:before>
      <fit>
        <div class="row q-col-gutter-x-sm full-height">
          <div class="col-12 col-md-6">
            <safa-datatable
              title="فاقد وضعیت مجاز"
              helper="eFrontRevisitColumns"
              :data-items="value.data.Contrast_BuildingFront_Revisit"
            />
          </div>
          <div class="col-12 col-md-6">
            <safa-datatable
              title="مجازهای استفاده نشده"
              helper="eFrontOtherColumns"
              v-model="value.data.Contrast_BuildingFront_Other"
            />
          </div>
        </div>
      </fit>
    </template>
    <template v-slot:after>
      <fit>
        <safa-datatable
          title="مجازهای استفاده نشده"
          helper="eFrontOtherColumns"
          v-model="value.data.Contrast_BuildingFront_Other"
        />
      </fit>
    </template>
  </safa-splitter>

</template>

<script>
export default {
  name: 'TabBaseFrontContrast',
  props: {
    value: Object
  },

  data () {
    return {
      eFrontRevisit: true,
      splitterModel: 50,
      eFrontOther: true,
      eFrontCont: true
    }
  }
}
</script>
