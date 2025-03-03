<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="2FB6680F-0B19-4779-B6F6-0FA47D7EF156"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="getAllRequestRes" />
        <safa-status :result="getCommissionVotesRes" />
        <safa-status :result="updateCommissionVotesRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetched"
        />
      </template>
      <fit>
        <safa-grid
          v-model="grdRequestList"
          helper="grdRequestListColumns"
          title="درخواست های کمیسیون ماده پنج"
          ref="grdRequestList"
          fit
          rowSelection="single"
          :filterable="false"
          :showSelectedCheckbox="false"
          :allowMultipleSelection="false"
          :disableSelectionOnClick="false"
          :checkboxSelection="false"
          :suppressRowClickSelection="false"
          m="r"
          height="100%"
          min-height="200px"
          max-height="100%"
          paginate
          @selection:changed="grdRequestListSelectionChanged"
          class="q-mb-sm"
        />

        <internal-section class="q-mb-sm" title="توضیحات کمیته کار">
          <text-template
            :rows="2"
            v-model="dataContext.committeeDescription"
            m="r"
          />
          <!-- <q-separator horizontal /> -->
        </internal-section>

        <internal-section class="q-mb-sm" title="صدور رأی">
          <form-row :xs="1" :sm="1" :md="4" :lg="4" :xxl="4">
            <form-control>
              <safa-combo2
                v-model="dataContext.CI_RequestType"
                label="گروه درخواست :"
                label-width="80px"
                m="r"
                domainName="Commission5"
                ciName="CI_RequestType"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="dataContext.CI_ChangeType"
                label="نوع درخواست :"
                label-width="80px"
                m="r"
                domainName="Commission5"
                ciName="CI_ChangeType"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="dataContext.CI_HouseType"
                label="وضعیت ملک :"
                label-width="80px"
                m="r"
                domainName="Commission5"
                ciName="CI_HouseType"
              />
            </form-control>
            <form-control>
              <safa-combo2
                v-model="dataContext.CI_VoteType"
                label="نوع رأی :"
                label-width="80px"
                :m="mode"
                domainName="Commission5"
                ciName="CI_VoteType"
              />
            </form-control>
            <form-control className="col-12">
              <text-template
                label="متن رأی :"
                label-width="80px"
                :rows="1"
                v-model="dataContext.txtDescription"
                cdcName="Comments"
                :formKey="formKey"
                :m="mode"
              />
            </form-control>
          </form-row>
          <div class="q-mt-sm flex justify-between">
            <span></span>
            <btn-default
              label="انشاء رأی"
              @click="btnSaveVoteClick"
              class="q-my-sm"
              style="margin-right: 80px"
              :disabled="mode === 'r'"
            />
          </div>
          <q-separator horizontal />
        </internal-section>

        <safa-grid
          v-model="grdCommissionVoteList"
          helper="grdCommissionVoteListColumns"
          title="رأی های صادر شده"
          ref="grdCommissionVoteList"
          fit
          rowSelection="single"
          :filterable="false"
          :showSelectedCheckbox="false"
          :allowMultipleSelection="false"
          :disableSelectionOnClick="false"
          :checkboxSelection="true"
          :suppressRowClickSelection="false"
          height="100%"
          min-height="200px"
          max-height="100%"
          m="e"
          paginate
          @selection:changed="grdCommissionVoteListSelectionChanged"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template v-slot:after>
            <btn-default label="چاپ رای" @click="btnPrintClick" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"

