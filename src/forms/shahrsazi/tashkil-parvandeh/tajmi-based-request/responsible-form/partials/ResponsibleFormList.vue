<template>
  <div class="row">
    <div class="col-12 col-md-auto">
      <div class="q-pa-md" style="max-width: 350px; width: 300px;">
        <q-toolbar class="bg-grey-7 text-white shadow-2">
          <q-toolbar-title>لیست فرم ها</q-toolbar-title>
        </q-toolbar>
        <q-scroll-area style="height: calc(100vh - 200px); width: 100%;">
          <q-list bordered separator v-if="forms && forms.length > 0">
            <q-intersection
              v-for="form in forms"
              :key="form.NidForm"
              transition="fade"
              class="example-item"
              once
            >
              <q-item
                @click="showClick(form)"
                class="q-my-sm"
                clickable
                v-ripple
              >
                <q-item-section>
                  <q-item-label>{{ form.Caption }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="text_snippet" color="green"/>
                </q-item-section>
              </q-item>
            </q-intersection>
          </q-list>
          <q-list bordered separator v-else>
            <q-intersection
              v-for="(item, index) in Array(20).fill('')"
              :key="index"
              transition="scale"
              class="example-item"
              once
            >
              <q-item>
                <q-item-section class="q-my-sm">
                  <q-item-label>
                    <q-skeleton type="text"/>
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="text" width="65%"/>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-intersection>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
    <div class="col-12 col-md">
      <div class="form-view q-mt-md">
        <component
          :isSelectFromWorkflow="false"
          :isSelectFromMenu="false"
          :isSelectFromResponder="true"
          v-if="selectedForm"
          :taskInfo="selectedRow"
          :is="selectedForm.FormUrl"/>
        <div v-else class="flex items-top justify-center q-pt-xl">
          <span class="text-h5 text-grey-5">محل نمایش جزئیات فرم ها</span>
        </div>
      </div>
    </div>
    <!--    <safa-datagrid-->
    <!--    helper="formList"-->
    <!--     v-model="results"-->
    <!--     @ShowClick="showClick" />-->
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
// import dynamicForms from '../../../utils/getDynamicForms'

export default {
  data: function () {
    return {
      forms: [],
      showDetails: false,
      selectedForm: null
    }
  },
  mixins: [baseFormMixin],
  props: {
    selectedRow: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  mounted () {
    this.getFormList()
  },
  methods: {
    getFormList () {
      this.showLoading()
      let data = {}
      // var forms = dynamicForms()
      // // console.log(forms)

      this.$services.task
        .getFormList(data)
        .then(async ({ data }) => {
          // console.log('form list', data)
          const result = this.getResponse(data)
          if (result.success) {
            this.forms = result.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    sotrBasedOnCaption (a, b) {
      if (a.Caption < b.Caption) {
        return -1
      } else if (a.Caption > b.Caption) {
        return 1
      } else {
        return 0
      }
    },
    showClick (form) {
      // let nid = form.NidForm
      // const id = nid
      // const form = this.results.filter(x => x.NidForm === id)[0]
      if (!form) {
        console.error('فرم پیدا نشد')
        return
      }
      // console.log(form)
      // const FormUrl = form.FormUrl
      // const taskSubForm = 'respoder-' + FormUrl
      // const resolve = this.$router.resolve({ name: taskSubForm })
      // if (resolve.href === '/') {
      //   console.warn('Form not resolved: ', resolve)
      //   return
      // }
      // this.$router.push({ name: taskSubForm }).catch(() => {})
      if (form.FormUrl && form.FormUrl.indexOf('.') > -1) {
        this.selectedForm = null
      } else {
        this.selectedForm = form
      }
    }
  },
  watch: {
    selectedForm (value) {
      if (value) this.showDetails = true
    }
  }
}
</script>
<style lang="scss">
.form-view {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 200px);
  display: inline-block;
  background-color: #f9f9f9;

  .form-wrapper {
    box-shadow: none !important;
    margin: 0 !important;
  }
}
</style>

// let tmpForms = [] // this.allForms = [] // this.results.forEach(x => { // if
(x.XapName !== null && x.XapName.includes('UI.SC.xap')) { // tmpForms.push(x) //
} // }) // tmpForms.forEach(item => { // if (item.FormUrl ===
'UI.SC.UserControl.UMapControl' || // item.FormUrl ===
'UI.SC.UserControl.URevisit' || // item.FormUrl === 'UI.SC.UserControl.UBarokaf'
|| // item.FormUrl === 'UI.SC.UserControl.UParvanehConfirmLicence' || //
item.FormUrl === 'UI.SC.UserControl.UPayankarConfirmLicence' || // item.FormUrl
=== 'UI.SC.UserControl.UPeace' || // item.FormUrl ===
'UI.SC.UserControl.UMovafeghatOsooliConfirmLicence' || // item.FormUrl ===
'UI.SC.UserControl.UMissFoulConfirmLicence' || // item.FormUrl ===
'UI.SC.UserControl.UInquiriesResponseConfirmLicence' || // item.FormUrl ===
'UI.SC.UserControl.UAgreement' || // item.FormUrl ===
'UI.SC.UserControl.UAnalysisMissFoul' || // item.FormUrl ===
'UI.SC.UserControl.UAnalysisMovafeghatOsooli' || // item.FormUrl ===
'UI.SC.UserControl.UMovafeghatOsooliList' || // item.FormUrl ===
'UI.SC.UserControl.UAnalysisParvaneh' || // item.FormUrl ===
'UI.SC.UserControl.UZabeteh' || // item.FormUrl ===
'UI.SC.UserControl.UCommissionDetails' || // item.FormUrl ===
'UI.SC.UserControl.UManagementConfirm' || // item.FormUrl ===
'UI.SC.UserControl.UMapOrderConfirmLicence' || // item.FormUrl ===
'UI.SC.UserControl.UAssignRevisit' || // item.FormUrl ===
'UI.SC.UserControl.UPlans' || // item.FormUrl === 'UI.SC.FrmEditRequest' || //
item.FormUrl === 'UI.SC.UserControl.UShenasnameFani' || // item.FormUrl ===
'UI.SC.UserControl.UMokatebatConfirm' || // item.FormUrl ===
'UI.SC.UserControl.UHouseTafkik' || // item.FormUrl === 'UI.SC.UEstateControl'
|| // item.FormUrl === 'UI.SC.UserControl.UDutyCodes' || // item.FormUrl ===
'UI.SC.UserControl.UParkingStaff' || // item.FormUrl ===
'UI.SC.UserControl.UCommissionInfo' // ) { // this.allForms.push(item) // } //
}) // this.allForms.push( // { // Caption: 'درآمد', // FormUrl:
'UI.SC.UserControl.UIncomeHistory', // NidForm:
'4235B5E0-9A2B-41B9-A9DC-463554B9836C' // } // ) // this.allForms.push( // { //
Caption: 'توضیحات درخواست', // FormUrl: 'UI.SA.UTaskDescription', // NidForm:
'F9A678F2-3717-4238-BC24-A06D095383D8' // } // ) // this.allForms.push( // { //
Caption: 'ریزمحاسبات درآمد', // NidForm: 'C50213A7-0E5D-4ECA-8618-FCF2BD807ACB'
// } // ) // this.allForms.push( // { // Caption: 'گزارش تحلیل موافقت اصولی', //
NidForm: '172F920E-6F98-45F0-B651-20D8D5708DA8' // } // ) // this.allForms.push(
// { // Caption: 'گزارش تحلیل تعیین خلاف', // NidForm:
'CC820B4A-3BD6-4647-86A7-00768AC8E50E' // } // ) // this.allForms.push( // { //
Caption: 'گزارش تحلیل پروانه', // NidForm:
'5DD799C3-FD3D-4D1F-B116-5E49C2B00A15' // } // ) // this.allForms.push( // { //
Caption: 'گزارش توضیحات درخواست', // NidForm:
'D355FACE-B6F8-4B58-8BCC-9A74F26864BD' // } // ) // this.allForms.push( // { //
Caption: 'گزارش موافقت اصولی', // NidForm:
'37016D6F-F12A-4B02-88F5-DF212CDD1DA4' // } // ) // this.allForms.push( // { //
Caption: 'گزارش جریمه لایحه', // NidForm: '1D84312E-642E-40AF-B245-A5DB2B554AD1'
// } // ) // this.allForms.push( // { // Caption: 'گزارش کنترل نقشه', //
NidForm: 'd9044be7-13db-46a9-a7d1-891796e177b7' // } // ) // this.allForms.push(
// { // Caption: 'گزارش دستور نقشه', // NidForm:
'CFEAA6F1-2C47-4785-AFF6-45DDDEA917FF' // } // ) // this.allForms.push( // { //
Caption: 'گزارش جریمه لایحه', // NidForm: '1D84312E-642E-40AF-B245-A5DB2B554AD1'
// } // ) // this.allForms.push( // { // Caption: 'گزارش جریمه لایحه', //
NidForm: '1D84312E-642E-40AF-B245-A5DB2B554AD1' // } // ) // this.allForms.push(
// { // Caption: 'گزارش جریمه لایحه', // NidForm:
'1D84312E-642E-40AF-B245-A5DB2B554AD1' // } // ) // if
(this.selectedRow.EumNosaziCodeObjType === 1) { // this.allForms.push( // { //
Caption: 'گزارش جریمه لایحه', // NidForm: '1D84312E-642E-40AF-B245-A5DB2B554AD1'
// } // ) // } // if (this.selectedRow.EumNosaziCodeObjType === 2) { //
this.allForms.push( // { // Caption: 'گزارش بازدید عرصه', // NidForm:
'621C3AF8-220B-46FF-AFE5-AD5BA17AE357' // } // ) // } // if
(this.selectedRow.EumNosaziCodeObjType === 3) { // this.allForms.push( // { //
Caption: 'گزارش بازدید ساختمان', // NidForm:
'FFF14F37-6167-43AA-89DD-9EEF9C4F8DD8' // } // ) // } // if
(this.selectedRow.EumNosaziCodeObjType === 4) { // this.allForms.push( // { //
Caption: 'گزارش بازدید آپارتمان', // NidForm:
'04725C45-041C-4F98-843D-816B0D98DE2D' // } // ) // } // if
(this.selectedRow.EumNosaziCodeObjType === 5) { // this.allForms.push( // { //
Caption: 'گزارش بازدید دستگاه', // NidForm:
'F694D277-DDDB-4D00-B1F7-1A59E123813C' // } // ) // } // if
(this.selectedRow.EumNosaziCodeObjType === 6) { // this.allForms.push( // { //
Caption: 'گزارش بازدید صنفی', // NidForm: 'D070DE7D-4151-447F-A2F2-66BD21F4A4AB'
// } // ) // } // this.allForms.push( // { // Caption: 'استعلام اداره برق', //
NidForm: '5c486edc-76a6-4707-8200-7f07ecee2396' // } // ) // this.allForms.push(
// { // Caption: 'ارجاع پرونده به مهندس', // NidForm:
'3cb1869b-ae17-4a42-bca9-ac1221cb4d05' // } // ) // this.allForms.push( // { //
Caption: 'دبیرخانه مهندسین', // NidForm: 'c03a1888-e68c-41f0-9e73-be517764998e'
// } // ) // this.allForms.push( // { // Caption: 'گزارش دستور کمیسیون ماده صد',
// NidForm: '01993D89-315B-4A5E-A46D-1C8B6F0FEA46' // } // ) //
this.allForms.sort(this.sotrBasedOnCaption()) // }
