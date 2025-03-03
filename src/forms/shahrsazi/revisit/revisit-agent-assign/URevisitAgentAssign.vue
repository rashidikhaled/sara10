<template>
  <safa-form
    :id="formKey"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    caption="شهرسازی- اعلام مامور بازدید"
  >
    <form-wrapper title="اعلام مامور بازدید" @load="$emit('load')">
      <fit>
        <safa-status :result="result"/>
        <safa-status :result="baseLibResult"/>
        <safa-status :result="saveResult"/>
        <div
          v-if="!forceReadonly"
          class="row q-gutter-x-lg q-gutter-y-sm q-mb-sm"
        >
          <safa-text
            v-model="parvandeNum"
            cdcName="parvandeNum"
            class="col-12 col-lg-2 col-md-3 col-sm-5"
            label="شماره درخواست"
            label-width="75px"
            m="r"
          />
          <safa-text
            v-model="shRevisit.UserName"
            cdcName="UserName"
            class="col-12 col-lg-2 col-md-3 col-sm-5"
            label="مامور بازدید"
            label-width="75px"
            m="r"
          />
          <!-- {{shRevisit.RevisitDate}} -->
          <safa-datepicker
            v-model="shRevisit.RevisitDate"
            cdcName="RevisitDate"
            class="col-12 col-lg-2 col-md-3 col-sm-5"
            label="تاریخ بازدید"
            label-width="75px"
            m="r"
          />
        </div>
        <div class="row q-gutter-x-lg q-gutter-y-sm q-mb-sm">
          <safa-combo
            v-model="selectedVisitType"
            cdcName="selectedVisitType"
            ciName="CI_VisitType"
            class="col-12 col-lg-2 col-md-3 col-sm-5"
            domainName="CI_SaraM1"
            label="نوع بازدید"
            label-width="75px"
          />
          <safa-text
            v-model="shRevisit.RevisitTimeFrom"
            cdcName="RevisitTimeFrom"
            class="col-12 col-lg-2 col-md-3 col-sm-5"
            label="ساعت بازدید از"
            label-width="75px"
            m="r"
          />
          <safa-text
            v-model="shRevisit.RevisitTimeTo"
            cdcName="RevisitTimeTo"
            class="col-12 col-lg-2 col-md-3 col-sm-5"
            label="تا"
            label-width="75px"
          />
        </div>
        <!-- Grid -->
        <safa-datatable
          id="C56A4180-65AA-42EC-A945-5FD21DEC0538"
          v-model="assignedRevisitInfo.Revisits_ThisRequest"
          cdcName="Revisits_ThisRequest"
          :badgeConfig="{
            IsActive: [
              {
                bgColor: '#EFD630',
                textColor: '#000000',
                label: 'غیرفعال',
                condition: ({ row }) => row.IsActive === 0,
              },
              {
                bgColor: 'positive',
                textColor: '#FFFFFF',
                label: 'فعال',
                condition: ({ row }) => row.IsActive === 1,
              },
            ],
          }"
          :hideHeader="true"
          fit
          height="100%"
          helper="assignedRevisitInfo"
          max-height="100%"
          minHeight="100%"
          title="مامورین بازدید"
          @selectedChange="handleRevisitSelectedOnGrid"
        />
      </fit>
      <template v-slot:footer>
        <FormActions :showEditButton="false">
          <template v-slot:after >
            <btn-default
              label="نوبت دهی بازدید"
              @click="revisitCalendarDialogState = true"
            />
            <btn-default label="اعلام" @click="getBaseLibInNidProc"/>
            <btn-default
              v-show="selectedRevisit"
              label="فعال کردن"
              @click="handleActivate"
            />
            <span v-show="selectedRevisit">
              <btn-delete
                label="حذف"
                spCaption="حذف"
                spId="375e5d62-edf6-4204-815d-058df4dadd21"
                @click="handleRemove"
              />
            </span>
            <btn-default
              label="گزارش"
              spCaption="گزارش"
              spId="fee0481f-f802-4a63-ac58-831cbd0724e2"
              @click="report"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
    <!-- Calendar -->
    <safa-popup
      v-model="revisitCalendarDialogState"
      title="انتخاب مامور بازدید"
      vertical
      width="1000px" height="800px"
    >
      <u-revisit-agent-calendar
        :district="selectedDistrict"
        :isSelectFromMenu="isSelectFromMenu"
        selection
        @input="handleAgentCalendarSelected"
        @revisitAgentActivity="revisitAgentActivity"
        @closePopup="closePopup"
      />
    </safa-popup>
  </safa-form>
