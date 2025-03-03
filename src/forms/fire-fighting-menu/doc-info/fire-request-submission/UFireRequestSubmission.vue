<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getBaseLibRes" />
        <safa-status :result="getActiveJobRes" />
        <safa-status :result="getRequestInfoRes" />
        <safa-status :result="saveRequestInfoRes" />
      </template>
      <fit>
        <FormRow class="q-pa-sm">
          <FormControl>
            <safa-text
              v-model="ownerName"
              label="نام مالک"
              label-width="75px"
              cdcName="ownerName"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="address"
              label="آدرس"
              label-width="75px"
              cdcName="address"
              m="r"
            />
          </FormControl>
          <nosazi-code-input
            v-model="baseNosaziCode"
            label="کد نوسازی"
            label-width="75px"
            cdcName="baseNosaziCode"
            :m="mode"
            :actions="false"
            ref="nosaziCode"
            class="col"
            @enter="getBaseLibInNosaziCode"
          />
        </FormRow>
        <safa-grid
          title="اطلاعات متصدی"
          v-model="activeJobList"
          cdcName="activeJobList"
          :columns="allJobListColumns"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          fit
          paginate
          @row:click="selectedChange"
        />
        <FormRow class="q-my-sm q-px-sm">
          <FormControl>
            <safa-combo
              label="نوع درخواست"
              label-width="95px"
              ci-name="CI_RequestType"
              domain-name="Fire"
              v-model="model.requestSubmission.Request_Info.CI_RequestType"
              required
              :validations="['required', validations.CI_RequestType]"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره همراه"
              label-width="95px"
              v-model="model.requestSubmission.Request_Info.MobileNo"
              required
              :validations="['required', 'number', validations.MobileNo]"
              :m="mode"
            />
          </FormControl>
          <text-template
            label="توضیحات"
            label-width="95px"
            v-model="model.requestSubmission.Request_Info.Comments"
            :m="mode"
            :rows="8"
          />
        </FormRow>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          showNewButton
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
          @newInfo="newObj"
        >
          <template>
            <btn-default
              v-if="isEditable"
              label="لیست مشاغل"
              @click="showJobList = true"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
    <safa-popup
      title="لیست مشاغل"
      v-model="showJobList"
      width="900px"
      height="600px"
    >
      <JobList
        v-model="baseNosaziCode"
        :formKey="formKey"
        :title="title"
        :name="name"
        @changeBaseNosaziCode="changeBaseNosaziCode"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"
import JobList from "./partials/JobList.vue"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"

const defaultModel = {
  AllJobList: [],
  Base_AddressInfo: null,
  NIdProc: "00000000-0000-0000-0000-000000000000",
  NosaziCode: null,

  Request_Info: {
    Address: "",
    Apartment: 0,
    Block: 0,
    Building: 0,
    CI_Region: 0,
    CI_RequestType: 0,
    CodeString: null,
    Comments: "",
    ConfirmDate: null,
    District: 0,
    House: 0,
    IsArchive: false,
    JobUnitName: null,
    MobileNo: "",
    NIdJobInfo_Sara: null,
    NIdProcRef: null,
    NIdRequest: "00000000-0000-0000-0000-000000000000",
    NIdUser: "00000000-0000-0000-0000-000000000000",
    NIdWorkItem: 0,
    NIdWorkItemRef: null,
    NId_Sara: null,
    Region: 0,
    RequestDate: null,
    RequestTime: null,
    Shop: 0,
    SysCI_RequestStatus: 0,
    UserName: ""
  }
}

