<template>
  <fit>
    <safa-grid
      title="تاریخچه ارسال پیامک"
      v-model="getSmsNumberValue.Schedule_SMSList"
      fit
      :columns="sendSmsHistoryColumns"
      height="100%"
      max-height="100%"
    />
  </fit>
</template>

<script>
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  data () {
    return {
      items: [],
      nosaziCode: '0-0-0-0-0-0-0',
      getDiscountPrequest: {
        pRayanehCode: null,
        pNationalCode: null,
        pRequesterName: null,
        pDistrict: '0',
        pRegion: '0',
        pBlock: '0',
        pHouse: '0',
        pBuilding: '0',
        pApartment: '0',
        pShop: '0',
        pFromRow: '0',
        pToRow: '1000'
      },
      loadResult: {},
      getBaseLibPrequest: {
        pNosaziCode: {
          Apartment: '6',
          Block: '3',
          Building: '5',
          CI_City: '0',
          District: '1',
          EumBaseInfoGroup: '0',
          EumNosaziCodeGroup: '0',
          EumNosaziCodeObjType: '0',
          EumRevisitGroup: '0',
          House: '4',
          Id: 'null',
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
          NidRevisit: '00000000-0000-0000-0000-000000000000',
          NidUser: '00000000-0000-0000-0000-000000000000',
          ParentId: 'null',
          Region: '2',
          Shop: '7',
          UserName: 'null'
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: 'false'
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      sendSmsHistoryColumns: [
        {
          field: "SMSType",
          title: "نوع",
          width: "140px"
        },
        {
          field: "SendDate",
          title: "تاریخ ارسال",
          editor: "date",
          width: "140px"
        },
        {
          field: "SendTime",
          title: "ساعت ارسال",
          width: "140px"
        },
        {
          field: "Text",
          title: "متن پیامک",
          width: "200px"
        },
        {
          field: "UserName",
          title: "کاربر",
          width: "140px"
        },
        {
          field: "Number",
          title: "شماره تلفن",
          width: "140px"
        },
        {
          field: "SMSStatus",
          title: "وضعیت پیامک",
          width: "auto"
        }
      ],
      getBaseLibResult: {},
      baseOwner: {}
    }
  },
  props: {
    getSmsNumberValue: Object,
    title: String,
    formKey: String,
    name: String,

    value: Object,
    editMode: {
      type: String,
      default: 'e'
    }
  },
  components: {},
  methods: {
    openNewTab () {
      this.$emit('onEmitopenNewTab')
    },
    getAllDiscountList () {
      this.getDiscountPrequest.pDistrict = this.baseNosaziCode.District
      this.getDiscountPrequest.pRegion = this.baseNosaziCode.Region
      this.getDiscountPrequest.pBlock = this.baseNosaziCode.Block
      this.getDiscountPrequest.pHouse = this.baseNosaziCode.House
      this.getDiscountPrequest.pBuilding = this.baseNosaziCode.Building
      this.getDiscountPrequest.pApartment = this.baseNosaziCode.Apartment
      this.getDiscountPrequest.pShop = this.baseNosaziCode.Shop

      this.$q.loading.show()
      this.$services.SC.getAllDiscountList(this.getDiscountPrequest, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.$q.loading.hide()

          this.loadResult = this.getResponse(response.data)

          // console.log('///this.loadResult', this.loadResult)

          const NosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: NosaziCode,
            bizCodeTitle: 'NosaziCode'
          })
          // if (response.data.BizErrors.length === 0) {
          //   this.showSuccess('عملیات با موفقیت انجام شد')

          //   this.goToReadonlyMode()
          // }
        })
        .catch((ex) => {
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    },
    nosaziChanged (e) {
      this.getBaseLibInNosaziCode()

      // console.log('///NosaziChanged', e)
    },
    getBaseLibInNosaziCode () {
      this.getBaseLibPrequest.pNosaziCode.District = this.baseNosaziCode.District
      this.getBaseLibPrequest.pNosaziCode.Region = this.baseNosaziCode.Region
      this.getBaseLibPrequest.pNosaziCode.Block = this.baseNosaziCode.Block
      this.getBaseLibPrequest.pNosaziCode.House = this.baseNosaziCode.House
      this.getBaseLibPrequest.pNosaziCode.Building = this.baseNosaziCode.Building
      this.getBaseLibPrequest.pNosaziCode.Apartment = this.baseNosaziCode.Apartment
      this.getBaseLibPrequest.pNosaziCode.Shop = this.baseNosaziCode.Shop

      this.$q.loading.show()
      this.$services.SA.getBaseLibInNosaziCode(this.getBaseLibPrequest, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.$q.loading.hide()

          this.baseOwner = this.getResponse(response.data).data.Base_Owner
          const NosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: NosaziCode,
            bizCodeTitle: 'NosaziCode'
          })
          // console.log('///this.baseOwner', this.baseOwner)
        })
        .catch((ex) => {
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    }
  }
}
</script>
