<template>
  <fit>
    <form-row>
      <form-control>
        <safa-text
          label="ارزش ملک(ریال)"
          label-width="100px"
          v-model="value.TotalPrice"
          cdcName="TotalPrice"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ قیمت گذاری از:"
          label-width="100px"
          v-model="value.EvaluationDateFrom"
          cdcName="EvaluationDate"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تا:"
          label-width="100px"
          v-model="value.EvaluationDateTo"
          cdcName="EvaluationDateTo"
        />
      </form-control>
      <form-control>
        <safa-text
          label="نام طرح"
          label-width="100px"
          v-model="value.PlanName"
          cdcName="PlanName"
        />
      </form-control>
      <form-control>
        <safa-text
          label="نام موقوفه"
          label-width="100px"
          v-model="value.EndowmentName"
          cdcName="EndowmentName"
        />
      </form-control>
      <form-control>
        <safa-text
          label="کلاسه پرونده"
          label-width="100px"
          v-model="value.ClassNo"
          cdcName="ClassNo"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="وضعیت پروانه/پایانکار"
          ciName="CI_CertificateStatus"
          domainName="Estate"
          label-width="100px"
          v-model="value.CI_CertificateStatus"
        />
      </form-control>
      <form-control>
        <safa-text
          label="شماره صورتمجلس تحویل"
          label-width="100px"
          v-model="value.TransferNo"
          cdcName="TransferNo"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ صورتمجلس تحویل از:"
          label-width="100px"
          v-model="value.TransferDateFrom"
          cdcName="TransferDateFrom"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تا:"
          label-width="100px"
          v-model="value.TransferDateTo"
          cdcName="TransferDateTo"
        />
      </form-control>

      <safa-checkbox
        label="ملک تجمیع شد"
        label-width="100px"
        v-model="value.IsUnion"
        cdcName="IsUnion"
      />

      <safa-checkbox
        label="ملک تفکیک شد"
        label-width="100px"
        v-model="value.IsSeparation"
        cdcName="IsSeparation"
      />
    </form-row>
    <internal-section title="پلاک ثبتی">
      <form-row class="q-mt-sm">
        <form-control>
          <safa-text
            label="پلاک ثبتی فرعی"
            label-width="100px"
            v-model="value.RegisterPlackSub"
            cdcName="RegisterPlackSub"
          />
        </form-control>
        <form-control>
          <safa-text
            label="پلاک ثبتی اصلی"
            label-width="100px"
            v-model="value.RegisterPlackMain"
            cdcName="RegisterPlackMain"
          />
        </form-control>
        <form-control>
          <safa-text
            label="پلاک ثبتی بخش"
            label-width="100px"
            v-model="value.RegisterPlackSection"
            cdcName="RegisterPlackSection"
          />
        </form-control>
      </form-row>
    </internal-section>
    <internal-section title="شماره">
      <form-row class="q-mt-sm">
        <form-control>
          <safa-text
            label="شماره سند عرصه"
            label-width="100px"
            v-model="value.DocNo"
            cdcName="DocNo"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره سند اعیان"
            label-width="100px"
            v-model="value.DocNoAyan"
            cdcName="DocNoAyan"
          />
        </form-control>
        <form-control>
          <safa-text
            label="سال انتقال سند (شهرداری) "
            label-width="100px"
            v-model="value.TransferYear"
            cdcName="TransferYear"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره دفترخانه"
            label-width="100px"
            v-model="value.BureauLetterNo"
            cdcName="BureauLetterNo"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="چگونگی سند"
            ciName="CI_DocStatus2"
            domainName="Estate"
            label-width="100px"
            v-model="value.CI_DocStatus2"
          />
        </form-control>
        <form-control>
          <safa-text
            label="بارکد"
            label-width="100px"
            v-model="value.Barcode"
            cdcName="Barcode"
          />
        </form-control>
      </form-row>
    </internal-section>
    <internal-section title="نوع">
      <form-row class="q-my-sm">
        <form-control>
          <safa-checkbox
            label="تک برگی"
            label-width="100px"
            v-model="value.DocType1"
            cdcName="DocType1"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="اجاره خط آستان قدس رضوی"
            label-width="100px"
            v-model="value.DocType2"
            cdcName="DocType2"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="سند بنچاق/صلح"
            label-width="100px"
            v-model="value.DocType3"
            cdcName="DocType3"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="سند سرقفلی"
            label-width="100px"
            v-model="value.DocType4"
            cdcName="DocType4"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="قرارداد واگذاری راه و شهرسازی"
            label-width="100px"
            v-model="value.DocType5"
            cdcName="DocType5"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="وکالت نامه"
            label-width="100px"
            v-model="value.DocType6"
            cdcName="DocType6"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="دفترچه ای"
            label-width="100px"
            v-model="value.DocType7"
            cdcName="DocType7"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="اجاره خط اوقاف و موقوفات"
            label-width="100px"
            v-model="value.DocType8"
            cdcName="DocType8"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="اقرارنامه/تعهدنامه محضری"
            label-width="100px"
            v-model="value.DocType9"
            cdcName="DocType9"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="سایر"
            label-width="100px"
            v-model="DocType10"
            cdcName="DocType10"
          />
        </form-control>
      </form-row>
    </internal-section>
    <internal-section title="سند">
      <form-row>
        <form-control>
          <safa-text
            label="سند تحویل به"
            label-width="100px"
            v-model="value.TransferDocName"
            cdcName="TransferDocName"
          />
        </form-control>
        <form-control>
          <safa-text
            label="نماینده تحویل سند"
            label-width="100px"
            v-model="value.TransferDocAgentName"
            cdcName="TransferDocAgentName"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره نامه تحویل"
            label-width="100px"
            v-model="value.TransferLetterNo"
            cdcName="TransferLetterNo"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ تحویل سند از:"
            label-width="100px"
            v-model="value.TransferDocDateFrom"
            cdcName="TransferDocDateFrom"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="100px"
            v-model="value.TransferDocDateTo"
            cdcName="txtTransferDocDateTo"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="سند در بایگانی املاک"
            label-width="100px"
            v-model="value.IsDocArchiveEstate"
            cdcName="IsDocArchiveEstate"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="سند در گاوصندوق"
            label-width="100px"
            v-model="value.IsDocSafe"
            cdcName="IsDocSafe"
          />
        </form-control>
        <form-control>
          <safa-checkbox
            label="سند در مخزن شهرداری"
            label-width="100px"
            v-model="value.IsDocMunicipality"
            cdcName="IsDocMunicipality"
          />
        </form-control>
      </form-row>
    </internal-section>
    <internal-section title="واگذاری">
      <form-row>
        <form-control>
          <safa-checkbox
            label="ملک قابل واگذاری می باشد"
            label-width="100px"
            v-model="value.IsAssignable"
            cdcName="IsAssignable"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="نحوه واگذاری"
            ciName="CI_CessionKind"
            domainName="Estate"
            label-width="100px"
            v-model="value.CI_CessionKind"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره نامه"
            label-width="100px"
            v-model="value.LetterNo"
            cdcName="LetterNo"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ نامه از:"
            label-width="100px"
            v-model="value.LetterDateFrom"
            cdcName="LetterDateFrom"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="100px"
            v-model="value.LetterDateTo"
            cdcName="LetterDateTo"
          />
        </form-control>
      </form-row>
    </internal-section>

  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object
  },
  data () {
    return {
      name: "OtherFeatures"
    }
  }
}
</script>
