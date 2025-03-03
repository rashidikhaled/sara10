<template>
  <form-wrapper title="لیست محل خدمت">
    <template #header>
      <safa-status :result="loadObjRes" />
    </template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="محل خدمت"
            v-model="jobName"
            cdcName="jobName"
            @keypress.enter="loadObj"
          >
            <template v-slot:append>
              <q-icon
                name="search"
                @click="loadObj"
                title="جستجوی محل خدمت"
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </FormControl>
      </FormRow>

      <safa-grid
        cdcName="jobLocations"
        :value=[]
        fit
        min-height="100px"
        height="100%"
        max-height="100%"
        paginate
        :columns="columns"
        m="r"
        rowModelType="serverSide"
        @grid:ready="onGridReady"
        :pageSize="20"
        :allowMultipleSelection="false"
        :addRow="false"
        hideHeader
        :deleteRow="false"
        :allowCopy="false"
        @row:click="selectedChange"
      />
    </fit>
    <template #footer>
      <btn-default
        label="انتخاب"
        :disable="!selectedJob"
        @click="selectedJobLocation"
      />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object
  },
  data () {
    return {
      loadObjRes: null,
      selectedJob: null,
      jobName: "",

      // grid
      gridApi: null,
      columns: [
        {
          field: "city",
          title: "شهر",
          ignoreCi: true,
          width: "100px"
        },
        {
          field: "name",
          title: "محل خدمت",
          width: "250px"
        }
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.loadObj()
    }, 200)
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener(
        'failCallback',
        this.onServerFailCallback
      )
      this.laodObj()
    },
    async loadObj () {
      this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          try {
            this.showLoading()
            let payload = {
              filter: [["name", this.jobName, "in"]],
              from: params.request.startRow === 0 ? 1 : params.request.startRow,
              to: params.request.endRow
            }

            const { data } = await this.$services.security.getAllJobLocations(
              payload
            )
            this.loadObjRes = this.getResponse(data)
            if (!this.loadObjRes.success) {
              params.success({
                rowData: [],
                rowCount: 0
              })

              this.showError("لیست بارگذاری نشد")
              return
            }
            this.currentData = this.loadObjRes.data?.data?.list ?? []
            let totalRow =
              this.currentData.length > 0 ? this.loadObjRes.data?.data.total : 0
            params.success({
              rowData: this.currentData,
              rowCount: totalRow
            })
          } catch (e) {
            params.success({
              rowData: [],
              rowCount: 0
            })
            this.showError("لیست دفاتر بارگذاری نشد")
            console.error(e.message)
            params.fail()
          } finally {
            this.hideLoading()
          }
        }
      })
    },
    selectedChange ({ data }) {
      debugger
      this.selectedJob = data ?? {}
    },
    selectedJobLocation () {
      this.$emit("selectedJobLocation", this.selectedJob)
    }
  }
}
</script>
