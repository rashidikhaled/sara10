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
          v-for="(detail, i) in details"
          :key="i"
        >
          <td class="text-left">
            <q-checkbox
              dense
              size="xs"
              :value="detail.selected"
              @input="toggleSelected(i)"
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
              @click="toggleExpanded(i)"
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
            <div v-if="detail.expanded" class="duty_calculation_details_grid">
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
                        :style="{ minWidth: col.width }"
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
                        :style="{ minWidth: col.width }"
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
export default {
  name: "DutyAllCalculationSessionHeadersDetails",
  props: {
    details: Array
  },
  data () {
    return {
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
          width: "none"
        }
      ]
    }
  },
  computed: {},
  methods: {
    async toggleExpanded (index) {
      const item = this.details[index]
      item.expanded = !item.expanded
      this.$set(this.details, index, item)
      this.$emit('update:selected', this.details)
      this.$forceUpdate()
    },
    async toggleSelected (index) {
      const item = this.details[index]
      item.selected = !item.selected
      this.$set(this.details, index, item)
      this.$emit('update:expanded', this.details)
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss"></style>
