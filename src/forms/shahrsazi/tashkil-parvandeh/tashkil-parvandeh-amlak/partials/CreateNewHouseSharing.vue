<template>
  <ShowModal
    title=" کد نوسازی دستگاه"
    width="200px"
    height="180px"
    v-model="dialogStatus"
  >
    <div class="row justify-center">
      <div class="col-auto">
        <nosazi-code-input
          v-model="nosaziCode"
          enabled="0-0-0-0-1-0-0"
          live-update
          label="کد نوسازی"
        />
      </div>
    </div>
   <template v-slot:footer>
      <div class="row q-gutter-x-sm">
        <btn-save
          @click="handleSaveAction"
          label="ذخیره"
        />
        <btn-cancel
          label="انصراف"
          v-close-popup
        />
      </div>
   </template>
  </ShowModal>

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

  watch: {
    value () {
      this.dialogStatus = this.value
    },
    nosaziCodeTemplate () {
      this.nosaziCode = {
        District: this.nosaziCodeTemplate.District,
        Region: this.nosaziCodeTemplate.Region,
        Block: this.nosaziCodeTemplate.Block,
        House: this.nosaziCodeTemplate.House,
        Building: this.nosaziCodeTemplate.Building,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  data () {
    return {
      dialogStatus: false,
      nosaziCode: {},
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
            ...this.nosaziCode,
            EumNosaziCodeObjType: 5,
            UserName: this.getUserDisplayName(),
            NidUser: this.getNidUser()
          },
          PFillGap: true
        },
        {
          config: {
            District: this.nosaziCode.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.$emit('input', false)
            this.$emit('success', this.nosaziCode)

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.nosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.showSuccess('عملیات باموفقیت انجام پذیرفت')
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
