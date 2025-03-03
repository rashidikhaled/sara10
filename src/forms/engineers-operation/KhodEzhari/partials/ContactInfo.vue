<template>
  <fit>
    <!-- <SafaNotice>
      اطلاعات بالا را با دقت و صحیح وارد نمایید، اطلاعات مربوط به امور مهندسین
      به ایمیل و موبایل شما ارسال می گردد.
    </SafaNotice> -->
    <FormRow>
      <FormControl>
        <safa-text
          label="پست الکترونیک"
          label-width="110px"
          :m="m"
          v-model="value.Email"
          cdcName="Email"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن ثابت"
          label-width="110px"
          :m="m"
          v-model="value.Tel"
          cdcName="Tel"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن همراه"
          label-width="110px"
          :m="m"
          v-model="value.MobileNo"
          cdcName="MobileNo"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کدپستی"
          label-width="110px"
          m="r"
          v-model="value.PostalCode"
          cdcName="PostalCode"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه شهرداری محل کار"
          label-width="110px"
          ciName="CI_Region"
          domainName="engineer"
          :m="m"
          v-model="value.CI_Region"
          cdcName="CI_Region"
        />
      </FormControl>
      <text-template
        class="col-12"
        label="آدرس محل سکونت"
        label-width="110px"
        :m="m"
        v-model="value.Address"
        cdcName="Address"
      />
      <text-template
        class="col-12"
        label="آدرس دفتر"
        label-width="110px"
        :m="m"
        v-model="value.AddressWork"
        cdcName="AddressWork"
      />
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    value: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
