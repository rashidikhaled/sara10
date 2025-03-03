<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">طرح و کاربری مصوب :</div>
        <safa-datagrid
          v-model="value.Base_PlanMosavab"
          :m="m"
          class="col-12"
          helper="basePlanMosavab"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">طرح و کاربری مجاز :</div>
        <safa-datagrid
          v-model="value.Base_PlanMojaz"
          :m="m"
          class="col-12"
          helper="basePlanMojaz"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">ضمائم :</div>
        <safa-datagrid
          v-model="value.Base_Attachment"
          :m="m"
          class="col-12"
          helper="baseAttachment"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">توضیحات پرونده عرصه :</div>
        <text-template
          v-model="value.Base_CommonEstate.Comments"
          :m="m"
          class="col-12"
          identifier="dcd0de7f-d8e9-460f-999d-369603cd6db3"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabPlans',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
