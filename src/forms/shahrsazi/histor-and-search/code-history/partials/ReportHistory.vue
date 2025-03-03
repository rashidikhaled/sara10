<template>
  <safa-datatable
    v-model="model.assignedRevisitInfo"
    :addRow="false"
    :allowCopy="false"
    :allowMultipleSelection="false"
    :columns="ReportsHistoryColumns"
    :deleteRow="false"
    :show-selected-checkbox="false"
    fit
    height="100%"
    m="r"
    max-height="100%"
    min-height="200px"
    paginate
  />
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  name: 'ReportHistory',
  props: {
    selectedRow: Object
  },

  data () {
    return {
      model: { assignedRevisitInfo: [] },
      ReportsHistoryColumns: [
        {
          field: 'Name',
          title: 'نام',
          width: '130px'
        },
        {
          field: 'LastName',
          title: 'نام خانوادگی',
          width: '130px'
        },
        {
          field: 'Phone',
          title: 'تلفن',
          width: '115px',
          cell: 'PhoneNumberTemplate'
        },
        {
          field: 'UserName',
          title: 'نام کاربری',
          width: '130px'
        },
        {
          field: 'RevisitDate',
          title: 'تاريخ بازدید',
          editor: 'date',
          width: '130px'
        },
        {
          field: 'RevisitTimeFrom',
          title: 'ساعت شروع بازدید',
          width: '130px'
        },
        {
          field: 'RevisitTimeTo',
          title: 'ساعت پایان بازدید',
          width: '130px'
        },
        {
          field: 'CI_VisitType',
          title: 'نوع بازدید',
          width: '130px',
          editor: 'combo',
          domain: 'CI_SaraM1'
        },
        {
          field: 'IsDoIt',
          title: 'آیا انجام شده است',
          editor: 'checkbox',
          width: '130px'
        },
        {
          field: 'DateAddRevisit',
          title: 'تاریخ اعلام مامور',
          width: '130px'
        },
        {
          field: 'TimeAddRevisit',
          title: 'ساعت اعلام مامور',
          width: '130px'
        }
      ],
      result: null
    }
  },

  mounted () {
    debugger
    this.loadObj()
  },

  methods: {
    async loadObj () {
      try {
        debugger
        this.showLoading()
        let payLoad = {
          PNidProc: this.selectedRow.NidProc
        }
        const { data } = await this.$services.SC.getAssignRevisitInfo(payLoad)
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('لیست بازدیدهای تخصیص یافته بارگذاری نشد')
        }
        this.model.assignedRevisitInfo = this.result.data.Revisits_ThisRequest
        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedRequest.BizCode,
          bizCodeTitle: 'کد نوسازی'
        })

        // end
      } catch (e) {
        console.error(e)
        this.showError(e)
      } finally {
        this.hideLoading()
      }
    }
  },

  computed: {
    gridTitle () {
      if (!this.request) return ""
      return " لیست نامه ها - درخواست " + this.request.NidWorkItem
    }
  }
}
</script>
