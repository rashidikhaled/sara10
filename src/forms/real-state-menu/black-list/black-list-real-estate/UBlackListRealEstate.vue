<template>
  <safa-form :id="formKey" :caption="title"   appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper  :padding="false" :title="title">
      <fit>
        <safa-status :result="baseLibResult" />
        <safa-status :result="result" />
        <expantion-section
          v-model="expansionState"
          default-opened
          title="جستجو"
        >
          <FormRow >
            <FormControl>
              <safa-datepicker
                v-model="EnterDate"
                cdcName="EnterDate"
                label="تاریخ ورود به لیست"
                label-width="95px"
              >
              </safa-datepicker>
            </FormControl>
            <FormControl>
              <safa-datepicker
                v-model="ExitDate"
                cdcName="ExitDate"
                label="تاریخ خروج از لیست"
                label-width="95px"
              >
              </safa-datepicker>
            </FormControl>
            <FormControl>
              <safa-text
                v-model="txtEnterUser"
                cdcName="txtEnterUser"
                label=" کاربر وارد کننده به لیست"
                label-width="95px"

              >
              </safa-text>
            </FormControl>
            <FormControl>
              <safa-text
                v-model="txtExitUser"
                cdcName="txtExitUser"
                label="کاربر خارج کننده از لیست"
                label-width="95px"

              >
              </safa-text>
            </FormControl>
            <FormControl>
              <safa-combo
                v-model="entryCause"
                cdcName="entryCause"
                ciName="CI_BlackListCause"
                domainName="CI_SaraM1"
                label="علت ورود"
                label-width="95px"

              ></safa-combo>
            </FormControl>
            <div class="flex q-col-gutter-x-sm">
              <safa-label class="q-pt-sm q-mr-md">کد نوسازی</safa-label>
              <nosazi-code-input
                v-model="baseNosaziCode"
                :actions="true"
                cdcName="baseNosaziCode"
                label-width="95px"

              />
            </div>
          </FormRow>
          <div class="flex q-gutter-x-sm justify-end">
            <btn-search @click="search" />
            <btn-delete label="پاک کردن" @click="cancle" />
          </div>
        </expantion-section>

        <div class="row q-mb-sm q-gutter-sm justify-between">
          <safa-combo
            v-model="selectedRegion"
            :options="districts"
            cdcName="Region"
            class="col-md-3 q-px-sm"
            label="منطقه"
            label-width="80px"
            source-type="local"
          />
          <div class="flex col q-col-gutter-x-md">
            <safa-checkbox
              v-model="allDomain"
              cdcName="allDomain"
              label="نمایش تمام دامنه ها"
            />
          </div>
          <div
            class="flex col-auto q-mr-sm q-gutter-x-sm items-center justify-end"
          >

            <btn-default
              label="خروج از لیست سیاه"
              @click="exitBlackList"
              spCaption="خروج از لیست سیاه"
              spId="c462253d-fa03-484c-9877-9869ac862ad0"
            />
            <btn-default label="بازآوری" @click="reLoad" />
          </div>
        </div>
        <!-- <fit> -->
        <safa-datatable
          ref="grid2"
          v-model="results.BlackList"
          :addRow="false"
          :allowCopy="false"
          :deleteRow="false"
          :filterable="true"
          :paginate="false"
          cdcName="blackList"
          class="fit"
          height="100%"
          :columns="columns"
          m="r"
          maxHeight="100%"
          title="لیست سیاه"
          @selectedChange="selectedChange"
        />
        <!-- </div> -->
        <!-- </fit> -->
        <!-- </div> -->
      </fit>
    </form-wrapper>

    <safa-popup v-model="exitBlackListForm">
      <ExitBlackList
        :baseNosaziCodeFromParent="baseNosaziCode"
        :entryCause="selectedRow.CI_BlackListCause"
        :formKey="formKey"
        :name="name"
        :nidBlack="selectedRow.NidBlack"
        :nidNosaziCode="nidNosaziCode"
        :nosaziCode="selectedRow.NosaziCode"
        :taskInfo="selectedRow"
        :title="title"
        @backToBlackListForm="backToBlackListForm"
      />
    </safa-popup>
    <safa-popup v-model="changeStatusForm">
      <ChangeStatusBlackList
        :baseNosaziCodeFromParent="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :nidBlack="selectedRow.NidBlack"
        :nidNosaziCode="nidNosaziCode"
        :nosaziCode="selectedRow.NosaziCode"
        :taskInfo="selectedRow"
        :title="title"
        @backToBlackListForm="backToBlackListForm"
      />
    </safa-popup>
  </safa-form>
