<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getNidBaseRes" />
        <safa-status :result="savePricesRes" />
        <safa-status :result="confirmRes" />
        <formHeaderByNosaziCode
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="getNidBase"
          enabled="1-1-1-1-0-0-0"
          :m="isEditable?'r':'e'"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm" v-if="hasInfoGroup">
          <FormControl>
            <safa-combo
              label="دسته اطلاعاتی"
              label-width="80px"
              v-model="selectedBaseInfoGroup"
              cdcName="selectedBaseInfoGroup"
              :options="infoGroupOptions"
              source-type="local"
              ref="selectedBaseInfoGroup"
            />
          </FormControl>
        </FormRow>
        <safa-grid
          :title="title"
          :columns="shEconomicPriceInNosaziCode"
          v-model="model.Sh_EconomicPriceInNosaziCode"
          cdcName="shEconomicPriceInNosaziCode"
          :m="mode"
          :addRow="true"
          :allowCopy="true"
          :deleteRow="true"
          fit
          height="100%"
          max-Height="100%"
          min-Height="100px"
          @row:click="rowClick"
          :defaultNewRow="defaultNewRow"
        />
      </fit>

      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="editObj"
          @save="saveObj"
        >
          <template v-slot:after v-if="!isEditable">
            <btn-save :disabled="!selectedRow" label="تأیید" @click="confirm" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"
