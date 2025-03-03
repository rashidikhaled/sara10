<template>
  <div>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          ciName="CI_VoteType"
          domainName="Commission100"
          label="نوع رای"
          label-width="90px"
          v-model="value.CI_VoteType"
          cdcName="CI_VoteType"
          :m="m"
          ref="comboVoteType"
          :useInput="true"
        />
        <!-- @input="voteType_SelectionChanged" -->
      </FormControl>
      <FormControl v-if="voteTypeShow">
        <safa-combo
          source-type="local"
          :options="ciVoteTypeDetail"
          label="کد رای"
          label-width="90px"
          v-model="value.CI_VoteTypeDetail"
          cdcName="CI_VoteTypeDetail"
          optionLabel="TitleField"
          ref="comboCode"
          :useInput="true"
        />
        <!-- @input="comboCodeSelectionChanged" -->
      </FormControl>
      <!-- <FormControl>
        <safa-datepicker
          label="تاریخ برگزاری کمیسیون"
          label-width="90px"
        />
      </FormControl> -->
      <FormControl>
        <safa-text
          label="شماره رای"
          label-width="90px"
          v-model="value.VoteNo"
          cdcName="VoteNo"
          :m="voteNoMode"
        />
      </FormControl>
      <FormControl v-if="VoteValueShow">
        <safa-custom-text
          :maxlength="20"
          label="مقدار رای"
          label-width="90px"
          v-model="value.VoteValue"
          cdcName="VoteValue"
          :m="voteValueMode"
          :disabled="!voteValueEnable"
          type="money"
        />
      </FormControl>
      <FormControl v-show="!isHideVoteDate">
        <safa-datepicker
          label="تاریخ رای"
          label-width="90px"
          v-model="value.VoteDate"
          cdcName="VoteDate"
          :m="voteDateMode"
        />
      </FormControl>
      <FormControl class="flex items-center" v-if="isComplainantShow">
        <safa-checkbox
          label="پرونده دارای شاکی "
          label-width="90px"
          v-model="value.Iscomplainant"
          cdcName="Iscomplainant"
          :m="iscomplainantMode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          :maxlength="12"
          label="ارزش سرقفلی"
          label-width="90px"
          v-model="value.TechnicalValue"
          cdcName="TechnicalValue"
          :m="technicalValueMode"
          type="number"
        />
      </FormControl>
      <FormControl v-show="!isHideVoteTime">
        <safa-timepicker
          label="زمان رای"
          label-width="90px"
          v-model="value.VoteTime"
          cdcName="VoteTime"
          m="r"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          label="اعمال تبصره 7"
          label-width="90px"
          v-model="value.IsNote7Action"
          cdcName="IsNote7Action"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-if="showCmbEvaluation"
          ciName="CI_Evaluation"
          domainName="Commission100"
          label="ارزیابی دفاتر"
          label-width="90px"
          v-model="value.CI_Evaluation"
          cdcName="CI_Evaluation"
          m="r"
        />
      </FormControl>

      <!-- <FormControl class="flex items-center">
        <div class="q-gutter-sm">
          <btn-default label="تایید رای بدوی" />
          <btn-default label="نقص رای" />
        </div>
      </FormControl> -->
    </FormRow>
    <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
      <div class="col-9">
        <div class="q-mb-sm">
          <text-template
            label="توضیحات کمیسیون"
            label-width="90px"
            v-model="commissionInfo.CommissionComments"
            cdcName="CommissionComments"
            :m="m"
            :rows="1"
            formKey="ff65b404-0ce2-43d8-9751-ca4b71c570d3"
          />
        </div>
        <div>
          <text-template
            label="متن رای"
            label-width="90px"
            v-model="value.Vote_Comments"
            cdcName="Vote_Comments"
            :m="m"
            :rows="3"
            formKey="e1c44b8b-a025-47b6-aa3c-141ee2d08713"
          />
        </div>
      </div>
      <div class="col-3">
        <form-actions
          :showEditButton="!isNewVote"
          :m="isNewVote ? 'r' : 'e'"
          @cancel="$emit('onCancelNewVote')"
          @save="$emit('saveIssuedVote')"
          saveButtonTitle="تایید"
        >
          <template v-slot:after v-if="isNewVote">
            <!-- @click="$emit('onOrderIssuedVote')" -->
            <btn-default
              label="دستور"
              :disabled="m === 'r'"
              @click="showOrder = true"
              v-if="btnInstructionShow"
            />
            <btn-default
              label="انشاء رای"
              :disabled="m === 'r'"
              @click="onVotesCompilation"
              icon="gavel"
            />
            <btn-default
              label="تایید رای بدوی"
              :disabled="m === 'r'"
              v-if="showAcceptBadvi"
              @click="onAcceptBadvi"
            />
            <btn-default
              label="نقض رای"
              :disabled="m === 'r'"
              v-if="showRejectBadvi"
              @click="onRejectBadvi"
            />
            <btn-default
              label="اصلاح رای"
              :disabled="m === 'r'"
              v-if="showPerformVote"
              @click="showPerformVoteModal = true"
            />
          </template>
          <safa-popup
            v-model="showOrder"
            width="600px"
            height="420px"
            title="دستور"
          >
            <Order :selectedCommission="selectedCommission" :formKey="formKey" :title="title" />
          </safa-popup>

          <safa-popup
            v-model="showPerformVoteModal"
            width="510px"
            height="150px"
            title="اصلاح رای"
          >
            <PerformVote
              @onPerformVote="onPerformVote"
              @hide="showPerformVoteModal = false"
            />
          </safa-popup>
        </form-actions>
      </div>
    </div>
  </div>
