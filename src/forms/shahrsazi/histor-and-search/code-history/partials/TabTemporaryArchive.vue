<template>
  <safa-datatable
    v-model="model"
    :addRow="false"
    :allowCopy="false"
    :allowMultipleSelection="false"
    :deleteRow="false"
    :show-selected-checkbox="false"
    :title="gridTitle"
    cdcName="historyTemporaryArchive"
    fit
    height="100%"
    helper="historyTemporaryArchive"
    m="r"
    max-height="100%"
    min-height="200px"
    paginate
  />
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'TabTemporaryArchive',
  mixins: [baseFormMixin],
  props: {
    request: Object,
    title: String,
    formKey: String,
    name: String
  },

  data () {
    return {
      model: []
    }
  },

  mounted () {
    if (this.request) {
      this.loadData()
    }
  },

  methods: {
    loadData () {
      this.model = []
      this.showLoading()
      this.$services.SC.getTemporaryKartablHistory({
        pNidProc:
          this.request.NidProc === ''
            ? '00000000-0000-0000-0000-000000000000'
            : this.request.NidProc
      }, this.config)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model = res.data.TemporaryKartabl_History
            await this.log({
              action: this.logActions.view,
              bizCode: this.request.NidProc,
              bizCodeTitle: 'NidProc'
            })
          } else {
            return this.showError(res.errors[0].text)
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
    config () {
      return {
        config: {
          District: this.selectedDistrict
        }
      }
    },
    gridTitle () {
      if (!this.request) return ''
      return ' تاریخچه بایگانی موقت - درخواست ' + this.request.NidWorkItem
    }
  }
}
</script>
