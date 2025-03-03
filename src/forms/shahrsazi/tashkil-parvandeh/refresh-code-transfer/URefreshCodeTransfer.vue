<template>
  <safa-form
    id="c1bc7223-7c33-44b4-a031-ed1933ca4846"
    caption="شهرسازی- انتقال کد نوسازی"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :title="title">
      <safa-status :result="transferResult" />
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-md-6 q-mb-sm full-height">
          <fit>
            <internal-section class="fit" className="q-ma-none">
              <nosazi-code-input
                v-model="baseNosaziCode"
                cdcName="oldNosaziCode"
                label="کد نوسازی فعلی"
                label-width="85px"
                :actions="true"
                @enter="getBaseLibInNosaziCode"
              />
              <q-separator class="q-my-sm"></q-separator>
              <safa-label class="lbl q-mb-sm">ساختار درختی فعلی</safa-label>
              <div v-scroll class="fit custom-scroll">
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
            </internal-section>
          </fit>
        </div>
        <div class="col-md-6 full-height">
          <fit>
            <internal-section class="fit" className="q-ma-none">
              <nosazi-code-input
                v-model="newNosaziCode"
                cdcName="newNosaziCode"
                label="کد نوسازی جدید"
                label-width="85px"
                ref="newCode"
              />
              <q-separator class="q-my-sm"></q-separator>
              <safa-label class="lbl q-mb-sm">ساختار درختی انتقالی</safa-label>
              <div v-scroll class="fit custom-scroll">
                <q-tree
                  ref="treeDestination"
                  default-expand-all
                  selected-color="primary"
                  node-key="key"
                  label-key="label"
                  :nodes="nosaziCodeTreesDestination"
                >
                </q-tree>
              </div>
            </internal-section>
          </fit>
        </div>
      </div>
      <!-- spId="ecf85ead-168e-4d35-9201-0063d72fd1c5" -->

      <template v-slot:footer>
        <btn-default
          spCaption="انتقال"
          label="انتقال"
          @click="transferNosaziCode"
        />
        <!-- <btn-default label="انصراف" @click="exit" class="q-ml-sm" /> -->
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import transferRefreshCodePrequest from "src/models/transferRefreshCodePrequest.js"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  route: "parvandeh/refresh-code-transfer",
  mixins: [baseFormMixin],
  data () {
    return {
      title: "انتقال کد نوسازی",
      formKey: "c1bc7223-7c33-44b4-a031-ed1933ca4846",
      name: "URefreshCodeTransfer",
      main: true,
      sidebarCompatible: true,

      getBaseLibResult: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      newNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      isView: false,
      nosaziCodeTrees: [],
      nosaziCodeTreesDestination: [],
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      transferResult: {},
      childTree: {}
      // childTreeDestination: {},
    }
  },
  methods: {
    // cancel() {
    //   this.baseNosaziCode = [0, 0, 0, 0, 0, 0, 0];
    //   this.newNosaziCode = [0, 0, 0, 0, 0, 0, 0];
    // },
    exit () {
      this.hideSidebar("URefreshCodeTransfer")
      this.redirectToKartable()
    },
    getBaseLibInNosaziCode (nosaziCode) {
      const first = {
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
      }
      const second = {
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
        IsRoot: "false",
        NidBase: "00000000-0000-0000-0000-000000000000",
        NidNosaziCode: "00000000-0000-0000-0000-000000000000",
        Region: this.newNosaziCode.Region,
        Shop: this.newNosaziCode.Shop
      }
      let data = {
        pNosaziCode: nosaziCode === this.newNosaziCode ? second : first,
        pLoadFunc: "ChildTree",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          const result = this.getResponse(data)
          this.getBaseLibResult = result.data.MainObj
          this.childTree = result.data["ChildTree"] || []
          // console.log('//////////////this.childTree', this.childTree)
          const isValid = !!this.childTree.length
          if (isValid) {
            if (nosaziCode === this.newNosaziCode) {
              this.nosaziCodeTreesDestination = this.createNosaziCodeTree(
                this.childTree
              )
            } else {
              this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree)
            }
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                nosaziCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی"
              })
            }
            this.isView = true
          }
        })
        .catch((response) => {
          self.baseLibResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    transferNosaziCode () {
      this.showConfirm(
        "آیا از انتقال کد نوسازی فعلی به کد جدید اطمینان دارید؟"
      ).onOk(() => {
        // transferRefreshCodePrequest.pFromNosaziCode.NidNosaziCodeParent !== "00000000-0000-0000-0000-000000000000" ?
        //   this.getBaseLibPrequest.pNosaziCode.NidNosaziCodeParent : this.getBaseLibPrequest.pNosaziCode.NidNosaziCodeParent
        transferRefreshCodePrequest.pFromNosaziCode = this.getBaseLibResult
        transferRefreshCodePrequest.pToNosaziCode = this.newNosaziCode
        transferRefreshCodePrequest.UserInfo = this.currentUser
        transferRefreshCodePrequest.pIsChangeNosaziCodeInSubSystems = false
        this.showLoading()
        this.$services.SC.transferNosaziCode(transferRefreshCodePrequest, {
          config: { District: this.baseNosaziCode.District }
        })
          .then(async (response) => {
            this.transferResult = this.getResponse(response.data)
            if (response.data.BizErrors.length === 0) {
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              const strNewNosaziCode = convertNosaziCodeObjectToString(
                this.newNosaziCode
              )
              let newCode = strNosaziCode.split("").reverse().join("")
              let oldCode = strNewNosaziCode.split("").reverse().join("")

              await this.log({
                action: this.logActions.transfer,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: strNosaziCode,
                saveDesc: `انتقال کد نوسازی  از  ${oldCode}  به کد نوسازی  ${newCode}  انجام گردید.`
              })
              this.showSuccess(`عملیات انتقال کد نوسازی  از  ${newCode}  به کد نوسازی  ${oldCode}  با موفقیت انجام گردید.`)

              this.getBaseLibInNosaziCode(this.newNosaziCode)
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(this.hideLoading())
      })
    }

    // handleBaseNosaziCodeDestinationChanged() {
    //   this.showLoading();
    //   this.$services.SA.getNosaziCodeTreeChild(
    //     {
    //       pNosaziCode: {
    //         ...this.newNosaziCode,
    //         ...this.options,
    //         NidUser: this.currentUser.NidUser,
    //       },
    //     },
    //     {
    //       config: {
    //         District: this.baseNosaziCode.District,
    //       },
    //     }
    //   )
    //     .then(({ data }) => {
    //       this.result = this.getResponse(data);
    //       this.childTreeDestination = this.result.data["ChildTree"] || [];
    //       // console.log('//////////////this.childTree', this.childTree)
    //       const isValid = !!this.childTree.length;
    //       if (isValid) {
    //         this.nosaziCodeTreesDestination = this.createNosaziCodeTree(
    //           this.childTreeDestination
    //         );
    //         const strNosaziCode = convertNosaziCodeObjectToString(
    //           this.baseNosaziCode
    //         );
    //         await this.log({
    //           action: this.logActions.view,
    //           bizCode: strNosaziCode,
    //           bizCodeTitle: "کد نوسازی",
    //           nosaziCode: strNosaziCode,
    //         });
    //       } else {
    //         this.showError("کد نوسازی معتبر نمیباشد");
    //       }
    //     })
    //     .catch(this.serverError())
    //     .finally(() => {
    //       this.hideLoading();
    //     });
    // },
  }
}
</script>
<style scoped>
/* #new-nosazi{
  margin-left: 1000px;
} */
</style>
