<template>
  <safa-form
   :id="formKey"
   :caption="title"
   appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
   >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getSearchAllRes" />
      </template>
      <fit>
        <internal-section title="جستجوی پیشرفته">
          <div class="q-gutter-x-lg q-mb-sm">
            <safa-radio
              label="جستجو بر اساس اطلاعات ملک"
              v-model="searchMode"
              :val="0"
            />
            <safa-radio
              label="جستجو بر اساس کلاسه پرونده"
              v-model="searchMode"
              :val="1"
            />
            <safa-radio
              label="جستجو بر اساس پلاک ثبتی"
              v-model="searchMode"
              :val="2"
            />
          </div>
          <q-separator class="q-mb-sm" />
          <FormRow v-show="searchMode === 0">
            <FormControl>
              <safa-text
                label="نام مالک"
                label-width="100px"
                v-model="model.searchModel.OwnerName"
                cdcName="OwnerName"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام پدر"
                label-width="100px"
                v-model="model.searchModel.OwnerFatherName"
                cdcName="OwnerFatherName"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره شناسنامه"
                label-width="100px"
                v-model="model.searchModel.IDCardNo"
                cdcName="IDCardNo"
                type="number"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کد ملی"
                label-width="100px"
                v-model="model.searchModel.NationalCode"
                cdcName="NationalCode"
                type="number"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام متقاضی"
                label-width="100px"
                v-model="model.searchModel.RequesterName"
                cdcName="RequesterName"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="بخش ثبتی"
                label-width="100px"
                v-model="model.searchModel.RegisterSection"
                cdcName="RegisterSection"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کد پستی"
                label-width="100px"
                v-model="model.searchModel.PostCode"
                type="number"
                cdcName="PostCode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تلفن"
                label-width="100px"
                v-model="model.searchModel.Telephone"
                type="number"
                cdcName="Telephone"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="آدرس ملک"
                label-width="100px"
                v-model="model.searchModel.Address"
                cdcName="Address"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="مساحت از"
                label-width="100px"
                v-model="model.searchModel.AreaFrom"
                cdcName="AreaFrom"
                type="number"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="مساحت تا"
                label-width="100px"
                v-model="model.searchModel.AreaTo"
                cdcName="AreaTo"
                type="number"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="بارکد صلح نامه خرید"
                label-width="100px"
                v-model="model.searchModel.BarCode"
                cdcName="BarCode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره صلح نامه خرید/قرارداد"
                label-width="100px"
                v-model="model.searchModel.Contract"
                cdcName="Contract"
              />
            </FormControl>
            <div class="q-gutter-sm">
              <btn-search label="جستجو" @click="loadObj" />
              <btn-cancel label="پاک کردن" @click="resetObj(true)" />
            </div>
          </FormRow>
          <FormRow v-show="searchMode === 1">
            <ClasseParvandeh
              label="کلاسه پرونده"
              label-width="60px"
              v-model="classeParvandehCode"
              cdcName="classeParvandehCode"
            />
            <nosazi-code-input
              label="کد نوسازی"
              label-width="60px"
              v-model="baseNosaziCode"
              cdcName="baseNosaziCode"
            />
            <div class="q-gutter-sm">
              <btn-search label="جستجو" @click="loadObj" />
              <btn-cancel label="پاک کردن" @click="resetObj(true)" />
            </div>
          </FormRow>
          <FormRow v-show="searchMode === 2" class="q-mb-sm">
            <FormControl class="flex items-center">
              <safa-checkbox
                v-model="chkIsLike"
                label="جستجوی مقادیر"
                cdcName="chkIsLike"
              />
            </FormControl>
            <div class="q-gutter-sm">
              <btn-search label="جستجو" @click="loadObj" />
              <btn-cancel label="پاک کردن" @click="resetObj(true)" />
            </div>
          </FormRow>
          <safa-grid
            v-show="searchMode === 2"
            v-model="searchItems"
            cdcName="searchItems"
            helper="searchItemsColumns"
            minHeight="200px"
            height="200px"
            maxHeight="400px"
            m="e"
            paginate
            :suppressRowClickSelection="false"
          />
        </internal-section>
        <safa-grid
          v-model="searchAll"
          helper="searchAllColumns"
          :suppressRowClickSelection="false"
          fit
          paginate
          m="r"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
