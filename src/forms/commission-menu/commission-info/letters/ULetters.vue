<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
    <form-wrapper :title="title" vertical>
      <safa-status :result="result" />
      <safa-status :result="deletePriceResult" />
      <safa-status :result="saveResult" />
      <fit>
        <safa-splitter v-model="spliterModel">
          <template v-slot:before>
            <safa-list
              actions
              titleField="CITableNameTitle"
              @selectItem="getShPrice($event)"
              @addNewItem="newShPrice"
              @deleteItem="deletePrice"
              @editItem="editName"
            />
          </template>
        </safa-splitter>
      </fit>
    </form-wrapper>
    <ShowModal v-model="isShowNewPriceModal" title="لیست جدید" vertical>
      <Reports
        :formKey="formKey"
        :title="title"
        :name="name"
        @reload="reload"
        ref="newList"
      />
      <template v-slot:footer>
        <btn-save label="تایید" @click="accept" class="q-mr-sm" />
        <btn-cancel label="انصراف" @click="cancel" />
      </template>
    </ShowModal>
    <ShowModal
      v-model="isShowEditNameModal"
      title="نام ترکیبی"
      width="400px"
      height="200px"
    >
      <Group @reload="reload" :selectedPrice="selectedPrice" ref="editPrice" />
      <template v-slot:footer>
        <btn-save label="تایید" @click="acceptEdit" class="q-mr-sm" />
        <btn-cancel label="انصراف" @click="cancelEdit" />
      </template>
    </ShowModal>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Group from "./partials/Group"
import Reports from "./partials/Reports"

export default {
  mixins: [baseFormMixin],
  components: { Group, Reports },

  data () {
    return {
      title: "مکاتبات",
      name: "ULetters",
      formKey: "f2c30863-551e-4fb0-924f-2ddfa86353b9",
      spliterModel: 15,
      main: true,
      sidebarCompatible: true,
      result: null,
      results: { Sh_PriceTitles: [] },
      priceTitles: [],
      shPriceResult: null,
      shPriceResults: { Sh_Price: [] },
      selectedItem: null,
      priceType: "",
      selectedDate: "",
      price: "",
      minPrice: "",
      maxPrice: "",
      area: "",
      ratio: "",
      residentialDensity: "",
      commercialDensity: "",
      others: "",
      isShowNewPriceModal: false,
      selectedPrice: null,
      deletePriceResult: null,
      isShowEditNameModal: false,
      saveResult: null,
      newPrice: false,
      priceTitle: null
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    edit () {
      if (this.selectedItem) {
        this.isEditable = true
      } else {
        this.showError("لطفا یک ردیف برای ویرایش انتخاب نمایید.")
      }
    },
    load () {
      this.showLoading()
      let data = {}
      this.$services.SB.getShPriceCiTableNames(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            this.priceTitles = this.results.Sh_PriceTitles

            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getShPrice (priceTitle) {
      this.showLoading()
      this.selectedPrice = priceTitle
      let data = {
        pCiTableName: priceTitle.CITableName,
        pFrom: 1,
        pTo: 50,
        pWhereCondition: ""
      }
      this.$services.SB.getShPrice(data)
        .then(async ({ data }) => {
          this.shPriceResult = this.getResponse(data)

          if (this.shPriceResult.success) {
            this.shPriceResults = this.shPriceResult.data
          }
        })
        .catch((response) => {
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    click (row) {
      this.selectedItem = row
      this.priceType = row.CI_PriceType
      this.selectedDate = row.DatePrice
      this.price = row.Price
      this.minPrice = row.MinPrice
      this.maxPrice = row.MaxPrice
      this.area = row.Area
      this.ratio = row.Ratio
      this.residentialDensity = row.ResidentialDensity
      this.commercialDensity = row.CommercialDensity
      this.others = row.Others
    },
    newShPrice () {
      this.isShowNewPriceModal = true
    },
    deletePrice () {
      this.showLoading()
      let data = {
        pCITableName: this.selectedPrice.CITableName
      }
      this.$services.SB.deleteShPriceByCItableName(data)
        .then(async ({ data }) => {
          this.deletePriceResult = this.getResponse(data)

          if (this.deletePriceResult.success) {
            this.showSuccess("اسم ترکیبی انتخاب شده با موفقیت حذف شد.")
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedPrice.CITableName.toString(),
              bizCodeTitle: "CITableName",
              saveDesc: `حذف اسم ترکیبی  ${this.selectedPrice.CITableName ?? ''} در فرم ${this.title} انجام گردید.`
            })
            this.load()
          }
        })
        .catch((response) => {
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    editName () {
      this.isShowEditNameModal = true
    },
    reload () {
      if (this.isShowNewPriceModal) {
        this.isShowNewPriceModal = false
      }
      if (this.isShowEditNameModal) {
        this.isShowEditNameModal = false
      }
      this.load()
    },
    newInfo () {
      this.isEditable = true
      this.newPrice = true
    },
    saveData () {
      this.showLoading()
      let data = {
        pSh_Price: {
          Area: this.area || 0,
          CICode: this.selectedPrice.CICode,
          CITableName: this.selectedPrice.CITableName,
          CITableNameTitle: this.selectedPrice.CITableNameTitle,
          CI_PriceType: this.selectedPrice.CI_PriceType,
          DatePrice: this.selectedDate || "",
          MaxPrice: this.maxPrice || 0,
          MinPrice: this.minPrice || 0,
          NidPrice: this.selectedPrice.NidPrice,
          Price: this.price || 0
        }
      }
      if (this.newPrice) {
        data.pSh_Price.NidPrice = "00000000-0000-0000-0000-000000000000"
      }
      this.$services.SB.SaveShPrice(data)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess("ویرایش اطلاعات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedPrice.CITableName.toString(),
              bizCodeTitle: "CITableName",
              saveDesc: `ذخیره اطلاعات  ${this.selectedPrice.CITableName ?? ''} در فرم ${this.title} انجام گردید.`
            })
            this.isEditable = false
            this.getShPrice(this.selectedPrice)
          }
        })
        .catch((response) => {
          console.debug("save error", response)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    deleteRow () {
      if (!this.selectedItem) {
        this.showError("هیچ مقداری برای حذف انتخاب نشده است.")
      } else {
        this.showConfirm("آیا از حذف قیمت انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.showLoading()
            let data = {
              pSh_Price: this.selectedItem
            }
            if (this.newPrice) {
              data.pSh_Price.NidPrice = "00000000-0000-0000-0000-000000000000"
            }
            this.$services.SB.deleteShPrice(data)
              .then(async ({ data }) => {
                this.saveResult = this.getResponse(data)

                if (this.saveResult.success) {
                  this.showSuccess("حذف اطلاعات با موفقیت انجام شد.")
                  await this.log({
                    action: this.logActions.delete,
                    bizCode: '',
                    bizCodeTitle: "",
                    saveDesc: `عملیات حذف در فرم ${this.title} انجام گردید.`
                  })
                  this.getShPrice(this.selectedPrice)
                }
              })
              .catch((response) => {
                console.debug("delete error", response)
                // this.serverError() // test serverError
              })
              .finally(() => {
                this.hideLoading()
              })
          }
        )
      }
    },
    accept () {
      this.$refs.newList.accept()
    },
    cancel () {
      this.$refs.newList.cancel()
    },
    acceptEdit () {
      this.$refs.editPrice.accept()
    },
    cancelEdit () {
      this.$refs.editPrice.cancel()
    }
  }
}
</script>
