<template>
  <section class="UWaitListSendToReviewer">
    <section padding>
      <fit>
        <safa-datatable
          :data-items="items"
          ref="grid"
          name="grid"
          helper="deeps"
          title='اطلاعات عمق'
          max-height="100%"
          height="50px"
          min-height="100%"
          fit
        />
      </fit>
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
