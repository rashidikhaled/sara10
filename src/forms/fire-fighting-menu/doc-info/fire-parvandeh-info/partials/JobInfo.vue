<template>
  <fit>
    <!-- <safa-status :result="result" /> -->
    <FormRow :lg="3" :md="3" :sm="3" :xl="4" class="q-pa-sm">
      <form-control>
        <safa-text
          label="میدان/محله/شهرک مجتمع/بازار/پاساژ"
          label-width="150px"
          m="r"
          v-model="value.Base_AddressInfo.Sector"
          cdcName="Sector"
        />
      </form-control>
      <form-control>
        <safa-text
          label="خیابان اصلی"
          label-width="150px"
          m="r"
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
        />
      </form-control>
      <form-control>
        <safa-text
          label="خیابان فرعی"
          label-width="150px"
          m="r"
          v-model="value.Base_AddressInfo.SubAddress"
          cdcName="SubAddress"
        />
      </form-control>
      <form-control>
        <safa-text
          label="کوچه"
          label-width="150px"
          m="r"
          v-model="value.Base_AddressInfo.Alley"
          cdcName="Alley"
        />
      </form-control>
      <form-control>
        <safa-text
          label="پلاک آبی"
          label-width="150px"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
        />
      </form-control>
      <form-control>
        <safa-text
          label="کدپستی"
          type="number"
          label-width="150px"
          :m="m"
          v-model="value.Base_CommonEstate.PostCode"
          cdcName="PostCode"
        />
      </form-control>
      <form-control>
        <safa-text
          label="تلفن"
          type="number"
          label-width="150px"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
        />
      </form-control>
    </FormRow>
    <fit>
      <safa-splitter class="fit" vertical v-model="gridSplitter">
        <template v-slot:before>
          <fit>
            <!-- helper="OldIdNumber" -->
            <safa-grid
              :columns="agOldIdNumber"
              title="شماره شناسایی قدیم"
              fit
              height="100%"
              min-height="200px"
              max-height="100%"
              :m="m"
              class="q-mb-sm"
              v-model="value.Base_PreCodeInfo"
              cdcName="Base_PreCodeInfo"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-grid
              helper="MainIdNumber"
              title="شماره شناسایی پرونده"
              fit
              height="100%"
              min-height="200px"
              max-height="100%"
              :m="m"
              class="q-mb-sm"
              v-model="value.Base_File"
              cdcName="Base_File"
              :suppressRowClickSelection="false"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
    <FormRow :lg="3" :md="3" :sm="3" :xl="4" class="q-px-sm q-mb-sm">
      <form-control>
        <safa-text
          label="مساحت کل زیر بنا"
          label-width="150px"
          :m="m"
          v-model="value.Base_ShopInfo.TotalArea"
          cdcName="TotalArea"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          label="تاریخ تاسیس واحد تجاری"
          label-width="150px"
          :m="m"
          v-model="value.Base_ShopInfo.CreateUnitDate"
          cdcName="CreateUnitDate"
        >
        </safa-datepicker>
      </form-control>
      <form-control>
        <safa-combo
          label="محل استقرار"
          label-width="150px"
          :m="m"
          ci-name="CI_JobStateStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_ShopInfo.CI_JobStateStatus"
          cdcName="CI_JobStateStatus"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          label="مساحت سهم العرصه"
          label-width="150px"
          :m="m"
          v-model="value.Base_ShopInfo.ToftImpart"
          cdcName="ToftImpart"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="موقعیت تجاری"
          label-width="150px"
          :m="m"
          ci-name="CI_TradingStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_ShopInfo.CI_TradingStatus"
          cdcName="CI_TradingStatus"
        />
      </form-control>
      <form-control>
        <safa-text
          label="تعداد دربند"
          label-width="150px"
          :m="m"
          v-model="value.Base_ShopInfo.DarbandCount"
          cdcName="DarbandCount"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          label="مساحت فضای باز تجاری"
          label-width="150px"
          :m="m"
          v-model="value.Base_ShopInfo.FreeSpaceNoTradingArea"
          cdcName="FreeSpaceNoTradingArea"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="موقعیت زمین"
          label-width="150px"
          :m="m"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_ShopInfo.CI_GeoStatus"
          cdcName="CI_GeoStatus"
        />
      </form-control>
      <form-control>
        <safa-text
          label="ارتفاع مفید"
          label-width="150px"
          :m="m"
          v-model="value.Base_ShopInfo.Hight"
          cdcName="Hight"
        />
      </form-control>
    </FormRow>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "JobInfo",
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      gridSplitter: 50,
      agOldIdNumber: [
        { field: "PreDistrict", title: "کد قدیم منطقه", width: 150 },
        { field: "PreRegion", title: "کد قدیم حوزه", width: 150 },
        { field: "PreBlock", title: "کد قدیم بلوک", width: 150 },
        { field: "PreHouse", title: "کد قدیم ملک", width: 150 },
        { field: "PreSub1", title: "کد قدیم فرعی 1", width: 150 },
        { field: "PreSub2", title: "کد قدیم فرعی 2", width: 150 }
      ]
      // helper:MainIdNumber
      // mainIdNumberColumns: [
      //   {
      //     field: 'isSelected',
      //     width: '80px',
      //     headerCheckboxSelection: true,
      //     checkboxSelection: true,
      //     align: 'center',
      //     headerAlign: 'center',
      //     pinned: "right",
      //     lockPosition: true,
      //     filter: false,
      //     filterable: false
      //   },
      //   {
      //     field: "FileIdMother",
      //     title: "شماره شناسایی پرونده مادر",
      //     width: 130
      //   }
      // ]
    }
  }
}
</script>
