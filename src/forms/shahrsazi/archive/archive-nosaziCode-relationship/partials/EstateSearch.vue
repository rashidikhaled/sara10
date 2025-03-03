<template>
  <form-wrapper :title="title">
    <template #header>
      <!-- <div
      v-if="closeForm"
      class="row"
    > -->
      <!-- <span
        style="cursor:pointer"
        class="q-mb-md"
      >
        <q-icon
          name="close"
          size="sm"
          color="primary"
        />
      </span> -->
      <!-- </div> -->
      <safa-status :result="result"/>
      <nosazi-code-input
        v-model="Base_NosaziCode"
        :actions="true"
        cdcName="Base_NosaziCode"
        @enter="load"
      />
      <!-- </div> -->
    </template>
    <fit>
      <div class="row q-col-gutter-x-xl q-col-gutter-y-md q-mb-sm">
        <div class="col-12 col-sm-auto">
          <div class="q-gutter-md flex">
            <div>چگونگی شرط:</div>
            <safa-radio
              v-model="isEqual"
              :val="false"
              cdcName="isEqual"
              label="شبیه"
            />
            <safa-radio
              v-model="isEqual"
              :val="true"
              cdcName="Equal"
              label="مساوی"
            />
          </div>
        </div>
        <div class="col-12 col-sm-auto">
          <div class="q-gutter-sm-md q-gutter-xs-sm flex">
            <div class="q-mr-sm-md">نوع پرونده:</div>
            <safa-radio
              v-model="baseInfoGroup"
              :val="0"
              cdcName="Jari"
              label="جاری"
              @input="handleBaseInfoChanged"
            />
            <safa-radio
              v-model="baseInfoGroup"
              :val="1"
              cdcName="Momayezi"
              label="ممیزی"
              @input="handleBaseInfoChanged"
            />
            <safa-radio
              v-model="baseInfoGroup"
              :val="2"
              cdcName="MojazParvaneh"
              label="مجاز پروانه"
              @input="handleBaseInfoChanged"
            />
            <safa-radio
              v-model="baseInfoGroup"
              :val="3"
              cdcName="MojazPayankar"
              label="مجاز پایانکار"
              @input="handleBaseInfoChanged"
            />
            <safa-radio
              v-model="baseInfoGroup"
              :val="4"
              cdcName="Nosazi"
              label="نوسازی"
              @input="handleBaseInfoChanged"
            />
            <!-- <safa-radio
          label="نوسازی"
          :val="100"
          v-model="Base_Info.EumBaseInfoGroup"
          @input="handleBaseInfoChanged"
        /> -->
          </div>
        </div>
      </div>
      <!-- Row 3 -->
      <fit v-if="!parvandehDialogState">
        <internal-section
          class="q-mt-lg"
          title="فیلدهای مورد نمایش"
        >
          <div class="q-gutter-md">
            <safa-checkbox
              v-model="checkBase_PreCodeInfo"
              cdcName="PreCodeInfo"
              label="کد شناسایی قدیم"
            />
            <safa-checkbox
              v-model="checkBase_JobInfo"
              cdcName="JobInfo"
              label="نام واحد شغلی"
            />
            <safa-checkbox
              v-model="checkBase_SubScription"
              cdcName="SubScription"
              label="اشتراکات"
            />
            <safa-checkbox
              v-model="checkBase_JobOwner"
              cdcName="JobOwner"
              label="متصدی شغل"
            />
            <safa-checkbox
              v-model="checkBase_RegisterPlack_1"
              cdcName="RegisterPlack"
              label="پلاک ثبتی"
            />
            <safa-checkbox
              v-model="checkBase_ShahrsaziArchive"
              cdcName="ShahrsaziArchive"
              label="مجوزات"
            />
            <safa-checkbox
              v-model="checkPlackAbi"
              cdcName="PlackAbi"
              label="پلاک آبی"
            />
            <safa-checkbox
              v-model="checkBase_File"
              cdcName="FileNumber"
              label="شماره پرونده مادر"
            />
          </div>
        </internal-section>
        <safa-tabs
          v-model="currentTab"
          @click="handleChangeTab"
        >
          <template v-slot:tabs>
            <tab-menu
              v-for="tab in tabs"
              :key="tab.name"
              v-bind="tab"
            >
            </tab-menu>
          </template>
          <tab-content
            name="address"
            title="آدرس و مالک"
          >
            <div class="row">
              <safa-group
                label-width="85px"
                margin="0"
              >
                <safa-text
                  v-model="Base_Owner.OwnerName"
                  cdcName="OwnerName"
                  label="نام"
                />
                <safa-text
                  v-model="Base_Owner.OwnerLastName"
                  cdcName="OwnerLastName"
                  label="نام خانوادگی"
                />
                <safa-text
                  v-model="Base_Owner.OwnerFatherName"
                  cdcName="OwnerFatherName"
                  label="نام پدر"
                />
                <safa-text
                  v-model="Base_Owner.NationalCode"
                  cdcName="NationalCode"
                  label="شماره ملی"
                />
                <safa-text
                  v-model="Base_CommonEstate.MainAddress"
                  cdcName="MainAddress"
                  label="آدرس"
                />
                <safa-text
                  v-model="Base_CommonEstate.Telephone"
                  cdcName="Telephone"
                  label="تلفن"
                />
                <safa-text
                  v-model="Base_CommonEstate.PostCode"
                  cdcName="PostCode"
                  label="کدپستی"
                />
                <safa-text
                  v-model="Base_CommonEstate.Plack"
                  cdcName="Plack"
                  label="پلاک آبی"
                />
                <safa-text
                  v-model="Base_CommonEstate.Vahed"
                  cdcName="Vahed"
                  label="واحد"
                />
                <safa-text
                  v-model="Base_CommonEstate.FileIdMother"
                  cdcName="FileIdMother"
                  label="شماره پرونده مادر"
                />
              </safa-group>
            </div>
          </tab-content>
          <tab-content
            name="registerPlaque"
            title="پلاک ثبتی"
          >
            <div class="row q-gutter-lg">
              <safa-text
                v-model="Base_RegisterPlack_1.CI_RegisterPlackTypeGroup"
                cdcName="RegisterPlackTypeGroup"
                ci-name="CI_RegisterPlackTypeGroup"
                class="col-auto"
                domain-name="CI_SaraM1"
                label="اصلی"
              />
              <safa-text
                v-model="Base_RegisterPlack_1.CI_RegisterPlackType"
                cdcName="RegisterPlackType"
                ci-name="CI_RegisterPlackType"
                class="col-auto"
                domain-name="CI_SaraM1"
                label="فرعی"
              />
              <safa-text
                v-model="Base_RegisterPlack_1.RegisterPlackTypeValue"
                cdcName="RegisterPlackTypeValue"
                class="col-auto"
                label="قطعه"
              />
            </div>
          </tab-content>
          <tab-content
            name="preCode"
            title="کد قدیم"
          >
            <div class="row">
              <safa-text
                v-model="Base_PreCodeInfo.PreCode"
                cdcName="PreCode"
                label="کد قدیم"
              />
            </div>
          </tab-content>
          <tab-content
            name="job"
            title="شغلی"
          >
            <div class="row q-gutter-x-lg q-gutter-sm">
              <safa-text
                v-model="Base_JobOwner.OwnerName"
                cdcName="OwnerName"
                class="col-auto"
                label="نام متصدی شغل"
              />
              <safa-text
                v-model="Base_JobOwner.OwnerLastName"
                cdcName="OwnerLastName"
                class="col-auto"
                label="نام خانوادگی متصدی شغل"
              />
              <safa-text
                v-model="Base_JobInfo.JobUnitName"
                cdcName="JobUnitName"
                class="col-auto"
                label="نام واحد شغلی"
              />
              <safa-combo
                v-model="Base_JobInfo.CI_JobName"
                cdcName="CI_JobName"
                ci-name="CI_JobName"
                class="col-auto"
                domain-name="CI_SaraM1"
                label="کد شغلی"
                label-width="80px"
                use-input
              />
            </div>
          </tab-content>
          <tab-content
            name="subscription"
            title="اشتراکات"
          >
            <div class="row q-col-gutter-md items-center">
              <div class="col-12 col-md">
                <div class="col flex q-gutter-lg items-center">
                  <div>اشتراکات:</div>
                  <safa-checkbox
                    v-model="checkSubscriptions_water"
                    :val="1"
                    cdcName="water"
                    label="آب"
                  />

                  <safa-checkbox
                    v-model="checkSubscriptions_Electricity"
                    :val="2"
                    cdcName="Electricity"
                    label="برق"
                  />

                  <safa-checkbox
                    v-model="checkSubscriptions_Gas"
                    :val="3"
                    cdcName="Gas"
                    label="گاز"
                  />

                  <safa-checkbox
                    v-model="checkSubscriptions_Phone"
                    :val="4"
                    cdcName="Phone"
                    label="تلفن"
                  />
                  <safa-checkbox
                    v-model="checkSubscriptions_All"
                    :val="0"
                    cdcName="checkSubscriptions_All"
                    label="همه اشتراکات"
                  />
                </div>
              </div>
              <div class="col-12 col-md-3">
                <safa-text
                  v-model="Subscriptions_number"
                  cdcName="Subscriptions_number"
                  label="شماره اشتراک"
                />
              </div>
            </div>
          </tab-content>

          <tab-content
            name="exportation"
            title="گواهی و مجوزات"
          >
            <div class="row q-col-gutter-md items-center">
              <div class="col-12 col-lg">
                <div class="q-gutter-md flex items-center">
                  <div>گواهی ها و مجوزات:</div>
                  <safa-radio
                    v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
                    :val="1"
                    cdcName="parvaneh"
                    label="پروانه"
                  />
                  <safa-radio
                    v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
                    :val="2"
                    cdcName="payankar"
                    label="پایانکار"
                  />
                  <safa-radio
                    v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
                    :val="3"
                    cdcName="adame khalaf"
                    label="عدم خلاف"
                  />
                  <safa-radio
                    v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
                    :val="4"
                    cdcName="Estelam"
                    label="استعلام"
                  />
                  <safa-radio
                    v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
                    :val="0"
                    cdcName="authorization"
                    label="تمام گواهی ها و مجوزات"
                  />
                </div>
              </div>
              <div class="col-12 col-sm-5 col-lg-2 col-md-3">
                <safa-text
                  v-model="Base_ShahrsaziArchive.CertificateNo"
                  cdcName="CertificateNo"
                  label="شماره مجوز:"
                  labelWidth="70px"
                />
              </div>
              <div class="col-12 col-sm-5 col-lg-2 col-md-3">
                <safa-datepicker
                  v-model="Base_ShahrsaziArchive.CertificateDate"
                  cdcName="CertificateDate"
                  label="تاریخ مجوز:"
                  labelWidth="70px"
                />
              </div>
            </div>
          </tab-content>

          <tab-content
            name="block"
            title="کد بلوک و ملک"
          >
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-md-3 col-sm-4">
                <safa-text
                  v-model="Base_NosaziCode.Block"
                  cdcName="Block"
                  label="بلوک:"
                  labelWidth="50px"
                  type="number"
                />
              </div>
              <div class="col-12 col-md-3 col-sm-4">
                <safa-text
                  v-model="Base_NosaziCode.House"
                  cdcName="House"
                  label="ملک:"
                  labelWidth="50px"
                  type="number"
                />
              </div>
            </div>
          </tab-content>
        </safa-tabs>
        <div class="q-my-sm flex q-gutter-x-sm justify-end">
          <btn-search
            label="جستجو"
            @click="load"
          />
          <btn-delete
            label="پاک کردن"
            @click="handleReset"
          />
        </div>
        <safa-datatable
          v-model="SearchList"
          :columns="columns"
          :hideHeader="true"
          :pageable="pageable"
          :showRowNumber="false"
          :skip="skip"
          :take="take"
          :total="totalRow"
          cdcName="handleGridSelectedChanged"
          fit
          @dbclick="selectCurrentNosaziCode"
          @pagechange="handlePageChange"
          @selectClick="selectCurrentNosaziCode"
          @selectedChange="handleGridSelectedChanged"
        />
      </fit>
      <u-parvandeh-info
        v-else
        :prefer-nosazi-code="selectedNosaziCode"
        :taskInfo="selectedRecord"
      />
    </fit>
  </form-wrapper>
