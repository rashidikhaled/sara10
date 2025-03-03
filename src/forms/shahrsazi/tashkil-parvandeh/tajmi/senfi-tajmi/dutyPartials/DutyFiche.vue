<template>
  <safa-form id="4c39d37b-42a1-4cd5-af59-ef85f890e069" caption="صنفی موردی">
    <!-- <div> -->
    <fit>
      <safa-status :result="saveResult" />
      <div class="row q-mb-sm">
        <safa-checkbox
          label="عدم نمایش فیش های باطله"
          v-model="loadCancelFiches"
          @click="reloadFichesList"
        ></safa-checkbox>
      </div>
      <safa-splitter
        v-model="splitterValue"
        class="fit"
        horizontal
        margin="0"
        style="min-height: 200px"
      >
        <template v-slot:before>
          <!-- <fit> -->
          <safa-datatable
            helper="dutyFich2"
            cdcName="DutyFicheDetails"
            v-model="dutyFicheSubResults.DutyFicheSub"
            :hideHeader="true"
            height="100%"
            max-height="100%"
            min-height="100px"
            title="جزئیات فیش ها"
          />
          <!-- </fit> -->
        </template>
        <template v-slot:after>
          <!-- <fit> -->
          <safa-datatable
            helper="dutyFich1"
            v-model="fichesResults.DutyFichesPayCount"
            cdcName="DutyFichesPayCount"
            @row-click="click"
            :hideHeader="true"
            height="100%"
            max-height="100%"
            min-height="100px"
            title="فیش ها"
          />
          <!-- </fit> -->
        </template>
        <!-- </fit> -->
      </safa-splitter>
      <!-- <div class="flex q-mt-xs"> -->
      <button-group class="q-mt-xs">
        <safa-securityPanel
          id="cc3512cd-d2f0-4bf0-988c-6dbf1009f5cf"
          caption="تایید"
        >
          <btn-save
            label="تأیید"
            :disable="disabledAcceptBtn"
            @click="accept"
          ></btn-save>
        </safa-securityPanel>
        <safa-securityPanel
          id="2b4eb5a4-4e91-443f-922f-6c6ffdedbda7"
          caption="تایید با پوز"
        >
          <btn-save
            label="تأیید با Pose"
            :disable="disabledAcceptPoseBtn"
            @click="acceptWithPose"
          ></btn-save>
        </safa-securityPanel>
        <safa-securityPanel
          id="d1b1233c-6eb3-460a-82d3-99884aa1c410"
          caption="تایخچه پرداخت پوز"
        >
          <btn-default
            label="تاریخچه ی پوز"
            :disable="disabledPoseHistoryBtn"
            @click="poseHistory"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="1e5ba298-4966-4440-95ba-7a55c2981ce7"
          caption="تایید لحظه ای بانک شهر"
        >
          <btn-save
            label="تأیید لحظه ای بانک شهر"
            @click="acceptBank"
          ></btn-save>
        </safa-securityPanel>
        <safa-securityPanel
          id="c54ec78b-8905-4c4a-943b-da22c6500334"
          caption="تایید لحظه ای بانک شهر2"
        >
          <btn-save
            label="تأیید لحظه ای بانک شهر2"
            @click="acceptBank2"
          ></btn-save>
        </safa-securityPanel>
        <safa-securityPanel
          id="73cfd55f-73ef-415b-a0e3-44fbde0dadee"
          caption="تایید لحظه ای بانک"
        >
          <btn-save
            label="تأیید لحظه ای بانک"
            @click="acceptTempBank"
          ></btn-save>
        </safa-securityPanel>
        <safa-securityPanel
          id="0ea65cea-5f94-405d-b530-e4423733e75e"
          caption="قطعیت صدور"
        >
          <btn-default
            label="قطعیت صدور"
            :disable="disabledIssuanceBtn"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="fc6f3e39-d147-4e59-bc41-fae001b31fe2"
          caption="ابطال"
        >
          <btn-cancel
            label="ابطال"
            :disable="disabledRevokeBtn"
            @click="revoke"
          ></btn-cancel>
        </safa-securityPanel>
        <safa-securityPanel
          id="fbf43f9d-9db8-4506-93d2-3053c3ef3841"
          caption="استرداد"
        >
          <btn-default
            label="استرداد"
            :disable="disabledRefundBtn"
            @click="refund"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="7157e496-e917-4a94-bfca-87dd142cfa9d"
          caption="حذف فیش"
        >
          <btn-delete
            :disable="disabledDeleteBtn"
            @click="deleteFiche"
          ></btn-delete>
        </safa-securityPanel>
        <safa-securityPanel
          id="364f5877-a500-4b7f-9376-60a9a8c14c92"
          caption="تقسیط"
        >
          <btn-default
            label="تقسیط"
            :disable="disabledInstallmentBtn"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="9a353b58-4da5-4782-8448-63b77f13ad28"
          caption="چاپ فیش"
        >
          <btn-default
            label="چاپ فیش"
            :disable="disabledPrintFicheBtn"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="a22436d4-16ac-40c8-ada9-3410462151ee"
          caption="چاپ فیش پراژ"
        >
          <btn-default
            label="چاپ فیش پراز"
            :disable="disabledPrintBrazBtn"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="1ba88f90-9e4f-4ca1-8b6b-1eeb80d4d444"
          caption="فیش های ملک"
        >
          <btn-default label="فیش های ملک" @click="buildingFiche"></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="13a7e013-5fe3-4354-aca0-5183bcf956e6"
          caption="فیش های تایید بانک"
        >
          <btn-default
            label="فیش های تأیید بانک"
            @click="isShowAcceptedFicheModal = true"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="daef274e-824a-4db4-985f-30d5f20e9663"
          caption="فاکتور محاسبات"
        >
          <btn-default
            label="فاکتور محاسبات"
            :disable="disabledCalcFactorBtn"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="2666a423-3664-4215-9454-da2cf881bd92"
          caption="بازآوری"
        >
          <btn-default
            label="بازآوری"
            :disable="disabledReloadBtn"
            @click="isShowReloadFicheModal = true"
          ></btn-default>
        </safa-securityPanel>
        <btn-default
          label="فیش های ابطال شده"
          @click="isShowRevokedFicheModal = true"
        ></btn-default>
        <safa-securityPanel
          id="2ab7640a-8409-4d14-af17-e1374d10b103"
          caption="چاپ گزارش مفاصا"
        >
          <btn-default label="چاپ گزارش مفاصا"></btn-default>
        </safa-securityPanel>
      </button-group>
      <!-- </div> -->
    </fit>
    <ShowModal
      :show="isShowPaymentDetailsModal"
      @hide="isShowPaymentDetailsModal = false"
      title="مشخصات فیش پرداختی"
      @onCloseModal="isShowPaymentDetailsModal = false"
    >
      <DutyFichePaymentDetails
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
      />
    </ShowModal>
    <ShowModal
      :show="isShowPaymentDetailsModal2"
      @hide="isShowPaymentDetailsModal2 = false"
      title="مشخصات فیش پرداختی"
      @onCloseModal="isShowPaymentDetailsModal2 = false"
    >
      <DutyFichePaymentDetails2
        @reloadDutyFiche2="reloadDutyFiche2"
        :selectedRow="selectedRow"
      />
    </ShowModal>

    <ShowModal
      :show="isShowPoseSeectionModal"
      @hide="isShowPoseSeectionModal = false"
      title="انتخاب کردن پوز"
      @onCloseModal="isShowPoseSeectionModal = false"
    >
      <DutyFichePoseSelection
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
      />
    </ShowModal>
    <ShowModal
      :show="isShowPoseHistoryModal"
      @hide="isShowPoseHistoryModal = false"
      title="تاریخچه پرداخت با پوز"
      @onCloseModal="isShowPoseHistoryModal = false"
    >
      <DutyFichePoseHistory
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
      />
    </ShowModal>
    <ShowModal
      :show="isShowRefundSpecModal"
      @hide="isShowRefundSpecModal = false"
      title="مشخصات فیش استرداد"
      @onCloseModal="isShowRefundSpecModal = false"
    >
      <DutyFicheRefundSpec
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
      />
    </ShowModal>
    <ShowModal
      :show="isShowBuildingFicheModal"
      @hide="isShowBuildingFicheModal = false"
      title="فیش های ملک"
      @onCloseModal="isShowBuildingFicheModal = false"
    >
      <DutyFicheBuilding
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
        :baseNosaziCode="baseNosaziCode"
      />
    </ShowModal>
    <ShowModal
      :show="isShowAcceptedFicheModal"
      @hide="isShowAcceptedFicheModal = false"
      title="فیش های تأیید بانک"
      @onCloseModal="isShowAcceptedFicheModal = false"
    >
      <DutyFicheAccepted
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
        :results="results"
      />
    </ShowModal>
    <ShowModal
      :show="isShowReloadFicheModal"
      @hide="isShowReloadFicheModal = false"
      title="فیش های حذف شده"
      @onCloseModal="closeReloadModal"
    >
      <DutyFicheReload
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
        :results="results"
      />
    </ShowModal>
    <ShowModal
      :show="isShowRevokedFicheModal"
      @hide="isShowRevokedFicheModal = false"
      title="فیش های ابطال شده"
      @onCloseModal="closeRevokedFichesModal"
    >
      <DutyFicheRevokedList
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
        :results="results"
      />
    </ShowModal>
    <!-- </fit> -->
    <!-- </div> -->
  </safa-form>
