<template>
  <form-wrapper title="تطبیق کد نوسازی جاری با ممیزی" hideTitle vertical>
    <fit>
      <safa-status :result="convertResult" />
      <safa-status :result="loadNosaziCodeParvandeResult" />
      <safa-status :result="loadNosaziCodeMomayeziResult" />
      <div class="row q-col-gutter-sm">
        <safa-label class="lbl">کد نوسازی جاری</safa-label>
        <div class="col-sm-6 col-md-4">
          <nosazi-code-input
            v-model="baseNosaziCode"
            autofocus
            @enter="loadNosaziCodeParvande"
          />
        </div>
        <safa-label class="lbl">کد نوسازی ممیزی</safa-label>
        <div class="col-sm-6 col-md-4">
          <nosazi-code-input
            v-model="newNosaziCode"
            @enter="loadNosaziCodeMomayezi"
          />
        </div>
        <div class="col-6">
          <safa-label class="lbl">ساختار درختی جاری</safa-label>
          <q-tree
            ref="tree1"
            default-expand-all
            selected-color="primary"
            node-key="nosaziCodeString"
            label-key="nosaziCodeString"
            :nodes="nosaziCodeTrees"
            :selected.sync="selectedNosaziCode"
          >
          </q-tree>
        </div>
        <div class="col-6">
          <safa-label class="lbl">ساختار درختی انتقالی</safa-label>
          <q-tree
            ref="tree2"
            default-expand-all
            selected-color="primary"
            node-key="nosaziCodeString"
            label-key="nosaziCodeString"
            :nodes="nosaziCodeTreesDestination"
            :selected.sync="newSelectedNosaziCode"
          >
          </q-tree>
        </div>
      </div>
      <div class="col-6"></div>
    </fit>
    <template v-slot:footer>
      <div class="row q-gutter-sm">
        <btn-default label="تایید" @click="connectParvandehToMomayezi" />
        <btn-default label="انصراف" @click="cancel" />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
