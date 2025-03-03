<template>
  <safa-form
    appId="2FB6680F-0B19-4779-B6F6-0FA47D7EF156"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getAllRequestRes" />
        <safa-status :result="saveRequestInfoRes" />
        <safa-status :result="getADPRequestChangeRes" />
        <safa-status :result="UpdateRequestRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          :actions="false"
          m="r"
        />
      </template>
      <fit>
        <safa-grid
          v-model="requestInfoList"
          cdcName="requestInfoList"
          title="درخواست های کمیسیون ماده پنج"
          :columns="Commission5Requests"
          height="100%"
          max-height="100%"
          min-height="200px"
          :addRow="false"
          :allowMultipleSelection="false"
          :show-selected-checkbox="true"
          fit
          m="r"
          paginate
          @row:click="handleClickRow"
        />
        <FormRow class="q-mt-sm">
          <FormControl>
            <safa-combo
              label="گروه درخواست"
              label-width="100px"
              v-model="model.CI_RequestType"
              cdcName="CI_RequestType"
              domainName="Commission5"
              ciName="CI_RequestType"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="از طرح"
              label-width="100px"
              v-model="model.CI_ChangeTypeFrom"
              cdcName="CI_ChangeTypeFrom"
              domainName="Commission5"
              ciName="CI_ChangeTypeFrom"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="به طرح"
              label-width="100px"
              v-model="model.CI_ChangeType"
              cdcName="CI_ChangeType"
              domainName="Commission5"
              ciName="CI_ChangeType"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="وضعیت ملک"
              label-width="100px"
              v-model="model.CI_HouseType"
              cdcName="CI_HouseType"
              domainName="Commission5"
              ciName="CI_HouseType"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="درخواست دهنده"
              label-width="100px"
              v-model="model.CI_RequesterType"
              cdcName="CI_RequesterType"
              domainName="Commission5"
              ciName="CI_RequesterType"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="مساحت"
              label-width="100px"
              v-model="model.Area"
              cdcName="Area"
              :m="mode"
              validations="required"
            />
          </FormControl>
        </FormRow>
        <div class="q-mt-sm flex justify-between">
          <span></span>
          <btn-default
            label="درج درخواست"
            :disable="!isEditable"
            @click="addRequest"
          />
        </div>
        <div class="row q-my-sm">
          <text-template
            label="توضیحات درخواست"
            v-model="model.Description"
            cdcName="Description"
            :rows="2"
            :m="mode"
            label-width="100px"
            class="col-12"
          />
        </div>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          showEditButton
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
import { uid } from "quasar"
import { currentDate, currentTime } from "src/utils/index"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "URequestInfo",
      title: "درخواست از کمیسیون ماده 5",
      formKey: "07064061-DCE6-4B91-B387-0CE006274DD6",
      main: true,

      // #services
      getAllRequestRes: null,
      getADPRequestChangeRes: null,
      UpdateRequestRes: null,
      saveRequestInfoRes: null,

      // #variables
      selectedItemGrid: null,
      model: {
        CI_RequestType: 0,
        CI_HouseType: 0,
        CI_ChangeTypeFrom: 0,
        CI_ChangeType: 0,
        CI_RequesterType: 0,
        Area: "",
        Description: "",
        getADPRequestChangeResult: null
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      Commission5Requests: [
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
          field: "CI_ChangeTypeFrom",
          title: "از طرح",
          editor: "combo",
          width: 130,
          domain: "Commission5"
        },
        {
          field: "CI_ChangeType",
          title: "به طرح",
          editor: "combo",
          width: 130,
          domain: "Commission5"
        },
        {
          field: "CI_HouseType",
          title: "وضعیت ملک",
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
          field: "CreateTime",
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
      ],
      requestInfoList: [],
      adpReqChngList: [],
      nidRequest: "00000000-0000-0000-0000-000000000000"
    }
  },
  async mounted () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      await this.getADPRequestChange()
      await this.loadObj(this.selectedRequest.NidProc)
      // NidProc: "58991eab-5223-4649-88b3-f21c7fc50cc8"
    } else {
      this.hideSidebar(this.name)
    }
  },
  watch: {
    "model.CI_RequestType" () {
      this.getADPRequestChange()
    }
  },
  methods: {
    async loadObj (NidProc) {
      try {
        this.showLoading()
        const { data } = await this.$services.commission5.getAllRequest({
          pRequest: {
            ClsRequest_Info: {
              ADP_RequestChangeList: null,
              Request_Info: null,
              Request_InfoList: null
            },
            DoNotChangeConfirmDate: false,
            NidProc
          }
        })
        this.getAllRequestRes = this.getResponse(data)
        if (this.getAllRequestRes.success) {
          this.requestInfoList =
            this.getAllRequestRes.data?.GetAllRequestResult?.ClsRequest_Info
              ?.Request_InfoList ?? []
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
          if (this.requestInfoList && this.requestInfoList.length > 0) {
            // this.model = this.requestInfoList[0]
            this.model = JSON.parse(JSON.stringify(this.requestInfoList[0]))
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    // when data is on table And when clicking on a row
    async getADPRequestChange () {
      try {
        const payload = {
          pRequest: {
            CI_RequestType: this.model.CI_RequestType,
            ClsCommission_Info: "",
            ClsCommittee: "",
            ClsRequest_Info: {
              ADP_RequestChangeList: null,
              Request_Info: null,
              Request_InfoList: null
            }
          }
        }
        this.showLoading()
        const { data } = await this.$services.commission5.getADPRequestChange(
          payload
        )
        this.getADPRequestChangeRes = this.getResponse(data)
        if (this.getADPRequestChangeRes.success) {
          this.adpReqChngList =
            this.getADPRequestChangeRes.data.GetADPRequestChangeResult
              .ClsRequest_Info.ADP_RequestChangeList ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    // clicking on save btn
    async saveObj () {
      try {
        if (!this.selectedItemGrid) {
          this.showError("ابتدا درخواست مورد نظر را انتخاب نمایید")
          return
        } else if (this.adpReqChngList.length === 0) {
          this.showError("جدول رابط گروه و نوع درخواست تنظیم نشده است")
          return
        } else if (this.model.CI_RequestType === 0) {
          this.showError("گروه درخواست انتخاب نشده است")
          return
        } else if (this.model.CI_ChangeType === 0) {
          this.showError("به طرح انتخاب نشده است")
          return
        } else if (this.model.CI_ChangeTypeFrom === 0) {
          this.showError("از طرح انتخاب نشده است")
          return
        } else if (!this.model.Area) {
          this.showError("ابتدا مساحت مورد نظر را وارد نمایید")
          return
        } else if (
          !this.adpReqChngList.find(
            (x) => x.CI_ChangeType === this.model.CI_ChangeType
          )
        ) {
          this.showError("مجاز به انتخاب این نوع طرح نمی باشید")
          return
        }
        let dto = {}
        let bnCode = convertStringToNosaziCodeObject(
          this.selectedRequest.BizCode
        )
        dto.NidRequest = this.nidRequest
        dto.NidProc = this.selectedRequest.NidProc
        dto.NidWorkItem = this.selectedRequest.NidWorkItem
        dto.EditDate = currentDate()
        dto.EditTime = currentTime()
        dto.EditorUserName = this.currentUser.UserName
        dto.EditorNidUser = this.getNidUser()
        dto.NosaziCode = this.selectedRequest.BizCode
        dto.District = bnCode.District
        dto.Region = bnCode.Region
        dto.Block = bnCode.Block
        dto.House = bnCode.House
        dto.Building = bnCode.Building
        dto.Apartment = bnCode.Apartment
        dto.Shop = bnCode.Shop
        dto.CI_RequestType = this.model.CI_RequestType
        dto.CI_HouseType = this.model.CI_HouseType
        dto.CI_ChangeType = this.model.CI_ChangeType
        dto.CI_ChangeTypeFrom = this.model.CI_ChangeTypeFrom
        dto.CI_RequesterType = this.model.CI_RequesterType
        dto.Area = this.model.Area
        dto.Description = this.model.Description
        dto.CreateDate = currentDate()
        dto.CreateTime = currentTime()
        dto.UserName = this.currentUser.UserName
        dto.NidUser = this.getNidUser()
        dto.IsDeleted = false
        this.showLoading()
        const { data } = await this.$services.commission5.updateRequestInfo({
          pRequest: { ClsRequest_Info: { Request_Info: dto } }
        })
        this.UpdateRequestRes = this.getResponse(data)
        if (this.UpdateRequestRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          this.isEditable = false
          await this.loadObj(this.selectedRequest.NidProc)
          this.getADPRequestChange()
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `بروزرسانی اطلاعات در فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async addRequest () {
      try {
        if (this.adpReqChngList.length === 0) {
          this.showError("جدول رابط گروه و نوع درخواست تنظیم نشده است")
          return
        } else if (this.model.CI_RequestType === 0) {
          this.showError("گروه درخواست انتخاب نشده است")
          return
        } else if (this.model.CI_ChangeTypeFrom === 0) {
          this.showError("از طرح انتخاب نشده است")
          return
        } else if (this.model.CI_ChangeType === 0) {
          this.showError("به طرح انتخاب نشده است")
          return
        } else if (!this.model.Area) {
          this.showError("ابتدا مساحت مورد نظر را وارد نمایید")
          return
        } else if (
          !this.adpReqChngList.find(
            (x) => x.CI_ChangeType === this.model.CI_ChangeType
          )
        ) {
          this.showError("مجاز به انتخاب این نوع طرح نمی باشید")
          return
        }
        let dto = {}
        let bnCode = convertStringToNosaziCodeObject(
          this.selectedRequest.BizCode
        )
        dto.NidRequest = uid()
        dto.NidProc = this.selectedRequest.NidProc
        dto.NidWorkItem = this.selectedRequest.NidWorkItem
        dto.CreateDate = currentDate()
        dto.CreateTime = currentTime()
        dto.UserName = this.currentUser.UserName
        dto.NidUser = this.getNidUser()
        dto.NosaziCode = this.selectedRequest.BizCode
        dto.District = bnCode.District
        dto.Region = bnCode.Region
        dto.Block = bnCode.Block
        dto.House = bnCode.House
        dto.Building = bnCode.Building
        dto.Apartment = bnCode.Apartment
        dto.Shop = bnCode.Shop
        dto.CI_RequestType = this.model.CI_RequestType
        dto.CI_HouseType = this.model.CI_HouseType
        dto.CI_ChangeType = this.model.CI_ChangeType
        dto.CI_ChangeTypeFrom = this.model.CI_ChangeTypeFrom
        dto.CI_RequesterType = this.model.CI_RequesterType
        dto.Area = this.model.Area
        dto.Description = this.model.Description
        dto.IsDeleted = false

        this.showLoading()
        const { data } = await this.$services.commission5.saveRequestInfo({
          pRequest: {
            ClsRequest_Info: {
              ADP_RequestChangeList: null,
              Request_Info: dto,
              Request_InfoList: null
            }
          }
        })
        this.saveRequestInfoRes = this.getResponse(data)
        if (this.saveRequestInfoRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات در فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
          this.isEditable = false
          await this.loadObj(this.selectedRequest.NidProc)
          this.getADPRequestChange()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    handleClickRow (e) {
      this.selectedItemGrid = e.data
      this.nidRequest = e.data.NidRequest ?? 0
      this.model.CI_RequestType = e.data.CI_RequestType ?? 0
      this.model.CI_ChangeType = e.data.CI_ChangeType ?? 0
      this.model.CI_ChangeTypeFrom = e.data.CI_ChangeTypeFrom ?? 0
      this.model.CI_HouseType = e.data.CI_HouseType ?? 0
      this.model.CI_RequesterType = e.data.CI_RequesterType ?? 0
      this.model.Area = e.data.Area ?? "0"
      this.model.Description = e.data.Description ?? ""
    }
  }
}
</script>
