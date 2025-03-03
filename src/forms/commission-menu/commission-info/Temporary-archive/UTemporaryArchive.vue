<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="علت بایگانی"
            label-width="70px"
            :m="mode"
            v-model="model.TemporaryArchive.CI_TemporaryArchiveType"
            cdcName="CI_TemporaryArchiveType"
            domainName="Commission100"
            ciName="CI_TemporaryArchiveType"
            required
            :validations="['required', validations.hasReason]"
          />
        </FormControl>
        <FormControl>
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label="کدنوسازی"
            label-width="70px"
            :actions="false"
            m="r"
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-mb-sm">
        <safa-text
          label="توضیحات"
          label-width="70px"
          class="col-12"
          v-model="model.TemporaryArchive.Description"
          cdcName="Description"
          :m="mode"
          required
          validations="required"
        />
      </FormRow>
      <safa-datatable
        title="لیست بایگانی موقت"
        fit
        helper="temporary100"
        v-model="model.TemporaryArchives"
        cdcName="TemporaryArchives"
        @row-click="selectedTemporary"
        m="r"
        height="100%"
        max-height="100%"
        min-height="200px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        paginate
      />
    </fit>

    <template #footer>
      <form-actions
        :showEditButton="isEditable ? true : false"
        @save="saveTemporaryArchive"
        @cancel="isEditable = false"
        @edit="isEditable = true"
        :m="mode"
      >
        <template #after>
          <btn-new
            label="ارسال به بایگانی موقت"
            v-if="!isEditable ? true : false"
            @click="isEditable = true"
            :disable="lockSendButton"
          />
          <btn-cancel
            label="خروج از بایگانی موقت"
            @click="exitFromTemporaryArchive"
          />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import Joi from "joi"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "بایگانی موقت",
      name: "UTemporaryArchive",
      formKey: "cc8d9492-0706-465a-a23b-2454273dcf5c",
      main: true,
      model: {
        TemporaryArchive: {
          CI_TemporaryArchiveType: 0,
          Description: ""
        },
        TemporaryArchiveModelList: [],
        TemporaryArchives: []
      },

      validations: {
        hasReason: Joi.number().min(1).messages({
          "number.min": `علت بایگانی را مشخص کنید.`,
          "any.required": `توضیحات وارد نشده است.`
        })
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
      newTemporaryArchive: null,
      selectedTemporaryArchive: null,
      lockSendButton: false
    }
  },

  mounted () {
    if (this.selectedCommission) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedCommission.BizCode
      )
    }
    this.loadData()
  },

  methods: {
    getTime () {
      var today = new Date()
      var h = today.getHours()
      var status = h < 12 ? "ق.ظ" : "ب.ظ"
      var hour = h > 12 ? parseInt(h) - 12 : h
      var time = hour + ":" + today.getMinutes() + " " + status
      return time
    },

    loadData () {
      this.showLoading()
      const payload = {
        NIDCommission:
          this.selectedNidCommission || "00000000-0000-0000-0000-000000000000"
      }
      this.$services.commissions
        .getTemporaryArchives(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.resetValidation()
            const result =
              res.data.GetTemporaryArchivesResult.ClsTemporaryArchive
            this.model.TemporaryArchive.CI_TemporaryArchiveType = 0
            this.model.TemporaryArchive.Description = ""
            const list = []
            list.push(
              ...result.TemporaryArchiveModelList.map((item) => {
                let r = {}
                r.CodeString = item.Commission_Info.CodeString
                r.SecretariatNo = item.Commission_Info.SecretariatNo
                r.CI_TemporaryArchiveType =
                  item.TemporaryArchive.CI_TemporaryArchiveType
                r.CreateDate = item.TemporaryArchive.CreateDate
                r.CreateTime = item.TemporaryArchive.CreateTime
                r.Description = item.TemporaryArchive.Description
                r.IsRemoved = item.TemporaryArchive.IsRemoved
                r.NidCommission = item.TemporaryArchive.NidCommission
                r.NidTemporaryArchive =
                  item.TemporaryArchive.NidTemporaryArchive
                r.NidUser = item.TemporaryArchive.NidUser
                r.OldNidTaskState = item.TemporaryArchive.OldNidTaskState
                r.RemovalDate = item.TemporaryArchive.RemovalDate
                r.RemovalNidUser = item.TemporaryArchive.RemovalNidUser
                r.RemovalTime = item.TemporaryArchive.RemovalTime
                r.RemovalUserName = item.TemporaryArchive.RemovalUserName
                r.UserName = item.TemporaryArchive.UserName
                return r
              })
            )
            this.model.TemporaryArchives = list

            if (this.selectedNidCommission) {
              this.model.TemporaryArchives.some((item) => {
                if (item.NidCommission === this.selectedNidCommission) {
                  this.lockSendButton = true
                }
              })
            }
            this.isEditable = false
            this.newTemporaryArchive = null
            await this.log({
              action: this.logActions.view,
              bizCode: this.baseNosaziCode,
              bizCodeTitle: "NidCommission",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    newGuid () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },

    saveTemporaryArchive () {
      if (!this.selectedCommission && this.isEditable) {
        return this.showError(
          "لطفا پرونده مورد نظر را از کارتابل کمیسیون انتخاب نمایید."
        )
      }
      if (this.isEditable) {
        if (!this.isValidForm()) return
        this.newTemporaryArchive = {
          CreateDate: new PersianDate().toLocale("en").format("L"),
          CreateTime: this.getTime(),
          IsRemoved: false,

          CI_TemporaryArchiveType:
            this.model.TemporaryArchive.CI_TemporaryArchiveType,
          Description: this.model.TemporaryArchive.Description,
          NidCommission: this.selectedCommission.NidCommission,
          NidTemporaryArchive: this.newGuid(),
          NidUser: this.currentUser.NidUser,
          OldNidTaskState: "00000000-0000-0000-0000-000000000000",
          UserName: this.getUserDisplayName()
        }
      }

      this.showLoading()
      const payload = {
        pRequest: {
          ClsTemporaryArchive: {
            TemporaryArchive: this.isEditable
              ? this.newTemporaryArchive
              : this.selectedTemporaryArchive,
            TemporaryArchiveModelList: null,
            TemporaryArchives: null
          },
          IsActive: false,
          NIDCommission: "00000000-0000-0000-0000-000000000000",
          NIDVote: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          ISRelapse: false,
          IsRegion: false,
          IsdeleteArchive: false,
          NidAgent: "00000000-0000-0000-0000-000000000000",
          NidTaskState: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.commissions
        .saveTemporaryArchive(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.baseNosaziCode,
              bizCodeTitle: "NidCommission",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.loadData()
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    exitFromTemporaryArchive () {
      if (this.selectedTemporaryArchive) {
        this.selectedTemporaryArchive.IsRemoved = true
        this.saveTemporaryArchive()
      } else {
        this.showError("پرونده ای جهت خروج از بایگانی انتخاب نشده است.")
      }
    },

    selectedTemporary (row) {
      this.selectedTemporaryArchive = row
    }
  }
}
</script>