</template>

<script>
import {
  compareNosaziCodeObjects,
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from 'src/utils/nosaziCodeOperation'
// import UParvandehInfo from '../../../tashkil-parvandeh/parvandeh-info/UParvandehInfo.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  name: 'EstateSearch',
  // components: { UParvandehInfo },
  route: '/history-and-search/nosazi-code-search',
  props: {
    selectable: {
      type: Boolean,
      default: false
    },
    value: Object,
    readOnly: Boolean
  },

  data () {
    return {
      title: 'جستجوی ملک',
      formKey: '320655BE-DFBA-4FF5-ABE0-B2F5F90550E3',
      name: 'EstateSearch',
      main: true,
      sidebarCompatible: true,
      showFields: false,
      closeForm: false,
      result: null,
      checkBase_PreCodeInfo: false,
      checkBase_JobInfo: false,
      checkBase_SubScription: false,
      checkBase_JobOwner: false,
      checkBase_RegisterPlack_1: false,
      checkBase_ShahrsaziArchive: false,
      checkSubscriptions_water: false,
      checkSubscriptions_Electricity: false,
      checkSubscriptions_Gas: false,
      checkSubscriptions_Phone: false,
      checkSubscriptions_All: false,
      Subscriptions_number: '',
      checkPlackAbi: false,
      checkBase_File: false,
      SearchList: [],
      selectedRecord: null,
      selectedNosaziCode: null,
      parvandehDialogState: false,
      isEqual: false,
      selectedTables: ['Base_AddressInfo', 'Base_Owner'], // Fixed tables
      Base_Info: {
        EumBaseInfoGroup: 0
      },
      baseInfoGroup: 0,
      Base_JobInfo: { JobUnitName: '', CI_JobName: null },
      nosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      Base_Owner: {
        OwnerName: '',
        OwnerLastName: '',
        OwnerFatherName: '',
        NationalCode: ''
      },
      Base_CommonEstate: {
        MainAddress: '',
        Telephone: '',
        PostCode: '',
        Plack: '',
        Vahed: '',
        FileIdMother: ''
      },
      Base_RegisterPlack_1: {
        CI_RegisterPlackTypeGroup: null,
        CI_RegisterPlackType: null,
        RegisterPlackTypeValue: null
      },
      Base_PreCodeInfo: {
        PreCode: null
      },
      Base_JobOwner: {
        OwnerName: null,
        OwnerLastName: null,
        JobUnitName: null,
        CI_JobName: null
      },
      // Base_SubScription: {
      //   CI_SubScriptionType: [0],
      //   SubScriptionVal: null
      // },
      Base_ShahrsaziArchive: {
        EumShahrsaziArchiveGroup: 0,
        CertificateNo: null,
        CertificateDate: null
      },
      currentTab: 'address',
      tabs: [
        { name: 'address', label: 'آدرس و مالک' },
        { name: 'registerPlaque', label: 'پلاک ثبتی' },
        { name: 'preCode', label: 'کد قدیم' },
        { name: 'job', label: 'شغلی' },
        { name: 'subscription', label: 'اشتراکات' },
        { name: 'exportation', label: 'گواهی ها و مجوزات' },
        { name: 'block', label: 'کد بلوک و ملک' }
      ],
      columns: [
        { field: 'OwnerName_Full', title: 'مالک' },
        { field: 'FullAddress', title: 'آدرس' },
        { field: 'NosaziCode', title: 'کد نوسازی' }
      ],
      skip: 0,
      take: 20,
      expansionState: true,
      pageable: {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: [10, 50, 75, 100, 150, 200, 300, 400],
        previousNext: true
      }
    }
  },

  computed: {
    totalRow () {
      return (this.SearchList[0] && this.SearchList[0].TotalCount) || 1
    },
    config () {
      return {
        config: {
          District: this.Base_NosaziCode.District
        }
      }
    },
    query () {
      return [
        'Base_NosaziCode',
        'Base_Info',
        'Base_Owner',
        'Base_JobInfo',
        'Base_CommonEstate',
        'Base_PreCodeInfo',
        'Base_RegisterPlack_1',
        'Base_JobOwner',
        'Base_SubScription',
        'Base_ShahrsaziArchive'
      ]
        .map(this.generateQuery)
        .filter(x => x)
        .join(' AND ')
    }
  },
  methods: {
    checkSelectable () {
      const existSelectColumn = this.columns.some(x => x.field === 'select')
      if (this.selectable && !existSelectColumn) {
        this.columns = [
          { field: 'select', title: 'انتخاب', cell: 'grid-actions' },
          ...this.columns
        ]
      }
    },
    generateQuery (scope) {
      if (scope === 'Base_RegisterPlack_1') {
        const conditions = []
        let counter = 1
        if (this.Base_RegisterPlack_1.CI_RegisterPlackTypeGroup) {
          conditions.push(
            `Base_RegisterPlack_${counter}.CI_RegisterPlackTypeGroup=N'Register_Asli'`
          )
          conditions.push(
            `Base_RegisterPlack_${counter}.RegisterPlackTypeValue Like N'%${this.Base_RegisterPlack_1.CI_RegisterPlackTypeGroup}%'`
          )
          counter += 1
        }
        if (this.Base_RegisterPlack_1.CI_RegisterPlackType) {
          conditions.push(
            `Base_RegisterPlack_${counter}.CI_RegisterPlackTypeGroup=N'Register_Fari'`
          )
          conditions.push(
            `Base_RegisterPlack_${counter}.RegisterPlackTypeValue Like N'%${this.Base_RegisterPlack_1.CI_RegisterPlackType}%'`
          )
          counter += 1
        }
        if (this.Base_RegisterPlack_1.RegisterPlackTypeValue) {
          conditions.push(
            `Base_RegisterPlack_${counter}.CI_RegisterPlackTypeGroup=N'Register_Ghete'`
          )
          conditions.push(
            `Base_RegisterPlack_${counter}.RegisterPlackTypeValue Like N'%${this.Base_RegisterPlack_1.RegisterPlackTypeValue}%'`
          )
          counter += 1
        }
        return conditions.join(' AND ')
      }
      return Object.keys(this[scope])
        .filter(
          key =>
            ['Base_NosaziCode', 'Base_Info'].includes(scope) || this[scope][key]
        )
        .map(key => this.sanitize(scope, key))
        .filter(x => x)
        .join(' AND ')
    },
    sanitize (scope, key, isEqual = this.isEqual) {
      let value = this[scope][key]
      if (!value && !['EumNosaziCodeGroup', 'EumBaseInfoGroup'].includes(key)) {
        return ''
      }
      let operand = isEqual ? '=' : 'LIKE'
      if (typeof value === 'string') {
        value = isEqual ? `N'${value}'` : `N'%${value}%'`
      } else if (Array.isArray(value)) {
        if (value.length === 0 || value.includes(0)) {
          // Empty arrays or [] or [0] or [1, 2, 0]
          return ''
        }
        value = `(${value.join(', ')})`
        operand = 'IN'
      } else {
        // Numbers
        value = isEqual ? `${value}` : `${value}`
        operand = '='
      }

      return `${scope}.${key} ${operand} ${value}`
    },
    generateColumns () {
      const statics = [
        { field: 'OwnerName_Full', title: 'مالک', width: 100 },
        { field: 'FullAddress', title: 'آدرس', width: 100 },
        { field: 'NosaziCode', title: 'کد نوسازی', width: 100 }
      ]
      if (this.selectedTables.includes('Base_PreCodeInfo')) {
        statics.push({
          field: 'PreCodeInfo_Full',
          title: 'کد شناسایی قدیم',
          width: 100
        })
      }
      if (this.selectedTables.includes('Base_JobInfo')) {
        statics.push({
          field: 'JobUnitName',
          title: 'نام واحد شغلی',
          width: 100
        })
      }
      if (this.selectedTables.includes('Base_SubScription')) {
        statics.push({
          field: 'SubScription_Full',
          title: 'اشتراکات',
          width: 100
        })
      }
      if (this.selectedTables.includes('Base_JobOwner')) {
        statics.push({
          field: 'JobOwner_Full',
          title: 'متصدی شغل',
          width: 100
        })
      }
      if (this.selectedTables.includes('Base_RegisterPlack_1')) {
        statics.push({
          field: 'RegisterPlack_Full',
          title: 'پلاک ثبتی',
          width: 100
        })
      }
      if (this.selectedTables.includes('Base_ShahrsaziArchive')) {
        statics.push({
          field: 'ShahrsaziArchive_Full',
          title: 'مجوزات',
          width: 100
        })
      }
      if (this.selectedTables.includes('PlackAbi')) {
        statics.push({ field: 'Plack', title: 'پلاک آبی', width: 100 })
      }
      if (this.selectedTables.includes('Base_File')) {
        statics.push({
          field: 'FileIdMother',
          title: 'شماره پرونده مادر',
          width: 100
        })
      }
      this.columns = statics
    },
    handleChangeTab () {
      if (this.currentTab === 'registerPlaque') {
        if (this.selectedTables.includes('Base_RegisterPlack') === false) {
          this.selectedTables.push('Base_RegisterPlack')
        }
      }

      if (this.currentTab === 'preCode') {
        if (this.selectedTables.includes('Base_PreCodeInfo') === false) {
          this.selectedTables.push('Base_PreCodeInfo')
        }
      }

      if (this.currentTab === 'job') {
        if (this.selectedTables.includes('Base_JobInfo') === false) {
          this.selectedTables.push('Base_JobInfo')
        }
      }

      if (this.currentTab === 'subscription') {
        if (this.selectedTables.includes('Base_SubScription') === false) {
          this.selectedTables.push('Base_SubScription')
        }
      }

      if (this.currentTab === 'exportation') {
        if (this.selectedTables.includes('Base_ShahrsaziArchive') === false) {
          this.selectedTables.push('Base_ShahrsaziArchive')
        }
      }
    },

    handleChangeField () {
      if (this.checkBase_PreCodeInfo === true) {
        if (this.selectedTables.includes('Base_PreCodeInfo') === false) {
          this.selectedTables.push('Base_PreCodeInfo')
        }
      } else {
        if (this.selectedTables.includes('Base_PreCodeInfo')) {
          this.selectedTables = this.selectedTables.filter(
            x => x !== 'Base_PreCodeInfo'
          )
        }
      }

      if (this.checkBase_JobInfo === true) {
        if (this.selectedTables.includes('Base_JobInfo') === false) {
          this.selectedTables.push('Base_JobInfo')
        }
      } else {
        if (this.selectedTables.includes('Base_JobInfo')) {
          this.selectedTables = this.selectedTables.filter(
            x => x !== 'Base_JobInfo'
          )
        }
      }

      if (this.checkBase_SubScription === true) {
        if (this.selectedTables.includes('Base_SubScription') === false) {
          this.selectedTables.push('Base_SubScription')
        }
      } else {
        if (this.selectedTables.includes('Base_SubScription')) {
          this.selectedTables = this.selectedTables.filter(
            x => x !== 'Base_SubScription'
          )
        }
      }

      if (this.checkBase_JobOwner === true) {
        if (this.selectedTables.includes('Base_JobOwner') === false) {
          this.selectedTables.push('Base_JobOwner')
        }
      } else {
        if (this.selectedTables.includes('Base_JobOwner')) {
          this.selectedTables = this.selectedTables.filter(
            x => x !== 'Base_JobOwner'
          )
        }
      }

      if (this.checkBase_RegisterPlack_1 === true) {
        if (this.selectedTables.includes('Base_RegisterPlack') === false) {
          this.selectedTables.push('Base_RegisterPlack')
        }
      } else {
        if (this.selectedTables.includes('Base_RegisterPlack')) {
          this.selectedTables = this.selectedTables.filter(
            x => x !== 'Base_RegisterPlack'
          )
        }
      }
      if (this.checkBase_ShahrsaziArchive === true) {
        if (this.selectedTables.includes('Base_ShahrsaziArchive') === false) {
          this.selectedTables.push('Base_ShahrsaziArchive')
        }
      } else {
        if (this.selectedTables.includes('Base_ShahrsaziArchive')) {
          this.selectedTables = this.selectedTables.filter(
            x => x !== 'Base_ShahrsaziArchive'
          )
        }
      }
      if (this.checkPlackAbi === true) {
        if (this.selectedTables.includes('PlackAbi') === false) {
          this.selectedTables.push('PlackAbi')
        }
      } else {
        if (this.selectedTables.includes('PlackAbi')) {
          this.selectedTables = this.selectedTables.filter(
            x => x !== 'PlackAbi'
          )
        }
      }
      if (this.checkBase_File === true) {
        if (this.selectedTables.includes('Base_File') === false) {
          this.selectedTables.push('Base_File')
        }
      } else {
        if (this.selectedTables.includes('Base_File')) {
          this.selectedTables = this.selectedTables.filter(
            x => x !== 'Base_File'
          )
        }
      }
    },

    handleBaseInfoChanged () {
      this.Base_NosaziCode.EumNosaziCodeGroup =
        this.baseInfoGroup === 1 ? 1 : 0
      this.Base_Info.EumBaseInfoGroup =
        this.baseInfoGroup === 1 ? 0 : this.baseInfoGroup
    },
    handleGridSelectedChanged (e) {
      this.selectedRecord = e.dataItem
      if (this.selectedRecord) {
        const {
          District,
          Region,
          Block,
          House,
          Building,
          Apartment,
          Shop
        } = this.selectedRecord
        this.selectedNosaziCode = {
          District,
          Region,
          Block,
          House,
          Building,
          Apartment,
          Shop
        }
      } else {
        this.selectedNosaziCode = null
      }
    },
    selectCurrentNosaziCode (event, dataItem, target) {
      this.selectedRecord = dataItem
      if (this.selectable) {
        const code = convertStringToNosaziCodeObject(event.dataItem.NosaziCode)
        this.$emit('selectNosaziCode', code)
      } else if (this.selectedNosaziCode) {
        this.parvandehDialogState = true
        // this.$router.push('/parvandeh/info')
      }
    },
    handleReset () {
      const model = {
        isEqual: false,
        selectedTables: ['Base_AddressInfo', 'Base_Owner'], // Fixed tables
        Base_Info: {
          EumBaseInfoGroup: 0
        },
        Base_NosaziCode: {
          EumNosaziCodeGroup: 0,
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        },
        Base_Owner: {
          OwnerName: '',
          OwnerLastName: '',
          OwnerFatherName: '',
          NationalCode: ''
        },
        Base_JobInfo: { JobUnitName: '', CI_JobName: null },
        Base_CommonEstate: {
          MainAddress: '',
          Telephone: '',
          PostCode: '',
          Plack: '',
          Vahed: '',
          FileIdMother: ''
        },
        Base_RegisterPlack_1: {
          CI_RegisterPlackTypeGroup: null,
          CI_RegisterPlackType: null,
          RegisterPlackTypeValue: null
        },
        Base_PreCodeInfo: {
          PreCode: null
        },
        Base_JobOwner: {
          OwnerName: null,
          OwnerLastName: null,
          JobUnitName: null,
          CI_JobName: null
        },
        Base_SubScription: {
          CI_SubScriptionType: [0],
          SubScriptionVal: null
        },
        Base_ShahrsaziArchive: {
          EumShahrsaziArchiveGroup: 0,
          CertificateNo: null,
          CertificateDate: null
        }
      }
      Object.keys(model).forEach(x => {
        this[x] = model[x]
      })
    },
    handlePageChange (e) {
      this.skip = e.page.skip
      this.take = e.page.take
      this.load()
    },
    async load () {
      if (!this.Base_NosaziCode.District) {
        return this.showError('لطفا منطقه را برای کدنوسازی تعیین نمایید')
      }

      try {
        this.showLoading()
        const { data } = await this.$services.SA.search(
          {
            pDistrict: this.Base_NosaziCode.District,
            pSelectedTables: this.selectedTables.toString(),
            pWhere: this.query,
            pFromRow: this.skip,
            pToRow: this.skip + this.take
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          const strNosaziCode = convertNosaziCodeObjectToString(this.Base_NosaziCode)
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            nosaziCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی'
          })
          this.SearchList = this.result.data.SearchList.sort((x, y) =>
            compareNosaziCodeObjects(x, y)
          )
          this.SearchList = this.result.data.SearchList.sort((x, y) =>
            compareNosaziCodeObjects(x, y)
          )
        } else {
          this.showError('انجام نشد')
        }
        this.generateColumns()

        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },
    show () {
      if (this.showFields) {
        this.showFields = false
      } else {
        this.showFields = true
      }
    }
  },
  mounted () {
    // this.generateColumns()
    this.checkSelectable()
    this.Base_NosaziCode = { ...this.Base_NosaziCode, District: 0 }
  },
  watch: {
    selectable () {
      this.checkSelectable()
    },
    displayedFieldObj: {
      handler (val) {
        this.handleChangeField()
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.nosazi-code-search-accardeon .q-card {
  box-shadow: none !important;
}

</style>
