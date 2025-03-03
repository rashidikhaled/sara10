<template>
    <form-wrapper>
      <safa-status :result="getAddressFromPostcodeRes" />
      <fit>
        <div class="row q-col-gutter-sm">
          <safa-text
            label="کد پستی"
            label-width="70px"
            v-model="estelam.PostCode"
            cdcName="PostCode"
            m="e"
            class="col-12"
            type="number"
            required
            :validations="['required', 'number', validations.PostCode]"
          />
          <text-template
            label="آدرس"
            label-width="70px"
            v-model="estelam.Address"
            cdcName="Address"
            m="r"
            class="col-12"
          />
        </div>
      </fit>
      <template #footer>
        <div class="q-gutter-sm">
          <btn-save label="استعلام" @click="getAddressFromPostcode" />
          <btn-default
            label="انتخاب"
            :disable="!hasData"
            @click="selectedHandler"
          />
        </div>
      </template>
    </form-wrapper>
</template>

<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  name: "UCheckPostCode",
  props: {
    m: String,
    baseNosaziCode: Object,
    value: {
      type: Object,
      default: () => ({})
    },
    settingData: {
      type: Object,
      default: () => ({
        Chk_IsCheckSabt: false
      })
    }
  },
  data () {
    return {
      estelamModel: null,
      getAddressFromPostcodeRes: null,
      showCheckSabtModal: false,
      estelam: {
        PostCode: "",
        Address: ""
      },
      hasData: false,
      validations: {
        PostCode: Joi.string().length(10).required().messages({
          "string.base": `کد پستی میبایست به صورت عدد باشد.`,
          "string.length": `کد پستی میبایست 10 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        })
      }
    }
  },
  methods: {
    async getAddressFromPostcode () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getAddressFromPostcode(
          { pPostcode: this.estelam.PostCode },
          { config: { District: this.baseNosaziCode?.District ?? 1 } }
        )
        this.getAddressFromPostcodeRes = this.getResponse(data)
        if (this.getAddressFromPostcodeRes.success) {
          this.estelamModel = this.getAddressFromPostcodeRes.data
          // this.estelam.Address = this.estelamModel.PersonInfo?.address
          this.estelam.Address = this.estelamModel.Address // طبق زمل پیاده شده
          this.hasData = true
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    selectedHandler () {
      this.showConfirm("آیا از جایگزین شدن اطلاعات پستی اطمینان دارید؟").onOk(
        () => {
          this.$emit("changeDataAfterAddressEstelam", this.estelam)
        }
      )
    }
  }
}
</script>
