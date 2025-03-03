<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :padding="false" :title="title">
      <fit>
        <div class="q-pa-sm">
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label="کد نوسازی"
            label-width="60px"
            @enter="loadData"
          />
        </div>
        <safa-datatable
          v-model="resultList"
          :columns="nosaziMonitoringColumns"
          :showRowNumber="false"
          fit
          height="100%"
          m="r"
          max-height="100%"
          minHeight="100%"
          paginate
          @detailClick="detailHandler"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  props: {},
  data () {
    return {
      title: 'مانیتورینگ نوسازی',
      formKey: '30232d1f-5ce3-41eb-83d7-ed9187474763',
      name: 'UNosaziMonitoring',
      main: true,
      sidebarCompatible: true,

      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nosaziMonitoringColumns: [
        { field: 'detail', title: 'جزییات', width: '100px' },
        { field: 'formCaption', title: 'فرم', width: '100px' },
        { field: 'bizCode', title: 'کد', width: '100px' },
        { field: 'nidKartabl', title: 'شماره ارجاع', width: '100px' },
        { field: 'workFlowType', title: 'نوع درخواست', width: '100px' },
        { field: 'formCaption', title: 'عنوان فرم', width: '100px' },
        { field: 'userName', title: 'نام کاربر', width: '100px' },
        { field: 'logDate', title: 'تاریخ ثبت', width: '100px', editor: 'date' },
        { field: 'logTime', title: 'زمان ثبت', width: '100px' },
        { field: 'ip', title: 'آی پی', width: '100px' },
        { field: 'computerName', title: 'نام کامپیوتر', width: '100px' }
      ],
      resultList: []
    }
  },

  methods: {
    loadData (val) {
      const payload = {
        NosaziCode: convertNosaziCodeObjectToString(val)
      }
      this.showLoading()
      this.$services.monitoring
        .getMonitoringActivityDetails(payload)
        .then(({ data }) => {
          // debugger;
          // console.log("===== data =====", data.searchResult);
          this.resultList = data
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    detailHandler () {
    }
  }
}
</script>
