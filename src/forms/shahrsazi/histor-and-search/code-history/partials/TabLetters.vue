<template>
  <safa-datatable
    v-model="model.ReportInstanceList"
    :addRow="false"
    :allowCopy="false"
    :allowMultipleSelection="false"
    :columns="requestListLetters"
    :deleteRow="false"
    :show-selected-checkbox="false"
    :title="gridTitle"
    cdcName="letterList"
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
  name: 'TabLetters',
  props: {
    request: Object,
    title: String,
    formKey: String,
    name: String
  },

  data () {
    return {
      model: { letterList: [] },
      requestListLetters: [
        {
          field: '',
          title: 'عنوان گزارش',
          width: '100px'
        },
        {
          field: '',
          title: 'عملیات',
          width: '100px'
        },
        {
          field: '',
          title: 'تاريخ ',
          editor: 'date',
          width: '100px'
        },
        {
          field: '',
          title: 'ساعت ',
          width: '100px'
        },
        {
          field: '',
          title: 'آخرین کاربر ویرایش کننده ',
          width: '200px'
        },
        {
          field: 'Comments',
          title: 'توضیحات',
          width: '300px'
        }
      ]
    }
  },

  mounted () {
    if (this.request) {
      this.loadData()
    }
  },

  methods: {
    loadData () {
      this.showLoading()
      this.$services.ReportRule.getReportInstanceList({
        pNidProc:
          this.request.NidProc === ''
            ? '00000000-0000-0000-0000-000000000000'
            : this.request.NidProc
      })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          debugger
          if (res.success) {
            this.model = res.data
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  computed: {
    gridTitle () {
      if (!this.request) return ''
      return ' لیست نامه ها - درخواست ' + this.request.NidWorkItem
    }
  }
}
</script>
