<template>
  <form-wrapper :title="title">
    <FormRow class="q-mb-sm">
      <Form-Control>
        <safa-text
          v-model="letterNumber"
          :m="mode"
          label="شماره نامه شهرداری"
          label-width="110px"
        >
        </safa-text>
      </Form-Control>
    </FormRow>
    <FormRow class="q-mb-sm">
      <Form-Control>
        <safa-datepicker
          v-model="letterDate"
          :m="mode"
          label="تاریخ نامه شهرداری"
          label-width="110px"
        >
        </safa-datepicker>
      </Form-Control>
    </FormRow>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-edit v-if="!isEditable" @click="isEditable = true"/>
        <btn-save v-if="isEditable" @click="submit"/>
        <btn-cancel @click="deleteHandler"/>
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تایید',
      name: 'ConfirmSend',
      letterNumber: '',
      letterDate: ''
    }
  },
  props: {
    RequestSecResult: Object
  },
  mounted () {
    this.letterNumber = this.RequestSecResult.Sh_RequestSec.SecNo || ''
    this.letterDate = this.RequestSecResult.Sh_RequestSec.SecDate || ''
  },
  methods: {
    deleteHandler () {
      this.$emit('cancel')
    },
    submit () {
      this.showConfirm('آیا از ارسال به بیمه اطمینان دارید؟').onOk(async () => {
        this.isEditable = false
        this.$emit('submit', {
          letterNumber: this.letterNumber,
          letterDate: this.letterDate
        })
      })
    }
  }
}
</script>
