<template>
  <section class="ScanPictureChanges">
    <h6 class="form-title"><span>تغییرات اسکن تصاویر</span></h6>
    <div class="row">
        <safa-datatable :data-items="items" cdcName="items" :columns="columns" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'scan-picture-changes'

}
</script>
