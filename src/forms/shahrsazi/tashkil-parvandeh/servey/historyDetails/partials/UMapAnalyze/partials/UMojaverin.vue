<template>
  <section class="UWaitListSendToReviewer">
    <section padding>
      <div class="row q-col-gutter-md">
        <div class="col-12">
            <safa-checkbox label="نمایش مجاورین"/>
        </div>

        <div class="col-12">
          <safa-datatable
            :data-items="items"
            ref="grid"
            name="grid"
            helper="mojaverin"
      title="مجاورین"
          />
        </div>
      </div>
      </section>
  </section>
</template>

<script>

export default {
  name: 'baro-kaf-info',
  title: 'اطلاعات برو کف',
  data () {
    return {
      items: [],
      isShowModal: false
    }
  },
  components: {
  },
  methods: {
  }
}
</script>
