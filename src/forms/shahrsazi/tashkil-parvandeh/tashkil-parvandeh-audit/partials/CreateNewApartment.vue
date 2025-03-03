<template>
  <safa-popup
    title=" کد نوسازی آپارتمان"
    width="400px"
    height="200px"
    v-model="dialogStatus"
  >
    <div class="row q-mt-sm  justify-center">
      <div class="col-auto">
        <nosazi-code-input
          v-model="nosaziCode"
          enabled="0-0-0-0-0-1-0"
          live-update
          label="کد نوسازی"
        />
      </div>
    </div>
    <div class="row q-mt-md justify-center">
      <div class="col-auto">
        <btn-save
          @click="handleSaveAction"
          label="ذخیره"
          class="q-mr-md"
        />
        <btn-cancel
          label="انصراف"
          v-close-popup
        />
      </div>
    </div>
  </safa-popup>

  <!--
//   <q-dialog v-model="dialogStatus" @input="$emit('input', dialogStatus)" persistent>
//     <q-card>
//       <q-card-section class="bg-primary text-white text-block">
//         کد نوسازی آپارتمان
//       </q-card-section>
//       <q-separator dense/>
//       <q-card-section>
//         <safa-status :result="result"/>
//         <nosazi-code-input
//           v-model="nosaziCode"
//           enabled="0-0-0-0-0-1-0"
//           live-update
//         >
//         </nosazi-code-input>
//       </q-card-section>
//       <q-card-actions>
//         <q-btn
//           icon="done"
//           color="green"
//           @click="handleSaveAction"
//           label="ذخیره"
//         ></q-btn>
//         <q-btn
//           icon="arrow_right_alt"
//           color="grey-13"
//           label="انصراف"
//           v-close-popup
//         ></q-btn>
//       </q-card-actions>
//     </q-card>
//   </q-dialog>
// </template> -->
</template>
<script>
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'CreateNewApartment',
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
          PParentNosaziCode: this.nosaziCodeTemplate,
          PNosaziCode: {
            ...this.nosaziCode,
            EumNosaziCodeObjType: 4,
            EumNosaziCodeGroup: 1
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
    }
  }
}
</script>
