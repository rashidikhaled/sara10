<template>
  <fit>
    <safa-group>
      <safa-text
        v-model="results.Sh_MafasaComments.MafasaNo"
        label="شماره مفاصا "
        :m="m"
        label-width="105px"
      ></safa-text>
      <safa-datepicker
        label="تاریخ مفاصا"
        v-model="results.Sh_MafasaComments.MafasaDate"
        :m="m"
        label-width="105px"
      ></safa-datepicker>
      <safa-combo
        label=" از سال "
        ciName="CI_DutyYear"
        domainName="CI_SaraM1"
        v-model="results.Sh_MafasaComments.FromYear"
        :m="m"
        label-width="105px"
      ></safa-combo>
      <safa-combo
        label="تا سال"
        ciName="CI_DutyYear"
        domainName="CI_SaraM1"
        v-model="results.Sh_MafasaComments.ToYear"
        :m="m"
        label-width="105px"
      ></safa-combo>
      <safa-custom-text
        type="money"
        label=" قیمت منطقه ای "
        v-model="results.Sh_MafasaComments.EconomicPrice"
        :m="m"
        label-width="105px"
      />
      <safa-combo-enum
        label="ملک به صورت"
        enum-name="EumNosaziCodeObjType"
        v-model="results.Sh_MafasaComments.EumNosaziCodeObjType"
        :m="m"
        label-width="105px"
      />
      <safa-text
        label=" دفترخانه"
        v-model="results.Sh_MafasaComments.OfficeName"
        :m="m"
        label-width="105px"
      ></safa-text>
      <safa-custom-text
        type="decimal"
        label="مساحت عرصه طبق سند"
        v-model="results.Base_HouseInfo.DocArea"
        m="r"
        :label-width="$q.screen.gt.xs ? '105px' : '115px'"
      />
      <safa-text
        label="نام صاحب نامه"
        v-model="results.Sh_RequestInfo.MainRequesterName"
        m="r"
        label-width="105px"
      ></safa-text>
      <safa-text
        label="شماره نامه"
        v-model="results.Sh_RequestInfo.MainRequesterNo"
        m="r"
        label-width="105px"
      ></safa-text>
      <safa-datepicker
        label="تاریخ نامه"
        v-model="results.Sh_RequestInfo.MainRequesterDate"
        m="r"
        label-width="105px"
      ></safa-datepicker>
    </safa-group>
    <text-template
      class="q-mb-sm"
      label="توضیحات دبیرخانه"
      v-model="results.Sh_RequestInfo.SecretariatComments"
      m="r"
      label-width="105px"
      formKey="DA43FBC6-DC73-439A-851B-FDEB7D24E591"
      :fit="false"
      :rows="row"
    />
    <safa-label class="text-bold">نوسازی</safa-label>
    <q-separator class="q-my-sm" />
    <safa-group>
      <safa-text
        label="شماره فیش"
        v-model="results.NosaziFiche.FicheNo"
        m="r"
        label-width="105px"
      ></safa-text>
      <safa-custom-text
        label="مبلغ کل"
        type="money"
        v-model="results.NosaziFiche.TotalPrice"
        m="r"
        label-width="105px"
      />
    </safa-group>
    <q-separator class="q-mb-sm" />
    <safa-label class="text-bold">درآمد</safa-label>
    <q-separator class="q-my-sm" />
    <safa-group>
      <safa-text
        label="شماره فیش"
        v-model="results.IncomeFiche.FicheNo"
        m="r"
        label-width="105px"
      ></safa-text>
      <safa-custom-text
        type="money"
        label="مبلغ قابل پرداخت"
        v-model="results.IncomeFiche.Payable"
        m="r"
        label-width="105px"
      />
    </safa-group>
    <text-template
      label="توضیحات فیش درآمد"
      formKey="DA43FBC6-DC73-439A-851B-FDEB7D24E591"
      v-model="results.IncomeFiche.Comments"
      m="r"
      label-width="105px"
      :fit="false"
      :rows="row"
    />
    <q-separator class="q-my-sm" />
    <safa-text
      label="آدرس"
      type="textarea"
      v-model="results.Base_AddressInfo.MainAddress"
      m="r"
      label-width="105px"
      class="q-mb-sm"
    />
    <text-template
      label="توضیحات مفاصا"
      formKey="DA43FBC6-DC73-439A-851B-FDEB7D24E591"
      v-model="results.Sh_MafasaComments.MafasaComments"
      m="r"
      label-width="105px"
    />
  </fit>
</template>
<script>
export default {
  data: function () {
    return { row: 5 }
  },
  props: { results: Object, m: String }
}
</script>
