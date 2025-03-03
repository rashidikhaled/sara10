<template>
  <safa-form
    :id="formKey"
    :caption="title"
     appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      v-if="ExitBlackListCommissionForm"
      :hasFooter="false"
      :title="title"
      vertical
    >
      <template #header>
        <safa-status :result="baseLibResult"/>
        <safa-status :result="result"/>
      </template>
      <fit>

        <safa-group label-width="80px">
          <safa-datepicker
            v-model="entryDateFrom"
            cdcName="entryDateFrom"
            label="تاریخ ورود از"
            locale="fa"
          />
          <safa-datepicker
            v-model="entryDateTo"
            cdcName="entryDateTo"
            label="تا"
            locale="fa"
          />
          <safa-text
            v-model="importerUser"
            cdcName="importerUser"
            label=" کاربر وارد کننده به لیست"
          />
          <safa-datepicker
            v-model="exitDateFrom"
            cdcName="exitDateFrom"
            label="تاریخ خروج از"
            locale="fa"
          />
          <safa-datepicker
            v-model="exitDateTo"
            cdcName="exitDateTo"
            label="تا"
            locale="fa"
          />
          <safa-text
            v-model="outgoingUser"
            cdcName="outgoingUser"
            label="کاربر خارج کننده از لیست"
          />
          <safa-combo
            v-model="entryCause"
            cdcName="entryCause"
            ciName="CI_BlackListCause"
            domainName="CI_SaraM1"
            label="علت ورود"
          />
          <safa-text
            v-model="nationalCode"
            :rules="[ val => val.length <= 10 || ('کد ملی وارد شده درست نیست')]"
            cdcName="nationalCode"
            label="کد ملی "
            type="number"
          />
          <div class="flex q-col-gutter-x-sm">
            <safa-label class="q-pt-sm q-mr-md">کد نوسازی</safa-label>
            <nosazi-code-input
              v-model="baseNosaziCode"
              :actions="true"
              cdcName="baseNosaziCode"
              @enter="load"
            />
          </div>
        </safa-group>
        <fit>
          <safa-datatable
            ref="grid2"
            v-model="results.BlackList"
            cdcName="blackList"
            fit
            height="100%"
            helper="blackList"
            max-height="100%"
            title="لیست سیاه"
            @row-click="selectedChange"
          >
          </safa-datatable>
        </fit>
      </fit>
      <template v-slot:footer>
        <FormActions :showEditButton="false">
          <btn-search @click="search"/>
          <btn-delete @click="cancle"/>
          <btn-cancel
            label="خروج از لیست سیاه"
            @click="exitBlackList"
          />
          <btn-default
            label="بازآوری"
            @click="reLoad"
          />
        </FormActions>
      </template>
    </form-wrapper>
    <div v-if="exitBlackListForm">
      <ExitBlackList
        :entryCause="selectedRow.CI_BlackListCause"
        :formKey="formKey"
        :name="name"
        :nidBlack="selectedRow.NidBlack"
        :nidNosaziCode="nidNosaziCode"
        :nosaziCode="selectedRow.NosaziCode"
        :title="title"
        @backToBlackListForm="backToBlackListForm"
      />
    </div>
    <div v-if="changeStatusForm">
      <ChangeStatusBlackList
        :formKey="formKey"
        :name="name"
        :nidBlack="selectedRow.NidBlack"
        :nidNosaziCode="nidNosaziCode"
        :nosaziCode="selectedRow.NosaziCode"
        :title="title"
        @backToBlackListForm="backToBlackListForm"
      />
    </div>
  </safa-form>
