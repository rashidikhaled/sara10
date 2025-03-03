<template>
  <safa-form
    id="2b52adb7-b56c-4ff0-8f06-62025acba706"
    caption="لیست سیاه بر اساس کد ملی"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      :hasFooter="true"
      :padding="false"
      title=" لیست سیاه بر اساس کد ملی"
      vertical
    >

      <safa-status :result="result"/>
      <expantion-section v-model="expansionState" default-opened title="جستجو">
        <safa-group label-width="79px">
          <safa-combo-enum
            v-model="selectedContact"
            cdcName="OwnerCharacter"
            enum-name="EumOwnerCharacter"
            label="شخصیت"
            label-width="79px"
          >
          </safa-combo-enum>
          <safa-text
            v-model="nationalCode"
            :rules="[(val) => val.length <= 10 || 'کد ملی وارد شده درست نیست']"
            cdcName="nationalCode"
            label="کد ملی "
            type="number"
          >
          </safa-text>
          <safa-combo
            v-model="entryCause"
            cdcName="entryCause"
            ciName="CI_BlackListCause"
            domainName="CI_SaraM1"
            label="علت ورود"
          ></safa-combo>
          <safa-text
            v-model="importerUser"
            :label-width="$q.screen.gt.xs ? '79px' : 'auto'"
            cdcName="importerUser"
            label=" کاربر وارد کننده به لیست"
          >
          </safa-text>
          <safa-datepicker
            v-model="entryDateFrom"
            cdcName="entryDateFrom"
            label="تاریخ ورود از"
          >
          </safa-datepicker>
          <safa-datepicker
            v-model="entryDateTo"
            cdcName="entryDateTo"
            label="تا تاریخ"
          >
          </safa-datepicker>
          <safa-text
            v-model="outgoingUser"
            :label-width="$q.screen.gt.xs ? '79px' : 'auto'"
            cdcName="outgoingUser"
            label="کاربر خارج کننده از لیست"
          >
          </safa-text>
          <safa-datepicker
            v-model="exitDateFrom"
            cdcName="exitDateFrom"
            label="تاریخ خروج از"
          >
          </safa-datepicker>
          <safa-datepicker
            v-model="exitDateTo"
            cdcName="exitDateTo"
            label="تا تاریخ"
          >
          </safa-datepicker>
        </safa-group>
        <div class="flex q-gutter-x-sm justify-end">
          <btn-search @click="search"/>
          <btn-delete @click="cancel"/>
          <!-- </div> -->
        </div>
      </expantion-section>
      <!-- <internal-section class="fit"> -->
      <div class="flex q-gutter-sm justify-end q-mb-sm q-mr-sm">
        <btn-default
          label="خروج از لیست سیاه"
          spCaption="خروج از لیست سیاه"
          spId="808614a0-34f6-47e7-88dd-1a5ce3ba9f4c"
          @click="exitBlackList"
        />
        <span>
          <btn-default label="بازآوری" @click="reLoad"/>
        </span>
      </div>
      <!-- :columns="columns" -->

      <safa-datatable
        ref="grid2"
        v-model="results.BlackListNationalCode"
        cdcName="blackListNationalCode"
        class="fit q-mb-sm"
        filterable
        :allowMultipleSelection="false"
        helper="blackListNationalCode"
        fit
        height="100%"
        m="r"
        title="لیست سیاه بر اساس کد ملی"
        @selectedChange="selectedRowHandler"
      />
      <!-- </internal-section> -->
    </form-wrapper>
  <safa-popup
      title="خزوج از لیست سیاه با کد ملی"
      v-model="showExitpanel"
      width="800px"
      height="400px"
    >
      <ExitBlackListBasedOnNationalCode
        v-model="this.selectedRow"
        @hide="showExitpanel = false"
      />
    </safa-popup>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import ExitBlackListBasedOnNationalCode from './partials/ExitBlackListBasedOnNationalCode.vue'
// import { convertNosaziCodeObjectToString } from '../../../../utils/nosaziCodeOperation'

