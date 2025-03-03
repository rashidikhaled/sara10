<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="loadDataRes" />
      <safa-status :result="saveDataRes" />
      <safa-status :result="deleteDataRes" />
    </template>
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="newProclamation" label="ثبت ابلاغیه" />
          <tab-menu name="allProclamation" label="سوابق ابلاغیه" />
        </template>

        <tab-content name="newProclamation">
          <FormRow :lg="3" :md="3" :sm="3" :xl="4">
            <FormControl>
              <safa-text
                label="شماره نامه"
                label-width="100px"
                :m="mode"
                cdcName="No"
                v-model="
                  model.ClsCommission_Proclamation.Commission_Proclamation.No
                "
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ نامه"
                label-width="100px"
                :m="mode"
                cdcName="Date"
                v-model="
                  model.ClsCommission_Proclamation.Commission_Proclamation.Date
                "
              />
            </FormControl>
            <FormControl>
              <safa-combo
                label="نوع قرار"
                label-width="100px"
                :m="mode"
                domainName="Commission100"
                ciName="CI_ExpertTheory"
                cdcName="CI_ExpertTheory"
                v-model="
                  model.ClsCommission_Proclamation.Commission_Proclamation
                    .CI_ExpertTheory
                "
                :validations="['required', 'number']"
                required
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ دریافت"
                label-width="100px"
                m="r"
                cdcName="ReceiveDate"
                v-model="
                  model.ClsCommission_Proclamation.Commission_Proclamation
                    .ReceiveDate
                "
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="زمان دریافت"
                label-width="100px"
                m="r"
                cdcName="ReceiveTime"
                v-model="
                  model.ClsCommission_Proclamation.Commission_Proclamation
                    .ReceiveTime
                "
              />
            </FormControl>
            <FormControl>
              <safa-combo
                label="مقصد"
                label-width="100px"
                :m="mode"
                domainName="Commission100"
                ciName="CI_Destination"
                cdcName="CI_Destination"
                v-model="
                  model.ClsCommission_Proclamation.Commission_Proclamation
                    .CI_Destination
                "
                :validations="['required', 'number']"
                required
              />
            </FormControl>
            <FormControl>
              <safa-checkbox
                label="تحویل گرفته است"
                label-width="100px"
                :m="mode"
                cdcName="IsReceive"
                v-model="
                  model.ClsCommission_Proclamation.Commission_Proclamation
                    .IsReceive
                "
              />
            </FormControl>
            <text-template
              class="col-12"
              label="توضیحات"
              label-width="100px"
              :m="mode"
              fit
              :rows="3"
              cdcName="Comments"
              v-model="
                model.ClsCommission_Proclamation.Commission_Proclamation
                  .Comments
              "
            />
          </FormRow>
        </tab-content>

        <tab-content name="allProclamation" :padding="false">
          <safa-datatable
            :columns="proclamationColumns"
            fit
            height="100%"
            min-height="200px"
            max-height="100%"
            m="r"
            cdcName="ListCommission_Proclamation"
            v-model="
              model.ClsCommission_Proclamation.ListCommission_Proclamation
            "
            :bordered="false"
            @row-click="onCurrentEblaghie"
            :selectable="false"
            :allowMultipleSelection="false"
            :addRow="false"
            :deleteRow="false"
          />
        </tab-content>
      </safa-tabs>
    </fit>

    <template #footer v-if="activeTab === 'newProclamation'">
      <form-actions
        showNewButton
        :m="mode"
        @edit="isEditable = true"
        @newInfo="newData"
        @save="saveData"
        @cancel="isEditable = false"
      >
        <template v-slot:after>
          <btn-delete label="چاپ گزارش" @click="report" />
          <btn-delete label="حذف" @click="deleteData" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "ابلاغیه کمیسیون",
      name: "UCommissionProclamation",
      formKey: "e1e76572-6a93-47a8-968a-82adc44f521c",
      main: true,
      activeTab: "newProclamation",
      proclamationColumns: [
        {
          field: "No",
          title: "شماره نامه",
          width: "150px"
        },
        {
          field: "Date",
          title: "تاریخ نامه",
          width: "150px",
          editor: "date"
        },
        {
          field: "CI_ExpertTheory",
          title: "نوع قرار",
          width: "150px",
          domain: "Commission100",
          editor: "combo"
        },
        {
          field: "IsReceive",
          title: "تحویل گرفته است",
          width: "60px",
          editor: "checkbox"
        },
        {
          field: "ReceiveDate",
          title: "تاریخ دریافت",
          width: "150px",
          editor: "date"
        },
        {
          field: "ReceiveTime",
          title: "زمان دریافت",
          width: "150px"
        },

        {
          field: "Comments",
          title: "توضیحات",
          width: "250px"
        },
        {
          field: "CI_Destination",
          title: "مقصد",
          width: "150px",
          domain: "Commission100",
          editor: "combo"
        }
      ],
      model: {
        ClsCommission_Proclamation: {
          Commission_Proclamation: {
            CI_ExpertTheory: null,
            CI_Destination: null,
            Date: "",
            IsReceive: false,
            No: 0,
            ReceiveTime: "",
            ReceiveDate: "",
            Comments: "",
            NIdCommission: "00000000-0000-0000-0000-000000000000",
            NidCommissionProclamation: "00000000-0000-0000-0000-000000000000"
          },
          ListCommission_Proclamation: []
        }
      },
      loadDataRes: null,
      saveDataRes: null,
      deleteDataRes: null,
      isView: false
    }
  },

  mounted () {
    if (this.selectedNidCommission !== null) {
      this.loadData(this.selectedNidCommission)
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar(this.name)
    }
  },

  methods: {
    loadData (NidCommission) {
      this.showLoading()
      this.$services.commissions
        .getCommissionProclamation({
          pRequest: { NIDCommission: NidCommission }
        })
        .then(async ({ data }) => {
          this.loadDataRes = this.getResponse(data)
          if (this.loadDataRes.success) {
            this.model = this.loadDataRes.data.GetCommission_ProclamationResult
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedNidCommission,
                bizCodeTitle: "NidCommission",
                nosaziCode: this.selectedCommission.BizCode,
                saveDesc: `بارگذاری اطلاعات فرم ${this.title} با شماره ارجاع ${
                  this.selectedCommission?.UrbanNidRequest ?? ""
                } انجام گردید.`
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
    saveData () {
      if (!this.isValidForm()) return
      this.showLoading()
      this.model.ClsCommission_Proclamation.Commission_Proclamation.NIdCommission =
        this.selectedNidCommission
      this.$services.commissions
        .saveCommissionProclamation({ pRequest: { ...this.model } })
        .then(async ({ data }) => {
          this.saveDataRes = this.getResponse(data)
          if (this.saveDataRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedCommission.BizCode,
              saveDesc: `ذخیره اطلاعات فرم ${this.title} با شماره ارجاع ${
                this.selectedCommission?.UrbanNidRequest ?? ""
              } انجام گردید.`
            })
            this.loadData(
              this.saveDataRes.data.SaveCommission_ProclamationResult
                .ClsCommission_Proclamation.Commission_Proclamation
                .NIdCommission
            )
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    deleteData () {
      this.showConfirm("آیا برای حذف اطمینان دارید؟").onOk(() => {
        this.showLoading()
        this.$services.commissions
          .deleteCommissionProclamation({ pRequest: { ...this.model } })
          .then(async ({ data }) => {
            this.deleteDataRes = this.getResponse(data)
            if (this.deleteDataRes.success) {
              this.showSuccess("عملیات با موفقیت انجام شد")
              await this.log({
                action: this.logActions.delete,
                bizCode: this.selectedNidCommission,
                bizCodeTitle: "NidCommission",
                nosaziCode: this.selectedCommission.BizCode,
                saveDesc: `حذف در فرم ${this.title} با شماره ارجاع ${
                  this.selectedCommission?.UrbanNidRequest ?? ""
                } انجام گردید.`
              })
              this.loadData(
                this.deleteDataRes.data.DeleteCommission_ProclamationResult
                  .ClsCommission_Proclamation.Commission_Proclamation
                  .NIdCommission
              )
            }
          })
          .catch((e) => {
            console.error(e)
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    newData () {
      this.isEditable = true
      this.inEdit = false
      this.model.ClsCommission_Proclamation.Commission_Proclamation.CI_ExpertTheory =
        null
      this.model.ClsCommission_Proclamation.Commission_Proclamation.CI_Destination =
        null
      this.model.ClsCommission_Proclamation.Commission_Proclamation.NidCommissionProclamation =
        "00000000-0000-0000-0000-000000000000"
      this.model.ClsCommission_Proclamation.Commission_Proclamation.Comments =
        ""
      this.model.ClsCommission_Proclamation.Commission_Proclamation.ReceiveDate =
        ""
      this.model.ClsCommission_Proclamation.Commission_Proclamation.ReceiveTime =
        ""
      this.model.ClsCommission_Proclamation.Commission_Proclamation.IsReceive = false
      this.updateToday()
    },
    updateToday () {
      PersianDate.toCalendar("persian")
      this.model.ClsCommission_Proclamation.Commission_Proclamation.Date =
        new PersianDate().toLocale("en").format("L")
    },
    onCurrentEblaghie (row) {
      this.model.ClsCommission_Proclamation.Commission_Proclamation = row
    },
    async report () {
      const reportPath =
        "/ComReport/RptProclamation"
      const queryParams = {
        NIdCommission: this.selectedNidCommission,
        NidUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidCommission,
        bizCodeTitle: "NidCommission",
        nosaziCode: this.selectedCommission.BizCode,
        saveDesc: `چاپ گزارش در فرم ${this.title} با شماره ارجاع ${
          this.selectedCommission?.UrbanNidRequest ?? ""
        } انجام گردید.`
      })
    }
  }
}
</script>
