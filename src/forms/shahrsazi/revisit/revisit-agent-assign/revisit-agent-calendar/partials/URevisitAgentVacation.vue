<template>
  <form-wrapper :padding="false">
    <safa-status :result="result"/>
    <fit>
      <div class="row">
        <safa-text
          :value="agentName"
          cdcName="agentName"
          class="col-12 col-md-4 q-my-sm q-ml-sm"
          label="نام مامور بازدید"
          m="r"
        />
      </div>
      <div class="fit">
        <safa-datatable
          v-model="currentData.Sh_RevisitAgentVacation"
          cdcName="Sh_RevisitAgentVacation"
          fit
          height="100%"
          helper="revisitAgentVacation"
          max-height="100%"
          min-height="100px"
          paginate="true"
          title="لیست مرخصی مامورین بازدید"
          @selectedChange="handleGridSelectedChanged"
        />
      </div>

      <safa-popup
        v-model="addNewDialogState"
        height="300px"
        title="اضافه کردن مرخصی مامور بازدید"
        width="300px"
      >
        <form-wrapper>
          <URevisitAgentVacationNew ref="vacation" @input="handleAddNew"/>
          <template v-slot:footer>
            <div class="q-gutter-sm">
              <btn-default
                label="اضافه"
                @click="$refs.vacation.handleSubmit()"
              />
              <btn-default label="انصراف" @click="addNewDialogState = false"/>
            </div>
          </template>
        </form-wrapper>
      </safa-popup>
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="m"
        @cancel="load"
        @edit="m = 'e'"
        @save="handleSaveAction"
      >
        <template v-if="m === 'e'" #after>
          <btn-default
            key="btn-1"
            label="جدید"
            @click="addNewDialogState = true"
          ></btn-default>
          <btn-default label="حذف" @click="handleDelete"></btn-default>
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import vacationRequestModel from '../models/vacationRequest'
import URevisitAgentVacationNew from './URevisitAgentVacationNew'
import baseFormMixin from 'src/mixins/baseFormMixin'
import messageMixin from 'src/mixins/messageMixin'
import loaderMixin from 'src/mixins/loaderMixin'
import PersianDate from 'persian-date'

export default {
  name: 'URevisitAgentVacation',
  mixins: [messageMixin, loaderMixin, baseFormMixin],
  components: {
    URevisitAgentVacationNew
  },

  props: {
    title: String,
    formKey: String,
    name: String,
    district: {
      type: Number,
      required: true
    },
    revisitAgent: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  data () {
    return {
      m: 'r',
      result: null,
      selectedVacation: null,
      addNewDialogState: false,
      currentData: { ...vacationRequestModel }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.district
        }
      }
    },
    agentName () {
      if (!this.revisitAgent) {
        return 'تعیین نشده'
      }
      const { UserName, Name, LastName, Phone } = this.revisitAgent
      return `${UserName} - ${Name}  ${LastName} [${Phone}]`
    }
  },

  methods: {
    handleGridSelectedChanged (e) {
      const { NidRevisitAgentVacation } = e.dataItem || {}
      const list = this.currentData.Sh_RevisitAgentVacation || []
      this.selectedVacation = list.filter(
        (x) => NidRevisitAgentVacation === x['NidRevisitAgentVacation']
      )[0]
    },

    handleAddNew (vacation) {
      // console.log('vacation', vacation)
      vacation.NidRevisitAgent = this.currentData['_NidRevisitAgent']
      this.currentData.Sh_RevisitAgentVacation.push(vacation)
      this.addNewDialogState = false // Close popup
    },
    handleDelete () {
      if (!this.selectedVacation) {
        return this.showError('مرخصی انتخاب نشده است')
      }
      const currentDay = new PersianDate()
      const { NidRevisitAgentVacation, VacationDate } = this.selectedVacation

      const vacationDateArray = VacationDate.split('/')
      let yearTo = parseInt(vacationDateArray[0])
      let monthTo = parseInt(vacationDateArray[1])
      let dayTo = parseInt(vacationDateArray[2])

      let vacationDate = new PersianDate([yearTo, monthTo, dayTo])
      let diffCount = vacationDate.diff(currentDay, 'days')

      if (diffCount < 0) {
        return this.showError('تاریخ مرخصی گذشته , قادر به حذف آن نمی باشید.')
      }
      this.currentData.Sh_RevisitAgentVacation =
        this.currentData.Sh_RevisitAgentVacation.filter(
          (x) => NidRevisitAgentVacation !== x['NidRevisitAgentVacation']
        )
    },

    async handleSaveAction () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.saveRevisitAgentVacation(
          {
            pRevisitAgentVacation: this.currentData
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.showSuccess('عملیات ذخیره با موفقیت انجام گردید.')
          await this.log({
            action: this.logActions.save,
            bizCode: this.revisitAgent.NidRevisitAgent,
            bizCodeTitle: "NidRevisitAgent",
            saveDesc: `ذخیره تعطیلات کارشناس بازدید ${this.revisitAgent?.UserName ?? ''} انجام گردید.`
          })
          this.load()
          this.$emit('reloadAgentCalender')
        }

        // end
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.m = 'r'
      if (!this.revisitAgent || !this.revisitAgent.NidRevisitAgent) {
        this.showError('مامور بازدید اتخاب نشده است')
        return
      }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitAgentVacation(
          {
            pNidRevisitAgent: this.revisitAgent.NidRevisitAgent
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('تعطیلات بارگذاری نشد')
        }
        this.currentData = this.result.data

        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
      }
    }
  },

  mounted () {
    this.load()
  }
}
</script>
