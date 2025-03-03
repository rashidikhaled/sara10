<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1887A97D-54FA-4B00-9C89-47127AC6FC99"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getConvertRequestRes" />
        <safa-status :result="getWorkflowInstanceListRes" />
        <safa-status :result="updateRes" />
      </template>

      <safa-splitter v-model="splitterModel" class="fit" horizontal margin="0">
        <template v-slot:before>
          <fit>
            <safa-grid
              title="لیست درخواستهای کانورت"
              v-model="model.Sara8Sys_ConvertRequestList"
              cdcName="Sara8Sys_ConvertHistoryList"
              helper="sara8SysConvertRequestListColumns"
              m="r"
              fit
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              paginate
            />
            <!-- <safa-text
              label="لیست درخواست ها"
              label-width="100px"
              v-model="txtTaskCount"
              m="r"
            /> -->
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-grid
              title="لیست درخواست ها"
              v-model="convertRequestListDetailes"
              cdcName="convertRequestListDetailes"
              helper="requestListColumns"
              m="r"
              fit
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              :getRowClass="getRowClass"
              paginate
            />
          </fit>
        </template>
      </safa-splitter>
      <template #footer>
        <btn-default label="تغییر ثبت کننده درخواست" @click="convert" />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  mixins: [baseFormMixin],
  components: {},
  data () {
    return {
      title: "لیست درخواست های کانورت",
      formKey: "7e1522d9-2890-47fb-b457-4d6ba600a161",
      name: "UConvertList",
      main: true,

      // #variables
      isView: false,
      txtTaskCount: "...",
      selectedConvertRequest: null,
      NidWorkItemList: [],
      workflowInstanceList: [],
      ProcGuid: [],
      convertRequestListDetailes: [],
      splitterModel: 50,
      RequesterName: "",
      Cellphone: "",
      model: {
        Sara8Sys_ConvertHistoryList: [],
        Sara8Sys_ConvertRequestList: []
      },
      BuildingSettings: {
        ShahrsaziSettings: {
          Chk_BackToStartInConvert: false
        }
      },

      // #services
      getConvertRequestRes: null,
      getWorkflowInstanceListRes: null,
      updateRes: null
    }
  },

  computed: {
    getShahrsaziSettings () {
      return this.BuildingSettings && this.BuildingSettings.ShahrsaziSettings
    },
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  },

  async mounted () {
    if (this.isSelectedRequest()) {
      await this.loadSettings()
      await this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    async loadSettings () {
      this.BuildingSettings = await this.loadFormSetting("BuildingSettings", {
        defaultValue: this.BuildingSettings,
        nidProc: GLOBAL_SETTINGS_GUID
      })
    },
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SX.getConvertRequest({
          pNidProc: this.selectedRequest.NidProc // "3c060ca1-54f8-4f69-bdd6-25a1d8ff9bb5"
        }, this.config)
        this.getConvertRequestRes = this.getResponse(data)
        if (this.getConvertRequestRes.success) {
          this.model = this.getConvertRequestRes.data
          if (this.model.Sara8Sys_ConvertRequestList.length > 0) {
            this.selectedConvertRequest =
              this.model.Sara8Sys_ConvertRequestList[0] ?? null
            await this.loadRequestList()
          }
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.Bizcode,
              nidWorkItem: this.selectedRequest.nidWorkItem,
              saveDesc: `بارگذاری ${this.title} با شماره درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadRequestList () {
      try {
        this.showLoading()
        const { data } = await this.$services.SX.getWorkflowInstanceList({
          pProcInitiator: this.selectedConvertRequest.FirstProcInitiator,
          pFromDate: this.selectedConvertRequest.FromDate,
          pToDate: this.selectedConvertRequest.ToDate,
          IsFromSara10: true
        }, this.config)
        this.getWorkflowInstanceListRes = this.getResponse(data)
        if (this.getWorkflowInstanceListRes.success) {
          this.workflowInstanceList =
            this.getWorkflowInstanceListRes.data?.WorkflowInstanceList ?? []

          if (this.workflowInstanceList.length > 0) {
            let tmp = this.selectedConvertRequest.NidProcList.split(",")
            tmp.forEach((p) => {
              if (p !== "") {
                this.ProcGuid.push(p)
              }
            })
            let filteredWorkflowInstance =
              this.workflowInstanceList?.filter((b) =>
                this.ProcGuid.includes(b.NidProc)
              ) ?? []
            this.convertRequestListDetailes = filteredWorkflowInstance.orderBy(
              (b) => b.EumProcStatus
            )
            this.txtTaskCount = filteredWorkflowInstance.length || 0
            this.NidWorkItemList = filteredWorkflowInstance
              .orderBy((b) => b.EumProcStatus)
              .map((b) => b.NidWorkItem.toString())
          } else {
            this.showError("اطلاعات درخواست کاربر یافت نشد.", {
              title: "توجه"
            })
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getAllTaskByNidProc (nidproc) {
      // فعلا این بخش رو آقای خوش آیین گفتن پیاده سازی نشه
      this.$srvWorkflow
        .getAllTaskByNidProc({
          NidProc: nidproc
        })
        .then(async ({ data }) => {
          const getProcessInfoRes = this.getResponse(data)
          let task = getProcessInfoRes.data?.GetProcessInfoResult?.Task
          if (task.length > 0) {
            // var firstState = task.orderBy(f => f.NidSort)[0] ?? null
            // var lastState = task.OrderByDescending(f => f.NidSort)[0] ?? null
            // taskSrv.SendToBackCompleted += (aa, bb) =>
            // {
            //     tmpSrv.UpdateProcInitiatorGroup2Async(ProcGuid, SelectedRequest.ProcInitiator.Value, SelectedRequest.ProcInitiatorName);
            // };
            // taskSrv.SendToBackAsync(new ApplicationCommon.TaskService.ClsSendToBack1()
            // {
            //     DeleteTask = false,
            //     NidBack = Guid.Empty,
            //     NidTask = lastState.NidTask,
            //     NidUser = SelectedRequest.ProcInitiator.Value,
            //     UserName = SelectedRequest.ProcInitiatorName,
            //     StateToBack = new ApplicationCommon.TaskService.Task()
            //     {
            //         AssingTo = SelectedRequest.ProcInitiator.Value,
            //         AssingToUserName = SelectedRequest.ProcInitiatorName,
            //         CompleatPercent = firstState.CompleatPercent,
            //         CreatedBy = SelectedRequest.ProcInitiator.Value,
            //         CreatedByName = SelectedRequest.ProcInitiatorName,
            //         EumTaskStatus = firstState.EumTaskStatus,
            //         NidProc = firstState.NidProc,
            //         NidTask = firstState.NidTask,
            //         Priority = firstState.Priority,
            //         ProcBookmark = firstState.ProcBookmark,
            //         TaskArea = firstState.TaskArea,
            //         TaskCloseDate = firstState.TaskCloseDate,
            //         TaskCloseTime = firstState.TaskCloseTime,
            //         TaskStartDate = firstState.TaskStartDate,
            //         TaskStartTime = firstState.TaskStartTime,
            //         TaskTitel = firstState.TaskTitel,
            //         WorkflowStateName = firstState.WorkflowStateName
            //     }
            // });
          }
        })
        .catch((error) => {
          console.error(error, "error")
        })
    },
    convert () {
      this.showConfirm(
        "آیا از تغییر کاربر ثبت کننده درخواست اطمینان دارید؟"
      ).onOk(() => {
        this.updateObj()
      })
    },
    updateObj () {
      const obj = this.selectedConvertRequest
      const payload = {
        pNidProcList: this.ProcGuid,
        pProcInitiator: obj.ProcInitiator,
        pProcInitiatorName: obj.ProcInitiatorName,
        pProcInitiatorFullName: obj?.ProcInitiatorFullName ?? "",
        pProcInitiatorCellPhone: obj?.ProcInitiatorCellPhone ?? "",
        pUserName: obj.UserNameRequester,
        pNiduser: obj.NiduserRequester,
        pUserGroup: obj.UserGroup,
        pIsChangeProcInitiator: true,
        IsFromSara10: true

        // "pNidWorkItemConvertRequest":
      }
      this.showLoading()
      this.$services.SX.updateProcInitiatorGroup(payload, this.config)
        .then(async ({ data }) => {
          this.updateRes = this.getResponse(data)
          if (this.updateRes.success) {
            if (this.updateRes.data) {
              this.showSuccess(`عملیات تغییر کاربر ثبت کننده درخواست با شماره درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`)
              await this.log({
                action: this.logActions.update,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.Bizcode,
                nidWorkItem: this.selectedRequest.nidWorkItem,
                saveDesc: `ذخیره ${this.title} با شماره درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
              })
              await this.loadObj()
              if (this.getShahrsaziSettings.Chk_BackToStartInConvert) {
                if (this.ProcGuid.length > 0) {
                  // بررسی همه ی درخواست های جاری
                  this.ProcGuid.forEach((NidProc) => {
                    // for in
                    // this.getAllTaskByNidProc(NidProc)
                  })
                }
              }
            } else {
              this.showError(
                "مقدار برگشتی UpdateProcInitiator برابر با  Null می باشد. لطفا به مدیر سیستم اطلاع دهید.."
              )
            }
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

    getRowClass (params) {
      let row = params.data
      if (row.EumProcStatus === 3) {
        return "bg-green-2"
      }
      if (row.EumProcStatus === 1) {
        return "bg-blue-2"
      }
      if (row.EumProcStatus === 4) {
        return "bg-red-2"
      }
      return { background: "transparent" }
    }
  }
}
</script>
