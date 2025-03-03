script<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="sealedDetachRes" />
        <safa-status :result="saveSealedDetach2Res" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <safa-text
            label="کد ارجاع"
            v-model="NidWorkItem"
            cdcName="NidWorkItem"
          />
          <!-- @keyup.enter="loadObj" -->
          <nosazi-code-input
            label="کد نوسازی"
            label-width="70px"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            :actions="false"
          />
          <!-- @enter="loadObj" -->
          <div>
            <btn-search label="جستجو" @click="loadObj" />
          </div>
        </FormRow>
        <safa-grid
          title="لیست عملیات"
          v-model="model.SrvSealedDetachNotOrderResult"
          cdcName="SealedOperationListNotOrder"
          :columns="srvSealedColumns"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          min-height="100px"
          height="100%"
          max-height="100%"
          m="r"
          paginate
          fit
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "درخواست های بدون ارجاع",
      formKey: "B6005A1D-D75E-419B-8AA8-06C7A41E0EB8",
      name: "USealedOperationNotOrder",
      main: true,
      sidebarCompatible: true,

      // variables
      model: { SrvSealedDetachNotOrderResult: [] },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      NidWorkItem: 0,

      // service
      sealedDetachRes: null,
      saveSealedDetach2Res: null,
      // column
      srvSealedColumns: [
        {
          field: "agCallbackBtn",
          title: "",
          btnTitle: "ثبت درخواست ارجاع فک پلمب",
          callback: (params) => this.saveReq(params),
          width: "150px"
        },
        {
          field: "OperationNo",
          title: "شماره عملیات",
          width: "100px"
        },
        {
          field: "OperationDate",
          title: "تاریخ عملیات",
          editor: "date",
          width: "80px"
        },
        {
          field: "OperationTime",
          title: "ساعت عملیات",
          width: "80px"
        },
        {
          field: "NosaziCode",
          title: "کد نوسازی",
          width: "100px"
        },
        {
          field: "UserName",
          title: "کاربر",
          width: "150px"
        },
        {
          field: "EnterDate",
          title: "تاریخ ثبت",
          editor: "date",
          width: "80px"
        },
        {
          field: "EnterTime",
          title: "ساعت ثبت",
          width: "80px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "500px"
        }
      ]
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SH.getSealedDetachNotOrder({
          PageIndex: 0,
          PageSize: 50
        })
        this.sealedDetachRes = this.getResponse(data)
        if (this.sealedDetachRes.success) {
          this.model = this.sealedDetachRes.data
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            nosaziCode: "",
            nidWorkItem: "",
            saveDesc: `نمایش اطلاعات درخواست های بدون ارجاع انجام شد.`
          })
        }
      } catch (e) {
        this.showError(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveReq (dataItem) {
      try {
        const payload = {
          pDistrict: convertStringToNosaziCodeObject(dataItem.NosaziCode)
            .District,
          pObj: {
            ...this.model,
            NidOper: dataItem.NidOper,
            NidProc: dataItem.NidProc,
            SealedOperation: dataItem,
            SealedOperationOrder: {
              Comments: dataItem.Comments,
              EnterDate: null,
              EnterTime: null,
              NidOper: dataItem.NidOper,
              NidOrder: "00000000-0000-0000-0000-000000000000",
              NidProc: dataItem.NidProc,
              NidUser: this.getNidUser(),
              OrderDate: currentDate(),
              OrderNo: dataItem.OperationNo,
              UserName: this.getUserDisplayName()
            },
            SealedRemoveOrder: null,
            SrvSealedDetachNotOrderResult: null,
            Warrant: null
          }
        }
        this.showLoading()
        const { data } = await this.$services.SH.saveSealedDetach2(payload)
        this.saveSealedDetach2Res = this.getResponse(data)
        if (this.saveSealedDetach2Res.success) {
          // this.model = this.saveSealedDetach2Res.data
          this.showSuccess("توضیحات با موفقیت ذخیره شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: dataItem.NidOper,
            bizCodeTitle: "NidOper",
            nosaziCode: dataItem.NosaziCode,
            nidWorkItem: "",
            saveDesc: `ذخیره اطلاعات درخواست بدون ارجاع با شماره ${dataItem.OperationNo} انجام شد.`
          })
          this.loadObj()
        }
      } catch (e) {
        this.showError(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  watch: {
    NidWorkItem: {
      handler () {
        if (this.NidWorkItem === "" || this.NidWorkItem === null) {
          this.NidWorkItem = 0
        }
      },
      immediate: true
    }
  }
}
</script>
