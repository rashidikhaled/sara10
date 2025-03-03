<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <safa-status :result="result"/>
    <safa-status :result="resultSave"/>
    <fit>
      <safa-tabs v-model="currentTab">
        <template v-slot:tabs>
          <tab-menu
            v-for="({name, title}) in tabs"
            :key="name"
            :name="name"
            :label="title"
          />
        </template>
        <tab-content name="address">
          <TabAddressAndRegisterPlaque
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="doc">
          <TabDocumentInfo
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="baseOwner">
          <TabBaseOwnerAndBaseEdge
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="baseInfo">
          <TabBaseHouse
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="houseSharingInfo">
          <TabHouseSharingInfo
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="other">
          <TabOther
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="baseUsing">
          <TabBaseUsing
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="baseFront">
          <TabBaseFront
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="baseParking">
          <TabParking
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="baseArchive">
          <TabArchive
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="croquie">
          <TabCroquie
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="engineer">
          <TabEngineer
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>

        <tab-content name="comment">
          <TabComment
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
      </safa-tabs>

      <form-actions
        v-if="!readOnly"
        :m="mode"
        @edit="isEditable = true"
        @save="handleSaveAction"
        @cancel="load"
        class="q-my-sm"
      />
    </fit>
  </safa-form>
</template>

<script>
import requestModel from './models/houseSharingRequest'
import TabAddressAndRegisterPlaque from './partials/TabAddressAndRegisterPlaque'
import TabDocumentInfo from './partials/TabDocumentInfo'
import TabBaseOwnerAndBaseEdge from './partials/TabBaseOwnerAndBaseEdge'
import TabBaseHouse from './partials/TabBaseHouse'
import TabHouseSharingInfo from './partials/TabHouseSharingInfo'
import TabOther from './partials/TabOther'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabParking from './partials/TabParking'
import TabArchive from './partials/TabArchive'
import TabCroquie from './partials/TabCroque.vue'
import TabEngineer from './partials/TabEngineer'
import TabComment from './partials/TabComment'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'BaseHouseSharingInfoAudit',
  mixins: [baseFormMixin],
  components: {
    TabAddressAndRegisterPlaque,
    TabDocumentInfo,
    TabBaseOwnerAndBaseEdge,
    TabBaseHouse,
    TabHouseSharingInfo,
    TabOther,
    TabBaseUsing,
    TabBaseFront,
    TabParking,
    TabArchive,
    TabCroquie,
    TabEngineer,
    TabComment
  },

  props: {
    value: Object,
    readOnly: Boolean,
    // formKey: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // title: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    name: {
      type: String,
      default: '',
      required: true
    }
  },

  data () {
    return {
      formKey: 'a4e1218f-89d0-4417-ab8d-00e81fd448b9',
      title: 'شهرسازی- اطلاعات ممیزی دستگاه',
      result: null,
      resultSave: null,
      main: true, // این فرم به صورت فرم اصلی هم در گردش کار استفاده شده برای همین این فید باید اضافه بشه

      currentTab: 'address',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'address',
          title: ' آدرس و پلاک ثبتی'
        },
        {
          name: 'doc',
          title: 'مشخصات سند'
        },
        {
          name: 'baseOwner',
          title: 'مالکین و جهات اربعه'
        },
        {
          name: 'baseInfo',
          title: 'مشخصات فنی'
        },
        {
          name: 'houseSharingInfo',
          title: 'مشخصات دستگاه'
        },
        {
          name: 'other',
          title: 'سایر مشخصات'
        },
        {
          name: 'baseUsing',
          title: ' کاربریها'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگیها'
        },
        {
          name: 'baseParking',
          title: 'پارکینگ'
        },
        {
          name: 'baseArchive',
          title: 'سوابق'
        },
        {
          name: 'engineer',
          title: 'مهندسین'
        },
        {
          name: 'croquie',
          title: 'کروکی'
        },
        {
          name: 'comment',
          title: 'توضیحات'
        }
      ]
    }
  },

  computed: {
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    handleSaveAction () {
      this.showSending()
      this.$services.SC.saveParvandehHouseSharing(
        {
          PObj: this.currentData,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.resultSave = this.getResponse(data)
          if (this.resultSave.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد')

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.load()
          } else {
            this.showError('انجام نشد')
          }
        })
        .catch(response => {
          this.resultSave = this.getResponse(response)
          this.showError('ذخیره انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    load () {
      this.isEditable = false
      this.showLoading()

      return this.$services.SC.getParvandehHouseSharing(
        {
          PNidBase: this.value.NidBase,
          PLoadFun:
            'Base_NosaziCode,Base_AddressInfo,Base_PreCodeInfo,Base_Edge,Base_BuildingInfo,Base_HouseInfo,Base_CommonEstate,Base_GreenSpace,Base_RegisterPlack,Base_Owner,Base_SubScription,Base_ShahrsaziArchive,Base_Door,Base_Scuttle,Base_Neighbor,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_OtherEquipment,Base_Attachment,Base_ControllerInfo,MapImage,Base_CommissionHistory,Base_AddressPostCode,Base_Parking,Base_SupplyParking,Base_Wall,Base_Commission77History'
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.currentData = this.result.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          } else {
            this.showError('انجام نشد')
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.showError('انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  created () {
    this.currentData = { ...requestModel }
  },
  mounted () {
    this.load()
  }
}
</script>
