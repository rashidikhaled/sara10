<template>
  <safa-form :id="formKey" :caption="title" app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB">
    <form-wrapper :title="title" vertical>
    <template #header>
      <safa-status :result="result"/>
      <safa-status :result="deletePriceResult"/>
      <safa-status :result="saveResult"/>
    </template>
      <fit>
        <safa-splitter v-model="spliterModel" separatorClass="q-mx-sm">
          <template v-slot:before>
            <safa-list
              :items="priceTitles"
              actions
              cdcName="priceTitles"
              title="عناوین قیمت گذاری"
              titleField="CITableNameTitle"
              @addNewItem="newShPrice"
              @deleteItem="deletePrice"
              @editItem="editName"
              @selectItem="priceTitleschanges($event)"
            />
          </template>
          <template v-slot:after>
            <fit>
              <FormRow class="q-mb-sm" :lg="4" :md="4" :sm="4" >
                <FormControl>
                  <safa-combo
                      v-model="priceType"
                      :m="mode"
                      cdcName="priceType"
                      ciName="CI_PriceType"
                      class="col-md-4"
                      domainName="CI_SaraM1"
                      label="نوع قیمت"
                      label-width="80px"
                    />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                      v-model="selectedDate"
                      :m="mode"
                      cdcName="selectedDate"
                      class="col-md-4"
                      label="تاریخ"
                      label-width="80px"
                    />
                </FormControl>
                <FormControl>
                  <safa-custom-text
                      v-model="price"
                      :m="mode"
                      cdcName="price"
                      class="col-md-4"
                      label="مبلغ"
                      label-width="80px"
                      type="money"
                    />
                </FormControl>
                <FormControl>
                  <safa-custom-text
                      v-model="minPrice"
                      :m="mode"
                      cdcName="minPrice"
                      class="col-md-4"
                      label="حداقل مبلغ"
                      label-width="80px"
                      type="money"
                    />
                </FormControl>
                <FormControl>
                  <safa-custom-text
                      v-model="maxPrice"
                      :m="mode"
                      cdcName="maxPrice"
                      class="col-md-4"
                      label="حداکثر مبلغ"
                      label-width="80px"
                      type="money"
                    />
                </FormControl>
                <FormControl>
                  <safa-custom-text
                      v-model="area"
                      :m="mode"
                      cdcName="decimal"
                      class="col-md-4"
                      label="مساحت"
                      label-width="80px"
                      type="decimal"
                    />
                </FormControl>
                <FormControl>
                  <safa-text
                      v-model="ratio"
                      :m="mode"
                      cdcName="ratio"
                      class="col-md-4"
                      label="ضریب"
                      label-width="80px"
                    />
                </FormControl>
                <FormControl>
                  <safa-custom-text
                      v-model="residentialDensity"
                      cdcName="residentialDensity"
                      class="col-md-4"
                      label="قیمت تراکم مسکونی"
                      label-width="80px"
                      m="r"
                      type="money"
                    />
                </FormControl>
                <FormControl>
                  <safa-custom-text
                      v-model="commercialDensity"
                      cdcName="commercialDensity"
                      class="col-md-4"
                      label="قیمت تراکم تجاری"
                      label-width="80px"
                      m="r"
                      type="money"
                    />
                </FormControl>
                <FormControl>
                    <safa-text
                      v-model="others"
                      cdcName="others"
                      class="col-md-4"
                      label="سایر"
                      label-width="80px"
                      m="r"
                    />
                </FormControl>
              </FormRow>
              <fit>
                  <FormRow class="q-mb-sm" :lg="4" :md="4" :sm="4" >
                    <UpriceComboIllustration
                      v-for="(part,i) in tmpCILists"
                      :key="i"
                        :value="part"
                        :mode="isEditable === true? 'e': 'r'"
                     ></UpriceComboIllustration>
                     </FormRow>
                <safa-grid
                  v-model="shPriceResults.Sh_Price"
                  :addRow="false"
                  :allowCopy="false"
                  helper="agPriceColumns"
                  :deleteRow="false"
                  :m="mode"
                  :paginate="true"
                  sortable
                  :isRowSelectable="() => true"
                  :checkboxSelection="true"
                  cdcName="Sh_Price"
                  filterable
                  fit
                  height="100%"
                  max-height="100%"
                  title="قیمت گذاری"
                  :showRowNumber="true"
                  :suppressRowClickSelection="false"
                  @row:click="onSelectedPrice"
                />
                  <!-- @selection:changed="onSelectionChanged" -->
              </fit>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          :showNewButton="true"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @newInfo="newInfo"
          @save="saveData"
        >
          <template v-slot:after>
            <btn-delete label="حذف" @click="deleteRow"/>
          </template>
        </form-actions>
      </template>
    </form-wrapper>
    <safa-popup v-model="isShowNewPriceModal" title="لیست جدید" vertical>
      <PriceNewList
        ref="newList"
        :formKey="formKey"
        :name="name"
        :selectDist="selectDist"
        :title="title"
        @reload="reload"
      />
    </safa-popup>
    <safa-popup
      v-model="isShowEditNameModal"
      height="200px"
      title="نام ترکیبی"
      width="400px"
    >
      <PriceEditName
        ref="editPrice"
        :selectDist="selectDist"
        :selectedPrice="selectedPrice"
        @reload="reload"
      />
    </safa-popup>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import PriceNewList from './partials/PriceNewList'
