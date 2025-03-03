<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getAllCommissionDetailsRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
          :actions="false"
        />
      </template>
      <fit>
        <internal-section title="مشخصات ملک">
          <form-row>
            <FormControl>
              <safa-text
                label="نام مالک"
                label-width="100px"
                v-model="model.CommissionInfo.OwnerName"
                cdcName="OwnerName"
                :m="mode"
              />
            </FormControl>
          </form-row>
        </internal-section>
        <internal-section title="تاریخ و شماره رای کمیسیون">
          <form-row>
            <FormControl>
              <safa-datepicker
                label="تاریخ رای"
                label-width="100px"
                v-model="
                  model.ClsCommission_LegalProxy.Commission_LegalProxy
                    .NoticeDate
                "
                cdcName="NoticeDate"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره رای"
                label-width="100px"
                v-model="
                  model.ClsCommission_LegalProxy.Commission_LegalProxy
                    .NoticeNumber
                "
                cdcName="NoticeNumber"
                :m="mode"
              />
            </FormControl>
          </form-row>
        </internal-section>
        <internal-section title="تمدیدهای نیابت قضایی ">
          <safa-datatable
            title="تمدیدهای نیابت قضایی"
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="extensionsJudicial"
            cdcName="extensionsJudicial"
            :columns="extensionsJudicialColumns"
            :m="mode"
            fit
          />
        </internal-section>
        <internal-section title="صدورهای دستور اجرا">
          <safa-datatable
            title="صدورهای دستور اجرا"
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="executionOrder"
            cdcName="executionOrder"
            :m="mode"
            :columns="executionOrderColumns"
            fit
          />
        </internal-section>
        <internal-section title="ll">
          <form-row class="q-mt-sm">
            <FormControl>
              <safa-text
                label="دستور قاضی"
                label-width="100px"
                v-model="
                  model.Commission_LegalProxyExecutionOrder.JudgeOrderNumber
                "
                cdcName="JudgeOrderNumber"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ دستور قاضی"
                label-width="100px"
                v-model="
                  model.Commission_LegalProxyExecutionOrder.JudgeOrderDate
                "
                cdcName="JudgeOrderDate"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="فرماندهی عملیات"
                label-width="100px"
                v-model="
                  model.Commission_LegalProxyExecutionOrder.OperationCommand
                "
                cdcName="OperationCommand"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="مسئولین اجراییات شرکت کننده در اجرای رای"
                label-width="100px"
                v-model="model.ExecutiveDistricts_SelectionChanged"
                cdcName="ExecutiveDistricts_SelectionChanged"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ عملیات"
                label-width="100px"
                v-model="
                  model.Commission_LegalProxyExecutionOrder.OperationDate
                "
                cdcName="OperationDate"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="زمان عملیات"
                label-width="100px"
                v-model="
                  model.Commission_LegalProxyExecutionOrder.OperationTime
                "
                cdcName="OperationTime"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تعداد نیروهای کمکی انتظامی اعزامی از هر منطقه"
                label-width="100px"
                v-model="
                  model.Commission_LegalProxyExecutionOrder
                    .SendedAuxiliaryForcesQuantity
                "
                cdcName="SendedAuxiliaryForcesQuantity"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="مناطق"
                label-width="100px"
                v-model="model.Commission_LegalProxyExecutionOrder.Districts"
                cdcName="Districts"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="درخواست نیروی کمکی از فرماندهی انتظامی به تعداد"
                label-width="100px"
                v-model="
                  model.Commission_LegalProxyExecutionOrder
                    .AskedAuxiliaryForcesQuantity
                "
                cdcName="AskedAuxiliaryForcesQuantity"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="حضور پلیس نسوان"
                label-width="100px"
                v-model="
                  model.Commission_LegalProxyExecutionOrder
                    .PresentWomanForcesQuantity
                "
                cdcName="PresentWomanForcesQuantity"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="توضیحات"
                label-width="100px"
                v-model="model.Commission_LegalProxyExecutionOrder.Description"
                cdcName="Description"
                :m="mode"
              />
            </FormControl>
          </form-row>
        </internal-section>
      </fit>
      <template #footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="BtnSave_Click"
        >
          <template v-slot:after>
            <btn-save
              label="ایجاد"
              @click="BtnCreate_Click"
              v-if="!isEditable"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import PersianDate from "persian-date"