export default {
  route: '/black-list/BlackListBasedOnNationalCode',
  components: { ExitBlackListBasedOnNationalCode },
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'لیست سیاه براساس کد ملی',
      formKey: '2b52adb7-b56c-4ff0-8f06-62025acba706',
      name: 'BlackListBasedOnNationalCode',
      main: true,
      sidebarCompatible: true,
      exitBlackListStatus: false,
      entryDateFrom: '',
      entryDateTo: '',
      exitDateFrom: '',
      expansionState: true,
      exitDateTo: '',
      outgoingUser: '',
      importerUser: '',
      entryCause: 0,
      nationalCode: '',
      showExitpanel: false,
      result: null,
      results: { BlackListNationalCode: [] },
      baseLibResult: null,
      selectedRow: null,
      reLoadClick: false,

      contactList: [
        { ID: 1, Title: 'حقیقی' },
        { ID: 2, Title: 'حقوقی' }
      ],
      selectedContact: null
      // ,
      // strNosaziCode: ''
    }
  },
  methods: {
    load () {
      this.showLoading()
      let conditionStr = ''
      let data = {}

      if (this.importerUser !== '' && conditionStr !== '') {
        conditionStr += ' And  UserEnter Like \'%' + this.importerUser + '%\''
      } else if (this.importerUser !== '') {
        conditionStr = 'Where  UserEnter Like \'%' + this.importerUser + '%\''
      }
      if (
        this.entryDateFrom !== '' &&
        this.entryDateTo !== '' &&
        conditionStr !== ''
      ) {
        conditionStr +=
          ' And EnterDate between \'' +
          this.entryDateFrom +
          '\' and \'' +
          this.entryDateTo +
          '\''
      } else if (this.entryDateFrom !== '' && this.entryDateTo !== '') {
        conditionStr =
          'Where EnterDate between \'' +
          this.entryDateFrom +
          '\' and \'' +
          this.entryDateTo +
          '\''
      }
      if (
        this.exitDateFrom !== '' &&
        this.exitDateTo !== '' &&
        conditionStr !== ''
      ) {
        conditionStr +=
          ' And ExitDate between \'' +
          this.exitDateFrom +
          '\' and \'' +
          this.exitDateTo +
          '\''
      } else if (this.exitDateFrom !== '' && this.exitDateTo !== '') {
        conditionStr =
          'Where ExitDate between \'' +
          this.exitDateFrom +
          '\' and \'' +
          this.exitDateTo +
          '\''
      }
      if (this.outgoingUser !== '' && conditionStr !== '') {
        conditionStr += ' And  UserExit Like \'%' + this.outgoingUser + '%\''
      } else if (this.outgoingUser !== '') {
        conditionStr = 'Where  UserExit Like \'%' + this.outgoingUser + '%\''
      }
      if (this.entryCause !== 0 && conditionStr !== '') {
        conditionStr += ' And CI_BlackListCause = ' + this.entryCause
      } else if (this.entryCause !== 0) {
        conditionStr = ' Where CI_BlackListCause = ' + this.entryCause
      }
      if (this.nationalCode !== '' && conditionStr !== '') {
        conditionStr += ' And  NationalCode Like\'%' + this.nationalCode + '%\''
      } else if (this.nationalCode !== '') {
        conditionStr = 'Where  NationalCode Like\'%' + this.nationalCode + '%\''
      }
      if (this.selectedContact !== null && conditionStr !== '') {
        conditionStr += ' And  EumOwner = ' + this.selectedContact
      } else if (this.selectedContact !== null) {
        conditionStr = 'Where   EumOwner =  ' + this.selectedContact
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
          pWhere: ''
        }
      } else {
        data = {
          pFromRow: 0,
          pToRow: 100,
          pWhere: conditionStr
        }
      }
      this.$services.SA.getBlackListNationalCode(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            this.results.BlackListNationalCode.map((x) => {
              if (x.EumBlackListStatus === 0) {
                x.class = 'enter-black-list'
              }
              if (x.EumBlackListStatus === 1) {
                x.class = 'exit-black-list'
              }
            })
            if (this.reLoadClick) {
              this.reLoadClick = false
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidNosaziCode,
              bizCodeTitle: 'nidNosaziCode'
            })
          }
        })
        .catch((response) => {
          console.debug('loading error ....', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    search () {
      this.load()
    },
    cancel () {
      this.entryDateFrom = ''
      this.entryDateTo = ''
      this.exitDateFrom = ''
      this.exitDateTo = ''
      this.nationalCode = ''
      this.importerUser = ''
      this.outgoingUser = ''
      this.entryCause = 0
      this.selectedContact = null
    },
    selectedRowHandler
    (e) {
      this.selectedRow = null
      this.$nextTick(() => {
        const rows = e.selectedItems
        if (rows.length > 0) {
          this.selectedRow = rows[0]
          this.NidNosaziCode = this.selectedRow.NidNosaziCode
          this.NidBlack = this.selectedRow.NidBlack
          if (this.selectedRow.EumBlackListStatus === 1) {
            this.exitBlackListStatus = true
          } else if (this.selectedRow.EumBlackListStatus === 0) {
            this.exitBlackListStatus = false
          }
        }
      })
    },
    exitBlackList () {
      if (this.selectedRow === null) {
        this.showError('لطفا ابتدا یک مورد از لیست انتخاب نمایید.')
      } else {
        if (this.exitBlackListStatus) {
          this.showError('مورد انتخاب شده قبلا از لیست سیاه خارج شده است.')
        } else {
          this.showExitpanel = true
        }
      }
    },
    reLoad () {
      this.reLoadClick = true
      this.cancel()
      this.load()
    },
    changeStatus () {
      this.changeStatusForm = true
      this.blackListForm = false
    },
    backToBlackListForm (val) {
      if (val) {
        this.blackListForm = true
        this.exitBlackListForm = false
        this.load()
      }
    }
  },
  mounted () {
    // this.strNosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
    this.load()
  }
}
</script>
