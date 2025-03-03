<template>
  <div class="ck__more">
    <div class="ck__more_panel q-ma-md q-px-md q-pt-md q-pb-sm flex">
      <div class="ckm__col" style="width: 300px">
        <div class="ckm__header">
          <q-icon name="contact_phone" />&nbsp; مشخصات مالک:
        </div>
        <div class="data-info q-pl-sm">
          <div :title="row.OwnerName">
            <label>نام و نام خانوادگی مالک:</label>
            <span>{{ row.OwnerName }}</span>
          </div>
          <div>
            <label>کد ملی مالک:</label>
            <span class="text-left" dir="ltr">{{ row.OwnerNationalCode }}</span>
          </div>
          <div>
            <label>تلفن مالک:</label>
            <span>{{ row.OwnerTelNo }}</span>
          </div>
          <div>
            <label>همراه مالک:</label>
            <span>{{ row.OwnerCellNo }}</span>
          </div>
          <div :title="row.Address">
            <label>آدرس:</label>
            <span>{{ row.Address }}</span>
          </div>
        </div>
      </div>
      <div class="ckm__col" style="width: 300px">
        <div class="ckm__header">
          <q-icon name="how_to_vote" />&nbsp; اطلاعات کمیسیون:
        </div>
        <div class="data-info q-pl-sm">
          <div>
            <label>نوع کمیسیون:</label>
            <span>{{ row.CommissionType }}</span>
          </div>
          <div>
            <label>شماره کمیسیون:</label>
            <span>{{ row.Commission }}</span>
          </div>
          <div>
            <label>تاریخ کمیسیون:</label>
            <span>{{ row.CommissionDate }}</span>
          </div>
          <div>
            <label>تاریخ رای:</label>
            <span>{{ row.VoteDate }}</span>
          </div>
          <div>
            <label>درصد انجام کار:</label>
            <span class="flex inline items-center"
              ><small
                style="line-height: 1; padding-top: 2px"
                class="text-bold"
                :style="{ color: percentageColor }"
                >{{ `%${row.CompeletPrecent}` }}&nbsp;&nbsp;</small
              ><CKInlinePercentage
                :show-value="false"
                style="width: 70px; height: 8px"
                :percent="row.CompeletPrecent"
                :color="percentageColor"
            /></span>
          </div>
        </div>
      </div>
      <div class="ckm__col" style="width: 300px">
        <div class="ckm__header">
          <q-icon name="info" style="font-size: 17px !important" />&nbsp;
          اطلاعات بیشتر:
        </div>
        <div class="data-info q-pl-sm">
          <div>
            <label>کارشناس انجام دهنده:</label>
            <span>{{ row.ExpertName }}</span>
          </div>
          <div>
            <label>انشاء کننده رای:</label>
            <span>{{ row.VoterUserName }}</span>
          </div>
          <div>
            <label>متراژ تخلفات:</label>
            <span>{{ row.PenaltyValue }}</span>
          </div>
          <div>
            <label>کاربری تخلفات:</label>
            <span>{{ row.UsingGroup_Mojood }}</span>
          </div>
          <div>
            <label>مرحله:</label>
            <span>{{ row.TaskTitel }}</span>
          </div>
        </div>
      </div>
      <div class="ckm__col" style="width: 300px">
        <div class="ckm__header">
          <q-icon name="people" />&nbsp; نماینده های تایید کننده:
        </div>
        <div class="data-info q-pl-sm">
          <div v-for="(agent, index) in agentsName" :key="index">
            <label>{{ agent }}</label>
          </div>
        </div>
      </div>
      <div class="ckm__dates flex q-pt-sm items-center">
        <div class="animated fadeIn" style="animation-delay: 0.2s">
          <span><q-icon color="grey" name="event_available" size="xs" /></span>
          <span>ورود</span>
          <span>{{ row.SendDate }}</span>
        </div>
        <div
          class="animated fadeInLeft ckm__line"
          style="animation-delay: 0.3s"
        >
          <q-icon name="west" />
        </div>
        <div class="animated fadeIn" style="animation-delay: 0.4s">
          <span><q-icon color="grey" name="people" size="xs" /></span>
          <span>تاریخ کمیسیون</span>
          <span>{{ row.CommissionDate }}</span>
        </div>
        <div
          class="animated fadeInLeft ckm__line"
          style="animation-delay: 0.5s"
        >
          <q-icon name="west" />
        </div>
        <div class="animated fadeIn" style="animation-delay: 0.6s">
          <span><q-icon color="grey" name="engineering" size="xs" /></span>
          <span>تاریخ کارشناسی</span>
          <span>{{ row.DateCommissionExpert }}</span>
        </div>
        <div
          class="animated fadeInLeft ckm__line"
          style="animation-delay: 0.7s"
        >
          <q-icon name="west" />
        </div>
        <div class="animated fadeIn" style="animation-delay: 0.8s">
          <span><q-icon color="grey" name="balance" size="xs" /></span>
          <span>تاریخ رای</span>
          <span>{{ row.VoteDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CKInlinePercentage from "./CKInlinePercentage"

export default {
  name: "CKMorePanel",
  components: { CKInlinePercentage },
  props: {
    row: Object,
    currentCommission: String,
    percentageColor: String
  },
  computed: {
    agentsName () {
      const { AgentName } = this.row
      return (
        (AgentName &&
          AgentName.split("-").map((ch) =>
            ((ch && ch.split("|")[0]) || "").trim()
          )) ||
        []
      )
    }
  }
}
</script>

<style lang="scss">
.ckm__dates {
  width: 100%;
  flex-grow: 1;
  border-top: 1px solid #ededed;
  //border: 1px solid #ededed;
  //border-radius: 15px;
  //box-shadow: 0 2px 3px rgba(0, 0, 0, .2);

  > div:not(.ckm__line):not(.ckm__progress) {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #fff;
    border-radius: 15px;
    color: #000;
    white-space: nowrap;
    font-size: 11px;
    position: relative;
    min-width: 150px;
    max-width: 150px;
    //box-shadow: 0 2px 3px rgba(0, 0, 0, .2);

    //&:first-child {
    //  padding-left: 0;
    //}
    //
    //&:last-child {
    //  padding-right: 0;
    //}

    &:after {
      content: "";
      width: 8px;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 50px;
      position: absolute;
      right: 4px;
    }

    span:first-child {
      margin-right: 4px;
    }

    span:nth-child(2):after {
      content: ":";
      margin-right: 7px;
    }
  }

  .ckm__line {
    margin: 0;
    min-width: 150px;
    text-align: center;
    //flex-grow: 1;
    //height: 1px;
    //border-top: 1px dashed #ccc;
    //margin: 0 4px;

    > i {
      font-weight: normal;
      font-size: 15px;
      color: #8c8c8c;
    }
  }
}
</style>
