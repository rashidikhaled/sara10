<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"

  >
    <form-wrapper
      vertical
      title="تبدیل دستگاه به ساختمان"
    >
      <safa-status :result="convertResult" />
      <safa-status :result="baseLibResult" />
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-sm-6 q-mb-sm full-height">
          <fit>
            <internal-section class="fit">
              <!-- <fit> -->
              <nosazi-code-input
                v-model="baseNosaziCode"
                @enter="getBaseLibInNosaziCodeForTree"
                label="کد نوسازی دستگاه"
                actions
              />
              <q-separator class="q-my-sm"></q-separator>
              <safa-label class="lbl q-mb-sm">ساختار درختی فعلی</safa-label>
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
                >
                </q-tree>
              </div>
              <!-- </fit> -->
            </internal-section>
          </fit>
        </div>
        <div class="col-sm-6 full-height">
          <fit>
            <internal-section class="fit">
              <!-- <fit> -->
              <nosazi-code-input
                v-model="newNosaziCode"
                label="کد نوسازی ساختمان"
                ref="nosaziBuilding"
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
          spId="87b6c275-dce2-4547-8427-0f14b097275e"
          spCaption="ویرایش"
          label="تبدیل"
          @click="convertHouseSharingToBuilding"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
export default {
  route: 'parvandeh/convert-device-to-building',
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'شهرسازی- تبدیل دستگاه به ساختمان',
      formKey: '275a64b8-bd7c-4c69-be15-a1e72e884fee',
      name: 'UConvertDeviceToBuilding',
      main: true,
      sidebarCompatible: true,
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
      devicetResults: { ChildTree: {} },
      requestResult: null,
      result: null,
      buildingResults: {},
      nosaziCodeTrees: [],
      newNosaziCodeTrees: [],
      convertResult: null,
      baseLibResult: null
    }
  },
  methods: {
    getBaseLibInNosaziCodeForTree () {
      let payLoad = {
        pNosaziCode: { ...this.baseNosaziCode },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad)
        .then(({ data }) => {
          this.baseLibResult = this.getResponse(data)
          if (this.baseLibResult.success) {
            this.handleBaseNosaziCodeChanged()

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            this.log({
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
    handleBaseNosaziCodeChanged () {
      let payLoad = {
        pNosaziCode: { ...this.baseNosaziCode },
        pLoadFunc: 'ChildTree',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.devicetResults = this.requestResult.data
            this.nosaziCodeTrees = this.createNosaziCodeTree(
              this.devicetResults.ChildTree
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            this.log({
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
    handleNewNosaziCodeChanged () {
      let payLoad = {
        pNosaziCode: { ...this.newNosaziCode },
        pLoadFunc: 'ChildTree',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.buildingResults = this.result.data
            this.newNosaziCodeTrees = this.createNosaziCodeTree(
              this.buildingResults.ChildTree
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.newNosaziCode
            )

            this.log({
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

    convertHouseSharingToBuilding (e) {
      this.showConfirm(
        'آیا از تبدیل کد نوسازی دستگاه به کد ساختمان اطمینان دارید؟'
      ).onOk(() => {
        this.showLoading()
        let payLoad = {
          pHouseSharingNosaziCode: {
            Apartment: this.baseNosaziCode.Apartment,
            Block: this.baseNosaziCode.Block,
            Building: this.baseNosaziCode.Building,
            CI_City: 2,
            District: this.baseNosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 5,
            EumRevisitGroup: 0,
            House: this.baseNosaziCode.House,
            IsRoot: false,
            NidBase: this.devicetResults.ChildTree[0].NidBase,
            NidNosaziCode: this.devicetResults.ChildTree[0].NidNosaziCode,
            NidNosaziCodeParent: this.devicetResults.ChildTree[0]
              .NidNosaziCodeParent,
            NidRevisit: '00000000-0000-0000-0000-000000000000',
            NidUser: '00000000-0000-0000-0000-000000000000',
            Region: this.baseNosaziCode.Region,
            Shop: this.baseNosaziCode.Shop
          },
          pHouseNosaziCode: {
            Apartment: this.newNosaziCode.Apartment,
            Block: this.newNosaziCode.Block,
            Building: this.newNosaziCode.Building,
            CI_City: 0,
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
          pUserCode: this.getNidUser(),
          pUserName: this.getUsername(),
          UserInfo: this.currentUser,
          pIsCheckRequest: false
        }
        this.$services.SC.convertHouseSharingToBuilding(payLoad, {
          config: {
            District: this.baseNosaziCode.District
          }
        })
          .then(({ data }) => {
            this.convertResult = this.getResponse(data)
            if (this.convertResult.success) {
              this.showSuccess('تغییر کد نوسازی با موفقیت انجام پذیرفت.')
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )

              this.log({
                action: this.logActions.view,
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
