<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="false" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="deleteObjRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="MortgageDocument" label="مشخصات اسناد رهنی" />
            <tab-menu name="PartialDetail" label="مشخصات طرفین" />
          </template>
          <tab-content name="MortgageDocument">
            <form-row class="q-mt-sm">
              <form-control>
                <safa-text
                  label=" شماره سند رهنی"
                  label-width="100px"
                  cdcName="MortgageDocNo"
                  v-model="model.MortgageDoc_Info.MortgageDocNo"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-datepicker
                  label="تاریخ سند رهنی"
                  cdcName="MortgageDocDate"
                  label-width="100px"
                  v-model="model.MortgageDoc_Info.MortgageDocDate"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-text
                  label=" شماره دفتر خانه"
                  v-model="model.MortgageDoc_Info.BureauNo"
                  label-width="100px"
                  cdcName="BureauNo"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-text
                  label="مبلغ سند"
                  v-model="model.MortgageDoc_Info.MortgageDocPrice"
                  label-width="100px"
                  cdcName="MortgageDocPrice"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-datepicker
                  label="تاریخ شروع قرارداد"
                  v-model="model.MortgageDoc_Info.ContractStartDate"
                  cdcName="ContractStartDate"
                  label-width="100px"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-datepicker
                  label=" تاریخ پایان قرارداد"
                  v-model="model.MortgageDoc_Info.ContractEndDate"
                  cdcName="ContractEndDate"
                  label-width="100px"
                  :m="mode"
                />
              </form-control>
              <form-control class="flex items-center">
                <safa-checkbox
                  label="شهرداری راهن می باشد"
                  v-model="model.MortgageDoc_Info.MunicipalMortgagor"
                  label-width="100px"
                  :m="mode"
                  cdcName="MunicipalMortgagor"
                />
              </form-control>
              <text-template
                label="توضیحات"
                v-model="model.MortgageDoc_Info.Description"
                label-width="100px"
                cdcName="Description"
                :rows="6"
                formKey="D9068C25-2DA0-41EC-BF38-BD8BECE86405"
                class="col-12"
                :m="mode"
              />
            </form-row>
          </tab-content>
          <tab-content name="PartialDetail">
            <fit>
              <safa-grid
                title="مشخصات رهن دهنده"
                v-model="model.MortgageDoc_MortgageProvider"
                cdcName="MortgageDoc_MortgageProvider"
                helper="agMortgageProviderColumns"
                fit
                class="q-mb-sm"
                :m="mode"
              />
              <safa-grid
                title="مشخصات درخواست کننده فک رهن"
                v-model="model.MortgageDoc_CancelMortgage"
                cdcName="MortgageDoc_CancelMortgage"
                helper="agCancelMortgageColumns"
                fit
                :m="mode"
              />
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template>
            <btn-default
              label="حذف"
              @click="deleteObj"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"
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
    }
  },

  data () {
    return {
      name: "UMortgageDoc",
      title: "اسناد رهنی - سوابق",
      formKey: "340A7568-D6CC-478C-BAA6-045050811563",
      main: true,

      activeTab: "MortgageDocument",

      loadObjRes: null,
      saveObjRes: null,
      deleteObjRes: null,

      model: {
        IsConfirmContractBuy: false,
        MortgageDoc_CancelMortgage: [],
        MortgageDoc_Info: {
          BureauNo: null,
          ContractEndDate: null,
          ContractStartDate: null,
          Description: null,
          MortgageDocDate: null,
          MortgageDocNo: null,
          MortgageDocPrice: null,
          MunicipalMortgagor: false,
          NIdContract_tmp: 0
        },
        MortgageDoc_MortgageProvider: []
      }
    }
  },

  methods: {
    loadObj () {
      this.isEditable = false
      this.showLoading()
      const nidProc = this.currentObj?.NIdProcess || this.selectedRequest.NidProc
      const payload = {
        pNIdProc: nidProc || EMPTY_GUID
      }
      this.$services.ES.getMortgageDocInfo(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            let res = this.loadObjRes.data.GetMortgageDoc_InfoResult
            this.model = {
              ...res,
              MortgageDoc_CancelMortgage: res?.MortgageDoc_CancelMortgage ?? [],
              MortgageDoc_Info: {
                ...res?.MortgageDoc_Info,
                BureauNo: res?.MortgageDoc_Info.BureauNo ?? null,
                ContractEndDate: res?.MortgageDoc_Info.ContractEndDate ?? null,
                ContractStartDate:
                  res?.MortgageDoc_Info.ContractStartDate ?? null,
                Description: res?.MortgageDoc_Info.Description ?? null,
                MortgageDocDate: res?.MortgageDoc_Info.MortgageDocDate ?? null,
                MortgageDocNo: res?.MortgageDoc_Info.MortgageDocNo ?? null,
                MortgageDocPrice:
                  res?.MortgageDoc_Info.MortgageDocPrice ?? null,
                MunicipalMortgagor:
                  res?.MortgageDoc_Info.MunicipalMortgagor ?? false
              },
              MortgageDoc_MortgageProvider:
                res?.MortgageDoc_MortgageProvider ?? []
            }
            await this.log({
              action: this.logActions.view,
              bizCode: payload.pNIdProc,
              bizCodeTitle: "pNIdProc",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید `
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

    saveObj () {
      const save = () => {
        if (this.model.IsConfirmContractBuy) {
          return this.showError(
            "پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد"
          )
        }
        this.showLoading()
        this.$services.ES.saveMortgageDocInfo({ PObj: this.model })
          .then(async ({ data }) => {
            this.saveObjRes = this.getResponse(data)
            if (this.saveObjRes.success) {
              this.model = this.saveObjRes.data.GetSeizin_InfoResult
              this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد")
              this.loadObj()
              this.isEditable = false
              await this.log({
                action: this.logActions.save,
                bizCode: this.model?.Seizin_Info?.NIdSeizin ?? "",
                bizCodeTitle: "NIdSeizin",
                saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید `
              })
            }
          })
          .catch((e) => {
            console.error(e)
          })
          .finally(() => {
            this.hideLoading()
          })
      }
      if (
        this.isNullOrEmpty(this.model.MortgageDoc_Info.MortgageDocNo) &&
        this.isNullOrEmpty(this.model.MortgageDoc_Info.MortgageDocDate)
      ) {
        this.showError("لطفا شماره و تاریخ سند رهنی وارد شود")
      } else save()
    },

    isNullOrEmpty: (val) => !val || val === "",

    deleteObj () {
      this.showConfirm("آیا از حذف اطلاعات اطمینان دارید؟").onOk(() => {
        const delMortgageDocInfo = async () => {
          try {
            const payload = {
              PNIdMortgageDoc: this.model.MortgageDoc_Info.NidMortgageDoc
            }
            this.showLoading()
            const { data } = await this.$services.ES.delMortgageDocInfo()
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
        delMortgageDocInfo()
      })
    }
  },

  mounted () {
    this.loadObj()
  }
}
</script>
