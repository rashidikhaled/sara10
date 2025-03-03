<template>
  <button-group height="60px" ref="bgroups">
    <slot name="before"></slot>
    <ribbon-column v-for="btn in buttons" :key="btn.name">
      <ribbon-button
        :class="{ select: activeTab == btn.name }"
        class="form-button rib"
        :title="btn.title"
        @click="$emit('action', btn)"
        :disabled="btn.disable"
        :label="btn.title"
      >
        <template #icon>
          <q-icon :name="btn.icon" size="sm" color="primary" />
        </template>
      </ribbon-button>
    </ribbon-column>
    <slot name="after"></slot>
  </button-group>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    m: {
      type: String,
      default: "r"
    },
    activeTab: {
      type: String,
      default: ""
    },
    disable: {
      type: Boolean,
      default: true
    },

    hideUHousePlan: Boolean,
    hideUPriority: Boolean,
    hideUPriority_Mashhad: Boolean,
    hideUEvaluationList: Boolean,
    hideUEvaluationList2: Boolean,
    hideUEvaluationList3: Boolean,
    hideULegal: Boolean,
    hideUTransferMainList: Boolean,
    hideUTransferDocList: Boolean,
    hideUSeizin: Boolean,
    hideUMortgageDoc: Boolean,
    hideUContractBuyList: Boolean,
    hideUAgreementHistory: Boolean,
    hideUContractRentList: Boolean,
    hideUContractSaleList: Boolean,
    hideUContractPartnershipList: Boolean,
    hideUHighCommissionDealsList: Boolean,
    hideUAuctionList: Boolean,
    hideUContractHistory: Boolean,
    hideUAuctionConfirm: Boolean,
    hideUAuctionRequest: Boolean
  },

  data () {
    return {
      name: "EstateActions",
      activeRibbonTab: "UHousePlan",
      btns: [
        {
          key: "F4F6B1AF-72FA-4C88-B1AC-3914666039A1",
          name: "UHousePlan",
          title: "اضافه کردن ملک به طرح - سوابق",
          label: "",
          icon: "add_home_work", // "images/estate/اضافه کردن ملک به طرح.png",
          disable: true
        },
        {
          key: "CA76AD13-20CA-42F8-AD4D-14ADB1BCE170",
          name: "UPriority",
          title: "اولویتهای تملک - سوابق",
          label: "",
          icon: "low_priority", // "images/estate/اولویت های تملک.png",
          disable: true
        },
        {
          key: "A8A7F87C-1539-4777-8784-28CAAC42FECE",
          name: "UPriority_Mashhad",
          title: "اولویتهای تملک مشهد - سوابق",
          label: "",
          icon: "low_priority", // "images/estate/اولویت های تملک.png",
          disable: true
        },
        {
          key: "A826090F-E246-4368-8C57-F22E5C4A60F1",
          name: "UEvaluationList",
          title: "قیمت گذاری - سوابق",
          label: "",
          icon: "price_check", // "images/estate/قیمت گذاری.png",
          disable: true
        },
        {
          key: "DD71116E-3AED-40E2-A53F-D5C0440E41A9",
          name: "UEvaluationList2",
          title: "قیمت گذاری مشهد- سوابق",
          label: "",
          icon: "price_check", // "images/estate/قیمت گذاری.png",
          disable: true
        },
        {
          key: "B08D9F84-C66A-4F3B-A233-9E1C42560DC1",
          name: "UEvaluationList3",
          title: "قیمت گذاری شیراز- سوابق",
          label: "",
          icon: "price_check", // "images/estate/قیمت گذاری.png",
          disable: true
        },
        {
          key: "E442A4FD-BF02-47C8-B990-858C386BD8AE",
          name: "ULegal",
          title: "مشخصات حقوقی - سوابق",
          label: "",
          icon: "badge", // "images/estate/مشخصات حقوقی.png",
          disable: true
        },
        {
          key: "45C2E6CD-9EBF-4958-851E-B58C0A31657F",
          name: "UTransferMainList",
          title: "تحویل - سوابق",
          label: "",
          icon: "work_outline", // "images/estate/تحویل.png",
          disable: true
        },
        {
          key: "993EC307-0BBE-48B7-8250-0C7F7592BF28",
          name: "UTransferDocList",
          title: "انتقال سند - سوابق",
          label: "",
          icon: "mark_as_unread", // "images/estate/انتقال سند.png",
          disable: true
        },
        {
          key: "DFBCD09C-A734-4424-B845-F9E33516EB06",
          name: "USeizin",
          title: "تصرف - سوابق",
          label: "",
          icon: "sports_score", // "images/estate/تصرف.png",
          disable: true
        },
        {
          key: "340A7568-D6CC-478C-BAA6-045050811563",
          name: "UMortgageDoc",
          title: "اسناد رهنی - سوابق",
          label: "",
          icon: "source", // "images/estate/اسناد رهنی.png",
          disable: true
        },
        {
          key: "CB587755-87F0-4771-97DB-8F3BB68746DA",
          name: "UContractBuyList",
          title: "صلح نامه خرید - سوابق",
          label: "",
          icon: "history_edu", // "images/estate/صلح نامه خرید.png",
          disable: true
        },
        {
          key: "895ADEFE-2AAF-4DCF-BC76-2186DD883846",
          name: "UAgreementHistory",
          title: "توافقنامه - سوابق",
          label: "",
          icon: "article", // "images/estate/صلح نامه خرید.png",
          disable: true
        },
        {
          key: "8517E134-5926-4D0F-A376-C132CA8330CA",
          name: "UContractRentList",
          title: "قرارداد اجاره/استیجاره - سوابق",
          label: "",
          icon: "assignment_late", // "images/estate/قرارداد اجاره.png",
          disable: true
        },
        {
          key: "17023102-70F2-40F2-8895-E1544EF91733",
          name: "UContractSaleList",
          title: "صلح نامه فروش - سوابق",
          label: "",
          icon: "assignment_return", // "images/estate/صلح نامه فروش.png",
          disable: true
        },
        {
          key: "4C979D47-86BA-4FCE-9BB9-95B6C0FD9C6D",
          name: "UContractPartnershipList",
          title: "قرارداد مشارکت - سوابق",
          label: "",
          icon: "folder_special", // "images/estate/قرارداد مشارکت.png",
          disable: true
        },
        {
          key: "FDF6D6A5-3974-4541-831F-A85A680E1F2E",
          name: "UHighCommissionDealsList",
          title: "کمیسیون عالی معاملات - سوابق",
          label: "",
          icon: "featured_play_list", // "images/estate/کمیسون عالی معاملات.png",
          disable: true
        },
        {
          key: "4C6D8341-BC25-4C32-9923-E5A372FE20ED",
          name: "UAuctionList",
          title: "مزایده - سوابق",
          label: "",
          icon: "summarize", // "images/estate/مزایده.png",
          disable: true
        },
        {
          key: "63F5717A-557F-42E8-A2EC-556A76AADA36",
          name: "UContractHistory",
          title: "قرارداد - سوابق",
          label: "",
          icon: "task", // "images/estate/صلح نامه خرید.png",
          disable: true
        },
        {
          key: "CCEBDCFF-A424-403D-B05A-2F133D5C7FCE",
          name: "UAuctionConfirm",
          title: "تایید مزایده - سوابق",
          label: "",
          icon: "request_page", // "images/estate/مزایده.png",
          disable: true
        },
        {
          key: "DFA4409C-FA9A-4D33-9AAE-7B7CE87D0906",
          name: "UAuctionRequest",
          title: "درخواست مزایده - سوابق",
          label: "",
          icon: "request_quote", // "images/estate/مزایده.png",
          disable: true
        }
      ]
    }
  },

  computed: {
    buttons () {
      return this.btns
        .filter((btn) => {
          if (btn.key === "F4F6B1AF-72FA-4C88-B1AC-3914666039A1") {
            return !this.hideUHousePlan
          } else if (btn.key === "CA76AD13-20CA-42F8-AD4D-14ADB1BCE170") {
            return !this.hideUPriority
          } else if (btn.key === "A8A7F87C-1539-4777-8784-28CAAC42FECE") {
            return !this.hideUPriority_Mashhad
          } else if (btn.key === "A826090F-E246-4368-8C57-F22E5C4A60F1") {
            return !this.hideUEvaluationList
          } else if (btn.key === "DD71116E-3AED-40E2-A53F-D5C0440E41A9") {
            return !this.hideUEvaluationList2
          } else if (btn.key === "B08D9F84-C66A-4F3B-A233-9E1C42560DC1") {
            return !this.hideUEvaluationList3
          } else if (btn.key === "E442A4FD-BF02-47C8-B990-858C386BD8AE") {
            return !this.hideULegal
          } else if (btn.key === "45C2E6CD-9EBF-4958-851E-B58C0A31657F") {
            return !this.hideUTransferMainList
          } else if (btn.key === "993EC307-0BBE-48B7-8250-0C7F7592BF28") {
            return !this.hideUTransferDocList
          } else if (btn.key === "DFBCD09C-A734-4424-B845-F9E33516EB06") {
            return !this.hideUSeizin
          } else if (btn.key === "340A7568-D6CC-478C-BAA6-045050811563") {
            return !this.hideUMortgageDoc
          } else if (btn.key === "CB587755-87F0-4771-97DB-8F3BB68746DA") {
            return !this.hideUContractBuyList
          } else if (btn.key === "895ADEFE-2AAF-4DCF-BC76-2186DD883846") {
            return !this.hideUAgreementHistory
          } else if (btn.key === "8517E134-5926-4D0F-A376-C132CA8330CA") {
            return !this.hideUContractRentList
          } else if (btn.key === "17023102-70F2-40F2-8895-E1544EF91733") {
            return !this.hideUContractSaleList
          } else if (btn.key === "4C979D47-86BA-4FCE-9BB9-95B6C0FD9C6D") {
            return !this.hideUContractPartnershipList
          } else if (btn.key === "FDF6D6A5-3974-4541-831F-A85A680E1F2E") {
            return !this.hideUHighCommissionDealsList
          } else if (btn.key === "4C6D8341-BC25-4C32-9923-E5A372FE20ED") {
            return !this.hideUAuctionList
          } else if (btn.key === "63F5717A-557F-42E8-A2EC-556A76AADA36") {
            return !this.hideUContractHistory
          } else if (btn.key === "CCEBDCFF-A424-403D-B05A-2F133D5C7FCE") {
            return !this.hideUAuctionConfirm
          } else if (btn.key === "DFA4409C-FA9A-4D33-9AAE-7B7CE87D0906") {
            return !this.hideUAuctionRequest
          }
          return true
        })
        .map((btn) => {
          return {
            ...btn,
            disable: this.disable
          }
        })
    }
  },

  methods: {
    onClick ($event, btn) {
      this.$emit("action", btn.name)
      //   this.$window.open({
      //     component: btn.name,
      //     keepAlive: false,
      //     padding: false,
      //     width: '900px',
      //     height: '600px',
      //     componentProps: {
      //       value: this.value,
      //       ...this.$attrs
      //     }
      //   })
    }
  }
}
</script>
