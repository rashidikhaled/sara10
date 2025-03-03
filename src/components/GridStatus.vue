<template>
  <td class="grid-status">
    <q-chip dense size="sm" style="min-width: 50px; text-align: center; justify-content: center;"
     :style="{ backgroundColor: statusInfo.bgColor, color: statusInfo.color }" >
        {{ statusInfo.title }}
      </q-chip>
    <!-- <div
      class="grid-status__context"
      :style="{ backgroundColor: statusInfo.bgColor, color: statusInfo.color }"
    >
      {{ statusInfo.title }}
    </div> -->
  </td>
</template>

<script>
export default {
  name: 'GridStatus',

  props: {
    field: String,
    dataItem: Object,
    format: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    rowType: String,
    level: Number,
    expanded: Boolean,
    editor: String,
    values: String
  },

  data () {
    return {}
  },

  computed: {
    statusInfo () {
      const status = {
        color: 'inherit',
        bgColor: 'inherit',
        title: ''
      }
      const styleGenerator = this['getStyleOf' + this.field]
      if (typeof styleGenerator === 'function') {
        return {
          ...status,
          ...styleGenerator()
        }
      }
      return status
    }
  },

  methods: {
    // getStyleOf' + this.field
    getStyleOfEditStatus () {
      const { IsFromFormul } = this.dataItem
      if (IsFromFormul) {
        return {
          color: '#000000', bgColor: '#D1112B', title: 'خواندنی'
        }
      } else {
        return {
          color: '#FFFFFF',
          bgColor: '#09b52e',
          title: 'قابل ویرایش'
        }
      }
    },
    getStyleOfFreeCpacityStatus () {
      const { IsRelease } = this.dataItem
      if (IsRelease) {
        return {
          color: '#FFFFFF', bgColor: '#09b52e', title: 'خروج از آزادسازی'
        }
      } else {
        return {
          color: '#FFFFFF',
          bgColor: '#09b52e',
          title: ' آزادسازی'
        }
      }
    },
    getStyleOfRevisitStatus () {
      const { Address } = this.dataItem
      if (Address !== '') {
        return {
          color: '#FFFFFF', bgColor: '#2FD111', title: 'بازدید فعال دارد'
        }
      } else {
        return {
          color: '#000000', bgColor: '#f0eeeb', title: 'بازدید فعال ندارد'
        }
      }
    },
    getStyleOfIsCancel () {
      const { IsCancel } = this.dataItem
      if (IsCancel) {
        return {
          color: '#000000', bgColor: '#D1112B', title: 'ابطال'
        }
      } else {
        return {
          color: '#232425',
          bgColor: '#FFFFFF',
          title: 'نامشخص'
        }
      }
    },
    getStyleOfIsActive () {
      const { IsActive } = this.dataItem
      if (IsActive === 1) {
        return {
          color: '#FFFFFF', bgColor: '#09b52e', title: 'فعال'
        }
      } else {
        return {
          color: '#000000', bgColor: '#EFD630', title: 'غیر فعال'
        }
      }
    },
    getStyleOfRequestStatusTitle () {
      const { RequestStatusTitle } = this.dataItem
      if (RequestStatusTitle === 'جاری') {
        return {
          color: '#FFFFFF', bgColor: '#343a40', title: 'جاری'
        }
      } else if (RequestStatusTitle === 'موقت') {
        return {
          color: '#000000', bgColor: '#EFD630', title: 'موقت'
        }
      } else if (RequestStatusTitle === 'دائم') {
        return {
          color: '#FFFFFF', bgColor: '#09b52e', title: 'دائم'
        }
      } else {
        return {
          color: '#fff', bgColor: '#ec3291', title: 'ابطال شده'

        }
      }
    },
    getStyleOfEumFormTypeForConfirmation () {
      const defs = {
        1: { color: '#000000', bgColor: '#EFD630', title: 'هیأت پارکینگ' },
        2: { color: '#000000', bgColor: '#2FD111', title: 'هیأت فنی' }
      }
      const { EumFormTypeForConfirmation } = this.dataItem
      return defs[EumFormTypeForConfirmation]
    },
    getStyleOfEumFicheStatus () {
      const defs = {
        0: { color: '#000000', bgColor: '#EFD630', title: 'صدور موقتی' },
        1: { color: '#000000', bgColor: '#F0F0F0', title: 'صدور قطعی' },
        2: { color: '#000000', bgColor: '#343a40', title: 'چاپ فیش' },
        3: { color: '#000000', bgColor: '#2FD111', title: 'تأیید' },
        4: { color: '#fff', bgColor: '#ec3291', title: 'ابطال' },
        7: { color: '#000000', bgColor: '#09b52e', title: 'تأیید انتقال' }
      }
      const { EumFicheStatus } = this.dataItem
      return defs[EumFicheStatus]
    },
    getStyleOfEumDutyFicheStatus () {
      const defs = {
        0: { color: '#FFFFFF', bgColor: '#09b52e', title: 'صدور دائم' },
        1: { color: '#FFFFFF', bgColor: '#2FD111', title: 'تایید' },
        2: { color: '#FFFFFF', bgColor: '#ec3291', title: 'باطل' },
        3: { color: '#232425', bgColor: '#FFFFFF', title: 'صدور موقت' },
        4: { color: '#FFFFFF', bgColor: '#343a40', title: 'تایید بانک' },
        5: { color: '#232425', bgColor: '#09b52e', title: 'استرداد' }
      }
      const { EumDutyFicheStatus } = this.dataItem
      return defs[EumDutyFicheStatus]
    },
    getStyleOfEumBlackListStatus () {
      const defs = {
        0: { color: '#000000', bgColor: '#ff3333', title: 'ورود به لیست سیاه' },
        1: { color: '#000000', bgColor: '#80ff80', title: 'خروج از لیست سیاه' }
      }
      const { EumBlackListStatus } = this.dataItem
      return defs[EumBlackListStatus]
    },
    getStyleOfCalcStatus () {
      const {
        CI_DutyYear: ciDutyYear,
        CI_DutyYear_Payoff: ciDutyYearPayoff,
        IsSure
      } = this.dataItem
      if (ciDutyYear <= ciDutyYearPayoff) {
        return {
          color: 'white',
          bgColor: '#21BA45',
          title: 'تسویه'
        }
      } else if (IsSure) {
        return {
          color: '#232425',
          bgColor: '#d2d2d7',
          title: 'قطعیت'
        }
      } else {
        return {
          color: 'white',
          bgColor: '#EFD630',
          title: 'عدم قطعیت'
        }
      }
    },
    getStyleOfEumProcStatus () {
      const defs = {
        0: { color: '#000000', bgColor: '#77db48', title: 'جاری' },
        1: { color: '#000000', bgColor: '#77db48', title: 'در جریان' },
        2: { color: '#000000', bgColor: '#77db48', title: 'منتظر' },
        3: { color: '#000000', bgColor: '#77db48', title: 'کامل شده' },
        4: { color: '#000000', bgColor: '#77db48', title: 'ابطال  شده' },
        5: { color: '#000000', bgColor: '#de096c', title: 'بایگانی موقت' }
      }
      const { EumProcStatus } = this.dataItem
      return defs[EumProcStatus]
    },
    getStyleOfEumRequestStatus () {
      const defs = {
        0: { color: '#000000', bgColor: '#77db48', title: 'جاری' },
        1: { color: '#000000', bgColor: '#de096c', title: 'موقت' },
        2: { color: '#FFFFFF', bgColor: '#09b52e', title: 'دائم' },
        3: { color: '#000000', bgColor: '#77db48', title: 'حذف شده ها' }
      }
      const { EumRequestStatus } = this.dataItem
      return defs[EumRequestStatus]
    }
  }
}
</script>
<style lang="scss">
.grid-status .q-chip__content{
  justify-content: center;

}
</style>
