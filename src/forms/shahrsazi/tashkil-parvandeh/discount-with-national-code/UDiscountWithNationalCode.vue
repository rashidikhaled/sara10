<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper title="تخفیفات با کد ملی" vertical>
      <safa-status :result="requestResult" />
      <!-- <safa-group
        :m="mode"
        label-width="103px"
      > -->
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="نام ونام خانوادگی"
            label-width="100px"
            v-model="loadResult.Sara8Sys_DiscountInfoNationalCode.Name"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ملی"
            label-width="100px"
            v-model="loadResult.Sara8Sys_DiscountInfoNationalCode.NationalCode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="سقف تخفیف"
            label-width="100px"
            v-model="
              loadResult.Sara8Sys_DiscountInfoNationalCode.DiscountAmount
            "
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="میزان مصرف شده"
            label-width="100px"
            v-model="loadResult.Sara8Sys_DiscountInfoNationalCode.UsedDiscount"
          />
        </FormControl>
        <FormControl>
          <safa-combo-enum
            label="نوع تخفیف"
            label-width="100px"
            enum-name="EumDiscountType"
            v-model="
              loadResult.Sara8Sys_DiscountInfoNationalCode.EumDiscountType
            "
            @input="selectedChanged"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد جانباز"
            label-width="100px"
            v-model="loadResult.Sara8Sys_DiscountInfoNationalCode.JanbazCode"
            v-if="isShowJanbazElements"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="میزان باقی مانده"
            label-width="100px"
            v-model="
              loadResult.Sara8Sys_DiscountInfoNationalCode.RemainDiscount
            "
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کاربر"
            label-width="100px"
            m="r"
            v-model="loadResult.Sara8Sys_DiscountInfoNationalCode.UserName"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تاریخ"
            label-width="100px"
            m="r"
            v-model="loadResult.Sara8Sys_DiscountInfoNationalCode.EnterDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="ساعت"
            label-width="100px"
            m="r"
            v-model="loadResult.Sara8Sys_DiscountInfoNationalCode.EnterTime"
          />
        </FormControl>
      </FormRow>
      <!-- </safa-group> -->

      <text-template
        label="توضیحات"
        formKey="D39B72E3-054E-4F88-91CF-B6B6AC4B5D53"
        v-model="loadResult.Sara8Sys_DiscountInfoNationalCode.Comments"
        :m="mode"
        class="q-mb-sm"
        label-width="103px"
      />
      <safa-datatable
        v-model="loadResult.Sara8Sys_DiscountListNationalCode"
        helper="discountWithNationalCode"
        @selectedChange="selectedChange"
        :allowMultipleSelection="false"
        class="fit"
        max-height="100%"
        min-height="200px"
        margin="0"
        title="لیست تخفیفات"
        paginate
        :perPage="[10]"
      />
    </form-wrapper>
  </safa-form>
</template>
<script>
import saveDiscountNationalCode from "src/models/saveDiscountNationalCode.js"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  route: "/parvande/discount-with-national-code",
  mixins: [baseFormMixin],
  data () {
    return {
      title: "شهرسازی- تخفیفات با کد ملی",
      formKey: "14329ad2-3028-4bf4-860c-bdc71b701d6a",
      name: "UDiscountWithNationalCode",
      main: true,
      sidebarCompatible: true,
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: false,
      items: [],
      loadResult: { Sara8Sys_DiscountInfoNationalCode: {} },
      requestResult: null,
      formActionEditMode: "r",
      isShowJanbazElements: false,
      isDisabledEdit: true
    }
  },

  mounted () {
    this.loadAllDiscountNationalCode()
    if (this.editMode === "e") {
      this.$refs["discount-details-grid"].addRow(this.items)
      this.value.data.Base_Using =
        this.$refs["discount-details-grid"].gridItems
    } else if (this.editMode === "r") {
      if (
        this.$refs["discount-details-grid"].gridItems[0].isNew &&
        !this.$refs["discount-details-grid"].gridItems[0].inEdit
      ) {
        this.$refs["karbariha-grid"].gridItems.shift()
        this.items = this.$refs["karbariha-grid"].gridItems
      }
    }
  },
  methods: {
    goToEditMode () {
      this.formActionEditMode = "e"
      this.editMode = "e"
    },
    goToReadonlyMode () {
      this.formActionEditMode = "r"
      this.editMode = "r"
    },
    saveDiscountNationalCode () {
      saveDiscountNationalCode.pObj.NidDN =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.NidDN
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.NidDN =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.NidDN
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.NidUser =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.NidUser
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.Name =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.Name
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.EumDiscountType =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.EumDiscountType
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.NationalCode =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.NationalCode
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.DiscountAmount =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.DiscountAmount
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.UsedDiscount =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.UsedDiscount
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.RemainDiscount =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.RemainDiscount
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.JanbazCode =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.JanbazCode
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.UserName =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.UserName
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.EnterDate =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.EnterDate
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.EnterTime =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.EnterTime
      saveDiscountNationalCode.pObj.Sara8Sys_DiscountInfoNationalCode.Comments =
        this.loadResult.Sara8Sys_DiscountInfoNationalCode.Comments
      this.$q.loading.show()
      this.$services.SC.saveDiscountNationalCode(saveDiscountNationalCode, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.$q.loading.hide()

          if (response.data.ErrorResult.BizErrors.length === 0) {
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: ""
            })
            this.showSuccess("عملیات با موفقیت انجام شد")
            this.goToReadonlyMode()
            this.loadAllDiscountNationalCode()
            this.isDisabledEdit = true
          }
        })
        .catch((ex) => {
          this.serverError()
        })
        .finally(this.hideLoading())
    },
    loadAllDiscountNationalCode () {
      this.showLoading()
      this.$services.SC.loadAllDiscountNationalCode(null, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.$q.loading.hide()
          this.requestResult = this.getResponse(response.data)
          if (this.requestResult.success) {
            this.loadResult = this.requestResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((ex) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.loadResult.Sara8Sys_DiscountInfoNationalCode = e.dataItem
      this.isDisabledEdit = false
    },
    newRecord () {
      this.isEditable = true
      this.editMode = "e"
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.Name = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.EumDiscountType = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.NationalCode = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.DiscountAmount = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.UsedDiscount = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.RemainDiscount = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.JanbazCode = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.UserName = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.EnterDate = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.EnterTime = ""
      this.loadResult.Sara8Sys_DiscountInfoNationalCode.Comments = ""
    },
    selectedChanged (e) {
      if (e === 1) {
        this.isShowJanbazElements = false
      } else if (e === 2) {
        this.isShowJanbazElements = true
      }
    }
  }
}
</script>
