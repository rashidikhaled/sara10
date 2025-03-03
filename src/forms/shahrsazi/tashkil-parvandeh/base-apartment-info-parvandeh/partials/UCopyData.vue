<template>
  <fit>
    <safa-status :result="copyResult" />
    <nosazi-code-input
      :label-shrink="true"
      live-update
      v-model="baseNosaziCode"
      cdcName="NosaziCode"
      actions
      label="کد نوسازی مقصد"
      class="q-pb-sm"
      enabled="0-0-0-0-0-1-0"
    />

    <btn-default label="کپی" @click="copy" />
  </fit>
</template>

<script>
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "UCopyData",
  mixins: [baseFormMixin],
  data () {
    return {
      tashkilParvandeCopyPrequest: {
        pFromNidBase: "",
        pToNidBase: "",
        pCount: "1",
        pNidUser: "",
        pUserName: "",
        pFillGap: "true",
        NewObjCode: null
      },
      copyResult: {},
      fromNosazi: {},
      toNosazi: {},
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      loadDataPrequest: {
        pNosaziCode: {
          Apartment: "3",
          Block: "76",
          Building: "1",
          CI_City: "0",
          District: "1",
          EumBaseInfoGroup: "0",
          EumNosaziCodeGroup: "0",
          EumNosaziCodeObjType: "0",
          EumRevisitGroup: "0",
          House: "10",
          Id: null,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          ParentId: null,
          Region: "4",
          Shop: "0",
          UserName: null
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: "false"
      }
    }
  },
  props: {
    parentBaseNosaziCode: Object
  },
  mounted () {
    this.baseNosaziCode = this.parentBaseNosaziCode

    this.baseNosaziCode.Apartment = 0
  },
  methods: {
    copy () {
      this.showConfirm(" آیا از تأیید اطمینان دارید؟").onOk(() => {
        this.$q.loading.show()
        this.$services.SA.getBaseLibInNosaziCode(
          {
            pNosaziCode: {
              ...this.parentBaseNosaziCode,
              ...this.options,
              NidUser: this.currentUser.NidUser
            }
          },
          this.config
        )
          .then(async (response) => {
            this.fromNosazi = this.getResponse(response.data)
            await this.log({
              action: this.logActions.view,
              bizCode: this.currentData._nidBase,
              bizCodeTitle: "NidBase"
            })

            this.$services.SA.getBaseLibInNosaziCode(
              {
                pNosaziCode: {
                  ...this.baseNosaziCode,
                  ...this.options,
                  NidUser: this.currentUser.NidUser
                }
              },
              this.config
            )
              .then((response) => {
                this.toNosazi = this.getResponse(response.data)

                this.tashkilParvandeCopyPrequest.pFromNidBase =
                  this.fromNosazi.data.HouseObj.NidBase

                this.tashkilParvandeCopyPrequest.pToNidBase =
                  this.toNosazi.data.HouseObj.NidBase

                this.tashkilParvandeCopyPrequest.pNidUser =
                  this.getNidUser()

                this.tashkilParvandeCopyPrequest.pUserName =
                  this.getUserDisplayName()

                this.$services.SC.tashkilParvandeCopy(
                  this.tashkilParvandeCopyPrequest,
                  this.config
                )
                  .then(async (response) => {
                    this.copyResult = this.getResponse(response.data)

                    if (!this.copyResult.hasError) {
                      this.showSuccess("عملیات با موفقیت انجام شد")
                      await this.log({
                        action: this.logActions.view,
                        bizCode: this.currentData._nidBase,
                        bizCodeTitle: "NidBase"
                      })
                    }
                  })
                  .catch(this.serverError())
                  .finally(this.hideLoading())
              })
              .catch((ex) => {
                this.$q.loading.hide()

                this.$q.dialog({
                  title: "خطا در سرور",
                  // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
                  message: ex.message
                })
              })
          })
          .catch((ex) => {
            this.$q.loading.hide()

            this.$q.dialog({
              title: "خطا در سرور",
              // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
              message: ex.message
            })
          })
      })
    },
    handleBaseNosaziCodeChanged () {
      let self = this
      this.baseNosaziCode = convertStringToNosaziCodeObject(this.nosaziCode)
      let data = {
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
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc: "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data, this.config)
        .then(async ({ data }) => {
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
                    " " +
                    self.baseLibResults.Base_Owner[i].OwnerLastName +
                    ","
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerLastName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerName + ","
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerLastName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerLastName + ","
                }
              }
            }
            // if (self.baseLibResults.Base_PreCodeInfo.length !== 0) {
            //   for (
            //     var j = 0;
            //     j < self.baseLibResults.Base_PreCodeInfo.length;
            //     j++
            //   ) {
            //     this.oldNosaziCode +=
            //       self.baseLibResults.Base_PreCodeInfo[j].PreCode + ','
            //   }
            // }
            if (self.baseLibResults.Base_PreCodeInfo !== null) {
              this.oldNosaziCode = self.baseLibResults.Base_PreCodeInfo.PreCode
            }

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCodeFromParent
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((response) => {
          self.baseLibResult = this.getResponse(response)
          // console.log(this.baseLibResult)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  computed: {
    config () {
      return {
        config: { District: this.baseNosaziCode.District }
      }
    }
  }
}
</script>
