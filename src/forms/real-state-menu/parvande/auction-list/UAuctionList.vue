<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title" :hideTitle="hideTitle" :padding="false">        <safa-status :result="loadObjRes" />
        <safa-status :result="getAuctionInfoRes" />
        <safa-status :result="delAuctionRes" />
        <safa-status :result="saveObjRes" />
      <fit>
        <safa-splitter v-model="splitterModel" vertical margin="0">
          <template v-slot:before>
            <fit>
              <div class="flex column justify-between full-height">
                <fit>
                  <q-list bordered>
                    <q-item
                      clickable
                      v-ripple
                      v-for="(item, index) in treeView"
                      :key="index"
                      @click="selectItem(item)"
                    >
                      <q-item-section avatar>
                        <q-avatar color="primary" icon="mark_chat_read" />
                      </q-item-section>
                      <q-item-section>{{ getName(item) }}</q-item-section>
                    </q-item>
                  </q-list>
                </fit>
              </div>
            </fit>
          </template>
          <template v-slot:after>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              v-model="model.Auction_Info.Subject"
              cdcName="Subject"
              label="موضوع مزایده"
               :m="mode"
              label-width="100px"
               required
                    validation="required"
                    class="q-mt-sm"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="model.Auction_Info.AuctionDate"
              cdcName="AuctionDate"
              label="تاریخ مزایده"
               :m="mode"
              label-width="100px"
               required
                    validation="required"
                      class="q-mt-sm"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="model.Auction_Info.Payment"
              cdcName="Payment"
              label="درآمد حاصله"
               :m="mode"
              label-width="100px"
                class="q-mt-sm"
            />
          </FormControl>
          <text-template
            v-model="model.Auction_Info.Description"
            :rows="1"
            cdcName="comments"
            formKey="C11B69F7-B5BE-44FC-860B-28DC8BEF58FB"
            label="توضیحات"
             :m="mode"
            label-width="100px"
          />
        </FormRow>
        <safa-splitter v-model="spModel" vertical>
          <template v-slot:before>
            <fit>
              <safa-grid
                v-model="model.Auction_Advertisment"
                cdcName="Auction_Advertisment"
                title="آگهی های مزایده"
                fit
                paginate
                :columns="AdvertismentColumns"
                 :m="mode"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                v-model="model.Auction_Participants"
                cdcName="Auction_Participants"
                title="شرکت کنندگان"
                fit
                paginate
                :columns="ParticipantsColumns"
                 :m="mode"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
        </safa-splitter>
      </fit>

      <template #footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
        <template>
        <btn-default label="حذف" @click="deleteObj" spCaption="حذف" />
        <!-- spId="2b817893-8b30-45e7-a0e6-61efe189c392" -->
      </template>
        </FormActions>
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
      name: "UAuctionList",
      formKey: "4C6D8341-BC25-4C32-9923-E5A372FE20ED",
      title: "مزایده - سوابق",
      main: true,

      spModel: 50,
      auctionListInfo: null,
      delAuctionRes: null,
      getAuctionInfoRes: null,
      loadObjRes: null,
      saveObjRes: null,

      model: {
        Auction_Advertisment: [],
        Auction_Info: {
          AuctionDate: null,
          Description: null,
          NIdAuction: "00000000-0000-0000-0000-000000000000",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          NIdAuction_tmp: 0,
          Payment: null,
          Subject: null
        },
        Auction_Participants: [],
        IsConfirmContractBuy: false
      },
      treeView: [],
      selelectedItemTree: {},
      splitterModel: 20,

      AdvertismentColumns: [
        { field: "AdvertismentDate", title: "تاریخ آگهی" },
        { field: "AdvertismentPos", title: "مکان آگهی" }
      ],
      ParticipantsColumns: [
        { field: "Name", title: "نام" },
        { field: "Company", title: "نهاد/ارگان" },
        { field: "RecommendedPrice", title: "مبلغ پیشنهادی" },
        { field: "IsWiner", title: "برنده" },
        { field: "Description", title: "توضیحات" }
      ]
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      // console.log("currentObj ==> ", this.currentObj)
      const nidProc = this.currentObj?.NIdProcess || this.selectedRequest.NidProc
      const payload = {
        PNIdProc: nidProc || "00000000-0000-0000-0000-000000000000" // "80189d0e-caa1-4dee-a699-d262eddbade1"
      }
      this.showLoading()
      this.$services.ES.getAuctionInfoRequestList(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.treeView = this.loadObjRes.data?.GetAuction_Info_RequestListResult ?? []
            if (this.treeView.length > 0) {
              this.selelectedItemTree = this.treeView[this.treeView.length - 1]
              this.getAuctionInfo()
            }
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
    async saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      let request = {
        ...this.model
      }
      request.Auction_Info.NidRequest = this.currentObj.NidRequest

      const payload = {
        PObj: { ...this.model }
      }

      try {
        const { data } = await this.$services.ES.saveAuctionInfo(payload)
        this.saveObjRes = this.getResponse(data)
        if (this.saveObjRes.success) {
          this.showSuccess("ذخیره اطلاعات باموفقیت انجام شد")
          this.loadObj()
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.PNidAuction,
            bizCodeTitle: "NIdEvaluation",
            saveDesc: `ذخیره اطلاعات فرم برگزاری مزایده با NIdEvaluation ${
              this.PNidAuction ?? ""
            } انجام شد`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async   getAuctionInfo () {
      this.showLoading()
      let payload = {
        PNidAuction: this.selelectedItemTree.NIdAuction

      }
      try {
        const { data } = await this.$services.ES.getAuctionInfo(payload)
        this.$services.ES.getAuctionInfo(payload)
        this.getAuctionInfoRes = this.getResponse(data)
        if (this.getAuctionInfoRes.success) {
          this.model = this.getAuctionInfoRes.data.GetAuction_InfoResult
          await this.log({
            action: this.logActions.view,
            bizCode: this.selelectedItemTree?.NIdAuction,
            bizCodeTitle: 'NidAuction',
            saveDesc: `بارگذاری اطلاعات فرم مزایده  با NIdAuction ${
              this.selelectedItemTree?.NIdAuction ?? ""
            } انجام شد`

          })
        }
      }
      catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    deleteObj () {
      this.showConfirm("آیا از حذف اطلاعات اطمینان دارید؟").onOk(() => {
        this.delAuctionInfo()
      })
    },
    delAuctionInfo () {
      this.showLoading()
      this.$services.ES.delAuctionInfo({
        PNidAuction: this.selelectedItemTree._NIdAuction
      })
        .then(async ({ data }) => {
          this.delAuctionRes = this.getResponse(data)
          if (this.delAuctionRes.success) {
            this.showSucces("حذف اطلاعات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selelectedItemTree._NIdAuction,
              bizCodeTitle: 'NidAuction',
              saveDesc: `حذف اطلاعات ${this.selelectedItemTree._NIdAuction} با موفقیت انجام شد.`
            })
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
    getName (item) {
      return `قیمت گذاری - ${item.AuctionDate}`
    },
    selectItem (item) {
      this.selelectedItemTree = item
      this.getAuctionInfo()
    }
  }
}
</script>
