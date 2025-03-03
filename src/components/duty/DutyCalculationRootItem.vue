<template>
  <div :class="rootClass">
    <div class="duty-row">
      <div style="min-width: 24px" class="text-center">
        {{ index + 1 }}
      </div>
      <div class="duty__check text-center" style="min-width: 30px">
        <q-checkbox
          dense
          size="sm"
          :value="selected"
          @input="$emit('setSelectItem', $event)"
          class="q-ma-none"
        />
      </div>
      <div style="min-width: 24px; text-align: center; padding-top: 2px">
        <span class="flex items-center" dir="ltr" v-if="itemChildren"
          ><small style="color: #2e51ff; font-weight: bold">{{
            itemSelectedChildren.length
          }}</small
          ><small>/</small><small>{{ itemChildrenCount }}</small></span
        >
        <span v-else>...</span>
      </div>
      <div class="duty__expand text-center" style="min-width: 34px">
        <q-spinner-ios v-if="item.loading" color="primary" size="xs" />
        <q-btn
          :icon="item.expanded ? 'indeterminate_check_box' : 'add_box'"
          color="grey-6"
          flat
          v-else
          dense
          size="sm"
          round
          @click="toggleExpanded"
        />
      </div>
      <div class="duty-c-i-inner q-gutter-x-sm">
        <div class="duty-bizcode" title="کدنوسازی">
          <span class="text-no-wrap">
            {{ nosaziCode }}
          </span>
          <!--                  <q-badge class="q-px-sm" color="primary" outline>
                              {{ getNosaziCode(item) }}
                            </q-badge>-->
        </div>
        <div class="duty-datetime-wrap q-px-sm text-center">
          <span>{{ item.DateCalc }}</span>
          <span>{{ item.TimeCalc }}</span>
        </div>
        <!--                <div class="duty-datetime text-dark">
                          <p
                            class="q-mb-none"
                            style="font-size: 11px; font-weight: Bold"
                          >
                            <q-icon name="event" size="14px" />
                            تاریخ محاسبه:&nbsp;{{ item.DateCalc }}
                          </p>
                        </div>
                        <div class="duty-datetime text-dark">
                          <p
                            class="q-mb-none"
                            style="font-size: 11px; font-weight: Bold"
                          >
                            <q-icon name="schedule" size="14px" />
                            زمان محاسبه:&nbsp;{{ item.TimeCalc }}
                          </p>
                        </div>-->
        <div class="duty-year-wrap" title="سال محاسبه">
          <q-badge color="primary" outline>{{ item.CI_DutyYear }}</q-badge>
          <!--                  <q-badge :class="$q.dark.isActive ? 'bg-darken2' : 'bg-grey'">
                              {{ item.CI_DutyYear }}
                            </q-badge>-->
        </div>
        <div class="duty-price-wrap" title="قیمت">
          <span>{{ priceFormatting }}</span>
        </div>
        <div class="duty-status">
          <q-badge>{{ statusText }}</q-badge>
        </div>
        <div class="ellipsis duty-user-wrap" :title="item.UserName">
          <q-icon name="person" size="xs" />
          {{ item.UserName }}
        </div>
        <div class="ellipsis duty-info-group">
          <span> دسته اطلاعات:&nbsp;{{ item.groupName }} </span>
        </div>
        <div class="duty-workitem" title="شماره بازدید">
          شماره بازدید:&nbsp;{{ item.NidWorkItem }}
        </div>
      </div>
    </div>
    <q-separator />
    <q-slide-transition>
      <DutyCalculationItemDetails
        v-if="item.expanded && item.childrenLoaded"
        :district="district"
        :details="item.details"
        @update:selected="updateDetails"
        @update:expanded="updateDetails"
      />
    </q-slide-transition>
  </div>
</template>
<script>
import DutyCalculationItemDetails from "./DutyCalculationItemDetails.vue"

export default {
  name: "DutyCalculationRootItem",
  components: {
    DutyCalculationItemDetails
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    index: Number,
    district: Number
  },
  computed: {
    item () {
      return this.list[this.index]
    },
    /*  item: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit("input", val)
        this.$forceUpdate()
      }
    }, */
    statusValue () {
      if (!this.item) return null
      if (this.item.CI_DutyYear <= this.item.CI_DutyYear_Payoff) {
        return 0
      } else if (this.item.IsSure) {
        return 1
      }
      return -1
    },
    statusText () {
      const val = this.statusValue
      if (val === 0) return "تسویه"
      if (val === 1) return "قطعیت"
      if (val === -1) return "عدم قطعیت"

      return "نامشخص"
    },
    rootClass () {
      const selectedClass =
        this.item.selected || this.item?.details.some((x) => x.selected)
          ? " selected"
          : ""
      const expanedClass = this.item.expanded ? " expanded" : ""
      return `duty-c-item duty-status-${this.statusValue}${selectedClass}${expanedClass} row-num-${this.rowNum}`
    },
    nosaziCode () {
      return (
        (this.item.NickNameNid && this.item.NickNameNid.split("-").join("-")) ||
        ""
      )
    },
    priceFormatting () {
      return this.item.Price.toLocaleString("fa-IR")
    },
    itemChildren () {
      return this.item?.details ?? []
    },
    itemChildrenCount () {
      return this.item?.details.length
    },
    itemSelectedChildren () {
      return this.item?.details.filter((s) => s.selected)
    },
    selected () {
      return this.item.selected
    }
  },
  methods: {
    toggleExpanded () {
      this.$emit("toggle:expanded")
    },
    updateDetails (details) {
      const item = this.list[this.index]
      item.details = details
      item.selected = details.length > 0 && details.every((s) => s.selected)
      this.$set(this.list, this.index, item)
      this.$emit("update:item", item)
      this.$forceUpdate()
    }
  }
}
</script>
