<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    caption="پلیس ساختمان- فک پلمپ"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getSealedOperationListRes" />
        <safa-status :result="getWarrantListByProcRes" />
        <safa-status :result="getSealedDetachRes" />
        <safa-status :result="saveSealedDetachRes" />
      </template>
      <fit>
        <safa-splitter class="fit" margin="0" vertival v-model="hSplitter">
          <template v-slot:before>
            <fit>
              <safa-splitter
                class="fit"
                margin="0"
                horizontal
                v-model="vSplitter"
              >
                <template v-slot:before>
                  <fit>
                    <safa-grid
                      title="لیست عملیات"
                      :columns="sealedOperationColumns"
                      v-model="sealedOperationList"
                      cdcName="sealedOperationList"
                      m="r"
                      fit
                      paginate
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-grid
                      title="درخواست حکم ورود - پلمپ"
                      helper="warrantListHokm"
                      v-model="warrantList"
                      cdcName="warrantList"
                      m="r"
                      fit
                      paginate
                    />
                  </fit>
                </template>
              </safa-splitter>
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs v-model="activeTab">
                <template v-slot:tabs>
                  <tab-menu name="plumb" label="فک پلمپ" />
                  <tab-menu name="communicated" label="ابلاغ" />
                </template>
                <tab-content name="plumb">
                  <fit>
                    <FormRow class="q-mb-sm">
                      <FormControl>
                        <safa-text
                          label="کاربر ثبت کننده"
                          label-width="90px"
                          v-model="model.SealedOperation.UserName"
                          cdcName="UserName"
                          m="r"
                        />
                      </FormControl>
                      <FormControl>
                        <safa-text
                          label="شماره"
                          label-width="90px"
                          v-model="model.SealedOperation.OperationNo"
                          cdcName="OperationNo"
                          m="r"
                        />
                      </FormControl>
                      <FormControl>
                        <safa-datepicker
                          label="تاریخ"
                          label-width="90px"
                          v-model="model.SealedOperation.OperationDate"
                          cdcName="OperationDate"
                          :m="mode"
                          validations="required"
                        />
                      </FormControl>
                      <FormControl>
                        <safa-timepicker
                          label="ساعت"
                          label-width="90px"
                          v-model="model.SealedOperation.OperationTime"
                          cdcName="OperationTime"
                          :m="mode"
                          validations="required"
                        />
                      </FormControl>
                      <text-template
                        label="توضیحات"
                        label-width="90px"
                        v-model="model.SealedOperation.Comments"
                        cdcName="Comments"
                        :m="mode"
                        :rows="1"
                        class="col-12"
                        validations="required"
                      />
                    </FormRow>
                    <safa-grid
                      title="جزئیات"
                      v-model="model.SealedOperationCIList"
                      cdcName="sealedOperationCIList"
                      :columns="sealedOperationCIColumns"
                      :m="mode"
                      fit
                      paginate
                      validations="required"
                    />
                  </fit>
                </tab-content>
                <tab-content name="communicated">
                  <FormRow>
                    <FormControl>
                      <safa-combo
                        label="عنوان ماده ابلاغ"
                        label-width="90px"
                        v-model="model.ClsProphecy.Prophecy.CI_Article"
                        cdcName="CI_Article"
                        domainName="BuildingPolice"
                        ciName="CI_Article"
                        :m="mode"
                        validations="required"
                      />
                    </FormControl>
                    <FormControl>
                      <safa-text
                        label="نام و نام خانوادگی تحویل گیرنده"
                        label-width="90px"
                        v-model="model.ClsProphecy.Prophecy.RecipientName"
                        cdcName="RecipientName"
                        :m="mode"
                        validations="required"
                      />
                    </FormControl>
                    <FormControl>
                      <safa-text
                        v-model="model.ClsProphecy.Prophecy.Post"
                        cdcName="Post"
                        label="سمت"
                        label-width="90px"
                        :m="mode"
                        validations="required"
                      />
                    </FormControl>
                    <FormControl>
                      <safa-text
                        label="مامور ابلاغ"
                        label-width="90px"
                        v-model="model.ClsProphecy.Prophecy.NotificationOfficer"
                        cdcName="NotificationOfficer"
                        :m="mode"
                        validations="required"
                      />
                    </FormControl>
                  </FormRow>
                </tab-content>
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
      </fit>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          :showEditButton="isEditable"
          :showNewButton="!isEditable"
          @edit="isEditable = true"
          @cancel="reset"
          @newInfo="newObj"
          @save="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { EumSealedOperationType } from "../config/enums.js"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UDetachSealed",
      title: "فک پلمپ",
      formKey: "1637df4d-b2c0-41ea-9e06-a6b6c10cfad0",
      main: true,
      workflowCompatible: true,

      vSplitter: 50,
      hSplitter: 50,
      activeTab: "plumb",
      getSealedOperationListRes: null,
      getWarrantListByProcRes: null,
      getSealedDetachRes: null,
      saveSealedDetachRes: null,
      sealedOperationList: [],
      warrantList: [],
      sealedDetachResult: {},

      model: {
        SealedOperation: {
          Comments: "",
          OperationDate: "",
          OperationNo: "",
          OperationTime: "",
          UserName: ""
        },
        SealedOperationCIList: [],
        ClsProphecy: {
          Prophecy: {
            CI_Article: 0,
            RecipientName: "",
            Post: "",
            NotificationOfficer: ""
          }
        },

        WarrantList: []
      },
      sealedOperationCIColumns: [
        {
          field: "CI_DetachPolomb",
          editor: "combo",
          domain: "BuildingPolice",
          width: "200px",
          title: "جزئیات"
        },
        { field: "Description", width: "auto", title: "توضیحات" }
      ],
      sealedOperationColumns: [
        { field: "SealedOperationType", width: "150px", title: "نوع عملیات" },
        { field: "OperationNo", width: "100px", title: "شماره عملیات" },
        {
          field: "OperationDate",
          width: "100px",
          title: "تاریخ عملیات",
          editor: "date"
        },
        { field: "OperationTime", width: "100px", title: "ساعت عملیات" },
        { field: "UserName", width: "200px", title: "کاربر" },
        {
          field: "EnterDate",
          width: "100px",
          title: "تاریخ ثبت",
          editor: "date"
        },
        { field: "EnterTime", width: "100px", title: "ساعت ثبت" },
        { field: "Comments", width: "300px", title: "توضیحات" }
      ]
    }
  },
  created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SH.getSealedOperationList({
          pNidProc: this.selectedRequest.NidProc
        })
        this.getSealedOperationListRes = this.getResponse(data)
        if (this.getSealedOperationListRes.success) {
          this.sealedOperationList =
            this.getSealedOperationListRes.data.SealedOperationList || []
          this.getWarrantListByProc()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
        this.hideLoading()
      }
    },
    async getWarrantListByProc () {
      try {
        const { data } = await this.$services.SH.getWarrantListByProc({
          pNidProc: this.selectedRequest.NidProc
        })
        this.getWarrantListByProcRes = this.getResponse(data)
        if (this.getWarrantListByProcRes.success) {
          this.warrantList = this.getWarrantListByProcRes.data.WarrantList
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.NosaziCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `نمایش اطلاعات فرم فک پلمپ با شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    normalizeModel (e) {
      return {
        ...e,
        Comments: e.Comments ?? "",
        OperationDate: e.OperationDate ?? "",
        OperationTime: e.OperationTime ?? "",
        UserName: this.getUserDisplayName(),
        NidProc: this.selectedRequest.NidProc,
        EumSealedOperationType: EumSealedOperationType.SealedDetach.value,
        NosaziCode: this.selectedRequest.BizCode,
        NidUser: this.getNidUser()
      }
    },
    async getSealedDetach () {
      try {
        this.showLoading()
        const { data } = await this.$services.SH.getSealedDetach({
          pNidProc: this.selectedRequest.NidProc,
          pNidOper: "00000000-0000-0000-0000-000000000000"
        })
        this.getSealedDetachRes = this.getResponse(data)
        if (this.getSealedDetachRes.success) {
          const res = this.getSealedDetachRes.data
          this.model = {
            ...res,
            SealedOperation: this.normalizeModel(res.SealedOperation)
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        const { data } = await this.$services.SH.saveSealedDetach({
          pDistrict: this.selectedDistrict,
          pObj: this.model
        })
        this.saveSealedDetachRes = this.getResponse(data)
        if (this.saveSealedDetachRes.success) {
          // this.model = this.saveSealedDetachRes.data
          this.showSuccess("عملیات با موفقیت انجام شد")
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.NosaziCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات فرم فک پلمپ با شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
          this.reset()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    newObj () {
      this.getSealedDetach()
      this.resetValidation()
      this.isEditable = true
    },

    reset () {
      this.resetValidation()
      this.loadObj()
      this.isEditable = false
    }
  }
}
</script>