import { currentDate, currentTime } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "URegionPiceNosazi",
      title: "قیمت منطقه ای بر اساس کد نوسازی",
      formKey: "37FA5F62-753E-4E2D-B01F-F8A452A98420",
      main: true,

      selectedRow: null,
      selectedBaseInfoGroup: 0,
      getNidBaseRes: null,
      savePricesRes: null,
      model: {
        Sh_EconomicPriceInNosaziCode: []
      },
      nidBase: null,
      confirmRes: null,
      selectedPrice: null,
      isView: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      shEconomicPriceInNosaziCode: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          field: "CI_DutyYear",
          title: "سال",
          editor: "ci",
          domain: "CI_SaraM1",
          comboSort: "desc",
          width: "100px"
        },
        {
          field: "Price",
          title: "قیمت",
          editor: 'money',
          width: "250px"
        },
        {
          field: "CI_PriceGroup",
          title: "کد گروه مبالغ",
          domain: "CI_SaraM1",
          editor: "ci",
          width: "200px"
        },
        {
          field: "UserName",
          title: "کاربر ایجاد کننده",
          editable: false,
          width: "200px"
        },
        {
          field: "CreateDate",
          title: "تاریخ ایجاد",
          editable: false,
          editor: "date",
          width: "100px"
        },
        {
          field: "CreateTime",
          title: "زمان ایجاد",
          editable: false,
          width: "100px"
        },
        {
          field: "IsConfirm",
          title: "تایید شده",
          editor: "checkbox",
          editable: false,
          width: "100px"
        },
        {
          field: "CI_EconomicPriceDegree",
          title: "درجه",
          domain: "CI_SaraM1",
          editor: "ci",
          width: "150px"
        },
        {
          field: "CI_EconomicPriceOccurrence",
          domain: "CI_SaraM1",
          editor: "ci",
          title: "وضعیت وقوع",
          width: "150px"
        },
        {
          field: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "کاربری اصلی",
          width: 150,
          triggerCells: [["CI_UsingType"]]
        },
        {
          field: "CI_UsingType",
          title: "نوع استفاده فرعی",
          width: 150,
          ignoreCi: true,
          editor: "ADPGridTemplate",
          params: {
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            paramName: "pCI_UsingGroup",
            groupField: "CI_UsingGroup"
          }
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "300px"
        }
      ]
    }
  },

  computed: {
    defaultNewRow () {
      return {
        CI_DutyYear: 0,
        Price: 0,
        CI_PriceGroup: 0,
        UserName: this.currentUser?.FullName ?? this.getUserDisplayName(),
        CreateDate: currentDate(),
        CreateTime: currentTime(),
        IsConfirm: false,

        CI_EconomicPriceDegree: null,
        CI_EconomicPriceOccurrence: null,
        CI_UsingGroup: null,
        CI_UsingType: null,
        Comments: null,
        NidBase: "00000000-0000-0000-0000-000000000000",
        NidEconomic: "00000000-0000-0000-0000-000000000000",
        NidUser: "00000000-0000-0000-0000-000000000000",
        TmpNidUserS: null
      }
    },
    config () {
      return {
        config: { District: this.baseNosaziCode.District }
      }
    },

    hasInfoGroup () {
      // eslint-disable-next-line no-undef
      return (
        window.getConfigValue("infoGroupCombo")?.isShowBaseInfoGroupCombo ??
        false
      )
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo")?.infoGroupOptions ?? []
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.getNidBase()
    }
  },
  methods: {
    rowClick ({ data }) {
      this.selectedRow = data
    },
    async loadObj () {
      this.selectedPrice = null
      this.selectedRow = null
      this.isEditable = false
      await this.getEconomicPriceInNosaziCode()
    },
    async getEconomicPriceInNosaziCode () {
      try {
        this.showLoading()
        const { data } = await this.$services.SB.getEconomicPriceInNosaziCode(
          { pNidBase: this.nidBase },
          this.config
        )
        this.getEconomicPriceInNosaziCodeRes = this.getResponse(data)
        const res = this.getEconomicPriceInNosaziCodeRes
        if (res.success) {
          this.model = res.data
          if (!this.isView) {
            const strNosazi = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
              .split("-")
              .reverse()
              .join("-")
            const selectedBaseInfoGroupTitle =
              this.$refs.selectedBaseInfoGroup.selectedItem.Title
            const saveDesc = this.hasInfoGroup
              ? `نمایش فرم قیمت منطقه ای بر اساس کد نوسازی ${strNosazi} براساس دسته اطلاعاتی "${selectedBaseInfoGroupTitle}"  `
              : `نمایش فرم قیمت منطقه ای بر اساس کد نوسازی ${strNosazi} `
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidBase,
              bizCodeTitle: "nidBase",
              saveDesc
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      if (!this.nidBase) {
        return this.showError("لطفا کدنوسازی را وارد نمایید.")
      }
      this.model.Sh_EconomicPriceInNosaziCode = this.model.Sh_EconomicPriceInNosaziCode.map((x) => {
        return {
          ...x,
          NidEconomic: "00000000-0000-0000-0000-000000000000"
        }
      })
      debugger
      try {
        const payload = {
          pClsDutyPrice: {
            Sh_CIForPrice: null,
            Sh_EconomicPriceInEdge: null,
            Sh_EconomicPriceInNosaziCode: this.model.Sh_EconomicPriceInNosaziCode || [],
            Sh_FinancePrice: null,
            Sh_Price: null,
            Sh_PriceAll: null,
            Sh_PriceTitles: null,
            ValBlockFordCount: 0,
            _BlockNo: 0,
            _CITableName: null,
            _CI_DutyYear: 0,
            _NidBase: this.nidBase
          },
          pUserCode: this.getNidUser(),
          pFullUserName: this.getUserDisplayName(),
          pUserName: this.getUserDisplayName(),
          isAdmin: this.currentUser.isSysAdmin || false
        }
        this.showLoading()
        const { data } = await this.$services.SB.savePrices(
          payload,
          this.config
        )
        this.savePricesRes = this.getResponse(data)
        if (this.savePricesRes.success) {
          this.showSuccess("عملیات ذخیره با موفقیت انجام شد.")

          const strNosazi = convertNosaziCodeObjectToString(this.baseNosaziCode)
            .split("-")
            .reverse()
            .join("-")
          const selectedBaseInfoGroupTitle =
            this.$refs?.selectedBaseInfoGroup?.selectedItem?.Title ?? ""
          const saveDesc = this.hasInfoGroup
            ? `ذخیره عملیات قیمت منطقه ای بر اساس کد نوسازی ${strNosazi} براساس دسته اطلاعاتی "${selectedBaseInfoGroupTitle}"  `
            : `ذخیره عملیات قیمت منطقه ای بر اساس کد نوسازی ${strNosazi} `
          await this.log({
            action: this.logActions.save,
            bizCode: this.nidBase,
            bizCodeTitle: "nidBase",
            saveDesc
          })

          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    confirm () {
      try {
        this.showConfirm("آیا از تایید مطمئن هستید؟").onOk(async () => {
          this.showLoading()
          const { data } =
            await this.$services.SB.confirmShEconomicPriceInNosaziCode(
              { pNidEconomic: this.selectedRow.NidEconomic },
              this.config
            )
          this.confirmRes = this.getResponse(data)
          if (this.confirmRes.success) {
            this.showSuccess("عملیات تایید با موفقیت انجام گردید.")
            const strNosazi = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
              .split("-")
              .reverse()
              .join("-")
            const selectedBaseInfoGroupTitle =
              this.$refs?.selectedBaseInfoGroup?.selectedItem?.Title ?? ""
            const saveDesc = this.hasInfoGroup
              ? `تایید عملیات قیمت منطقه ای بر اساس کد نوسازی ${strNosazi} براساس دسته اطلاعاتی "${selectedBaseInfoGroupTitle}" برای NidEconomic با مقدار ${this.selectedRow.NidEconomic}`
              : `تایید عملیات قیمت منطقه ای بر اساس کد نوسازی ${strNosazi} برای NidEconomic با مقدار ${this.selectedRow.NidEconomic}`
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.selectedRow.NidEconomic,
              bizCodeTitle: "NidEconomic",
              saveDesc
            })
            this.loadObj()
          }
        })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getNidBase () {
      this.baseNosaziCode = {
        ...this.baseNosaziCode,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      try {
        const payload = {
          pDistrict: this.baseNosaziCode.District,
          pRegion: this.baseNosaziCode.Region,
          pBlock: this.baseNosaziCode.Block,
          pHouse: this.baseNosaziCode.House,
          pBuilding: this.baseNosaziCode.Building,
          pApartment: this.baseNosaziCode.Apartment,
          pShop: this.baseNosaziCode.Shop,
          pDutyType: 1,
          pEumNosaziCodeGroup: 0,
          pEumBaseInfoGroup: this.selectedBaseInfoGroup
        }

        this.showLoading()
        const { data } = await this.$services.SB.getNidBase(
          payload,
          this.config
        )
        this.getNidBaseRes = this.getResponse(data)
        if (this.getNidBaseRes.success) {
          this.nidBase =
            (this.getNidBaseRes.data && this.getNidBaseRes.data.NidBase) ||
            null
          await this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    editObj () {
      if (this.baseNosaziCode.District === 0) {
        return this.showError("لطفا کد نوسازی را وارد کنید.")
      }
      this.isEditable = true
    },
    selectedChange ({ dataItem }) {
      this.selectedPrice = dataItem
    }
  },
  watch: {
    selectedBaseInfoGroup () {
      this.loadObj()
    }
  }
}
</script>
