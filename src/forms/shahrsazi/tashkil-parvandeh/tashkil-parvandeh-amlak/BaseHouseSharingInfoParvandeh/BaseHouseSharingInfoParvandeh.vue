<template>
  <fit>
    <safa-status :result="result" />
    <safa-status :result="resultSave" />

    <safa-tabs
      v-model="currentTab"
      class="fit"
      height="100%"
      :bordered="false"
    >
      <template v-slot:tabs>
        <tab-menu
          v-for="({name, title}) in tabs"
          :key="name"
          :name="name"
          :label="title"
        />
      </template>
      <tab-content
        name="address"
        title="آدرس"
      >
        <TabAddressAndRegisterPlaque
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="doc"
        title="توضیحات"
      >
        <TabDocumentInfo
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="baseOwner"
        title="مالکین و جهات اربعه"
        :padding="false"
      >
        <TabBaseOwnerAndBaseEdge
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="baseInfo"
        title="مشخصات فنی"
      >
        <TabBaseHouse
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="houseSharingInfo"
        title="مشخصات دستگاه"
      >
        <TabHouseSharingInfo
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="other"
        title="سایر مشخصات"
      >
        <TabOther
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="baseUsing"
        title="کاربری ها"
        :padding="false"
      >
        <TabBaseUsing
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="baseFront"
        title="پیشامدگی ها"
        :padding="false"
      >
        <TabBaseFront
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="baseParking"
        title="پارکینگ"
        :padding="false"
      >
        <TabParking
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="baseArchive"
        title="سوابق"
      >
        <TabArchive
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <tab-content
        name="engineer"
        title="مهندسین"
        :padding="false"
      >
        <TabEngineer
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

      <!-- <tab-content
        name="engineer"
        title="کروکی"
      >
        <TabEngineer
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content> -->

      <tab-content
        name="comment"
        title="توضیحات"
        :padding="false"
      >
        <TabComment
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
    </safa-tabs>

    <form-actions
      :m="mode"
      @edit="isEditable = true"
      @save="handleSaveAction"
      @cancel="load"
      class="q-pb-sm q-pl-sm"
    >
      <template #after>
        <btn-default
          label="کپی به مجاز پروانه"
          @click="handleCopyBuildingToMojazParvaneh"
        />
        <btn-default
          label="کپی از مجاز پروانه"
          @click="handleCopyFromMojazParvanehToBuildingParvandeh"
        />
        <btn-default
          label="کپی به مجاز پایانکار"
          @click="handleCopyToMojazPayankar"
        />
        <btn-default label="کپی اطلاعات" />
        <btn-default label="گزارش" @click="print"/>
      </template>
    </form-actions>
  </fit>
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
// import TabCroquie from './partials/TabCroquie'
import TabEngineer from './partials/TabEngineer'
import TabComment from './partials/TabComment'
import baseFormMixin from 'src/mixins/baseFormMixin'
//
export default {
  name: 'BaseHouseSharingInfoParvandeh',
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
    // TabCroquie,
    TabEngineer,
    TabComment
  },

  props: {
    value: Object,
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
    mainNosaziCodeInfo: Object,
    parentNosaziCode: Object
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'address',
      isView: false,
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
        // {
        //   name: 'croquie',
        //   title: 'کروکی'
        // },
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
    print () {
      const reportPath =
        '/Sara8Reports/RptHouseSharingInfo'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
        District: this.parentNosaziCode.District,
        NidNosaziCode: this.mainNosaziCodeInfo.MainObj.NidNosaziCode
      }
      this.showReport(reportPath, queryParams)
    },
    newGuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    handleSaveAction () {
      if (!this.isValidForm()) return
      this.showSending()
      for (let i = 0; i < this.currentData.Base_Owner.length; i++) {
        for (let j = 0; j < this.currentData.Base_Owner.length; j++) {
          const x = this.currentData.Base_Owner[i]
          const y = this.currentData.Base_Owner[j]
          if ((x.NidOwner === y.NidOwner || '00000000-0000-0000-0000-000000000000') && i !== j) {
          // return this.showError('تکراری NidOwner')
            y.NidOwner = this.newGuid()
          }
        }
      }
      this.currentData.Base_Owner = this.currentData.Base_Owner.map(x => {
        return {
          ...x,
          NidBase: x.isNew ? undefined : x.NidBase,
          NidOwner: x.isNew ? undefined : x.NidOwner,
          'ActDate': x.ActDate || null,
          'Address': '',
          'AyanDang': x.AyanDang || 0,
          'AyanHabeh': x.AyanHabeh || 0,
          'AyanImpart': x.AyanImpart || 0,
          'AyanSir': x.AyanSir || 0,
          'AyanTotalImpart': x.AyanTotalImpart || 0,
          'BirthDate': x.BirthDate || '',
          'BuildingNo': x.BuildingNo || 0,
          'NidOwnerBank': x.NidOwnerBank || null,
          'ToftDang': x.ToftDang || 0,
          'ToftHabeh': x.ToftHabeh || 0,
          'ToftImpart': x.ToftImpart || 0,
          'ToftSir': x.ToftSir || 0,
          DateCheckSabt: x.DateCheckSabt || null,
          EconomicID: x.EconomicID || null,
          'ToftTotalImpart': x.ToftTotalImpart || 0
        }
      })
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
            await this.log({
              action: this.logActions.save,
              bizCode: this.currentData._nidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: this.value.key
            })

            this.showSuccess('ذخیره با موفقیت انجام شد')
            this.load()
          }
        })
        .catch(response => {
          console.error('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleCopyBuildingToMojazParvaneh () {
      this.showConfirm('آیا از کپی اطلاعات به مجاز پروانه اطمینان دارید؟').onOk(
        () => {
          this.showSending()
          this.$services.SC.copyHouseSharingToMojazParvaneh(
            {
              pFromNidBase: this.value.NidBase
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
                await this.log({
                  action: this.logActions.copy,
                  bizCode: this.value.NidBase,
                  bizCodeTitle: 'NidBase',
                  nosaziCode: this.value.key
                })

                this.showSuccess('کپی به مجاز پروانه با موفقیت انجام شد')
              }
            })
            .catch(response => {
              console.error('error', response)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    },
    handleCopyFromMojazParvanehToBuildingParvandeh () {
      this.showConfirm(
        'آیا از کپی اطلاعات از مجاز پروانه به تشکیل پرونده دستگاه اطمینان دارید؟'
      ).onOk(() => {
        this.showSending()
        this.$services.SC.copyFromMojazParvanehToBuildingParvandeh(
          {
            pNidNosaziCode_Building: this.value.NidNosaziCode
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
              await this.log({
                action: this.logActions.copyFromMojazParvaneh,
                bizCode: this.value.NidNosaziCode,
                bizCodeTitle: 'NidNosaziCode',
                nosaziCode: this.value.key
              })

              this.showSuccess('کپی با موفقیت انجام شد')
            }
          })
          .catch(response => {
            console.error('error', response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    handleCopyToMojazPayankar () {
      this.showConfirm(
        'آیا از کپی اطلاعات به مجاز پایانکار دستگاه اطمینان دارید؟'
      ).onOk(() => {
        this.showSending()
        this.$services.SC.copyToMojazPayankar(
          {
            pFromNidBase: this.value.NidBase
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
              await this.log({
                action: this.logActions.copyToMojazPayankar,
                bizCode: this.value.NidBase,
                bizCodeTitle: 'NidBase',
                nosaziCode: this.value.key
              })

              this.showSuccess('کپی با موفقیت انجام شد')
            }
          })
          .catch(response => {
            console.error('error', response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
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
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.value.NidBas,
                bizCodeTitle: 'NidBase',
                nosaziCode: this.value.key
              })
            }
            this.isView = true
          }
        })
        .catch(response => {
          console.error('error', response)
          this.serverError()
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
