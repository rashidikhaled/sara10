<template>
  <div class="q-mt-md">
    <div class="duty-session-details row q-col-gutter-md">
      <div
        v-for="(detail, i) in item.details"
        :key="i"
        class="col-12 col-sm-sm-6 col-md-4 col-lg-3"
      >
        <q-card
          :class="{ selected: detail.selected, 'bg-dark': $q.dark.isActive }"
          :style="{ backgroundColor: detail.selected ? '#eef4ff' : '#fff' }"
          bordered
          class="duty-session-item"
          flat
        >
          <q-card-section>
            <div class="text-body1 text-primary q-mb-xs">
              <safa-ci-label
                :value="detail.CI_DutyFormula"
                ci-name="CI_DutyFormula"
              />
            </div>
            <div class="q-mb-sm text-green" style="font-size: 13px">
              مبلغ: {{ detail.Price }}
            </div>
            <div class="flex wrap justify-between">
              <div class="col-12 col-md-6 q-mb-xs text-grey text-left">
                از تاریخ: {{ detail.FromDate }}
              </div>
              <div class="col-12 col-md-6 q-mb-xs text-grey text-left">
                تا تاریخ: {{ detail.ToDate }}
              </div>
            </div>
          </q-card-section>
          <q-separator/>

          <q-card-actions
            class="flex justify-between items-center q-py-none q-px-sm"
          >
            <div class="col-auto">
              <q-checkbox
                v-model="detail.selected"
                class="q-ma-none"
                label="انتخاب"
              />
            </div>
            <div class="col-auto">
              <q-btn color="grey" flat size="sm" @click="showDetails(detail)"
              >مشاهده جزئیات
              </q-btn
              >
            </div>
          </q-card-actions>
        </q-card>
      </div>
      <safa-popup
        v-model="showDetailsDialog"
        height="400px"
        title="جزئیات"
        width="800px"
      >
        <safa-grid
          v-model="detailsDialogLogs"
          helper="agDutyAllCalculationComments"
          fit
          paginate
          m="r"
        />
      </safa-popup>
      <!-- <q-dialog v-model="showDetailsDialog">
          <div class="bg-white" style="width: 800px; max-width: 80vw; height: 800px; max-height: 80vh;">
          <fit>
            <div class="bg-grey-2 q-pa-sm">
              <q-btn @click="showDetailsDialog=false" flat icon="close" label="بستن" size="sm"/>
            </div>
            <safa-datatable
              :selectable="false"
              fit
              height="100%"
              helper="dutyAllCalculationComments"
              m="r"
              max-height="100%"
              minHeight="100%"
              ref="grid2"
              v-model="detailsDialogLogs"
            ></safa-datatable>
          </fit>
        </div>
      </q-dialog> -->
    </div>
  </div>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import xmlConverter from 'xml-js'

export default {
  name: 'DutyAllCalculationSessionHeadersDetails',
  mixins: [baseFormMixin],
  props: {
    item: Object,
    detailsResult: Object,
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      showDetailsDialog: false,
      detailsDialogLogs: []
    }
  },
  mounted () {
    this.$emit('loadData', this.item)
  },
  methods: {
    // loadDetails () {
    //   if (!this.item.details) {
    //     this.item.loading = true

    //     const payload = {
    //       pNid: this.item.NidFK,
    //       pDutyYear: this.item.CI_DutyYear,
    //       pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value
    //     }

    //     this.$services.SB.getDutyCalculateDetails(payload, {config: {District: this.baseNosaziCode.District }})
    //       .then(async ({ data }) => {
    //         this.detailsResult = this.getResponse(data)

    //         if (this.detailsResult.success) {
    //           console.log('detailsResult', this.detailsResult)
    //           this.item.details = this.detailsResult.data.DutySessionDetails.map((x) => {
    //             return {
    //               ...x,
    //               selected: this.item.selected
    //             }
    //           })

    //           this.$emit('load', this.item)
    //           // console.log('*********************', this.nidSessionFromCalcDetails)
    //           const strNosaziCode = this.convertToNosaziCodeString(
    //             this.baseNosaziCode
    //           )

    //           await this.log({
    //             action: this.logActions.calculate,
    //             bizCode: strNosaziCode,
    //             bizCodeTitle: 'کد نوسازی'
    //           })
    //         }
    //       })
    //       .catch((err) => {
    //         this.serverError()
    //         console.error(err)
    //       })
    //       .finally(() => {
    //         this.item.loading = false
    //       })
    //       // this.$emit('load', { ...this.item, details: ['dsad', '32424', 'gfgdggg'] })
    //   }
    // },
    getFieldValue (obj, field) {
      if (!obj) return ''
      try {
        if (obj.hasOwnProperty(field)) return obj[field]?._text
      } catch (ex) {
        console.debug('getFieldValue', obj, field)
      }

      return ''
    },
    showDetails (detail) {
      this.detailsDialogLogs = []
      try {
        // console.log(detail.CalculateLog)
        const arrayOfClsLog = xmlConverter.xml2json(detail.CalculateLog, {
          compact: true
        })
        console.log('arrayOfClsLog', arrayOfClsLog)
        const clsLog = JSON.parse(arrayOfClsLog)
        console.log('clsLog', clsLog)
        const logObj = clsLog?.ArrayOfClsLog?.ClsLog
        if (logObj && Array.isArray(logObj)) {
          this.detailsDialogLogs = logObj.map((x) => {
            return {
              ...x,
              Subject: this.getFieldValue(x, 'Subject'),
              Value: this.getFieldValue(x, 'Value'),
              Comment: this.getFieldValue(x, 'Comment')
            }
          })
        } else if (typeof logObj === 'object') {
          const resultOfClsLog = {
            Subject: this.getFieldValue(logObj, 'Subject'),
            Value: this.getFieldValue(logObj, 'Value'),
            Comment: this.getFieldValue(logObj, 'Comment')
          }
          this.detailsDialogLogs.push(resultOfClsLog)
        }
        this.showDetailsDialog = true
      } catch (ex) {
        console.error(ex)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