const defaultModel = {
  OwnerName: "",
  OwnerFatherName: "",
  IDCardNo: "",
  NationalCode: "",
  RequesterName: "",
  RegisterSection: "",
  PostCode: "",
  Telephone: "",
  Address: "",
  AreaFrom: "",
  AreaTo: "",
  BarCode: "",
  Contract: "",
  NosaziCode: ""
}

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "جستجو املاک و مستغلات",
      name: "USearchEstate",
      formKey: "84A6D09F-4225-463F-957A-0A1969765D73",
      main: true,

      // #region services
      getSearchAllRes: null,

      // #region variables
      searchMode: 0,
      model: { searchModel: { ...defaultModel } },
      searchAll: [],
      searchItems: [],
      chkIsLike: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      classeParvandehCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0
      }
    }
  },
  computed: {
    query () {
      let Where = ""
      let WhereRegisterPlack = ""
      let classeCode = ""
      console.log("WhereRegisterPlack :>> ", WhereRegisterPlack)
      console.log("classeCode :>> ", classeCode)

      // #region classeParvandeh
      const classeParvandehObj = this.convertClasseParvandehCodeToString(
        this.classeParvandehCode
      )
      if (classeParvandehObj !== "0-0-0-0") {
        Where =
          Where +
          " AND LRC.Classe Like '" +
          this.normalizedClasseParvandeh(classeParvandehObj) +
          "%'"
      }
      // #end region

      // #region this.baseNosaziCode
      const nosazi = this.baseNosaziCode
      if (nosazi.District > 0) {
        Where = Where + " AND BCI.District =" + nosazi.District.toString()
      }
      if (nosazi.Region > 0) {
        Where = Where + " AND BCI.Region =" + nosazi.Region.toString()
      }
      if (nosazi.Block > 0) {
        Where = Where + " AND BCI.Block =" + nosazi.Block.toString()
      }
      if (nosazi.House > 0) {
        Where = Where + " AND BCI.House =" + nosazi.House.toString()
      }
      if (nosazi.Building > 0) {
        Where = Where + " AND BCI.Building =" + nosazi.Building.toString()
      }
      if (nosazi.Apartment > 0) {
        Where = Where + " AND BCI.Apartment =" + nosazi.Apartment.toString()
      }
      if (nosazi.Shop > 0) {
        Where = Where + " AND BCI.Shop =" + nosazi.Shop.toString()
      }
      // #end region

      // #region this.model.searchModel
      const obj = this.model.searchModel
      if (obj.Address !== "") {
        Where = " AND Address Like '%" + obj.Address + "%'"
      }
      if (obj.IDCardNo !== "") {
        Where = Where + " AND BO.IDCardNo = '" + obj.IDCardNo + "'"
      }
      if (obj.NationalCode !== "") {
        Where = Where + " AND BO.NationalCode = '" + obj.NationalCode + "'"
      }
      if (obj.OwnerFatherName !== "") {
        Where =
          Where +
          " AND BO.OwnerFatherName Like '%" +
          obj.OwnerFatherName +
          "%'"
      }
      if (obj.OwnerName !== "") {
        Where =
          Where +
          " AND ISNULL(BO.OwnerName, '') + ' ' + ISNULL(BO.OwnerLastName, '') Like '%" +
          obj.OwnerName +
          "%'"
      }
      if (obj.PostCode !== "") {
        Where = Where + " AND BO.PostCode Like '%" + obj.PostCode + "%'"
      }
      if (obj.RegisterSection !== "") {
        Where =
          Where +
          " AND BCS.RegisterSection Like '%" +
          obj.RegisterSection +
          "%'"
      }
      if (obj.RequesterName !== "") {
        Where =
          Where + " AND RI.RequesterName Like '%" + obj.RequesterName + "%'"
      }
      if (obj.Telephone !== "") {
        Where = Where + " AND BA.Telephone Like '%" + obj.Telephone + "%'"
      }
      if (
        obj.AreaFrom !== "" &&
        obj.AreaTo !== "" &&
        Number(obj.AreaFrom) >= 0 &&
        Number(obj.AreaTo) > 0
      ) {
        Where =
          Where +
          " AND A.TotalArea BETWEEN " +
          obj.AreaFrom.toString() +
          " AND " +
          obj.AreaTo.toString()
      }
      if (obj.BarCode) {
        Where =
          Where +
          " AND RI.NidRequest in(select NidRequest from ContractBuy_Info where Barcode ='" +
          obj.BarCode.toString() +
          "')"
      }
      if (obj.Contract) {
        Where =
          Where +
          " AND RI.NidRequest in(select NidRequest from ContractBuy_Info where ContractBuyNo ='" +
          obj.Contract.toString() +
          "')"
      }
      // #end region

      // #end region
      // try {
      //   for (let i = 0; i < this.searchItems.length; i++) {
      //     if (this.searchItems[i].Value !== null) {
      //       WhereRegisterPlack =
      //         WhereRegisterPlack +
      //         (WhereRegisterPlack === string.Empty ? "" : " OR ") +
      //         " (BRP.CI_RegisterPlackTypeGroup=" +
      //         this.searchItems.SearchItems[i].CI_RegisterPlackTypeGroup +
      //         " AND BRP.CI_RegisterPlackType =" +
      //         this.searchItems.SearchItems[i].CI_RegisterPlackType +
      //         " AND BRP.RegisterPlackTypeValue " +
      //         (this.chkIsLike === true ? "like '%" : "='") +
      //         this.searchItems.SearchItems[i].Value.ToString() +
      //         (this.chkIsLike === true ? "%')" : "')");
      //     }
      //   }

      //   WhereRegisterPlack =
      //     WhereRegisterPlack === string.Empty
      //       ? ""
      //       : " AND (" + WhereRegisterPlack + ")";
      // } catch {
      //   WhereRegisterPlack = "";
      // }
      // #end region
      return Where
    }
  },
  methods: {
    normalizedClasseParvandeh (code) {
      var a = code
      var parts = a.split("-")
      var b = ""
      for (var i = 0; i < parts.length; i++) {
        var n = Number(parts[i])
        var s = n.toString().padStart(5, "0")
        b += s + "-"
      }
      b = b.slice(0, -1)
      return b
    },

    async loadObj () {
      try {
        const payload = {
          pWhere: this.query,
          pWhereRegisterPlack: null,
          pFrom: 0,
          pTo: 100
        }
        this.showLoading()
        const { data } = await this.$services.ES.getSearchAll(payload)
        this.getSearchAllRes = this.getResponse(data)
        if (this.getSearchAllRes.success) {
          const res = this.getSearchAllRes.data.GetSearchAllResult
          this.searchAll = res.SearchAll ?? []
          if (this.query) {
            this.log({
              action: this.logActions.view,
              bizCode: this.query,
              bizCodeTitle: "pWhere",
              saveDesc: `جستجوی املاک و مستغلات با ورود اطلاعات: (${this.query})`
            })
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    resetObj (reload = false) {
      this.model = { searchModel: { ...defaultModel } }
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.classeParvandehCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0
      }
      if (reload) this.resetObj()
    }
  },
  watch: {
    searchMode: {
      handler () {
        this.resetObj()
      },
      deep: true
    }
  }
}
</script>
