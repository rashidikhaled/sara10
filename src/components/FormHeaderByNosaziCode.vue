<template>
  <section class="form-header-by-nosazi-code-wrapper" v-if="!nosazi.hideNosaziCodeHeader">
    <div class="row items-center form-header-by-nosazi-code">
      <div class="col-md-8 text-body3 flexCenter">
        <div class="ellipsis" style="max-width: 100%;width: 900px;" v-if="hasFetchedData" v-html="infoText"
             :title="infoText">
          <!--          نام مالک:&nbsp;{{ headerData.ownerName || '-&#45;&#45;' }} ،-->
          <!--کد قدیم:&nbsp;{{ headerData.preCodeInfo || '-&#45;&#45;' }} ،-->
          <!--          &nbsp;{{ headerData.address || '-&#45;&#45;' }}-->
          <!-- <span class="text-amber-6">{{ headerData.ownerName || '---' }}</span> کد قدیم: -->
          <!-- <span class="text-amber-6">{{ headerData.preCodeInfo || '---'}}</span> آدرس: -->
          <!-- <span class="text-amber-6">{{ headerData.address || '---'}}</span> -->
        </div>
        <!-- <template v-else>
          لطفا کد نوسازی را در کادر رو به رو وارد نمایید
        </template> -->
      </div>
      <div class="col column items-end">
        <div v-if="editMode">
          <nosazi-code-input
            :actions="actions"
            :value="baseNosaziCode"
            @input="nosaziCodeChanged"
            :from-request="false"
            :disabled="nosaziCodeInputDisabled"
            live-update-on-end
            :enabled="enabled"
          />
          <!--          {{baseNosaziCode}}-->
        </div>
        <div v-if="!editMode" class="nosazi-preview flex no-wrap items-center" style="cursor: not-allowed" dir="ltr">
          <span
            :key="part"
            :title="getPartName(i)"
            v-for="(part, i) in sections">
          {{ baseNosaziCode[part] }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
// eslint-disable-next-line no-unused-vars
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'FormHeaderByNosaziCode',

  mixins: [baseFormMixin],
  props: {
    nosaziCodeInputDisabled: {
      type: Boolean,
      default: false
    },
    // isArsseNosazi: { //  در برخی فرم ها مثل اعلام ضابطه کد نوسازی باید در حد عرصه ارسال شود یعنی سه رقم آخر کد نوسازی باید 0 باشد //   https://trello.com/c/4ECC2icC
    //   type: Boolean,
    //   default: false
    // },
    actions: {
      type: Boolean,
      default: true
    },
    // title: {
    //   type: String,
    //   required: true
    // },
    // formKey: {
    //   type: String,
    //   required: true
    // },
    // name: {
    //   type: String,
    //   required: true
    // },
    enabled: {
      type: String,
      default: '1-1-1-1-1-1-1'
    },
    isLoadDeletedNosaziCode: {
      type: Boolean,
      default: false
    },
    loadSelectedRequestOnMount: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Object, String],
      default: () => ({})
    }
  },

  data () {
    return {
      sections: [
        'District',
        'Region',
        'Block',
        'House',
        'Building',
        'Apartment',
        'Shop'
      ],
      hasFetchedData: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibInNosaziCode: {},
      editMode: false
    }
  },
  watch: {
    value () {
      this.baseNosaziCode = {
        ...this.baseNosaziCode,
        District: this.value.District,
        Region: this.value.Region,
        Block: this.value.Block,
        House: this.value.House,
        Building: this.value.Building,
        Apartment: this.value.Apartment,
        Shop: this.value.Shop
      }
    }
  },

  computed: {
    nosazi () {
      let parent = this.$parent
      while (parent) {
        if (Object.keys(parent.$attrs).length) {
          return parent.$attrs
        }
        if (parent === parent.$parent) {
          return
        }
        parent = parent.$parent
      }
      return {}
    },
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    },
    headerData () {
      const data = {
        ownerName: '',
        address: '',
        preCodeInfo: ''
      }
      if (!this.hasFetchedData) {
        return data
      }
      if (this.baseLibInNosaziCode.Base_AddressInfo) {
        if (this.baseLibInNosaziCode.Base_AddressInfo.MainAddress !== null) {
          data.address = this.baseLibInNosaziCode.Base_AddressInfo.MainAddress
        }
      }
      if (this.baseLibInNosaziCode.Base_CommonEstate_Address &&
        this.baseLibInNosaziCode.Base_CommonEstate_Address.Plack) {
        if (this.baseLibInNosaziCode.Base_CommonEstate_Address.Plack !== null) {
          data.address += ' پلاک: ' + this.baseLibInNosaziCode.Base_CommonEstate_Address.Plack
        }
      }
      if (this.baseLibInNosaziCode.Base_CommonEstate_Address &&
        this.baseLibInNosaziCode.Base_CommonEstate_Address.Vahed) {
        if (this.baseLibInNosaziCode.Base_CommonEstate_Address.Vahed !== null) {
          data.address += ' واحد: ' + this.baseLibInNosaziCode.Base_CommonEstate_Address.Vahed
        }
      }
      if (Array.isArray(this.baseLibInNosaziCode.Base_Owner)) {
        data.ownerName = this.baseLibInNosaziCode.Base_Owner
          .map(x => `${x.OwnerName} ${x.OwnerLastName}`)
          .join(' - ')
      }
      if (Array.isArray(this.baseLibInNosaziCode.Base_PreCodeInfo)) {
        data.preCodeInfo = this.baseLibInNosaziCode.Base_PreCodeInfo
          .map(x => x.PreCode || '')
          .map(x => x.split('-').reverse().join('-'))
          .join('، ')
      }
      return data
    },
    infoText () {
      if (!this.headerData) return ''
      return ` نام مالک: ${this.headerData.ownerName}
      , آدرس: ${this.headerData.address || '---'}`
    }
  },
  methods: {
    async nosaziCodeChanged (val) {
      // debugger
      // console.log('%%%%%%%%%%%%%%%%%%', val)
      this.baseNosaziCode = val
      // if (this.enabled === '1-1-1-1-1-1-1') {
      await this.load()
      // }
    },
    isValidNosaziCode (baseNosaziCode) {
      if (typeof baseNosaziCode !== 'object') return false
      return !!(
        baseNosaziCode &&
        baseNosaziCode.District &&
        baseNosaziCode.Region &&
        baseNosaziCode.Block
      )
    },
    getPartName (index) {
      const arr = [
        'منطقه',
        'حوزه',
        'بلوک',
        'ملک',
        'ساختمان',
        'آپارتمان',
        'صنفی'
      ]
      return arr[index]
    },
    async load () {
      if (!this.isValidNosaziCode(this.baseNosaziCode)) {
        this.showError('کد نوسازی بدرستی تنظیم نشده است.')
        return false
      }
      // debugger
      // if (this.isArsseNosazi) {
      //   this.baseNosaziCode.Building = 0
      //   this.baseNosaziCode.Apartment = 0
      //   this.baseNosaziCode.Shop = 0
      // }
      try {
        /* this.showLoading({
          message: 'در حال بارگذاری هدر کد نوسازی'
        }) */
        // this.hasFetchedData = false
        // Fetch Request Header
        const { data } = await this.$services.SA.getBaseLibInNosaziCode({
          pNosaziCode: this.baseNosaziCode,
          pLoadFunc: 'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
          pIsLoadDeletedNosaziCode: this.isLoadDeletedNosaziCode
        }, this.config)
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          this.showError('اطلاعات کدنوسازی بارگذاری نشد')
        } else {
          // const NosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
          // await this.log({
          //   action: this.logActions.view,
          //   bizCode: NosaziCode,
          //   bizCodeTitle: 'NosaziCode'
          // })
        }
        this.hasFetchedData = true
        this.baseLibInNosaziCode = this.result.data
        this.$emit('input', this.baseNosaziCode)
        this.$emit('fetched', this.baseLibInNosaziCode)

        // end1
      } catch (e) {
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        // this.hideLoading()
      }
    }
  },

  mounted () {
    const { BizCode, NosaziCode } = this.selectedRequest || {}
    console.log('@@@@@@@load', BizCode)
    if (this.loadSelectedRequestOnMount && (BizCode || NosaziCode)) {
      this.baseNosaziCode = this.convertToNosaziCodeObject(BizCode || NosaziCode)
      // this.load()
    } else if (this.isValidNosaziCode(this.value)) {
      this.baseNosaziCode = this.value
      // this.load()
    }
    this.editMode = this.enabled !== '0-0-0-0-0-0-0'
  }
}
</script>
<style>
.flexCenter {
  display: flex;
  justify-content: center;
}
</style>
