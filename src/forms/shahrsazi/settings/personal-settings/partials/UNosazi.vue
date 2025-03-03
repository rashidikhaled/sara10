<template>
  <fit>
    <div class="row q-mb-sm">
      <!-- type="number" -->
      <!-- :rules="[val => val.toString().length <= 10 || 'Max 10 digits']" -->
      <safa-text
        v-model="value.DefaultDistrict"
        :m="m"
        class="col-md-6 col-sm-12"
        label="منطقه پیش فرض"
        label-width="90px"
        maxlength="10"
        :validations="['number']"

        />
    </div>
    <div class="row q-mb-sm">
      <safa-text
        v-model="value.DefaultRegion"
        :m="m"
        class="col-md-6 col-sm-12"
        label="ناحیه پیش فرض"
        label-width="90px"
        maxlength="10"
        :validations="['number']"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        v-model="value.ChkCalculateNosazi"
        :m="m"
        label="محاسبات نوسازی بر اساس ممیزی"
      ></safa-checkbox>
    </div>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      // PersonalSettingNosazi: {
      //   DefaultDistrict: '',
      //   DefaultRegion: '',
      //   ChkCalculateNosazi: false
      // }
      // isGoToEdit: true,
      // items: []
    }
  },
  props: {
    value: Object,
    title: String,
    formKey: String,
    name: String,
    m: String,
    isEditable: Boolean
  },

  watch: {
    isEditable () {
      if (!this.isEditable) {
        // this.$emit('SavePersonalSettingNosazi', this.PersonalSettingNosazi)
      }
    }

    // methods: {
    // goToReadonlyMode () {
    //   this.isGoToEdit = false
    //   this.editMode = 'r'
    // }
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
    //     .then(async response => {
    //       this.$q.loading.hide()

    //       this.loadResult = this.getResponse(response.data)
    //       const NosaziCode = this.convertNosaziCodeObjectToString(
    //         this.baseNosaziCode
    //       )
    //       await this.log({
    //         action: this.logActions.view,
    //         bizCode: NosaziCode,
    //         bizCodeTitle: 'NosaziCode'
    //       })
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
}
</script>
