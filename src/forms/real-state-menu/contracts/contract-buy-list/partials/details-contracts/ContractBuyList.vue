<template>
  <fit>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره صلح نامه خرید"
          v-model="value.ContractBuy_Info.ContractBuyNo"
          cdcName="ContractBuyNo"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ صلح نامه خرید"
          v-model="value.ContractBuy_Info.ContractBuyDate"
          cdcName="ContractBuyDate"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <template>
          <safa-checkbox
            label="تایید نهایی شده"
            v-model="rbIsConfirm"
            cdcName="rbIsConfirm"
            label-width="110px"
            class="q-ma-sm"
            :m="'r'"
          />
        </template>
        <template class="q-ml-sm">
          <safa-checkbox
            label="درج در آرشیو شده"
            v-model="value.ContractBuy_Info.IsArchived"
            cdcName="rbIsArchived"
            label-width="110px"
            class="q-ma-sm"
            :m="'r'"
          />
        </template>
      </FormControl>
      <FormControl class="col-12">
        <safa-combo
          label="موضوع صلح نامه خرید"
          v-model="value.ContractBuy_Info.CI_ContractBuySubject"
          ciName="CI_ContractBuySubject"
          domainName="Estate"
          cdcName="CI_ContractBuySubject"
          label-width="110px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره دستور شهردار"
          v-model="value.ContractBuy_Info.MayorOrderNo"
          cdcName="MayorOrderNo"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ دستور شهردار"
          v-model="value.ContractBuy_Info.MayorOrderDate"
          cdcName="MayorOrderDate"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مبلغ کل(ریال)"
          v-model="value.ContractBuy_Info.Total_Price"
          cdcName="Total_Price"
          label-width="110px"
          :m="'r'"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره مصوبه شورا"
          v-model="value.ContractBuy_Info.CouncilApprovedNo"
          cdcName="CouncilApprovedNo"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ مصوبه شورا"
          v-model="value.ContractBuy_Info.CouncilApprovedDate"
          cdcName="CouncilApprovedDate"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره اعمال ماده45"
          v-model="value.ContractBuy_Info.ApplyingArticle45No"
          cdcName="ApplyingArticle45No"
          label-width="110px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
      <FormControl>
        <safa-text
          label="شماره ابلاغ قرارداد"
          v-model="value.ContractBuy_Info.NoticeNo"
          cdcName="NoticeNo"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ابلاغ قرارداد"
          v-model="value.ContractBuy_Info.NoticeDate"
          cdcName="NoticeDate"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اعمال ماده45"
          v-model="value.ContractBuy_Info.ApplyingArticle45Date"
          cdcName="ApplyingArticle45Date"
          label-width="110px"
          :m="m"
        />
      </FormControl>
      <FormControl class="col-12">
        <safa-text
          label="بارکد"
          v-model="value.ContractBuy_Info.Barcode"
          cdcName="Barcode"
          label-width="110px"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm">
      <FormControl class="offset-1 col-5">
        <template>
          <safa-checkbox
            label="سهم سرانه زیر حد نصاب ضابطه تفکیک می باشد"
            v-model="value.ContractBuy_Info.IsCapitaBelowSeparationCriterion"
            cdcName="IsCapitaBelowSeparationCriterion"
            label-width="110px"
            class="q-ma-sm"
            :m="m"
          />
        </template>
      </FormControl>
      <FormControl class="col-6">
        <template class="q-ml-sm">
          <safa-checkbox
            label="سهم شهرداری به صورت زمین اخذ می گردد"
            v-model="value.ContractBuy_Info.IsMunicipalityTakenAsLand"
            cdcName="IsMunicipalityTakenAsLand"
            label-width="110px"
            class="q-ma-sm"
            :m="m"
          />
        </template>
      </FormControl>
    </FormRow>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="Description" label="توضیحات" />
        <tab-menu
          name="CancleDetailsPeaceAgreement"
          label="اطلاعات فسخ صلح نامه"
        />
      </template>
      <tab-content name="Description">
        <Description v-model="value" :m="m" />
      </tab-content>
      <tab-content name="CancleDetailsPeaceAgreement">
        <CancleDetailsPeaceAgreement v-model="value" :m="m" />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import Description from "./partials/Description.vue"
import CancleDetailsPeaceAgreement from "./partials/CancleDetailsPeaceAgreement.vue"

export default {
  props: {
    value: { type: Object, default: () => {} },
    rbIsConfirm: { type: Boolean },
    m: { type: String }
  },
  components: {
    Description,
    CancleDetailsPeaceAgreement
  },

  data () {
    return {
      name: "ContractBuyList",
      activeTab: "Description",
      CancleDetailsPeaceAgreementModel: {},
      Description: {}
    }
  }
}
</script>
