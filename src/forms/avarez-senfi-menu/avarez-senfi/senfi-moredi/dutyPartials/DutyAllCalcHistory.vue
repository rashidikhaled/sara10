<template>
  <fit>
    <safa-status :result="calcuateHistoryResult" />
    <div :class="['duty-calculation-wrapper q-py-sm rounded-borders overflow-hidden fit', $q.dark.isActive?'bg-lighten4':'bg-grey-2']">
      <div class="duty-calculation-list full-height overflow-auto">
        <q-intersection
          :class="( item.expanded?' expanded ': '')"
          :key="i"
          class="duty-c-item"
          once
          style="min-height: 56px;"
          transition="slide-down"
          v-for="(item,i) in calcuateHistoryResults.DutySessionHistoryHeaders"
        >
          <div class="duty-row">
            <div class="duty__expand q-ml-md">
              <q-btn
                :icon="item.expanded ? 'expand_less':'expand_more'"
                @click="item.expanded=!item.expanded"
                color="grey"
                flat
                round
              />
            </div>
            <div
              class="duty__check text-center"
              style="min-width: 50px;"
            >
              <q-spinner-ios
                color="green"
                size="18px"
                v-if="item.loading"
              />
              <!-- <q-checkbox
                class="q-ma-none"
                v-else
                :value="item.selected"
                @input="selectItemDetails($event, item)"
              /> -->
            </div>
            <div
              class="duty__rownumber"
              style="min-width: 40px;"
            >
              <span v-if="item.details">{{item.details.length}}</span>
            </div>
            <div class="duty-c-i-inner q-gutter-x-md">
              <div
                style="min-width: 180px;text-align: center;"
                title="عنوان شغلی"
              >
                <q-badge
                  class="q-px-sm"
                  color="primary"
                  outline
                >عنوان شغلی: {{item.NickNameNid}}</q-badge>
              </div>

              <div
                style="min-width: 180px;text-align: center;"
                title="سال محاسبه"
              >
                <q-badge
                  color="primary"
                  outline
                >سال محاسبه: {{item.CI_DutyYear}}</q-badge>
              </div>

            </div>
          </div>
          <q-slide-transition>
            <DutyAllCalcHistoryDetails
              :base-nosazi-code="baseNosaziCode"
              :formKey="formKey"
              :item="item"
              :name="name"
              :title="title"
              @load="loadDetails"
              v-if="item.expanded"
            />
            {{item.expanded}}
          </q-slide-transition>
        </q-intersection>
      </div>
    </div>
    <!-- <safa-datatable
      helper="dutyAllCalcHistory"
      v-model="calcuateHistoryResults.DutySessionHistoryHeaders"
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
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import DutyAllCalcHistoryDetails from "./DutyAllCalcHistoryDetails"
import converter from 'xml-js'
export default {
  name: "DutyAllCalcHistory",
  mixins: [baseFormMixin],
  components: { DutyAllCalcHistoryDetails },
  data: function () {
    return {
      calcuateHistoryResults: {
        DutySessionHistoryHeaders: []
      },
      calcuateHistoryResult: null
    }
  },
  props: {
    results: Object,
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  mounted () {
    this.calcuateHistory()
  },

  methods: {
    showHistoryDetail (item) {
      item.expanded = !item.expanded
    },
    calcuateHistory () {
      this.showLoading()
      let data = {
        pNidList: this.results.NidJobList,
        pSysCiDutyType: 2
      }

      this.$services.SB.getDutyCalculateHistoryHeaders(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.calcuateHistoryResult = this.getResponse(data)

          if (this.calcuateHistoryResult.success) {
            // this.calcuateHistoryResults = this.calcuateHistoryResult.data;
            this.calcuateHistoryResults.DutySessionHistoryHeaders = this.calcuateHistoryResult.data.DutySessionHistoryHeaders.map(
              x => {
                return {
                  ...x,
                  expanded: false
                }
              }
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectItemDetails (selected, item) {
      item.expanded = true
      item.selected = selected
      if (item.CalculateLog) {
        let arrayOfClsLog = converter.xml2json(item.CalculateLog)
        const clsLog = JSON.parse(arrayOfClsLog)
        this.logDetail = clsLog.ArrayOfClsLog.ClsLog

        this.logDetail = this.logDetail.map(x => {
          return {
            ...x,
            Subject: x.Subject._text,
            value: x.Value._text,
            Comment: x.Comment._text
          }
        })
      }
    }
  }
}
</script>
