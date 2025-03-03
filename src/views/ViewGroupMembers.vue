<template>
  <div class="row bg-white q-pa-sm">
    <div class="col-12 q-mb-md text-title">اعضای گروه</div>
    <safa-datagrid
      class="col-12"
      style2="height: 15rem"
      :allowNewRow="false"
      :allow-copy="false"
      :allow-remove-row="false"
      :hide-toolbar="true"
      :columns="columns"
      v-model="currentData"
    />
    <q-inner-loading :showing="loading">
      <q-spinner-ball size="50px" color="primary"/>
    </q-inner-loading>
  </div>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'view-group-members',

  mixins: [baseFormMixin],

  props: {
    groupGuid: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      result: null,
      loading: false,
      currentData: [],
      columns: [
        {
          field: 'FirstName',
          title: 'نام',
          width: 150
        },
        {
          field: 'LastName',
          title: 'نام خانوادگی',
          width: 150
        },
        {
          field: 'UserName',
          title: 'نام کاربری',
          width: 150
        },
        {
          field: 'JobLocationName',
          title: 'محل',
          width: 150
        }
      ]
    }
  },

  methods: {
    async load () {
      if (!this.groupGuid) {
        return this.showError('آی دی گروه مشخص نشده است')
      }
      try {
        this.loading = true
        const { data } = await this.$services.security.getGroupUsers({
          groupGuid: this.groupGuid
        })
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('لیست اعضای گروه واکشی نشد')
        }
        this.currentData = this.result.data

        /// end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.loading = false
      }
    }
  },

  mounted () {
    this.load()
  }
}
</script>