// Utils
import { currentDate, currentTime } from "src/utils/index"
import { uid } from "quasar"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "رأی کمیسیون ماده 5",
      formKey: "7762b0c2-97e2-4b76-9cac-af8feabeb7cd",
      name: "UCommisionVote",
      main: true,

      // Responses
      getAllRequestRes: null,
      getCommissionVotesRes: null,
      updateCommissionVotesRes: null,

      // Context
      grdRequestList: [],
      grdCommissionVoteList: [],
      dataContext: {
        CI_RequestType: 0,
        CI_ChangeType: 0,
        CI_HouseType: 0,
        CI_VoteType: 0,
        txtDescription: "",
        committeeDescription: ""
      },
      requestList: [],
      commissionVoteList: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  async created () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadObj()
    } else {
      await this.hideSidebar(this.name)
      // await this.redirectToKartable()
      // return false
    }
  },
  methods: {
    fetched () {
      this.loadObj()
    },
    loadObj () {
      // to check the form, replace all "this.selectedNidProc"s with "031ef47e-3481-4373-9500-43ae5c117d49"
      this.getAllRequest(this.selectedNidProc)
    },

    getAllRequest (pNidProc) {
      this.showLoading()

      const payload = {
        pRequest: {
          NidProc: pNidProc,
          ClsRequest_Info: {
            ErrorResult: {
              BizErrors: "",
              Requirements: ""
            }
          }
        }
      }

      this.requestList = []

      this.$services.commission5
        .getAllRequest(payload)
        .then(async ({ data }) => {
          this.getAllRequestRes = this.getResponse(data)
          if (this.getAllRequestRes.success) {
            const resultListTmp = (
              this.getAllRequestRes.data.GetAllRequestResult.ClsRequest_Info
                .Request_InfoList || []
            )
              .sort((x) => x.CreateDate)
              .sort((f) => f.CreateTime)

            this.grdRequestList = [...resultListTmp]

            if (resultListTmp.length > 0) {
              const dto = resultListTmp.find((f) => f)
              this.$nextTick(() => {
                this.$refs.grdRequestList.gridApi.forEachRowNode((node) => {
                  node.setSelected(
                    resultListTmp.some(
                      (f) => f.NidRequest === node.data.NidRequest
                    )
                  )
                })
              })
              this.requestList = [...resultListTmp]
              this.dataContext.CI_RequestType = dto?.CI_RequestType ?? 0
              this.dataContext.CI_ChangeType = dto?.CI_ChangeType ?? 0
              this.dataContext.CI_HouseType = dto?.CI_HouseType ?? 0
              this.getAllVote(dto.NidProc, dto.NidRequest)
            }

            await this.log({
              action: this.logActions.view,
              bizCode: pNidProc,
              bizCodeTitle: "NidProc",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getAllVote (pNidProc, pNidRequest) {
      this.showLoading()

      const payload = {
        pRequest: {
          NidProc: pNidProc,
          NIdRequest: pNidRequest,
          ClsCommission_Info: {
            ClsRequest_Info: {
              ErrorResult: {
                BizErrors: "",
                Requirements: ""
              }
            }
          }
        }
      }

      this.$services.commission5
        .getCommissionVotes(payload)
        .then(async ({ data }) => {
          this.getCommissionVotesRes = this.getResponse(data)

          if (this.getCommissionVotesRes.success) {
            const resultListTmp = (
              this.getCommissionVotesRes.data.GetCommissionVotesResult.ClsCommission_Info.Commission_Votes.filter(
                (x) => x.IsCancel !== true
              ) || {}
            )
              .sort((x) => x.CreateDate)
              .sort((f) => f.CreateTime)

            if (resultListTmp.length > 0) {
              this.grdCommissionVoteList = resultListTmp
              this.commissionVoteList = [...resultListTmp]
            }

            await this.log({
              action: this.logActions.view,
              bizCode: pNidProc,
              bizCodeTitle: "NidProc",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    btnPrintClick () {
      const reportPath =
        "/Commission5/RptCommission_Vote"
      const queryParams = {
        NIdProc: this.selectedNidProc
      }
      this.showReport(reportPath, queryParams)
    },

    btnSaveVoteClick () {
      if (!this.dataContext.CI_VoteType) {
        this.showError("نوع رأی مشخص نشده است!")
        return
      }
      if (this.$refs.grdRequestList.gridApi.getSelectedRows().length === 0) {
        this.showError("درخواست مورد نظر انتخاب نشده است!")
        return
      }

      this.showLoading()
      const nidRequest =
        this.$refs.grdRequestList.gridApi.getSelectedRows()[0].NidRequest

      // #region Commission_Vote
      const dtoCommissionVote = {
        NidVote: uid(),
        NidProc: this.selectedNidProc,
        NidWorkItem: this.selectedRequest.NidWorkItem,
        CreateDate: currentDate(),
        CreateTime: currentTime(),
        CI_VoteType: this.dataContext.CI_VoteType ?? 0,
        Description: this.dataContext.txtDescription,
        Value: 0,
        UserName: this.getUserDisplayName(),
        NidUser: this.getNidUser(),
        IsCancel: false,
        NidRequest: nidRequest
      }
      // #endregion

      // #region VoteDetails
      const dtoVoteDetails = {
        NidVoteDetail: uid(),
        NidVote: dtoCommissionVote.NidVote,
        District: this.selectedNosaziCode.District,
        Region: this.selectedNosaziCode.Region,
        Block: this.selectedNosaziCode.Block,
        House: this.selectedNosaziCode.House,
        Building: this.selectedNosaziCode.Building,
        Apartment: this.selectedNosaziCode.Apartment,
        Shop: this.selectedNosaziCode.Shop,
        NosaziCode:
          this.selectedRequest.BizCode ||
          this.selectedRequest.BizCode.NosaziCode
      }
      // #endregion

      // #region finally Payload
      const payload = {
        pRequest: {
          ClsCommission_Info: {
            Commission_Vote: dtoCommissionVote,
            VoteDetails: dtoVoteDetails
          }
        }
      }
      // #endregion

      // if (this.grdCommissionVoteList.map((x) => x.NidRequest === dtoCommissionVote.NidRequest)) {
      //   return }
      this.$services.commission5
        .saveCommissionVote(payload)
        .then(async ({ data }) => {
          this.saveCommissionVoteRes = this.getResponse(data)

          if (this.saveCommissionVoteRes.success) {
            this.getAllVote(this.selectedNidProc, nidRequest)
            this.isEditable = false

            this.showSuccess("عملیات با موفقیت انجام شد!")

            await this.log({
              action: this.logActions.save,
              bizCode:
                this.selectedRequest.BizCode ||
                this.selectedRequest.BizCode.NosaziCode,
              bizCodeTitle: "NosaziCode",
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    grdRequestListSelectionChanged (params) {
      const row = params.api.getSelectedRows()[0] || {}
      this.grdCommissionVoteList = []
      const nidRequest = row.NidRequest
      const dto = this.requestList.find((x) => x.NidRequest === nidRequest)
      if (dto != null) {
        this.dataContext.CI_RequestType = dto?.CI_RequestType ?? 0
        this.dataContext.CI_ChangeType = dto?.CI_ChangeType ?? 0
        this.dataContext.CI_HouseType = dto?.CI_HouseType ?? 0
        this.getAllVote(dto.NidProc, nidRequest)
      }
      this.dataContext.CI_VoteType = 0
      this.dataContext.txtDescription = ""
    },

    grdCommissionVoteListSelectionChanged (params) {
      const row = params.api.getSelectedRows()[0] || {}
      // const nidVote = row.NidVote
      this.dataContext.CI_VoteType = row?.CI_VoteType ?? 0
      this.dataContext.txtDescription = row?.Description ?? ""
    },

    saveObj () {
      const selectedRows =
        this.$refs.grdCommissionVoteList.gridApi.getSelectedRows()

      if (selectedRows.length === 0) {
        this.showError("ابتدا رأی مورد نظر را انتخاب نمایید!")
        return
      }

      const nidVote = selectedRows[0].NidVote
      const dto = this.commissionVoteList.find((x) => x.NidVote === nidVote)
      dto.ChangeDate = currentDate()
      dto.ChangeTime = currentTime()
      dto.ChangeUserName = this.getUserDisplayName()
      dto.ChangeNidUser = this.getNidUser()
      dto.CI_VoteType = this.dataContext.CI_VoteType
      dto.Description = this.dataContext.txtDescription

      const payload = {
        pRequest: {
          ClsCommission_Info: {
            Commission_Vote: dto,
            ErrorResult: {
              BizErrors: "",
              Requirements: ""
            }
          }
        }
      }

      this.$services.commission5
        .updateCommissionVotes(payload)
        .then(async ({ data }) => {
          this.updateCommissionVotesRes = this.getResponse(data)

          if (this.updateCommissionVotesRes.success) {
            const nidRequest = selectedRows[0].NidRequest
            this.getAllVote(
              this.selectedNidProc,
              nidRequest ?? "00000000-0000-0000-0000-000000000000"
            )
            this.isEditable = false
            this.showError("ذخیره با موفقیت انجام شد!")

            await this.log({
              action: this.logActions.update,
              bizCode: nidVote,
              bizCodeTitle: "NidVote",
              saveDesc: `بروز رسانی اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }

}
</script>
