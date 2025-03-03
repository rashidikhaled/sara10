<template>
  <safa-text
    type="number"
    :label="label"
    :value="value"
    :rules='rules'
    @input="$emit('input', $event)"
    v-bind="$attrs"
    v-on="$listeners"
  />
  <!--<q-form
    @submit="sendData">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-12">
        <safa-text
          v-if="mobile"
          type="number"
          label="شماره موبایل"
          v-model="model.mobileNumber"
          :rules='[val =>
          /^\+[0-9]{12}$|^0[0-9]{10}$/.test(val) || "شماره مویابل وارد شده نامعتبر است" ]'
          />
      </div>
      <div class="col-12 col-md-12">
        <safa-text
          v-if="phone"
          type="number"
          label="شماره ثابت"
          v-model="model.homeNumber"
          :rules='[val =>
          /^\+[0-9]{12}$|^0[0-9]{10}$/.test(val) || "شماره ثابت وارد شده نامعتبر است" ]'
          />
      </div>
      <div class="col-12 col-md-12">
        <safa-text
          v-if="code"
          type="number"
          label="کد پستی"
          v-model="model.zipCode"
          :rules='[val =>
          /^[0-9]{10}$/.test(val) || "کد پستی وارد شده نامعتبر است" ]'
          />
      </div>
      <q-btn filled type="submit" label="ارسال اطلاعات" />
    </div>
  </q-form>-->
</template>
<script>
export default {
  name: 'safaPhoneCode',
  props: {
    label: String,
    value: [Number, String],
    type: {
      type: String,
      required: true,
      validator: (val) => {
        return ['phone', 'mobile', 'zipcode'].includes(val.toLocaleString())
      }
    }
  },
  computed: {
    rules () {
      switch (this.type.toLowerCase()) {
        case 'phone':
          // eslint-disable-next-line standard/array-bracket-even-spacing
          return [val => /^\+[0-9]{12}$|^0[0-9]{10}$/.test(val) || 'شماره ثابت وارد شده نامعتبر است' ]
        case 'mobile':
          // eslint-disable-next-line standard/array-bracket-even-spacing
          return [val => /^\+[0-9]{12}$|^0[0-9]{10}$/.test(val) || 'شماره مویابل وارد شده نامعتبر است' ]
        case 'zipcode':
          // eslint-disable-next-line standard/array-bracket-even-spacing
          return [val => /^[0-9]{10}$/.test(val) || 'کد پستی وارد شده نامعتبر است' ]
      }
      return []
    }
  }
}
</script>
