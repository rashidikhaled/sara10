<template>
  <form-wrapper>
    <safa-status :result="result" />

    <FormRow>
      <form-control>
        <nosazi-code-input
          v-model="nosaziCodeTemplate"
            label-width="150px"
          label="کد نوسازی"
        />
      </form-control>
      <form-control>
      <safa-text
        label-width="150px"
        label="تعداد صنفی های مشابه"
        type="number"
        v-model="count"
      />
    </form-control>
      </FormRow>

    <template #footer>
    <div class="q-gutter-x-sm">
      <btn-save
       label="ایجاد صنفی های مشابه"
        @click="handleSaveAction"
        :disable="count < 1"
      />
        <btn-cancel label="انصراف"  @click="$emit('hide')" />
      </div>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  name: "CreateCopyShop",
  mixins: [baseFormMixin],
  props: {
    value: Boolean,
    nosaziCodeTemplate: Object,
    nidBase: String,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },

  data () {
    return {
      dialogStatus: false,
      count: 0,
      result: null
    }
  },

  methods: {
    handleSaveAction () {
      this.showConfirm("آیا از ایجاد صنفی های مشابه اطمینان دارید؟").onOk(
        () => {
          this.showLoading()
          this.$services.SC.clone(
            {
              pFromNidBase: this.nidBase,
              pCount: this.count,
              pUserName: this.getUserDisplayName(),
              pNidUser: this.getNidUser(),
              NewObjCode: null,
              pFillGap: true
            },
            {
              config: {
                District: this.nosaziCodeTemplate.District
              }
            }
          )
            .then(async ({ data }) => {
              this.result = this.getResponse(data)
              if (this.result.success) {
                this.$emit("input", false)
                this.$emit("success", this.nosaziCodeTemplate)
                const strNosaziCode = convertNosaziCodeObjectToString(
                  this.nosaziCodeTemplate
                )
                await this.log({
                  action: this.logActions.save,
                  bizCode: this.nidBase,
                  bizCodeTitle: "NidBase",
                  nosaziCodeTemplate: strNosaziCode
                })

                this.showSuccess("عملیات باموفقیت انجام پذیرفت")
                this.$emit('hide')
              }
            })
            .catch((response) => {
              this.serverError()
              console.error("save error ...", response)
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    }
  }
}
</script>
