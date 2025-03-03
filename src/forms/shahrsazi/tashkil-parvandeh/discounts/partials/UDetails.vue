<template>
  <fit>
    <safa-status :result="saveResult" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="نام و نام خانوادگی"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.RequesterName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره ملی"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.NationalCode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ایثارگری"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.RayanehCode"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_Sara8Sys_DiscountType"
          domainName="Analysis"
          input-debounce="0"
          label="نوع تخفیف"
          :m="m"
          label-width="90px"
          v-model="
            savePrequest.pObj.Sara8Sys_DiscountInfo.CI_Sara8Sys_DiscountType
          "
          @input="selectedChanged"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_Sara8Sys_SacrificeRelation"
          domainName="Analysis"
          input-debounce="0"
          label="وابستگی"
          :m="m"
          label-width="90px"
          v-model="
            savePrequest.pObj.Sara8Sys_DiscountInfo
              .CI_Sara8Sys_SacrificeRelation
          "
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره وارده"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.PresentationLetterNo"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          placeholder="تاریخ دبیرخانه"
          label="تاریخ دبیرخانه"
          :m="m"
          label-width="90px"
          v-model="
            savePrequest.pObj.Sara8Sys_DiscountInfo.PresentationLetterDate
          "
        />
      </FormControl>
      <FormControl v-if="isShowAsirElements">
        <safa-combo
          ciName=""
          domainName="Analysis"
          input-debounce="0"
          label="محل خدمت"
          @input="selectedChanged"
        />
      </FormControl>
      <FormControl v-if="isShowAsirElements">
        <safa-text
          label="مدت حضور در جبهه(ماه)"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.WarDuration"
        />
      </FormControl>
      <FormControl v-if="isShowAzadehElements">
        <safa-text
          label="مدت حضور در جبهه(ماه)"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.WarDuration"
        />
      </FormControl>
      <FormControl v-if="isShowRazmandehElements">
        <safa-text
          label="مدت حضور در جبهه(ماه)"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.WarDuration"
        />
      </FormControl>
      <FormControl v-if="isShowIsargariElements">
        <safa-text
          label="درصد ایثارگری"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.Percentage"
        />
      </FormControl>
      <FormControl v-if="isShowIsargariElements">
        <safa-text
          label="تعداد روز"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.Percentage"
        />
      </FormControl>
      <FormControl v-if="isShowJanbazElements">
        <safa-text
          label="درصد جانبازی"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.Percentage"
        />
      </FormControl>
      <FormControl v-if="isShowJanbazElements">
        <safa-text
          label="مدت حضور در جبهه(ماه)"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.WarDuration"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کاربر"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.UserName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تاریخ"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.EnterDate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ساعت"
          :m="m"
          label-width="90px"
          v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.EnterTime"
        />
      </FormControl>
    </FormRow>
    <expantion-section
      default-opened
      v-model="expansionState"
      title="لیست ایثارگران"
    >
      <safa-datatable
        title="لیست ایثارگران موجود با نام مشابه"
        v-model="savePrequest.pObj.Sara8Sys_DiscountList"
        helper="DiscountListSacrificers"
        m="r"
        height="100%"
        max-height="100%"
        min-height="100%"
        :allowMultipleSelection="true"
      />
      <div class="col-auto flex justify-end q-mt-sm">
        <btn-default label="انتخاب"></btn-default>
      </div>
    </expantion-section>
    <safa-datatable
      :m="m"
      label-width="90px"
      v-model="savePrequest.pObj.Sara8Sys_DiscountDetails"
      helper="discountDetails"
      height="100%"
      max-height="100%"
      min-height="100%"
      @row-click="selectedRow"
    />
    <text-template
      label="توضیحات"
      formKey="A9F7F491-E1E1-44F6-AFCF-2E6F5032C03F"
      :m="m"
      label-width="90px"
      v-model="savePrequest.pObj.Sara8Sys_DiscountInfo.Comments"
      class="q-my-sm"
    />
  </fit>
</template>
<script>
import saveAllDiscountPrequest from "src/models/saveAllDiscountPrequest"
import emptySaveAllDiscountPrequest from "src/models/emptySaveAllDiscountPrequest"
import baseFormMixin from "src/mixins/baseFormMixin.js"
const defaultModel = {
  ...emptySaveAllDiscountPrequest }