</template>
<script>
import ExitBlackList from './partials/ExitBlackList.vue'
import ChangeStatusBlackList from './partials/ChangeStatusBlackList.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/commission77/exit-blacklist-commission',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'خروج از لیست سیاه کمیسیون 77',
      formKey: '87917171-9369-4EDA-8BA5-BF3ECD04C437',
      name: 'ExitBlackListCommission',
      main: true,
      sidebarCompatible: true,
      ExitBlackListCommissionForm: true,
      exitBlackListForm: false,
      changeStatusForm: false,
      entryDateFrom: '',
      entryDateTo: '',
      exitDateFrom: '',
      exitDateTo: '',
      outgoingUser: '',
      importerUser: '',
      entryCause: 0,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nationalCode: '',
      result: null,
      results: { BlackList: [] },
      baseLibResult: null,
      selectedRow: null,
      reLoadClick: false,
      nidNosaziCode: '00000000-0000-0000-0000-000000000000'
    }
  },
  components: {
    ExitBlackList,
    ChangeStatusBlackList
  },
  methods: {
    load () {
      this.showLoading()
      let districtStr
      let regionStr
      let blockStr
      let hoseStr
      let buildingStr
      let apartmentStr
      let shopStr
      let conditionStr = ''
      let data = {}
      if (this.baseNosaziCode.District !== 0) {
        districtStr = 'District = ' + this.baseNosaziCode.District
        conditionStr = 'Where  Domain= \'Commission77\' And  ' + districtStr
      } else if (this.baseNosaziCode.District === 0) {
        conditionStr = 'Where District = 1  And  Domain= \'Commission77\''
      }
      if (this.baseNosaziCode.Region !== 0) {
        regionStr = 'Region = ' + this.baseNosaziCode.Region
        conditionStr += '  AND ' + regionStr
      } else {
        regionStr = ''
      }
      if (this.baseNosaziCode.Block !== 0) {
        blockStr = 'Block = ' + this.baseNosaziCode.Block
        conditionStr += '  AND  ' + blockStr
      } else {
        blockStr = ''
      }
      if (this.baseNosaziCode.House !== 0) {
        hoseStr = 'House = ' + this.baseNosaziCode.House
        conditionStr += '  AND  ' + hoseStr
      } else {
        hoseStr = ''
      }
      if (this.baseNosaziCode.Building !== 0) {
        buildingStr = 'Building = ' + this.baseNosaziCode.Building
        conditionStr += '  AND  ' + buildingStr
      } else {
        buildingStr = ''
      }
      if (this.baseNosaziCode.Apartment !== 0) {
        apartmentStr = 'Apartment = ' + this.baseNosaziCode.Apartment
        conditionStr += '  AND ' + apartmentStr
      } else {
        apartmentStr = ''
      }
      if (this.baseNosaziCode.Shop !== 0) {
        shopStr = 'Shop = ' + this.baseNosaziCode.Shop
        conditionStr += ' AND ' + shopStr
      } else {
        shopStr = ''
      }
      if (this.importerUser !== '') {
        conditionStr += ' And  UserEnter Like \'%' + this.importerUser + '%\' '
      }
      if (this.entryDateFrom !== '' && this.entryDateTo !== '') {
        conditionStr +=
          ' And EnterDate between \'' +
          this.entryDateFrom +
          '\' and \'' +
          this.entryDateTo +
          '\' '
      }
      if (this.exitDateFrom !== '' && this.exitDateTo !== '') {
        conditionStr +=
          ' And ExitDate between \'' +
          this.exitDateFrom +
          '\' and \'' +
          this.exitDateTo +
          '\' '
      }
      if (this.outgoingUser !== '') {
        conditionStr += ' And  UserExit Like \'%' + this.outgoingUser + '%\''
      }
      if (this.entryCause !== 0) {
        conditionStr += ' And CI_BlackListCause = ' + this.entryCause
      }
      // if (this.nidWorkItem !== '' && conditionStr !== '') {
      //   conditionStr += ' AND ' + ' NidWorkItem = ' + this.nidWorkItem
      // } else if (this.nidWorkItem !== '') {
      //   conditionStr = 'where' + ' NidWorkItem = ' + this.nidWorkItem
      // }
      if (this.reLoadClick) {
        data = {
          pFromRow: 0,
          pToRow: 100,
          pWhere: 'Where District = 1  And  Domain= \'Commission77\'',
          pNationalCode: ''
        }
      } else {
        data = {
          pFromRow: 0,
          pToRow: 100,
          pWhere: conditionStr,
          pNationalCode: this.nationalCode
        }
      }
      this.$services.SA.getBlackList(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            if (this.reLoadClick) {
              this.reLoadClick = false
            }
            await this.log({
              action: this.logActions.view,
              bizCode: conditionStr,
              bizCodeTitle: 'conditionStr'
            })
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    search () {
      this.load()
    },
    cancle () {
      this.entryDateFrom = ''
      this.entryDateTo = ''
      this.exitDateFrom = ''
      this.exitDateTo = ''
      this.nationalCode = ''
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.importerUser = ''
      this.outgoingUser = ''
      this.entryCause = 0
    },
    selectedChange (row) {
      this.selectedRow = row
      this.nidNosaziCode = this.selectedRow.NidNosaziCode
    },

    exitBlackList () {
      if (this.selectedRow === null) {
        this.showError('لطفا ابتدا یک مورد از لیست انتخاب نمایید.')
      } else {
        if (this.selectedRow.EumBlackListStatus === 1) {
          this.showError('مورد انتخاب شده قبلا از لیست سیاه خارج شده است.')
        } else {
          // this.showSuccess('خروج از لیست سیاه با موفقیت انجام شد.')
          this.ExitBlackListCommissionForm = false
          this.exitBlackListForm = true
          // this.hideSidebar('ExitBlackListCommission')
        }
      }
    },
    reLoad () {
      this.reLoadClick = true
      this.cancle()
      this.load()
    },
    changeStatus () {
      this.changeStatusForm = true
      this.ExitBlackListCommissionForm = false
    },
    backToBlackListForm (val) {
      if (val) {
        this.ExitBlackListCommissionForm = true
        this.exitBlackListForm = false
        this.load()
      }
    }
  },
  mounted () {
    this.load()
  }
}
</script>
