<template>
  <safa-popup
    title="کپی اطلاعات تشکیل پرونده"
    width="400px"
    v-model="dialogStatus"
  >
  <form-wrapper>
    <div class="row q-mt-sm  justify-center">
      <div class="col-auto">
        <nosazi-code-input
          v-model="nosaziCode"
          enabled="0-0-0-1-0-0-0"
          @input="getBaseLibInNosaziCode"
          label="کد نوسازی"
        >
        </nosazi-code-input>
      </div>
    </div>
    <div class="row q-mb-md justify-center">
      <div class="col-auto">
        <btn-default
          @click="copy"
          label="کپی"
        />
        <btn-cancel
          label="انصراف"
           @click="$emit('hide')"
        />
      </div>
    </div>
   </form-wrapper>
  </safa-popup>

</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'CreateNewBuilding',
  mixins: [baseFormMixin],
  props: {
    baseNosaziCode: Object,
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
  mounted () {
    this.nosaziCode = this.baseNosaziCode
    // this.nosaziCode.House = 0
  },
  watch: {
    value: {
      handler () {
        this.dialogStatus = this.value
      },
      immediate: true
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
      copyPrequest: {
        pFromNidBase: '',
        pToNidBase: '',
        pCount: 1,
        pNidUser: '',
        pUserName: '',
        pFillGap: true,
        NewObjCode: null
      },
      getBaseLibPrequest: {
        pNosaziCode: {
          Apartment: '0',
          Block: '0',
          Building: '0',
          CI_City: '0',
          District: '0',
          EumBaseInfoGroup: '0',
          EumNosaziCodeGroup: '0',
          EumNosaziCodeObjType: '0',
          EumRevisitGroup: '0',
          House: '0',
          Id: 'null',
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
          NidRevisit: '00000000-0000-0000-0000-000000000000',
          NidUser: '00000000-0000-0000-0000-000000000000',
          ParentId: 'null',
          Region: '0',
          Shop: '0',
          UserName: 'null'
        },
        pLoadFunc: 'ChildTree',
        pIsLoadDeletedNosaziCode: 'false'
      },
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
      copyResult: null,
      getBaseLibResult: {}
    }
  },
  methods: {
    getBaseLibInNosaziCode () {
      this.getBaseLibPrequest.pNosaziCode.District = this.nosaziCode.District
      this.getBaseLibPrequest.pNosaziCode.Region = this.nosaziCode.Region
      this.getBaseLibPrequest.pNosaziCode.Block = this.nosaziCode.Block
      this.getBaseLibPrequest.pNosaziCode.House = this.nosaziCode.House
      this.getBaseLibPrequest.pNosaziCode.Building = this.nosaziCode.Building
      this.getBaseLibPrequest.pNosaziCode.Apartment = this.nosaziCode.Apartment
      this.getBaseLibPrequest.pNosaziCode.Shop = this.nosaziCode.Shop

      this.$q.loading.show()
      this.$services.SA.getBaseLibInNosaziCode(this.getBaseLibPrequest, {
        config: {
          District: 1
        }
      })
        .then(async response => {
          this.$q.loading.hide()

          this.getBaseLibResult = this.getResponse(response.data)

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.nosaziCode
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })
        })
        .catch(ex => {
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    },
    copy () {
      this.showConfirm('آیا از کپی اطلاعات اطمینان دارید؟').onOk(() => {
        this.showSending()

        // با چکی که در فیدلر در سرا8 کردم از و تای NidBase جفتشان یک مقدار دارند
        this.copyPrequest.pFromNidBase = this.getBaseLibResult.data.HouseObj.NidBase

        this.copyPrequest.pToNidBase = this.getBaseLibResult.data.HouseObj.NidBase

        this.copyPrequest.pNidUser = this.getNidUser()

        this.copyPrequest.pUserName = this.currentUser.FullName

        this.$services.SC.copyDataInParvandehInfo(this.copyPrequest)
          .then(async ({ data }) => {
            this.copyResult = this.getResponse(data)

            if (this.copyResult.success) {
              this.$emit('input', false)
              this.$emit('success', this.nosaziCode)

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.nosaziCode
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
          .catch(err => {
            this.serverError()
            console.error(err)
          })
          .finally(() => {
            this.hideSending()
          })
      })
    }
  }
}
</script>
