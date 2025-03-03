<template>
    <fit>
      <expantion-section
        v-model="expansionState1"
        default-opened
        title="تنظیمات ارسال پیامک:"
      >
        <FormRow>
          <safa-checkbox
            v-model="value.Chk_SendSMSInBlacklist"
            :m="m"
            label="ارسال پیامک هنگام ارسال به لیست سیاه"
          />
        </FormRow>
        <FormRow>
          <safa-checkbox
            v-model="value.Chk_SendSMSExitFromBlacklist"
            :m="m"
            label="ارسال پیامک هنگام خروج از لیست سیاه"
          />
        </FormRow>
        <FormRow>
          <safa-checkbox
            v-model="value.Chk_SendSMSInTemporaryArchives"
            :m="m"
            label="ارسال پیامک هنگام ارسال به بایگانی موقت"
          />
        </FormRow>
        <FormRow>
          <safa-checkbox
            v-model="value.Chk_SendSMSInPermanentArchives"
            :m="m"
            label="ارسال پیامک هنگام ارسال به بایگانی دائم"
          />
        </FormRow>
        <FormRow>
          <safa-checkbox
            v-model="value.Chk_SendSMSRegisterRequest"
            :m="m"
            label="ارسال پیامک هنگام ثبت درخواست"
          />
        </FormRow>
        <FormRow>
          <form-control class="q-mt-sm">
            <safa-text
              v-model="value.SMSSignature"
              :m="m"
              label="امضای پیامک"
              label-width="100px"
            />
          </form-control>
        </FormRow>
      </expantion-section>
      <expantion-section
        v-model="expansionState2"
        default-opened
        title="تنظیمات اعلام مامور بازدید:"
      >
        <FormRow class="row q-col-gutter-md wrap">
          <div class="col-auto flex no-wrap items-center">
            <span style="min-width: 100px">شروع بازدید:&nbsp;</span>
            <div class="select custom-style" style="width: 140px">
              <select v-model="value.RevisitTimeFrom" :disabled="m === 'r'">
                <option
                  v-for="(item, i) in revisitFromTimeOptions"
                  :key="i"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-auto flex no-wrap items-center">
            پایان بازدید:&nbsp;
            <div class="select custom-style" style="width: 140px">
              <select v-model="value.RevisitTimeTo" :disabled="m === 'r'">
                <option
                  v-for="(item, i) in revisitToTimeOptions"
                  :key="i"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
        </FormRow>
        <FormRow class="q-mt-md">
          <div class="row items-center">
            <div class="col-auto q-pb-xs" style="min-width: 100px">
              حداقل زمان بازدید:&nbsp;
            </div>
            <div class="col custom-scroll q-pa-xs">
              <q-btn-toggle
                v-model="value.RevisitDuration"
                :disable="m === 'r'"
                :options="[
                  { label: '10 دقیقه', value: 10 },
                  { label: '15 دقیقه', value: 15 },
                  { label: '20 دقیقه', value: 20 },
                  { label: '30 دقیقه', value: 30 },
                  { label: '45 دقیقه', value: 45 },
                  { label: '1 ساعت', value: 60 },
                  { label: '1 ساعت و نیم', value: 90 },
                  { label: '2 ساعت', value: 120 },
                  { label: '2 ساعت و نیم', value: 150 },
                  { label: '3 ساعت', value: 180 },
                  { label: '4 ساعت', value: 240 },
                ]"
                no-wrap
                size="sm"
                toggle-color="primary"
              />
            </div>
          </div>
          <FormRow>
            <safa-checkbox
              v-model="value.Chk_PreventRevisitInHolidays"
              :m="m"
              label="جلوگیری از اعلام بازدید در روز های تعطیل"
              label-width="100px"
            />
          </FormRow>
        </FormRow>
      </expantion-section>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_CalculateZabeteh"
          :m="m"
          label="محاسبه خودکار ضابطه در صورت عدم وجود ضابطه"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_SetMaoCode"
          :m="m"
          label="تغییر کد نقشه پس از تغییر کد نوسازی"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_FillUnregisteredCode"
          :m="m"
          label="پر کردن جاهای خالی هنگام ایجاد کد نوسازی"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_PreventCancelRequest"
          :m="m"
          class="col"
          label="جلوگیری از ابطال درخواست در صورت داشتن فیش نوسازی تایید شده و یا در صورت ارسال به زیر سیستم های دیگر"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_MissFoulUserChecking"
          :m="m"
          label="چک کردن کاربر در تعیین تحلیل خلاف"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_RevisitAgentCopyChecking"
          :m="m"
          label="چک کردن مامور بازدید در کپی از تشکیل پرونده در فرم بازدید"
        />
      </FormRow>
      <FormRow class="q-mb-sm">
        <form-control class="q-mt-sm">
          <safa-text
            v-model="value.LayerIdCommision5"
            :m="m"
            label="لایه اعلام ضابطه کمیسیونها (کمیسیون 5)"
            label-width="auto"
            style="width: 350px"
            :maxlength="20"

          />
        </form-control>
      </FormRow>
      <FormRow class="q-mb-sm">
        <form-control>
          <safa-text
            v-model="value.UsingCount"
            :m="m"
            dir="ltr"
            label="تعداد کاربری ها در هر صفحه"
            label-width="auto"
            style="width: 350px"
            :maxlength="10"
          />
        </form-control>
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_CommissionFine"
          :m="m"
          label="اعشار در فرم جریمه و لایحه"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_CommisionVoteChecking"
          :m="m"
          label="عدم تغییر کد نوسازی در صورت صدور رای"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsComboRequesterName"
          :m="m"
          label="نام مالک در ویرایش/ثبت درخواست کمبو باشد"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsMultipleSendToBlackList"
          :m="m"
          label="ارسال بدون محدودیت به لیست سیاه"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsCopyShArchiveFromParvandeh"
          :m="m"
          label="کپی سوابق شهرسازی از تشکیل پرونده (در کپی به بازدید فعال)"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsCurrentDateForConfirmLicence"
          :m="m"
          label="اعمال تاریخ روز، در صدور گواهی"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsCheckSabt"
          :m="m"
          label="استعلام از ثبت احوال در تشکیل پرونده و ثبت درخواست"
        />
        <div class="flex items-center q-gutter-sm">
          <safa-radio
            v-model="chkIsCheckSabtServType"
            :m="m === 'e' && value.Chk_IsCheckSabt === true ? 'e' : 'r'"
            label="سرویس WCF"
            val="Chk_IsCheckSabtWCF"
          />
          <safa-radio
            v-model="chkIsCheckSabtServType"
            :m="m === 'e' && value.Chk_IsCheckSabt === true ? 'e' : 'r'"
            label="سرویس Json"
            val="Chk_IsCheckSabtJson"
          />
        </div>
      </FormRow>

      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsCheckMapInfo"
          :m="m"
          label="چک کردن کد نوسازی روی نقشه در ثبت درخواست"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsChecExistBlock"
          :m="m"
          label="چک کردن وجود کد نوسازی بلوک برای ثبت کد نوسازی ملک"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsChecUserInDutyCodes"
          :m="m"
          label="چک کردن کاربر ایجاد کننده در فرم تعیین کد های عوارضی"
        />
      </FormRow>
      <expantion-section
        v-model="expansionState3"
        class="q-mt-sm"
        default-opened
        title="تنظیمات آرشیو صدور گواهی:"
      >
        <FormRow>
          <FormControl>
            <safa-text
              v-model.number="value.ArchiveParvanehEntityId"
              :m="m"
              label="پروانه"
              label-width="100px"
              type="number"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model.number="value.ArchiveAnswerEstelamEntityId"
              :m="m"
              label="پاسخ استعلام"
              label-width="100px"
              type="number"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model.number="value.ArchivePayankarEntityId"
              :m="m"
              label="پایانکار"
              label-width="100px"
              type="number"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model.number="value.ArchiveMapCommandEntityId"
              :m="m"
              label="دستور نقشه"
              label-width="100px"
              type="number"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model.number="value.ArchiveCertificateOfContraryEntityId"
              :m="m"
              label="گواهی عدم خلاف"
              label-width="100px"
              type="number"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model.number="value.ArchivePrincipalAgreementEntityId"
              :m="m"
              label="موافقت اصولی"
              label-width="100px"
              type="number"
            />
          </FormControl>
        </FormRow>
      </expantion-section>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsCheckCommissionInExitTemporary"
          :m="m"
          label="چک کردن وجود درخواست در کمیسیون در خروج از بایگانی موقت"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsShowBaseDig"
          :m="m"
          label="نمایش اطلاعات حفاری"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsChangeNosaziCodeInSubSystems"
          :m="m"
          label="تغییر کد نوسازی در زیر سیستم ها، هنگام تغییر کد نوسازی در شهر سازی"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_DontCheckCroquisInRevisit"
          :m="m"
          label="عدم بررسی کروکی هنگام ذخیره اطلاعات بازدید"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_DontCheckPreCommissionInfo"
          :m="m"
          label="عدم بررسی درخواست های زیرسیستم کمیسیون در پیشنویس کمیسیون"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_IsSelectOnObjTypeInRevisit"
          :m="m"
          label="امکان انتخاب یک آیتم در کپی به بازدید فعال"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_AllowExitFromBlackListWithSameGroups"
          :m="m"
          label="امکان خروج از لیست سیاه توسط گروه های یکسان"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_DontCheckRequestInConvertBuildingToHousSharing"
          :m="m"
          label="عدم بررسی وجود درخواست های جاری در تبدیل ساختمان به دستگاه"
        />
      </FormRow>
      <FormRow class="q-mb-sm">
        <safa-checkbox
          v-model="value.Chk_DontCheckRequestInConvertHousSharingToBuilding"
          :m="m"
          label="عدم بررسی وجود درخواست های جاری در تبدیل دستگاه به ساختمان"
        />
      </FormRow>
      <FormRow>
        <safa-label> نمایش تاریخ احداث کاربری و تاریخ تبدیل به صورت</safa-label>
        <div>
          <safa-radio
            v-model="value.Chk_GenerateYear"
            :m="m"
            :val="true"
            class="col-auto q-mr-sm"
            label="سال"
          />
        </div>
        <div>
          <safa-radio
            v-model="value.Chk_GenerateYear"
            :m="m"
            :val="false"
            class="col-auto"
            label="تاریخ"
          />
        </div>
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_DontShowMomayeziGroup"
          :m="m"
          label="عدم نمایش دسته اطلاعاتی ممیزی, در فرم تغییر کد نوسازی"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_DontShowPenaltyGroup"
          :m="m"
          label="عدم نمایش همه انواع تخلف برای گروه تخلف نامشخص در تحلیل پروانه ساختمان"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_DontValidationInBlackList"
          :m="m"
          label="چک کردن کد نو سازی روی نقشه در زمان ورود به لیست سیاه"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.Chk_BackToStartInConvert"
          :m="m"
          label=" ارسال درخواست به اولین مرحله در کانورت"
        />
      </FormRow>

      <FormRow>
        <safa-checkbox
          v-model="value.DontAddShopToHouse"
          :m="m"
          label="عدم ایجاد صنفی روی ملک"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.DontCheckDiscountNationalCode"
          :m="m"
          label="عدم اعتبار سنجی کد ملی در فرم تخفیفات"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.EditableRequesterDecimalCheck"
          :m="m"
          label="ویرایش نام و نوع متقاضی در درخواست های جمع سپاری"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.smsInManagementConfirm"
          :m="m"
          label="ارسال کد تایید در فرم تایید مدیران"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.IgonreRegionForAgent"
          :m="m"
          label="عدم در نظر گرفتن دامنه برای ماموران بازدید"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.StopNosaziCodeTransferIfCommission"
          :m="m"
          label="توقف انتقال کد نوسازی در صورت صدور رای کمیسیون"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.CanChangeDistrict"
          :m="m"
          label="امکان تغییر منطقه هنگام تغییر کد نوسازی"
        />
      </FormRow>
      <FormRow>
        <safa-checkbox
          v-model="value.ControlBlackListForRemovingNosaziCode"
          :m="m"
          label="کنترل لیست سیاه هنگام حذف کد نوسازی"
        />
      </FormRow>
    </fit>