import { currentDate } from "src/utils/index"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "دستور زمان اجرا",
      formKey: "1563FA6A-9A5A-4805-B13D-BB4B3D7D83DD",
      name: "ULegalProxyExecutionOrder",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      ExecutiveDistricts_SelectionChanged: "",
      Districts: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        CommissionInfo: { OwnerName: "" },
        Commission_LegalProxyExtension: null,
        ClsCommission_LegalProxy: {
          Commission_LegalProxy: {
            NoticeNumber: "",
            NoticeDate: ""
          }
        },
        Commission_LegalProxyExecutionOrder: {
          JudgeOrderDate: "",
          JudgeOrderNumber: "",
          OperationDate: "",
          OperationTime: "",
          SendedAuxiliaryForcesQuantity: "",
          AskedAuxiliaryForcesQuantity: "",
          PresentWomanForcesQuantity: "",
          Description: "",
          OperationCommand: ""
        }
      },

      // services
      getAllCommissionDetailsRes: null,

      //  grid
      extensionsJudicial: [],
      extensionsJudicialColumns: [
        { title: "نوع عملیات", field: "OprerationType" },
        { title: "شماره صدور دستور", field: "OrderNumber" },
        { title: "تاریخ ایجاد", field: "OrderDate" },
        { title: "تاریخ صدور", field: "ConfirmDate" },
        { title: "کاربر ایجاد کننده", field: "CreateUsername" },
        { title: "مدت اعتبار از تاریخ", field: "ValidFromDate" },
        { title: "مدت اعتبار تا تاریخ", field: "ValidTillDate" },
        { title: "توضیحات", field: "Description" }
      ],
      executionOrder: [],
      executionOrderColumns: [
        {
          title: "مربوط به دستور",
          field: "Commission_LegalProxyExtensionTitle"
        },
        { title: " دستور قاضی", field: "JudgeOrderNumber" },
        { title: "تاریخ دستور قاضی", field: "JudgeOrderDate" },
        { title: "فرماندهی عملیات", field: "OperationCommand" },
        {
          title: "مسئولین اجرائیات شرکت کننده در اجرای رای",
          field: "ExecutiveDistricts"
        },
        { title: "تاریخ عملیات", field: "OperationDate" },
        { title: "زمان عملیات", field: "OperationTime" },
        {
          title: "تعداد نیروهای انتظامی اعزامی از هر منطقه",
          field: "SendedAuxiliaryForcesQuantity"
        },
        { title: "مناطق اعزام کننده", field: "AuxiliaryForcesDistricts" },
        {
          title: "تعداد نیروی کمکی درخواستی از فرماندهی انتظامی",
          field: "AskedAuxiliaryForcesQuantity"
        },
        { title: "تعداد پلیس نسوان حاضر", field: "PresentWomanForcesQuantity" },
        { title: "توضیحات", field: "Description" }
      ]
    }
  },
  async created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.commissions.getAllCommissionDetails({
            PRequest: { NIDCommission: this.selectedNidCommission } // "cbb9aa98-e12a-4622-8e97-6eeaf686cc54"
          })

        this.getAllCommissionDetailsRes = this.getResponse(data)
        if (this.getAllCommissionDetailsRes.success) {
          this.model =
            this.getAllCommissionDetailsRes.data.GetAllCommissionDetailsResult

          const obj = this.model?.Commission_VoteTrepasses[0] ?? {}

          this.model.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeDate =
            obj?.VoteDate ?? ""
          this.model.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeNumber =
            obj?.VoteNo ?? ""

          this.baseNosaziCode = convertStringToNosaziCodeObject(
            this.model?.CommissionInfo?.CodeString ?? "0-0-0-0-0-0-0"
          )

          if (
            this.model?.ClsCommission_ExecutTrackingVote
              ?.Commission_ExecuteTracking &&
            this.model.ClsCommission_ExecutTrackingVote
              .Commission_ExecuteTracking.length > 0
          ) {
            this.model.ClsCommission_ExecutTrackingVote.Commission_ExecuteTracking.forEach(
              (items) => {
                this.model.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses.forEach(
                  (tmp) => {
                    if (items.NidVT === tmp.NidVT) {
                      tmp.CI_ExecuteMainVote = items.CI_ExecuteMainVote
                      tmp.CI_ExecuteSubsidiaryVote =
                        items.CI_ExecuteSubsidiaryVote

                      tmp.ExecuteVoteComments = items.ExecuteVoteComments
                      tmp.ExecuteVoteDate = items.ExecuteVoteDate
                      tmp.ExecuteVoteDesc = items.ExecuteVoteDesc
                      tmp.ExecuteVoteValue = parseFloat(items.ExecuteVoteValue)
                      tmp.NidCommission = items.NidCommission
                      tmp.NidVT = items.NidVT
                    }
                  }
                )
              }
            )
          }

          this.model.ClsCommission_LegalProxy.Commission_LegalProxy.OrderDate =
            currentDate()

          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `بارگذاری اطلاعات  ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    BtnCreate_Click () {
      this.fromDate = currentDate()
      this.toDate = this.addDayToCurrentDate()
      this.isEditable = true
    },

    addDayToCurrentDate () {
      const tmp = currentDate().split("/")
      let y = parseInt(tmp[0])
      let m = parseInt(tmp[1])
      let d = parseInt(tmp[2])
      let today = new PersianDate([y, m, d])
      return today.add("months", 1)
    },
    lastObjOfArray (t) {
      if (t.length === 0) return {}
      //   return t[t.length - 1]
      return t[0]
    },
    saveObj () {}
  }
}
</script>
