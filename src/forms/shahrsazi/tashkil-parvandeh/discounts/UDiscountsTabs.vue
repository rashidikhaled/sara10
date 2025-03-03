<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper title="تخفیفات" vertical :padding="false">
      <safa-status :result="btnConfirmDiscountDetailsRes" />
      <safa-tabs
        v-model="activeTab"
        type="fixed"
        class="fit"
        height="100%"
        ref="discountTab"
      >
        <template v-slot:tabs>
          <tab-menu name="discountList" label="لیست" />
          <tab-menu
            name="discountDetails"
            label="جزییات"
            v-if="isShowNewTab"
            closable
            @close="closeDetailsTab"
          />
        </template>
        <tab-content name="discountList" title="لیست">
          <UList
            @onEmitopenNewTab="openNewTab"
            @dbclick="loadDiscountByNidD"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <tab-content name="discountDetails" title="جزییات" v-if="isShowNewTab">
          <UDetails
            :editMode="editMode"
            :discountDetail="discountDetail"
            @selectedRow="RowGrid"
            :isNew="isNew"
            :formKey="formKey"
            :title="title"
            :name="name"
            :m="mode"
            ref="childDetailsTab"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <btn-new
          label="جدید"
          v-if="activeTab === 'discountList'"
          @click="openNewTab"
        />
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveAll"
          editSPId="4ae2a247-dd75-43ed-b5fc-000b0fe0e7e5"
          editFormId="987199b8-efbf-4fb1-8f21-d498ab498a1e"
          v-if="activeTab === 'discountDetails'"
        >
          <template v-slot:before>
            <btn-default label="آرشیو" v-if="!isNew" />
            <btn-default
              label="تغییر وضعیت"
              @click="changeStatus"
              v-if="!isNew"
            />
          </template>
          <template v-slot:after>
            <btn-edit
              label="ویرایش بدون اعتبار سنجی"
              @click="isEditable = true"
              v-if="!isEditable"
            />
          </template>
          <btn-default
          label="تایید اول"
           @click="btnConfirmDiscountDetails"
           spId="ec3f8798-59cd-4e0e-ab9a-ca98c05f76c2"
           spCaption="تایید اول"
           :force="true"
           />
          <btn-default
           label="تایید دوم"
           @click="btnConfirmDiscountDetails"
           spId="f1c53fc4-b745-4b49-b673-93e9ba6a5b5c"
           spCaption="تایید دوم"
           :force="true"
           />
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import UList from "./partials/UList"
import UDetails from "./partials/UDetails"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  components: {
    UList,
    UDetails
  },
  data () {
    return {
      title: "تخفیفات",
      formKey: "987199b8-efbf-4fb1-8f21-d498ab498a1e",
      name: "UDiscountsTabs",
      main: true,
      sidebarCompatible: true,

      activeTab: "discountList",
      isShowNewTab: false,
      editMode: "e",
      discountDetail: null,
      loadDiscountByNidDPrequest: { pNidD: null },
      loadResult: null,
      isNew: false,

      // res
      btnConfirmDiscountDetailsRes: null
    }
  },
  methods: {
    RowGrid (row) {
      this.selectedRow = row
    },
    saveAll () {
      this.$refs.childDetailsTab.saveAllDiscount()
      this.isEditable = false
    },
    changeStatus () {
      this.$refs.childDetailsTab.changeStatus()
    },
    openNewTab () {
      this.isShowNewTab = true
      this.discountDetail = null
      this.$refs.discountTab.changeTab("discountDetails")
      this.isNew = true
      this.isEditable = true
    },
    closeDetailsTab () {
      if (this.isEditable) {
        this.showWarning("در حالت ویرایش امکان بستن این پنجره وجود ندارد.")
        return
      }
      this.isShowNewTab = false
      this.activeTab = "discountList"
      this.isNew = false
    },
    loadDiscountByNidD (row) {
      this.showLoading()
      this.loadDiscountByNidDPrequest.pNidD = row.NidD
      this.$services.SC.loadAllDiscount(this.loadDiscountByNidDPrequest, {
        config: { District: row.District }
      })
        .then(async ({ data }) => {
          this.loadResult = this.getResponse(data)
          if (this.loadResult.success) {
            this.discountDetail = this.loadResult.data
            await this.log({
              action: this.logActions.save,
              bizCode: this.loadDiscountByNidDPrequest.pNidD,
              bizCodeTitle: "pNidD"
            })
            this.isShowNewTab = true
            this.$refs.discountTab.changeTab("discountDetails")
            this.isNew = false
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
    async btnConfirmDiscountDetails (pEumConfirmationType) {
      if (!this.selectedRow) {
        return this.showError("لطفا یک ردیف را انتخاب کنید.")
      }
      const payload = {
        Confirm_DiscountDetails: {
          pAllDiscount: {
            NidD: this.selectedRow.NidD,
            discountDetail: this.discountDetail
          },
          pEumConfirmationType: pEumConfirmationType,
          pNidDD: this.selectedRow.NidDD,
          pUser: {
            UserName: this.getUserDisplayName(),
            UserGuid: this.getNidUser(),
            JobLocationGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
      }

      try {
        const { data } = await this.$services.SC.confirmDiscountDetails(
          payload
        )
        this.btnConfirmDiscountDetailsRes = this.getResponse(data)
        if (this.btnConfirmDiscountDetailsRes.success) {
          this.showSuccess("تایید با موفقیت انجام شد.")
          this.loadDiscountByNidD(this.selectedRow)
          await this.log({
            action: this.logActions.confirm,
            bizCode: this.selectedRow.NidProc,
            bizCodeTitle: "NidProc",
            saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
