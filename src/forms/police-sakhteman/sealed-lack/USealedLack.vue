<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getSealedOperationListRes" />
      </template>
      <fit>
        <safa-splitter v-model="splitterValue" vertical>
          <template v-slot:before>
            <fit>
              <safa-grid
                title="عدم پلمپ"
                v-model="sealedOperationList"
                cdcName="sealedOperationList"
                :columns="SealedControlColumns"
                fit
                paginate
                :m="mode"
                class="q-ma-sm"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <FormRow class="q-pa-sm">
                <FormControl>
                  <safa-text
                    label="شماره"
                    label-width="70px"
                    :m="mode"
                    v-model="SealedOperation.OperationNo"
                    cdcName="OperationNo"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ"
                    label-width="70px"
                    :m="mode"
                    v-model="SealedOperation.OperationDate"
                    cdcName="OperationDate"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="ساعت پلمپ"
                    label-width="70px"
                    :m="mode"
                    v-model="SealedOperation.OperationTime"
                    cdcName="OperationTime"
                  />
                </FormControl>
              </FormRow>
              <safa-grid
                title="مشخصات"
                v-model="SealedOperationCIList"
                cdcName="SealedOperationCIList"
                :columns="SealedOperationCIListColumns"
                fit
                paginate
                :m="mode"
                class="q-mx-sm q-mb-sm"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <form-actions
          showNewButton
          :m="mode"
          :showEditButton="false"
          @cancel="isEditable = false"
          @save="saveData"
          @newInfo="newData"
        >
          <!-- <btn-default label="گزارش" /> -->
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
      title: "عدم پلمپ",
      formKey: "734FE3FF-912E-4C71-B6E7-B06E77DF080F",
      name: "USealedLack",
      main: true,
      workflowCompatible: true,
      sidebarCompatible: true,

      getSealedOperationListRes: null,
      getSealedRes: null,
      saveSealedRes: null,

      splitterValue: 50,
      SealedOperation: {
        OperationTime: "",
        OperationDate: "",
        OperationNo: ""
      },
      sealedOperationList: [],
      SealedControlColumns: [
        { title: "نوع عملیات", field: "SealedOperationType", width: "200px" },
        { title: "شماره عملیات", field: "OperationNo", width: "150px" },
        { title: "تاریخ عملیات", field: "OperationDate", width: "150px" },
        { title: "ساعت عملیات", field: "OperationTime", width: "150px" },
        { title: "کاربر", field: "UserName", width: "200px" },
        { title: "تاریخ ثبت", field: "EnterDate", width: "150px" },
        { title: "ساعت ثبت", field: "EnterTime", width: "150px" },
        { title: "توضیحات", field: "Comments", width: "300px" }
      ],

      SealedOperationCIList: [],
      SealedOperationCIListColumns: [
        {
          title: "جزئیات",
          field: "CI_PolombLack",
          editor: "combo",
          domain: "BuildingPolice",
          cell: "grid-combo",
          width: "700px"
        },
        { title: "توضیحات", field: "Description", width: "700px" }
      ]
    }
  },
  mounted () {
    // با توجه به صحبت خانم غلامی و آقای دلدار این فرم در سرا استفاده نمیگردد. فرم تکمیل نیست و مقادیر هارد کد است. نمونه ی آن در سرا 8 وجود نداشت
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SH.getSealedOperationList({
        pNidProc: this.selectedRequest.NidProc // "036eb933-963b-45a1-865e-e4c1e452cbb4"
      })
        .then(async ({ data }) => {
          this.getSealedOperationListRes = this.getResponse(data)
          if (this.getSealedOperationListRes.success) {
            this.sealedOperationList =
              this.getSealedOperationListRes.data.SealedOperationList
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.NosaziCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش اطلاعات فرم عدم پلمپ با شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async newObj () {
      try {
        const { data } = await this.$services.SH.getSealed({
          pNidProc: this.selectedRequest.NidProc, // "036eb933-963b-45a1-865e-e4c1e452cbb4",
          pNidOper: "00000000-0000-0000-0000-000000000000"
        })
        this.getSealedRes = this.getResponse(data)
        if (this.getSealedRes.success) {
          this.SealedOperation = this.getSealedRes.data.SealedOperation
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.NosaziCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `نمایش اطلاعات جدید عدم پلمپ با شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    newData () {
      this.isEditable = true
      this.inEdit = false
      this.inAdd = "e"
      this.newObj()
    },

    async saveData () {
      try {
        this.showLoading()
        let payLoad = {
          pDistrict: 1,
          pObj: {
            AllSealedList: "",
            AllSealedNotComList: "",
            AllSealedOrderConfirmedList: "",
            IsConfirmLastSealedOrder: false,
            License: "",
            NidOper: "00000000-0000-0000-0000-000000000000",
            NidProc: this.selectedRequest.NidProc,
            NidWorkflowDeff: "00000000-0000-0000-0000-000000000000",
            NosaziCode: "",
            RequestInfo: ""
          }
        }
        const { data } = await this.$services.SH.saveSealed(payLoad)
        this.saveSealedRes = this.getResponse(data)
        if (this.saveSealedRes.success) {
          this.showSuccess("ذخیره ی اطلاعات با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.NosaziCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات جدید عدم پلمپ با شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
          this.loadObj()
          this.isEditable = false
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
