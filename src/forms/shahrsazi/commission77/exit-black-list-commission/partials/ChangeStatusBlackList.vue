<template>
  <div>
    <form-wrapper>
      <section>
        <div class="form-title">
          خروج از لیست سیاه
        </div>

        <safa-status
          :result="baseLibResult"
          class="col-12"
        />
        <safa-status
          :result="result"
          class="col-12"
        />
        <safa-status
          :result="validationResult"
          class="col-12"
        />
        <safa-status
          :result="exitBlacKListResult"
          class="col-12"
        />
        <!-- <div class="row q-pa-md">
      <div class="col-12 col-sm-12">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-12 q-col-gutter-md col-md-9 col-lg-9">
            <div class="form-row">
              <safa-text outlined label="نام مالک " v-model="ownerName">
              </safa-text>
            </div>
            <div class="form-row ">
              <safa-text label=" کد قدیم" v-model="oldNosaziCode"> </safa-text>
            </div>
          </div>
          <div class="col-12 col-sm-9 col-md-3  col-lg-3">
            <div class="form-row">
              <nosazi-code-input
                actions
                from-request
                v-model="baseNosaziCode"
                @input="handleBaseNosaziCodeChanged"
              />
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-6 q-col-gutter-md col-lg-12">
            <div class="form-row">
              <safa-text
                outlined
                label="آدرس "
                type="textarea"
                v-model="baseLibResults.Base_AddressInfo.MainAddress"
              >
              </safa-text>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr /> -->
        <q-card class="row q-pa-md q-mt-lg">
          <div class="row full-width">
            <div class="col-md-4">
              <safa-combo
                v-model="selectedStatus"
                :options="statusList"
                cdcName="Status"
                label="وضعیت"
                sourceType="local"
              ></safa-combo>
            </div>
          </div>

          <div class="form-row q-mt-lg">
            <text-template
              v-model="comments"
              cdcName="comments"
              formKey="87917171-9369-4EDA-8BA5-BF3ECD04C437"
              label="توضیحات  "
            />
          </div>
        </q-card>
      </section>
      <template v-slot:footer>
        <div class="row q-gutter-md justify-lg-end q-mr-xl q-mt-md">
          <q-btn
            class="btn-save"
            icon="done"
            label="ذخیره"
            @click="accept"
          ></q-btn>
          <q-btn
            class="btn-cancel"
            icon="arrow_right_alt"
            label=" انصراف "
            @click="cancle"
          ></q-btn>
        </div>
      </template>
    </form-wrapper>
  </div>
</template>
<script>
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  data: function () {
    return {
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResult: null,
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: {},
        BuildingObj: {},
        Sh_RequestInfo: {}
      },
      ownerName: '',
      oldNosaziCode: '',
      result: null,
      comments: '',
      exitBlackList: false,
      statusList: [
        { ID: 0, Title: 'هشدار' },
        { ID: 1, Title: 'توقف' },
        { ID: 2, Title: 'توقف صدور' }
      ],
      selectedStatus: 0
    }
  },
  mixins: [baseFormMixin],
  methods: {
    handleBaseNosaziCodeChanged () {
      // getBaseLibInNosaziCode method
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
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc: 'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
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
                    ' ' +
                    self.baseLibResults.Base_Owner[i].OwnerLastName +
                    ','
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerLastName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerName + ','
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerLastName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerLastName + ','
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

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch(response => {
          self.baseLibResult = this.getResponse(response)
          // console.log(this.baseLibResult)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    changeStatusBlackListMethod () {
      let data = {
        pNidBlack: this.nidBlack,
        pComments: this.comments,
        pUserName: 'مدير سيستم (sa)',
        pUserCode: '7bc16d9a-9ac4-47af-bc28-adad1622a054',
        IsAdmin: true,
        pDomain: 'Sara8',
        pEumBlackListControl: this.selectedStatus
      }
      this.$services.SA.changeBlackListControl(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('تغییر وضعیت لیست سیاه با موفقیت انجام شد.')
            this.cancle()
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.showError(' انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    accept () {
      this.changeStatusBlackListMethod()
    },
    cancle () {
      this.exitBlackList = true
      this.$emit('backToBlackListForm', this.exitBlackList)
    }
  },
  props: {
    nosaziCode: Object,
    nidNosaziCode: String,
    entryCause: Number,
    nidBlack: String,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  // computed: {
  //   nosaziCodeObj () {
  //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  //     this.baseNosaziCode = convertStringToNosaziCodeObject(this.nosaziCode)
  //     return this.baseNosaziCode
  //   }
  // },
  mounted () {
    this.handleBaseNosaziCodeChanged()
  }
}
</script>
