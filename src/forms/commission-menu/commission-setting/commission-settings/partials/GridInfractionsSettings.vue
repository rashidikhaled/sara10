<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-checkbox label="کد تخلف" :m="m" v-model="value.Id" cdcName="Id" />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="سال تخلف"
        :m="m"
        v-model="value.CI_Years"
        cdcName="CI_Years"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="مقدار تخلف"
        :m="m"
        v-model="value.TrepassValue"
        cdcName="TrepassValue"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="ارزش سرقفلی"
        :m="m"
        v-model="value.CommissionSarghofliValue"
        cdcName="CommissionSarghofliValue"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="حداقل جریمه"
        :m="m"
        v-model="value.MinPenalty"
        cdcName="MinPenalty"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="حداکثر جریمه"
        :m="m"
        v-model="value.MaxPenalty"
        cdcName="MaxPenalty"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="گروه تخلف/نوع تخلف"
        :m="m"
        v-model="value.TrepassGroupType"
        cdcName="TrepassGroupType"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="طبقه"
        :m="m"
        v-model="value.Floor"
        cdcName="Floor"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox label="K" :m="m" v-model="value.K" cdcName="K" />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="کد گروه کاربری فرعی"
        :m="m"
        v-model="value.UsingID"
        cdcName="UsingID"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="گروه کاربری فرعی"
        :m="m"
        v-model="value.UsingTitle"
        cdcName="UsingTitle"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="گروه کاربری اصلی موجود"
        :m="m"
        v-model="value.UsingGroupTitle"
        cdcName="UsingGroupTitle"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تاریخ وقوع تخلف از نظر شهرداری"
        :m="m"
        v-model="value.TrespassDateInMunicipality"
        cdcName="TrespassDateInMunicipality"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تاریخ وقوع تخلف از نظر مهندس ناظر"
        :m="m"
        v-model="value.TrespassDateInEngineer"
        cdcName="TrespassDateInEngineer"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تاریخ وقوع خلاف ملاک عمل"
        :m="m"
        v-model="value.TrespassDateHappendNotMelak"
        cdcName="TrespassDateHappendNotMelak"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="گروه کاربری اصلی مجاز"
        :m="m"
        v-model="value.CI_UsingTypeGroupMojaz"
        cdcName="CI_UsingTypeGroupMojaz"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تقاضای شهردار"
        :m="m"
        v-model="value.UrbanIdia"
        cdcName="UrbanIdia"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تعداد واحد موجود"
        :m="m"
        v-model="value.VahedCountMosavab"
        cdcName="VahedCountMosavab"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تعداد واحد مجاز"
        :m="m"
        v-model="value.VahedCountMojaz"
        cdcName="VahedCountMojaz"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="ضریب ارزش معاملاتی طبق تبصره 11 ماده صد(k)"
        :m="m"
        v-model="value.KC"
        cdcName="KC"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="متراژ موجود"
        :m="m"
        v-model="value.AreaMojod"
        cdcName="AreaMojod"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="متراژ مجاز"
        :m="m"
        v-model="value.AreaMojaz"
        cdcName="AreaMojaz"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="توضیحات"
        :m="m"
        v-model="value.Trepass_Comments"
        cdcName="Trepass_Comments"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox label="تبصره" :m="m" v-model="value.Note" cdcName="Note" />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="شاکی دارد/ندارد"
        :m="m"
        v-model="value.IsComplainant"
        cdcName="IsComplainant"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="رعایت حقوق مجاورین"
        :m="m"
        v-model="value.IsRightsBystanders"
        cdcName="IsRightsBystanders"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="متراژ کسر ازآمار"
        :m="m"
        v-model="value.TrepassValueAmar"
        cdcName="TrepassValueAmar"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="وضعيت تخلف"
        :m="m"
        v-model="value.TrepassStatus"
        cdcName="TrepassStatus"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="ضریب ارزش معاملاتی طبق تبصره 11 ماده صد(k) (سوابق)"
        :m="m"
        v-model="value.KC_S"
        cdcName="KC_S"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="ارزش معاملاتی طبق تبصره 11 ماده صد(k) (سوابق)"
        :m="m"
        v-model="value.K_S"
        cdcName="K_S"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="نوع رای (سوابق)"
        :m="m"
        v-model="value.VoteType_S"
        cdcName="VoteType_S"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="شماره کمیسیون (سوابق)"
        :m="m"
        v-model="value.CI_Commission_S"
        cdcName="CI_Commission_S"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="نوع کمیسیون (سوابق)"
        :m="m"
        v-model="value.CI_CommissionType_S"
        cdcName="CI_CommissionType_S"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="شماره رای (سوابق"
        :m="m"
        v-model="value.VoteNo_S"
        cdcName="VoteNo_S"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="مبلغ رای (سوابق"
        :m="m"
        v-model="value.VoteValue_S"
        cdcName="VoteValue_S"
      />
    </div>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: String
  },
  data () {
    return {
      name: "GridInfractionsSettings"
    }
  }
}
</script>
