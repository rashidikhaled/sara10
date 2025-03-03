<template>
  <section class="UJobAndNotification">
    <section padding>
      <h1 class="form-title text-h6 q-mb-lg"><span>پروانه اشتغال/صلاحیت</span></h1>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md">
          <UJobGrid :results='results' :isEditable="isEditable" :isChangeResult="isChangeResult" />

          <UQualificationGrid :results='results' :isEditable="isEditable" :isChangeResult="isChangeResult" />
          </div>
        </div>
    </section>
  </section>
</template>

<script>
// import gridMixin from '../../../../mixins/gridMixin'
// import UJobGrid from './UJobAndQualification/UJobGrid'
// import UQualificationGrid from './UJobAndQualification/UQualificationGrid'

export default {
  name: 'job-and-qualification'
}
</script>
