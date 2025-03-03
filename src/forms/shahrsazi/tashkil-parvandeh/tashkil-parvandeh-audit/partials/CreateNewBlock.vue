<template>
  <safa-popup
    title="کد نوسازی بلوک"
    v-model="dialogStatus"
    width="400px"
    height="200px"
  >
    <div class="row q-mt-sm  justify-center">
      <div class="col-auto">
        <nosazi-code-input
          v-model="nosaziCode"
          enabled="1-1-1-0-0-0-0"
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
  <!-- <q-dialog v-model="dialogStatus" @input="$emit('input', dialogStatus)" persistent>
    <q-card>
      <q-card-section class="bg-primary text-white text-block">
        کد نوسازی بلوک
      </q-card-section>
      <q-separator dense/>
      <q-card-section>
        <safa-status :result="result"/>
        <nosazi-code-input
          v-model="nosaziCode"
          enabled="1-1-1-0-0-0-0"
          live-update
        >
        </nosazi-code-input>
      </q-card-section>
      <q-card-actions>
        <q-btn
          icon="done"
          color="green"
          @click="handleSaveAction"
          label="ذخیره"
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
  name: 'CreateNewBlock',
  props: {
    value: Boolean,
    nosaziCodeTemplate: Object,
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
        House: 0,
        Building: 0,
        HouseSharing: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  data () {
    return {
      dialogStatus: false,
      nosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      result: null
    }
  },

  methods: {
    handleSaveAction () {
      this.showLoading()
      this.$services.SC.saveNosaziCode(
        {
          PNosaziCode: {
            ...this.nosaziCode,
            EumRevisitGroup: 0,
            EumNosaziCodeObjType: 1,
            EumNosaziCodeGroup: 1,
            EumBaseInfoGroup: 0,
            IsRoot: false,
            NidBase: '00000000-0000-0000-0000-000000000000',
            NidNosaziCode: '00000000-0000-0000-0000-000000000000',
            NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
            NidRevisit: '00000000-0000-0000-0000-000000000000',
            Id: null,
            CI_City: 0,
            ParentId: null,
            UserName: this.getUserDisplayName(),
            NidUser: this.getNidUser()
          },
          PParentNosaziCode: null,
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
