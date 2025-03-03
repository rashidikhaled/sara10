<template>
  <fit>
    <safa-status v-model="formModel"/>
    <safa-status :result="saveResponse"/>

    <div class="row q-mb-sm">
      <safa-text
        v-model="revsistAgent"
        class="col-12 col-md-3"
        label="نام مأمور بازدید"
        m="r"
      />
    </div>

    <safa-datatable
      v-model="formModel.Sh_RevisitAgentVacation"
      :allowMultipleSelection="false"
      :selectable="true"
      class="q-pb-sm"
      fit
      height="100%"
      helper="vactions"
      margin="0"
      max-height="100%"
      min-height="100%"
      title="لیست مرخصی ها"
      @row-click="rowClick"
    />

    <safa-popup
      v-model="isShowNewVactionsModal"
      height="400px"
      title="اضافه کردن مرخصی"
      vertical
      width="600px"
      @hide="isShowNewVactionsModal = false"
      @onCloseModal="isShowNewVactionsModal = false"
    >
      <form-actions
        :m="mode"
        @cancel="cancelGroupBtn"
        @edit="edit"
        @save="save"
      >
        <template
          v-if="showBtns"
          #after
        >
          <btn-new @click="isShowNewVactionsModal = true"/>
          <btn-delete @click="deleteVacation"/>
        </template>
      </form-actions>
      <AddNewVacation
        @addVacations="addVacations"
        @cancel="cancel"
      />
    </safa-popup>
  </fit>
</template>
<script>
import AddNewVacation from './AddNewVacation'
import baseFormMixin from 'src/mixins/baseFormMixin'
// import { compare } from 'src/utils/dateTimeOperations'
import PersianDate from 'persian-date'

export default {
  props: {
    myRevisitAgent: Object,
    formKey: String,
    title: String,
    name: String
  },
  components: { AddNewVacation },
  mixins: [baseFormMixin],
  data: function () {
    return {
      showBtns: false,
      showEditBtns: true,
      formModel: { Sh_RevisitAgentVacation: [] },
      isShowNewVactionsModal: false,
      saveResponse: {},
      selectedRow: null,
      revsistAgent: ''
    }
  },

  methods: {
    rowClick (row) {
      this.selectedRow = row
    },
    load () {
      if (!this.myRevisitAgent || !this.myRevisitAgent.NidRevisitAgent) {
        return
      }

      this.shRevisitAgentVacation = {}
      this.showLoading()
      let data = {
        pNidRevisitAgent: this.myRevisitAgent.NidRevisitAgent
      }
      this.$services.SC.getRevisitAgentVacation(data)
        .then(({ data }) => {
          const response = this.getResponse(data)
          console.log('@@@', response.data)
          if (response.success) {
            this.formModel = response.data
          }
        })
        .catch(error => {
          this.hideLoading()
          this.showError(error.message)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.shRevisitAgentVacation = {}
      this.showLoading()

      let data = {
        pRevisitAgentVacation: this.formModel
      }

      this.$services.SC.saveRevisitAgentVacation(data)
        .then(({ data }) => {
          this.saveResponse = this.getResponse(data)
          console.log(this.saveResponse, 'this.saveResponse')
          if (this.saveResponse.success) {
            this.showSuccess('عملیات با موفقیت انجام شد.')
            this.isEditable = false
            this.showBtns = false
          }
        })
        .catch(error => {
          this.hideLoading()
          this.showError(error.message)
        })
        .finally(() => {
          this.hideLoading()
          console.log('this.formModel', this.formModel)
        })
    },
    cancel () {
      this.isShowNewVactionsModal = false
    },
    edit () {
      this.showBtns = true
      this.isEditable = true
    },
    cancelGroupBtn () {
      this.showBtns = false
      this.isEditable = false
    },
    addVacations (newVaction) {
      this.formModel.Sh_RevisitAgentVacation.push(newVaction)
      this.isShowNewVactionsModal = false
    },
    deleteVacation () {
      if (this.selectedRow === null) {
        this.showError('لطفا یک ردیف از جدول انتخاب نمایید.')
      }
      const { NidRevisitAgentVacation, VacationDate } = this.selectedRow
      const currentDate = new PersianDate().toLocale('en').format('L')
      const vacationDateArray = VacationDate.split('/')
      let yearTo = parseInt(vacationDateArray[0])
      let monthTo = parseInt(vacationDateArray[1])
      let dayTo = parseInt(vacationDateArray[2])
      let vacationDate = new PersianDate([yearTo, monthTo, dayTo])
      let diffCount = vacationDate.diff(currentDate, 'days')
      if (diffCount < 0) {
        return this.showError('مرخصی منقضی شده است')
      }
      // if (compare(VacationDate, currentDate) < 0) {
      //   return this.showError('مرخصی منقضی شده است')
      // }
      this.formModel.Sh_RevisitAgentVacation = this.formModel.Sh_RevisitAgentVacation.filter(
        x => NidRevisitAgentVacation !== x['NidRevisitAgentVacation']
      )
    }
  },
  mounted () {
    this.revsistAgent = this.currentUser.FullName
    this.load()
  }
}
</script>
