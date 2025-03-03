<template>
  <safa-form :id="formKey" :caption="title">
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getBlackListWitCodeResults" />
        <safa-status :result="getBlackListResults" />
        <safa-status :result="saveBlackListRes" />
        <safa-status :result="deleteBlackListRes" />

        <div class="q-gutter-x-sm flex" v-show="blackListType === 1">
          <!-- <strong>مهندس:</strong> -->
          <p class="q-mb-none">
            {{ enginnerInfo.engName }}
            {{ enginnerInfo.engFamily }}
          </p>
        </div>

        <div class="q-gutter-x-sm flex" v-show="blackListType === 2">
          <!-- <strong>نام دفتر:</strong> -->
          <p class="q-mb-none">
            {{ officeInfo.officeName }}
          </p>
        </div>
        <formHeaderByNosaziCode
          v-show="blackListType === 3"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              domainName="engineer"
              ciName="CI_BlackListNIdType"
              label="نوع لیست سیاه"
              v-model="blackListType"
              label-width="85px"
              validations="required"
              cdcName="BlackListNIdTypeEngineer"
            />
          </FormControl>
          <EngineerInfoBox
            v-if="blackListType === 1"
            label="کد عضویت"
            label-width="61px"
            :m="mode"
            class="col-md-auto col-sm-4 col-12"
            v-model="searchModel.EngineerCode"
            @fetched="loadObj"
            cdcName="EngineerCode"
          />
          <safa-text
            v-if="blackListType === 2"
            domainName="engineer"
            ciName="CI_BlackListNIdType"
            label="کد دفتر"
            label-width="85px"
            class="col-md-2 col-sm-3 col-12"
            v-model="searchModel.OfficeCode"
            @keydown.enter="loadObj"
            validations="required"
            cdcName="BlackListNIdType"
          />
          <safa-text
            v-if="blackListType === 3"
            label="شماره ارجاع"
            label-width="85px"
            class="col-md-2 col-sm-3 col-12"
            v-model="searchModel.NidWorkitem"
            domainName="engineer"
            ciName="CI_BlackListNIdType"
            @keydown.enter="loadObj"
            cdcName="NidWorkitem"
          />
          <div v-if="blackListType !== 1">
            <btn-search @click="loadObj" label="جستجو" />
          </div>
        </FormRow>
        <q-separator class="q-mb-sm" />
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              :m="mode"
              domainName="engineer"
              ciName="CI_BlackList"
              label="کد لیست سیاه"
              label-width="85px"
              :validations="['required', validations.CI_BlackList]"
              v-model="model.blackList.CI_BlackList"
              cdcName="BlackList"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              :m="mode"
              domainName="engineer"
              ciName="CI_BlackListActionType"
              label="کد نوع واکنش"
              label-width="85px"
              v-model="model.blackList.CI_BlackListActionType"
              cdcName="BlackListActionType"
            />
          </FormControl>
          <FormControl>
            <safa-custom-text
              :m="mode"
              label="سهمیه کسر شده"
              label-width="85px"
              validations="number"
              v-model="model.blackList.ActionValue"
              cdcName="ActionValue"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ ثبت"
              label-width="85px"
              v-model="model.blackList.BL_Date"
              m="r"
              cdcName="BL_Date"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ شروع"
              label-width="85px"
              v-model="model.blackList.BL_StartDate"
              :m="mode"
              cdcName="BL_StartDate"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ انقضاء"
              label-width="85px"
              v-model="model.blackList.ExpireDate"
              :m="mode"
              cdcName="ExpireDate"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              :m="mode"
              ciName="CI_City"
              domainName="engineer"
              label="شهر"
              label-width="85px"
              v-model="model.blackList.CI_City"
              cdcName="City"
            />
          </FormControl>
          <FormControl class="flex items-center">
            <safa-checkbox
              label-width="85px"
              label="قفل شده در سیسیتم"
              :m="mode"
              v-model="model.blackList.IsDisable"
              cdcName="IsDisable"
            />
          </FormControl>
          <FormControl class="flex items-center">
            <safa-checkbox
              label="غیر فعال"
              label-width="85px"
              :m="mode"
              v-model="model.blackList.Deactivate"
              cdcName="Deactivate"
            />
          </FormControl>
          <text-template
            :formKey="formKey"
            label="توضیحات"
            :m="mode"
            label-width="85px"
            class="col-12"
            v-model="model.blackList.BL_Comments"
            cdcName="Comments"
          />
        </FormRow>
        <safa-splitter v-model="splitterModel" vertical class="fit" margin="0">
          <template v-slot:before>
            <fit>
              <safa-datatable
                title="مشخصات"
                v-model="blackList"
                helper="engineerBlackListColumns"
                fit
                height="100%"
                max-height="100%"
                min-height="200px"
                m="r"
                :show-selected-checkbox="true"
                :allowMultipleSelection="false"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                @EditClick="editBlackList"
                @DeleteClick="deleteBlackList"
                cdcName="blackList"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                title="جزئیات"
                v-model="blackListDetailList"
                helper="engineerblackListDetailColomns"
                fit
                height="100%"
                max-height="100%"
                min-height="200px"
                :m="mode"
                :show-selected-checkbox="true"
                :allowMultipleSelection="false"
                cdcName="blackListDetailList"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>

      <template v-slot:footer>
        <formActions
          showNewButton
          @newInfo="newBlackList"
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="cancel"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { currentDate } from "src/utils/index"
import Joi from "joi"
const defaultModel = {
  CI_BlackList: 0,
  CI_BlackListActionType: 0,
  ActionValue: 0,
  BL_Date: currentDate(),
  ExpireDate: "",
  BL_StartDate: "",
  CI_City: 0,
  IsDisable: false,
  Deactivate: false,
  BL_Comments: "",
  NIdBlackList: "00000000-0000-0000-0000-000000000000",
  NIdEng: null,
  NIdFil: null,
  NIdOff: null,
  NidUserInsert: null,
  UsernameInsert: null
}

