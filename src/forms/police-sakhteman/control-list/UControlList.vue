<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    caption="پلیس ساختمان- لیست کنترلی"
    :id="formKey"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="controlListRes" />
        <safa-status :result="getControlListRes" />
        <safa-status :result="saveControlListRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="نام کامل کاربر"
              label-width="70px"
              v-model="model.FullName"
              :m="mode"
              cdcName="FullName"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد ملی"
              :validations="
                model.NationalCode === ''
                  ? ''
                  : ['number', validations.nationalCode]
              "
              type="number"
              dir="ltr"
              label-width="60px"
              v-model="model.NationalCode"
              :m="mode"
              cdcName="NationalCode"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="از تاریخ"
              label-width="60px"
              v-model="model.EnterDateFrom"
              :m="mode"
              cdcName="EnterDateFrom"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تا تاریخ"
              label-width="60px"
              v-model="model.EnterDateTo"
              :m="mode"
              cdcName="EnterDateTo"
            />
          </FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            label-width="60px"
            v-model="baseNosaziCode"
            enabled="1-1-1-1-1-0-0"
            :m="mode"
            cdcName="baseNosaziCode"
            :actions="false"
          />
          <text-template
            label="توضیحات"
            label-width="70px"
            :m="mode"
            v-model="model.Comment"
            cdcName="Comment"
            class="col-12"
            :rows="1"
          />
        </FormRow>
        <safa-grid
          v-model="controlLists"
          cdcName="controlLists"
          helper="controlListColumns"
          m="r"
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          @selection:changed="selectedChange"
        />
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          showNewButton
          :showEditButton="showEditButton"
          @save="saveObj"
          @newInfo="newObj"
          @cancel="reset"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate, currentTime } from "src/utils/index"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
import customValidation from "src/utils/customValidation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "لیست کنترلی",
      formKey: "27BAD9CE-1221-43E2-8F88-6A6091EE22B6",
      name: "UControlList",
      main: true,

      model: {
        FullName: "",
        NationalCode: "",
        EnterDateFrom: "",
        EnterDateTo: "",
        Comment: ""
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
      controlLists: [],
      selectedControl: {
        NidControlList: "00000000-0000-0000-0000-000000000000"
      },
      showEditButton: false,
      isView: false,

      // service
      getControlListRes: null,
      controlListRes: null,
      saveControlListRes: null,

      validations: {
        nationalCode: customValidation.nationalCode
      }
    }
  },
  created () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SH.getAllControlList({
        pControlList: {
          NidControlList: "00000000-0000-0000-0000-000000000000"
        }
      })
        .then(async ({ data }) => {
          this.controlListRes = this.getResponse(data)
          if (this.controlListRes.success) {
            this.controlLists = this.controlListRes.data.ControlLists || []
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: "",
                bizCodeTitle: "",
                saveDesc: `نمایش فرم لیست کنترلی انجام گردید.`
              })
            }
            this.isView = true
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

    saveObj () {
      if (!this.isValidForm()) return
      const NosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
      const payload = {
        pControlList: {
          FullName: this.model.FullName,
          NationalCode: this.model.NationalCode,
          EnterDateFrom: this.model.EnterDateFrom,
          EnterDateTo: this.model.EnterDateTo,
          EnterDate: currentDate(),
          EnterTime: currentTime(),
          Comment: this.model.Comment,
          ExitDate: null,
          ExitTime: null,
          NidOper: null,
          NidControlList: this.selectedControl.NidControlList,
          NosaziCode,
          NidUser: this.getNidUser(),
          UserName: this.getUserDisplayName()
        }
      }
      this.showLoading()
      this.$services.SH.saveControlList(payload)
        .then(async ({ data }) => {
          this.saveControlListRes = this.getResponse(data)
          if (this.saveControlListRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: NosaziCode,
              bizCodeTitle: "NosaziCode",
              nosaziCode: NosaziCode,
              saveDesc: `ذخیره فرم لیست کنترلی  با کد نوسازی ${NosaziCode} انجام گردید.`
            })
            this.loadObj()
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

    editHandler () {
      this.showEditButton = true
      this.isEditable = true
      const payload = { NidControlList: this.selectedControl.NidControlList }
      this.$services.SH.getControlList(payload)
        .then(async ({ data }) => {
          this.getControlListRes = this.getResponse(data)
          if (this.getControlListRes.success) {
            this.model = this.getControlListRes.data.ControlList
            this.baseNosaziCode = convertStringToNosaziCodeObject(
              this.model.NosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: this.model.NosaziCode,
              bizCodeTitle: "NosaziCode",
              nosaziCode: this.model.NosaziCode,
              saveDesc: `ویرایش فرم لیست کنترلی  با کد نوسازی ${this.model.NosaziCode} انجام گردید.`
            })
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

    selectedChange (e) {
      if (
        this.isEditable === true &&
        this.selectedControl.NidControlList ===
          "00000000-0000-0000-0000-000000000000"
      ) {
        return this.showError("فرم در حالت ویرایش می باشد.")
      }
      this.selectedControl = e
      this.editHandler()
    },

    newObj () {
      this.reset()
      this.isEditable = true
    },

    reset () {
      this.selectedControl.NidControlList =
        "00000000-0000-0000-0000-000000000000"
      this.resetValidation()
      this.isEditable = false
      this.showEditButton = false
      this.model = {
        FullName: "",
        NationalCode: "",
        EnterDateFrom: "",
        EnterDateTo: "",
        Comment: ""
      }
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  }
}
</script>
