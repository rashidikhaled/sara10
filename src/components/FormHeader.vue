<template>
<!--  v-if="!nosazi.hideNosaziCodeHeader"-->
  <div
    class="q-pa-xs flat form-header" v-if="false"
      >
    <safa-status class="col-12" :reuslt="baseLibResult"></safa-status>
    <div v-if="isSelected" class=" row items-center q-ma-xs">
      <div class="col-auto">
        <p class="q-ma-none" style=" color: #ffffff;   font-size: 13px;">
          اطلاعات این پرونده با نام مالک&nbsp;<span style="color: #fec732;">
            {{ name }}</span
          >&nbsp;, &nbsp;&nbsp; شماره درخواست&nbsp;<span
            style="color: #fec732;"
          >
            {{ parvandeNum }}</span
          >&nbsp;, &nbsp;&nbsp; تاریخ تشکیل&nbsp;
          <span style="color: #fec732;"> {{ date }}</span> &nbsp;, نوع&nbsp;
          <span style="color: #fec732;"> {{ parvande }}</span
          >&nbsp;, کد نوسازی&nbsp;
          <span style="color: #fec732;"> {{ code }}</span> &nbsp;&nbsp; و
          آدرس&nbsp;
          <span style="color: #fec732;"> {{ address }}</span> &nbsp;&nbsp; قابل
          رویت می باشد.&nbsp;
        </p>
      </div>
    </div>
    <div v-if="!isSelected" class=" row items-center q-ma-md">
      <div class="col-auto">
        <p class="q-ma-none" style=" color: #ffffff;   font-size: 13px;">لطفا یک سطر از کارتابل انتخاب نمایید.</p>
      </div>
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      parvandeNum: '-------',
      date: '-------',
      parvande: '-------',
      code: '-------',
      ownerName: '-------',
      name: '-------',
      address: '-------',
      baseLibResult: null,
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: [],
        BuildingObj: {},
        Sh_RequestInfo: {},
        MainObj: {}
      },
      isSelected: true
    }
  },
  props: {
    passedRequest: {
      default: null,
      type: Object
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.isSelected = true
      this.loadRequestHeader()
      this.parvandeNum = this.selectedRequest.NidWorkItem
      this.date = this.selectedRequest.StartDate
      this.parvande = `${this.selectedRequest.WorkflowTitel} - ${this.selectedRequest.TaskTitel}`
      this.name = this.ownerName
      if (this.selectedRequest.BizCode !== null || this.selectedRequest.BizCode !== '') {
        let bizCodeArray = this.selectedRequest.BizCode.split('-')
        this.code =
        bizCodeArray[6] +
        '-' +
        bizCodeArray[5] +
        '-' +
        bizCodeArray[4] +
        '-' +
        bizCodeArray[3] +
        '-' +
        bizCodeArray[2] +
        '-' +
        bizCodeArray[1] +
        '-' +
        bizCodeArray[0]
      }
    } else {
      this.isSelected = false
    }
  },
  computed: {
    nosazi () {
      let parent = this.$parent
      while (parent) {
        if (Object.keys(parent.$attrs).length) {
          return parent.$attrs
        }
        if (parent === parent.$parent) {
          return
        }
        parent = parent.$parent
      }
      return {}
    }
  },
  methods: {
    loadRequestHeader () {
      // loadRequestHeader method
      this.ownerName = ''
      let self = this
      let nidProc = '00000000-0000-0000-0000-000000000000'
      if (!this.selectedRequest) {
        nidProc = this.selectedRequest.NidProc
      } else if (this.passedRequest !== null) {
        nidProc = this.passedRequest.NidProc
      }
      let data = {
        pNidProc: nidProc,
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.loadRequestHeader(data, {
        config: {
          District: convertStringToNosaziCodeObject(
            this.selectedRequest.BizCode
          ).District
        }
      })
        .then(({ data }) => {
          self.baseLibResult = this.getResponse(data)

          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data
            this.nosaziCode = self.baseLibResults._NidNosaziCode
            if (self.baseLibResults.Base_Owner.length !== 0) {
              for (var i = 0; i < self.baseLibResults.Base_Owner.length; i++) {
                if (
                  self.baseLibResults.Base_Owner[i].OwnerName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerLastName !== null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerName +
                    ' ' +
                    self.baseLibResults.Base_Owner[i].OwnerLastName +
                    ','
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerLastName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerName + ','
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerLastName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerLastName + ','
                }
                this.name = this.ownerName
              }
            }

            if (self.baseLibResults.Sh_RequestInfo !== null) {
              this.nidWorkItem = self.baseLibResults.Sh_RequestInfo.NidWorkItem
              this.requestDate = self.baseLibResults.Sh_RequestInfo.RequestDate
              this.workFlowTitle =
                self.baseLibResults.Sh_RequestInfo.WorkflowTitel
              this.address = this.baseLibResults.Sh_RequestInfo.RequesterAddress
            }
            if (this.baseLibResults.Base_AddressInfo !== null) {
              this.address += ',' + this.baseLibResults.Base_AddressInfo.MainAddress
            }
          }
        })
        .catch(response => {
          this.showServerError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
