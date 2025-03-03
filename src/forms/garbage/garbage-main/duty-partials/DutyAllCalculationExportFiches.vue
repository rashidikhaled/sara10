<template>
  <div>
    <safa-status :result="exportFicheRes" />
    <safa-status :result="getBaseOwnerBySessionsRes" />
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <safa-combo
          v-model="dutyFicheExportType"
          cdcName="dutyFicheExportType"
          ciName="CI_DutyFicheExportType"
          domainName="CI_SaraM1"
          label="نوع صدرو فیش"
          label-width="80px"
          ref="dutyFicheExportRef"
        />
      </div>
      <div class="col-12">
        <safa-datepicker
          v-model="breakDate"
          cdcName="breakDate"
          label="مهلت پرداخت"
          label-width="80px"
        />
      </div>
      <div class="col-12">
        <safa-datepicker
          v-model="toDate"
          cdcName="toDate"
          label="تا تاریخ"
          label-width="80px"
        />
      </div>
      <div v-if="isAllalHesab" class="col-12">
        <safa-custom-text
          v-model="exportTypeValue"
          cdcName="amount"
          label="مبلغ"
          label-width="80px"
          type="money"
        />
      </div>
      <div v-if="isAllalHesab" class="col-12">
        <safa-text
          v-model="alalhesabFicheOwner"
          cdcName="alalhesabFicheOwner"
          label="نام مستأجر"
          label-width="80px"
        />
      </div>
      <div v-if="isTaghsit" class="col-12">
        <safa-text
          v-model="installmentNumber"
          cdcName="installmentNumber"
          type="number"
          label="تعداد تقسیط"
          label-width="80px"
        />
      </div>
      <div v-if="isTaghsit" class="col-12">
        <safa-datepicker
          v-model="dateOfInstallment"
          cdcName="installmentStartDate"
          label="تاریخ شروع تقسیط"
          label-width="80px"
        />
      </div>
    </div>
    <safa-popup
      v-model="isDoreh"
      title="لیست مالکین"
      width="900px"
      height="600px"
    >
      <OwnerList
        :sessionList="tmpSessionExceptPayyOff"
        :baseNosaziCode="baseNosaziCode"
        @selectedOwner="selectedOwner"
        @hide="isDoreh = false"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </safa-popup>
  </div>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import OwnerList from "./OwnerList"
