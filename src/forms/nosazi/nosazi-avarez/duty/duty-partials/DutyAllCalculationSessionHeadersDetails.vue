<template>
  <div class="duty-calculation-details">
    <q-markup-table square bordered flat dense separator="cell">
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left"></th>
          <th class="text-left">فرمول</th>
          <th class="text-left">مبلغ</th>
          <th class="text-left">از تاریخ</th>
          <th class="text-left">تا تاریخ</th>
          <th>جزئیات بیشتر</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :style="{ color: detail.selected ? 'blue' : '' }"
          v-for="(detail, i) in item.details"
          :key="i"
        >
          <td class="text-left">
            <q-checkbox
              dense
              size="xs"
              v-model="detail.selected"
              class="q-ma-none"
            />
          </td>
          <td class="text-left">
            <q-btn
              :icon="detail.expanded ? 'indeterminate_check_box' : 'add_box'"
              color="grey-6"
              flat
              dense
              size="sm"
              round
              @click="detail.expanded = !detail.expanded"
            />
          </td>
          <td class="text-left" style="min-width: 200px">
            <safa-ci-label
              :value="detail.CI_DutyFormula"
              ci-name="CI_DutyFormula"
            />
          </td>
          <td style="min-width: 100px" class="text-left">
            {{ detail.Price }}
          </td>
          <td style="min-width: 100px" class="text-left">
            {{ detail.FromDate }}
          </td>
          <td style="min-width: 100px" class="text-left">
            {{ detail.ToDate }}
          </td>
          <td style="width: 100%" class="q-pa-none">
            <div
              v-if="detail.logDetails && detail.expanded"
              class="duty_calculation_details_grid"
            >
              <q-spinner-ios size="sm" v-if="detail.logDetailsLoading" />
              <div class="overflow-auto">
                <q-markup-table
                  bordered
                  square
                  flat
                  dense
                  style="max-height: 240px; table-layout: fixed"
                  class="duty_calculation_master_details"
                >
                  <thead>
                    <tr>
                      <th
                        :key="col.field"
                        v-for="col in detailsGridColumns"
                        :style="{ width: col.width }"
                      >
                        {{ col.title }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, i) in detail.logDetails" :key="`row_${i}`">
                      <td
                        :key="`td_${col.field}`"
                        v-for="col in detailsGridColumns"
                        :style="{ width: col.width }"
                      >
                        {{ row[col.field] }}
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import xmlConverter from "xml-js"

export default {
  name: "DutyAllCalculationSessionHeadersDetails",
  mixins: [baseFormMixin],
  props: {
    item: Object,
    detailsResult: Object,
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
  data () {
    return {
      showDetailsDialog: false,
      detailsDialogLogs: [],
      isLoaded: false,
      detailsGridColumns: [
        {
          field: "Subject",
          title: "عنوان",
          width: "200px"
        },
        {
          field: "Value",
          title: "مقدار",
          width: "150px"
        },
        {
          field: "Comment",
          title: "توضیحات",
          width: "100%"
        }
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.loadItemDetails()
      this.$emit("loadData", this.item)
    }, 100)
  },
  methods: {
    loadItemDetails () {
      if (!this.item || !this.item.details) return

      this.item.details.forEach((detail) => {
        try {
          // console.log(detail.CalculateLog)
          detail.logDetails = []
          detail.logDetailsLoading = true
          const arrayOfClsLog = xmlConverter.xml2json(detail.CalculateLog, {
            compact: true
          })
          console.log("arrayOfClsLog", arrayOfClsLog)
          const clsLog = JSON.parse(arrayOfClsLog)
          console.log("clsLog", clsLog)
          const logObj = clsLog?.ArrayOfClsLog?.ClsLog
          if (logObj && Array.isArray(logObj)) {
            detail.logDetails = logObj.map((x) => {
              return {
                ...x,
                Subject: this.getFieldValue(x, "Subject"),
                Value: this.getFieldValue(x, "Value"),
                Comment: this.getFieldValue(x, "Comment")
              }
            })
          } else if (typeof logObj === "object") {
            const resultOfClsLog = {
              Subject: this.getFieldValue(logObj, "Subject"),
              Value: this.getFieldValue(logObj, "Value"),
              Comment: this.getFieldValue(logObj, "Comment")
            }
            detail.logDetails.push(resultOfClsLog)
          }
        } catch (ex) {
          debugger
          console.error(ex)
        } finally {
          detail.logDetailsLoading = false
        }
      })
    },
    getFieldValue (obj, field) {
      if (!obj) return ""
      try {
        if (obj.hasOwnProperty(field)) return obj[field]?._text
      } catch (ex) {
        console.debug("getFieldValue", obj, field)
      }

      return ""
    }
    /* showDetails (detail) {
      this.detailsDialogLogs = []
      try {
        // console.log(detail.CalculateLog)
        const arrayOfClsLog = xmlConverter.xml2json(detail.CalculateLog, {
          compact: true
        })
        console.log("arrayOfClsLog", arrayOfClsLog)
        const clsLog = JSON.parse(arrayOfClsLog)
        console.log("clsLog", clsLog)
        const logObj = clsLog?.ArrayOfClsLog?.ClsLog
        if (logObj && Array.isArray(logObj)) {
          this.detailsDialogLogs = logObj.map((x) => {
            return {
              ...x,
              Subject: this.getFieldValue(x, "Subject"),
              Value: this.getFieldValue(x, "Value"),
              Comment: this.getFieldValue(x, "Comment")
            }
          })
        } else if (typeof logObj === "object") {
          const resultOfClsLog = {
            Subject: this.getFieldValue(logObj, "Subject"),
            Value: this.getFieldValue(logObj, "Value"),
            Comment: this.getFieldValue(logObj, "Comment")
          }
          this.detailsDialogLogs.push(resultOfClsLog)
        }
        this.showDetailsDialog = true
      } catch (ex) {
        console.error(ex)
      }
    } */
  }
}
</script>

<style lang="scss"></style>