import PriceEditName from './partials/PriceEditName'
import UpriceComboIllustration from './partials/UpriceComboIllustration'

export default {
  route: '/price-settings/pricing',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'قیمت گذاری',
      formKey: '37FA5F62-753E-4E2D-B01F-F8A452A98420',
      name: 'UPricing',
      spliterModel: 15,
      main: true,
      sidebarCompatible: true,
      take: 10000,
      page: 1,
      skip: 0,
      result: null,
      tmpCILists: [],
      results: { Sh_PriceTitles: [] },
      priceTitles: [],
      shCIForPrice: [],
      shPriceResult: null,
      shPriceResults: { Sh_Price: [] },
      selectedRow: null,
      priceType: '',
      selectedDate: '',
      price: '',
      minPrice: '',
      maxPrice: '',
      area: '',
      ratio: '',
      residentialDensity: '',
      commercialDensity: '',
      others: '',
      isShowNewPriceModal: false,
      selectedPrice: null,
      deletePriceResult: null,
      isShowEditNameModal: false,
      saveResult: null,
      newPrice: false,
      priceTitle: null,
      selectDist: 1
    }
  },
  components: { PriceNewList, PriceEditName, UpriceComboIllustration },
  mounted () {
    if (this.selectedRequest) {
      this.selectDist = this.selectedDistrict
    }
    this.getShCIForPrice()
    this.load()
  },
  computed: {
    totalRow () {
      if (this.shPriceResults.Sh_Price.length > 0) {
        return (this.shPriceResults.Sh_Price[0] || {}).TableCount || 0
      } else {
        return 0
      }
    }
  },
  methods: {
    updatePaging ({ page, perPage, total, lastPage, from, to }) {
      this.page = page
      this.take = perPage
      this.getShPrice(this.selectedPrice)
    },

    // edit () {
    //   if (this.selectedRow) {
    //     this.isEditable = true
    //   } else {
    //     this.showError("لطفا یک ردیف برای ویرایش انتخاب نمایید.")
    //   }
    // },
    getShCIForPrice () {
      this.showLoading()
      let data = {}
      this.$services.SB.getShCIForPrice(data, {
        config: { District: this.selectDist }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            this.priceTitles = this.results.Sh_PriceTitles
            this.shCIForPrice = this.results.Sh_CIForPrice
          }
        })
        .catch((response) => {
          console.debug('loading error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    load () {
      this.showLoading()
      let data = {}
      this.$services.SB.getShPriceCiTableNames(data, {
        config: { District: this.selectDist }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            this.priceTitles = this.results.Sh_PriceTitles
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    priceTitleschanges (priceTitle) {
      this.tmpCILists = []
      let tmpSelected = priceTitle.CITableName
      // Create CI Combos
      let tmpCIs = tmpSelected.split('&')
      for (let i = 0; i < tmpCIs.length; i++)
      {
        let tmpDescription = this.shCIForPrice.filter(f => f.CITableName === tmpCIs[i]).map(f => f.CIDescription)[0]
        this.tmpCILists.push(
          {
            SelectedItem: 0,
            CI: tmpCIs[i],
            CICaption: tmpDescription ?? ""
          })
      }
      // CiList = new ObservableCollection<srvSB.clsComboControl>(tmpCILists)  todo
      // u_combos.CIList = CiList
      // CITableName = tmpSelected
      this.getShPrice(priceTitle)
    },
    getShPrice (priceTitle) {
      this.showLoading()
      this.selectedPrice = priceTitle
      const from = (this.page - 1) * this.take
      let data = {
        pCiTableName: priceTitle.CITableName,
        pFrom: from,
        pTo: from + this.take,
        pWhereCondition: ''
      }
      this.$services.SB.getShPrice(data, {
        config: { District: this.selectDist }
      })
        .then(async ({ data }) => {
          this.shPriceResult = this.getResponse(data)

          if (this.shPriceResult.success) {
            this.shPriceResults = this.shPriceResult.data
            this.shPriceResults.Sh_Price = this.shPriceResults.Sh_Price.map((x, i) => {
              return {
                ...x,
                RowNumber: i + 1
              }
            })
            await this.log({
              action: this.logActions.view,
              bizCode: priceTitle.CITableName,
              bizCodeTitle: 'CITableName'
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    onSelectionChanged (params) {
      if (params.api.getSelectedRows()[0]) {
        let selectedRow = params.api.getSelectedRows()[0]
        this.priceType = selectedRow.CI_PriceType
        this.selectedDate = selectedRow.DatePrice
        this.price = selectedRow.Price
        this.minPrice = selectedRow.MinPrice
        this.maxPrice = selectedRow.MaxPrice
        this.selectedDate = selectedRow.DatePrice
        this.area = selectedRow.Area
        this.ratio = selectedRow.Ratio
        this.residentialDensity = selectedRow.ResidentialDensity
        this.commercialDensity = selectedRow.CommercialDensity
        this.others = selectedRow.Others
        if (selectedRow.CICode !== '' && selectedRow.CICode !== null)
        {
          let tmpCIs = selectedRow.CICode.split('&')
          this.tmpCILists.forEach((item, i) =>
          {
            item.SelectedItem = parseInt(tmpCIs[i])
          })
        }
      }
    },
    onSelectedPrice (params) {
      this.selectedRow = params.data
      this.priceType = this.selectedRow.CI_PriceType
      this.selectedDate = this.selectedRow.DatePrice
      this.price = this.selectedRow.Price
      this.minPrice = this.selectedRow.MinPrice
      this.maxPrice = this.selectedRow.MaxPrice
      this.area = this.selectedRow.Area
      this.ratio = this.selectedRow.Ratio
      this.residentialDensity = this.selectedRow.ResidentialDensity
      this.commercialDensity = this.selectedRow.CommercialDensity
      this.others = this.selectedRow.Others
      if (this.selectedRow.CICode !== '' && this.selectedRow.CICode !== null)
      {
        let tmpCIs = this.selectedRow.CICode.split('&')
        this.tmpCILists.forEach((item, i) =>
        {
          item.SelectedItem = parseInt(tmpCIs[i])
        })
      }
    },
    newShPrice () {
      this.isShowNewPriceModal = true
    },
    deletePrice () {
      this.showLoading()
      let data = {
        pCITableName: this.selectedPrice.CITableName
      }
      this.$services.SB.deleteShPriceByCItableName(data, {
        config: { District: this.selectDist }
      })
        .then(({ data }) => {
          this.deletePriceResult = this.getResponse(data)

          if (this.deletePriceResult.success) {
            this.load()
            this.showSuccess('اسم ترکیبی انتخاب شده با موفقیت حذف شد.')
          }
        })
        .catch((response) => {
          this.serverError()
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
      this.tmpCILists = []
      this.selectedRow = null
      this.area = 0
      this.ratio = ""
      this.residentialDensity = ''
      this.commercialDensity = ''
      this.others = ""
      this.selectedDate = ''
      this.maxPrice = 0
      this.minPrice = 0
      this.price = 0
    },
    saveData () {
      debugger
      this.showLoading()
      let cICodes = ''
      this.tmpCILists.forEach(item => {
        if (cICodes !== "") { cICodes += "&" }
        cICodes += item.SelectedItem === null ? "0" : item.SelectedItem.toString()
      })

      let data = {
        pSh_Price: {
          CICode: cICodes,
          Area: this.area || 0,
          Ratio: this.ratio,
          ResidentialDensity: this.residentialDensity,
          CommercialDensity: this.commercialDensity,
          Others: this.others,
          CITableName: this.selectedRow.CITableName,
          CITableNameTitle: this.selectedRow.CITableNameTitle,
          CI_PriceType: this.selectedRow.CI_PriceType,
          DatePrice: this.selectedDate || '',
          MaxPrice: this.maxPrice || 0,
          MinPrice: this.minPrice || 0,
          NidPrice: this.selectedRow.NidPrice,
          Price: this.price || 0
        }
      }
      if (this.newPrice) {
        data.pSh_Price.NidPrice = '00000000-0000-0000-0000-000000000000'
      }
      this.$services.SB.SaveShPrice(data, {
        config: { District: this.selectDist }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess('وبرایش اطلاعات با موفقیت انجام شد.')
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedPrice.NidPrice,
              bizCodeTitle: "NidPrice"
            })
          }
          this.getShPrice(this.selectedPrice)
        })
        .catch((response) => {
          console.debug('save error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    deleteRow () {
      this.showConfirm('آیا از حذف قیمت انتخاب شده اطمینان دارید؟').onOk(() => {
        if (this.selectedRow === null) {
          this.showError("هیچ مقداری برای حذف انتخاب نشده است")
          return
        }
        this.showLoading()
        let data = {
          pSh_Price: { ...this.selectedRow }
        }
        this.$services.SB.deleteShPrice(data, {
          config: { District: this.selectDist }
        })
          .then(({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              this.showSuccess('حذف اطلاعات با موفقیت انجام شد.')
              this.getShPrice(this.selectedPrice)
            }
          })
          .catch((response) => {
            console.debug('delete error', response)
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
