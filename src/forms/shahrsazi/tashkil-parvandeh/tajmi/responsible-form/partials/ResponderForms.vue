<template>
  <fit>
    <safa-datatable
      :selectable="false"
      :columns="formListColumns.columns"
      v-model="formList"
    >
      <template #forms="{props}">
        <q-btn
          flat
          color="primary"
          label="نمایش"
          @click="showForm(props)"
        />
      </template>
    </safa-datatable>
  </fit>
</template>

<script>
import formUrls from '../models/formUrls'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'ResponderForms',
  mixins: [baseFormMixin],
  props: {
    task: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      result: null,
      formList: [],
      allowedForms: [
        'UI.SC.UserControl.UMapControl',
        'UI.SC.UserControl.URevisit',
        'UI.SC.UserControl.UBarokaf',
        'UI.SC.UserControl.UParvanehConfirmLicence',
        'UI.SC.UserControl.UPayankarConfirmLicence',
        'UI.SC.UserControl.UPeace',
        'UI.SC.UserControl.UMovafeghatOsooliConfirmLicence',
        'UI.SC.UserControl.UMissFoulConfirmLicence',
        'UI.SC.UserControl.UInquiriesResponseConfirmLicence',
        'UI.SC.UserControl.UAgreement',
        'UI.SC.UserControl.UAnalysisMissFoul',
        'UI.SC.UserControl.UAnalysisMovafeghatOsooli',
        'UI.SC.UserControl.UMovafeghatOsooliList',
        'UI.SC.UserControl.UAnalysisParvaneh',
        'UI.SC.UserControl.UZabeteh',
        'UI.SC.UserControl.UCommissionDetails',
        'UI.SC.UserControl.UCommissionFine',
        'UI.SC.UserControl.UCommisionDraft',
        'UI.SC.UserControl.UManagementConfirm',
        'UI.SC.UserControl.UMapOrderConfirmLicence',
        'UI.SC.UserControl.UAssignRevisit',
        'UI.SC.UserControl.UPlans',
        'UI.SC.FrmEditRequest',
        'UI.SC.UserControl.UShenasnameFani',
        'UI.SC.UserControl.UMokatebatConfirm',
        'UI.SC.UserControl.UHouseTafkik',
        'UI.SC.UEstateControl',
        'UI.SC.UserControl.UDutyCodes',
        'UI.SC.UserControl.UParkingStaff',
        'UI.SC.UserControl.UCommissionInfo'
      ],
      formListColumns: {
        columns: [
          { field: 'forms', title: 'نمایش', editor: 'action', width: '100px' },
          { field: 'Caption', title: 'عنوان', width: 'auto' }
        ]
      }
    }
  },

  computed: {
    formListConstants () {
      // All request will have
      const firstPart = [
        {
          Caption: 'درآمد',
          FormUrl: 'UI.SC.UserControl.UIncomeHistory',
          NidForm: '4235B5E0-9A2B-41B9-A9DC-463554B9836C'
        },
        {
          Caption: 'توضیحات درخواست',
          FormUrl: 'UI.SA.UTaskDescription',
          NidForm: 'F9A678F2-3717-4238-BC24-A06D095383D8'
        },
        {
          Caption: 'ریزمحاسبات درآمد',
          NidForm: 'C50213A7-0E5D-4ECA-8618-FCF2BD807ACB'
        },
        {
          Caption: 'گزارش تحلیل موافقت اصولی',
          NidForm: '172F920E-6F98-45F0-B651-20D8D5708DA8'
        },
        {
          Caption: 'گزارش تحلیل تعیین خلاف',
          NidForm: 'CC820B4A-3BD6-4647-86A7-00768AC8E50E'
        },
        {
          Caption: 'گزارش تحلیل پروانه',
          NidForm: '5DD799C3-FD3D-4D1F-B116-5E49C2B00A15'
        },
        {
          Caption: 'گزارش توضیحات درخواست',
          NidForm: 'D355FACE-B6F8-4B58-8BCC-9A74F26864BD'
        },
        {
          Caption: 'گزارش موافقت اصولی',
          NidForm: '37016D6F-F12A-4B02-88F5-DF212CDD1DA4'
        },
        {
          Caption: 'گزارش جریمه لایحه',
          NidForm: '1D84312E-642E-40AF-B245-A5DB2B554AD1'
        },
        {
          Caption: 'گزارش کنترل نقشه',
          NidForm: 'd9044be7-13db-46a9-a7d1-891796e177b7'
        },
        {
          Caption: 'گزارش دستور نقشه',
          NidForm: 'CFEAA6F1-2C47-4785-AFF6-45DDDEA917FF'
        }
      ]

      // By EumNosaziCodeObjType
      let middlePart = []
      switch (this.task.EumNosaziCodeObjType) {
        case 4:
          middlePart = [
            {
              Caption: 'گزارش بازدید آپارتمان',
              NidForm: '04725C45-041C-4F98-843D-816B0D98DE2D'
            }
          ]
          break
        case 3:
          middlePart = [
            {
              Caption: 'گزارش بازدید ساختمان',
              NidForm: 'FFF14F37-6167-43AA-89DD-9EEF9C4F8DD8'
            }
          ]
          break
        case 2:
          middlePart = [
            {
              Caption: 'گزارش بازدید عرصه',
              NidForm: '621C3AF8-220B-46FF-AFE5-AD5BA17AE357'
            }
          ]
          break
        case 5:
          middlePart = [
            {
              Caption: 'گزارش بازدید دستگاه',
              NidForm: 'F694D277-DDDB-4D00-B1F7-1A59E123813C'
            }
          ]
          break
        case 6:
          middlePart = [
            {
              Caption: 'گزارش بازدید صنفی',
              NidForm: 'D070DE7D-4151-447F-A2F2-66BD21F4A4AB'
            }
          ]
          break
      }

      // All request will have, again
      // Order is matter here
      const lastPart = [
        {
          Caption: 'استعلام اداره برق',
          NidForm: '5c486edc-76a6-4707-8200-7f07ecee2396'
        },
        {
          Caption: 'ارجاع پرونده به مهندس',
          NidForm: '3cb1869b-ae17-4a42-bca9-ac1221cb4d05'
        },
        {
          Caption: 'دبیرخانه مهندسین',
          NidForm: 'c03a1888-e68c-41f0-9e73-be517764998e'
        }
      ]
      return [...firstPart, ...middlePart, ...lastPart]
    }
  },

  methods: {
    showForm ({ dataItem }) {
      // console.log('showForm: ', dataItem)
      const { Caption, NidForm = '' } = dataItem || {}
      const targetForm = formUrls[NidForm.toUpperCase()]
      if (!targetForm) {
        this.showWarning(` فرم «${Caption}» تعریف نشده است`)
        return
      }
      if (!targetForm.route) {
        this.showWarning(`سیستم برای نمایش فرم «${Caption}» در حال توسعه است`)
      }
      // const props = targetForm.init(this.task)
      // console.log('try to show', { route: targetForm.route, ...props })
    },
    async load () {
      if (!this.task.NidProc || this.task.NidProc === '00000000-0000-0000-0000-000000000000') {
        return
      }
      try {
        this.showLoading()

        this.formList = []
        const { data } = await this.$services.task.getFormList({}, this.config)
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('لیست فرمها بارگذاری نشد')
        }
        this.formList = this.result.data
          .filter(x => x.XapName != null)
          .filter(x => /UI\.SC\.xap/ig.test(x.XapName)) // Include of "UI.SC.xap"
          .filter(x => this.allowedForms.includes(x.FormUrl))

          // Join constants and the API fetched
          .concat(this.formListConstants)

          // Order ASC by caption
          .sort((l, r) => l.Caption < r.Caption ? -1 : (l.Caption > r.Caption ? 1 : 0))

        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    }
  },
  mounted () {
    this.load()
  }
}
</script>
