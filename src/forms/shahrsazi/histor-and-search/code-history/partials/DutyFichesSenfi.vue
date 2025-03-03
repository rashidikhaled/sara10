<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-checkbox label="عدم نمایش فیش های باطله" />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="splitterValue" class="fit" margin="0">
      <template v-slot:before>
        <safa-datatable
          v-model="dutyFiches.DutyFiches"
          :addRow="false"
          :allowCopy="false"
          :allowMultipleSelection="false"
          :deleteRow="false"
          :show-selected-checkbox="false"
          cdcName="dutyFicheSenfi"
          height="100%"
          helper="dutyFicheSenfi"
          m="r"
          max-height="100%"
          min-height="200px"
          paginate
          title="فیش ها"
          @selectedChange="selectFiche"
        />
      </template>
      <template v-slot:after>
        <safa-datatable
          v-model="dutyFicheSubList"
          :addRow="false"
          :allowCopy="false"
          :allowMultipleSelection="false"
          :deleteRow="false"
          :show-selected-checkbox="false"
          cdcName="dutyFicheSub"
          height="100%"
          helper="dutyFicheSub"
          m="r"
          max-height="100%"
          min-height="200px"
          paginate
          title="جزئیات فیش"
        />
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import codeInfoForNosaziModel from "../models/codeInfoForNosazi"
import dutyFichesModel from "../models/dutyFiches"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "../../../../../kartable/utils/nosaziCodeOperation"

export default {
  name: "DutyFichesSenfi",
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    title: String,
    formKey: String,
    name: String,
    baseNosaziCode: Object
  },

  data () {
    return {
      selectedDutyFiche: null,
      codeInfoForSenfi: { ...codeInfoForNosaziModel },
      dutyFiches: { ...dutyFichesModel },
      dutyFicheSubList: [],
      splitterValue: 70
    }
  },

  methods: {
    async loadData () {
      if (!this.value) {
        return this.showError(
          "کد منبع جهت تعیین لیست کمیسیون ها تعیین نشده است"
        )
      }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getShopCodeInfo(
          {
            pDistrict: this.value.District,
            pRegion: this.value.Region,
            pBlock: this.value.Block,
            pHouse: this.value.House,
            pBuilding: this.value.Building,
            pApartment: this.value.Apartment,
            pShop: this.value.Shop,
            pDutyType: 2, // 'Job',
            pEumNosaziCodeGroup: this.value.EumNosaziCodeGroup,
            pEumBaseInfoGroup: 0, // 'Parvande',
            pLoadAllJobs: false,
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        const res = this.getResponse(data)
        this.codeInfoForSenfi = res.data

        await this.log({
          action: this.logActions.view,
          bizCode: convertNosaziCodeObjectToString(this.value),
          bizCodeTitle: "nosaziCode"
        })
        if (
          !this.codeInfoForSenfi.NidJobList ||
          !this.codeInfoForSenfi.NidJobList.length
        ) {
          this.$emit("changeTreeTab")
          this.showError(res.errors[0].text)
          return
        } else {
          this.getDutyFiches()
        }
      } catch (err) {
        console.error(err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async getDutyFiches () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getDutyFiches(
          {
            pNidList: this.codeInfoForSenfi.NidJobList,
            pSysCiDutyType: 2, // 'Job',
            pUnLoadCancelFiches: true
          },
          this.config
        )
        const res = this.getResponse(data)
        if (res.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: convertNosaziCodeObjectToString(this.value),
            bizCodeTitle: "nosaziCode"
          })
          this.dutyFiches = res.data
          this.dutyFiches.DutyFiches.map((x) => {
            if (x.EumDutyFicheStatus === 0) {
              x.class = "dutyFichePermanent"
            } else if (x.EumDutyFicheStatus === 1) {
              x.class = "dutyFicheConfirm"
            } else if (x.EumDutyFicheStatus === 2) {
              x.class = "dutyFicheCancel"
            } else if (x.EumDutyFicheStatus === 3) {
              x.class = "dutyFicheTempExport"
            } else if (x.EumDutyFicheStatus === 4) {
              x.class = "dutyFicheConfirmBank"
            } else if (x.EumDutyFicheStatus === 5) {
              x.class = "dutyFicheRevoke"
            }
            return x
          })
        } else {
          return this.showError(res.errors[0].text)
        }
      } catch (err) {
        console.error(err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    selectFiche (e) {
      this.selectedDutyFiche = e.dataItem
      if (this.selectedDutyFiche) {
        this.loadDutyFicheSub(this.selectedDutyFiche["NidFiche"])
      }
    },

    async loadDutyFicheSub (pNidFiche) {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getDutyFicheSubs(
          { pNidFiche },
          this.config
        )
        const res = this.getResponse(data)
        if (res.success) {
          this.dutyFicheSubList = res.data["DutyFicheSub"]
          await this.log({
            action: this.logActions.view,
            bizCode: pNidFiche,
            bizCodeTitle: "pNidFiche"
          })
        } else {
          return this.showError(res.errors[0].text)
        }
      } catch (err) {
        console.error(err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.value.District
        }
      }
    }
  }
}
</script>
