<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper padding :title="title">
      <template #header>
        <div class="flex justify-end items-center" v-if="archiveActive==true">
          <btn-back
              class="q-ma-sm"
              label="بازگشت به اطلاعات کد نوسازی"
              @click="archiveActive=false"
            />
        </div>
        <safa-status :result="getUGPNewCodeRequestRes" />
        <safa-status :result="baseLibResult" />
        <safa-status :result="changeNewCodeRequestStatusRes" />
        <safa-status :result="smsStatusRes" />
      </template>
      <fit v-if="!archiveActive">
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="nosaziInformation" label="اطلاعات کدنوسازی" />
            <!-- <tab-menu name="Archive" label="آرشیو" /> -->
            <!-- <tab-menu name="sendSMS" label="ارسال پیامک" /> -->
          </template>

          <!-- first tab -->
          <tab-content name="nosaziInformation">
            <fit>
              <safa-grid
                title="اطلاعات کد نوسازی"
                :filterable="true"
                sortable
                v-model="nosaziInformation"
                cdcName="nosaziInformation"
                rowSelection="multiple"
                :isRowSelectable="() => true"
                :suppressRowClickSelection="false"
                :columns="nosaziInformationColumns"
                :checkboxSelection="true"
                :m="mode"
                paginate
                :pageSize="50"
                :addRow="false"
                :allowCopy="false"
                :isEditable="false"
                :deleteRow="false"
                @selection:changed="onSelectionChanged"
                class="q-mb-sm"
                />
              <div class="flex">
                <div class="q-mr-sm">
                  <btn-default label="تایید" @click="showPopup" />
                </div>
                  <div>
                    <btn-default label="عدم تایید" @click="onNotConfirm" />
                  </div>
              </div>
            </fit>
          </tab-content>
          <!-- second tab -->
          <!-- <tab-content name="Archive">
            <ArchiveWrap
              :name="archiveConfig.username"
              :pass="archiveConfig.password"
              :biz-code="archiveBizCode"
            />
          </tab-content> -->
          <!-- third tab -->
          <tab-content name="sendSMS">
              <fit>
                <div class="fit q-mb-sm">
                  <text-template
                    type="textarea"
                    label="متن پیامک"
                    label-width="80px"
                    :rows="2"
                    v-model="txtSMS"
                    cdcName="SMS"
                  />
                </div>
                <div>
                  <btn-default @click="sendSMS" label="ارسال" />
                </div>
              </fit>
          </tab-content>
          <safa-popup
            title="کد نوسازی"
            v-model="isShowNosazicode"
            width="300px"
            height="190px"
          >
            <div class="fit column">
              <safa-notice class="q-ma-sm">
                  ابتدا کد نوسازی را جستجو نموده و سپس دکمه تایید را کلیک نمایید
              </safa-notice>
              <nosazi-code-input
                v-model="baseNosaziCode"
                cdcName="baseNosaziCode"
                @enter="getBaseLibInNosaziCode"
                style="flex: 1"
                class="q-ma-sm"
              />
              <div class="q-ma-sm">
                <btn-default :disabled="!isBaseNosaziCodeSearched" label="تایید" @click="changeNewCode" />
              </div>
            </div>
          </safa-popup>
        </safa-tabs>
      </fit>
      <fit v-else>
          <ArchiveWrap
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :biz-code="archiveBizCode"
          />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { currentDate } from 'src/utils/index'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'وضعیت درخواست کد جدید شهروند سپاری',
      formKey: 'F6B062F8-9D4D-4A57-A84A-E168D41B74EB',
      name: 'UNewCodeRequest',
      main: true,
      sidebarCompatible: true,

      activeTab: 'nosaziInformation',
      txtSMS: null,
      CellPhone: '',
      archiveBizCode: null,
      strBizCode: '',
      strNosaziCode: null,
      isShowNosazicode: false,
      archiveActive: false,
      isBaseNosaziCodeSearched: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // service
      getUGPNewCodeRequestRes: null,
      model: {
        getUGPNewCodeRequestResult: {}
      },
      requestResult: null,
      // baseLibResults: {
      //   ArchiveWrapper: {
      //     BizCode: null
      //   },
      //   Base_RegisterPlack_Str: null
      // },
      archiveResults: { ArchiveWrapper: {} },
      nidNosaziCode: '00000000-0000-0000-0000-000000000000',

      changeNewCodeRequestStatusRes: null,
      baseLibResults: {
        _NidNosaziCode: '00000000-0000-0000-0000-000000000000'
      },
      baseLibResult: null,
      smsStatusRes: null,
      selectedRows: null,
      pEumUGPNewCodeRequestStatus: null,
      //   grid
      nosaziInformation: [],
      nosaziInformationColumns: [
        {
          field: 'isSelected',
          width: '80px',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: 'center',
          headerAlign: 'center',
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false
          // showDisabledCheckboxes: true,
          // editor: 'selection',
        },
        {
          field: "showDetail",
          btnTitle: "نمایش آرشیو",
          cellRenderer: "agCallbackBtn",
          width: 160,
          callback: (params) => this.onSelectedArchive(params),
          cellStyle: {
            padding: 0
          }
        },
        {
          field: 'NosaziCodeStr',
          title: 'کد نوسازی',
          width: '120px'
        },
        {
          field: 'EumUGPNewCodeRequestStatus',
          title: 'وضعیت درخواست ',
          width: '120px'
        },
        {
          field: 'FullName',
          title: 'نام و نام خانوادگی',
          width: '150px'
        },
        {
          field: 'NationalCode',
          title: 'کد ملی',
          width: '100px'
        },
        {
          field: 'CertificateNo',
          title: 'شماره گواهی',
          width: '150px'
        },

        {
          field: 'CellPhone',
          title: 'شماره موبایل',
          width: '120px'
        },
        {
          field: 'FatherName',
          title: 'نام پدر',
          width: '120px'
        },
        {
          field: 'Address',
          title: 'آدرس',
          width: '260px'
        },
        {
          field: 'PostalCode',
          title: 'کد پستی',
          width: '120px'
        },
        {
          field: 'RegisterPlack',
          title: 'پلاک ثبتی',
          width: '120px'
        },
        {
          field: 'RahgiriCode',
          title: 'کد رهگیری',
          width: '120px'
        },
        {
          field: 'RequestDate',
          title: 'تاریخ درخواست',
          width: '120px'
        },
        {
          field: 'RequestTime',
          title: 'ساعت درخواست',
          width: '150px'
        }
      ]
    }
  },
  mounted () {
    this.loadObj()
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('shahrsazi.UNewCodeRequest.archive')
    }
  },
  watch: {
    isShowNosazicode: {
      handler () {
        if (!this.isShowNosazicode) {
          this.isBaseNosaziCodeSearched = false
        }
      }
    }
  },
  methods: {
    loadObj () {
      this.showLoading()

      this.$services.SC.getUGPNewCodeRequest()
        .then(({ data }) => {
          this.getUGPNewCodeRequestRes = this.getResponse(data)
          if (this.getUGPNewCodeRequestRes.success) {
            this.nosaziInformation =
              this.getUGPNewCodeRequestRes.data.UGP_NewCodeRequest
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    changeNewCode () {
      if (this.pEumUGPNewCodeRequestStatus === 1 && (this.baseLibResults._NidNosaziCode === null || this.baseLibResults._NidNosaziCode === '00000000-0000-0000-0000-000000000000')) {
        this.showError("کد نوسازی وارد شده معتبر نمی باشد")
        return
      }
      this.showLoading()
      const payLoad = {
        pEumUGPNewCodeRequestStatus: this.pEumUGPNewCodeRequestStatus,
        pGID: this.selectedRows[0].GID,
        pNidNosaziCode: this.baseLibResults._NidNosaziCode,
        pNosaziCodeStr: this.strNosaziCode
      }
      this.$services.SC.changeNewCodeRequestStatus(payLoad).then(({ data }) => {
        this.changeNewCodeRequestStatusRes = this.getResponse(data)
        if (this.changeNewCodeRequestStatusRes.success) {
          this.showSuccess("عملیات مورد نظر با موفقیت انجام شد")
          this.nosaziInformation =
            this.changeNewCodeRequestStatusRes.data.Requirements
          this.loadObj()
          this.isShowNosazicode = false
        }
      })
        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    sendSMS () {
      if (!this.selectedRows || this.selectedRows.length === 0) {
        this.showError('لطفا یک ردیف را انتخاب نمایید')
        return
      }
      if (!this.txtSMS) {
        this.showError('لطفا متن پیام را وارد نمایید.')
        return
      }
      if (!this.selectedRows[0].CellPhone && this.selectedRows[0].CellPhone === '') {
        this.showError('شماره ای برای ارسال پیامک موجود نمی باشد.')
        return
      }
      const payLoad = {
        pParameter: {
          Text: this.txtSMS,
          Number: this.selectedRows[0].CellPhone,
          AppName: 'Sara10',
          BizCode: "", // مطابق با زمل
          SMSType: 'ارسال پیامک از منو',
          ScheduleSendDate: currentDate(),
          UserID: this.getNidUser(),
          UserName: this.getUserDisplayName()
        }
      }
      const { data } = this.$services.sendSMS.SendSMS(payLoad)
      this.smsStatusRes = this.getResponse(data)
      if (this.smsStatusRes.success) this.showSuccess('پیامک با موفقیت ارسال شد.')
    },
    showPopup () {
      this.showConfirm('آیا از تایید اطلاعات اطمینان دارید؟').onOk(async () => {
        this.isShowNosazicode = true
        this.baseNosaziCode = {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
        this.baseLibResults._NidNosaziCode = '00000000-0000-0000-0000-000000000000'
        this.pEumUGPNewCodeRequestStatus = 1
      })
    },
    onNotConfirm () {
      this.showConfirm('آیا از عدم تایید اطلاعات اطمینان دارید؟').onOk(async () => {
        this.pEumUGPNewCodeRequestStatus = 2
        this.changeNewCode()
      })
    },
    updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    },
    onSelectionChanged (params) {
      this.selectedRows = params.api.getSelectedRows()
    },
    onSelectedArchive (params) {
      this.updateArchiveBizCode(params.NationalCode)
      console.log("RahgiriCode", params.NationalCode)
      // this.activeTab = "Archive"
      this.archiveActive = true
    },
    getBaseLibInNosaziCode () {
      this.showLoading()
      const payLoad = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(payLoad, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.baseLibResult = this.getResponse(data)
          if (this.baseLibResult.success) {
            this.isBaseNosaziCodeSearched = true
            this.baseLibResults = this.baseLibResult.data
            this.strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.calculate,
              bizCode: this.strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })

        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
