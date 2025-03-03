<template>
  <fit>
    <safa-status :result="calcuateHistoryRes"/>
    <div
      v-if="dutySessionHistoryHeaders.length > 0"
      :class="$q.dark.isActive ? 'bg-lighten4' : 'bg-grey-2'"
      class="
        duty-calculation-wrapper
        q-py-sm
        rounded-borders
        overflow-hidden
        fit
      "
    >
      <div class="duty-calculation-list full-height overflow-auto">
        <q-intersection
          v-for="(item, i) in dutySessionHistoryHeaders"
          :key="i"
          :class="item.expanded ? ' expanded ' : ''"
          class="duty-c-item"
          once
          style="min-height: 56px"
          transition="slide-down"
        >
          <div class="duty-row">
            <div class="duty__expand q-ml-md">
              <q-btn
                :icon="item.expanded ? 'expand_less' : 'expand_more'"
                color="grey"
                flat
                round
                @click="item.expanded = !item.expanded"
              />
            </div>
            <div class="duty__check text-center" style="min-width: 50px">
              <q-spinner-ios v-if="item.loading" color="green" size="18px"/>
              <!-- <q-checkbox
                class="q-ma-none"
                v-else
                :value="item.selected"
                @input="selectItemDetails($event, item)"
              /> -->
            </div>
            <div class="duty__rownumber" style="min-width: 40px">
              <span v-if="item.details">{{ item.details.length }}</span>
            </div>
            <div class="duty-c-i-inner q-gutter-x-md">
              <div
                style="min-width: 180px; text-align: center"
                title="کدنوسازی"
              >
                <q-badge class="q-px-sm" color="primary" outline
                >کدنوسازی:
                  {{ item.NickNameNid.split('-').reverse().join('-') }}
                </q-badge
                >
              </div>

              <div
                style="min-width: 180px; text-align: center"
                title="سال محاسبه"
              >
                <q-badge color="primary" outline
                >سال محاسبه: {{ item.CI_DutyYear }}
                </q-badge
                >
              </div>
            </div>
          </div>
          <q-slide-transition>
            <DutyAllCalcHistoryDetails
              v-if="item.expanded"
              :base-nosazi-code="baseNosaziCode"
              :formKey="formKey"
              :item="item"
              :name="name"
              :title="title"
            />
            {{ item.expanded }}
          </q-slide-transition>
        </q-intersection>
      </div>
    </div>
    <div v-else class="q-pa-sm">
      <SafaNotice message="موردی یافت نشد." type="info"/>
    </div>
    <!-- <safa-datatable
      helper="dutyAllCalcHistory"
      v-model="dutySessionHistoryHeaders"
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      :bordered="false"
      title="تاریخچه محاسبات"
      cdcName="dutyAllCalcHistory"
    /> -->
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import DutyAllCalcHistoryDetails from './DutyAllCalcHistoryDetails'
import converter from 'xml-js'
import { ClsEnumEumDutyType } from 'src/forms/garbage/config/enums.js'

export default {
  name: 'DutyAllCalcHistory',
  mixins: [baseFormMixin],
  components: { DutyAllCalcHistoryDetails },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    baseNosaziCode: Object,
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      calcuateHistoryRes: null,
      getClsEnumEumDutyType: ClsEnumEumDutyType,
      dutySessionHistoryHeaders: []
    }
  },

  mounted () {
    this.calcuateHistory()
  },

  methods: {
    async calcuateHistory () {
      if (this.baseNosaziCode.District === 0) return
      try {
        this.showLoading()
        const { data } = await this.$services.SB.getDutyCalculateHistoryHeaders(
          { pNidList: this.value, pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.calcuateHistoryRes = this.getResponse(data)
        if (this.calcuateHistoryRes.success) {
          const list =
            this.calcuateHistoryRes.data.DutySessionHistoryHeaders || []
          if (list && list.length > 0) {
            this.dutySessionHistoryHeaders = list.map((x) => {
              return { ...x, expanded: false }
            })
          }
          await this.log({
            action: this.logActions.view,
            bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
            bizCodeTitle: 'کد نوسازی'
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    selectItemDetails (selected, item) {
      item.expanded = true
      item.selected = selected
      if (item.CalculateLog) {
        let arrayOfClsLog = converter.xml2json(item.CalculateLog, {
          compact: true,
          ignoreDoctype: true,
          ignoreCdata: true
        })
        const clsLog = JSON.parse(arrayOfClsLog)
        this.logDetail = clsLog.ArrayOfClsLog.ClsLog

        this.logDetail = this.logDetail.map((x) => {
          return {
            ...x,
            Subject: x.Subject._text,
            value: x.Value._text,
            Comment: x.Comment._text
          }
        })
      }
    },
    showHistoryDetail (item) {
      item.expanded = !item.expanded
    }
  },
  watch: {
    value () {
      this.calcuateHistory()
    }
  }
}
</script>
