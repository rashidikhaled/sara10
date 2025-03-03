<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'UPlanBank',
  mixins: [baseFormMixin],
  data () {
    return {
      formKey: 'C955F58F-ED13-4ACB-825F-0DDEA2735FDA',
      name: 'UPlanBank',
      title: 'بانک نقشه ها',
      main: true,
      workflowCompatible: true,
      archiveBizCode: '',
      showArchive: false,
      archiveOptions: {
        showOnlyStates: []
      },
      requestResult: null
    }
  },
  computed: {
    archiveConfig () {
      return window.getConfigValue('archivePlanBank', {})
    },
    isSelectedPlan () {
      // eslint-disable-next-line no-undef
      return archiveStore.selectedFileItem?.ID || false
    },
    selectedPlan () {
      if (!this.isSelectedPlan) return null
      // eslint-disable-next-line no-undef
      return archiveStore.selectedFileItem
    }
  },
  methods: {
    async loadObj () {
      try {
        this.isLoading = true
        this.showArchive = false
        const { data } = await this.$services.SC.getPlanBankTags({
          pNidProc: this.taskInfo.NidProc
        })

        this.archiveOptions.showOnlyStates = data.PlanBankOutput.map(name => ({ key: name, isSelected: true }))
        this.archiveBizCode = data.PlanBankArchiveBizcode
        this.showArchive = true
      } catch (ex) {
        console.log(ex)
        this.showArchive = false
      } finally {
        this.isLoading = false
      }
    },
    async copy () {
      try {
        this.isLoading = true
        const selectedItem = this.selectedPlan
        if (!selectedItem) {
          return this.showError(
            'لطفا یک پلان انتخاب نمایید.'
          )
        }
        /* if (selectedItems.length > window.getConfigValue('MaxFileLen', 0)) {
          return this.showError(
            'تعداد فایل های انتخاب شده از حد مجاز بیشتر است.'
          )
        } */
        const { data } = await this.$services.SC.copyFromBankPlan({
          pNidProc: this.taskInfo.NidProc,
          ArchiveIds: [selectedItem.ID]
        })
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.showSuccess('عملیات با موفقیت انجام شد.')
        }
      } catch (ex) {
        console.log(ex)
      } finally {
        this.isLoading = false
      }
    }
  },
  created () {
    this.loadObj()
  }
}
</script>
<template>
  <form-wrapper :title="title" :loading="isLoading">
    <safa-status :result="requestResult" />
    <template #before-close>
      <btn-default @click="loadObj" icon="refresh" round flat dense/>
    </template>
    <archive-wrap v-if="showArchive" :options="archiveOptions" :name="archiveConfig.username"
                  :pass="archiveConfig.password" :biz-code="archiveBizCode"/>
    <template #footer>
      <div class="flex items-center q-gutter-x-md">
        <btn-default :disabled="!isSelectedPlan" label="کپی از بانک نقشه" @click="copy"/>
        <div class="flex items-center" v-if="isSelectedPlan">
          <q-icon name="note_add" class="mr-xs" color="primary" size="20px"/>
          <span class="text-grey-7 text-body2">{{ selectedPlan?.FileName }}</span>
        </div>
      </div>
    </template>
  </form-wrapper>
</template>
