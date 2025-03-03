<template>
  <!-- <section> -->
  <fit>
    <!-- <div class="row q-col-gutter-lg"> -->
    <safa-group>
      <!-- row 1 -->
      <safa-text
        label="شماره بلوک در دفترچه تقسیمات ارزش ها"
        :m="m"
        v-model="value.Base_BlockInfo.GlobalBlockNo"
        :label-width="$q.screen.gt.xs? '105px':'190px'"
      />
      <safa-combo
        label="کاربری"
        ci-name="CI_UsingGroup"
        domain-name="CI_SaraM1"
        :m="m"
        v-model="value.Base_BlockInfo.CI_UsingGroup"
        label-width="105px"
      />
      <safa-text
        label="تعداد ساختمان"
        :m="m"
        v-model="value.Base_BlockInfo.BuildingCount"
        label-width="105px"
      />

      <!-- row 2 -->
      <safa-text
        label="محل مشهور"
        :m="m"
        v-model="value.Base_BlockInfo.FamousRegion"
        label-width="105px"
      />
      <safa-combo
        label="کد محدوده"
        ci-name="CI_BoundCode"
        domain-name="CI_SaraM1"
        :m="m"
        v-model="value.Base_BlockInfo.CI_BoundCode"
        label-width="105px"
      />
      <safa-text
        label="تعداد آپارتمان"
        :m="m"
        v-model="value.Base_BlockInfo.ApartmentCount"
        label-width="105px"
      />

      <!-- row 3 -->
      <safa-text
        label="نام بازار"
        :m="m"
        v-model="value.Base_BlockInfo.BazarName"
        label-width="105px"
      />
      <safa-text
        label="تعداد معبر"
        :m="m"
        v-model="value.Base_BlockInfo.PathCount"
        label-width="105px"
      />
      <safa-text
        label="تعداد کسب و پیشه"
        :m="m"
        v-model="value.Base_BlockInfo.NoResidentialApartmentCount"
        label-width="105px"
      />

      <!-- row 4 -->
      <safa-text
        label="تراکم"
        :m="m"
        v-model="value.Base_BlockInfo.DensityPlan"
        label-width="105px"
      />
      <safa-text
        label="تعداد ملک"
        :m="m"
        label-width="105px"
        v-model="value.Base_BlockInfo.HouseCount"
      />
      <safa-checkbox
        label="شکل بلوک"
        :m="m"
        v-model="value.Base_BlockInfo.IsShapeBlock"
      />

      <!-- row 5 -->
      <safa-datepicker
        label="تاریخ اثر"
        :m="m"
        label-width="105px"
        v-model="value.Base_BlockInfo.ActDate"
      />
      <!-- </div> -->
    </safa-group>
    <safa-splitter
      v-model="gridSplitter"
      margin="0"
      style="min-height:100px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="اطلاعات معابر"
            helper="baseBlockPath"
            :m="m"
            v-model="value.Base_BlockPath"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="ثوابت معابر"
            helper="baseBlockPathConstant"
            :m="m"
            v-model="value.Base_BlockPathConstant"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
  <!-- </section> -->
</template>

<script>
export default {
  name: 'TabBlockInfo',
  data () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
