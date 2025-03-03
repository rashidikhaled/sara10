<template>
  <safa-form
    :id="formKey"
    :caption="title"
        app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      vertical
      title="تبدیل آپارتمان به عرصه"
    >
      <safa-status :result="convertResult" />
      <safa-status :result="baseLibResult" />
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-sm-6 q-mb-sm full-height">
          <fit>
            <internal-section
              class="fit"
              className="q-ma-none"
            >
              <!-- <fit> -->
              <nosazi-code-input
                v-model="baseNosaziCode"
                @enter="getBaseLibInNosaziCodeForTree"
                label="کد نوسازی آپارتمان"
                :actions="true"
              />
              <q-separator class="q-my-sm">
              </q-separator>
              <safa-label class="lbl q-mb-sm">ساختار درختی فعلی
              </safa-label>
              <div
                v-scroll
                class="fit scroll"
              >
                <q-tree
                  ref="tree"
                  default-expand-all
                  selected-color="primary"
                  node-key="key"
                  label-key="label"
                  :nodes="nosaziCodeTrees"
                  @update:selected="handleNewNosaziCodeChanged"
                >
                </q-tree>
              </div>
              <!-- </fit> -->
            </internal-section>
          </fit>
        </div>
        <div class="col-md-6 full-height">
          <fit>
            <internal-section
              class="fit"
              className="q-ma-none"
            >
              <!-- <fit> -->
              <nosazi-code-input
                v-model="newNosaziCode"
                label="کد نوسازی عرصه"
                ref="nosaziArse"
              />
              <q-separator class="q-my-sm">
              </q-separator>
              <safa-label class="lbl q-mb-sm">ساختار درختی انتقالی
              </safa-label>
              <div
                v-scroll
                class="fit scroll"
              >
                <q-tree
                  ref="treeDestination"
                  default-expand-all
                  selected-color="primary"
                  node-key="key"
                  label-key="label"
                  :nodes="newNosaziCodeTrees"
                >
                </q-tree>
              </div>
              <!-- </fit> -->
            </internal-section>
          </fit>
        </div>
      </div>
      <template v-slot:footer>
        <btn-default
          spId="ac5388c2-845c-4265-905c-f6f367038590"
          spCaption="ویرایش"
          label="تبدیل"
          @click="convertApartmentToHouse"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
export default {
  route: 'parvandeh/convert-apartment-to-arse',
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'شهرسازی- تبدیل آپارتمان به عرصه',
      formKey: '307c7c34-1c32-40fe-9a9e-30035199da32',
      name: 'UConvertApartmentToArse',
      main: true,
      baseNosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      newNosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      apartmentResults: {},
      requestResult: null,
      result: null,
      arseResults: { ParentTree: {} },
      nosaziCodeTrees: [],
      newNosaziCodeTrees: [],
      convertResult: null,
      baseLibResult: null
    }
  },
  methods: {
    handleBaseNosaziCodeChanged () {
      let payLoad = {
        pNosaziCode: { ...this.baseNosaziCode },
        pLoadFunc: 'ChildTree',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.apartmentResults = this.requestResult.data
            this.nosaziCodeTrees = this.createNosaziCodeTree(
              this.apartmentResults.ChildTree
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleNewNosaziCodeChanged () {
      let payLoad = {
        pNosaziCode: { ...this.newNosaziCode },
        pLoadFunc: 'ChildTree',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.arseResults = this.result.data
            this.newNosaziCodeTrees = this.createNosaziCodeTree(
              this.arseResults.ChildTree
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.newNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getBaseLibInNosaziCodeForTree () {
      let payLoad = {
        pNosaziCode: { ...this.baseNosaziCode },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad)
        .then(async ({ data }) => {
          this.baseLibResult = this.getResponse(data)
          if (this.baseLibResult.success) {
            this.handleBaseNosaziCodeChanged()

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    convertApartmentToHouse (e) {
      this.showConfirm(
        'آیا از تبدیل کد نوسازی آپارتمان به کد عرصه اطمینان دارید؟'
      ).onOk(() => {
        this.showLoading()

        let payLoad = {
          pFromNosaziCode: {
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            CI_City: 6,
            District: this.baseNosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 2,
            EumRevisitGroup: 0,
            House: this.baseNosaziCode.House,
            IsRoot: false,
            NidBase: this.arseResults.ParentTree.NidBase,
            NidNosaziCode: this.arseResults.ParentTree.NidNosaziCode,
            NidRevisit: '00000000-0000-0000-0000-000000000000',
            NidUser: '00000000-0000-0000-0000-000000000000',
            Region: this.baseNosaziCode.Region,
            Shop: this.baseNosaziCode.Shop
          },
          pToNosaziCode: {
            Apartment: this.newNosaziCode.Apartment,
            Block: this.newNosaziCode.Block,
            Building: this.newNosaziCode.Building,
            CI_City: 6,
            District: this.newNosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: this.newNosaziCode.House,
            IsRoot: false,
            NidBase: '00000000-0000-0000-0000-000000000000',
            NidNosaziCode: '00000000-0000-0000-0000-000000000000',
            NidRevisit: '00000000-0000-0000-0000-000000000000',
            NidUser: '00000000-0000-0000-0000-000000000000',
            Region: this.newNosaziCode.Region,
            Shop: this.newNosaziCode.Shop
          },
          UserInfo: this.currentUser
        }
        this.$services.SC.convertApartmentToHouse(payLoad, {
          config: {
            District: this.baseNosaziCode.District
          }
        })
          .then(async ({ data }) => {
            this.convertResult = this.getResponse(data)
            if (this.convertResult.success) {
              this.showSuccess('تغییر کد نوسازی با موفقیت انجام پذیرفت.')
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              await this.log({
                action: this.logActions.save,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی',
                nosaziCode: strNosaziCode
              })
              this.handleNewNosaziCodeChanged()
            }
          })
          .catch(ex => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
