<template>
  <section class="ScanPictureChanges">
    <h6 class="form-title"><span>تغییرات اسکن تصاویر</span></h6>
    <div class="row">
        <safa-datatable :data-items="items" :columns="columns" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'scan-picture-changes'
  // data: function () {
  //   return {
  //     items: [],
  //     columns: [
  //       { field: 'IdentityCode', title: 'نمونه عکس' },
  //       { field: 'EngineerType', title: 'نمونه امضا' },
  //       { field: 'EngName', title: 'آخرین مدرک تحصیلی' },
  //       { field: 'EngFamily', title: 'شناسنامه' },
  //       { field: 'CreatedDate', title: 'کارت ملی' },
  //       { field: 'BirthPlace', title: 'نمونه مهر' },
  //       { field: 'IdExportPlace', title: 'پروانه اشتغال' },
  //       { field: 'IdNo', title: 'تاریخ تغییر' },
  //       { field: 'IdNo', title: 'ساعت تغییر' }
  //     ]
  //   }
  // },
  // components: {},
  // computed: {
  //   mode: function () {
  //     return this.formEditable ? 'e' : 'r'
  //   }
  // }
}
</script>