// import convertDeviceToBuildingPrequest from 'src/models/convertDeviceToBuildingPrequest'
import loaderMixin from "src/mixins/loaderMixin.js"
import baseFormMixin from "src/mixins/baseFormMixin.js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  name: "tatbighJariWithMomayezi",
  route: "parvandeh/tatbigh-jari-with-momayezi",
  mixins: [loaderMixin, baseFormMixin],
  data () {
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
      newNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nosaziCodeTrees: [],
      nosaziCodeTreesDestination: [],
      selectedNosaziCode: "1-2-3-4-0-0-0",
      newSelectedNosaziCode: "1-2-3-4-0-0-0",
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      childTree: [],
      childTreeDestination: [],
      pNosaziCode: {
        pNosaziCode: {
          Apartment: 0,
          Block: 0,
          Building: 0,
          CI_City: "0",
          District: 0,
          EumBaseInfoGroup: "0",
          EumNosaziCodeGroup: "1",
          EumNosaziCodeObjType: "0",
          EumRevisitGroup: "0",
          House: 0,
          Id: null,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          ParentId: null,
          Region: 0,
          Shop: 0,
          UserName: null
        }
      },

      // Res
      convertResult: null,
      loadNosaziCodeParvandeResult: null,
      loadNosaziCodeMomayeziResult: null
    }
  },
  props: {
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  methods: {
    async loadNosaziCodeParvande () {
      const payload = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode?.Apartment ?? 0,
          Block: this.baseNosaziCode?.Block ?? 0,
          Building: this.baseNosaziCode?.Building ?? 0,
          CI_City: 0,
          District: this.baseNosaziCode?.District ?? 0,
          EumBaseInfoGroup: "0",
          EumNosaziCodeGroup: "0",
          EumNosaziCodeObjType: "0",
          EumRevisitGroup: "0",
          House: this.baseNosaziCode?.House ?? 0,
          Id: null,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser:
            this.currentUser?.GUID ?? "00000000-0000-0000-0000-000000000000",
          ParentId: null,
          Region: this.baseNosaziCode?.Region ?? 0,
          Shop: this.baseNosaziCode?.Shop ?? 0,
          UserName: null
        }
      }
      this.showLoading()
      try {
        const { data } = await this.$services.SA.getNosaziCodeTreeChild(
          payload,
          {
            config: {
              District: this.baseNosaziCode.District
            }
          }
        )
        this.loadNosaziCodeParvandeResult = await this.getResponse(data)
        this.childTree = this.loadNosaziCodeParvandeResult.data.ChildTree || []
        const isValid = !!this.childTree.length
        if (isValid) {
          this.buildTree(this.childTree)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })
        } else {
          this.showError("کد نوسازی معتبر نمیباشد")
        }
      } catch (e) {
        console.error(e)
        this.hideLoading()
      } finally {
        this.hideLoading()
      }
    },
    async loadNosaziCodeMomayezi () {
      const payload = {
        pNosaziCode: {
          Apartment: this.newNosaziCode?.Apartment ?? 0,
          Block: this.newNosaziCode?.Block ?? 0,
          Building: this.newNosaziCode?.Building ?? 0,
          CI_City: 0,
          District: this.newNosaziCode?.District ?? 0,
          EumBaseInfoGroup: "0",
          EumNosaziCodeGroup: "1",
          EumNosaziCodeObjType: "0",
          EumRevisitGroup: "0",
          House: this.newNosaziCode?.House ?? 0,
          Id: null,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser:
            this.currentUser?.GUID ?? "00000000-0000-0000-0000-000000000000",
          ParentId: null,
          Region: this.newNosaziCode?.Region ?? 0,
          Shop: this.newNosaziCode?.Shop ?? 0,
          UserName: null
        }
      }
      this.showLoading()
      try {
        const { data } = await this.$services.SA.getNosaziCodeTreeChild(
          payload,
          {
            config: {
              District: this.baseNosaziCode.District
            }
          }
        )
        this.loadNosaziCodeMomayeziResult = await this.getResponse(data)
        this.childTreeDestination =
          this.loadNosaziCodeMomayeziResult.data?.ChildTree || []
        const isValid = !!this.childTreeDestination.length
        if (isValid) {
          this.nosaziCodeTreesDestination = this.createNosaziCodeTree(
            this.childTreeDestination
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
        } else {
          this.showError("کد نوسازی معتبر نمیباشد")
        }
      } catch (e) {
        console.error(e)
        this.hideLoading()
      } finally {
        this.hideLoading()
      }
    },
    buildTree (childTree) {
      if (!childTree || !Array.isArray(childTree)) {
        return
      }
      const parentCode = childTree
        .filter((x) => x.EumNosaziCodeObjType > 0) // Some error found here that object type is zer0
        .reduce((state, x) =>
          x.EumNosaziCodeObjType < state.EumNosaziCodeObjType ? x : state
        )
      const convert = (nosaziCode) => {
        return `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}-${nosaziCode.Building}-${nosaziCode.Apartment}-${nosaziCode.Shop}`
      }
      const icons = [
        "home",
        "home",
        "home",
        "home_work",
        "apartment",
        "account_balance",
        "shopping_cart"
      ]
      const names = [
        "ناحیه",
        "بلوک",
        "زمین",
        "ساختمان",
        "آپارتمان",
        "دستگاه",
        "صنف"
      ]
      function getChildren (nosaziCode) {
        if (!nosaziCode) {
          return
        }
        nosaziCode.name = names[nosaziCode.EumNosaziCodeObjType]
        nosaziCode.icon = icons[nosaziCode.EumNosaziCodeObjType]
        nosaziCode.nosaziCodeString = convert(nosaziCode)
        nosaziCode.children = childTree.filter(
          (x) => nosaziCode.Id === x.ParentId
        )
        nosaziCode.children.forEach((child) => getChildren(child))
      }
      getChildren(parentCode)
      this.nosaziCodeTrees = [parentCode]
    },
    confirmAllow () {
      this.showConfirm(
        "آیا از تطبیق کد نوسازی جاری با ممیزی اطمینان دارید؟"
      ).onOk(() => {
        this.connectParvandehToMomayezi()
      })
    },
    async connectParvandehToMomayezi () {
      let baseRow = this.childTree.filter(
        (f) =>
          // eslint-disable-next-line eqeqeq
          f.District == Number(this.baseNosaziCode.District) &&
          // eslint-disable-next-line eqeqeq
          f.Region == Number(this.baseNosaziCode.Region) &&
          // eslint-disable-next-line eqeqeq
          f.Block == Number(this.baseNosaziCode.Block) &&
          // eslint-disable-next-line eqeqeq
          f.House == Number(this.baseNosaziCode.House) &&
          // eslint-disable-next-line eqeqeq
          f.Building == Number(this.baseNosaziCode.Building) &&
          // eslint-disable-next-line eqeqeq
          f.Apartment == Number(this.baseNosaziCode.Apartment) &&
          // eslint-disable-next-line eqeqeq
          f.Shop == this.baseNosaziCode.Shop
      )
      console.log("base row", baseRow)
      let momayeziRow = this.childTreeDestination.filter(
        (f) =>
          // eslint-disable-next-line eqeqeq
          f.District == Number(this.newNosaziCode.District) &&
          // eslint-disable-next-line eqeqeq
          f.Region == Number(this.newNosaziCode.Region) &&
          // eslint-disable-next-line eqeqeq
          f.Block == Number(this.newNosaziCode.Block) &&
          // eslint-disable-next-line eqeqeq
          f.House == Number(this.newNosaziCode.House) &&
          // eslint-disable-next-line eqeqeq
          f.Building == Number(this.newNosaziCode.Building) &&
          // eslint-disable-next-line eqeqeq
          f.Apartment == Number(this.newNosaziCode.Apartment) &&
          // eslint-disable-next-line eqeqeq
          f.Shop == this.newNosaziCode.Shop
      )
      const payload = {
        pParvandehNosaziCode:
          baseRow[0]?.NidNosaziCode ?? "00000000-0000-0000-0000-000000000000",
        pMomayeziNosaziCode:
          momayeziRow[0]?.NidNosaziCode ??
          "00000000-0000-0000-0000-000000000000",
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        UserInfo: {
          JobLocationGuid: this.currentUser.JobLocationGuid,
          JobLocationName: this.currentUser.JobLocationName,
          JobLocationOfficeTel: this.currentUser.JobLocationOfficeTel,
          Token: null,
          UserGroups: this.currentUser.UserGroups,
          UserGuid: this.getNidUser(),
          UserGuidNew: null,
          UserName: this.getUserDisplayName(),
          UserTelephone: null
        }
      }
      try {
        const { data } = await this.$services.SC.connectParvandehToMomayezi(
          payload,
          {
            config: {
              District: this.baseNosaziCode.District
            }
          }
        )

        this.convertResult = await this.getResponse(data)
        if (this.convertResult.success) {
          this.showSuccess("عملیات با موفقیت انجام شد")
          this.$emit("reLoad")
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
      } catch (error) {
        this.serverError()
        console.error(error)
      }
    },

    cancel () {
      this.convertResult = {}
      this.baseNosaziCode = [0, 0, 0, 0, 0, 0, 0]
      this.newNosaziCode = [0, 0, 0, 0, 0, 0, 0]
      this.$emit("closeModal", false)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