export default {
  data () {
    return {
      expansionState: true,
      labelShrink: false,
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: true,
      items: [],
      // savePrequest: saveAllDiscountPrequest,
      savePrequest: { ...defaultModel },
      // changeStatusPrequest: {
      //   pNidD: "ae67f5be-e218-4139-bef8-639807ed65be"
      // },
      isShowJanbazElements: false, // ID = 3
      isShowAsirElements: false, // ID = 4
      isShowAzadehElements: false, // ID = 5
      isShowRazmandehElements: false, // ID = 6
      isShowIsargariElements: false, // ID = 7
      loadDiscountByNidDPrequest: {
        pRayanehCode: null,
        pNationalCode: null,
        pRequesterName: null,
        pDistrict: 0,
        pRegion: 0,
        pBlock: 0,
        pHouse: 0,
        pBuilding: 0,
        pApartment: 0,
        pShop: 0,
        pFromRow: 0,
        pToRow: 0
      },
      saveResult: null
    }
  },
  mixins: [baseFormMixin],
  props: {
    editMode: {
      type: String,
      default: "e"
    },
    discountDetail: Object,
    isNew: {
      type: Boolean,
      default: false
    },
    formKey: String,
    title: String,
    name: String,
    m: String
  },
  mounted () {
    if (this.isNew) {
      debugger
      // this.savePrequest = { ...defaultModel }
      this.reset()
    } else if (!this.isNew) {
      this.savePrequest = saveAllDiscountPrequest
    }
    this.loadSelectedData()
    this.isEditable = true
  },
  methods: {
    selectedRow (row) {
      this.$emit("selectedRow", row)
    },
    isargariBlur (e) {
      this.showLoading()
      this.loadDiscountByNidDPrequest.pRequesterName =
        this.savePrequest.pObj.Sara8Sys_DiscountInfo.RequesterName
      this.loadDiscountByNidDPrequest.pNationalCode =
        this.savePrequest.pObj.Sara8Sys_DiscountInfo.NationalCode
      this.$services.SC.getAllDiscountList(this.loadDiscountByNidDPrequest, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          const similarIsargar = this.getResponse(response.data).data

          await this.log({
            action: this.logActions.view,
            bizCode: this.loadDiscountByNidDPrequest.pNationalCode.toString(),
            bizCodeTitle: "NationalCode"
          })
          this.savePrequest.pObj.Sara8Sys_DiscountDetails =
            similarIsargar.Sara8Sys_DiscountList
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadSelectedData () {
      if (this.discountDetail != null) {
        saveAllDiscountPrequest.pObj.Sara8Sys_DiscountDetails =
          this.discountDetail.Sara8Sys_DiscountDetails
        saveAllDiscountPrequest.pObj.Sara8Sys_DiscountInfo =
          this.discountDetail.Sara8Sys_DiscountInfo
        saveAllDiscountPrequest.pObj.NidD = this.discountDetail.NidD
      } else {
        saveAllDiscountPrequest.pObj = {
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          },
          Sara8Sys_DiscountInfo: {},
          Sara8Sys_DiscountDetails: [],
          Sara8Sys_DiscountList: []
        }
      }
    },

    normalizeRows () {
      return this.savePrequest.pObj.Sara8Sys_DiscountDetails.map((m) => {
        return {
          ...m,
          Apartment: m.Apartment || 0,
          Block: m.Block || 0,
          Building: m.Building || 0,
          CI_City: m.CI_City || 0,
          CI_Sara8Sys_ExemptionType: m.CI_Sara8Sys_ExemptionType || 0,
          CI_Sara8Sys_ImpositionType: m.CI_Sara8Sys_ImpositionType || 0,
          DiscountValue: m.DiscountValue || null,
          DiscountYear: m.DiscountYear || 0,
          District: m.District || 0,
          DoneDate: m.DoneDate || null,
          DoneTime: m.DoneTime || null,
          House: m.House || 4,
          InstallmentCount: m.InstallmentCount || 0,
          IsDone: m.IsDone || null,
          NidD: m.NidD || "00000000-0000-0000-0000-000000000000",
          NidDD: m.NidDD || "00000000-0000-0000-0000-000000000000",
          NidWorkItem: m.NidWorkItem || null,
          Region: m.Region || 0,
          Shop: m.Shop || 0,
          SuggestedDiscountValue: m.SuggestedDiscountValue || 0,
          MinTahatorPrice: m.MinTahatorPrice || 0,
          NidProc: m.NidProc || "00000000-0000-0000-0000-000000000000",
          FirstConfirmNidUser:
            m.FirstConfirmNidUser || "00000000-0000-0000-0000-000000000000",
          SecondConfirmNidUser:
            m.SecondConfirmNidUser || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    async saveAllDiscount () {
      this.showLoading()
      this.savePrequest.pObj.Sara8Sys_DiscountDetails = this.normalizeRows()

      const discountInfo = this.savePrequest.pObj.Sara8Sys_DiscountInfo
      discountInfo.CI_Sara8Sys_DiscountType =
        discountInfo.CI_Sara8Sys_DiscountType || null
      discountInfo.CI_Sara8Sys_LocationForDiscountType =
        discountInfo.CI_Sara8Sys_LocationForDiscountType || null
      discountInfo.CI_Sara8Sys_SacrificeRelation =
        discountInfo.CI_Sara8Sys_SacrificeRelation || null
      discountInfo.PresentationLetterNo =
        discountInfo.PresentationLetterNo || 0
      try {
        const { data } = await this.$services.SC.saveAllDiscount(
          this.savePrequest,
          {
            config: {
              District: 1
            }
          }
        )
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.savePrequest.pObj.NidD,
            bizCodeTitle: "NidD"
          })
          this.isEditable = false
          this.showSuccess("عملیات با موفقیت انجام شد")
          // this.reset()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    reset () {
      let d = {
        'pObj': {
          'ErrorResult': {
            'BizErrors': [],
            'Requirements': null
          },
          'NidD': '00000000-0000-0000-0000-000000000000',
          'Sacrifice_List_Count': '0',
          'Sara8Sys_DiscountDetails': [],
          'Sara8Sys_DiscountInfo': {
            'CI_Sara8Sys_DiscountType': '',
            'CI_Sara8Sys_LocationForDiscountType': null,
            'CI_Sara8Sys_SacrificeRelation': '',
            'Comments': '',
            'EnterDate': null,
            'EnterTime': null,
            'EumDiscountRowStatus': '0',
            'LocationForDiscountType': null,
            'NationalCode': '',
            'NidD': '00000000-0000-0000-0000-000000000000',
            'NidUser': '00000000-0000-0000-0000-000000000000',
            'Percentage': null,
            'PresentationLetterDate': '',
            'PresentationLetterNo': '',
            'RayanehCode': '',
            'RequesterName': '',
            'UserName': '',
            'WarDuration': null
          },
          'Sara8Sys_DiscountList': null
        },
        'pCheckNationalCodeInSave': 'false',
        'pUser': {
          'JobLocationGuid': '00000000-0000-0000-0000-000000000000',
          'JobLocationName': '00000000-0000-0000-0000-000000000000',
          'JobLocationOfficeTel': null,
          'UserGroups': null,
          'UserGuid': '00000000-0000-0000-0000-000000000000',
          'UserName': ''
        },
        'pDtoWorkflowData': {
          'StateName': null,
          'WorkflowGuid': '00000000-0000-0000-0000-000000000000'
        },
        'IsEdit': 'false'
      }
      // debugger
      // this.emptySaveAllDiscountPrequest = { ...saveAllDiscountPrequest }\\
      // this.savePrequest = { ...defaultModel }
      this.savePrequest = d
    },
    async changeStatus (pNidD) {
      this.showLoading()
      try {
        const { data } = await this.$services.SC.deleteAllDiscount(pNidD)
        this.sendTextRes = this.getResponse(data)
        if (this.sendTextRes.success) {
          this.showSuccess("تغییر وضعیت به حذف شده با موفقیت انجام شد")
          await this.log({
            action: this.logActions.view,
            bizCode: this.changeStatusPrequest.pNidD,
            bizCodeTitle: "pNidD"
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    selectedChanged (e) {
      if (e === 1 || e === 2) {
        this.isShowJanbazElements = false // ID = 3
        this.isShowAsirElements = false // ID = 4
        this.isShowAzadehElements = false // ID = 5
        this.isShowRazmandehElements = false // ID = 6
        this.isShowIsargariElements = false // ID = 7
      } else if (e === 3) {
        this.isShowJanbazElements = true // ID = 3
        this.isShowAsirElements = false // ID = 4
        this.isShowAzadehElements = false // ID = 5
        this.isShowRazmandehElements = false // ID = 6
        this.isShowIsargariElements = false // ID = 7
      } else if (e === 4) {
        this.isShowJanbazElements = false // ID = 3
        this.isShowAsirElements = true // ID = 4
        this.isShowAzadehElements = false // ID = 5
        this.isShowRazmandehElements = false // ID = 6
        this.isShowIsargariElements = false // ID = 7
      } else if (e === 5) {
        this.isShowJanbazElements = false // ID = 3
        this.isShowAsirElements = false // ID = 4
        this.isShowAzadehElements = true // ID = 5
        this.isShowRazmandehElements = false // ID = 6
        this.isShowIsargariElements = false // ID = 7
      } else if (e === 6) {
        this.isShowJanbazElements = false // ID = 3
        this.isShowAsirElements = false // ID = 4
        this.isShowAzadehElements = false // ID = 5
        this.isShowRazmandehElements = true // ID = 6
        this.isShowIsargariElements = false // ID = 7
      } else if (e === 7) {
        this.isShowJanbazElements = false // ID = 3
        this.isShowAsirElements = false // ID = 4
        this.isShowAzadehElements = false // ID = 5
        this.isShowRazmandehElements = false // ID = 6
        this.isShowIsargariElements = true // ID = 7
      }
    }
  },
  watch: {
    discountDetail: {
      handler () {
        this.loadSelectedData()
      },
      deep: true
    }
  }
}
</script>
