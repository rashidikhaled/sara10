<template>
<section>
  <div class="row q-col-gutter-lg">
  <div class="col-12">
    <safa-text
      label="آدرس"
      m="r"
    />
  </div>

  <div class="col-12 col-sm-4 col-md-3">
    <safa-text
      label="پلاک آبی"
      m="r"
    />
  </div>

  <div class="col-12 col-sm-4 col-md-3">
    <safa-custom-text
      label="مساحت وضع موجود"
      m="r"
    />
  </div>

  <div class="col-12 col-sm-4 col-md-3">
    <safa-custom-text
      label="مساحت پس از رعایت بر اصلاحی"
      m="r"
    />
  </div>

  <div class="col-12 col-sm-4 col-md-3">
    <safa-text
      label="بخش ثبتی"
      m="r"
    />
  </div>

    <div class="col-4">
    <safa-datatable
      v-model="items"
      :m="mode"
      helper="parvandehAmlakPostalCode"
      title="کد پستی"
    ></safa-datatable>
    </div>

    <div class="col-4">
      <safa-datatable
        v-model="items"
        :m="mode"
        helper="parvandehAmlakShomareShenasayiParvandeh"
        title="شماره شناسایی پرونده"
      ></safa-datatable>
    </div>

    <div class="col-4">
      <safa-datatable
        v-model="items"
        :m="mode"
        helper="parvandehAmlakOldCode"
        title="کد قدیم"
      ></safa-datatable>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'UAddressTab',
  data () {
    return {
      items: []
    }
  }
}
</script>

<style scoped>

</style>