</template>
<script>
import ExitBlackList from "./partials/ExitBlackList.vue"
import ChangeStatusBlackList from "./partials/ChangeStatusBlackList.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "../../../../utils/nosaziCodeOperation"

export default {
  route: "/black-list/BlackList",
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: "لیست سیاه",
      formKey: "36C4810C-70F6-4929-9029-A3D2B8C8FCC1",
      name: "UBlackListRealEstate",
      main: true,
      columns: [
        {
          field: "EumBlackListStatus",
          title: "",
          width: "30px",
          cell: "GridBlackListStatus"

        },
        {
          field: "EumBlackListControl",
          title: "",
          width: "30px",
          cell: "GridBlackListControl"
        },

        {
          field: "NosaziCode",
          title: "کد نوسازی",
          width: "150px"
        },
        {
          field: "CI_BlackListCause",
          title: "علت ورود به لیست سیاه",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        // {
        //   field: "Domain",
        //   title: "دامنه",
        //   width: "90px"
        // },
        {
          field: "EnterDate",
          title: "تاریخ ورود به لیست",
          editor: "date",
          width: "120px"
        },
        {
          field: "EnterTime",
          title: "ساعت ورود به لیست",
          width: "120px"
        },
        {
          field: "UserEnter",
          title: "کاربر وارد کننده به لیست",
          width: "190px"
        },
        {
          field: "EnterComments",
          title: "توضیحات ورود",
          width: "400px"
        },
        {
          field: "ExitDate",
          title: "تاریخ خروج از لیست",
          editor: "date",
          width: "130px"
        },
        {
          field: "ExitTime",
          title: "ساعت خروج از لیست",
          width: "130px"

        },
        {
          field: "UserExit",
          title: "کاربر خارج کننده از لیست",
          width: "190px"
        },
        {
          "field": "ExitComments",
          "title": "توضیحات خروج",
          "width": "400px"
        }
      ],
      sidebarCompatible: true,
      allDomain: true,
      exitBlackListStatus: false,
      exitBlackListForm: false,
      changeStatusForm: false,
      blackListForm: true,
      expansionState: true,
      EnterDate: "",
      ExitDate: "",
      txtExitUser: "",
      txtEnterUser: "",
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
      selectedRegion: 1,
      result: null,
      results: { BlackList: [] },
      baseLibResult: null,
      selectedRow: {},
      reLoadClick: false,
      nidNosaziCode: "00000000-0000-0000-0000-000000000000"
    }
  },
  components: {
    ExitBlackList,
    ChangeStatusBlackList
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
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
      let conditionStr = ""
      let data = {}
      if (this.baseNosaziCode.District !== 0) {
        districtStr = "District = " + this.baseNosaziCode.District
        conditionStr = "Where " + districtStr
      } else if (this.baseNosaziCode.District === 0) {
        conditionStr = "Where District =  " + this.selectedRegion
      }
      if (this.baseNosaziCode.Region !== 0) {
        regionStr = "Region = " + this.baseNosaziCode.Region
        conditionStr += "  AND " + regionStr
      } else {
        regionStr = ""
      }
      if (this.txtEnterUser !== "") {
        conditionStr += " And  UserEnter Like '%" + this.txtEnterUser + "%' "
      }
      if (this.baseNosaziCode.Block !== 0) {
        blockStr = "Block = " + this.baseNosaziCode.Block
        conditionStr += "  AND  " + blockStr
      } else {
        blockStr = ""
      }
      if (this.baseNosaziCode.House !== 0) {
        hoseStr = "House = " + this.baseNosaziCode.House
        conditionStr += "  AND  " + hoseStr
      } else {
        hoseStr = ""
      }
      if (this.baseNosaziCode.Building !== 0) {
        buildingStr = "Building = " + this.baseNosaziCode.Building
        conditionStr += "  AND  " + buildingStr
      } else {
        buildingStr = ""
      }
      if (this.baseNosaziCode.Apartment !== 0) {
        apartmentStr = "Apartment = " + this.baseNosaziCode.Apartment
        conditionStr += "  AND " + apartmentStr
      } else {
        apartmentStr = ""
      }
      if (this.baseNosaziCode.Shop !== 0) {
        shopStr = "Shop = " + this.baseNosaziCode.Shop
        conditionStr += " AND " + shopStr
      } else {
        shopStr = ""
      }

      if (this.txtExitUser !== "") {
        conditionStr += " And  UserExit Like '%" + this.txtExitUser + "%'"
      }
      if (this.entryCause !== 0) {
        conditionStr += " And CI_BlackListCause = " + this.entryCause
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
          pWhere: "",
          pNationalCode: ""
        }
      } else {
        data = {
          pFromRow: 0,
          pToRow: 100,
          pWhere: conditionStr
        }
      }
      this.$services.SA.getBlackList(data, {
        config: { District: this.selectedRegion }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            // this.results.BlackList=[{NosaziCode:'',CI_BlackListCause:0,EumBlackListStatus:0}]
            this.results.BlackList.map((x) => {
              if (x.EumBlackListStatus === 0) {
                x.class = "shahrsazi-enter-black-list"
              }
              if (x.EumBlackListStatus === 1) {
                x.class = "shahrsazi-exit-black-list"
              }
            })
            if (this.reLoadClick) {
              this.reLoadClick = false
            }

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              saveDesc: `نمایش اطلاعات فرم لیست سیاه برای ${strNosaziCode} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleBaseNosaziCodeChanged () {
      // getBaseLibInNosaziCode method
      let self = this
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(async ({ data }) => {
          self.baseLibResult = this.getResponse(data)
          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data
          }
        })
        .catch((e) => {
          console.error(e)
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
      this.EnterDate = ""
      this.ExitDate = ""
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.txtEnterUser = ''
      this.txtExitUser = ""
      this.entryCause = 0
    },
    selectedChange (e) {
      this.selectedRow = e.dataItem
      this.nidNosaziCode = this.selectedRow.NidNosaziCode
      if (this.selectedRow.EumBlackListStatus === 0) {
        this.exitBlackListStatus = true
      } else if (this.selectedRow.EumBlackListStatus === 1) {
        this.exitBlackListStatus = false
      }
    },

    exitBlackList () {
      if (this.selectedRow === {}) {
        this.showError("لطفا ابتدا یک مورد از لیست انتخاب نمایید.")
      } else {
        if (this.selectedRow.EumBlackListStatus === 1) {
          this.showError("مورد انتخاب شده قبلا از لیست سیاه خارج شده است.")
        } else {
          this.exitBlackListForm = true
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
    },
    backToBlackListForm (val) {
      if (val) {
        if (this.exitBlackListForm) {
          this.exitBlackListForm = false
          this.blackListForm = true
        }
        if (this.changeStatusForm) {
          this.changeStatusForm = false
          this.blackListForm = true
        }

        this.load()
      }
    }
  },
  mounted () {
    this.load()
  },
  watch: {
    selectedRegion () {
      this.load()
    }
  }
}
</script>
