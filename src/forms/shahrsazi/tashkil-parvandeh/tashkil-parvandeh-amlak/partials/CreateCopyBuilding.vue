<template>
  <ShowModal
    title="ایجاد ساختمان های مشابه"
    width="500px"
    height="200px"
    v-model="dialogStatus"
  >
    <div class="row q-mt-sm  justify-center">
      <div class="col-auto">
        <nosazi-code-input
          class="col-auto"
          v-model="nosaziCode"
          enabled="0-0-0-0-0-0-0"
          live-update
          label="کد نوسازی"
        >
        </nosazi-code-input>
      </div>

      <safa-text
        class="col-12 col-md"
        label="تعداد ساختمان های مشابه"
        type="number"
        v-model="count"
      />
    </div>
    <template v-slot:footer>
      <div class="row q-gutter-x-sm">
        <btn-default
          @click="handleSaveAction"
          :disable="count < 1"
          label="ایجاد ساختمان های مشابه"
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
export default {
  name: 'CreateCopyBuilding',
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
                District: this.nosaziCode.District
              }
            }
          )
            .then(async ({ data }) => {
              this.result = this.getResponse(data)
              if (this.result.success) {
                this.$emit('input', false)
                this.$emit('success', this.nosaziCode)

                await this.log({
                  action: this.logActions.save,
                  bizCode: this.nidBase,
                  bizCodeTitle: 'NidBase'
                })

                this.showSuccess('عملیات باموفقیت انجام پذیرفت')
              } else {
                this.showError('عملیات ناموفق بود')
              }
            })
            .catch(response => {
              this.result = this.getResponse(response)
              // this.showError('خطایی رخ داد')
              // console.log('///////////response', response)
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
      dialogStatus: false,
      nosaziCode: {},
      count: 0,
      result: null
    }
  }
}
</script>
