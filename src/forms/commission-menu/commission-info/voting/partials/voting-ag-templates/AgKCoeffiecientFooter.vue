<template>
  <div
    class="flex no-wrap q-gutter-x-xs full-height"
    v-if="params.kCoeffiecientShow"
  >
      <!-- type="number" -->
    <input
      class="ag-input-field-input ag-text-field-input"
      style="border-radius: 3px"
      v-model="params.data.txtAllK"
      cdcName="txtAllK"
      @input="txtAllK_OnValueChanging"
      :validations="['number', 'required']"
    />
    <span
        v-if="errorMessage"
        :title="errorMessage"
        class="validation-error col-auto"
      >
      <q-icon name="priority_high"></q-icon>
    </span>
    <div>
      <btn-default
        class="full-height"
        style="margin-left: 2px"
        label="اعمال"
        @click="btnSet_Click"
      />
      <btn-default
        class="full-height"
        label="محاسبه"
        @click="btn_CalculateVote_Click"
      />
    </div>
  </div>
</template>

<script>
import Joi from "joi"
export default {
  name: "AgKCoeffiecient",
  data () {
    return {
      errorMessage: null
    }
  },
  methods: {
    txtAllK_OnValueChanging ($event) {
      this.errorMessage = null
      let val = parseFloat($event.target.value)
      const schema = Joi.number().required().messages({
        "number.base": "این فیلد مقدار عددی می باشد.",
        "any.required": "این فیلد مقدار عددی می باشد."
      })
      const error = schema.validate(val)
      console.log(error)
      if (isNaN(val)) {
        this.errorMessage = error.error.message
        return
      }
      this.params.txtAllK_OnValueChanging($event.target.value)
    },

    btnSet_Click () {
      this.params.btnSet_Click()
    },

    btn_CalculateVote_Click () {
      this.params.btn_CalculateVote_Click()
    }
  }
}
</script>
