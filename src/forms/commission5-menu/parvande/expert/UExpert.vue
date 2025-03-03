<template>
  <safa-form
    appId="2FB6680F-0B19-4779-B6F6-0FA47D7EF156"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="getAllRequestRes" />
        <safa-status :result="getAllCommitteeRes" />
        <safa-status :result="saveCommitteeRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
        />
        <!-- @fetched="fetched" -->
      </template>
      <fit>
        <safa-grid
          title="درخواست های کمیسیون ماده پنج"
          v-model="com5RequestList"
          cdcName="com5RequestList"
          :columns="com5RequestColumns"
          m="r"
          fit
          min-height="100px"
          height="100%"
          max-height="100%"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          class="q-mb-sm"
          paginate
          @selection:changed="selectedChange"
        />
        <div class="q-mb-sm">
          <div class="row q-col-gutter-sm">
            <text-template
              label="توضیحات درخواست"
              label-width="100px"
              v-model="reqDesc"
              cdcName="requestDescription"
              m="r"
              :rows="1"
              class="col-12"
            />
            <text-template
              label="توضیحات کمیته فنی"
              label-width="100px"
              v-model="comDesc"
              cdcName="comDesc"
              :m="mode"
              :rows="1"
              class="col-12"
              validations="required"
            />
          </div>
        </div>
        <safa-grid
          title="تاریخچه کمیته کار"
          v-model="committeeHistories"
          cdcName="expertsHistory"
          helper="expertsHistoryColumns"
          m="r"
          fit
          max-height="100%"
          height="100%"
          min-height="100px"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate, currentTime } from "src/utils/index"
import { uid } from "quasar"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "کمیته کار",
      formKey: "017981E1-C088-43D1-9318-C5B16146D11D",
      name: "UExperte",
      main: true,

      // #services
      getAllRequestRes: null,
      getAllCommitteeRes: null,
      saveCommitteeRes: null,
      result: null,

      // #variables
      com5RequestList: [],
      selectedReq: null,
      committeeHistories: [],
      comDesc: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      com5RequestColumns: [
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

  mounted () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadObj()
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    fetched () {
      this.loadObj()
    },
    // {
    //       pRequest: {
    //         ClsRequest_Info: {
    //           ADP_RequestChangeList: null,
    //           Request_Info: null,
    //           Request_InfoList: null
    //         },
    //         NidProc: this.selectedRequest.NidProc
    //       }
    //     }
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          pRequest: {
            ClsRequest_Info: {
              ADP_RequestChangeList: null,
              Request_Info: null,
              Request_InfoList: null
            },
            NidProc: this.selectedRequest.NidProc
          }
        }
        const { data } = await this.$services.commission5.getAllRequest(payload)
        this.getAllRequestRes = this.getResponse(data)
        if (this.getAllRequestRes.success) {
          this.com5RequestList =
            this.getAllRequestRes.data?.GetAllRequestResult?.ClsRequest_Info
              ?.Request_InfoList ?? []

          this.getAllCommittee()
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest?.NidProc ?? "",
            bizCodeTitle: "کد نوسازی",
            nosaziCode: this.selectedRequest?.BizCode ?? "",
            nidWorkItem: this.selectedRequest?.NidWorkItem ?? "",
            saveDesc: `بارگذاری اطلاعات برای شماره درخواست ${
              this.selectedRequest?.NidWorkItem ?? ""
            } در کمیته کار انجام گردید.`
          })
        }
      } catch (e) {
        this.showError(e)
      } finally {
        this.hideLoading()
      }
    },
    async getAllCommittee () {
      // if (!this.selectedReq) returns
      this.showLoading()
      const payload = {
        pRequest: {
          ClsCommittee: {
            Committee: null,
            CommitteeList: null,
            ErrorResult: {
              BizErrors: null,
              Requirements: null
            }
          },
          NIdRequest: this.com5RequestList[0].NidRequest
        }
      }
      try {
        const { data } = await this.$services.commission5.getAllCommittee(
          payload
        )
        this.getAllCommitteeRes = this.getResponse(data)
        if (this.getAllCommitteeRes.success) {
          this.committeeHistories =
            this.getAllCommitteeRes.data?.GetAllCommitteeResult?.ClsCommittee
              ?.CommitteeList ?? []
        }
      } catch (e) {
        this.showError(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      if (this.selectedReq === null) {
        return this.showError("لطفا ابتدا درخواست مورد نظر را انتخاب نمایید.")
      }
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        const { data } = await this.$services.commission5.saveCommittee({
          pRequest: {
            ClsCommittee: {
              Committee: {
                CreateDate: currentDate(),
                CreateTime: currentTime(),
                Description: this.comDesc,
                NidCommittee: uid(),
                NidRequest: this.selectedReq.NidRequest,
                NidUser: this.getNidUser(),
                UserName: this.getUserDisplayName()
              }
            }
          }
        })
        this.saveCommitteeRes = this.getResponse(data)
        if (this.saveCommitteeRes.success) {
          this.isEditable = false
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedReq.NidRequest,
            bizCodeTitle: "NidRequest",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات برای شماره درخواست ${this.selectedRequest.NidWorkItem} در کمیته کار انجام گردید.`
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
      this.selectedReq =
        e.api.getSelectedRows().length > 0 ? e.api.getSelectedRows()[0] : null
    }
  },
  computed: {
    reqDesc () {
      return this.selectedReq === null ? "" : this.selectedReq.Description
    }
  }
}
</script>
