<template>
  <fit>
    <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
      <div class="col-6">
        <div class="column q-gutter-sm">
          <safa-text
            :m="m"
            label="آدرس"
            label-width="110px"
            v-model="results.Base_AddressInfo.MainAddress"
            type="textarea"
          />
          <safa-combo
            label="نوع مالکیت"
            ci-name="CI_OwnerType"
            domain-name="CI_SaraM1"
            v-model="results.Base_CommonEstate.CI_OwnerType"
            :m="m"
            label-width="110px"
          />
          <safa-combo
            label="نوع سند"
            ci-name="CI_DocType"
            domain-name="CI_SaraM1"
            v-model="results.Base_CommonEstate.CI_DocType"
            :m="m"
            label-width="110px"
          />
          <safa-combo
            label="وضعیت سند"
            ci-name="CI_DocStatus"
            domain-name="CI_SaraM1"
            v-model="results.Base_CommonEstate.CI_DocStatus"
            :m="m"
            label-width="110px"
          />
        </div>
      </div>
      <div class="col-6">
        <div class="column q-gutter-sm">
          <!-- <safa-text
              label="پلاک ثبتی"
              v-model="results.Base_RegisterPlack"
              :m="m"
              label-width="110px"
            /> -->
          <safa-text
            label="شماره سند عرصه"
            v-model="results.Base_HouseInfo_Revisit.ArsehDocNo"
            type="number"
            :m="m"
            label-width="110px"
          />
          <safa-text
            label="بخش ثبتی"
            v-model="results.Base_CommonEstate.RegisterSection"
            :m="m"
            label-width="110px"
          />
          <safa-text
            label="شماره قطعه"
            v-model="results.Base_HouseInfo_Revisit.PieceNo"
            :m="m"
            type="number"
            label-width="110px"
          />
          <safa-custom-text
            label="مساحت سند مادر"
            v-model="results.Base_HouseInfo_Revisit.MotherDocArea"
            :m="m"
            label-width="110px"
          />
          <safa-text
            label="تاریخ صدور سند"
            v-model="results.Base_CommonEstate.DocExportDate"
            :m="m"
            label-width="110px"
          />
          <!-- v-model="results.Base_HouseInfo_Revisit.HoughogheErtefaghi" -->

          <safa-combo
            label="حقوق ارتفاقی"
            sourceType="local"
            :options="HoughogheErtefaghi"
            :m="m"
            label-width="110px"
            v-model="selectedHoughogheErtefaghi"
          />
        </div>

      </div>
    </div>
    <fit>
      <safa-datatable
        helper="baseRegisterPlack"
        :m="m"
        v-model="results.Base_RegisterPlack"
        title="پلاک ثبتی"
        fit
        height="100%"
        max-height="100%"
        min-height="150px"
        class="q-mt-sm"
      />
    </fit>
  </fit>
</template>

<script>
export default {
  name: 'baro-kaf-info',
  title: 'مالکین و سایر امکانات و پخ ها',
  data () {
    return {
      gridSplitter: 50,
      gridSplitter2: 50,
      ownerItems: [],
      others: [],
      pakhha: [],
      splitterModel: 50,
      HoughogheErtefaghi: [
        { ID: 0, Title: 'دارد' },
        { ID: 1, Title: 'ندارد' }
      ],
      selectedHoughogheErtefaghi: null
    }
  },
  props: {
    results: Object,
    m: String
    // selectedHoughogheErtefaghi: Number
  },
  mounted () {
    if (this.results.Base_HouseInfo_Revisit) {
      if (this.results.Base_HouseInfo_Revisit.HoughogheErtefaghi) {
        this.selectedHoughogheErtefaghi = 0
      } else {
        this.selectedHoughogheErtefaghi = 1
      }
    }
  },
  watch: {
    selectedHoughogheErtefaghi () {
      if (this.selectedHoughogheErtefaghi === 0) {
        this.results.Base_HouseInfo_Revisit.HoughogheErtefaghi = true
      } else {
        this.results.Base_HouseInfo_Revisit.HoughogheErtefaghi = false
      }
    }
  },
  methods: {
    checkBoxChanged (e) {
      this.results.Base_Bezel.map(obj => {
        if (obj.NidBezel === e.dataItem.NidBezel) {
          obj.IsObserve = e.results
        }
        return obj
      })
    }
  }
}
</script>
