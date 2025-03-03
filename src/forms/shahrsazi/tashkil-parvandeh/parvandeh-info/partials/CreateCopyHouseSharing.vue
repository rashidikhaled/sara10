<template>
  <form-wrapper>
    <safa-status :result="result"/>

    <FormRow>
      <form-control>
        <nosazi-code-input
          v-model="nosaziCodeTemplate"
          label-width="150px"
          label="کد نوسازی"
          m="r"
        />
      </form-control>
      <form-control>
      <safa-text
       label-width="150px"
        label="تعداد دستگاه های مشابه"
        type="number"
        v-model="count"
      />
    </form-control>
  </FormRow>

    <template #footer>
      <div class="row q-gutter-x-sm">
        <btn-save
          @click="handleSaveAction"
          :disable="count < 1"
          label="ایجاد دستگاه مشابه"
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
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
export default {
  name: 'CreateCopyHouseSharing',
  mixins: [loaderMixin, messageMixin, baseFormMixin],
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

  data () {
    return {
      dialogStatus: false,
      count: 0,
      result: null
    }
  },

  methods: {
    handleSaveAction () {
      this.showConfirm('آیا از ایجاد دستگاه های مشابه اطمینان دارید؟').onOk(
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
                  nosaziCodeTemplate: strNosaziCode
                })

                this.showSuccess('عملیات باموفقیت انجام پذیرفت')
                this.$emit('hide')
              } else {
                this.showError('عملیات ناموفق بود')
              }
            })
            .catch(response => {
              this.result = this.getResponse(response)
              this.showError('خطایی رخ داد')
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
