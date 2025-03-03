<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <safa-checkbox
        label="نام و نام خانوادگی"
        :m="m"
        class="col-12"
        cdcName="IsShowName"
        v-model="value.IsShowName"
      />
      <safa-checkbox
        label="صلاحیت"
        :m="m"
        class="col-12"
        cdcName="IsShowAbility"
        v-model="value.IsShowAbility"
      />
      <safa-checkbox
        label="پایه"
        :m="m"
        class="col-12"
        cdcName="IsShowBase"
        v-model="value.IsShowBase"
      />
      <safa-checkbox
        label="فعالیت"
        :m="m"
        class="col-12"
        cdcName="IsShowStudyField"
        v-model="value.IsShowStudyField"
      />
      <safa-checkbox
        label="رشته تحصیلی"
        :m="m"
        class="col-12"
        cdcName="IsShowStudyFieldRel"
        v-model="value.IsShowStudyFieldRel"
      />
      <safa-checkbox
        label="سهمیه باقی مانده"
        :m="m"
        class="col-12"
        cdcName="IsShowQtaRemain"
        v-model="value.IsShowQtaRemain"
      />
      <safa-checkbox
        label="سهمیه کل"
        :m="m"
        class="col-12"
        cdcName="IsShowQta"
        v-model="value.IsShowQta"
      />
      <safa-checkbox
        label="تاریخ انقضاء پروانه اشتغال"
        :m="m"
        class="col-12"
        cdcName="IsJobAgreementExpireDate"
        v-model="value.IsJobAgreementExpireDate"
      />
      <safa-checkbox
        label="نمایش تصویر"
        :m="m"
        class="col-12"
        cdcName="IsShowPic"
        v-model="value.IsShowPic"
      />
      <safa-checkbox
        label="تلفن همراه"
        :m="m"
        class="col-12"
        cdcName="IsShowMobile"
        v-model="value.IsShowMobile"
      />
      <safa-checkbox
        label="محل تحصیل"
        :m="m"
        class="col-12"
        cdcName="IsShowUniversity"
        v-model="value.IsShowUniversity"
      />
      <safa-checkbox
        label="آدرس محل کار"
        :m="m"
        class="col-12"
        cdcName="IsShowAddressWork"
        v-model="value.IsShowAddressWork"
      />
      <safa-checkbox
        label="پست الکترونیکی"
        :m="m"
        class="col-12"
        cdcName="IsShowEMail"
        v-model="value.IsShowEMail"
      />
    </div>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: "r"
    }
  }
}
</script>
