<template>
  <form-wrapper >
    <safa-status :result="result"/>

    <FormRow>
    <form-control>
      <nosazi-code-input
        label="کد نوسازی"
        label-width="150px"
        class="col-auto"
        v-model="nosaziCodeTemplate"
        m="r"
      />
    </form-control>
    <form-control>
    <safa-text
      label="تعداد ساختمان های مشابه"
      label-width="150px"
      v-model="count"
      cdcName="count"
      type="number"
    />
    </form-control>
    </FormRow>

    <template #footer>
      <div class="q-gutter-x-sm">
        <btn-save
          label="ایجاد ساختمان های مشابه"
          @click="handleSaveAction"
          :disable="count < 1"
        />
        <btn-cancel
          label="انصراف"
          @click="$emit('hide')"
        />
      </div>
    </template>

  </form-wrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
export default {
  name: 'CreateCopyBuilding',
  mixins: [baseFormMixin],
  props: {
    value: Boolean,
    nosaziCodeTemplate: Object,
    nidBase: String,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },

  methods: {
    handleSaveAction () {
      this.showConfirm('آیا از ایجاد ساختمانهای مشابه اطمینان دارید؟').onOk(
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
                this.$emit('input', false)
                this.$emit('success', this.nosaziCodeTemplate)
                const strNosaziCode = convertNosaziCodeObjectToString(
                  this.nosaziCodeTemplate
                )
                await this.log({
                  action: this.logActions.save,
                  bizCode: this.nidBase,
                  bizCodeTitle: 'NidBase',
                  nosaziCode: strNosaziCode,
                  saveDesc: `عملیات ایجاد ساختمان های مشابه برای شماره درخواست ${strNosaziCode.split("-").reverse().join("-")} انجام گردید.` }
                )

                this.showSuccess('عملیات باموفقیت انجام پذیرفت')
                this.$emit('hide')
              }
            })
            .catch(response => {
              this.serverError()
              console.error('save error ...', response)
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    }
  },

  data () {
    return {
      count: 0,
      result: null
    }
  }
}
</script>
