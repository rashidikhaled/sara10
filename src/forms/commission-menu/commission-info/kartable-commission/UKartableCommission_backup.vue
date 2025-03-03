<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper
    :title="title"
    fullscreen
    hide-title
    hide-close
    :padding="false"
  >
    <div class="tab-kartable fit">
      <safa-splitter
        :limits="splitterLimit"
        class="fit"
        horizontal
        margin="0"
        v-model="splitterValue"
      >
        <template v-slot:before>
          <fit>
            <!--            <safa-datatable
                          title="کارتابل کمیسیون"
                          height="100%"
                          maxHeight="100%"
                          minHeight="300px"
                          m="r"
                          :show-selected-checkbox="false"
                          :allowMultipleSelection="false"
                          :addRow="false"
                          :deleteRow="false"
                          :allowCopy="false"
                          selectable
                          fit
                          :columns="commissionsKartablColumns"
                          v-model="commissionsKartablResult"
                          @selectedChange="selectedChange"
                          :customButtons="customButtons"
                          :show-row-number="false"
                          :settings="true"
                          paginate
                          :lazyLoad="false"
                          @updatePagination="updatePagination"
                          :take="take"
                          :countData="totalItems"
                          serve-side
                          :perPage="[20]"
                          :serverServe="true"
                        />-->
            <div id="ck-grid">
              <div class="ckg-header-clipper" style="padding: 0 5px">
                <div
                  class="ckg-header q-pa-sm flex no-wrap"
                  :style="{ minWidth: `${viewportWidth + 10}px` }"
                >
                  <div
                    v-for="(col, colIndex) in commissionsKartablColumns"
                    :key="`${col.field}_${colIndex}`"
                    class="ckg__col"
                    :style="{ minWidth: parseInt(`${col.width || 70}`) + 'px' }"
                  >
                    <template v-if="col.field === 'Header'">
                      <div class="q-px-sm">
                        <CKRActions
                          @refresh="loadData"
                          @back="prevStep"
                          @send="nextStep"
                          @gardeshParvandeh="toggleGardeshParvandehVisible"
                        />
                      </div>
                    </template>
                    <template v-else>{{ col.title }}</template>
                  </div>
                </div>
              </div>
              <div class="ckg-body" @scroll="scrollEvent">
                <q-intersection
                  v-for="row in commissionsKartablResult"
                  :key="row.NidCommission"
                  transition="fade"
                  class="ckrow_wrap"
                  once
                >
                  <CKRow
                    @row:click="rowClickHandler"
                    @update:expandable="
                      updateExpandable({ row, status: $event })
                    "
                    @update:selected="updateSelected({ row, value: $event })"
                    @showNote="noteDialog = true"
                    :row="row"
                    :style="{ minWidth: `${viewportWidth}px` }"
                    :rowBgColor="rowBgColor(row)"
                  />
                </q-intersection>
              </div>
              <div
                :class="[
                  'ckg-footer flex items-center justify-center q-gutter-x-sm',
                  $q.dark.isActive ? 'bg-dark' : 'bg-grey-3'
                ]"
              >
                <div>
                  <q-btn
                    flat
                    round
                    size="md"
                    :disable="page <= 1"
                    :color="page <= 1 ? 'grey' : 'primary'"
                    icon="keyboard_arrow_right"
                    dense
                    @click="prevPage"
                  />
                </div>
                <div>تعداد کل: {{ totalItems }} سطر</div>
                <!-- <div>تعداد کل: {{ commissionsKartablResult.length }} سطر</div> -->
                <div style="height: 12px">
                  <q-separator style="height: 12px" vertical />
                </div>
                <div>
                  صفحه:
                  <select
                    v-model.number="page"
                    style="min-width: 60px"
                    :class="$q.dark.isActive ? 'bg-dark text-white' : ''"
                  >
                    <option :value="p" v-for="p in pages" :key="`p_${p}`">
                      {{ p }}
                    </option>
                  </select>
                </div>
                <div style="height: 12px">
                  <q-separator style="height: 12px" vertical />
                </div>
                <div>
                  تعداد نمایش:
                  <select
                    style="min-width: 60px"
                    :class="[
                      'take_paginate',
                      { 'bg-dark text-white': $q.dark.isActive }
                    ]"
                    :value="take"
                    @input="updatePaginateTake"
                  >
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                    <option :value="150">150</option>
                    <option :value="200">200</option>
                  </select>
                </div>
                <div>
                  <q-btn
                    flat
                    round
                    :disable="page >= maxPage"
                    :color="page >= maxPage ? 'grey' : 'primary'"
                    size="md"
                    icon="keyboard_arrow_left"
                    dense
                    @click="nextPage"
                  />
                </div>
              </div>
            </div>
          </fit>
        </template>
        <template v-slot:after>
          <keep-alive>
            <UGardeshParvandehDetails
              :NidCommission="selectedNidCommission"
              @close="toggleGardeshParvandehVisible"
            />
          </keep-alive>
        </template>
      </safa-splitter>
    </div>
    <safa-popup
      title="برگشت"
      v-model="showPrevStep"
      width="500px"
      height="310px"
    >
      <PrevStep @hide="showPrevStep = false" @done="showPrevStep = false" />
    </safa-popup>

    <safa-popup
      title="توضیحات ارسال"
      v-model="showNextStep"
      width="500px"
      height="285px"
    >
      <NextStep @hide="showNextStep = false" />
    </safa-popup>
    <safa-popup
      v-model="noteDialog"
      width="600px"
      height="500px"
      title="یادداشت"
    >
      <Note />
    </safa-popup>
    <safa-popup
      title="پیغام لیست سیاه"
      v-model="showMessageBalckList"
      width="500px"
      height="300px"
    >
      <MessageBalckList
        :clsCommission_BlankList="clsCommission_BlankList"
        @hide="showMessageBalckList = false"
      />
    </safa-popup>
  </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import UGardeshParvandehDetails from "../gardesh-parvandeh-details/UGardeshParvandehDetails.vue"
