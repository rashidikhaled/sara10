<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-text
          label="ارزش ملک(ریال)"
          label-width="110px"
          v-model="value.TotalPrice"
          cdcName="TotalPrice"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ قیمت گذاری"
          label-width="110px"
          v-model="value.EvaluationDate"
          cdcName="EvaluationDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام طرح"
          label-width="110px"
          v-model="value.PlanName"
          cdcName="PlanName"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام موقوفه"
          label-width="110px"
          v-model="value.EndowmentName"
          cdcName="EndowmentName"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کلاسه پرونده"
          label-width="110px"
          v-model="value.ClassNo"
          cdcName="ClassNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت پروانه/پایانکار"
          ciName="CI_CertificateStatus"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_CertificateStatus"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره صورتمجلس تحویل"
          label-width="110px"
          v-model="value.TransferNo"
          cdcName="TransferNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ صورتمجلس تحویل"
          label-width="110px"
          v-model="value.TransferDate"
          cdcName="TransferDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک ثبتی فرعی"
          label-width="110px"
          v-model="value.RegisterPlackSub"
          cdcName="RegisterPlackSub"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک ثبتی اصلی"
          label-width="110px"
          v-model="value.RegisterPlackMain"
          cdcName="RegisterPlackMain"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک ثبتی بخش"
          label-width="110px"
          v-model="value.RegisterPlackSection"
          cdcName="RegisterPlackSection"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره سند عرصه"
          label-width="110px"
          v-model="value.DocNo"
          cdcName="DocNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره سند اعیان"
          label-width="110px"
          v-model="value.DocNoAyan"
          cdcName="DocNoAyan"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="سال انتقال سند (شهرداری) "
          label-width="110px"
          v-model="value.TransferYear"
          cdcName="TransferYear"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره دفترخانه"
          label-width="110px"
          v-model="value.BureauLetterNo"
          cdcName="BureauLetterNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="چگونگی سند"
          ciName="CI_DocStatus2"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_DocStatus2"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="بارکد"
          label-width="110px"
          v-model="value.Barcode"
          cdcName="Barcode"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="سند تحویل به"
          label-width="110px"
          v-model="value.TransferDocName"
          cdcName="TransferDocName"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نماینده تحویل سند"
          label-width="110px"
          v-model="value.TransferDocAgentName"
          cdcName="TransferDocAgentName"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نامه تحویل"
          label-width="110px"
          v-model="value.TransferLetterNo"
          cdcName="TransferLetterNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ تحویل سند"
          label-width="110px"
          v-model="value.TransferDocDate"
          cdcName="TransferDocDate"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-my-sm">
      <FormControl class="flex items-center">
        <safa-checkbox
          label="سند در بایگانی املاک"
          label-width="110px"
          v-model="value.IsDocArchiveEstate"
          cdcName="IsDocArchiveEstate"
          :m="m"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          label="سند در گاوصندوق"
          label-width="110px"
          v-model="value.IsDocSafe"
          cdcName="IsDocSafe"
          :m="m"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          label="سند در مخزن شهرداری"
          label-width="110px"
          v-model="value.IsDocMunicipality"
          cdcName="IsDocMunicipality"
          :m="m"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          label="ملک تجمیع شد"
          label-width="110px"
          v-model="value.IsUnion"
          cdcName="IsUnion"
          :m="m"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          label="ملک تفکیک شد"
          label-width="110px"
          v-model="value.IsSeparation"
          cdcName="IsSeparation"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <internal-section title="واگذاری">
      <FormRow>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="ملک قابل واگذاری می باشد"
            label-width="110px"
            v-model="value.IsAssignable"
            cdcName="IsAssignable"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نحوه واگذاری"
            ciName="CI_CessionKind"
            domainName="Estate"
            label-width="110px"
            v-model="value.CI_CessionKind"
            cdcName="CI_CessionKind"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره نامه"
            label-width="110px"
            v-model="value.LetterNo"
            cdcName="LetterNo"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ نامه "
            label-width="110px"
            v-model="value.LetterDate"
            cdcName="LetterDate"
            :m="m"
          />
        </FormControl>
        <text-template
          label="موضوع نامه"
          label-width="110px"
          ID="3B9A44AD-260F-45F4-80BB-99801FC59CEE"
          v-model="value.LetterSubject"
          cdcName="LetterSubject"
          :rows="1"
          :m="m"
          class="col-12"
        />
      </FormRow>
    </internal-section>
    <internal-section title="نوع">
      <FormRow>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="تک برگی"
            label-width="110px"
            v-model="value.DocType1"
            cdcName="DocType1"
            :m="m"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="اجاره خط آستان قدس رضوی"
            label-width="110px"
            v-model="value.DocType2"
            cdcName="DocType2"
            :m="m"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="سند بنچاق/صلح"
            label-width="110px"
            v-model="value.DocType3"
            cdcName="DocType3"
            :m="m"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="سند سرقفلی"
            label-width="110px"
            v-model="value.DocType4"
            cdcName="DocType4"
            :m="m"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="قرارداد واگذاری راه و شهرسازی"
            label-width="110px"
            v-model="value.DocType5"
            cdcName="DocType5"
            :m="m"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="وکالت نامه"
            label-width="110px"
            v-model="value.DocType6"
            cdcName="DocType6"
            :m="m"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="دفترچه ای"
            label-width="110px"
            v-model="value.DocType7"
            cdcName="DocType7"
            :m="m"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="اجاره خط اوقاف و موقوفات"
            label-width="110px"
            v-model="value.DocType8"
            cdcName="DocType8"
            :m="m"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="اقرارنامه/تعهدنامه محضری"
            label-width="110px"
            v-model="value.DocType9"
            cdcName="DocType9"
            :m="m"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-checkbox
            label="سایر"
            label-width="110px"
            v-model="value.DocType10"
            cdcName="DocType10"
            :m="m"
          />
        </FormControl>
        <text-template
          label="توضیحات نوع سند"
          v-model="value.DocTypeDesc"
          cdcName="DocTypeDesc"
          :rows="1"
          :m="m"
          label-width="110px"
          class="col-12"
        />
      </FormRow>
    </internal-section>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {}
  }
}
</script>
s
