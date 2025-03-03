<template>
  <div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <safa-checkbox
        label="بازآوری پیش فرض تنظیمات"
        v-model="value.IsLoadDefaults"
        cdcName="IsLoadDefaults"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="باز شدن منوی multiple"
        v-model="value.IsExpandTypes"
        cdcName="IsExpandTypes"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="خواندن منطقه از ترسیم "
        v-model="value.IsReadRegionOnMaps"
        cdcName="IsReadRegionOnMaps"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="خواندن ناحیه از ترسیم"
        v-model="value.IsReadAreaOnMaps"
        cdcName="IsReadAreaOnMaps"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="گزارش صدور مجوز در پنجره"
        v-model="value.IsOpenExportReportOnWondows"
        cdcName="IsOpenExportReportOnWondows"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="چک کردن تاریخ صدور مجوز"
        v-model="value.CheckApprovalDates"
        cdcName="CheckApprovalDates"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="نمایش کد برروی نقشه"
        v-model="value.ShowCodeOnMaps"
        cdcName="ShowCodeOnMaps"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label=" چک کردن آدرس مسیر حفاری بلوار در ثبت درخواست اتفاقات"
        v-model="value.ISCheckEmptyBoulevardRequestEvent"
        cdcName="ISCheckEmptyBoulevardRequestEvent"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="خواندن اطلاعات نقشه در ثبت درخواست اتفاقات"
        v-model="value.ISReadInfoMapForRequestEvent"
        cdcName="ISReadInfoMapForRequestEvent"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="فعال شدن آیتم های ثبت درخواست اتفاقات در گردشکار"
        v-model="value.IsEnabledItemInRequestEvent"
        cdcName="IsEnabledItemInRequestEvent"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="عدم انتخاب شرکت خدماتی از فرم تنظیمات کاربر"
        v-model="value.NoSelectinCI_RequesterType"
        cdcName="NoSelectinCI_RequesterType"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="ابطال فیش های صادر شده در صورت صفر بودن مقدار محاسبه"
        v-model="value.CancelFichesInZeroCalc"
        cdcName="CancelFichesInZeroCalc"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="عدم صدور فیش هنگام محاسبه"
        v-model="value.NoFicheInCalc"
        cdcName="NoFicheInCalc"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="نمایش نوع تأیید پرداخت فیش بر اساس شرکت خدماتی"
        v-model="value.ConfirmWithRequesterType"
        cdcName="ConfirmWithRequesterType"
        :m="m"
        class="col-12"
      />
      <safa-checkbox
        label="ابطال فیش های قبلی هنگام صدور فیش بصورت دستی"
        v-model="value.CancelFicheManual"
        cdcName="CancelFicheManual"
        :m="m"
        class="col-12"
      />
    </div>
    <FormRow>
      <FormControl>
        <safa-combo
          label="سال پیش فرض"
          label-width="100px"
          :m="m"
          v-model="value.CI_Years"
          :sortFunc="sortCombo"
          cdcName="CI_Years"
          domainName="Dig"
          ciName="CI_Years"
        />
      </FormControl>
      <FormControl>
        <safa-timepicker
          label="زمان 1"
          label-width="100px"
          v-model="value.TimePicker1"
          cdcName="TimePicker1"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-timepicker
          label="زمان 2"
          label-width="100px"
          v-model="value.TimePicker2"
          cdcName="TimePicker2"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد روز استعلام"
          label-width="100px"
          v-model="value.InquiryDays"
          :maxlength="10"
          cdcName="InquiryDays"
          :m="m"
        >
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              color="primary"
              name="more_horiz"
              size="xs"
              style="position: relative; right: 5px"
              title="اجرا زمانبندی"
              @click="$emit('schedulerHandler')"
            />
          </template>
        </safa-text>
      </FormControl>
      <!-- <FormControl>
        <safa-text
          label="مقدار BufferDistance"
          label-width="100px"
          v-model="value.BufferDistance"
          cdcName="BufferDistance"
          :m="m"
        />
      </FormControl> -->
      <FormControl>
        <safa-datepicker
          label="تاریخ پرداخت توافقنامه"
          label-width="100px"
          v-model="value.PaymentDates"
          cdcName="PaymentDates"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ پرداخت توافقنامه"
          label-width="100px"
          v-model="value.PaymentCompanyDates"
          cdcName="PaymentCompanyDates"
          :m="m"
        />
      </FormControl>
      <text-template
        label="متن سازمان های شهرداری"
        label-width="100px"
        v-model="value.ShahrdariTexts"
        cdcName="ShahrdariTexts"
        :m="m"
        :rows="4"
      />
      <text-template
        label="متن تایید فیش توافقی"
        label-width="100px"
        v-model="value.MessageBargh"
        cdcName="MessageBargh"
        :m="m"
        :rows="4"
      />
      <text-template
        label="متن تعهد"
        label-width="100px"
        v-model="value.MessageObligation"
        cdcName="MessageObligation"
        :m="m"
        :rows="4"
      />
      <safa-text
        label="آدرس Url"
        label-width="100px"
        v-model="value.UrlObligation"
        cdcName="UrlObligation"
        :m="m"
        class="col-12 q-mb-sm"
      />
    </FormRow>
  </div>
</template>

<script>
export default {
  props: { value: Object, m: String },
  methods: {
    sortCombo (a, b) {
      return b.ID - a.ID
    }
  }
}
</script>
