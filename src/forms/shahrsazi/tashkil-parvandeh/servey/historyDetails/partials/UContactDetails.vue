<template>
  <section class="UContactDetails">
    <section padding>
  <h1 class="form-title text-h6 q-mb-lg"><span>مشخصات تماس</span></h1>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-4">
        <safa-text :m="mode" label="آدرس پست الکترونیکی" v-model="results.pRequest.ClsEngineer.Eng_Info.Email"></safa-text>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <safa-text :m="mode" label="تلفن منزل" v-model="results.pRequest.ClsEngineer.Eng_Info.Tel"></safa-text>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <safa-text :m="mode" label="تلفن همراه" v-model="results.pRequest.ClsEngineer.Eng_Info.MobileNo"></safa-text>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <safa-text :m="mode" label="کد پستی" v-model="results.pRequest.ClsEngineer.Eng_Info.PostalCode"></safa-text>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <safa-combo
          dense="true"
          outlined
          use-input
          :m="mode"
          input-debounce="0"
          :options="jobPlaceRegionDataSource"
          label="منطقه شهرداری محل کار"
          :option-value="item => (item === null ? null : item.id || item.Id)"
          :option-label="
            item => (item === null ? null : item.title || item.Title)
          "
          v-model="results.pRequest.ClsEngineer.Eng_Info.CI_Region"
        ></safa-combo>

      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <safa-text :m="mode" label="کد پستی محل کار" v-model="results.pRequest.ClsEngineer.Eng_Info.PostalCodeWork"></safa-text>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <safa-text :m="mode" label="شماره حساب" v-model="results.pRequest.ClsEngineer.Eng_Info.AccCode"></safa-text>
      </div>
      </div>

<div class="row q-col-gutter-md">
    <div class="col-12">
      <safa-text :m="mode" label="آدرس محل سکونت" type="textarea" v-model="results.pRequest.ClsEngineer.Eng_Info.Address"></safa-text>

<!--      <q-btn-->
<!--        :m="mode"-->
<!--        label="..."-->
<!--        color="secondary"-->
<!--        @click="showNezamMohandesi = true"-->
<!--        :disable="isElementDisabled"-->
<!--      ></q-btn>-->
    </div>
</div>

<div class="row q-col-gutter-md">
      <div class="col-12">
        <safa-text :m="mode" label="آدرس دفتر" type="textarea" v-model="results.pRequest.ClsEngineer.Eng_Info.AddressWork"></safa-text>

<!--        <q-btn-->
<!--          :m="mode"-->
<!--          label="..."-->
<!--          color="secondary"-->
<!--          @click="showNezamMohandesi = true"-->
<!--          :disable="isElementDisabled"-->
<!--        ></q-btn>-->
      </div>
    </div>

<!--    <div class="col-12 col-sm-6 col-md-4">-->
<!--    <ShowModal-->
<!--      :show="showNezamMohandesi"-->
<!--      @hide="showNezamMohandesi = false"-->
<!--      title="جستجوی مهندس"-->
<!--    >-->
<!--      <SearchEngineer/>-->
<!--    </ShowModal>-->
<!--    </div>-->
    </section>
  </section>
</template>

<script>
// import CiItems from '../../../../components/json/items'
// import baseFormMixin from '../../../../mixins/baseFormMixin'
// import FormActions from 'src/components/FormActions'

export default {
  name: 'u-contact-details'
  // components: {
  // },
  // mixins: [baseFormMixin],
  // props: {
  //   formEditable: Boolean,
  //   results: {},
  //   birthDate: null,
  //   regDate: null,
  //   editable: String,
  //   isElementDisabled: Boolean,
  //   isEditable: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // data: function () {
  //   return {
  //     cijobPlaceRegion: null,
  //     showNezamMohandesi: false
  //   }
  // },
  // computed: {
  //   // mode: function () {
  //   //   return this.formEditable ? 'e' : 'r'
  //   // },
  //   jobPlaceRegionDataSource: function () {
  //     return CiItems.CI_JOB_PLACE_REGION
  //   }
  // }
}
</script>
