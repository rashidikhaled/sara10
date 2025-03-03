<template>
  <FormWrapper>
    <fit>
      <FormRow v-if="ciPrintType === 3">
        <!-- قرار -->
        <FormControl>
          <safa-combo
            label="نوع"
            label-width="80px"
            v-model="value.printVote.Zinaf"
            cdcName="Zinaf"
            source-type="local"
            :options="zinafOptions"
          />
        </FormControl>
      </FormRow>
      <FormRow v-else-if="ciPrintType === 14">
        <FormControl>
          <safa-text
            label="شماره دادنامه"
            label-width="80px"
            v-model="value.printVote.DadnamehNo"
            cdcName="DadnamehNo"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="مورخ"
            label-width="80px"
            v-model="value.printVote.DadnamehDate"
            cdcName="DadnamehDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره رای منقوض"
            label-width="80px"
            v-model="value.printVote.CommissionNo"
            cdcName="CommissionNo"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="اجرای رای"
            label-width="80px"
            v-model="value.printVote.Ghatei"
            cdcName="Ghatei"
            source-type="local"
            :options="ghateiOptions"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نقض"
            label-width="80px"
            v-model="value.printVote.Naghz"
            cdcName="Naghz"
            source-type="local"
            :options="naghzOptions"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ کمیسیون قبلی"
            label-width="80px"
            v-model="value.printVote.OldCommissionDate"
            cdcName="OldCommissionDate"
          />
        </FormControl>
      </FormRow>
      <FormRow v-else-if="ciPrintType === 15">
        <FormControl>
          <safa-text
            label="شماره "
            label-width="80px"
            v-model="value.printVote.NamehNo"
            cdcName="NamehNo"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع"
            label-width="80px"
            v-model="value.printVote.TypeRequester"
            cdcName="TypeRequester"
            source-type="local"
            :options="typeRequesterOptions"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="اصدار"
            label-width="80px"
            v-model="value.printVote.Esdar"
            cdcName="Esdar"
            source-type="local"
            :options="esdarOptions"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ "
            label-width="80px"
            v-model="value.printVote.Date"
            cdcName="Date"
          />
        </FormControl>
      </FormRow>
      <FormRow v-else>
        <FormControl>
          <safa-combo
            label="متقاضی"
            label-width="80px"
            source-type="local"
            :options="typeRequesterOptions"
            v-model="value.printVote.Motaghazi"
            cdcName="Motaghazi"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="دفاعیات"
            label-width="80px"
            source-type="local"
            :options="defendsOptions"
            v-model="value.printVote.Defaie"
            cdcName="Defaie"
          />
        </FormControl>
      </FormRow>
    </fit>

    <template v-slot:footer>
      <btn-save label="تایید" @click="$emit('confirm')" />
    </template>
  </FormWrapper>
</template>

<script>
export default {
  props: {
    value: Object,
    ciPrintType: Number
  },
  data () {
    return {
      zinafOptions: [
        { Id: 0, Title: "مالک" },
        { Id: 1, Title: "شهرداری" },
        { Id: 2, Title: "مالک و شهرداری" }
      ],
      defendsOptions: [
        { Id: 0, Title: "مطالعه دفاعیات" },
        { Id: 1, Title: "استماع اظهارات" },
        { Id: 2, Title: "هردو" },
        { Id: 3, Title: "عدم ارائه دفاعیات" }
      ],
      motaghaziOptions: [
        { Id: 0, Title: "مالک" },
        { Id: 1, Title: "ذینفع" },
        { Id: 2, Title: "نماینده قانونی" }
      ],
      naghzOptions: [
        { Id: 0, Title: "تمام" },
        { Id: 1, Title: "قسمتی" }
      ],
      ghateiOptions: [
        { Id: 0, Title: "قطعی" },
        { Id: 1, Title: "غیر قطعی" }
      ],
      typeRequesterOptions: [
        { Id: 0, Title: "ذینفع" },
        { Id: 1, Title: "شهرداری" },
        { Id: 2, Title: "ذینفع و شهرداری" }
      ],
      esdarOptions: [
        { Id: 0, Title: "یافته" },
        { Id: 1, Title: "نیافته" }
      ]
    }
  }
}
</script>
