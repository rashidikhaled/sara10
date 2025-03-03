<template>
  <fit>
    <FormRow :lg="1" :md="1" :sm="1" :xl="1" class="q-mb-sm">
      <FormControl>
        <safa-text
          v-model="value.startYear"
          :m="m"
          cdcName="startYear"
          label="سال شروع محاسبه"
          label-width="125px"
          :maxlength="4"

        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.leastPrice"
          :m="m"
          cdcName="leastPrice"
          label="حداقل قیمت"
          label-width="125px"
          type="money"
          :maxlength="30"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.isBreakInDay"
          :m="m"
          cdcName="isBreakInDay"
          label="مهلت پرداخت به صورت تعداد روز"
        ></safa-checkbox>
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.breakDay"
          :m="breakDayMode"
          cdcName="breakDay"
          label="تعداد روز"
          label-width="125px"
          :maxlength="10"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="value.breakDate"
          :m="breakDateMode"
          cdcName="breakDate"
          display-format="dddd jDD jMMMM jYYYY"
          format="jYYYY/jMM/jDD"
          label="مهلت پرداخت"
          label-width="125px"
          locale="fa"
          placeholder="مهلت پرداخت"
        >
        </safa-datepicker>
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.doFinal"
          :m="m"
          cdcName="DoFinal"
          label="قطعیت در هنگام محاسبات"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.isCanceldFiches"
          :m="m"
          cdcName="isCanceldFiches"
          label="ابطال فیش ها هنگام صدور فیش"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.setPayOffForConfirmYearly"
          :m="m"
          cdcName="setPayOffForConfirmYearly"
          label="تنظیم سال تسویه در تایید فیش سالیانه"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.setPayOffForConfirmCollective"
          :m="m"
          cdcName="setPayOffForConfirmCollective"
          label="تنظیم سال تسویه در تایید فیش جمعی"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.setPayOffForConfirmTaghsit"
          :m="m"
          cdcName="setPayOffForConfirmTaghsit"
          label="تنظیم سال تسویه در تایید فیش تقسط"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.isCanceldFichesInConfirm"
          :m="m"
          cdcName="isCanceldFichesInConfirm"
          label="ابطال فیش های هنگام تایید فیش"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.includeShop"
          :m="m"
          cdcName="includeShop"
          label="صنفی در نوسازی"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.includeHouse"
          :m="m"
          cdcName="includeHouse"
          label="ملک در نوسازی"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.toCurrentObject"
          :m="m"
          cdcName="toCurrentObject"
          label="محاسبه بر اساس کد وارد شده"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.exportFicheOnHouse"
          :m="m"
          cdcName="exportFicheOnHouse"
          label="صدور فیش روی ملک"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.groupType"
          :m="m"
          :options="infoGroupOptions"
          cdcName="groupType"
          label="دسته اطلاعاتی پیش فرض"
          label-width="125px"
          source-type="local"
          @input="groupTypeSelectionChanged"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          v-model="value.isShowAccountingSystemError"
          :m="m"
          cdcName="isShowAccountingSystemError"
          label="نمایش خطای سیستم مالی"
        />
      </FormControl>

      <FormControl>
        <safa-checkbox
          v-model="value.isCancelBankConfirmFiches"
          :m="m"
          cdcName="isCancelBankConfirmFiches"
          label="ابطال فیش های تایید شده بانک"
        />
      </FormControl>

      <FormControl>
        <safa-checkbox
          v-model="value.isShowRevisitByLastRevisitDate"
          :m="m"
          cdcName="isShowRevisitByLastRevisitDate"
          label="بازدید بر اساس آخرین تاریخ"
        />
      </FormControl>
    </FormRow>
  </fit>
</template>

<script>
export default {
  name: 'UAvarezSettings',

  props: {
    value: Object,
    isEditable: Boolean,
    m: String
  },

  data () {
    return {
      name: 'UAvarezSettings',
      title: 'تنظیمات عوارض'
    }
  },

  methods: {
    groupTypeSelectionChanged () {
    }
  },

  computed: {
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').isShowBaseInfoGroupCombo
    },

    infoGroupOptions () {
      const infoGroupOptions = [
        {
          ID: 0,
          Title: 'هیچکدام'
        },
        {
          ID: 1,
          Title: 'اطلاعات پرونده'
        },
        {
          ID: 2,
          Title: 'بازدید'
        },
        {
          ID: 3,
          Title: 'مجاز پایانکار'
        }
      ]

      if (this.isShowBaseInfoGroupCombo) {
        infoGroupOptions.push({
          ID: 100,
          Title: 'نوسازی'
        })
      }

      return infoGroupOptions
    },

    breakDayMode () {
      if (this.isEditable) {
        return this.value.isBreakInDay ? 'r' : 'e'
      } else {
        return 'r'
      }
    },

    breakDateMode () {
      if (this.isEditable) {
        return this.value.isBreakInDay ? 'e' : 'r'
      } else {
        return 'r'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.splitter
  color green
</style>
