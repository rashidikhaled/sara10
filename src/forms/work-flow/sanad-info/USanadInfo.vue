<template>
<section>
  <form-wrapper :title="title">
    <div class="row items-end q-col-gutter-lg">
      <div class="col-12 col-sm-4 col-md-3">
        <safa-custom-text
          type="decimal"
          label="مساحت طبق سند"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          label="بخش ثبتی"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          label="شماره سند اعیان"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-combo
          ciName="CI_Criterion"
          domainName="CI_SaraM1"
          input-debounce="0"
          label="نوع سند"
          :m="m"
        ></safa-combo>
      </div>

        <div class="col-12 col-sm-4 col-md-3">
          <safa-text
            label="شماره قطعه"
            m="r"
          />
        </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-datepicker
          locale="fa"
          placeholder="تاریخ صدور سند"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          label="تاریخ صدور سند"
          :m="m"
        ></safa-datepicker>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-combo
          ciName="CI_Criterion"
          domainName="CI_SaraM1"
          input-debounce="0"
          label="مرجع صدور سند"
          :m="m"
        ></safa-combo>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          label="شماره سند عرصه"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-datepicker
          locale="fa"
          placeholder="تاریخ انتقال سند"
          format="jYYYY/jMM/jDD"
          display-format="dddd jDD jMMMM jYYYY"
          label="تاریخ انتقال سند"
          :m="m"
        ></safa-datepicker>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-combo
          ciName="CI_Criterion"
          domainName="CI_SaraM1"
          input-debounce="0"
          label="وضعیت سند"
          :m="m"
        ></safa-combo>
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-custom-text
          type="decimal"
          label="مساحت سند مادر"
          m="r"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
      <safa-checkbox
        label="حقوق ارتفاقی"
        :m="m"
      ></safa-checkbox>
      </div>

      <div class="col-6">
        <safa-datatable
          ref="technical-grid"
          v-model="formModel.Base_RegisterPlack"
          :m="mode"
          helper="sanadInfoRegisteredPelak"
          title="پلاک ثبتی"
        ></safa-datatable>
      </div>

      <div class="col-6">
        <text-template
          label="ملاحضات سند"
          formKey="ac307e96-e1a3-465a-b236-1808a36990c3"
          :m="m"
        />
      </div>
    </div>

    <template v-slot:footer>
      <FormActions
        :m="mode"
        @cancel="isEditable = false"
        @edit="isEditable = true"
        @save="saveData"
      />
    </template>
  </form-wrapper>
</section>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/work-flow/sanad-info',
  mixins: [baseFormMixin],
  data () {
    return {
      name: 'USanadInfo',
      title: 'اطلاعات سند',
      items: [],
      loadDataPRequest: {
        pNosaziCode: {
          Apartment: '0',
          Block: '3',
          Building: '0',
          CI_City: '0',
          District: '1',
          EumBaseInfoGroup: '0',
          EumNosaziCodeGroup: '0',
          EumNosaziCodeObjType: '0',
          EumRevisitGroup: '0',
          House: '10000',
          Region: '2',
          Shop: '0'
        },
        'PLoadFun': 'Base_NosaziCode,Base_RegisterPlack,Base_HouseInfo,Base_CommonEstate,Base_PreCodeInfo'
      },
      formModel: {}
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.showLoading()

      // this.loadDataPRequest.pNidNosaziCode = this.selectedRequest.NidProc

      this.$services.SC.getParvandehHouseInNosaziCode(this.loadDataPRequest)
        .then(({ data }) => {
          this.formModel = data
        })
        .catch(err => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>

<style scoped>

</style>