import { ClsEnumEumDutyType } from 'src/forms/garbage/config/enums.js'
export default {
  mixins: [baseFormMixin],
  components: { OwnerList },
  props: {
    tmpSessionExceptPayyOff: Array,
    results: Object,
    isTempFiche: Boolean,
    baseNosaziCode: Object,
    district: Number,
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      // name: "DutyAllCalculationExportFiches",
      exportFicheRes: null,
      getBaseOwnerBySessionsRes: null,
      dutyFicheExportType: 1,
      getClsEnumEumDutyType: ClsEnumEumDutyType,
      breakDate: "",
      toDate: "",
      isAllalHesab: false,
      isTaghsit: false,
      isDoreh: false,
      exportTypeValue: "",
      installmentNumber: "",
      alalhesabFicheOwner: "",
      ownerList: { Base_Owner: [] },
      selectedBaseOwner: null,
      dateOfInstallment: ""
    }
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     this.dutyFicheExportType = this.$refs.dutyFicheExportRef.filteredList.find(x => x.Title === "سالیانه")?.ID || 0
  //   })
  // },
  computed: {
    config () {
      return { config: { District: this.baseNosaziCode.District } }
    }
  },
  watch: {
    dutyFicheExportType () {
      if (
        this.dutyFicheExportType ===
        // eslint-disable-next-line no-undef
        window.getConfigValue("enumDutyFicheExportType").isAllalHesab
      ) {
        this.isAllalHesab = true
        this.isTaghsit = false
      } else if (
        // eslint-disable-next-line no-undef
        this.dutyFicheExportType ===
        window.getConfigValue("enumDutyFicheExportType").isTaghsit
      ) {
        this.isAllalHesab = false
        this.isTaghsit = true
      } else {
        this.isTaghsit = false
        this.isAllalHesab = false
      }
    }
  },
  methods: {
    selectedOwner (e) {
      this.selectedBaseOwner = e
      this.isDoreh = false
      this.save()
    },
    async save () {
      try {
        // if (
        //   this.dutyFicheExportType ===
        //     window.getConfigValue("enumDutyFicheExportType").isDoreh &&
        //   !this.isDoreh
        // ) {
        //   this.isDoreh = true
        //   await this.getBaseOwnerBySessions()
        //   return
        // }
        let dore =
          this.dutyFicheExportType === 4 ||
          this.dutyFicheExportType === 5 ||
          this.dutyFicheExportType === 6
        if (dore && !this.isDoreh && this.selectedBaseOwner === null) {
          this.isDoreh = true
          // await this.getBaseOwnerBySessions()
          return
        }
        await this.exportFiche()
      } catch (e) {
        console.error(e)
      }
    },
    async exportFiche () {
      let dore =
        this.dutyFicheExportType === 4 ||
        this.dutyFicheExportType === 5 ||
        this.dutyFicheExportType === 6
      try {
        const payload = {
          pNidFKList: this.results.NidList || [],
          pIsSelectAll: false,
          pNidProc: "00000000-0000-0000-0000-000000000000",
          pDutySessions: this.tmpSessionExceptPayyOff,
          pUser: this.currentUser,
          pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value,
          pInfoGroup: 0, // "Parvandeh"
          pRevisit: "00000000-0000-0000-0000-000000000000",
          pDutyFicheStatus: window.getConfigValue('EnumDutyFicheStatus')?.PermanentExport || 0, // "PermanentExport"
          pCI_DutyFicheExportType: this.dutyFicheExportType,
          pExportTypeValue: this.isTaghsit
            ? this.dateOfInstallment === ""
              ? parseFloat(this.installmentNumber)
              : this.installmentNumber + "," + this.dateOfInstallment
            : parseFloat(this.exportTypeValue),
          pAlalhesabFicheOwner: this.isAllalHesab
            ? this.alalhesabFicheOwner
            : null,
          pSelectedBase_Owner: dore ? this.selectedBaseOwner : null,
          pSelectedBase_JobOwner: null,
          pIsCancelFiches: true,
          pFicheType: 1,
          pFichePrice: 0,
          pExportFicheOnHouse: false,
          pNidParentHouse: this.results.NidHouseParent,
          pIsBreakInDay: false,
          pBreakDay: 2,
          pBreakDate: this.breakDate,
          pIsShowAccountingError: true,
          pToDate: this.toDate
        }
        // const payload = {
        //   alalhesabFicheOwner: this.alalhesabFicheOwner,
        // }
        if (this.selectedBaseOwner) {
          payload.pSelectedBase_Owner = this.selectedBaseOwner
        }
        this.isTempFiche
          ? (payload.pDutyFicheStatus = 3)
          : (payload.pDutyFicheStatus = 0)
        this.showLoading()
        const { data } = await this.$services.SB.exportFiche(payload, this.config)
        this.exportFicheRes = this.getResponse(data)
        if (this.exportFicheRes.success) {
          if (this.exportFicheRes.data.IsExportOK) {
            this.showSuccess("صدور فیش با موفقیت انجام شد.")
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.exportFiche,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              saveDesc: `صدور فیش برای کدنوسازی ${strNosaziCode.split("-").reverse().join("-")} انجام شد.`
            })
            this.$emit("closeExportFichesModal")
          } else {
            this.showError("فیشی صادر نشد.")
            this.$emit("closeExportFichesModal")
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    cancel () {
      this.$emit("closeExportFichesModal")
    }
  }
}
</script>
