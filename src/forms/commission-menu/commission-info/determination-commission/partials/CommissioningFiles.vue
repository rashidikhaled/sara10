<template>
  <FormWrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="commissionRandomResult" />
      <safa-status :result="updateExtendedRes" />
      <safa-status :result="sendGroupRes" />
      <safa-status :result="updateDateAfterRandomCommissionRes" />
    </template>
    <fit>
      <safa-grid
        title=""
        fit
        helper="agcommissioningFiles"
        v-model="value.CommissionAfter"
        cdcName="CommissionAfter"
        height="100%"
        max-height="100%"
        min-height="200px"
        @row:click="selectedChange"
        :show-selected-checkbox="true"
        :allowMultipleSelection="true"
        :checkboxSelection="true"
        :showDeletingConfirm="true"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        paginate
        m="r"
        ref="commissionAfterRef"
      />
    </fit>
    <template #footer>
      <form-actions :m="mode" :showEditButton="false">
        <template #after>
          <btn-default label="کمیسیون بندی" @click="commissionRandom" />
          <!-- spId="7140bf0f-50f6-466f-b0d3-5b1dd839bfa4"
            spCaption="کمیسیون بندی" -->
          <btn-save label="تایید و ارسال" @click="sendAndConfirm" />
          <!-- spId="f5ae6e49-e090-4d54-8007-488ec2b12191"
            spCaption="تایید و ارسال" -->
          <btn-new label="ارجاع به کمیسیون" @click="referralToCommission" />
          <!-- spId="95eb7bdd-70fb-4951-892a-14c326a7faeb"
            spCaption="کمیسیون بندی و ارسال" -->
          <btn-default
            label="کمیسیون بندی منطقه ای"
            @click="regionalCommissioning"
          />
          <!-- spId="4f0df6ab-539d-4126-b4ff-457eac6a760b"
            spCaption=" کمیسیون بندی منطقه ای" -->
          <btn-default
            label="ظرفیت نهایی"
            @click="showCapacityOfCommissions = true"
          />
        </template>
      </form-actions>
    </template>

    <safa-popup
      title="ظرفیت کمیسیون ها"
      v-model="showCapacityOfCommissions"
      width="500px"
      height="350px"
    >
      <fit>
        <safa-datatable
          title=""
          fit
          helper="capacityOfCommissionsColumns"
          v-model="capacityOfCommissions"
          cdcName="capacityOfCommissions"
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
          hideHeader
          m="r"
        />
      </fit>
    </safa-popup>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
