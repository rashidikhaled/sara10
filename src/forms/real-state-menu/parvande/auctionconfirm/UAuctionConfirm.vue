<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="موافقت با برگزاری مزایده"
              ciName="CI_AuctionAgreement"
              domainName="Estate"
              v-model="model.CI_AuctionAgreement"
              label-width="100px"
              cdcName="CI_AuctionAgreement"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="دلایل عدم موافقت"
              ciName="CI_AuctionDisagreement"
              domainName="Estate"
              v-model="model.CI_AuctionDisagreement"
              label-width="100px"
              cdcName="CI_AuctionDisagreement"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="شخص عدم موافقت"
              ciName="CI_AuctionDisagreementPerson"
              domainName="Estate"
              v-model="model.CI_AuctionDisagreementPerson"
              label-width="100px"
              cdcName="CI_AuctionDisagreementPerson"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="نتیجه مزایده"
              ciName="CI_AuctionResult"
              CI_A
              domainName="Estate"
              v-model="model.CI_AuctionResult"
              label-width="100px"
              cdcName="CI_AuctionResult"
              :m="mode"
            />
          </FormControl>
          <form-control>
            <safa-datepicker
              label="تاریخ "
              v-model="model.AuctionDate"
              label-width="100px"
              cdcName="AuctionDate"
              :m="mode"
            ></safa-datepicker>
          </form-control>
        </FormRow>
        <FormRow class="q-mb-sm">
          <text-template
            label="توضیحات"
            label-width="100px"
            v-model="model.Description"
            cdcName="Description"
            :m="mode"
          />
        </FormRow>
      </fit>
      <template v-slot:footer>
          <FormActions
            v-show="!currentObj"
            :m="mode"
            @edit="isEditable = true"
            @cancel="isEditable = false"
            @save="saveObj"
          />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    },
    baseNosaziCode: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      name: "UAuctionConfirm",
      title: "تایید مزایده - سوابق",
      formKey: "CCEBDCFF-A424-403D-B05A-2F133D5C7FCE",
      main: true,

      // #services
      loadObjRes: null,
      saveRes: null,

      // #variabels
      model: {
        AuctionDate: "",
        CI_AuctionAgreement: 0,
        CI_AuctionDisagreement: 0,
        CI_AuctionDisagreementPerson: 0,
        CI_AuctionResult: 0,
        Description: ""
      }
    }
  },
  created () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.ES.getAuctionConfirm({
          PNIdProc:
            this.currentObj?.NIdProcess ??
            "00000000-0000-0000-0000-000000000000"
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.model = this.loadObjRes.data?.GetAuction_ConfirmResult
            .Auction_Confirm ?? {
            AuctionDate: "",
            CI_AuctionAgreement: 0,
            CI_AuctionDisagreement: 0,
            CI_AuctionDisagreementPerson: 0,
            CI_AuctionResult: 0,
            Description: ""
          }
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: ``
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.ES.saveAuctionConfirmfirm({
          PObj: {
            Auction_Confirm: this.model,
            NIdConfirm: this.currentObj?.NidRequest || "00000000-0000-0000-0000-000000000000",
            NidRequest: this.currentObj?.NidRequest || "00000000-0000-0000-0000-000000000000",

            IsConfirmContractBuy: this.currentObj.IsConfirmContractBuy,
            _NIdRequest: this.currentObj?.NidRequest || "00000000-0000-0000-0000-000000000000"

          }
        })
        this.saveRes = this.getResponse(data)
        if (this.saveRes.success) {
          // eslint-disable-next-line no-unused-expressions
          this.modeAuction_Requestl = this.saveRes.data.SaveAuction_ConfirmResult
          this.showSuccess("ذخیره اطلاعات باموفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selelectedItemTree?.NidRequest,
            bizCodeTitle: "NidRequest",
            saveDesc: `ذخیره اطلاعات فرم  مزایده - سوابق با موفقیت NidRequest ${
              this.selelectedItemTree?.NidRequest ?? ""
            } انجام شد`
          })
          await this.loadObj()
          this.isEditable = false
          this.$emit('afterSave')
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
