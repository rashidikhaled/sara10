<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="deleteObjRes" />
        <safa-status :result="changeStateRes" />
      </template>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="RequestGroup" label="اطلاعات درخواست" />
          <tab-menu name="TabAll" label="لیست بایگانی" />
        </template>
        <tab-content name="RequestGroup">
          <form-row>
            <form-control>
              <safa-text
                label="کد ارجاع "
                label-width="70px"
                v-model="model.ByganiItem.NidWorkItem"
                cdcName="NidWorkItem"
                m="r"
              />
            </form-control>
            <form-control>
              <safa-text
                label="نوع حفاری"
                label-width="70px"
                v-model="model.ByganiItem.DigType"
                cdcName="DigType"
                m="r"
              />
            </form-control>
            <form-control>
              <safa-text
                label="شماره مجوز"
                label-width="70px"
                v-model="model.ByganiItem.ExportLicenseNo"
                cdcName="ExportLicenseNo"
                m="r"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ مجوز"
                v-model="model.ByganiItem.ExportLicenseDate"
                cdcName="ExportLicenseDate"
                label-width="70px"
                m="r"
              />
            </form-control>
            <form-control class="flex items-center">
              <safa-checkbox
                label="ارسال به بایگانی دائم"
                label-width="70px"
                v-model="IsBaygani"
                cdcName="IsBaygani"
              />
            </form-control>
          </form-row>
        </tab-content>

        <tab-content name="TabAll" :padding="false">
          <fit>
            <safa-grid
              title="لیست درخواست های بایگانی شده"
              v-model="model.ResultBaygani"
              :columns="bayganiListColumns"
              fit
              max-height="100%"
              height="100%"
              minHeight="300px"
              :suppressRowClickSelection="false"
              :pageSize="50"
              paginate
              m="r"
            />
          </fit>
        </tab-content>
      </safa-tabs>
      <template #footer v-if="activeTab === 'RequestGroup'">
        <btn-default label="بایگانی پرونده" @click="saveObj" />
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
      name: "UDigTemporaryArchive",
      title: "بایگانی موقت",
      formKey: "f93fb51e-6f97-4be9-b5ce-fc0604a2b778",
      main: true,

      IsBaygani: false,
      model: {
        ByganiItem: {
          DigType: "",
          ExportLicenseDate: "",
          ExportLicenseNo: "",
          NidWorkItem: ""
        },
        ResultBaygani: []
      },
      activeTab: "TabAll",
      isView: false,

      loadObjRes: null,
      saveObjRes: null,
      deleteObjRes: null,
      changeStateRes: null,

      bayganiListColumns: [
        {
          field: "",
          title: "خروج از بایگانی",
          editor: "action",
          width: "120px",
          filterable: false,
          resizable: false,
          lockPosition: true,
          pinned: "right",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.deleteObj(params)
        },
        { field: "NIdWorkItem", title: "کد رهگیری", width: "100px" },
        {
          field: "CI_Region",
          title: "منطقه",
          domain: "Dig",
          width: "100px",
          editor: "combo"
        },
        { field: "RequestTypeTitle", title: "نوع درخواست", width: "150px" },
        {
          field: "CodString",
          title: " کد نوسازی",
          width: "150px"
        },
        {
          field: "RequestDate",
          title: "تاریخ درخواست",
          width: "150px"
        },
        {
          field: "ExportLicenseNo",
          title: "شماره مجوز",
          width: "150px"
        },
        {
          field: "ExportLicenseDate",
          title: "تاریخ مجوز",
          width: "100px"
        },
        {
          field: "DateSend",
          title: "تاریخ ارسال به بایگانی",
          width: "150px"
        },
        {
          field: "TimeSend",
          title: "ساعت ارسال  به بایگانی",
          width: "200px"
        },
        {
          field: "UserName",
          title: "کاربر ارسال کننده",
          width: "250px"
        },
        {
          field: "Addres",
          title: "آدرس",
          width: "400px"
        }
      ]
    }
  },

  created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar()
  },

  methods: {
    async loadObj () {
      this.showLoading()
      try {
        const { data } = await this.$services.excavation.getBayganiItem({
          pRequest: { NidProc: this.selectedRequest.NidProc }
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const { ResultBaygani, ByganiItem } =
            this.loadObjRes.data.GetBayganiItemResult.Baygani
          this.model.ResultBaygani =
            ResultBaygani.sort((b, a) =>
              a.DateSend < b.DateSend ? -1 : a.DateSend > b.DateSend ? 1 : 0
            ) ?? []
          this.model.ByganiItem = ByganiItem ?? {
            DigType: "",
            ExportLicenseDate: "",
            ExportLicenseNo: "",
            NidWorkItem: ""
          }
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری لیست پرونده های بایگانی موقت برای درخواست ${this.model.ByganiItem.NidWorkItem} انجام گردید.`
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
    async saveObj () {
      this.showConfirm(
        `آیا از ارسال پرونده ${this.selectedRequest.NidWorkItem} به بایگانی اطمینان دارید؟`
      ).onOk(async () => {
        this.showLoading()
        try {
          const { data } = await this.$services.excavation.baygani({
            pRequest: {
              NidProc: this.selectedRequest.NidProc,
              IsBaygani: !this.IsBaygani,
              NidUser: this.getNidUser(),
              UserName: this.getUserDisplayName(),
              IsSara10: true
            }
          })
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ارسال به بایگانی با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.transfer,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `پرونده ی ${this.model.ByganiItem.NidWorkItem} به بایگانی انتقال داده شد.`
            })
            await this.changeState(2) // ارسال به بایگانی == 2
            this.hideSidebar(this.name)
            this.redirectToKartable()
          }
        } catch (e) {
          console.log(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      })
    },
    deleteObj (params) {
      this.showConfirm(
        `آیا از خروج پرونده ${params.NIdWorkItem} از بایگانی اطمینان دارید؟`
      ).onOk(async () => {
        this.showLoading()
        try {
          const { data } = await this.$services.excavation.exitBaygani({
            pRequest: {
              NidProc: params.NIdProc,
              NIdRequest: params.NID,
              NidUser: this.getNidUser(),
              UserName: this.getUserDisplayName()
            }
          })
          this.deleteObjRes = this.getResponse(data)
          if (this.deleteObjRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.delete,
              bizCode: params.NIdProc,
              bizCodeTitle: "NIdProc",
              nidWorkItem: params.NIdWorkItem,
              saveDesc: `خروج پرونده ${params.NIdWorkItem} از بایگانی انجام گردید.`
            })
            await this.changeState(0, params.NIdProc) // خروج به بایگانی === 0
            this.hideSidebar(this.name)
            this.redirectToKartable()
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      })
    },
    async changeState (ProcStatus, NidProc = this.selectedRequest.NidProc) {
      try {
        const { data } = await this.$srvWorkflow.setProcStatus({
          NidProc,
          NidUser: this.getNidUser(),
          UserName: this.getUserDisplayName(),
          ProcStatus
        })
        console.log("ProcStatus :>> ", ProcStatus)
        this.changeStateRes = this.getResponse(data)
        if (this.changeStateRes.success) {
          console.debug("changeState: >> ", this.changeStateRes)
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
