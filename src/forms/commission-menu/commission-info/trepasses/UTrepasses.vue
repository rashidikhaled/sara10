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
            <safa-text
              label="شماره دبیرخانه"
              label-width="80px"
              v-model="model.Commission_Info.SecretariatNo"
              cdcName="SecretariatNo"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام مالک"
              label-width="80px"
              v-model="model.Commission_Info.OwnerName"
              cdcName="OwnerName"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              ciName="CI_CommissionType"
              domainName="Commission100"
              label="نوع کمیسیون"
              label-width="80px"
              v-model="model.Commission_Info.CI_CommissionType"
              cdcName="CI_CommissionType"
              m="r"
            />
          </FormControl>
          <FormControl>
            <nosazi-code-input
              label="کد نوسازی"
              label-width="80px"
              :actions="false"
              v-model="baseNosaziCode"
              cdcName="baseNosaziCode"
              required
              m="r"
            />
          </FormControl>
          <text-template
            label="آدرس"
            label-width="80px"
            class="col-12"
            :rows="1"
            v-model="model.Commission_Info.Address"
            cdcName="Address"
            m="r"
          />
        </FormRow>
        <!-- <div> -->
        <safa-grid
          helper="commissionTrepassesColumns"
          v-model="model.CommissionTrepasses"
          cdcName="CommissionTrepasses"
          height="100%"
          max-height="100%"
          min-height="200px"
          :lazyLoad="false"
          :allowMultipleSelection="false"
          :m="mode"
          :rowHeight="40"
          paginate
          fit
          id="Violation"
          title="تخلفات"
        >
        </safa-grid>
      </fit>

      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveData"
          @cancel="isEditable = false"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { uid } from "quasar"