const ziroGUID = "00000000-0000-0000-0000-000000000000"
export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  props: ["value", "selectedCommissionCapacity", "commissionDate"],

  data () {
    return {
      title: "پرونده های کمیسیون بندی",
      name: "CommissioningFiles",
      formKey: "3ea38293-5d4a-4d77-97ea-352bbb9ae2bc",
      main: true,

      selectedParvandeh: null,
      commissionRandomResult: null,
      updateExtendedRes: null,
      sendGroupRes: null,
      updateDateAfterRandomCommissionRes: null,
      showCapacityOfCommissions: false
      // commissioningFilesColumns: [
      //   // {
      //   //   field: "selected",
      //   //   width: "40px",
      //   //   headerCheckboxSelection: true,
      //   //   checkboxSelection: true,
      //   //   showDisabledCheckboxes: true,
      //   //   editor: "selection"
      //   // },
      //   {
      //     field: 'isSelectedNode',
      //     title: '',
      //     width: '74px',
      //     filterable: true,
      //     headerCheckboxSelection: true,
      //     lockPosition: true,
      //     pinned: 'right',
      //     editor: 'selection',
      //     checkboxSelection: true,
      //     showDisabledCheckboxes: true
      //   },
      //   {
      //     field: "Karbari",
      //     title: "تغییر کاربری",
      //     width: "80px",
      //     editor: "checkbox"
      //   },
      //   {
      //     field: "CI_CommissionType",
      //     title: "نوع کمیسیون",
      //     width: "150px",
      //     editor: "combo",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "CI_CommissionOld",
      //     title: "شماره کمیسیون قدیم",
      //     editor: "combo",
      //     ciName: "CI_Commission",
      //     domain: "Commission100",
      //     width: "150px"
      //   },
      //   {
      //     field: "CI_NewCommission",
      //     title: "شماره کمیسیون جدید",
      //     editor: "combo",
      //     ciName: "CI_Commission",
      //     domain: "Commission100",
      //     width: "150px",
      //     cellStyle: { "background-color": "#ffec009e" }
      //   },
      //   {
      //     field: "CI_Region",
      //     title: "کد منطقه",
      //     width: "100px",
      //     editor: "combo",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "OwnerName",
      //     title: "نام مالک",
      //     width: "200px"
      //   },
      //   {
      //     field: "UrbanNidKartablItem",
      //     title: "کد ارجاع",
      //     width: "100px"
      //   },
      //   {
      //     field: "Address",
      //     title: "آدرس",
      //     width: "400px"
      //   }
      // ]
    }
  },

  methods: {
    chk_BlackList () {
      // ToDo
      // if (this.getApplicationParam.hasOwnProperty('IsCheckBalckList') && this.getApplicationParam.IsCheckBalckList)
      // {
      //     if (!object.ReferenceEquals(Context.ClsCommission_BlankList.Commission_BlackLists, null))
      //     {
      //         Context.ClsCommission_BlankList.Commission_BlackLists.ToList().ForEach(i =>
      //         {
      //             var Form = new UICommission.Views.Control.UShowMessageBalckList() { subject = "پرونده با کد نوسازی  " + i.NosaziCode + "  با توضیحات زیر در لیست سیاه می باشد", Desc = i.DescInputBalckList, IsError = (bool)i.IsErrorStop };
      //             Dialog.ClsDialog.ShowWindow(Form, "پیغام لیست سیاه", 500, 350);
      //         });
      //     }
      // }
      // else
      //     return false;
      // if (Context.ClsCommission_BlankList.Commission_BlackLists.Any(i => i.IsErrorStop == true))
      //     return true;
      // else
      //     return false;
      return false
    },
    sendAndConfirm () {
      if (!this.chk_BlackList()) {
        this.updateExtended()
      }
    },

    updateExtended () {
      let selectedRows = this.value.CommissionAfter.filter(
        (f) => f.isSelectedNode === true
      )
      this.showLoading()
      this.$services.commissions
        .updateExtended({
          PRequest: selectedRows.length > 0 ? selectedRows : null
        })
        .then(async ({ data }) => {
          this.updateExtendedRes = this.getResponse(data)
          if (this.updateExtendedRes.success) {
            await this.log({
              action: this.logActions.update,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `تایید و ارسال در ${this.title} انجام گردید.`
            })
            let list = this.updateExtendedRes.data.UpdateExtendedResult
            if (list !== null) {
              this.sendToCommission(list)
            } else {
              this.hideLoading()
            }
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    sendToCommission (pCommissionFilter) {
      let tmpGroupitems = pCommissionFilter.filter(
        (f) => f.CI_NewCommission !== 0
      )
      let tmpGroup =
        (tmpGroupitems &&
          tmpGroupitems.map((m) => {
            return {
              NidCommission: m.NidCommission
            }
          })) ||
        []
      this.sendGroup(tmpGroup)
    },
    sendGroup (sendGroupItems) {
      const payload = {
        PRequest: {
          IsActive: false,
          NIDCommission: ziroGUID,
          NIDVote: ziroGUID,
          NidProc: ziroGUID,
          ISRelapse: false,
          IsRegion: false,
          IsSara10: false,
          IsdeleteArchive: false,
          CheckExistVoteToArchiveByReportName: false,
          CheckExistVoteToArchiveByNidCommission: false,
          NidAgent: ziroGUID,
          NidTaskState: ziroGUID,
          NidUser: this.getNidUser(),
          SelectedDate: "0",
          SendGroupItems: sendGroupItems
        }
      }
      this.$services.commissions
        .sendGroup(payload)
        .then(({ data }) => {
          this.sendGroupRes = this.getResponse(data)
          if (this.sendGroupRes.success) {
            this.value = this.sendGroupRes.data.SendGroupResult
            if (this.value.CommissionAfter === null) {
              this.value.CommissionAfter = []
            }
            if (this.value && this.value.SendGroupItems) {
              if (this.value.CommissionAfter > 0) {
                this.value.SendGroupItems.forEach((item) => {
                  var tmpitem = this.value.CommissionAfter.find(
                    (f) => f.NidCommission === item.NidCommission
                  )
                  if (tmpitem) this.value.CommissionAfter.pop(tmpitem)
                })
              }
              this.updateDateAfterRandomCommission()
            }
          }
        })
        .catch((err) => {
          console.error(err)
          // this.serverError() // test serverError
        })
    },

    updateDateAfterRandomCommission () {
      const payload = {
        PRequest: {
          IsActive: false,
          IsSara10: false,
          CheckExistVoteToArchiveByNidCommission: false,
          CheckExistVoteToArchiveByReportName: false,
          NIDCommission: ziroGUID,
          NIDVote: ziroGUID,
          NidProc: ziroGUID,
          CommissionDate: this.commissionDate,
          ISRelapse: false,
          IsRegion: false,
          IsdeleteArchive: false,
          NidAgent: ziroGUID,
          NidTaskState: ziroGUID,
          NidUser: ziroGUID,
          SelectedDate: "0"
        }
      }
      this.$services.commissions
        .updateDateAfterRandomCommission(payload)
        .then(async ({ data }) => {
          this.updateDateAfterRandomCommissionRes = this.getResponse(data)
          if (this.updateDateAfterRandomCommissionRes.success) {
            this.$store.dispatch("commission/fetchKartableRows")
            this.$emit("isVotable", true)
            this.$emit("reloadAfterCommission")

            await this.log({
              action: this.logActions.update,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بروزرسانی اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    commissionRandom () {
      const selectedRows = this.value.CommissionAfter.filter(
        (f) => f.isSelectedNode === true
      )
      if (selectedRows && selectedRows.length === 0) {
        return this.showError("لطفا پرونده ها را از لیست انتخاب نمایید.")
      }
      this.showLoading()
      const payload = {
        PRequest: {
          CheckExistVoteToArchiveByNidCommission: false,
          CheckExistVoteToArchiveByReportName: false,
          CommissionAfter: selectedRows,
          IsActive: false,
          IsSara10: true,
          NIDCommission: ziroGUID,
          NIDVote: ziroGUID,
          NidProc: ziroGUID,
          CommissionDate: this.commissionDate,
          Commission_Capacity: this.selectedCommissionCapacity,
          ISRelapse: false,
          IsdeleteArchive: false,
          NidAgent: ziroGUID
        }
      }
      this.$services.commissions
        .commissionRandom(payload)
        .then(async ({ data }) => {
          this.commissionRandomResult = this.getResponse(data)
          if (this.commissionRandomResult.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `کمیسیون بندی در ${this.title} انجام گردید.`
            })
            const list =
              this.commissionRandomResult.data.CommissionRandomResult
                .CommissionAfter
            let merged = []
            for (let i = 0; i < this.value.CommissionAfter.length; i++) {
              merged.push({
                ...this.value.CommissionAfter[i],
                ...list.find(
                  (itmInner) =>
                    itmInner.NidCommission ===
                    this.value.CommissionAfter[i].NidCommission
                )
              })
            }
            this.value.CommissionAfter = merged
          }
        })
        .catch((err) => {
          console.error(err)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    regionalCommissioning () {
      // کمیسیون بندی منطقه ای
      if (!this.selectedParvandeh) {
        return this.showError("لطفا پرونده ها را از لیست انتخاب نمایید.")
      }
    },

    referralToCommission (e) {
      // ارجاع به کمیسیون
      if (!this.selectedParvandeh) {
        return this.showError("لطفا پرونده ها را از لیست انتخاب نمایید.")
      }
    },

    selectedChange ({ selectedItems }) {
      this.selectedParvandeh = selectedItems
    }
  },

  computed: {
    tmpKartabl () {
      let x = this.$store.getters["commission/kartableRows"].filter((x) =>
        x.CommissionState.includes("RandomCommission")
      )
      console.log(x)
      return x
    },
    capacityOfCommissions () {
      if (
        this.selectedCommissionCapacity &&
        this.selectedCommissionCapacity.length > 0
      ) {
        let list = []
        list.push(
          ...this.selectedCommissionCapacity.map((item) => {
            let sum =
              parseInt(item.Referable || 0) +
              parseInt(item.TajdidNazarCapacity || 0) +
              parseInt(item.Karbari || 0)
            let r = {}
            r.CI_Commission = item.CI_Commission
            r.Count = item.Count
            r.erja = `${
              " پرونده مختلف ( " + item.Referable ||
              0 + " )  +  تجدید نظر ( " + item.TajdidNazarCapacity ||
              0 + " )  +  کاربری ( " + item.Karbari ||
              0 + " ) = " + sum
            }`
            return r
          })
        )
        return list
      } else {
        return []
      }
    }
  },

  beforeDestroy () {
    this.$emit("getCommissionRandom")
  }
}
</script>
