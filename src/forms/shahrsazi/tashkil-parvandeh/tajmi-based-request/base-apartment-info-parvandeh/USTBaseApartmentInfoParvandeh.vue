<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <fit>
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <safa-status :result="requestResult" />
    <safa-status :result="copyRequestResult" />
    <safa-tabs
      v-model="currentTab"
      height="100%"
      class="fit"
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
        name="apartmentInfo"
        title="مشخصات آپارتمان"
      >
        <TabBaseApartment
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="baseOwners"
        title="مشخصات ثبتی و مالکین"
      >
        <TabBaseOwner
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="baseUsing"
        title="نوع استفاده"
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
          :name="name"
          :title="title"
          :formKey="formKey"
        />
      </tab-content>
      <tab-content
        name="baseCommons"
        title="مشاعات"
        :padding="false"
      >
        <TabBaseCommons
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="baseParking"
        title="پارکینگ"
      >
        <TabBaseParkings
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="baseOther"
        title="سایر"
        :padding="false"
      >
        <TabBaseOther
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="baseArchive"
        title="سوابق"
      >
        <TabBaseArchive
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>
      <tab-content
        name="comments"
        title="توضیحات"
      >
        <TabBaseComment
          v-model="currentData"
          v-bind="passedProps"
        />
      </tab-content>

    </safa-tabs>

    <form-actions
      class="q-pb-sm q-pl-sm"
      v-if="!readOnly"
      :m="mode"
      @edit="handleEdit"
      @save="save"
      @cancel="handleCancel"
    >
      <template #after>
        <btn-default
          label="کپی به مجاز پایانکار"
          @click="handleCopyToMojazPayankar"
        />
        <btn-default
          label="کپی اطلاعات"
          @click="isShowCopyDataModal = true"
        />
        <btn-default label="گزارش" />
      </template>
    </form-actions>
    <ShowModal
      title="کپی اطلاعات تشکیل پرونده"
      v-model="isShowCopyDataModal"
      width="200px"
      height="180px"
    >
      <div class="row  justify-center">
        <div class="col-auto">
          <nosazi-code-input
            v-model="baseNosaziCode"
            label="کد نوسازی مقصد"
            @input="handleBaseNosaziCodeChanged"
          />
        </div>
      </div>
      <template v-slot:footer>
        <div class="row q-gutter-x-sm">
          <btn-default
            @click="handleCopyAction"
            label="کپی"
            :disabled="disableCopyBtn"
          />

        </div>
      </template>
    </ShowModal>
  </fit>
 </safa-form>
</template>

<script>
import apartmentRequestModel from './models/apartmentRequest'
import TabBaseApartment from './partials/TabBaseApartment'
import TabBaseOwner from './partials/TabBaseOwner'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabBaseCommons from './partials/TabBaseCommons'
import TabBaseParkings from './partials/TabBaseParkings'
import TabBaseOther from './partials/TabBaseOther'
import TabBaseArchive from './partials/TabBaseArchive'
import TabBaseComment from './partials/TabBaseComment'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseApartmentInfoParvandeh',
  mixins: [baseFormMixin],
  components: {
    TabBaseApartment,
    TabBaseOwner,
    TabBaseUsing,
    TabBaseFront,
    TabBaseCommons,
    TabBaseParkings,
    TabBaseOther,
    TabBaseArchive,
    TabBaseComment
  },

  props: {
    parentBaseNosaziCode: Object,
    value: Object,
    readOnly: Boolean,
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
    mainNosaziCodeInfo: Object
  },

  data () {
    return {
      isShowCopyDataModal: false,
      result: null,
      resultSave: null,
      currentTab: 'apartmentInfo',
      currentData: { ...apartmentRequestModel },
      tabs: [
        {
          name: 'apartmentInfo',
          title: ' مشخصات آپارتمان'
        },
        {
          name: 'baseOwners',
          title: 'مشخصات ثبتی و مالکین'
        },
        {
          name: 'baseUsing',
          title: 'نوع استفاده'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگی ها'
        },
        {
          name: 'baseCommons',
          title: ' مشاعات'
        },
        {
          name: 'baseParking',
          title: 'پارکینگ'
        },
        {
          name: 'baseOther',
          title: 'سایر'
        },
        {
          name: 'baseArchive',
          title: 'سوابق'
        },
        {
          name: 'comments',
          title: 'توضیحات'
        }
      ],
      requestResult: null,
      copyRequestResult: null,
      baseLibResults: { MainObj: {} },
      disableCopyBtn: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.value.District
        }
      }
    },
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    handleBaseNosaziCodeChanged () {
      this.getBaseLibInNosaziCode()
    },
    getBaseLibInNosaziCode () {
      this.showLoading()
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            this.disableCopyBtn = false
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleCopyAction () {
      this.transferResult = null
      this.showConfirm('آیااز کپی اطلاعات اطمینان دارید؟').onOk(() => {
        this.copyInfo()
      })
    },
    copyInfo () {
      this.showLoading()
      let payLoad = {
        pFromNidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        pToNidBase: this.baseLibResults.MainObj.NidBase,
        pCount: 1,
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pFillGap: true
      }
      this.$services.SC.copy(payLoad)
        .then(({ data }) => {
          this.copyRequestResult = this.getResponse(data)

          if (this.copyRequestResult.success) {
            this.showSuccess('کپی اطلاعات با موفقیت انجام شد.')
            this.isShowCopyDataModal = false
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleEdit () {
      this.isEditable = true
      this.$emit('changeEditMode', this.isEditable)
    },
    handleCancel () {
      this.load()
      this.isEditable = false
      this.$emit('changeEditMode', this.isEditable)
    },
    handleCopyToMojazPayankar () {
      const handler = async () => {
        try {
          this.showSending()

          const { data } = await this.$services.SC.copyToMojazPayankar(
            {
              pFromNidBase: this.value.NidBase
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('کپی به مجاز پایانکار با موفقیت انجام شد')
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.value.NidBase,
              bizCodeTitle: 'NidBase',
              saveDesc: `کپی به مجاز پایانکار با موفقیت انجام گردید`
            })
          } else {
            this.showError('انجام نشد')
          }

          // end
        } catch (e) {
          this.showError('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        'آیا از کپی اطلاعات به مجاز پایانکار آپارتمان اطمینان دارید؟'
      ).onOk(handler)
    },

    async save () {
      if (!this.isValidForm()) return
      try {
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehApartment(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            PDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: '00000000-0000-0000-0000-000000000000'
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess('ذخیره با موفقیت انجام شد')
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: 'NidBase'
          })

          this.load()
        } else {
          this.showError('انجام نشد')
        }

        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      try {
        this.showLoading()

        const { data } = await this.$services.SC.getParvandehApartment(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              'Base_NosaziCode,Base_RegisterPlack,Base_Owner,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_Parking,Base_ApartmentInfo,Base_SharingInfrastructure,Base_OtherEquipment,Base_AddressInfo,Base_CommonEstate,Base_SubScription,Base_PreCodeInfo,Base_ShahrsaziArchive,Base_ShahrsaziArchiveHouse,Base_Attachment,MapImage,Base_File,Base_ResourceInfo,Base_AddressPostCode,Base_CommissionHistory,Base_Commission77History'
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.result.data.Base_Dig = this.result.data.Base_Dig || []
          this.currentData = this.result.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.NidBase,
            bizCodeTitle: 'NidBase'
          })
        } else {
          this.showError('انجام نشد')
        }

        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    this.currentData = { ...apartmentRequestModel }
  },
  mounted () {
    this.load()
  }
}
</script>
