<template>

 <form-wrapper>
  <fit>
    <form-row class="q-mb-sm">
      <safa-datepicker
        v-model="value.Dta_DeadlineDate"
        :m="m"
        class="col-md-6 col-sm-6"
        display-format="dddd jDD jMMMM jYYYY"
        format="jYYYY/jMM/jDD"
        label="مهلت پرداخت"
        label-width="75px"
      />
    </form-row>
    <form-row class="q-mb-sm">
      <safa-text
        v-model="value.DayCount"
        :m="m"
        class="col-md-6 col-sm-6"
        label="تعداد روز"
        label-width="75px"
        :maxlength="10"
      />
    </form-row>
    <form-row>
      <safa-checkbox
        v-model="value.Chk_CalculateIncomeFromSettings"
        :m="m"
        label="محاسبه درآمد از تنظیمات"
      />
    </form-row>
    <form-row>
      <safa-checkbox
        v-model="value.Chk_HasDailyDeadlineType"
        :m="m"
        label="مهلت پرداخت بر اساس تعداد روز"
      />
    </form-row>
    <form-row>
      <safa-checkbox
        v-model="value.Chk_DonotShowUserpriceColum"
        :m="m"
        label="عدم نمایش ستون مبلغ کاربر"
      />
    </form-row>
    <form-row>
      <safa-checkbox
        v-model="value.Chk_MablagheSystemWithDecimal"
        :m="m"
        label="مبلغ سیستم با اعشار"
      />
    </form-row>
    <form-row>
      <safa-checkbox
        v-model="value.Chk_SeparatlyIntallment"
        :m="m"
        label="تقسیط بصورت جداگانه روی عوارض درآمد"
      />
    </form-row>
    <form-row>
      <safa-checkbox
        v-model="value.Chk_JustIncomeCalculated"
        :m="m"
        label="نمایش عوارض محاسبه شده در فرم تخفیف درآمد"
      />
    </form-row>
  </fit>
 </form-wrapper>
</template>

<script>
// import saveAllDiscountPrequest from 'src/models/saveAllDiscountPrequest'

export default {
  data () {
    return {
      karbarihaItems: [],
      pishAmadegihaItems: [],
      items: []
      // ShahrsaziSettingIncome: {
      //   Chk_CalculateIncomeFromSettings: false,
      //   Chk_HasDailyDeadlineType: false,
      //   Chk_DonotShowUserpriceColum: false,
      //   Chk_MablagheSystemWithDecimal: false,
      //   Chk_SeparatlyIntallment: false,
      //   Chk_JustIncomeCalculated: false,
      //   Dta_DeadlineDate: '',
      //   DayCount: 0
      // }
    }
  },
  props: {
    title: String,
    formKey: String,
    name: String,
    m: String,
    isEditable: Boolean,
    value: Object
  },
  // watch: {
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
  // },
  // mounted () {
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
  // },
  watch: {
    isEditable () {
      if (!this.isEditable) {
        // this.$emit('SaveShahrsaziSettingIncome', this.ShahrsaziSettingIncome)
      }
    }
  }
  // methods: {
  // getParcel () {
  //   this.loadPrequest.pNosaziCode =
  //     this.baseNosaziCode.District +
  //     '-' +
  //     this.baseNosaziCode.Region +
  //     '-' +
  //     this.baseNosaziCode.Block +
  //     '-' +
  //     this.baseNosaziCode.House +
  //     '-' +
  //     this.baseNosaziCode.Building +
  //     '-' +
  //     this.baseNosaziCode.Apartment +
  //     '-' +
  //     this.baseNosaziCode.Shop

  //   this.$q.loading.show()
  //   this.$services.SC.getParcel(this.loadPrequest, {
  //     config: {
  //       District: 1
  //     }
  //   })
  //     .then(response => {
  //       this.$q.loading.hide()

  //       this.loadResult = this.getResponse(response.data)

  //       // console.log('///this.loadResult', this.loadResult)
  //     })
  //     .catch(ex => {
  //       this.$q.dialog({
  //         title: 'خطا در سرور',
  //         // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
  //         message: ex.message
  //       })
  //     })
  // }
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
</script>