const defaultBaseLibModel = {
  Base_AddressInfo: {
    MainAddress: ""
  },
  Base_Owner: [],
  Base_PreCodeInfo: [],
  BuildingObj: {},
  Sh_RequestInfo: {},
  MainObj: {}
}
export default {
  components: { JobList },
  mixins: [baseFormMixin],

  data () {
    return {
      title: "ثبت درخواست",
      formKey: "dc3b5d62-9a15-4ef8-9e25-3632cc516409",
      name: "UFireRequestSubmission",
      main: true,

      // #region services
      getBaseLibRes: null,
      getActiveJobRes: null,
      getRequestInfoRes: null,
      saveRequestInfoRes: null,
      // #endregion

      // #region services
      model: { requestSubmission: { ...defaultModel } },
      ownerName: "",
      address: "",
      allJobListColumns: [
        { field: "JobUnitName", title: "نام واحد صنفی", width: "200px" },
        {
          field: "JobActivateDate",
          title: "تاریخ فعالیت",
          editor: "date",
          width: "auto"
        }
      ],

      showJobList: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedRow: null,
      activeJobList: [],
      baseLibModel: { baseLibResults: { ...defaultBaseLibModel } },

      validations: {
        CI_RequestType: Joi.custom(
          function (value, helper) {
            if (
              this.model.requestSubmission.Request_Info.CI_RequestType === 0 ||
              this.model.requestSubmission.Request_Info.CI_RequestType === null
            ) {
              return helper.message("مقدار نوع درخواست نمی تواند نامشخص باشد.")
            }
            return true
          }.bind(this)
        ),
        MobileNo: Joi.custom(
          function (value, helper) {
            if (
              this.model.requestSubmission.Request_Info.MobileNo.length !== 11
            ) {
              return helper.message(
                "شماره تلفن همراه نمیتواند کمتر از 11 عدد باشد."
              )
            }
            return true
          }.bind(this)
        )
      }
    }
  },

  async mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      await this.getBaseLibInNosaziCode()
      await this.getRequestInfo()
    } else {
      this.hideSidebar("UFireRequestSubmission")
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
  },

  methods: {
    async getBaseLibInNosaziCode () {
      if (!this.selectedRequest) return
      try {
        const payload = {
          pNosaziCode: {
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            CI_City: 0,
            District: this.baseNosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: this.baseNosaziCode.House,
            IsRoot: false,
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            Region: this.baseNosaziCode.Region,
            Shop: this.baseNosaziCode.Shop
          },
          pLoadFunc:
            "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode",
          pIsLoadDeletedNosaziCode: false
        }
        this.showLoading()
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payload,
          this.config
        )
        this.getBaseLibRes = this.getResponse(data)
        if (this.getBaseLibRes.success) {
          this.baseLibModel.baseLibResults = this.getBaseLibRes.data
          const tmp = this.baseLibModel.baseLibResults
          this.ownerName =
            tmp.Base_Owner && tmp.Base_Owner.length > 0
              ? tmp.Base_Owner[0].OwnerName ||
                "" + " " + tmp.Base_Owner[0].OwnerLastName
              : ""
          this.address = tmp?.Base_AddressInfo?.MainAddress ?? ""
          const strNosazi = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosazi,
            bizCodeTitle: "NosaziCode",
            saveDesc: `ذخیره اطلاعات پرونده برای کد ${strNosazi} انجام گردید.`
          })
          await this.getActiveJobListParvandeh()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getRequestInfo () {
      if (!this.selectedRequest) return
      this.selectedRow = null
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.getRequestInfo({
          PNIdProc: this.baseLibModel.baseLibResults.Sh_RequestInfo.NidProc,
          PNosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
        })
        this.getRequestInfoRes = this.getResponse(data)
        if (this.getRequestInfoRes.success) {
          this.model.requestSubmission = this.getRequestInfoRes.data
          this.baseNosaziCode = convertStringToNosaziCodeObject(
            this.model.requestSubmission.NosaziCode
          )
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getActiveJobListParvandeh () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.FireService.getActiveJobListParvandeh({
            pNosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
        this.getActiveJobRes = this.getResponse(data)
        if (this.getActiveJobRes.success) {
          this.activeJobList = this.getActiveJobRes.data?.ActiveJobList ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      if (!this.selectedRow) return this.showError("لطفا واحد صنفی مورد نظر را انتخاب نمایید.")
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        const NosaziCode = this.model.requestSubmission.NosaziCode
        const payload = {
          // PObj: this.model.requestSubmission
          PObj: {
            AllJobList: null, // []
            Base_AddressInfo: this.baseLibModel?.baseLibResults?.Base_AddressInfo ?? null,
            NIdProc: "00000000-0000-0000-0000-000000000000",
            NosaziCode,
            Request_Info: {
              ...this.model.requestSubmission.Request_Info,
              Address: null,
              Apartment: 0,
              Block: 0,
              Building: 0,
              CI_Region: 0,
              District: 0,
              House: 0,
              IsArchive: false,
              JobUnitName: this.selectedRow.JobUnitName,
              NIdJobInfo_Sara: this.selectedRow.NidJob,
              NIdProcRef: null,
              NIdRequest: "00000000-0000-0000-0000-000000000000",
              NIdUser: this.getNidUser(),
              NIdWorkItem: 0,
              NIdWorkItemRef: null,
              NId_Sara: this.selectedRow.NidBaseJob,
              SysCI_RequestStatus: 0,
              UserName: this.getUserDisplayName()
            }
          }
        }
        const { data } = await this.$services.FireService.saveRequestInfo(
          payload
        )
        this.saveRequestInfoRes = this.getResponse(data)
        if (this.saveRequestInfoRes.success) {
          this.showSuccess("عملیات با موفقیت انجام گردید.")
          await this.log({
            action: this.logActions.save,
            bizCode: NosaziCode,
            bizCodeTitle: "NosaziCode"
          })
          this.isEditable = false
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    newObj () {
      this.resetValidation()
      this.ownerName = ""
      this.address = ""
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.model = { requestSubmission: { ...defaultModel } }
      this.baseLibModel = { baseLibResults: { ...defaultBaseLibModel } }
      this.isEditable = true
    },
    selectedChange ({ data }) {
      this.selectedRow = data
    },
    changeBaseNosaziCode (strNosaziCode) {
      this.showJobList = false
      this.baseNosaziCode = convertStringToNosaziCodeObject(strNosaziCode)
      this.getBaseLibInNosaziCode()
    }
  },
  computed: {
    config () {
      return {
        config: {
          District:
            this.baseNosaziCode.District === 0
              ? 1
              : this.baseNosaziCode.District
        }
      }
    }
  }
}
</script>
