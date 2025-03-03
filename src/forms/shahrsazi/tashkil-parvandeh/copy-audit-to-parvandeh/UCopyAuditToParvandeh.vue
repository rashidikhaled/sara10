<template>
  <safa-form :id="formKey" :caption="title" app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B">
    <form-wrapper title="کپی اطلاعات ممیزی به تشکیل پرونده">
      <safa-status :result="result" />
      <safa-status :result="resultTransform" />
      <fit >
        <FormRow :lg="2" :xs="2" :sm="2" :md="2" :xl="2" class="q-mb-sm">
          <FormControl>
            <nosazi-code-input label="کد ممیزی" actions v-model="baseNosaziCodeAudit" @enter="handleBaseNosaziCodeChanged"
            :labelWidth="labelWidth" />
          </FormControl>
          <FormControl>
            <nosazi-code-input label="کد تشکیل پرونده"   m="r" actions v-model="baseNosaziCodeParvandeh"
              :labelWidth="labelWidth" />
          </FormControl>
        </FormRow>
        <safa-tabs v-model="activeTab" v-show="showMainTabState">
          <template v-slot:tabs>
            <tab-menu name="copyInformation" label="مقایسه و کپی اطلاعات" v-if="formState.copy" />
            <tab-menu name="copyInformationByTree" label="مقایسه و کپی اطلاعات - با درختواره"
              v-if="formState.copyByTree" />
            <tab-menu name="payoffYear" label="تغییر سال تسویه" v-if="formState.payoffYear" />
            <tab-menu name="contrast" label="مغایریت اطلاعات ممیزی و تشکیل پرونده" v-if="formState.contrast" />
          </template>
          <tab-content v-if="formState.copy" name="copyInformation" title="مقایسه و کپی اطلاعات">
            <copy-information v-bind="passedProps" :formKey="formKey" :title="title" :name="name"
              :baseNosaziCodeAudit="baseNosaziCodeAudit" ref="copyInformation" />
          </tab-content>
          <tab-content name="copyInformationByTree" title="مقایسه و کپی اطلاعات - با درختواره"
            v-if="formState.copyByTree">
            <copy-information-by-tree  v-bind="passedProps" :formKey="formKey" :title="title" :name="name"
              :baseNosaziCodeAudit="baseNosaziCodeAudit"
              :baseLibInNosaziCodeAudit="baseLibInNosaziCodeAudit"
               ref="copyInformationByTree" />
          </tab-content>
          <tab-content name="payoffYear" title="تغییر سال تسویه" v-if="formState.payoffYear">
            <payoff-year v-bind="passedProps" :formKey="formKey" :title="title" :name="name"
              :baseNosaziCodeAudit="baseNosaziCodeAudit" ref="payoffYear" />
          </tab-content>
          <tab-content name="contrast" title="مغایریت اطلاعات ممیزی و تشکیل پرونده" v-if="formState.contrast">
            <contrast v-bind="passedProps" :formKey="formKey" :title="title" :name="name"
              :baseNosaziCodeAudit="baseNosaziCodeAudit" ref="contrast" />
          </tab-content>
        </safa-tabs>
      </fit>

      <template v-slot:footer>
        <button-group height="30px">
          <btn-default key="k1" label="مقایسه و کپی اطلاعات" :disable="!actionState.copy"
            @click="onformState('copy')" />
          <btn-default key="k2" label="مقایسه و کپی اطلاعات - با درختواره" :disable="!actionState.copyByTree"
            @click="onformState('copyByTree')" />

          <btn-default spId="f21f2965-2f7a-4a48-880f-6c4295c44015" spCaption="انتقال کد" key="k3" label="انتقال کد"
            @click="handleTransformCode" />

          <btn-default spId="c4517079-fd4d-484a-95c1-f5496345c607" spCaption="انتقال کامل" key="k4" label="انتقال کامل"
            @click="handlePerfectTransformCode" />

          <btn-default key="k5" label="تغییر سال تسویه" :disable="!actionState.payoffYear"
            @click="onformState('payoffYear')" spId="c0d9b9d1-a514-4dca-ac9b-61af3305bc00"
            spCaption="تغییر سال تسویه" />
          <btn-default key="k6" label="مغایرت" :disable="!actionState.contrast" @click="onformState('contrast')" />
        </button-group>
      </template>
      <!-- <safa-popup
        title="مقایسه و کپی اطلاعات"
        v-model="formState.copy"
        vertical
        width='900px'
        height="600px"
      >
        <copy-information
          v-bind="passedProps"
          :formKey="formKey"
          :title="title"
          :name="name"
          :baseNosaziCodeAudit="baseNosaziCodeAudit"
          ref="copyInformation"
        />

      </safa-popup> -->
      <!-- <safa-popup
        title="مقایسه و کپی اطلاعات - با درختواره"
        v-model="formState.copyByTree"
        vertical
        width='900px'
        height="600px"
      >
        <copy-information-by-tree
          v-bind="passedProps"
          :formKey="formKey"
          :title="title"
          :name="name"
          :baseNosaziCodeAudit="baseNosaziCodeAudit"
          ref="copyInformationByTree"
        />
      </safa-popup> -->
      <!-- <safa-popup
        v-model="formState.payoffYear"
        title="تغییر سال تسویه"
        width='500px'
        height="400px"
      >

        <payoff-year
          v-bind="passedProps"
          :formKey="formKey"
          :title="title"
          :name="name"
          :baseNosaziCodeAudit="baseNosaziCodeAudit"
            ref="payoffYear"
        />
      </safa-popup> -->
      <!-- <safa-popup
        title="مغایریت اطلاعات ممیزی و تشکیل پرونده"
        v-model="formState.contrast"
        vertical
        :padding="false"
      >
        <contrast
          v-bind="passedProps"
          :formKey="formKey"
          :title="title"
          :name="name"
          :baseNosaziCodeAudit="baseNosaziCodeAudit"
          ref="contrast"
        />

      </safa-popup> -->
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseLibInNosaziCodeModel from './models/baseLibInNosaziCodeModel'
import momayeziConnectToParvandehModel from './models/momayeziConnectToParvandehList'
import CopyInformation from './partials/CopyInformation'
import CopyInformationByTree from './partials/CopyInformationByTree'
import PayoffYear from './partials/PayoffYear'
import Contrast from './partials/Contrast'
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/copy-audit-to-parvandeh',
  mixins: [baseFormMixin, loaderMixin],
  components: {
    CopyInformation,
    CopyInformationByTree,
    PayoffYear,
    Contrast
  },
  data () {
    return {
      title: 'شهرسازی- کپی اطلاعات ممیزی به تشکیل پرونده',
      formKey: '77c636e1-1b8d-4f12-a19e-8511b2cb98bf',
      name: 'UCopyAuditToParvandeh',
      main: true,
      showMainTab: false,
      activeTab: "copyInformation",
      result: null,
      result2: null,
      resultTransform: null,
      momayeziConnectToParvandehList: { ...momayeziConnectToParvandehModel },
      baseLibInNosaziCodeAudit: { ...baseLibInNosaziCodeModel },
      baseLibInNosaziCodeParvandeh: { ...baseLibInNosaziCodeModel },
      baseNosaziCodeAudit: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseNosaziCodeParvandeh: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 1,
        IsRoot: false
      },
      formState: {
        copy: false,
        copyByTree: false,
        transform: false,
        perfectTransform: false,
        payoffYear: false,
        contrast: false
      },
      labelWidth: 'width:80px'
    }
  },

  computed: {
    showMainTabState () {
      if (this.showMainTab && Object.values(this.formState).some(value => value === true)) {
        return true
      } else {
        return false
      }
    },
    config () {
      return {
        config: {
          District: this.baseNosaziCodeAudit.District
        }
      }
    },
    isValidNosaziCode () {
      return !!this.baseNosaziCodeParvandeh.District
    },
    actionState () {
      return {
        copy: this.isValidNosaziCode,
        copyByTree: this.isValidNosaziCode,
        transform: this.isValidNosaziCode,
        perfectTransform: this.isValidNosaziCode,
        payoffYear: true,
        contrast: this.isValidNosaziCode
      }
    },
    passedProps () {
      return {
        hideTitle: true,
        baseLibInNosaziCodeAudit: this.baseLibInNosaziCodeAudit,
        baseLibInNosaziCodeParvandeh: this.baseLibInNosaziCodeParvandeh
      // baseNosaziCodeAudit: this.baseNosaziCodeAudit,
      // baseNosaziCodeParvandeh: this.baseNosaziCodeParvandeh
      }
    }
  },

  methods: {
    onformState (state) {
      switch (state) {
        case "copy":
          this.formState.copy = true
          this.formState.copyByTree = false
          this.formState.transform = false
          this.formState.perfectTransform = false
          this.formState.payoffYear = false
          this.formState.contrast = false
          this.activeTab = "copyInformation"
          break
        case "copyByTree":
          this.formState.copy = false
          this.formState.copyByTree = true
          this.formState.transform = false
          this.formState.payoffYear = false
          this.formState.contrast = false
          this.formState.perfectTransform = false
          this.activeTab = "copyInformationByTree"
          break
        case "payoffYear":
          this.formState.copy = false
          this.formState.copyByTree = false
          this.formState.transform = false
          this.formState.perfectTransform = false
          this.formState.payoffYear = true
          this.formState.contrast = false
          this.activeTab = "payoffYear"
          break
        case "contrast":
          this.formState.copy = false
          this.formState.copyByTree = false
          this.formState.transform = false
          this.formState.perfectTransform = false
          this.formState.payoffYear = false
          this.formState.contrast = true
          this.activeTab = "contrast"
          break
        default:
          break
      }
    },
    handleBaseNosaziCodeChanged () {
      this.showMainTab = true
      this.showLoading()
      this.momayeziConnectToParvandehList = {
        ...momayeziConnectToParvandehModel
      }
      this.baseLibInNosaziCodeParvandeh = { ...baseLibInNosaziCodeModel }
      this.baseNosaziCodeParvandeh = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }

      this.$services.SA.getBaseLibInNosaziCode(
        {
          pNosaziCode: {
            ...this.baseNosaziCodeAudit,
            ...this.options,
            NidUser: this.getNidUser()
          },
          pIsLoadDeletedNosaziCode: false
        },
        this.config
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.baseLibInNosaziCodeAudit = this.result.data
            const nidNosaziCode = this.baseLibInNosaziCodeAudit['_NidNosaziCode']
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCodeAudit
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
            return this.$services.SC.getMomayeziConnectToParvandehList(
              {
                pFromRow: 0,
                pToRow: 1,
                pWhere: ` NidNosaziCode_Momayezi = '${nidNosaziCode}' `
              },
              this.config
            )
          } else {
            this.showError('کد نوسازی ممیزی معتبر نمیباشد')
          }
        })
        .then(async ({ data }) => {
          this.result2 = this.getResponse(data)
          if (this.result2.success) {
            const list = this.result2.data['MomayeziConnectToParvandehList']
            if (list && list.length) {
              this.momayeziConnectToParvandehList = list[0]
              this.baseNosaziCodeParvandeh = {
                District: this.momayeziConnectToParvandehList
                  .District_Parvandeh,
                Region: this.momayeziConnectToParvandehList.Region_Parvandeh,
                Block: this.momayeziConnectToParvandehList.Block_Parvandeh,
                House: this.momayeziConnectToParvandehList.House_Parvandeh,
                Building: this.momayeziConnectToParvandehList
                  .Building_Parvandeh,
                Apartment: this.momayeziConnectToParvandehList
                  .Apartment_Parvandeh,
                Shop: this.momayeziConnectToParvandehList.Shop_Parvandeh
              }

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCodeAudit
              )

              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی',
                nosaziCode: strNosaziCode
              })

              return this.$services.SA.getBaseLibInNosaziCode(
                {
                  pNosaziCode: {
                    ...this.baseNosaziCodeParvandeh,
                    EumNosaziCodeGroup: 0,
                    EumNosaziCodeObjType: 0,
                    NidUser: this.currentUser.NidUser
                  },
                  pLoadFunc:
                  'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
                  pIsLoadDeletedNosaziCode: false
                },
                this.config
              )
            }
          // else {
          //   this.showError('کد متصل به ممیزی یافت نشد')
          // }
          } else {
            this.showError('کد متصل به ممیزی بارگذاری نشد')
          }
        })
        .then(async ({ data }) => {
          this.result3 = this.getResponse(data)
          if (this.result3.success) {
            this.baseLibInNosaziCodeParvandeh = this.result3.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCodeAudit
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          } else {
            this.serverError()
          }
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleTransformCode () {
      this.showConfirm(
        'آیا از انتقال کد نوسازی فعلی به کد جدید اطمینان دارید؟'
      ).onOk(() => {
        this.showLoading()
        this.$services.SC.addNosaziCodeFromMomayeziInParvandeh(
          {
            pFromNosaziCode: this.baseLibInNosaziCodeAudit['MainObj'],
            pToNosaziCode: this.baseLibInNosaziCodeParvandeh['MainObj']
          },
          this.config
        )
          .then(async ({ data }) => {
            this.resultTransform = this.getResponse(data)
            if (this.resultTransform.success) {
              this.showSuccess(
                'کد نوسازی باموفقیت اضافه شد. اقدام برای تغییر...'
              )

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCodeAudit
              )

              await this.log({
                action: this.logActions.save,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی',
                nosaziCode: strNosaziCode
              })

              return this.$services.SC.changeNosaziCode({
                pFromNosaziCode: this.baseLibInNosaziCodeAudit['MainObj'],
                pToNosaziCode: this.baseLibInNosaziCodeParvandeh['MainObj'],
                UserInfo: this.currentUser,
                pIsChangeNosaziCodeInSubSystems: false
              })
            }
          })
          .then(async ({ data }) => {
            this.resultTransform = this.getResponse(data)
            if (this.resultTransform.success) {
              this.showSuccess('عملیات با موفقیت انجام شد')

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCodeAudit
              )

              await this.log({
                action: this.logActions.save,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی',
                nosaziCode: strNosaziCode
              })
            }
          })
          .catch(() => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    handlePerfectTransformCode () {
      this.showConfirm(
        'آیا از انتقال کامل کد نوسازی فعلی به کد جدید اطمینان دارید؟'
      ).onOk(() => {
        this.showLoading()
        this.$services.SC.transferAllNosaziCode(
          {
            pFromNosaziCode: this.baseLibInNosaziCodeAudit['MainObj'],
            pToNosaziCode: this.baseLibInNosaziCodeParvandeh['MainObj'],
            UserInfo: this.currentUser,
            pIsChangeNosaziCodeInSubSystems: false
          },
          this.config
        )
          .then(async ({ data }) => {
            this.resultTransform = this.getResponse(data)
            if (this.resultTransform.success) {
              this.showSuccess('عملیات با موفقیت انجام شد')

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCodeAudit
              )

              await this.log({
                action: this.logActions.save,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی',
                nosaziCode: strNosaziCode
              })
            }
          })
          .catch(() => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
