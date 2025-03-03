<template>
  <section class="UWaitListSendToReviewer">
    <section>
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <safa-checkbox
            :class="className"
            color="primary"
            label="چاپ تصویر با تنظیمات"
            val="primary"
          ></safa-checkbox>

          <hr/>

          <safa-text label="مقیاس"/>

          <br/>

          <safa-text label="رنگ ملک"/>

          <br/>

          <safa-text label="رنگ هاشیه ملک"/>

          <br/>

          <safa-text label="رنگ زمینه"/>

          <br/>

          <safa-text label="نوع کاغذ"/>

          <br/>

          <safa-text label="جهت کاغذ"/>
        </div>

        <div class="col-6">
          <safa-label>لیست لایه ها</safa-label>
          <hr/>

          <safa-datagrid ref="grid" :data-items="items" helper="cityAndHouse" name="grid"></safa-datagrid>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  data () {
    return {
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: true,
      items: []
    }
  },
  props: {
    m: String
  },
  watch: {
    // editMode () {
    //   if (this.editMode === 'e') {
    //     this.$refs['discount-details-grid'].addRow(this.items)
    //     this.value.data.Base_Using = this.$refs['discount-details-grid'].gridItems
    //   } else if (this.editMode === 'r') {
    //     if (this.$refs['discount-details-grid'].gridItems[0].isNew &&
    //     !this.$refs['discount-details-grid'].gridItems[0].inEdit) {
    //       this.$refs['discount-details-grid'].gridItems.shift()
    //       this.items = this.$refs['discount-details-grid'].gridItems
    //     }
    //   }
    // }
  },
  mounted () {
    // if (this.editMode === 'e') {
    //   this.$refs['discount-details-grid'].addRow(this.items)
    //   this.value.data.Base_Using = this.$refs['discount-details-grid'].gridItems
    // } else if (this.editMode === 'r') {
    //   if (this.$refs['discount-details-grid'].gridItems[0].isNew &&
    //     !this.$refs['discount-details-grid'].gridItems[0].inEdit) {
    //     this.$refs['karbariha-grid'].gridItems.shift()
    //     this.items = this.$refs['karbariha-grid'].gridItems
    //   }
    // }
  },
  methods: {
    goToReadonlyMode () {
      this.isGoToEdit = false

      this.editMode = 'r'
    },
    getParcel () {
      this.loadPrequest.pNosaziCode =
        this.baseNosaziCode.District +
        '-' +
        this.baseNosaziCode.Region +
        '-' +
        this.baseNosaziCode.Block +
        '-' +
        this.baseNosaziCode.House +
        '-' +
        this.baseNosaziCode.Building +
        '-' +
        this.baseNosaziCode.Apartment +
        '-' +
        this.baseNosaziCode.Shop

      this.$q.loading.show()
      this.$services.SC.getParcel(this.loadPrequest, {
        config: {
          District: 1
        }
      })
        .then(response => {
          this.$q.loading.hide()

          this.loadResult = this.getResponse(response.data)

          // console.log('///this.loadResult', this.loadResult)
        })
        .catch(ex => {
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    }
    // saveAllDiscount () {
    //   this.$q.loading.show()
    //   this.$services.SC.saveAllDiscount(saveAllDiscountPrequest, {
    //     config: {
    //       District: 1
    //     }
    //   })
    //     .then(response => {
    //       this.$q.loading.hide()

    //       if (response.data.ErrorResult.BizErrors.length === 0) {
    //         this.showSuccess('عملیات با موفقیت انجام شد')

    //         this.goToReadonlyMode()
    //       }
    //     })
    //     .catch(ex => {
    //       this.$q.dialog({
    //         title: 'خطا در سرور',
    //         message: ex.message
    //       })
    //     })
    // }
  }
}
</script>
