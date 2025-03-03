<template>
  <safa-form
    appId="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    caption="پلیس ساختمان- ارجاع فک پلمب"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getSealedOperationListRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="کاربر ثبت کننده"
              label-width="80px"
              v-model="SealedOperation.UserName"
              cdcName="UserName"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره فک پلمپ"
              label-width="80px"
              v-model="SealedOperation.OperationNo"
              cdcName="OperationNo"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ"
              label-width="80px"
              v-model="SealedOperation.OperationDate"
              cdcName="OperationDate"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="ساعت"
              label-width="80px"
              v-model="SealedOperation.OperationTime"
              cdcName="OperationTime"
            />
          </FormControl>
        </FormRow>
        <fit>
          <safa-datatable
            min-height="150px"
            height="100%"
            max-height="100%"
            class="q-mt-sm-mb"
            mode="e"
            fit
            paginate
            v-model="SealedOperationCIList"
            cdcName="SealedOperationCIList"
            :columns="SealedOperationCIListColumns"
          />
        </fit>
        <internal-section>
          <text-template
            label="توضیحات فک پلمپ"
            label-width="60px"
            class="col-12 q-mt-sm"
            :rows="9"
            v-model="SealedOperation.Comments"
            cdcName="Comments"
            :m="m"
          />
        </internal-section>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره"
              label-width="60px"
              v-model="SealedOperationOrder.OrderNo"
              cdcName="OrderNo"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ"
              label-width="60px"
              v-model="SealedOperationOrder.OrderDate"
              cdcName="OrderDate"
            />
          </FormControl>
        </FormRow>
        <internal-section>
          <text-template
            label="توضیحات دستور"
            label-width="60px"
            class="col-12"
            :rows="9"
            v-model="SealedOperationOrder.Comments"
            cdcName="Comments"
            :m="m"
          />
        </internal-section>
      </fit>

      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveData"
          @cancel="isEditable = false"
        >
          <btn-default label="گزارش" />
          <btn-default label="صدور گواهی" />
          <btn-default label="ابطال گواهی" />
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
      title: "ارجاع فک پلمپ",
      formKey: "cdb38a73-2c5d-4593-8435-ad2fc63115f5",
      name: "UDetachSealedOrder",
      main: true,

      sidebarCompatible: true,
      workflowCompatible: true,

      SealedOperation: {
        UserName: "",
        OperationDate: "",
        OperationTime: "",
        OperationNo: "",
        Comments: ""
      },
      SealedOperationOrder: {
        OrderNo: "",
        OrderDate: "",
        Comments: ""
      },

      //   service
      getSealedOperationListRes: null,

      //   grid
      SealedOperationCIList: [],
      SealedOperationCIListColumns: [
        {
          title: "جزییات",
          field: "CI_DetachPolomb",
          editor: "combo",
          domain: "BuildingPolice"
        },
        {
          title: "توضیحات",
          field: "Description"
        }
      ]
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      //   const payload = {
      //     pNidProc: "5b841e63-d431-47c8-be16-fc2d5f7f0d3c",
      //   };

      this.$services.SH.getSealedOperationList()
        .then(({ data }) => {
          this.getSealedOperationListRes = this.getResponse(data)
          if (this.getSealedOperationListRes.success) {
            console.log(this.getSealedOperationListRes)
            this.SealedOperationCIList =
              this.getSealedOperationListRes.data.SealedOperationList
            // this.getSealedOperationListRes.data.AllSealedList
            //             await this.log({
            //   action: this.logActions.save,
            //   bizCode: this.selectedRequest.BizCode,
            //   bizCodeTitle: "کدنوسازی",
            //   nosaziCode: this.selectedRequest.BizCode,
            //   saveDesc: ``
            // })
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