</template>
<script>
import DutyFichePaymentDetails from "./DutyFichePaymentDetails"
import DutyFichePaymentDetails2 from "./DutyFichePaymentDetails2"
import DutyFichePoseSelection from "./DutyFichePoseSelection"
import DutyFichePoseHistory from "./DutyFichePoseHistory"
import DutyFicheRefundSpec from "./DutyFicheRefundSpec"
import DutyFicheBuilding from "./DutyFicheBuilding"
import DutyFicheAccepted from "./DutyFicheAccepted"
import DutyFicheReload from "./DutyFicheReload"
import DutyFicheRevokedList from "./DutyFicheRevokedList"
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      splitterValue: 50,
      fichesResult: {},
      dutyFicheSubResults: { DutyFicheSub: [] },
      selectedRow: null,
      saveResult: null,
      isShowPaymentDetailsModal: false,
      isShowPoseSeectionModal: false,
      isShowPoseHistoryModal: false,
      isShowPaymentDetailsModal2: false,
      isShowRefundSpecModal: false,
      isShowBuildingFicheModal: false,
      isShowAcceptedFicheModal: false,
      isShowReloadFicheModal: false,
      isShowRevokedFicheModal: false,
      dutyFicheSubResult: null,
      disabledAcceptBtn: true,
      disabledAcceptPoseBtn: true,
      disabledPoseHistoryBtn: true,
      disabledIssuanceBtn: true,
      disabledRevokeBtn: true,
      disabledRefundBtn: true,
      disabledDeleteBtn: true,
      disabledInstallmentBtn: true,
      disabledPrintFicheBtn: true,
      disabledPrintBrazBtn: true,
      disabledCalcFactorBtn: true,
      disabledReloadBtn: false
    }
  },
  props: {
    results: Object,
    loadCancelFiches: Boolean,
    fichesResults: Object,
    baseNosaziCode: Object,
    formKey: String,
    title: String,
    name: {
      type: String,
      default: "DutyFiche"
    }
  },
  components: {
    DutyFichePaymentDetails,
    DutyFichePaymentDetails2,
    DutyFichePoseSelection,
    DutyFichePoseHistory,
    DutyFicheRefundSpec,
    DutyFicheBuilding,
    DutyFicheAccepted,
    DutyFicheReload,
    DutyFicheRevokedList
  },
  methods: {
    reloadFichesList () {
      this.showLoading()
      let data = {
        pNidList: this.results.NidJobList,
        pSysCiDutyType: 2,
        pUnLoadCancelFiches: this.loadCancelFiches
      }

      this.$services.SB.getDutyFichesPayCount(data)
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
            this.fichesResults = this.fichesResult.data
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
    click (event, dataItem, target) {
      this.selectedRow = dataItem
      if (dataItem.EumDutyFicheStatus !== 0) {
        this.disabledPoseHistoryBtn = false
        this.disabledRevokeBtn = false
        this.disabledRefundBtn = false
        this.disabledPrintBrazBtn = false
        this.disabledCalcFactorBtn = false
        this.disabledReloadBtn = false
      } else {
        this.disabledAcceptBtn = false
        this.disabledAcceptPoseBtn = false
        this.disabledPoseHistoryBtn = false
        this.disabledRevokeBtn = false
        this.disabledRefundBtn = false
        this.disabledPrintFicheBtn = false
        this.disabledCalcFactorBtn = false
        this.disabledReloadBtn = false
        this.disabledDeleteBtn = false
      }
      this.showLoading()
      let data = { pNidFiche: dataItem.NidFiche }
      this.$services.SB.getDutyFicheSubs(data)
        .then(async ({ data }) => {
          this.dutyFicheSubResult = this.getResponse(data)

          if (this.dutyFicheSubResult.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: dataItem.NidFiche,
              bizCodeTitle: "NidFiche"
            })
            this.dutyFicheSubResults = this.dutyFicheSubResult.data
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
    accept () {
      this.showConfirm("آیا از تأیید فیش انتخاب شده اطمینان دارید؟").onOk(
        () => {
          this.isShowPaymentDetailsModal = true
        }
      )
    },
    reloadDutyFiche () {
      if (this.isShowPoseSeectionModal) {
        this.isShowPoseSeectionModal = false
      }
      if (this.isShowPaymentDetailsModal) {
        this.isShowPaymentDetailsModal = false
      }
      if (this.isShowPoseHistoryModal) {
        this.isShowPoseHistoryModal = false
      }
      if (this.isShowPaymentDetailsModal2) {
        this.isShowPaymentDetailsModal2 = false
      }
      if (this.isShowRefundSpecModal) {
        this.isShowRefundSpecModal = false
      }
      this.reloadFichesList()
    },
    reloadDutyFiche2 (value) {
      this.isShowPaymentDetailsModal2 = false
      this.saveResult = value
      this.reloadFichesList()
    },
    acceptWithPose () {
      this.showConfirm(
        "آیا از تأیید فیش انتخاب شده از طریق پوز اطمینان دارید؟"
      ).onOk(() => {
        this.isShowPoseSeectionModal = true
      })
    },
    poseHistory () {
      this.isShowPoseHistoryModal = true
    },
    acceptBank () {
      if (this.selectedRow !== null) {
        this.showLoading()
        let data = {
          pDutyFiche: this.selectedRow,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          PDutyType: 2,
          pSetPayOffForConfirmYearly: true,
          pSetPayOffForConfirmCollective: false
        }

        this.$services.SB.confirmFicheViaBankService(data)
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)
            if (this.saveResult.success) {
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: "NidFiche"
              })
              this.reloadFichesList()
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    acceptBank2 () {
      if (this.selectedRow !== null) {
        this.showLoading()
        let data = {
          pDutyFiche: this.selectedRow,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          PDutyType: 2,
          pSetPayOffForConfirmYearly: true,
          pSetPayOffForConfirmCollective: false
        }

        this.$services.SB.confirmFicheViaBankService2(data)
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)
            if (this.saveResult.success) {
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: "NidFiche"
              })
              this.reloadFichesList()
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    acceptTempBank () {
      if (this.selectedRow !== null) {
        this.isShowPaymentDetailsModal2 = true
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    revoke () {
      if (this.selectedRow !== null) {
        this.showConfirm("آیا از ابطال فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.showLoading()
            let data = {
              pNidFiche: this.selectedRow.NidFiche,
              pUserCode: this.getNidUser(),
              pUserName: this.getUserDisplayName(),
              PDutyType: 2,
              IsRefund: false
            }

            this.$services.SB.cancelFiche(data)
              .then(async ({ data }) => {
                this.saveResult = this.getResponse(data)

                if (this.saveResult.success) {
                  await this.log({
                    action: this.logActions.cancel,
                    bizCode: this.selectedRow.NidFiche,
                    bizCodeTitle: "NidFiche"
                  })
                  this.showSuccess("فیش انتخاب شده با موفقیت باطل شد.")
                  this.reloadFichesList()
                }
              })
              .catch((e) => {
                console.error(e)
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })
          }
        )
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    refund () {
      if (this.selectedRow !== null) {
        this.showConfirm("آیا از استرداد فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.isShowRefundSpecModal = true
          }
        )
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    deleteFiche () {
      this.showConfirm("آیا از حذف فیش انتخاب شده اطمینان دارید؟").onOk(() => {
        if (this.selectedRow !== null) {
          this.showLoading()
          let data = {
            pNidFiche: this.selectedRow.NidFiche,
            pUserCode: this.getNidUser(),
            pUserName: this.getUserDisplayName()
          }
          this.$services.SB.deleteFiche(data)
            .then(async ({ data }) => {
              this.saveResult = this.getResponse(data)

              if (this.saveResult.success) {
                await this.log({
                  action: this.logActions.delete,
                  bizCode: this.selectedRow.NidFiche,
                  bizCodeTitle: "NidFiche"
                })
                this.showSuccess("فیش انتخاب شده با موفقیت حذف شد")
                this.reloadFichesList()
              }
            })
            .catch((e) => {
              console.error(e)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        } else {
          this.showError("هیچ فیشی انتخاب نشده است.")
        }
      })
    },
    buildingFiche () {
      if (this.selectedRow !== null) {
        this.isShowBuildingFicheModal = true
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    closeReloadModal () {
      this.isShowReloadFicheModal = false
      this.reloadFichesList()
    },
    closeRevokedFichesModal () {
      this.isShowRevokedFicheModal = false
      this.reloadFichesList()
    }
  },
  watch: {
    loadCancelFiches () {
      this.reloadFichesList()
    }
  }
}
</script>
<style scoped>
.senfi-checkBox {
  margin-left: -10px;
}
</style>
