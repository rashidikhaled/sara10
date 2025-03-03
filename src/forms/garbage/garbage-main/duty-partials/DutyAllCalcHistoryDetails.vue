<template>
  <div class="q-mt-md">
    <div class="duty-session-details row q-col-gutter-md">
      <div
        v-for="(
          detail, i
        ) in calcuateHistoryResults.DutySessionHistoryDetailsByYear"
        :key="i"
        class="col-12 col-sm-sm-6 col-md-4 col-lg-3"
      >
        <q-card
          :style="{ backgroundColor: detail.selected ? '#eef4ff' : '#fff' }"
          bordered
          class="duty-session-item"
          flat
        >
          <q-card-section>
            <div class="flex wrap justify-between">
              <div class="col-12 col-md-6 q-mb-xs text-grey text-left">
                تاریخ محاسبه: {{ detail.DateCalc }}
              </div>
              <div class="col-12 col-md-6 q-mb-xs text-grey text-left">
                زمان محاسبه: {{ detail.TimeCalc }}
              </div>
            </div>
          </q-card-section>
          <q-separator/>

          <q-card-actions
            class="flex justify-between items-center q-py-none q-px-sm"
          >
            <div class="col-auto">
              <q-btn color="grey" flat size="sm" @click="showDetailList(detail)"
              >مشاهده جزئیات
              </q-btn
              >
            </div>
          </q-card-actions>
        </q-card>
      </div>
      <safa-popup v-model="showDetailsDialog" title="جزئیات">
        <DutyAllCalcDetails :model="list"/>
      </safa-popup>
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import DutyAllCalcDetails from './DutyAllCalcDetails'
import converter from 'xml-js'
import { ClsEnumEumDutyType } from 'src/forms/garbage/config/enums.js'

export default {
  name: 'DutyAllCalculationSessionHeadersDetails',
  mixins: [baseFormMixin],
  components: { DutyAllCalcDetails },
  props: {
    item: Object,
    baseNosaziCode: Object,
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      calcuateHistoryResults: {
        DutySessionHistoryDetailsByYear: []
      },
      detailHistoryResults: { DutySessionHistoryDetails: [] },
      historyDetailResult: null,
      historyResult: null,
      showDetailsDialog: false,
      getClsEnumEumDutyType: ClsEnumEumDutyType,
      columns: [
        {
          field: 'CI_DutyFormula',
          title: 'فرمول',
          editor: 'combo',
          domain: 'CI_SaraM1'
        },
        {
          field: 'Price',
          title: 'مبلغ'
        },
        {
          field: 'DateCalc',
          title: 'تاریخ محاسبه'
        },
        {
          field: 'TimeCalc',
          title: 'زمان محاسبه'
        },
        {
          field: 'UserName',
          title: 'کاربر'
        },
        {
          field: 'CI_DutyPayoffCause',
          title: 'وضعیت',
          editor: 'combo',
          domain: 'CI_SaraM1'
        },
        {
          field: 'EumDutyInfoGroup',
          title: 'دسته اطلاعاتی',
          editor: 'combo',
          source: [
            { ID: 0, Title: 'تشکیل پرونده' },
            { ID: 1, Title: 'بازدید' },
            { ID: 2, Title: 'مجاز پروانه' },
            { ID: 3, Title: 'مجاز پایانکار' },
            { ID: 4, Title: 'آخرین بروکف' },
            { ID: 6, Title: 'اطلاعات مالک' },
            { ID: 100, Title: 'نوسازی اصفهان' },
            { ID: 200, Title: 'ممیزی' }
          ]
        },
        {
          field: '',
          title: 'شماره بازدید'
        }
      ],
      list: []
    }
  },
  mounted () {
    this.getDutyCalculateHistoryDetailsByYaer()
  },

  methods: {
    getDutyCalculateHistoryDetailsByYaer () {
      this.showLoading()
      let data = {
        pNid: this.item.NidFK,
        pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value,
        pDutyYear: this.item.CI_DutyYear
      }
      this.$services.SB.getDutyCalculateHistoryDetailsByYaer(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(({ data }) => {
          this.historyResult = this.getResponse(data)

          if (this.historyResult.success) {
            this.calcuateHistoryResults = this.historyResult.data
          }
        })
        .catch(err => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDutyCalculateHistoryDetails (item) {
      this.showLoading()
      let data = {
        pNid: item.NidFK,
        pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value,
        pDutyYear: item.CI_DutyYear,
        pNidSessionGroup: item.NidSessionGroup
      }
      this.$services.SB.getDutyCalculateHistoryDetails(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(({ data }) => {
          this.historyDetailResult = this.getResponse(data)

          if (this.historyResult.success) {
            this.detailHistoryResults = this.historyDetailResult.data
            if (
              this.detailHistoryResults.DutySessionHistoryDetails.length > 0
            ) {
              this.list =
                this.detailHistoryResults.DutySessionHistoryDetails.map((x) => {
                  let arrayOfClsLog = converter.xml2json(x.CalculateLog, {
                    compact: true,
                    ignoreDoctype: true,
                    ignoreCdata: true
                  })
                  const clsLog = JSON.parse(arrayOfClsLog)
                  let logDetail = []
                  logDetail = clsLog.ArrayOfClsLog.ClsLog
                  if (
                    typeof logDetail === 'object' &&
                    logDetail.length === undefined
                  ) {
                    logDetail = [logDetail]
                  }
                  if (clsLog.ArrayOfClsLog.ClsLog) {
                    logDetail = logDetail.map(x => {
                      return {
                        ...x,
                        Subject: x.Subject._text || '',
                        Value: x.Value._text || '',
                        Comment: x.Comment._text || ''
                      }
                    })
                  }
                  return { ...x, expanded: false, logDetail: logDetail }
                })
            }
          }
        })
        .catch(err => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    showDetailList (detail) {
      this.showDetailsDialog = true
      this.getDutyCalculateHistoryDetails(detail)
    }
  }
}
</script>
