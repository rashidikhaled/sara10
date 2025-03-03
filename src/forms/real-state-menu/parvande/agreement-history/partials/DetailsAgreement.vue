<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="شماره توافق نامه"
          v-model="value.ContractBuy_Info.ContractBuyNo"
          cdcName="ContractBuyNo"
          label-width="100px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label-width="100px"
          v-model="value.ContractBuy_Info.ContractBuyDate"
          cdcName="ContractBuyDate"
          :m="m"
          label="تاریخ توافق نامه"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label-width="100px"
          v-model="value.ContractBuy_Info.CI_ContractBuySubject"
          ciName="CI_ContractBuySubject"
          domainName="Estate"
          cdcName="CI_ContractBuySubject"
          :m="m"
          label="موضوع توافق نامه"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label-width="100px"
          v-model="value.ContractBuy_Info.PaymentType"
          cdcName="PaymentType"
          m="r"
          label="نوع پرداخت"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label-width="100px"
          v-model="value.ContractBuy_Info.MayorOrderNo"
          cdcName="MayorOrderNo"
          :m="m"
          label="شماره دستور شهردار"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label-width="100px"
          v-model="value.ContractBuy_Info.MayorOrderDate"
          cdcName="MayorOrderDate"
          :m="m"
          label="تاریخ دستور شهردار"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label-width="100px"
          v-model="value.Total_Price"
          cdcName="Total_Price"
          m="r"
          label="مبلغ کل نهایی(ریال)"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label-width="100px"
          v-model="value.ContractBuy_Info.CouncilApprovedNo"
          cdcName="CouncilApprovedNo"
          :m="m"
          label="شماره مصوب شورا"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label-width="100px"
          v-model="value.ContractBuy_Info.CouncilApprovedDate"
          cdcName="CouncilApprovedDate"
          :m="m"
          label="تاریخ مصوب شورا"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label-width="100px"
          v-model="value.ContractBuy_Info.ApplyingArticle45No"
          cdcName="ApplyingArticle45No"
          :m="m"
          label="شماره اعمال ماده45"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label-width="100px"
          v-model="value.ContractBuy_Info.NoticeNo"
          cdcName="NoticeNo"
          :m="m"
          label="شماره ابلاغ قرارداد"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label-width="100px"
          v-model="value.ContractBuy_Info.NoticeDate"
          cdcName="NoticeDate"
          :m="m"
          label="تاریخ ابلاغ قرارداد"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label-width="100px"
          v-model="value.ContractBuy_Info.ApplyingArticle45Date"
          cdcName="ApplyingArticle45Date"
          :m="m"
          label="تاریخ اعمال ماده45"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label-width="100px"
          v-model="value.ContractBuy_Info.NIdContractBuy"
          cdcName="NIdContractBuy"
          :options="cmbContractBuyItemsSource"
          source-type="local"
          :m="m"
          label="متمم قرارداد"
          ref="NIdContractBuyRef"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label-width="100px"
          v-model="value.ContractBuy_Info.NIdEvaluation"
          cdcName="NIdEvaluation"
          :options="cmbEvaluationItemsSource"
          source-type="local"
          :m="m"
          label="قیمت گذاری"
          ref="NIdEvaluationRef"
          />
      </FormControl>
      <FormControl>
        <safa-text
          label-width="100px"
          v-model="value.ContractBuy_Info.EvaluationPrice"
          cdcName="EvaluationPrice"
          m="r"
          label="مبلغ قیمت گذاری"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-checkbox
          label="تأیید نهایی شده"
          label-width="110px"
          class="q-ma-sm"
          :m="'r'"
          v-model="value.ContractBuy_Info.rbIsConfirm"
          cdcName="rbIsConfirm"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="درج در آرشیو شده"
          label-width="110px"
          class="q-ma-sm"
          :m="'r'"
          v-model="value.ContractBuy_Info.IsArchived"
          cdcName="rbIsArchived"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-label style="width: 90px">مصوبه شورا</safa-label>
        <div class="q-gutter-x-lg">
          <safa-radio
            label="دارد"
            :val="true"
            v-model="value.ContractBuy_Info.IsHaveCouncil"
            :m="m"
            cdcName="R_Have"
          />
          <safa-radio
            label="ندارد"
            :val="false"
            v-model="value.ContractBuy_Info.IsHaveCouncil"
            :m="m"
            cdcName="R_DontHave"
          />
        </div>
      </FormControl>
    </FormRow>
    <safa-tabs v-model="activeTab" class="q-mt-sm">
      <template v-slot:tabs>
        <tab-menu name="description" label="توضیحات" />
        <tab-menu
          name="CancleDetailsPeaceAgreement"
          label="اطلاعات فسخ صلح نامه"
        />
      </template>
      <tab-content name="description">
        <FormControl class="q-mt-sm fit">
          <text-template
            label-width="100px"
            v-model="value.Description"
            cdcName="Description"
            label="توضیحات"
            :m="m"
          />
        </FormControl>
      </tab-content>
      <tab-content name="CancleDetailsPeaceAgreement">
        <CancleDetailsPeaceAgreement v-model="value" :m="m" />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import CancleDetailsPeaceAgreement from "./CancleDetailsPeaceAgreement.vue"
export default {
  components: { CancleDetailsPeaceAgreement },
  props: {
    value: { type: Object, default: () => {} },
    cmbContractBuyItemsSource: { type: Array, default: () => [] },
    m: { type: String }
  },
  data () {
    return {
      name: "DetailsAgreement",
      title: "مشخصات توافق نامه",
      activeTab: "description"
    }
  },
  computed: {
    cmbEvaluationItemsSource () {
      const list = this.value?.Evaluation_Info_RequestList ?? []
      return list.map(m => {
        return {
          ...m,
          ID: m.NIdEvaluation,
          Title: m?.EvaluationID_Date ?? ''
        }
      })
    }

  }
}
</script>
