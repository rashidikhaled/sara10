<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="2FB6680F-0B19-4779-B6F6-0FA47D7EF156"
  >
    <form-wrapper :title="title" >
      <template #header>
        <safa-status :result="getAllRequestRes" />
        <safa-status :result="updateRequestInfoRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetched"
        />
      </template>
      <fit>
        <safa-grid
          title="درخواست های کمیسیون ماده پنج"
          v-model="model.ClsRequest_Info.Request_InfoList"
          cdcName="Request_InfoList"
          :columns="requestInfoListColumns"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          min-height="250px"
          height="100%"
          max-height="100%"
          fit
          m="r"
          paginate
          @selection:changed="selectedChange"
        />
        <div class="q-my-sm">
          <div class="row q-col-gutter-sm">
            <text-template
              label="توضیحات کارشناس دفتر فنی"
              label-width="140px"
              v-model="selectedComReq.TechnicalOfficerComment"
              cdcName="technicalOfficerComment"
              class="col-12"
              :rows="1"
              :m="mode"
              formKey="7927a49e-9640-4408-8009-60f5e250893f"
            />
            <text-template
              label="توضیحات مسئول دفتر فنی"
              label-width="140px"
              v-model="selectedComReq.TechnicalOfficeExpertComment"
              cdcName="technicalOfficeExpertComment"
              class="col-12"
              :rows="1"
              :m="mode"
              formKey="7a0dfa7c-c3e3-4db4-a024-8cd6ee507da6"
            />
            <text-template
              label="توضیحات معاون شهرسازی"
              label-width="140px"
              v-model="selectedComReq.DeputyUrbanComment"
              cdcName="deputyUrbanComment"
              class="col-12"
              :rows="1"
              :m="mode"
              formKey="2b703af3-360c-4e74-ad7f-279fe97e69ee"
            />
          </div>
        </div>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "نظریه کمیسیون ماده پنج",
      formKey: "78170844-30A0-4123-8BDF-F07D43F232DA",
      name: "UTheoryCommission",
      main: true,

      // #variables
      model: {
        ClsRequest_Info: {
          Request_InfoList: [],
          Request_Info: {
            TechnicalOfficerComment: "",
            TechnicalOfficeExpertComment: "",
            DeputyUrbanComment: ""
          }
        }
      },
      selectedComReq: {
        NidRequest: null,
        TechnicalOfficerComment: "",
        TechnicalOfficeExpertComment: "",
        DeputyUrbanComment: ""
      },

      // #services
      getAllRequestRes: null,
      updateRequestInfoRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      requestInfoListColumns: [
        {
          field: "isSelected",
          width: 40,
          headerCheckboxSelection: false,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          sortable: false,
          filter: false,
          filterable: false
        },
        {
          field: "CI_RequestType",
          title: "گروه درخواست",
          editor: "combo",
          width: 130,
          sortable: true,
          domain: "Commission5"
        },
        {
          field: "CI_ChangeType",
          title: "نوع درخواست",
          editor: "combo",
          width: 100,
          domain: "Commission5"
        },
        {
          field: "CI_HouseType",
          title: "وضعیت ملک",
          editor: "combo",
          width: 130,
          domain: "Commission5"
        },
        {
          field: "CI_RequesterType",
          title: "درخواست دهنده",
          editor: "combo",
          width: 130,
          domain: "Commission5"
        },
        { field: "Area", title: "مساحت", width: 130 },
        {
          field: "CreateDate",
          title: "تاریخ ایجاد",
          width: 130,
          editor: "date"
        },
        {
          field: "createTime",
          width: 130,
          title: "زمان ایجاد"
        },
        {
          field: "UserName",
          width: 130,
          title: "کاربر ایجاد کننده"
        },
        {
          field: "EditDate",
          editor: "date",
          width: 130,
          title: "تاریخ ویرایش"
        },
        {
          field: "EditTime",
          width: 130,
          title: "زمان ویرایش"
        },
        {
          field: "EditorUserName",
          width: 130,
          title: "کاربر ویرایش کننده"
        }
      ]
    }
  },
  created () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadObj()
    } else {
      this.$nextTick(() => {
        this.hideSidebar(this.name)
      })
    }
  },
  methods: {
    fetched () {
      this.loadObj()
    },
    async loadObj () {
      try {
        const payload = {
          pRequest: {
            ClsRequest_Info: {
              ADP_RequestChangeList: "",
              Request_Info: null,
              Request_InfoList: null
            },
            DoNotChangeConfirmDate: false,
            NidProc: this.selectedRequest.NidProc
            // NidProc: "031ef47e-3481-4373-9500-43ae5c117d49"
          }
        }
        this.showLoading()
        const { data } = await this.$services.commission5.getAllRequest(
          payload
        )
        this.getAllRequestRes = this.getResponse(data)
        if (this.getAllRequestRes.success) {
          this.model = this.getAllRequestRes.data.GetAllRequestResult
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      try {
        if (this.selectedComReq.NidRequest === null) {
          return this.showError("ابتدا درخواست مورد نظر را انتخاب نمایید")
        }
        this.showLoading()
        this.model.ClsRequest_Info.Request_Info = this.selectedComReq
        this.model.ClsRequest_Info.Request_InfoList = null
        const { data } = await this.$services.commission5.updateRequestInfo({
          pRequest: this.model
        })
        this.updateRequestInfoRes = this.getResponse(data)
        if (this.updateRequestInfoRes.success) {
          this.isEditable = false
          this.showSuccess("بروزرسانی با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem
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
    selectedChange (e) {
      this.selectedComReq = e.api.getSelectedRows().length > 0 ? e.api.getSelectedRows()[0] : null
    }
  }
}
</script>
