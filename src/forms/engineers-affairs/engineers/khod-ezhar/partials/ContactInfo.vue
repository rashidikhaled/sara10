<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="آدرس پست الکترونیک"
          label-width="100px"
          :m="m"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.Email"
          :class="{ 'control-highlight': isModifyField('Email') }"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن ثابت"
          label-width="100px"
          :m="m"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.Tel"
          :class="{ 'control-highlight': isModifyField('Tel') }"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن همراه"
          label-width="100px"
          :m="m"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.MobileNo"
          :class="{ 'control-highlight': isModifyField('MobileNo') }"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کدپستی"
          label-width="100px"
          :m="m"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.PostalCode"
          :class="{ 'control-highlight': isModifyField('PostalCode') }"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="منطقه شهرداری محل کار"
          label-width="100px"
          ciName="CI_Region"
          domainName="engineer"
          :m="m"
          :class="{ 'control-highlight': isModifyField('CI_Region') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.CI_Region"
        />
      </FormControl>
      <text-template
        class="col-12"
        label="آدرس محل سکونت"
        label-width="100px"
        :m="m"
        v-model="model.ClsEngineerTemp.Eng_Info_Temp.Address"
        :class="{ 'control-highlight': isModifyField('Address') }"
      />
      <text-template
        class="col-12"
        label="آدرس دفتر"
        label-width="100px"
        :m="m"
        v-model="model.ClsEngineerTemp.Eng_Info_Temp.AddressWork"
        :class="{ 'control-highlight': isModifyField('AddressWork') }"
      />
    </FormRow>
    <div class="fit"></div>
    <SafaNotice>
      اطلاعات بالا را با دقت و صحیح وارد نمایید، اطلاعات مربوط به امور مهندسین
      به ایمیل و موبایل شما ارسال می گردد.
    </SafaNotice>
  </fit>
</template>

<script>
export default {
  name: "ContactInfo",
  data () {
    return {}
  },
  props: {
    m: String,
    model: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    engCompareFields () {
      return (
        this.model &&
        this.model.ClsEngCompare &&
        this.model.ClsEngCompare.map((x) => x.Name)
      )
    }
  },
  methods: {
    isModifyField (field) {
      return !this.engCompareFields.includes(field)
    }
  }
}
</script>
