<template>
  <safa-form
    id="2c1fd63b-42ed-4af3-98da-d443f44fe837"
    caption="شهرسازی- جزئیات صلحنامه"
  >
    <fit>
      <safa-splitter
        v-model="splitterModel"
        horizontal
        class="fit"
        margin="0"
        style="min-height:150px"
      >
        <template v-slot:before>
          <fit>
            <safa-grid
              helper="peacDetalisUser"
              v-model="results.Base_Using"
              :m="m"
              title="کاربری ها"
              fit
              max-height="100%"
              height="100%"
              min-height="100px"
            />
            <q-separator />

          </fit>
        </template>
        <template v-slot:after>
          <fit>

            <!-- <fit> -->
            <safa-datatable2
              helper="peacDetalisPishamadegi"
              class="col-12"
              v-model="results.Base_Front"
              :m="m"
              title="پیش آمدگی ها وسایر کاربری های خاص"
              fit
              max-height="100%"
              height="100%"
              minHeight="100%"
            /> <!-- تاریخ قابل ویرایش نیست -->
            <!-- </fit> -->
          </fit>
        </template>
      </safa-splitter>
    </fit>
  </safa-form>
</template>
<script>
export default {
  data: function () {
    return {
      splitterModel: 50
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
