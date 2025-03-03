<template>
  <form-wrapper>
    <safa-status :result="result" />
    <FormRow>
      <form-control>
        <nosazi-code-input
          v-model="nosaziCodeTemplate"
           label-width="80px"
          label="کد نوسازی"
        />
      </form-control>
    </FormRow>
   <template v-slot:footer>
      <div class="row q-gutter-x-sm">
        <btn-save
          @click="handleSaveAction"
          label="ذخیره"
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
  name: 'CreateNewHouseSharing',
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  props: {
    value: Boolean,
    nosaziCodeTemplate: Object,
    parent: Object,
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
      // nosaziCode: {},
      result: null
    }
  },

  methods: {
    handleSaveAction () {
      this.showLoading()
      this.$services.SC.saveNosaziCode(
        {
          PParentNosaziCode: {
            ...this.nosaziCodeTemplate
          },
          PNosaziCode: {
            // ...this.nosaziCodeTemplate,
            ...this.nosaziCodeTemplate,
            EumNosaziCodeObjType: 5,
            UserName: this.getUserDisplayName(),
            NidUser: this.getNidUser()
          },
          PFillGap: true
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
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
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
  }
}
</script>
