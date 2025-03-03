<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="getHousePlanInfoRes" />
        <safa-status :result="deleteObjRes" />
        <safa-status :result="saveHousePlanInfoRes" />
      </template>
      <fit>
        <safa-grid
          fit
          title="لیست طرح ها"
          :columns="housePlanColumns"
          v-model="list"
          m="r"
          :suppressRowClickSelection="false"
          height="100%"
          min-height="400px"
          max-height="100%"
          class="q-mb-sm"
          paginate
          :pageSize="20"
          @row:click="selectedRowHandler"
        />
        <internal-section class="q-mb-md" defaultShow title="مساحت عرصه">
          <FormRow>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.CurrentAreaInPlan"
                cdcName="CurrentAreaInPlan"
                :label-shrink="false"
                :m="mode"
                label="در مسیر پروژه"
              />
            </FormControl>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.CurrentAreaIn24"
                cdcName="CurrentAreaIn24"
                :label-shrink="false"
                :m="mode"
                label="ماده 24"
              />
            </FormControl>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.CurrentAreaRemain"
                cdcName="CurrentAreaRemain"
                :label-shrink="false"
                :m="mode"
                label="باقیمانده"
              />
            </FormControl>
          </FormRow>
        </internal-section>

        <internal-section class="q-mb-md" defaultShow title="مساحت اعیان">
          <FormRow>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.BuildingInPaln"
                cdcName="BuildingInPaln"
                :label-shrink="false"
                :m="mode"
                label="در مسیر پروژه"
              />
            </FormControl>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.BuildingIn24"
                cdcName="BuildingIn24"
                :label-shrink="false"
                :m="mode"
                label="ماده 24"
              />
            </FormControl>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.BuildingRemain"
                cdcName="BuildingRemain"
                :label-shrink="false"
                :m="mode"
                label="باقیمانده"
              />
            </FormControl>
          </FormRow>
        </internal-section>

        <internal-section class="q-mb-md" defaultShow title="کمیسیون ماده 12">
          <FormRow>
            <FormControl>
              <safa-combo
                label-width="100px"
                v-model="model.HousePlan_Info.CI_Commission12"
                cdcName="CI_Commission12"
                :label-shrink="false"
                ciName="CI_Commission12"
                domainName="Estate"
                :m="mode"
                label="رأی کمسیون ماده 12"
              />
            </FormControl>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.Commission12No"
                cdcName="Commission12No"
                :label-shrink="false"
                :m="mode"
                label="شماره"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ"
                label-width="100px"
                cdcName="Commission12Date"
                :label-shrink="false"
                v-model="model.HousePlan_Info.Commission12Date"
                :m="mode"
              />
            </FormControl>
          </FormRow>
        </internal-section>

        <internal-section defaultShow title="مصالح">
          <FormRow class="q-mb-sm">
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.RowOnMap"
                cdcName="RowOnMap"
                :label-shrink="false"
                :m="mode"
                label="ردیف نقشه"
              />
            </FormControl>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.GreenArea"
                cdcName="GreenArea"
                :label-shrink="false"
                :m="mode"
                label="حریم فضای سبز"
              />
            </FormControl>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.DocArea"
                cdcName="DocArea"
                :label-shrink="false"
                :m="mode"
                label="مساحت عرصه"
              />
            </FormControl>
            <FormControl>
              <safa-text
                type="number"
                label-width="100px"
                v-model="model.HousePlan_Info.AyanArea"
                cdcName="AyanArea"
                :label-shrink="false"
                :m="mode"
                label="مساحت اعیان"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                label-width="100px"
                v-model="model.HousePlan_Info.CI_OwnedType"
                cdcName="CI_OwnedType"
                :label-shrink="false"
                ciName="CI_OwnedType"
                domainName="Estate"
                :m="mode"
                label="نوع تملک"
              />
            </FormControl>
            <div class="col-12 q-my-sm">
              <div class="flex items-center">
                <safa-label style="width: 220px"
                  >باقی مانده عرصه متعلق به شهرداری است؟</safa-label
                >
                <div class="q-gutter-x-lg">
                  <safa-radio
                    label="بلی"
                    :val="true"
                    :m="mode"
                    size="xs"
                    v-model="
                      model.HousePlan_Info.RemainingAreaBelongingMunicipality
                    "
                  />
                  <safa-radio
                    label="خیر"
                    :val="false"
                    :m="mode"
                    size="xs"
                    class="q-mx-sm"
                    label-width="100px"
                    v-model="
                      model.HousePlan_Info.RemainingAreaBelongingMunicipality
                    "
                  />
                </div>
              </div>
            </div>
            <div class="col-12 q-mb-sm">
              <div class="flex items-center">
                <safa-label style="width: 220px"
                  >آیا مشمول تبصره 1 ماده لایحه قانونی میشود ؟</safa-label
                >
                <div class="q-gutter-x-lg">
                  <safa-radio
                    label="بلی"
                    :val="true"
                    :m="mode"
                    size="xs"
                    v-model="model.IsConfirmContractBuy"
                  />
                  <safa-radio
                    label="خیر"
                    :val="false"
                    :m="mode"
                    size="xs"
                    class="q-mx-sm"
                    label-width="100px"
                    v-model="model.IsConfirmContractBuy"
                  />
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="flex column q-gutter-sm">
                <safa-radio
                  style="min-width: 300px"
                  label="مصالح بعد از تخریب متعلق به مالک است."
                  v-model="afterDestructionMaterialsBelonging"
                  cdcName="AfterDestructionMaterialsBelongingOwner"
                  :label-shrink="false"
                  :m="mode"
                  size="xs"
                  val="Owner"
                />
                <safa-radio
                  style="min-width: 300px"
                  label="مصالح بعد از تخریب متعلق به شهرداری است."
                  v-model="afterDestructionMaterialsBelonging"
                  cdcName="AfterDestructionMaterialsBelongingShahrdari"
                  :label-shrink="false"
                  :m="mode"
                  size="xs"
                  val="Shahrdari"
                />
              </div>
            </div>
          </FormRow>
        </internal-section>
      </fit>
      <template v-slot:footer>
        <div class="flex no-wrap">
        <!--
            v-show="!currentObj" -->
          <FormActions
            :m="mode"
            @edit="isEditable = true"
            @cancel="isEditable = false"
            @save="saveObj"
          />
          <btn-default label="حذف" @click="deleteObj" />
          <!-- spId="e5a76ea7-95c8-44a2-8a26-015d02c8f733"
          spCaption="دکمه حذف" -->
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    },
    baseNosaziCode: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      formKey: "F4F6B1AF-72FA-4C88-B1AC-3914666039A1",
      name: "UHousePlan",
      title: "اضافه کردن ملک به طرح",
      main: true,

      // #region services
      loadObjRes: null,
      deleteObjRes: null,
      getHousePlanInfoRes: null,
      saveHousePlanInfoRes: null,
      // #endregion

      // #region variables
      afterDestructionMaterialsBelonging: null,
      list: [],
      housePlanColumns: [
        {
          field: "PlansprojectsCode",
          title: "کد طرح",
          width: "130px"
        },
        {
          field: "Plansprojects_Year",
          title: "سال طرح",
          width: "130px"
        },
        {
          field: "PlansprojectsName",
          title: "عنوان طرح",
          width: "auto"
        }
      ],
      model: {
        HousePlan_Info: {
          AfterDestructionMaterialsBelongingOwner: false,
          AfterDestructionMaterialsBelongingShahrdari: false,
          AyanArea: null,
          BuildingIn24: null,
          BuildingInPaln: null,
          BuildingRemain: null,
          CI_Commission12: null,
          CI_OwnedType: null,
          Commission12Date: null,
          Commission12No: null,
          CurrentAreaIn24: null,
          CurrentAreaInPlan: null,
          CurrentAreaRemain: null,
          Description: null,
          DocArea: null,
          EstimatedAreaInPlan: null,
          EstimatedPercentInPlan: null,
          EstimatedPriceUnitInPlan: null,
          GreenArea: null,
          HaveLegalBill: true,
          NIdHousePlan: "00000000-0000-0000-0000-000000000000",
          NIdHousePlan_tmp: "0",
          NIdPlansprojects: "00000000-0000-0000-0000-000000000000",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          PercentInPlan: null,
          RemainingAreaBelongingMunicipality: null,
          RowOnMap: null
        },
        IsConfirmContractBuy: null,
        IsNew: true,
        IsSendSMS: true,
        Nid: null,
        NidCopy: null,
        _CurrentArea: null,
        _InfrastructureArea: null,
        _NIdHousePlan: "00000000-0000-0000-0000-000000000000",
        _NIdRequest: "00000000-0000-0000-0000-000000000000"
      },

      selectedRow: null,
      nidProc: null,
      pCIRegion: null
    }
  },

  watch: {
    "model.HousePlan_Info.CI_OwnedType": {
      handler (newVal, oldVal) {
        if (newVal !== null) {
          if (newVal === 1 || newVal === 2) {
            this.model.HousePlan_Info.RemainingAreaBelongingMunicipality = true
          } else if (newVal === 3) {
            this.model.HousePlan_Info.RemainingAreaBelongingMunicipality = false
          }
        }
      },
      immediate: true
    },
    afterDestructionMaterialsBelonging: {
      handler (newVal, oldVal) {
        if (newVal === "Owner") {
          this.model.HousePlan_Info.AfterDestructionMaterialsBelongingOwner = true
          this.model.HousePlan_Info.AfterDestructionMaterialsBelongingShahrdari = false
        } else if (newVal === "Shahrdari") {
          this.model.HousePlan_Info.AfterDestructionMaterialsBelongingOwner = false
          this.model.HousePlan_Info.AfterDestructionMaterialsBelongingShahrdari = true
        }
      },
      immediate: true
    }
  },

  methods: {
    async loadObj () {
      try {
        // todo : در این قسمت باید تعیین شود که پارامتر های ورودی برا اساس چه حالتی از باز شدن فرم دریافت میشوند
        this.nidProc =
          this.currentObj?.NIdProcess ??
          this.selectedRequest?.NidProc ??
          "00000000-0000-0000-0000-000000000000"
        // pNIdProc:
        // this.currentObj?.NIdProcess || "00000000-0000-0000-0000-000000000000",
        this.pCIRegion =
          this.baseNosaziCode?.District ?? this.selectedDistrict ?? 1
        this.showLoading()
        const { data } = await this.$services.ES.getPlansprojectsInfoMessage({
          pNIdProc: this.nidProc,
          pCI_Region: this.pCIRegion
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.list =
            this.loadObjRes.data?.GetPlansprojects_Info_MessageResult ?? []
          this.getHousePlanInfo(this.nidProc, 0, 0)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      if (this.model.IsConfirmContractBuy) {
        this.showError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
        return false
      }
      if (!this.model || !this.selectedRow) {
        return this.showError("لطفا کد طرح انتخاب شود", "توجه")
      }
      if (
        this.model.HousePlan_Info.RemainingAreaBelongingMunicipality === null
      ) {
        return this.showError(
          "لطفا فیلد (باقی مانده عرصه متعلق به شهرداری است) را پر کنید)"
        )
      }

      this.model.HousePlan_Info.NIdPlansprojects =
        this.selectedRow.NIdPlansprojects

      if (this.model.HousePlan_Info.CurrentAreaRemain == null) {
        this.model.HousePlan_Info.CurrentAreaRemain = "0"
      }

      if (this.model.HousePlan_Info.CurrentAreaInPlan == null) {
        this.model.HousePlan_Info.CurrentAreaInPlan = "0"
      }

      this.model.HousePlan_Info.RemainingAreaBelongingMunicipality =
        this.model.HousePlan_Info.RemainingAreaBelongingMunicipality

      if (
        this.model.HousePlan_Info.CurrentAreaRemain !== null &&
        parseInt(this.model.HousePlan_Info.CurrentAreaRemain) === 0
      ) {
        this.model.HousePlan_Info.RemainingAreaBelongingMunicipality = false
      }

      try {
        this.showLoading()
        const { data } = await this.$services.ES.saveHousePlanInfo({
          PObj: this.model
        })
        this.saveHousePlanInfoRes = this.getResponse(data)
        if (this.saveHousePlanInfoRes.success) {
          // eslint-disable-next-line no-unused-expressions
          this.model = this.saveHousePlanInfoRes.data.SaveHousePlan_InfoResult
          this.showSuccess("ذخیره اطلاعات باموفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selelectedItemTree?.NIdHousePlan,
            bizCodeTitle: "NIdHousePlan",
            saveDesc: `ذخیره اطلاعات فرم اضافه کردن ملک به طرح با موفقیت NIdHousePlan ${
              this.selelectedItemTree?.NIdHousePlan ?? ""
            } انجام شد`
          })
          await this.loadObj()
          this.isEditable = false
          this.$emit('afterSave')
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    deleteObj () {
      this.showConfirm("آیا از حذف اطلاعات اطمینان دارید؟").onOk(() => {
        const delHousePlanInfo = async () => {
          try {
            const payload = {
              pNIdProc:
                this.currentObj?.NIdProcess ??
                this.selectedRequest?.NidProc ??
                "00000000-0000-0000-0000-000000000000"
            }
            this.showLoading()
            const { data } = await this.$services.ES.delHousePlanInfo(payload)
            this.deleteObjRes = this.getResponse(data)
            if (this.deleteObjRes.success) {
              this.showSuccess("حذف اطلاعات با موفقیت انجام شد")
              await this.log({
                action: this.logActions.delete,
                bizCode: payload.PNIdMortgageDoc ?? "",
                bizCodeTitle: "PNIdMortgageDoc",
                saveDesc: `حذف اطلاعات در فرم ${this.title} با موفقیت انجام شد`
              })
              this.loadObj()
            }
          } catch (e) {
            console.error(e)
          } finally {
            this.hideLoading()
          }
        }
        delHousePlanInfo()
      })
    },

    getHousePlanInfo (pNIdProc = this.nidProc, pNid = 0, pNidCopy = 0) {
      this.$services.ES.getHousePlanInfo({ pNIdProc, pNid, pNidCopy })
        .then(({ data }) => {
          this.getHousePlanInfoRes = this.getResponse(data)
          if (this.getHousePlanInfoRes.success) {
            this.model = this.getHousePlanInfoRes.data.GetHousePlan_InfoResult

            if (
              this.model.HousePlan_Info
                .AfterDestructionMaterialsBelongingOwner === true &&
              this.model.HousePlan_Info
                .AfterDestructionMaterialsBelongingShahrdari === false
            ) {
              this.afterDestructionMaterialsBelonging = "Owner"
            } else if (
              this.model.HousePlan_Info
                .AfterDestructionMaterialsBelongingOwner === false &&
              this.model.HousePlan_Info
                .AfterDestructionMaterialsBelongingShahrdari === true
            ) {
              this.afterDestructionMaterialsBelonging = "Shahrdari"
            } else this.afterDestructionMaterialsBelonging = null
          }
        })

        .catch((e) => {
          console.error(e)
        })
    },

    selectedRowHandler ({ data }) {
      this.selectedRow = {
        ...data,
        NIdPlansprojects:
          data?.NIdPlansprojects ?? "00000000-0000-0000-0000-000000000000",
        PlansprojectsName:
          data?.PlansprojectsName !== null
            ? data?.PlansprojectsName.toString()
            : null
      }
    }
  },

  mounted () {
    this.loadObj()
  }
}
</script>
