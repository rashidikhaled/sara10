<template>
  <fit>
    <safa-grid
        :columns="columnDefs"
        :gridOptions="gridOptions"
        fit
        :m="m"
        :allowMultipleSelection="true"
        :addRow="false"
        :deleteRow="true"
        :allowCopy="false"
        :bordered="true"
        title=""
        id="commissionType"
        min-height="250px"
        height="100%"
        max-height="100%"
        @grid:ready="onGridReady"
        ref="agGrid"
        :value="aDPPrintTypeList"
        @input="onUpdateValues($event)"
      >
      <template #header>
          <q-btn
            padding="3px"
            size="sm"
            v-if="m==='e'"
            flat
            @click="showPopup=true">
            <q-icon name="add"/>
          </q-btn>
      </template>
    </safa-grid>
    <safa-popup title="" v-model="showPopup" width="600px"
      height="300px">
      <form-wrapper >
      <fit>
      <FormRow>
        <form-control>
          <safa-combo
            ciName="CI_CommissionType"
            domainName="Commission100"
            label="نوع کمیسیون"
            label-width="75px"
            v-model="selectedCICommissionType"
            cdcName="CI_CommissionType"
            ref="cICommissionTypeRef"
          />
        </form-control>
        <form-control>
          <safa-combo
            ciName="CI_PrintType"
            domainName="CI_SaraM1"
            label="نوع چاپ"
            label-width="50px"
            v-model="selectedCIPrintType"
            cdcName="CI_PrintType"
            style="min-width: 220px"
          />
        </form-control>
      </FormRow>
       </fit>
        <template v-slot:footer>
          <btn-save @click="addToGrid" />
        </template>
      </form-wrapper>
    </safa-popup>
    <!-- v-if="CI_CommissionType !== '0'"  -->
    <!-- <FormRow v-if="false">
      <FormControl>
        <safa-checkbox label="نامشخص" :m="m" />
      </FormControl>
      <FormControl>
        <safa-checkbox label="بدوی" :m="m" />
      </FormControl>
      <FormControl>
        <safa-checkbox label="تجدیدنظر" :m="m" />
      </FormControl>
      <FormControl>
        <safa-checkbox label="همعرض قم" :m="m" />
      </FormControl>
      <FormControl>
        <safa-checkbox label="همعرض" :m="m" />
      </FormControl>
      <FormControl>
        <safa-checkbox label="عدم پرداخت جریمه" :m="m" />
      </FormControl>
      <FormControl>
        <safa-checkbox label="اصلاحی" :m="m" />
      </FormControl>
      <FormControl>
        <safa-checkbox label="اصلاحی تجدید نظر" :m="m" />
      </FormControl>
      <FormControl>
        <safa-checkbox label="testPrint" :m="m" />
      </FormControl>
    </FormRow> -->
  </fit>
</template>

<script>
export default {
  props: {
    title: String,
    name: String,
    formKey: String,
    m: String,
    value: Object
  },
  data () {
    return {
      selectedCICommissionType: null,
      selectedCIPrintType: null,
      showPopup: false,
      gridApi: null,
      aDPPrintTypeList: [],
      columnDefs: [
        { title: 'نوع کمیسیون', field: 'CI_CommissionType', rowGroup: true, enableRowGroup: true, hide: true },
        { title: 'نوع چاپ', field: 'CI_PrintType' }
      ],
      gridOptions: {
        autoGroupColumnDef: {
          headerName: 'گروه نوع کمیسیون',
          minWidth: 200,
          field: 'isSelected',
          cellRendererParams: {
            checkbox: true
          }
        }
      }
    }
  },
  methods: {
    onUpdateValues (val) {
      // این خط بخاطر باگی که aggrid برای حالتی که گروه بندی نیاز هست اضافه شده
      this.aDPPrintTypeList = val.filter(x => x !== undefined)
    },
    async onGridReady (params) {
      this.gridApi = params.api

      await this.loadObj()
    },
    async loadObj () {
      try {
        const { data } =
          await this.$services.commissions.getADPPrintType({
          })
        if (data) {
          this.aDPPrintTypeList = data.GetADP_PrintTypeResult.ADP_PrintType
          await this.log({
            action: this.logActions.view,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
      }
    },
    async addToGrid () {
      let newObject = {
        "CI_CommissionType": this.selectedCICommissionType,
        "CI_PrintType": this.selectedCIPrintType
      }
      let isDuplicate = this.aDPPrintTypeList.some(item => item.CI_CommissionType === newObject.CI_CommissionType && item.CI_PrintType === newObject.CI_PrintType)
      if (!isDuplicate) {
        this.aDPPrintTypeList.push(newObject)
        await this.saveObj()
      } else {
        this.$q.dialog({
          title: 'سطر تکراری',
          message: 'گرید نوع کمیسون دارای سطر تکراری می باشد'
        })
      }
    },
    async saveObj () { // توی کلاس پدر صدا زده میشه
      try {
        const { data } =
          await this.$services.commissions.saveADPPrintType({
            "pClsPrintType": {
              "ADP_PrintType": this.aDPPrintTypeList
            }
          })
        if (data) {
          await this.log({
            action: this.logActions.save,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
          })
          this.$emit('commissionComboPrintUpdate', this.aDPPrintTypeList)
          await this.loadObj()
          this.showSuccess('با موفقیت ذخیره شد.')
        }
      } catch (e) {
        console.error(e)
      } finally {
      }
    },
    onCmbCommissionSelectionChanged () { // این بخش قرار هست سرویس کالی از بک برای ما ارسال کنند تا کار کند
      if (this.selectedItem !== null)
      {
        if (this.value.CommissionGridSetting.some(i => i.IDParent === this.selectedItem)) {
          this.value.CommissionGridSetting = this.value.CommissionGridSetting.filter(i => i.IDParent === this.selectedItem) }
        // this.value.CommissionGridSetting = this.cICommissionTypeRef.datasource
      }
    }
  }
}
</script>