import CKRow from "./partials/CKRow"
import CKRActions from "./partials/CKRActions"
import PrevStep from "./partials/PrevStep.vue"
import NextStep from "./partials/NextStep.vue"
import Note from "./partials/Note.vue"
import MessageBalckList from "./partials/MessageBalckList.vue"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  components: {
    CKRow,
    CKRActions,
    UGardeshParvandehDetails,
    PrevStep,
    NextStep,
    Note,
    MessageBalckList
  },

  data () {
    return {
      title: "کارتابل کمیسیون",
      // name: "UKartableCommission_backup",
      name: "UKartableCommission_backup",
      formKey: "1dc491c8-26b9-45ca-9e56-d8e2de6fa0bd",
      main: true,
      page: 1,
      take: 50,
      // totalItems: 1000,
      showGardeshParvandeh: false,
      showPrevStep: false,
      showNextStep: false,
      NidCommission: "",
      useGhararKartabl: false,
      noteDialog: false,
      clsCommission_BlankList: null,

      customButtons: [
        {
          icon: "refresh",
          onClick: this.loadData,
          text: "بازآوری کارتابل"
        },
        {
          icon: "restore",
          onClick: this.toggleGardeshParvandehVisible,
          text: "گردش پرونده"
        }
      ],
      splitterValue: 100,
      splitterLimit: [0, 100],
      commissionsKartablColumns: [
        /* {
          field: 'CI_Region',
          title: 'منطقه',
          width: '120px',
          editor: 'combo',
          domain: 'CI_SaraM1',
        },
        {
          field: 'CI_CommissionPriority',
          title: 'اولویت پرونده',
          width: '120px',
          editor: 'combo',
          domain: 'CI_SaraM1',
        },
        { field: '', title: 'علت', width: '80px' },
        {
          field: 'IsRelapse',
          title: 'عودتی',
          editor: 'checkbox',
          width: '100px',
        },
        { field: 'IsPast', title: 'سابقه', editor: 'checkbox', width: '100px' },
        {
          field: 'IsKarbari',
          title: 'تغییر کاربری',
          editor: 'checkbox',
          width: '100px',
        },
        {
          field: 'HasHoghoghi',
          title: 'حضور نماینده',
          editor: 'checkbox',
          width: '100px',
        },
        {
          field: 'HasTasmim',
          title: 'دارای رای تصمیم',
          editor: 'checkbox',
          width: '100px',
        }, */
        {
          field: "Header",
          title: "",
          width: "880px"
        },
        {
          field: "UrbanNidRequest",
          title: "شماره ارجاع منطقه",
          width: "100px"
        },
        { field: "BizCode", title: "کد نوسازی", width: "140px" },
        { field: "WorkflowTitel", title: "نوع درخواست", width: "160px" },
        { field: "AgentCount", title: "تعداد امضا", width: "80px" },
        { field: "SecrNo", title: "شماره دبیرخانه", width: "80px" },
        {
          field: "OwnerName",
          title: "نام و نام خانوادگی مالک",
          width: "200px"
        },

        // { field: 'OwnerNationalCode', title: 'کدملی مالک', width: '100px' },
        { field: "Requester", title: "متقاضی", width: "120px" },
        { field: "Regplaque", title: "پلاک ثبتی", width: "200px" },
        { field: "BackStateTitle", title: "مرحله شهرسازی", width: "150px" },
        { field: "TaskTitel", title: "مرحله", width: "150px" },

        {
          field: "SendDate",
          title: "تاریخ ورود",
          width: "100px",
          editor: "date"
        },
        {
          field: "CommissionDate",
          title: "تاریخ کمیسیون",
          width: "100px",
          editor: "date"
        },
        {
          field: "CommissionDateExpert",
          title: "تاریخ انجام کارشناسی",
          width: "120px",
          editor: "date"
        },
        {
          field: "DateCommissionExpert",
          title: "تاریخ کارشناسی",
          width: "100px",
          editor: "date"
        },
        {
          field: "RandomCommissionDate",
          title: "تاریخ ارسال به کمیسیون",
          width: "140px",
          editor: "date"
        },
        {
          field: "VoteDate",
          title: "تاریخ رای",
          width: "100px",
          editor: "date"
        },
        {
          field: "Commission",
          title: "کمیسیون جاری",
          width: "100px"
        }

        // { field: 'PenaltyValue', title: 'متراژ کل تخلفات', width: '150px' },
        // { field: 'UsingGroup_Mojood', title: 'کاربری تخلفات', width: '150px' },
        // {
        //   field: 'AgentName',
        //   title: 'نماینده های تایید کننده',
        //   width: '250px',
        // },
        // { field: 'AgentCount', title: 'تعداد امضاء', width: '80px' },
        // { field: 'OwnerTelNo', title: 'تلفن مالک', width: '100px' },
        // { field: 'OwnerCellNo', title: 'همراه مالک', width: '100px' },
        // { field: 'ExpertName', title: 'کارشناس انجام دهنده', width: '150px' },
        // { field: 'BackStateTitle', title: 'مرحله شهرسازی', width: '150px' },
        // { field: 'VoterUserName', title: 'انشاء کننده رای', width: '250px' },*/
      ],
      sendDesc: ""
    }
  },

  created () {
    this.loadData()
    if (this.getApplicationParam.hasOwnProperty("UseGhararKartabl")) {
      this.useGhararKartabl = this.getApplicationParam.UseGhararKartabl
    }
  },
  computed: {
    viewportWidth () {
      return (
        20 +
        this.commissionsKartablColumns
          .map((x) => parseInt(`${x.width || 160}`))
          .reduce((total, one) => total + one, 0)
      )
    },
    commissionsKartablResult () {
      return (this.$store.getters["commission/kartableRows"] || []).slice(
        this.from,
        this.to
      )
    },
    // selectedRows(){
    //     let ids=this.$store.getters['commission/selectedIds']
    //      const filterdResult = this.commissionsKartablResult.filter(
    //         (x) => {
    //           return ids.some((y) => {
    //             return y === x.NidCommission;
    //           });
    //         }
    //       );
    //   return filterdResult
    // },
    totalItems () {
      return this.$store.getters["commission/kartableRows"].length
    },
    rowKey () {
      return this.$store.getters["commission/RowKey"]
    },
    maxPage () {
      return Math.ceil(this.totalItems / this.take)
    },
    pages () {
      return new Array(this.maxPage).fill().map((r, i) => i + 1)
    },
    from () {
      return (this.page - 1) * this.take
    },
    to () {
      return this.from + this.take
    }
  },

  methods: {
    nextStep () {
      if (this.selectedCommission) {
        if (this.selectedCommission.IsVote <= 0) {
          return this.showError("برای پرونده رای صادر نشده است.")
        }
        this.showNextStep = true
      } else {
        this.showError("لطفا یک سطر از کارتابل انتخاب نمایید.")
      }
    },

    prevStep () {
      if (!this.selectedCommission) {
        this.showError("لطفا یک سطر از کارتابل انتخاب نمایید.")
        return false
      }
      // if (
      //   this.getApplicationParam.hasOwnProperty("IsCheckBalckList") &&
      //   !this.getApplicationParam.IsCheckBalckList
      // ) {
      //   if (
      //     this.selectedCommission.VoteDate &&
      //     !this.selectedCommission.HasHoghoghi
      //   ) {
      //     this.showError("برگشت پرونده بدلیل داشتن رای امکان پذیر نمی باشد");
      //     return false;
      //   }
      // }

      if (!this.chk_BlackList(false)) {
        if (
          this.getApplicationParam.hasOwnProperty("IsCheckBalckList") &&
          !this.getApplicationParam.IsCheckBalckList
        ) {
          this.showPrevStep = true
        } else if (!this.isBlackList) this.showPrevStep = true
      }
    },

    async rowClickHandler () {
      if (this.selectedCommission) {
        if (
          this.getApplicationParam.hasOwnProperty("IsCheckBalckList") &&
          this.getApplicationParam.IsCheckBalckList
        ) {
          this.showLoading()
          const payload = {
            pCodeString: this.selectedCommission.BizCode
          }
          await this.$services.commissions
            .getBlankList(payload)
            .then(async ({ data }) => {
              const getBlankListRes = this.getResponse(data)
              if (getBlankListRes.success) {
                await this.log({
                  action: this.logActions.view,
                  bizCode: this.selectedNidCommission,
                  bizCodeTitle: "NidCommission",
                  nosaziCode: this.selectedCommission.BizCode,
                  saveDesc: `بارگذاری اطلاعات لیست سیاه در فرم ${this.title} انجام گردید.`
                })
                this.clsCommission_BlankList =
                  getBlankListRes.data.Get_BlankListResult.ClsCommission_BlankList
              }
            })
            .catch((e) => {
              console.error(e)
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      }
    },

    nextPage () {
      if (this.page >= this.maxPage) return
      this.page++
    },
    prevPage () {
      if (this.page <= 1) return
      this.page--
    },
    updatePaginateTake (e) {
      const value = parseInt(e.target.value)
      if ([25, 50, 100, 150, 200].indexOf(value) === -1) return
      this.take = value
      this.page = 1
    },
    scrollEvent (e) {
      this.$el.querySelector(".ckg-header-clipper").scrollLeft =
        e.target.scrollLeft
    },
    findRowId (row) {
      return row[this.rowKey]
    },
    updateSelected ({ row, value }) {
      /* const index = this.commissionsKartablResult.findIndex(x => x.NidCommission === row.NidCommission)
      this.commissionsKartablResult.splice(index, 1, Object.freeze({
        ...this.commissionsKartablResult[index],
        IsSelected: value
      })) */
      const id = this.findRowId(row)
      this.$store.dispatch("commission/setCheckedRow", {
        id,
        isChecked: value
      })
    },
    updateExpandable ({ row, status }) {
      /* for (let i = 0; i < this.commissionsKartablResult.length; i++) {
        const item = this.commissionsKartablResult[i]
        this.commissionsKartablResult.splice(i, 1, Object.freeze({
          ...item,
          MoreInfo: item.NidCommission === row.NidCommission ? status : false
        }))
      } */
      const id = this.findRowId(row)
      this.$store.dispatch("commission/setExpandedRow", {
        id,
        isExpanded: status
      })
      this.$el.querySelector(".ckg-body").scrollLeft = 0
    },
    updatePagination (value) {
      /* const { page, perPage } = value
      this.From = page === 1 ? 1 : perPage * (page - 1) + 1
      if (perPage === -1) {
        this.To = total
      } else {
        this.To = this.From + (perPage - 1)
      }
      this.page = page
      this.take = perPage
      this.loadData() */
    },
    /* setKartableValue (value) {
      this.commissionsKartablResult = value.map((row, rownumber) => {
        return {
          ...row,
          MoreInfo: false,
          rownumber: rownumber + this.From,
          IsSelected: false
        }
      }).map(Object.freeze)
    }, */

    async loadData () {
      try {
        this.showLoading()
        await this.$store.dispatch("commission/fetchKartableRows")
      } finally {
        this.hideLoading()
      }

      /* this.showLoading()
      let payload = {
        From: this.From,
        To: this.To,
        UserID: this.currentUser.NidUser,
        UseGharar: false,
      }
      this.$services.commissions
        .getKartabl(payload)
        .then((response) => {
          this.setKartableValue(response.data.GetKartablResult)
          // this.totalItems = response.data.GetKartablResult.length;
        })
        .catch((response) => {
          console.error(response, 'error_getCommissionsKartabl')

          //   // this.serverError() // test serverError;
        })
        .finally(() => {
          this.hideLoading()
        }) */
    },
    toggleGardeshParvandehVisible () {
      this.showGardeshParvandeh = !this.showGardeshParvandeh
    },

    selectedChange (e) {
      this.NidCommission = e.dataItem.NidCommission
      this.$store.dispatch("commission/setSelectedCommission", e.dataItem)
    },
    rowBgColor (row) {
      // درخواست های دارای کارشناس حقوقی
      if (row.HasLegalExpert) return `bg__s9`

      if (this.useGhararKartabl) {
        if (row.HasGharar && !row.ResponseGharar) return `bg__s7`
        else if (row.HasGharar && row.IsVote === -1 && row.ResponseGharar) {
          return `bg__s8`
        }
      }

      if (row.IsVote === null) return `bg__s-1`

      if (row.HasTasmim === true) return `bg__s7`

      switch (row.IsVote) {
        case 400:
          return `bg__s2`
        case -1:
          return `bg__s0`
        case 418:
          return `bg__s7`
      }

      // تاریخ رأی
      if (row.VoteDate) return `bg__s1`

      if (row.HasHoghoghi) return `bg__s0`

      return `bg__s0`
    }
  },

  watch: {
    commissionsKartablResult () {
      console.log("update kartable rows...")
    },
    showGardeshParvandeh () {
      this.splitterLimit = this.showGardeshParvandeh ? [0, Infinity] : [0, 100]
      this.splitterValue = this.showGardeshParvandeh ? 60 : 100
    }
  }
}
</script>
<style lang="scss">
#ck-grid {
  margin: 10px;
  //border-radius: 10px;
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #fff;
  //box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);

  body.body--dark & {
    background-color: var(--dark);
  }

  .ckg-header-clipper {
    height: calc(48px - 8px);
    overflow: hidden;
    border-bottom: 1px solid #eee;

    body.body--dark & {
      border-bottom-color: var(--dark-border);
    }

    .ckg-header {
      white-space: nowrap;
      height: 40px;
      align-items: center;

      .ckg__col {
        display: inline-block;
        white-space: nowrap;
        font-size: 10px;
        padding: 0 8px;
        color: #202020;
        cursor: default;
        position: relative;
        text-align: center;

        body.body--dark & {
          color: var(--dark-text-color);
        }

        &:after {
          content: "";
          width: 1px;
          height: 12px;
          background-color: rgba(0, 0, 0, 0.1);
          align-self: stretch;
          display: inline-block;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          margin: 0;
          padding: 0;
        }
      }
    }
  }

  .ckg-body {
    min-height: 0;
    height: 0;
    flex-grow: 1;
    overflow: auto;
    scroll-behavior: smooth;
    will-change: scroll-position;

    .ckrow_wrap {
      min-height: 36px;

      &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      }
    }
  }

  .ckg-footer {
    height: 34px;
  }
}
</style>