</template>

<script>
import { addToTime, generateTimeSeries } from "src/utils/timeHelper"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      expansionState1: false,
      expansionState2: false,
      expansionState3: false,
      minTime: "08:00",
      maxTime: "22:00",
      revisitToTimeOptions: []
    }
  },
  props: {
    value: Object,
    title: String,
    chkIsCheckSabtServType: String,
    formKey: String,
    name: String,
    m: String
  },
  methods: {
    refreshTimes () {
      try {
        this.revisitFromTimeOptions = generateTimeSeries(
          this.minTime,
          this.maxTime,
          30
        )
        // this.revisitToTimeOptions = this.value.RevisitTimeFrom ? generateTimeSeries(this.value.RevisitTimeFrom, this.maxTime, 30) : []
      } catch (ex) {
        console.error(ex)
      }
    }
  },
  watch: {
    "value.RevisitTimeFrom": {
      handler () {
        try {
          if (this.value.RevisitTimeFrom) {
            const fromTime = addToTime(this.value.RevisitTimeFrom, 30)
            this.revisitToTimeOptions = this.value.RevisitTimeFrom
              ? generateTimeSeries(fromTime, this.maxTime, 30)
              : []
          }
        } catch (ex) {
          console.error(ex)
        }
      },
      immediate: true
    },
    chkIsCheckSabtServType: {
      handler () {
        if (this.chkIsCheckSabtServType === "Chk_IsCheckSabtWCF") {
          this.value.Chk_IsCheckSabtWCF = true
          this.value.Chk_IsCheckSabtJson = false
        }
        if (this.chkIsCheckSabtServType === "Chk_IsCheckSabtJson") {
          this.value.Chk_IsCheckSabtWCF = false
          this.value.Chk_IsCheckSabtJson = true
        }
      },
      deep: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.refreshTimes()
    })
  }
}
</script>
