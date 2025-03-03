<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <template #header>
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
      <form-header-by-nosazi-code
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
        m="r"
      />
    </template>
    <fit>
      <FormRow>
        <FormControl>
          <safa-text
            label="شماره دبیرخانه"
            label-width="100px"
            v-model="model.CommissionInfo.SecretariatNo"
            cdcName="SecretariatNo"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ارجاع"
            label-width="100px"
            v-model="model.CommissionInfo.UrbanNidKartablItem"
            cdcName="UrbanNidKartablItem"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="100px"
            v-model="model.CommissionInfo.OwnerName"
            cdcName="OwnerName"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره رای"
            label-width="100px"
            v-model="model.CommissionVote.VoteNo"
            cdcName="VoteNo"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ رای "
            label-width="100px"
            v-model="model.CommissionVote.VoteDate"
            cdcName="VoteDate"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع رای "
            label-width="100px"
            v-model="model.CI_CommissionType"
            cdcName="CI_CommissionType"
            domainName="Commission100"
            ciName="CI_CommissionType"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع چاپ "
            label-width="100px"
            v-model="model.CommissionInfo.CI_PrintType"
            cdcName="CI_PrintType"
            ciName="CI_PrintType"
            domainName="Commission100"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ابلاغ"
            label-width="100px"
            v-model="model.ClsCommission_Impart.Commission_Impart.ImpartNo"
            cdcName="ImpartNo"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ ابلاغ"
            label-width="100px"
            v-model="model.ClsCommission_Impart.Commission_Impart.ImpartDate"
            cdcName="ImpartDate"
            :m="mode"
          />
        </FormControl>
        <safa-text
          label="آدرس"
          label-width="100px"
          v-model="model.CommissionInfo.Address"
          cdcName="Address"
          :m="mode"
          class="col-12"
        />
      </FormRow>
      <q-separator class="q-my-sm" />
      <div class="q-gutter-sm">
        <!-- 1 -->
        <div class="flex items-center q-gutter-x-sm">
          <safa-radio label="" v-model="tebgh" val="68" :m="mode" />
          <span style="min-width: 200px"
            >طبق ماده 68 آيين دادرسي مدني به مالك/ذينفع</span
          >
          <safa-text
            class="q-mx-sm"
            style="max-width: 150px"
            :m="tebgh === '68' && isEditable ? 'e' : 'r'"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh68
            "
            cdcName="OwnerNameMadeh68"
          />
          <span>يا وكيل مالك</span>
          <safa-text
            class="q-mx-sm"
            style="max-width: 150px"
            :m="tebgh === '68' && isEditable ? 'e' : 'r'"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.LawyerOwnerMadeh68
            "
            cdcName="LawyerOwnerMadeh68"
          />
          <span>با اخذ وكالتنامه كاري يا دعاوي ابلاغ گرديد.</span>
        </div>
        <!-- 2 -->
        <div class="flex items-center q-gutter-x-sm">
          <safa-radio label="" v-model="tebgh" val="69" :m="mode" />
          <span style="min-width: 50px"
            >طبق ماده 69 آيين دادرسي مدني به آقاي/خانم</span
          >
          <safa-text
            class="q-mx-sm"
            style="max-width: 150px"
            :m="tebgh === '69' && isEditable ? 'e' : 'r'"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh69
            "
            cdcName="OwnerNameMadeh69"
          />
          <span>سمت و نوع وابستگی</span>
          <safa-text
            class="q-mx-sm"
            style="max-width: 150px"
            :m="tebgh === '69' && isEditable ? 'e' : 'r'"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.SideNameMadeh69
            "
            cdcName="SideNameMadeh69"
          />
          <span>مالك ابلاغ گرديد.</span>
        </div>
        <!-- 3 -->
        <div class="flex items-center q-gutter-x-sm">
          <safa-radio
            label="  طبق ماده 70 آيين دادرسي مدني به علت عدم حضور مالك و بستگان وي در محل الصاق قانوني گرديد. "
            v-model="tebgh"
            val="80"
            :m="mode"
          />
        </div>
        <!-- 4 -->
        <div class="flex items-center q-gutter-x-sm">
          <safa-radio :m="mode" label="" v-model="tebgh" val="70" />
          <span style="min-width: 200px"
            >طبق ماده 70 آيين دادرسي مدني به علت استنكاف از قبول اخطاريه توسط
            آقاي/خانم</span
          >
          <safa-text
            class="q-mx-sm"
            style="max-width: 150px"
            :m="tebgh === '70' && isEditable ? 'e' : 'r'"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh70
            "
            cdcName="OwnerNameMadeh70"
          />
          <span>مالك در محل الصاق قانوني گرديد .</span>
        </div>
        <!-- 5 -->
        <div class="flex items-center q-gutter-x-sm">
          <safa-radio label="" v-model="tebgh" val="76" :m="mode" />
          <span style="min-width: 200px"
            >مطابق ماده 76 قانون آيين دادرسي مدني به آقاي/خانم</span
          >
          <safa-text
            class="q-mx-sm"
            style="max-width: 150px"
            :m="tebgh === '76' && isEditable ? 'e' : 'r'"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh76
            "
            cdcName="OwnerNameMadeh76"
          />
          <span>دارای سمت</span>
          <safa-text
            class="q-mx-sm"
            style="max-width: 150px"
            :m="tebgh === '76' && isEditable ? 'e' : 'r'"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.SideNameMadeh76
            "
            cdcName="SideNameMadeh76"
          />
          <span> ابلاغ گرديد.</span>
        </div>
        <!-- 6 -->
        <div class="flex items-center q-gutter-x-sm">
          <safa-radio label="" v-model="tebgh" val="75" :m="mode" />
          <span style="min-width: 200px">
            مطابق ماده 75 آيين دادرسي به آقاي/خانم</span
          >
          <safa-text
            class="q-mx-sm"
            style="max-width: 150px"
            :m="tebgh === '75' && isEditable ? 'e' : 'r'"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.OwnerNameMadeh75
            "
            cdcName="OwnerNameMadeh75"
          />
          <span>دارای سمت</span>
          <safa-text
            class="q-mx-sm"
            style="max-width: 150px"
            :m="tebgh === '75' && isEditable ? 'e' : 'r'"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.SideNameMadeh75
            "
            cdcName="SideNameMadeh75"
          />
          <span>ابلاغ گرديد.</span>
        </div>
      </div>
      <q-separator class="q-my-sm" />
      <form-row>
        <FormControl>
          <safa-text
            label="تحویل گیرنده رای"
            label-width="100px"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.VoteReceiverName
            "
            cdcName="VoteReceiverName"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد ملی تحویل گیرنده"
            :maxlength="10"
            label-width="100px"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.VoteReceiverCode
            "
            cdcName="VoteReceiverCode"
            mask="##########"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره تحویل گیرنده"
            label-width="100px"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.VoteReceiverNo
            "
            cdcName="VoteReceiverNo"
            mask="###########"
            :maxlength="11"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام و نام خانوادگی مامور ابلاغ"
            label-width="100px"
            v-model="
              model.ClsCommission_Impart.Commission_Impart.NotificationagentName
            "
            cdcName="NotificationagentName"
            :m="mode"
          />
        </FormControl>
      </form-row>
      <div class="q-mt-sm">
        <text-template
          label="توضیحات"
          :m="mode"
          label-width="100px"
          :rows="3"
          v-model="model.CommissionInfo.Comments"
          cdcName="Comments"
          formKey="c2917194-1969-4ec8-8caa-1a9ac3df18d9"
        />
      </div>
      <q-file
        ref="fileUploader"
        :value="selectedFile"
        @input="fileChangeEvent"
        v-show="false"
      />
    </fit>
    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveObj"
      >
        <btn-delete label="بارگذاری فایل" @click="btnUploadFileClick" />
        <btn-default label="چاپ گزارش" @click="btnPrint" />
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
// import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "ابلاغ رای",
      name: "UNotificationVote",
      formKey: "71826ABA-3F38-4FD7-B622-6FCF5536C437",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true,

      // #region services
      loadObjRes: null,
      saveObjRes: null,

      // #region variables
      selectedFile: null,
      tebgh: "68",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        GetAllCommissionDetailsResult: {
          CI_CommissionType: 0,
          ClsCommission_ApposeVote: {
            Commission_ApposeVote: {
              NidCommission: null,
              NidUApposeVote: "00000000-0000-0000-0000-000000000000"
            }
          },
          // ClsCommission_ExecutTrackingVote: {
          //   Commission_ExecutTrackingVote: {
          //     NidCommission: null
          //   }
          // },
          ClsCommission_Impart: {
            Commission_Impart: {
              ImpartDate: null,
              ImpartNo: "",
              // NidCommission: "00000000-0000-0000-0000-000000000000",
              NidImpart: "00000000-0000-0000-0000-000000000000",
              NotificationagentName: null,
              VoteReceiverCode: null,
              VoteReceiverName: null,
              VoteReceiverNo: null,

              Desciption: null,
              OwnerNameMadeh68: null,
              LawyerOwnerMadeh68: null,
              OwnerNameMadeh69: null,
              SideNameMadeh69: null,
              OwnerNameMadeh70: null,
              OwnerNameMadeh75: null,
              SideNameMadeh75: null,
              OwnerNameMadeh76: null,
              SideNameMadeh76: null,
              TypeProcedure: 2
            }
          },

          ClsCommission_LegalProxy: {
            Commission_LegalProxy: {
              // BizCode: null,
              // NidCommission: "00000000-0000-0000-0000-000000000000",
              NidLegalProxy: "00000000-0000-0000-0000-000000000000"
            }
          },
          CommissionInfo: {
            Address: null,
            CI_PrintType: 0,
            SecretariatNo: 0,
            UrbanNidKartablItem: 0,
            OwnerName: "",
            Comments: null
            // NidCommission: "00000000-0000-0000-0000-000000000000",
          },
          CommissionVote: {
            VoteNo: 0,
            VoteDate: null
          }
          // NIDCommission: "00000000-0000-0000-0000-000000000000"
        }
      }
    }
  },
  async created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    loadObj () {
      try {
        this.showLoading()
        this.$services.commissions
          .getAllCommissionDetails({
            PRequest: {
              NIDCommission: this.selectedNidCommission // "cbb9aa98-e12a-4622-8e97-6eeaf686cc54"
            }
          })
          .then(async ({ data }) => {
            this.loadObjRes = this.getResponse(data)
            if (this.loadObjRes.success) {
              this.model = this.loadObjRes.data.GetAllCommissionDetailsResult
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedNidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `عملیات بارگذاری فرم ابلاغ رای برای درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
              })
            }
          })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    compareDays (date1 = "", date2 = "") {
      if (!date1 || !date2) return ""
      PersianDate.toCalendar("persian")
      const normalizeDate1 = new PersianDate(
        date1.split("/").map((x) => Number(x))
      )
      const normalizeDate2 = new PersianDate(
        date2.split("/").map((x) => Number(x))
      )
      return normalizeDate1.diff(normalizeDate2, "days")
    },
    saveObj () {
      const diff = this.compareDays(
        this.model.CommissionVote.VoteDate,
        this.model.ClsCommission_Impart.Commission_Impart.ImpartDate
      )
      if (diff < 0) {
        this.showError("تاریخ ابلاغ نمی تواند از تاریخ صدور رای کوچیکتر باشد.")
        return
      }
      this.showLoading()
      this.$services.commissions
        .saveCommissionImpart({ pRequest: this.model })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedNidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `عملیات ابلاغ رای برای درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.loadObj()
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
    // loadBizCode (pBizCode, pDomianName) {
    //   if (pBizCode && pDomianName) {
    //     this.lastBizCode = pBizCode
    //   }
    // },
    btnUploadFileClick () {
      this.$refs.fileUploader.pickFiles()
    },
    fileChangeEvent (file) {
      if (file) this.selectedFile = file
    },
    async btnPrint () {
      const reportPath =
        "/ComReport/RptImpartCommission"
      const queryParams = {
        NidImpart: this.model.ClsCommission_Impart.Commission_Impart.NidImpart,
        NIdCommission: this.NidCommission,
        NidUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.model.ClsCommission_Impart.Commission_Impart.NidImpart,
        bizCodeTitle: "NidImpart",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `عملیات چاپ گزارش برای درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
      })
    }
  },
  watch: {
    // tebgh: {
    //   handler () {
    //     switch (this.tebgh) {
    //       case "68":
    //         this.model.ClsCommission_Impart.Commission_Impart = {
    //           ...this.model.ClsCommission_Impart.Commission_Impart,
    //           // OwnerNameMadeh68: null,
    //           // LawyerOwnerMadeh68: null,
    //           OwnerNameMadeh69: null,
    //           SideNameMadeh69: null,
    //           OwnerNameMadeh70: null,
    //           OwnerNameMadeh75: null,
    //           SideNameMadeh75: null,
    //           OwnerNameMadeh76: null,
    //           SideNameMadeh76: null
    //         }
    //         break
    //       case "69":
    //         this.model.ClsCommission_Impart.Commission_Impart = {
    //           ...this.model.ClsCommission_Impart.Commission_Impart,
    //           OwnerNameMadeh68: null,
    //           LawyerOwnerMadeh68: null,
    //           // OwnerNameMadeh69: null,
    //           // SideNameMadeh69: null,
    //           OwnerNameMadeh70: null,
    //           OwnerNameMadeh75: null,
    //           SideNameMadeh75: null,
    //           OwnerNameMadeh76: null,
    //           SideNameMadeh76: null
    //         }
    //         break
    //       case "70":
    //         this.model.ClsCommission_Impart.Commission_Impart = {
    //           ...this.model.ClsCommission_Impart.Commission_Impart,
    //           OwnerNameMadeh68: null,
    //           LawyerOwnerMadeh68: null,
    //           OwnerNameMadeh69: null,
    //           SideNameMadeh69: null,
    //           // OwnerNameMadeh70: null,
    //           OwnerNameMadeh75: null,
    //           SideNameMadeh75: null,
    //           OwnerNameMadeh76: null,
    //           SideNameMadeh76: null
    //         }
    //         break
    //       case "75":
    //         this.model.ClsCommission_Impart.Commission_Impart = {
    //           ...this.model.ClsCommission_Impart.Commission_Impart,
    //           OwnerNameMadeh68: null,
    //           LawyerOwnerMadeh68: null,
    //           OwnerNameMadeh69: null,
    //           SideNameMadeh69: null,
    //           OwnerNameMadeh70: null,
    //           // OwnerNameMadeh75: null,
    //           // SideNameMadeh75: null,
    //           OwnerNameMadeh76: null,
    //           SideNameMadeh76: null
    //         }
    //         break
    //       case "76":
    //         this.model.ClsCommission_Impart.Commission_Impart = {
    //           ...this.model.ClsCommission_Impart.Commission_Impart,
    //           OwnerNameMadeh68: null,
    //           LawyerOwnerMadeh68: null,
    //           OwnerNameMadeh69: null,
    //           SideNameMadeh69: null,
    //           OwnerNameMadeh70: null,
    //           OwnerNameMadeh75: null,
    //           SideNameMadeh75: null
    //           // OwnerNameMadeh76: null,
    //           // SideNameMadeh76: null,
    //         }
    //         break
    //       case "80":
    //         this.model.ClsCommission_Impart.Commission_Impart = {
    //           ...this.model.ClsCommission_Impart.Commission_Impart,
    //           OwnerNameMadeh68: null,
    //           LawyerOwnerMadeh68: null,
    //           OwnerNameMadeh69: null,
    //           SideNameMadeh69: null,
    //           OwnerNameMadeh70: null,
    //           OwnerNameMadeh75: null,
    //           SideNameMadeh75: null,
    //           OwnerNameMadeh76: null,
    //           SideNameMadeh76: null
    //         }
    //         break
    //     }
    //   },
    //   deep: true
    // }
  }
}
</script>
