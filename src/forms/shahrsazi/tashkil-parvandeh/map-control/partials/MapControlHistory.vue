<template>
  <fit>
    <safa-status :result="loadObjRes" />
    <safa-status :result="copyRes" />
    <!-- helper="mapControlHistoryHistory" -->

    <safa-datatable
      title="تاریخچه کنترل نقشه"
      :columns="columns"
      v-model="mapControlHistory"
      cdcName="mapControlHistory"
      fit
      m="r"
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
      @CopyClick="copyHistoryToMapControl"
      @HistoryShowClick="historyShow"
    />

    <safa-popup
      v-model="showModal"
      title="تاریخچه"
      width="1200px"
      height="1000px"
    >
      <UMapControlTabs
        v-model="mapControlInfo"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </safa-popup>
  </fit>
</template>

<script>
import xmlConverter from "xml-js"
import baseFormMixin from "src/mixins/baseFormMixin"
import UMapControlTabs from "../history/show-history/UMapControlTabs"

export default {
  mixins: [baseFormMixin],
  name: "MapControlHistory",

  components: { UMapControlTabs },
  props: {
    nidNosaziCode: {
      type: String,
      default: ""
    },
    formKey: String,
    title: String,
    name: String
  },
  computed: {
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  },
  data () {
    return {
      // #services
      loadObjRes: null,
      copyRes: null,

      // #variables
      mapControlHistory: [],
      mapControlInfo: null,
      showModal: false,
      columns: [
        {
          field: "NidWorkItem",
          title: "شماره درخواست",
          width: "100px"
        },
        {
          field: "DateInsert",
          title: "تاریخ",
          width: "80px",
          editor: "date"
        },
        {
          field: "TimeInsert",
          title: "ساعت",
          width: "80px"
        },
        {
          field: "Copy",
          title: "کپی",
          editor: "action",
          btnLabel: "کپی",
          width: "80px"
        },
        {
          field: "HistoryShow",
          title: "نمایش تاریخچه",
          editor: "action",
          btnLabel: "نمایش تاریخچه",
          width: "auto"
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
        const { data } = await this.$services.SC.loadMapControlHistory(
          { pNidNosaziCode: this.nidNosaziCode },
          this.config
        )
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.mapControlHistory =
            this.loadObjRes.data?.MapControl_History ?? []
          await this.log({
            action: this.logActions.view,
            bizCode: this.nidNosaziCode,
            bizCodeTitle: "nidNosaziCode",
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

    copyHistoryToMapControl ({ dataItem }) {
      this.showConfirm("آیا از کپی اطلاعات به کنترل نقشه اطمینان دارید؟").onOk(
        () => {
          const payload = {
            pNidProc: this.selectedRequest.NidProc,
            pNidBaseFrom: dataItem.NidBase
          }
          this.showLoading()
          this.$services.SC.copyHistoryToMapControl(payload, this.config)
            .then(async ({ data }) => {
              this.copyRes = this.getResponse(data)
              if (this.copyRes.success) {
                this.showSuccess("کپی اطلاعات با موفقیت انجام شد.")
                await this.log({
                  action: this.logActions.copy,
                  bizCode: this.nidNosaziCode,
                  bizCodeTitle: "nidNosaziCode",
                  nosaziCode: this.selectedRequest.BizCode,
                  nidWorkItem: this.selectedRequest.NidWorkItem
                })
                this.$emit("hide")
              }
            })
            .catch((e) => {
              console.error(e)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    },
    historyShow (e) {
      const arrayOfClsLog = xmlConverter.xml2json(e.dataItem.MapControlInfo, {
        compact: true
      })
      // console.log("arrayOfClsLog", arrayOfClsLog)
      const clsLog = JSON.parse(arrayOfClsLog)
      // console.log("clsLog", clsLog)
      if (clsLog.ClsMapControl) {
        this.mapControlInfo = clsLog.ClsMapControl
        // console.log("mapControlInfo", this.mapControlInfo)
      } else {
        this.mapControlInfo = null
      }
      this.showModal = true
    }
  }
}
</script>
