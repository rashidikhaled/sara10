<template>
  <fit>
    <div class="row q-mb-sm">
      <div class="col-12">
        <safa-combo
          label="فرمت تولید کد رای"
          label-width="100px"
          :options="voteNoFormatOptions"
          source-type="local"
          :m="m"
          v-model="value.VoteNoFormat"
          cdcName="VoteNoFormat"
        />
      </div>
    </div>
    <div class="row q-mb-sm">
      <div class="col-12">
        <safa-combo
          label="روز کمیسیون"
          label-width="100px"
          :options="daysOptions"
          source-type="local"
          :m="value.HasAutomateCommissionDate ? 'e' : 'r'"
          v-model="value.CmbCommissionDay"
          cdcName="CmbCommissionDay"
        />
      </div>
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="خالی بودن ضریب هنگام اعمال در فرم صدور رای"
        :m="m"
        v-model="value.AllKCoeffiecientHasValidation"
        cdcName="AllKCoeffiecientHasValidation"
      />
    </div>
    <div class="row q-mb-sm" v-if="!value.AllKCoeffiecientHasValidation">
      <div class="col-12">
        <safa-text
          label="پیغام خطای خالی بودن ضریب"
          label-width="100px"
          v-model="value.AllKCoeffiecientHasValidationMessage"
          cdcName="AllKCoeffiecientHasValidationMessage"
          :m="m"
          validations="required"
          :maxlength="100"

        />
      </div>
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تعیین اتوماتیک تاریخ کمیسیون"
        :m="m"
        v-model="value.HasAutomateCommissionDate"
        cdcName="HasAutomateCommissionDate"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تایید رای بدوی"
        :m="m"
        v-model="value.IsAcceptTajdidnazar"
        cdcName="IsAcceptTajdidnazar"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="نمایش کارتابل اصلی"
        :m="m"
        v-model="value.IsShowMainKartabl"
        cdcName="IsShowMainKartabl"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="نمایش پارامتر چاپ بدوی"
        :m="m"
        v-model="value.IsShowBadviParameter"
        cdcName="IsShowBadviParameter"
      />
    </div>

    <div class="row q-mb-sm">
      <safa-checkbox
        label="نمایش سمت در سوابق"
        :m="m"
        v-model="value.ChangeMeetingName"
        cdcName="ChangeMeetingName"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="وارد کردن ضریب برای تخریب"
        :m="m"
        v-model="value.InputValueForGhal"
        cdcName="InputValueForGhal"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="جلوگیری از اعلام تاریخ ارجاع کمیسیون در روزهای تعطیل"
        :m="m"
        v-model="value.ErrorSelectHoliday"
        cdcName="ErrorSelectHoliday"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="عدم ویرایش اطلاعات کارشناسی در مرحله صدور رای"
        :m="m"
        v-model="value.ReadOnlyExpertFormInVote"
        cdcName="ReadOnlyExpertFormInVote"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="جلوگیری از تکراری بودن تخلف برای صدور رای"
        :m="m"
        v-model="value.CheckDuplicateTrepassVote"
        cdcName="CheckDuplicateTrepassVote"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="برداشتن اسکرول پنل تخلفات در صدور رای"
        :m="m"
        v-model="value.ScrollTrepassPanel"
        cdcName="ScrollTrepassPanel"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="چک کردن نظرات کارشناسان در فرم صدور رای"
        :m="m"
        v-model="value.CheckCommentsExperts"
        cdcName="CheckCommentsExperts"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="غیرفعال کردن ارسال گروهی"
        :m="m"
        v-model="value.DisableGroupSend"
        cdcName="DisableGroupSend"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="اعمال کدینگ"
        :m="m"
        v-model="value.Coding"
        cdcName="Coding"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="دستور رای"
        :m="m"
        v-model="value.Instruction"
        cdcName="Instruction"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تبصره در رای"
        :m="m"
        v-model="value.IsNote"
        cdcName="IsNote"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="نمایش آرشیو شهرسازی در تب"
        :m="m"
        v-model="value.IsAddTabArchiveSharsazi"
        cdcName="IsAddTabArchiveSharsazi"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="مقدار رای غیرفعال شود"
        :m="m"
        v-model="value.IsNotEditableVoteValue"
        cdcName="IsNotEditableVoteValue"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="عدم نمایش پرونده دارای شاکی"
        :m="m"
        v-model="value.HideIscomplainant"
        cdcName="HideIscomplainant"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="عدم پرسش اعمال مغایرت"
        :m="m"
        v-model="value.HideElamConfirm"
        cdcName="HideElamConfirm"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="عدم نمایش توضیحات نماینده"
        :m="m"
        v-model="value.HideAgnetComments"
        cdcName="HideAgnetComments"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تاییدیه هنگام ویرایش رای"
        :m="m"
        v-model="value.ShowMesasgeOnEditVote"
        cdcName="ShowMesasgeOnEditVote"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="غیرفعال کردن تاریخ رای"
        :m="m"
        v-model="value.LockVoteDate"
        cdcName="LockVoteDate"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="عدم نمایش پیغام ویرایش"
        :m="m"
        v-model="value.HideEditMessage"
        cdcName="HideEditMessage"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="بروزرسانی تاریخ کمیسیون تصادفی"
        :m="m"
        v-model="value.UpdateCommissionDate"
        cdcName="UpdateCommissionDate"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="نمایش پیش فرض آرشیو شهرسازی"
        :m="m"
        v-model="value.ShowDefaultShahrsaziArchive"
        cdcName="ShowDefaultShahrsaziArchive"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="ست کردن نوع چاپ قرار در صدور رای"
        :m="m"
        v-model="value.SetCommissionPrintTypeGharar"
        cdcName="SetCommissionPrintTypeGharar"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="نمایش پیش فرض آرشیو کمیسیون"
        :m="m"
        v-model="value.ShowDefaultCommissionArchive"
        cdcName="ShowDefaultCommissionArchive"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="عدم نمایش کمیسیون جاری در کارشناسی"
        :m="m"
        v-model="value.HideOldCommission"
        cdcName="HideOldCommission"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="اضافه کردن رای در آرشیو هنگام پیش نمایش"
        :m="m"
        v-model="value.AddVoteToArchiveThenPrintPreview"
        cdcName="AddVoteToArchiveThenPrintPreview"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="فعال کردن ویرایش شماره رای"
        :m="m"
        v-model="value.IsEnableEditeVoteNo"
        cdcName="IsEnableEditeVoteNo"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="فعال کردن ویرایش تایید رای برای نماینده ها"
        :m="m"
        v-model="value.IsEnableEditCommissionVoteOfAgent"
        cdcName="IsEnableEditCommissionVoteOfAgent"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="نمایش پیغام نماینده در فرم صدور رای"
        :m="m"
        v-model="value.IsShowMessegeMeetinginVote"
        cdcName="IsShowMessegeMeetinginVote"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="مرتب سازی سوابق رای بصورت صعودی"
        :m="m"
        v-model="value.IsOrderByVoteHistory"
        cdcName="IsOrderByVoteHistory"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="خالی بودن کد رای در ویرایش رای"
        :m="m"
        v-model="value.IsCheckEmptyVoteTypeDetail"
        cdcName="IsCheckEmptyVoteTypeDetail"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="عدم دسترسی به آرشیو در فرم پاسخگو کمیسیون"
        :m="m"
        v-model="value.NotAccessToArchiveInSearchPanel"
        cdcName="NotAccessToArchiveInSearchPanel"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="عدم محاسبه مجدد رای هنگام ویرایش"
        :m="m"
        v-model="value.NoAgainCalcForEditVote"
        cdcName="NoAgainCalcForEditVote"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="فعال کردن یک نماینده در چند کمیسیون"
        :m="m"
        v-model="value.ActiveAgentInMultiCommission"
        cdcName="ActiveAgentInMultiCommission"
      />
    </div>
    <!-- چک باکس پایین برای درخواست مشهد هست و فعلا تا قطعی شدن بیزینس کامنت میمونه  -->
    <!-- <div class="row q-mb-sm">
      <safa-checkbox
        label="فعال کردن دکمه چاپ در صورتی که هر سه نماینده درتوضیحات نمایندگان تایید شده باشند"
        :m="m"
        v-model="value.ActivePrintVotesWhileThreeAgentsApproved"
        cdcName="ActivePrintVotesWhileThreeAgentsApproved"
      />
    </div> -->
  </fit>
</template>

<script>
export default {
  props: ["value", "m"],
  data () {
    return {
      name: "Settings",
      daysOptions: [
        { ID: 0, Title: "َشنبه" },
        { ID: 1, Title: "یکشنبه" },
        { ID: 2, Title: "دوشنبه" },
        { ID: 3, Title: "سه شنبه" },
        { ID: 4, Title: "چهارشنبه" },
        { ID: 5, Title: "پنجشنبه" }
      ],
      voteNoFormatOptions: [
        { ID: 0, Title: "َش دبیرخانه/سال/منطقه" },
        { ID: 1, Title: "ش اولین رای/ ش کمیسیون/سال" },
        { ID: 2, Title: "شمارنده/مقدار فرمول/منطقه/نوع کمیسیون/سال" },
        { ID: 3, Title: "شمارنده/23/100/منطقه/مقدارفرمول/سال" }
      ]
    }
  }
}
</script>
