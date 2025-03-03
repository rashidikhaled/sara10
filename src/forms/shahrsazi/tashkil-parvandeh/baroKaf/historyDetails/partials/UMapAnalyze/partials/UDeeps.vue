<template>
  <section class="UWaitListSendToReviewer">
    <section padding>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <safa-datatable
            :data-items="items"
      cdcName="items"
            ref="grid"
            name="grid"
            helper="deeps"
             title='اطلاعات عمق'
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
      items: []
    }
  }
}
</script>
