<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getAllReqHeadersRes" />
        <safa-status :result="getPolygonRes" />
        <safa-status :result="getRequestRes" />
        <safa-status :result="deleteRequestRunMonitoringRes" />
      </template>
      <fit>
        <safa-splitter v-model="spliterModel" class="fit">
          <template v-slot:before>
            <q-list class="q-mr-sm" bordered separator dense>
              <q-item v-for="(item, index) in allRequestHeaders" :key="index">
                <q-item-section>
                  <q-item-label style="padding:10px">{{ item.UserName }} {{ item.Date }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon
                    style="cursor: pointer"
                    dense
                    name="clear"
                    color="primary"
                    size="xs"
                    @click="btnDeleteClick(item)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
          <template v-slot:after>
            <fit>
              <FormRow class="q-pl-sm q-mb-sm">
                <FormControl>
                  <safa-text
                    label="نام کاربری"
                    label-width="100px"
                    v-model="model.ActualCompletion.UserName"
                    cdcName="UserName"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ"
                    label-width="100px"
                    v-model="model.ActualCompletion.Date"
                    cdcName="Date"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ واقعی اتمام"
                    label-width="100px"
                    v-model="model.ActualCompletion.ActualCompletionDate"
                    cdcName="ActualCompletionDate"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ دوره تضمین"
                    v-model="model.ActualCompletion.GuaranteePeriodEndDate"
                    cdcName="GuaranteePeriodEndDate"
                    label-width="100px"
                    m="r"
                  />
                </FormControl>
              </FormRow>
              <safa-grid
                title="نظارت و اجرا"
                v-model="model.Request_RunMonitoring"
                helper="runMonitoringHeadersColumns"
                class="q-ml-sm"
                fit
                m="r"
                :pageSize="20"
                paginate
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "URequestService_RunMonitoring",
      title: "اجرا و نظارت طرح های توسعه",
      formKey: "36F51981-EFDD-4309-8A9B-36C084C8D365",
      main: true,

      sidebarCompatible: true,
      workflowCompatible: true,

      getAllReqHeadersRes: null,
      getPolygonRes: null,
      getRequestRes: null,
      deleteRequestRunMonitoringRes: null,

      // #variables
      spliterModel: 15,
      allRequestHeaders: [],
      polygonResult: {},
      model: {
        ActualCompletion: {
          Date: "",
          UserName: "",
          ActualCompletionDate: "",
          GuaranteePeriodEndDate: ""
        },
        Request_RunMonitoring: []
      }
    }
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    async loadObj () {
      const obj = this.selectedRequest
      this.showLoading()
      try {
        const { data } =
          await this.$services.excavation.getAllRequestRunMonitoringHeaders({
            pRequest: { NidProc: obj.NidProc }
          })
        this.getAllReqHeadersRes = this.getResponse(data)
        if (this.getAllReqHeadersRes.success) {
          const res =
            this.getAllReqHeadersRes?.data
              .GetAllRequest_RunMonitoringHeadersResult
          this.allRequestHeaders.push({
            UserName: this.getUserDisplayName(),
            Date: currentDate(),
            NIdRunMonitoringHeader: res.NIdRequest
          })
          await this.getRequestRunMonitoring(res.NIdRequest)
          await this.polygon()
          await this.log({
            action: this.logActions.view,
            bizCode: obj.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: obj.BizCode || "",
            nidWorkItem: obj.NidWorkItem || "",
            saveDesc: `اطلاعات فرم اجرا و نظارت انشعابات شخصی شماره درخواست ${
              obj.NidWorkItem || ""
            } انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    btnDeleteClick (item) {
      this.showConfirm("آیا برای حذف اطمینان دارید؟").onOk(async () => {
        this.showLoading()
        try {
          const { data } =
            await this.$services.excavation.deleteRequestRunMonitoring({
              pRequest: { NIdRunMonitoringHeader: item.NIdRunMonitoringHeader }
            })
          this.deleteRequestRunMonitoringRes = this.getResponse(data)
          if (this.deleteRequestRunMonitoringRes.success) {
            // this.allRequestHeaders = this.allRequestHeaders.filter(f => f.NIdRunMonitoringHeader === item.NIdRunMonitoringHeader)
            this.allRequestHeaders = []
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      })
    },
    async polygon () {
      try {
        const { data } = await this.$services.excavation.getPolygon({
          pRequest: { NidProc: this.selectedRequest.NidProc }
        })
        this.getPolygonRes = this.getResponse(data)
        if (this.getPolygonRes.success) {
          this.polygonResult = this.getPolygonRes.data.GetPolygonResult
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },

    async getRequestRunMonitoring (NIdRunMonitoringHeader) {
      try {
        const { data } =
          await this.$services.excavation.getRequestRunMonitoring({
            pRequest: {
              NidProc: this.selectedRequest.NidProc,
              NIdRunMonitoringHeader
            }
          })
        this.getRequestRes = this.getResponse(data)
        if (this.getRequestRes.success) {
          const res =
            this.getRequestRes?.data.GetRequest_RunMonitoringResult
              ?.ClsRequest_RunMonitoring ?? null
          if (res) {
            this.model.ActualCompletion = {
              Date: currentDate(),
              UserName: this.getUserDisplayName(),
              ActualCompletionDate:
                res.ActualCompletion.ActualCompletionDate ?? "",
              GuaranteePeriodEndDate:
                res.ActualCompletion.GuaranteePeriodEndDate ?? ""
            }
            this.model.Request_RunMonitoring = res?.Request_RunMonitoring ?? []
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    }
  }
}
</script>
