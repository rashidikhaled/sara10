<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="deleteObjRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              ciName="CI_Commission"
              domainName="Commission100"
              v-model="CI_Commission"
              cdcName="CI_Commission"
              label="کمیسیون"
              label-width="75px"
            />
          </FormControl>
        </FormRow>
        <safa-grid
          title="لیست تعطیلات"
          v-model="holidaysList"
          cdcName="Commission_DefHolidays_List"
          :columns="defHolidaysColumns"
          :m="mode"
          fit
          height="100%"
          max-height="100%"
          min-height="200px"
          paginate
          @row:click="selectedRowHandler"
        />
        <!-- v-if="showNewData && !isEditable" -->
        <FormRow class="q-mt-sm">
          <FormControl>
            <safa-datepicker
              label="تاریخ تعطیلی"
              label-width="75px"
              v-model="model.HolidayDate"
              cdcName="HolidayDate"
              :m="mode"
            />
          </FormControl>
          <text-template
            label="علت تعطیلی"
            label-width="75px"
            :rows="2"
            class="col-12 q-mb-sm"
            v-model="model.Comments"
            cdcName="Comments"
            :m="mode"
          />
        </FormRow>
      </fit>
      <template v-slot:footer>
        <form-actions
          showNewButton
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
          @newInfo="newInfo"
        >
          <template #before>
            <btn-save
              v-if="showNewData && !isEditable"
              label="ذخیره"
              @click="saveObj()"
            />
            <btn-cancel
              v-if="showNewData && !isEditable"
              label="انصراف"
              @click="showNewData = false"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تعطیلات کمسیونها",
      name: "UHolidayCommission",
      formKey: "cf8f5d3c-8edd-4b66-b002-e5eb29284d6d",
      main: true,
      isView: false,
      showNewData: false,
      loadObjRes: null,
      saveObjRes: null,
      deleteObjRes: null,
      CI_Commission: 0,
      defHolidaysColumns: [
        {
          field: "delete",
          title: "حذف",
          editor: "action",
          width: "80px",
          //   lockPosition: true,
          pinned: "right",
          cellStyle: {
            padding: 0,
            margin: 0,
            color: "red"
          },
          btnTitle: "حذف",
          btnIcon: "delete",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.handleRemove(params)
        },
        {
          field: "HolidayDate",
          title: "تاریخ تعطیلی",
          width: "100px",
          editor: "date"
        },
        {
          field: "Comments",
          title: "علت تعطیلی",
          width: "auto"
        }
      ],
      holidaysList: [],
      saveModel: {
        IsDelete: false,
        Commission_DefHolidays: {
          NidDefHolidays: "00000000-0000-0000-0000-000000000000"
        }
      },
      model: {
        HolidayDate: "",
        Comments: "",
        NidDefHolidays: "00000000-0000-0000-0000-000000000000",
        CI_Commission: 0
      }
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    newInfo () {
      this.resetObj()
      this.isEditable = true
    },
    resetObj () {
      this.isEditable = false
      this.model = {
        HolidayDate: "",
        Comments: "",
        NidDefHolidays: "00000000-0000-0000-0000-000000000000",
        CI_Commission: this.CI_Commission
      }
    },
    loadObj () {
      this.showLoading()
      this.$services.commissions
        .getCommissionDefHolidaysList({
          pCI_Commission: this.CI_Commission
        })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.holidaysList =
              this.loadObjRes.data?.GetCommission_DefHolidays_ListResult
                ?.Commission_DefHolidays_List ?? []
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: "",
                bizCodeTitle: "",
                saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
              })
            }
            this.isView = true
            this.resetObj()
            this.isEditable = false
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedRowHandler ({ data }) {
      this.model = data
    },
    saveObj () {
      this.showLoading()
      this.$services.commissions
        .saveCommissionDefHolidays({
          pObj: {
            Commission_DefHolidays: this.model,
            IsDelete: false
          }
        })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.model.NidDefHolidays,
              bizCodeTitle: "NidDefHolidays",
              saveDesc: `ذخیره اطلاعات تاریخ تعطیلی ${
                this.model?.HolidayDate ?? ""
              }$ در فرم ${this.title} انجام گردید.`
            })
            this.loadObj()
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleRemove (params) {
      this.showConfirm("آیا برای حذف اطمینان دارید؟").onOk(() => {
        this.showLoading()
        this.$services.commissions
          .saveCommissionDefHolidays({
            pObj: {
              Commission_DefHolidays: params,
              IsDelete: true
            }
          })
          .then(async ({ data }) => {
            this.deleteObjRes = this.getResponse(data)
            if (this.deleteObjRes.success) {
              this.showSuccess("حذف با موفقیت انجام شد.")
              await this.log({
                action: this.logActions.delete,
                bizCode: params?.NidDefHolidays ?? '',
                bizCodeTitle: "NidDefHolidays",
                saveDesc: `حذف اطلاعات تاریخ تعطیلی ${
                  params?.HolidayDate ?? ""
                }$ در فرم ${this.title} انجام گردید.`
              })
              this.loadObj()
            }
          })
          .catch((e) => {
            console.error(e)
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  },
  watch: {
    CI_Commission () {
      this.loadObj()
    }
  }
}
</script>