</template>
<script>
import PersianDate from 'persian-date'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import assignedRevisitInfoRequestModel from './models/assignedRevisitInfoRequest'
import shRevisitModel from './models/shRevisit'
import URevisitAgentCalendar from './revisit-agent-calendar/URevisitAgentCalendar'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/revisit-agents/assign',
  mixins: [baseFormMixin],
  components: {
    URevisitAgentCalendar
  },

  data () {
    return {
      title: 'اعلام مامور بازدید',
      formKey: '5d23c002-df2a-475e-a22b-58d76c28deab',
      name: 'URevisitAgentAssign',
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      revisitCalendarDialogState: false,
      assignedRevisitInfo: { ...assignedRevisitInfoRequestModel },
      shRevisit: { ...shRevisitModel },
      selectedRevisit: null,
      baseLibResult: null,
      baseLibResults: { BuildingObj: {} },
      nidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
      selectedVisitType: null,
      result: {},
      saveResult: null,
      revisitAgentIsActive: true,
      parvandeNum: null,
      isView: false
    }
  },

  methods: {
    closePopup (i) {
      this.revisitCalendarDialogState = i
    },
    revisitAgentActivity (IsActive) {
      this.revisitAgentIsActive = IsActive
    },
    async getBaseLibInNidProc () {
      this.showLoading()
      if (this.revisitAgentIsActive) {
        let payLoad = {
          pNidProc: this.selectedRequest.NidProc,
          pLoadFunc: ''
        }
        try {
          const { data } = await this.$services.SA.getBaseLibInNidProc(
            payLoad,
            {
              config: {
                District: this.selectedDistrict
              }
            }
          )
          this.baseLibResult = this.getResponse(data)
          if (this.baseLibResult.success) {
            this.baseLibResults = this.baseLibResult.data
            if (this.baseLibResults.BuildingObj !== null) {
              this.nidNosaziCodeParent =
                this.baseLibResults.BuildingObj.NidNosaziCode
            }
            await this.handleAssign()
          }
        } catch (response) {
          console.error('error', response)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      } else {
        this.showError('خطا : مامور انتخاب شده غیرفعال است.')
        this.hideLoading()
      }
    },
    handleAgentCalendarSelected (calendar) {
      const normalizeTime = calendar?.time?.split(':')?.map((x) => Number(x)) || []
      const normalizeDate = calendar.date.split('/').map((x) => Number(x))
      const result = new PersianDate([...normalizeDate, ...normalizeTime])
        .add('minutes', 30)
        .format('h:mm:ss')
      this.shRevisit = {
        ...shRevisitModel,
        ...calendar.agent,
        RevisitDate: calendar.date,
        RevisitTimeFrom: calendar.time,
        RevisitTimeTo: result
      }
      this.revisitCalendarDialogState = false
    },

    handleRevisitSelectedOnGrid (e) {
      const { NidRevisit } = e.dataItem || {}
      this.selectedRevisit =
        this.assignedRevisitInfo.Revisits_ThisRequest.filter(
          (x) => x['NidRevisit'] === NidRevisit
        )[0]
    },

    handleActivate () {
      if (!this.selectedRevisit) {
        return this.showError('هیچ ردیفی انتخاب نشده است')
      }
      const handler = async () => {
        try {
          this.showLoading()
          let payLoad = {
            PNidRevisit: this.selectedRevisit.NidRevisit
          }
          const { data } = await this.$services.SC.activeRevisitForRequest(
            payLoad,
            {
              config: {
                District: this.selectedDistrict
              }
            }
          )
          this.result = this.getResponse(data)
          if (this.result.success !== true) {
            return this.showError('بازدید فعال نشد')
          }
          this.showSuccess('بازدید فعال شد')

          // Activate what to do
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `عملیات فعال سازی بازدید ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید`
          })

          this.load()

          // end
        } catch (e) {
          console.error('error', e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm('آیا از فعال سازی اعلام مامور اطمینان دارید؟').onOk(
        handler
      )
    },
    handleRemove () {
      if (!this.selectedRevisit) {
        return this.showError('هیچ ردیفی انتخاب نشده است')
      }
      const handler = async () => {
        try {
          this.showLoading()
          let payLoad = {
            PNidRevisit: this.selectedRevisit.NidRevisit
          }
          const { data } = await this.$services.SC.deleteRevisit(payLoad, {
            config: {
              District: this.selectedDistrict
            }
          })
          this.result = this.getResponse(data)
          if (this.result.success !== true) {
            return this.showError('بازدید حذف نشد')
          }
          this.showSuccess('بازدید با موفقیت حذف شد')

          await this.log({
            action: this.logActions.delete,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `عملیات حذف بازدید ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید`
          })

          this.load()

          // end
        } catch (e) {
          console.error('error', e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm('آیا از حذف اعلام مامور اطمینان دارید؟').onOk(handler)
    },
    async handleAssign () {
      if (!this.shRevisit.NidRevisitAgent) {
        return this.showError('مامور انتخاب نشده است')
      }

      try {
        let payLoad = {
          PRevisit: {
            CI_VisitType: this.selectedVisitType,
            IsDoIt: false,
            NidProc: this.selectedRequest.NidProc,
            NidNosaziCode: '00000000-0000-0000-0000-000000000000',
            NidRevisit: '00000000-0000-0000-0000-000000000000',
            NidRevisitAgent: this.shRevisit.NidRevisitAgent,
            RevisitDate: this.shRevisit.RevisitDate,
            RevisitTimeFrom: this.shRevisit.RevisitTimeFrom,
            RevisitTimeTo: this.shRevisit.RevisitTimeTo
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          },
          pNidNosaziCode_Parent:
            this.nidNosaziCodeParent || '00000000-0000-0000-0000-000000000000'
        }
        const { data } = await this.$services.SC.addAssignRevisit(payLoad, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.showSuccess('مامور بازدید تخصیص یافت')
          // Asign What to do
        } else {
          this.showError('مامور بازدید تخصیص نیافت')
        }
        await this.log({
          action: this.logActions.save,
          bizCode: this.selectedRequest.BizCode,
          bizCodeTitle: 'کد نوسازی',
          nosaziCode: this.selectedRequest.BizCode,
          nidWorkItem: this.selectedRequest.NidWorkItem,
          saveDesc: `عملیات تخصیص مامور بازدید برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید`
        })
        await this.load()
      } catch (error) {
        this.showError(error)
      }
    },

    async load () {
      this.assignedRevisitInfo = { ...assignedRevisitInfoRequestModel }
      this.shRevisit = { ...shRevisitModel }
      this.selectedRevisit = null

      if (!this.selectedRequest) {
        return this.showError('هیچ درخواستی در کارتابل انتخاب نشده است')
      }
      try {
        this.showLoading()
        let payLoad = {
          PNidProc: this.selectedRequest.NidProc
        }
        const { data } = await this.$services.SC.getAssignRevisitInfo(payLoad, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('لیست بازدیدهای تخصیص یافته بارگذاری نشد')
        }
        this.assignedRevisitInfo = this.result.data
        //  this.assignedRevisitInfo.Revisits_ThisRequest.map((x) => {
        //    if (x.IsActive === 1) {
        //      x.class = 'revisit-active'
        //    }
        //    return x
        // })

        if (!this.isView) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `عملیات بارگذاری اطلاعات ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید`
          })
        }
        this.isView = true

        // end
      } catch (e) {
        console.error(e)
        this.showError(e)
      } finally {
        this.hideLoading()
      }
    },
    report () {
      const reportPath =
        '/Sara8Reports/RptRevisitAgent'
      let revisitId = '00000000-0000-0000-0000-000000000000'
      if (this.selectedRevisit) {
        revisitId = this.selectedRevisit.NidRevisit
      } else if (this.assignedRevisitInfo.Revisits_ThisRequest.length > 0) {
        revisitId = this.assignedRevisitInfo.Revisits_ThisRequest[0].NidRevisit
      }

      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NIdUser: this.getNidUser(),
        RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        NidRevisit: revisitId
      }
      this.showReport(reportPath, queryParams)
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.parvandeNum = this.selectedRequest.NidWorkItem
      this.load()
    } else {
      return this.showError('هیچ درخواستی در کارتابل انتخاب نشده است')
    }
  }
}
</script>
