<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      vertical
      title="تبدیل عرصه به آپارتمان"
    >
      <safa-status :result="convertResult" />
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-sm-6 q-mb-sm full-height">
          <fit>
            <internal-section class="fit">
              <!-- <fit> -->
              <nosazi-code-input
                v-model="baseNosaziCode"
                @enter="handleBaseNosaziCodeChanged"
                label="کد نوسازی عرصه"
                :actions="true"
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
                  @update:selected="handleNewNosaziCodeChanged"
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
                label="کد نوسازی آپارتمان"
                ref="nosaziDevice"
              />
              <q-separator class="q-my-sm"></q-separator>
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
          label="تبدیل"
          @click="convertArseToDevice"
          spId="5a36ef29-0b93-4aef-8785-dc160fd7c28c"
          spCaption="ویرایش"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  name: "UConvertArseToApartment",
  route: "/parvandeh/convert-arse-to-apartment",
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تبدیل کد نوسازی عرصه به آپارتمان",
      formKey: "4eacede0-d17f-4efe-9412-872d207ac444",
      name: "UConvertArseToApartment",
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
      nosaziCodeTrees: [],
      newNosaziCodeTrees: [],
      newNosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      deviceResults: {},
      requestResult: null,
      result: null,
      arseResults: { ParentTree: {} },
      convertResult: null,
      baseLibResult: null
    }
  },
  methods: {
    handleBaseNosaziCodeChanged () {
      let payLoad = {
        pNosaziCode: { ...this.baseNosaziCode },
        pLoadFunc: "ChildTree",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payLoad)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.deviceResults = this.requestResult.data
            this.nosaziCodeTrees = this.createNosaziCodeTree(
              this.deviceResults.ChildTree
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
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
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
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
              bizCodeTitle: "کد نوسازی",
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
        pLoadFunc: "ChildTree",
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
              bizCodeTitle: "کد نوسازی",
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

    convertArseToDevice (e) {
      this.showConfirm(
        "آیا از تبدیل کد نوسازی عرصه به کد دستگاه اطمینان دارید؟"
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
            NidRevisit: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000",
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
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            NidRevisit: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000",
            Region: this.newNosaziCode.Region,
            Shop: this.newNosaziCode.Shop
          },
          UserInfo: this.currentUser
        }
        this.$services.SC.convertHouseToApartment(payLoad, {
          config: {
            District: this.baseNosaziCode.District
          }
        })
          .then(async ({ data }) => {
            this.convertResult = this.getResponse(data)
            if (this.convertResult.success) {
              this.showSuccess("تغییر کد نوسازی با موفقیت انجام پذیرفت.")
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.newNosaziCode
              )
              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
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