</template>

<script>
import Order from "./Order.vue"
import PerformVote from "./PerformVote.vue"
import PersianDate from "persian-date"

export default {
  components: {
    Order,
    PerformVote
  },
  props: {
    value: Object,
    m: String,
    formKey: String,
    selectedCommission: Object,
    commissionInfo: Object,
    commissionsSetting: Object,
    maxVoteObj: Object,
    isNewVote: Boolean,
    showAcceptBadvi: { type: Boolean, default: false },
    showRejectBadvi: { type: Boolean, default: false },
    showCmbEvaluation: { type: Boolean, default: false },
    showPerformVote: { type: Boolean, default: false },
    isHideVoteDate: { type: Boolean, default: false },
    isHideVoteTime: { type: Boolean, default: false }
  },

  data () {
    return {
      showOrder: false,
      showPerformVoteModal: false,
      type: null,
      CommissionComments: "",
      name: "IssuedVote",
      title: "اطلاعات رای",
      ciVoteTypeDetail: [],
      VoteValueShow: true,
      voteDateMode: "e",
      voteValueMode: "e",
      voteValueEnable: true,
      // value.CI_VoteType === 1 ? 'e' : 'r'
      technicalValueMode: "e",
      // value.CI_VoteType === 1 ? 'e' : 'r'
      voteNoMode: "r",
      isComplainantShow: true,
      iscomplainantMode: this.m,
      btnInstructionShow: false,
      voteTypeShow: true
    }
  },

  async mounted () {
    // this.CommissionComments = this.commissionInfo.CommissionComments
  },

  methods: {
    // onUpdateCommissionComments(){
    // this.commissionInfo.CommissionComments=this.CommissionComments
    // },
    // comboCodeSelectionChanged () {
    //   // this.$nextTick(() => {
    //   //   this.value.Vote_Comments = this.ciVoteTypeDetail.find(
    //   //     (x) => x.ID === this.value.CI_VoteTypeDetail
    //   //   ).Title
    //   // })

    //   // # todo
    //   // _VoteCommentChangeCount += 1;
    // },

    getVoteNoFormat () {
      // voteNoFormatOptions: [
      //   { ID: 0, Title: "َش دبیرخانه/سال/منطقه" },
      //   { ID: 1, Title: "ش اولین رای/ ش کمیسیون/سال" },
      //   { ID: 2, Title: "شمارنده/مقدار فرمول/منطقه/نوع کمیسیون/سال" },
      //   { ID: 3, Title: "شمارنده/23/100/منطقه/مقدارفرمول/سال" },
      // ],
      PersianDate.toCalendar("persian")
      let year = new PersianDate().year().toString().substring(2)
      if (this.type === 0 || this.type === "0") {
        this.value.VoteNo = `${this.commissionInfo.District}/${year}/${this.commissionInfo.SecretariatNo}`
        return this.value.VoteNo
      } else if (this.type === 1 || this.type === "1") {
        this.value.VoteNo = `${year}/${this.maxVoteObj?.Number}/${this.selectedCommission.CI_Commission}/${this.maxVoteObj?.MaxVoteNo}`
        return this.value.VoteNo
      } else if (this.type === 2 || this.type === "2") {
        this.value.VoteNo = `${year}/${this.selectedCommission.CI_Commission}/${this.commissionInfo.District}/${this.maxVoteObj?.Number}/${this.maxVoteObj?.MaxVoteNo}`
        return this.value.VoteNo
      } else if (this.type === 3 || this.type === "3") {
        this.value.VoteNo = `${year}/${this.maxVoteObj?.Number}/${this.commissionInfo.District}/23/100/${this.maxVoteObj?.MaxVoteNo}`
        return this.value.VoteNo
      }
    },

    onVotesCompilation () {
      this.$emit("onVotesCompilation")
    },

    onAcceptBadvi () {
      this.$emit("onAcceptBadvi")
    },

    onRejectBadvi () {
      this.$emit("onRejectBadvi")
    },

    onPerformVote (data) {
      this.showPerformVoteModal = false
      this.$emit("onPerformVote", data)
    }

    // voteType_SelectionChanged() {
    //   this.$emit("voteType_SelectionChanged");
    // }
  },

  computed: {
    // hasPlaintiff() {
    //   return this.value.Iscomplainant === 0 ? false : true;
    // },
  },

  watch: {
    "value.CI_VoteType": {
      handler () {
        this.$emit("voteType_SelectionChanged")
      },
      deep: true
    },
    "value.CI_VoteTypeDetail": {
      handler () {
        this.$emit("comboCodeSelectionChanged")
      },
      deep: true
    },
    commissionInfo: {
      handler () {
        this.$nextTick(() => {
          if (this.commissionsSetting && this.commissionsSetting.VoteNoFormat) {
            if (
              this.commissionInfo &&
              this.commissionInfo.District &&
              this.commissionInfo.SecretariatNo
            ) {
              this.type = this.commissionsSetting.VoteNoFormat
              this.getVoteNoFormat()
            }
          }
        })
      },
      deep: true
    }
  }
}
</script>