export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "ویرایش تخلفات",
      name: "UTrepasses",
      formKey: "b87d1ec7-4a0e-4efd-9f2d-97af1d1e52ef",
      main: true,

      isView: false,
      CIUsingGroup: null,
      CIUsingType: null,
      baseNosaziCode: {},
      model: {
        Commission_Info: {
          Address: "",
          OwnerName: "",
          SecretariatNo: null,
          CI_CommissionType: 0
        },
        CommissionTrepasses: [],
        NidCommission: "00000000-0000-0000-0000-000000000000"
      }

      // commissionTrepassesColumns: [
      //   {
      //     field: 'isSelectedNode',
      //     title: '',
      //     width: '74px',
      //     filterable: true,
      //     lockPosition: true,
      //     pinned: 'right',
      //     editor: 'selection'
      //   },
      //   {
      //     field: "CI_TrepassType_Group",
      //     title: "گروه تخلف",
      //     width: "100px",
      //     editor: "ci",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "Id",
      //     title: "نوع تخلف",
      //     width: "300px",
      //     editor: "ci",
      //     domain: "Commission100",
      //     ciName: "CI_TrepassType"
      //   },
      //   {
      //     field: "IncomeArea",
      //     title: "حوزه درآمدی",
      //     width: "100px"
      //   },
      //   {
      //     field: "TitleOld",
      //     title: "تخلف",
      //     width: "100px"
      //   },
      //   {
      //     field: "CI_Years",
      //     title: "سال تخلف",
      //     width: "120px",
      //     editor: "combo",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "TrepassValue",
      //     title: "مقدار تخلف",
      //     width: "100px",
      //     editor: "numeric"
      //   },
      //   {
      //     field: "CalculationPrice",
      //     title: "قیمت محاسباتی",
      //     width: "100px",
      //     editor: "numeric"
      //   },
      //   {
      //     field: "MinPenalty",
      //     title: "حداقل جریمه",
      //     width: "100px",
      //     editor: "numeric"
      //   },
      //   {
      //     field: "MaxPenalty",
      //     title: "حداکثر جریمه",
      //     width: "100px",
      //     editor: "numeric"
      //   },
      //   {
      //     field: "Floor",
      //     title: "طبقه",
      //     width: "100px",
      //     editor: "numeric"
      //   },
      //   {
      //     field: "UsingID",
      //     title: "کاربری فرعی موجود",
      //     width: "100px",
      //     editor: "combo",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "UsingTitle",
      //     title: "گروه کاربری فرعی",
      //     width: "100px"
      //   },
      //   {
      //     field: "CI_UsingTypeGroupMojaz",
      //     title: "گروه کاربری اصلی مجاز",
      //     editor: "combo",
      //     domain: "Commission100",
      //     width: "100px"
      //   },
      //   {
      //     field: "CI_UsingTypeMojaz",
      //     title: "گروه کاربری فرعی مجاز",
      //     width: "100px",
      //     editor: "combo",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "UsingGroupID",
      //     title: "گروه کاربری اصلی موجود",
      //     width: "100px",
      //     editor: "combo",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "TrespassDateInMunicipality",
      //     title: "تاریخ وقوع تخلف از نظر شهرداری",
      //     width: "150px",
      //     editor: "date"
      //   },
      //   {
      //     field: "TrespassDateInEngineer",
      //     title: "تاریخ وقوع تخلف از نظر مهندس ناظر",
      //     width: "150px",
      //     editor: "date"
      //   },
      //   {
      //     field: "TrespassDateHappendNotMelak",
      //     title: "تاریخ وقوع خلاف ملاک عمل",
      //     width: "150px",
      //     editor: "date"
      //   },
      //   { field: "P", title: "P", width: "100px" },

      //   {
      //     field: "IncomeArea",
      //     title: "حوزه درآمدی",
      //     editor: "numeric",
      //     width: "100px"
      //   },
      //   {
      //     field: "K",
      //     title: "ارزش معاملاتی طبق تبصره 11 ماده صد (k)",
      //     width: "300px"
      //   },
      //   {
      //     field: "KCoeffiecient",
      //     title: "ضریب معاملاتی طبق تبصره 11 ماده صد (k)",
      //     width: "300px"
      //   },
      //   {
      //     field: "KCoeffiecientNote3",
      //     title: "ضریب ارزش سرقفلی تجاری طبق تبصره 3 ذیل ماده صد (k)",
      //     width: "300px"
      //   },
      //   { field: "UrbanIdia", title: "تقاضای شهردار", width: "100px" },
      //   {
      //     field: "CI_SazeType",
      //     title: "نوع اسکلت",
      //     width: "100px",
      //     editor: "combo",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "BuildingStep",
      //     title: "مرحله ساختمانی",
      //     width: "100px"
      //   },
      //   {
      //     field: "DescriptionOfSystem",
      //     title: "شرح مقدار سیستمی",
      //     width: "100px"
      //   },
      //   {
      //     field: "CreateDate",
      //     title: "تاریخ درج",
      //     width: "150px",
      //     editor: "date"
      //   },
      //   { field: "CreateTime", title: "زمان درج", width: "100px" },
      //   {
      //     field: "VahedCountMosavab",
      //     title: "تعداد واحد موجود",
      //     width: "100px"
      //   },
      //   { field: "VahedCountMojaz", title: "تعداد واحد مجاز", width: "100px" },
      //   {
      //     field: "AreaMojod",
      //     title: "متراژ موجود",
      //     width: "100px",
      //     editor: "numeric"
      //   },
      //   {
      //     field: "AreaMojaz",
      //     title: "متراژ مجاز",
      //     width: "100px",
      //     editor: "numeric"
      //   },
      //   { field: "Trepass_Comments", title: "توضیحات تخلف", width: "100px" },
      //   { field: "Note", title: "تبصره", width: "100px" },
      //   {
      //     field: "IsComplainant",
      //     title: "شاکی دارد/ ندارد",
      //     width: "100px",
      //     editor: "checkbox"
      //   },
      //   {
      //     field: "IsRightsBystanders",
      //     title: "حقوق مجاورین",
      //     width: "100px",
      //     editor: "checkbox"
      //   }
      // ]
    }
  },

  mounted () {
    if (this.selectedNidCommission !== null) {
      this.loadData(this.selectedNidCommission)
    } else {
      return this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
    this.getCIUsingGroup()
    this.getCIUsingType()
  },

  methods: {
    onSetCI_TrepassType_Group (row, val, onChangeCellValue) {
      onChangeCellValue({
        field: ["CI_TrepassType_Group"],
        dataItem: row,
        value: val
      })
      // const filterdResult=this.$refs.datasource.filter
      this.getCITrepassTypeFromCITrepassTypeGroup(val, row.uidForRef)
    },
    getCITrepassTypeFromCITrepassTypeGroup (val, ref) {
      const payload = {
        pCI_TrepassType_Group: val
      }
      this.$services.commissions
        .getCITrepassTypeFromCITrepassTypeGroup(payload)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.$refs[ref].datasource =
              res.data.GetCITrepassType_FromI_TrepssType_GrouResult.CI_TrepassType_FromCI_TrepassType_Group
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadData (NidCommission) {
      this.isEditable = false
      this.showLoading()
      const payload = { pRequest: { NIDCommission: NidCommission } }
      this.$services.commissions
        .getTrepasses(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success && res.data?.GetTrepassesResult?.ClsTrepasses) {
            this.model = res.data.GetTrepassesResult.ClsTrepasses
            this.model.CommissionTrepasses.map((x) => {
              return {
                ...x,
                uidForRef: uid()
              }
            })
            this.baseNosaziCode = convertStringToNosaziCodeObject(
              res.data.GetTrepassesResult.ClsTrepasses.Commission_Info
                .CodeString
            )
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: NidCommission,
                bizCodeTitle: "NidCommission",
                saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
              })
            }
            this.isView = true
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getCIUsingGroup () {
      this.showLoading()
      let payLoad = {
        ciName: "CI_UsingGroup",
        domainName: "Commission100"
      }
      this.$services.CiSrvSara.getCI(payLoad)
        .then(({ data }) => {
          let ciResult = this.getResponse(data)
          if (ciResult.success) {
            this.CIUsingGroup = ciResult.data
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getCIUsingType () {
      this.showLoading()
      let payLoad = {
        ciName: "CI_UsingType",
        domainName: "Commission100"
      }
      this.$services.CiSrvSara.getCI(payLoad)
        .then(({ data }) => {
          let ciResult = this.getResponse(data)
          if (ciResult.success) {
            this.CIUsingType = ciResult.data
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {
      if (this.selectedNidCommission === null) {
        return this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      }
      this.model.CommissionTrepasses.forEach((i) => {
        let TmpItem = this.CIUsingGroup?.data?.list.find(
          (f) => f.ID === i.UsingGroupID
        )
        if (TmpItem) {
          i.UsingGroupTitle = TmpItem.Title
        }
      })
      this.model.CommissionTrepasses.forEach((i) => {
        let TmpItem = this.CIUsingType?.data?.list.find(
          (f) => f.ID === i.UsingID
        )
        if (TmpItem) {
          i.UsingTitle = TmpItem.Title
        }
      })
      this.model.ValidateCommissionTrepassesBySystem = true
      this.showLoading()
      this.$services.commissions
        .saveTrepasses({ ClsTrepasses: this.model })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: "NidCommission",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.loadData(res.data.SaveTrepassesResult.NidCommission)
          } else {
            if (res.data.SaveTrepassesResult.ErrorResult.BizErrors.length > 0) {
              return this.showError(
                res.data.SaveTrepassesResult.ErrorResult.BizErrors[0].ErrorTitel
              )
            }
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