export default {
  mixins: [baseFormMixin],
  props: { value: [String, Number] },

  data () {
    return {
      title: "لیست سیاه",
      formKey: "3cb1869b-ae17-4a42-bca9-ac1221cb4d05",
      name: "UBlackList",
      main: true,

      splitterModel: 70,
      officeInfo: { officeName: "" },
      enginnerInfo: { engName: "", engFamily: "" },
      blackListType: 0,
      searchModel: { EngineerCode: null, OfficeCode: null, NidWorkitem: null },
      model: { blackList: { ...defaultModel } },
      getBlackListWitCodeResults: null,
      saveBlackListRes: null,
      deleteBlackListRes: null,
      getBlackListResults: {},
      loadResults: {},
      blackList: [],
      blackListDetailList: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      validations: {
        CI_BlackList: Joi.custom(
          function (value, helper) {
            if (
              this.model.blackList.CI_BlackList === 0 ||
              this.model.blackList.CI_BlackList === null
            ) {
              return helper.message(
                "مقدار نامشخص برای کد لیست سیاه مجاز نمی باشد."
              )
            }
            return true
          }.bind(this)
        )
      }
    }
  },

  mounted () {
    if (this.value) {
      this.blackListType = 1
      this.searchModel.EngineerCode = this.value
      this.loadObj()
    }
  },

  methods: {
    async loadObj () {
      if (this.blackListType === 0) { return this.showError("لطفا فیلد نوع لیست سیاه را انتخاب نمایید.") }
      const payLoad = { pRequest: { CI_RequestType: 0, CI_Years: 0 } }
      if (this.blackListType === 1) { payLoad.pRequest.EngineerCode = this.searchModel.EngineerCode }
      if (this.blackListType === 2) { payLoad.pRequest.OfficeCode = this.searchModel.OfficeCode }
      if (this.blackListType === 3) { payLoad.pRequest.NidWorkitem = this.searchModel.NidWorkitem }

      this.showLoading()
      await this.$services.engineers
        .getBlackListWitCode(payLoad)
        .then(async ({ data }) => {
          this.getBlackListWitCodeResults = this.getResponse(data)
          if (this.getBlackListWitCodeResults.success) {
            await this.log({
              action: this.logActions.view,
              bizCode:
                payLoad.pRequest.EngineerCode ||
                payLoad.pRequest.OfficeCode ||
                payLoad.pRequest.NidWorkitem,
              bizCodeTitle: "nidEngineer"
            })
            this.loadResults = this.getBlackListWitCodeResults.data.GetBlackListWitCodeResult
            this.blackList = this.getBlackListWitCodeResults.data.GetBlackListWitCodeResult.BlackList
            this.getInfoByCode(this.loadResults)
            this.reset()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getInfoByCode (val) {
      if (val.Off_Info) {
        val.Off_Info.OfficeName
          ? (this.officeInfo.officeName = val.Off_Info.OfficeName)
          : (this.officeInfo.officeName = "")
      }
      if (val.Eng_Info) {
        this.enginnerInfo = val.Eng_Info
        val.Eng_Info.EngName
          ? (this.enginnerInfo.engName = val.Eng_Info.EngName)
          : (this.enginnerInfo.engName = "")
        val.Eng_Info.EngFamily
          ? (this.enginnerInfo.engFamily = val.Eng_Info.EngFamily)
          : (this.enginnerInfo.engFamily = "")
      }

      if (!val.ClsBlackList) {
        this.loadResults.ClsBlackList = {
          Eng_BlackList: this.model.blackList
        }
      }
      if (val.fil_Info) {
        this.baseNosaziCode = convertStringToNosaziCodeObject(
          val.fil_Info.CodeString
        )
      }
    },

    getBlackList (nidBlackList) {
      this.showLoading()
      this.$services.engineers
        .getBlackList({ pRequest: { NidBlackList: nidBlackList } })
        .then(async ({ data }) => {
          this.getBlackListResults = this.getResponse(data)
          if (this.getBlackListResults.success) {
            const res =
              this.getBlackListResults.data.GetBlackListResult.ClsBlackList
            this.model.blackList = res.Eng_BlackList
            this.blackListDetailList = res.Eng_BlackListDetail
            await this.log({
              action: this.logActions.view,
              bizCode: nidBlackList,
              bizCodeTitle: "nidBlackList"
            })
          }
        })
        .catch((e) => {
          this.serverError()
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      let finalModel = {}
      if (this.blackListType === 1) {
        finalModel = { ...this.model.blackList, NIdEng: this.enginnerInfo.NIdEng, CI_BlackListNIdType: this.blackListType }
      }
      else if (this.blackListType === 2) {
        finalModel = { ...this.model.blackList, NIdOff: this.officeInfo.NIdOff, CI_BlackListNIdType: this.blackListType }
      }
      else if (this.blackListType === 3) {
        finalModel = { ...this.model.blackList, NIdFil: this.loadResults.NIdFil, CI_BlackListNIdType: this.blackListType }
      }
      const payLoad = {
        pRequest: {
          ClsBlackList: {
            Eng_BlackList: finalModel,
            Eng_BlackListDetail: this.blackListDetailList,
            NIdMem: this.model.blackList.NIdBlackList
          }
        }
      }

      this.$services.engineers
        .saveBlackList(payLoad)
        .then(async ({ data }) => {
          this.saveBlackListRes = this.getResponse(data)
          if (this.saveBlackListRes.success) {
            this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.model.blackList.NIdBlackList,
              bizCodeTitle: "NIdBlackList"
            })
            this.loadObj()
          }
        })
        .catch((e) => {
          console.error(e)
          this.hideLoading()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    newBlackList () {
      if (this.blackListType === 0) { return this.showError("لطفا فیلد نوع لیست سیاه را انتخاب نمایید.") }
      this.reset()
      this.model.blackList.NidUserInsert = this.getNidUser()
      this.model.blackList.UsernameInsert = this.getUserDisplayName()
      this.isEditable = true
      if (this.blackListType === 1) { this.model.blackList.NIdEng = this.loadResults.Eng_Info.NIdEng }
      if (this.blackListType === 2) { this.model.blackList.NIdOff = this.loadResults.Off_Info.NIdOff }
      if (this.blackListType === 3) { this.model.blackList.NIdFil = this.loadResults.fil_Info.NIdFil }
    },

    editBlackList (e) {
      if (!this.isEditable) { return this.showError("لطفا فرم را در حالت ویرایش قرار دهید.") }
      this.getBlackList(e.dataItem.NIdBlackList)
    },

    deleteBlackList (e) {
      if (!this.isEditable) { return this.showError("لطفا فرم را در حالت ویرایش قرار دهید.") }
      this.showConfirm("آیا برای حذف اطمینان دارید؟").onOk(() => {
        this.showLoading()
        this.$services.engineers
          .deleteBlackList({
            Prequest: { NidBlackList: e.dataItem.NIdBlackList }
          })
          .then(async ({ data }) => {
            this.deleteBlackListRes = this.getResponse(data)
            if (this.deleteBlackListRes.success) {
              this.showSuccess("عملیات با موفقیت انجام شد.")
              await this.log({
                action: this.logActions.delete,
                bizCode: e.dataItem.NIdBlackList,
                bizCodeTitle: "NIdBlackList"
              })
              this.reset()
              this.loadObj()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },

    cancel () {
      this.reset()
      this.isEditable = false
    },

    reset () {
      this.resetValidation()
      this.blackListDetailList = []
      this.model = { blackList: { ...defaultModel } }
      this.isEditable = false
    }
  }
}
</script>
