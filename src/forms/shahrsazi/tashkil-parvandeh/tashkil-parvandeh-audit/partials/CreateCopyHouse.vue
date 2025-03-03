<template>
 <safa-popup
    title="ایجاد ملک های مشابه"
    width="400px"
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
        />
      </div>
       <safa-text
      class="col-12 col-md"
      label="تعداد ملک های مشابه"
      type="number"
      v-model="count"
    />
    </div>

    <div class="row q-mt-md justify-center">
      <div class="col-auto">
        <btn-default
          @click="handleSaveAction"
          :disable="count < 1"
          label="ایجاد ملک های مشابه"
          class="q-mr-md"
        />
        <btn-cancel
          label="انصراف"
          v-close-popup
        />
      </div>
    </div>
  </safa-popup>
  <!-- <q-dialog v-model="dialogStatus" @input="$emit('input', dialogStatus)" persistent>
    <q-card>
      <q-card-section class="bg-primary text-white text-block">
        ایجاد ملک های مشابه
      </q-card-section>
      <q-separator dense/>
      <q-card-section class="row q-col-gutter-md">
        <safa-status :result="result"/>
        <nosazi-code-input
          class="col-12"
          v-model="nosaziCode"
          enabled="0-0-0-0-0-0-0"
          live-update
        >
        </nosazi-code-input>

        <safa-text
          class="col-12"
          label="تعداد ملک های مشابه"
          type="number"
          v-model="count"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
          icon="done"
          color="green"
          @click="handleSaveAction"
          :disable="count < 1"
          label="ایجاد ملک های مشابه"
        ></q-btn>
        <q-btn
          icon="arrow_right_alt"
          color="grey-13"
          label="انصراف"
          v-close-popup
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog> -->
</template>

<script>
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'CreateCopyHouse',
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
    },
    baseNosaziCode: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mixins: [baseFormMixin],
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
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  data () {
    return {
      dialogStatus: false,
      nosaziCode: {},
      count: 0,
      result: null
    }
  },

  methods: {
    handleSaveAction () {
      this.showConfirm('آیا از ایجاد ملکهای مشابه اطمینان دارید؟')
        .onOk(() => {
          this.showLoading()
          this.$services.SC.clone({
            pFromNidBase: this.nosaziCodeTemplate.NidBase,
            pCount: this.count,
            pUserName: this.getUserDisplayName(),
            pNidUser: this.getNidUser(),
            NewObjCode: null,
            pFillGap: true
          }, {
            config: {
              District: this.nosaziCode.District
            }
          })
            .then(async ({ data }) => {
              this.result = this.getResponse(data)
              if (this.result.success) {
                this.$emit('input', false)
                this.$emit('success', this.nosaziCode)
                this.showSuccess('عملیات باموفقیت انجام پذیرفت')

                const strNosaziCode = convertNosaziCodeObjectToString(
                  this.baseNosaziCode
                )

                await this.log({
                  action: this.logActions.save,
                  bizCode: strNosaziCode,
                  bizCodeTitle: 'کد نوسازی'
                })
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
        })
    }
  }
}
</script>
