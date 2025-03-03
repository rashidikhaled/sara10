<template>
  <safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    caption="شهرسازی- تجمیع عرصه"
  >
    <form-wrapper vertical :title="title" :padding="false">
      <template #header>
        <safa-status :result="tajmiRes" />
        <safa-status :result="baseLibResult" />
      </template>
      <fit>
        <safa-grid
          title="موارد تجمیع از"
          helper="tajmiArseDastgahColumns"
          v-model="tajmiList"
          cdcName="tajmiArseDastgah"
          :showRowNumber="false"
          m="e"
          fit
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          @cell:keyDown="keyDownOnCell"
          :defaultNewRow="{
            District: 0,
            Region: 0,
            Block: 0,
            House: 0,
            Building: 0,
            Apartment: 0,
            Shop: 0,
          }"
          ref="tajmiArseDastgahRef"
        />
      </fit>

      <div class="q-ma-sm">
        <nosazi-code-input
          label="تجمیع شده به کد نوسازی"
          label-width="120px"
          v-model="baseNosaziCode"
          @focus="nosaziCodeEvent"
          :actions="false"
        />
      </div>
      <template v-slot:footer>
        <btn-save
          @click="saveObj"
          label="تجمیع"
          spCaption="تجمیع"
          spId="d4fd4800-7ab1-4a42-acbf-8884d3eebf0e"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تجمیع عرصه - دستگاه",
      formKey: "87f03001-54b8-441c-a994-d38d33a19649",
      name: "TajmiArseDastgah",
      main: true,
      sidebarCompatible: true,

      selectedRow: {},
      tajmiList: [],
      ParentNosaziCode: {
        EumNosaziCodeObjType: 0,
        EumNosaziCodeGroup: 0,
        EumBaseInfoGroup: 0,
        EumRevisitGroup: 0,
        NidBase: "00000000-0000-0000-0000-000000000000",
        NidNosaziCode: "00000000-0000-0000-0000-000000000000",
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      tajmiRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0,
        CI_City: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        EumNosaziCodeObjType: 0,
        EumRevisitGroup: 0,
        IsRoot: false,
        NidBase: "00000000-0000-0000-0000-000000000000",
        NidNosaziCode: "00000000-0000-0000-0000-000000000000"
      },
      baseLibResults: { MainObj: {} },
      baseLibResult: null,
      fromCodeListStr: "",
      fromCodeList: []
    }
  },

  methods: {
    keyDownOnCell (e) {
      this.selectedRow = e.data
      if (e.event.keyCode === 13) {
        if (
          e.data.District === "" ||
          e.data.District === 0
          // e.data.Region === "" ||
          // e.data.Block === "" ||
          // e.data.House === "" ||
          // e.data.Building === "" ||
          // e.data.Apartment === "" ||
          // e.data.Shop === ""
        ) {
          this.showError("کد نوسازی وارد شده معتبر نمی باشد.")
        } else this.getBaseLibInNosaziCode()
      }
    },
    getBaseLibInNosaziCode () {
      let self = this
      const payload = {
        pNosaziCode: {
          Apartment: this.selectedRow.Apartment,
          Block: this.selectedRow.Block,
          Building: this.selectedRow.Building,
          CI_City: 0,
          District: this.selectedRow.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.selectedRow.House,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.selectedRow.Region,
          Shop: this.selectedRow.Shop
        },
        pLoadFunc: "ChildTree",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payload, {
        config: { District: payload.pNosaziCode.District }
      })
        .then(async ({ data }) => {
          self.baseLibResult = this.getResponse(data)
          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data
            let eumNosaziCodeObjType =
              self.baseLibResults.MainObj.EumNosaziCodeObjType
            if (eumNosaziCodeObjType === 2) {
              self.baseLibResults.ParentTree.forEach((element) => {
                if (element.EumNosaziCodeObjType === 1) {
                  this.ParentNosaziCode = {
                    EumNosaziCodeObjType: element.EumNosaziCodeObjType,
                    EumNosaziCodeGroup: element.EumNosaziCodeGroup,
                    EumBaseInfoGroup: element.EumBaseInfoGroup,
                    EumRevisitGroup: element.EumRevisitGroup,
                    NidBase: element.NidBase,
                    NidNosaziCode: element.NidNosaziCode,
                    District: element.District,
                    Region: element.Region,
                    Block: element.Block,
                    House: element.House,
                    Building: element.Building,
                    Apartment: element.Apartment,
                    Shop: element.Shop
                  }
                }
              })
              this.baseNosaziCode.District =
                self.baseLibResults.MainObj.District
              this.baseNosaziCode.Region = self.baseLibResults.MainObj.Region
              this.baseNosaziCode.Block = self.baseLibResults.MainObj.Block
            } else if (eumNosaziCodeObjType === 5) {
              self.baseLibResults.ParentTree.forEach((element) => {
                if (element.EumNosaziCodeObjType === 2) {
                  this.ParentNosaziCode = {
                    EumNosaziCodeObjType: element.EumNosaziCodeObjType,
                    EumNosaziCodeGroup: element.EumNosaziCodeGroup,
                    EumBaseInfoGroup: element.EumBaseInfoGroup,
                    EumRevisitGroup: element.EumRevisitGroup,
                    NidBase: element.NidBase,
                    NidNosaziCode: element.NidNosaziCode,
                    District: element.District,
                    Region: element.Region,
                    Block: element.Block,
                    House: element.House,
                    Building: element.Building,
                    Apartment: element.Apartment,
                    Shop: element.Shop
                  }
                }
              })
              this.baseNosaziCode.District =
                self.baseLibResults.MainObj.District
              this.baseNosaziCode.Region = self.baseLibResults.MainObj.Region
              this.baseNosaziCode.Block = self.baseLibResults.MainObj.Block
              this.baseNosaziCode.House = self.baseLibResults.MainObj.House
            }
            this.fromCodeList.push({
              NidNosaziCode: self.baseLibResults.MainObj.NidNosaziCode,
              CI_City: self.baseLibResults.MainObj.CI_City,
              District: self.baseLibResults.MainObj.District,
              Region: self.baseLibResults.MainObj.Region,
              Block: self.baseLibResults.MainObj.Block,
              House: self.baseLibResults.MainObj.House,
              Building: self.baseLibResults.MainObj.Building,
              Apartment: self.baseLibResults.MainObj.Apartment,
              Shop: self.baseLibResults.MainObj.Shop,
              EumNosaziCodeGroup:
                self.baseLibResults.MainObj.EumNosaziCodeGroup,
              NidBase: self.baseLibResults.MainObj.NidBase,
              EumBaseInfoGroup: self.baseLibResults.MainObj.EumBaseInfoGroup,
              EumNosaziCodeObjType:
                self.baseLibResults.MainObj.EumNosaziCodeObjType,
              NidRevisit: self.baseLibResults.MainObj.NidRevisit,
              EumRevisitGroup: self.baseLibResults.MainObj.EumRevisitGroup
            })
            this.selectedRow.CI_City = self.baseLibResults.MainObj.CI_City
            if (self.baseLibResults.ChildTree.length > 0) {
              let tmpChildTree = self.baseLibResults.ChildTree.find(
                (c) =>
                  c.CI_City === Number(this.selectedRow.CI_City) &&
                  c.District === Number(this.selectedRow.District) &&
                  c.Region === Number(this.selectedRow.Region) &&
                  c.Block === Number(this.selectedRow.Block) &&
                  c.House === Number(this.selectedRow.House) &&
                  c.Building === Number(this.selectedRow.Building) &&
                  c.Apartment === Number(this.selectedRow.Apartment) &&
                  c.Shop === Number(this.selectedRow.Shop)
              )
              if (tmpChildTree) {
                this.selectedRow.NidNosaziCode = tmpChildTree.NidNosaziCode
                this.selectedRow.NidBase = tmpChildTree.NidBase
                this.selectedRow.NidNosaziCodeParent =
                  tmpChildTree.NidNosaziCodeParent
                this.selectedRow.NidRevisit = tmpChildTree.NidRevisit
                this.selectedRow.Id = tmpChildTree.Id
                this.selectedRow.ParentId = tmpChildTree.ParentId
                this.selectedRow.NidUser = tmpChildTree.NidUser
                this.selectedRow.UserName = tmpChildTree.UserName
                this.selectedRow.EumRevisitGroup = tmpChildTree.EumRevisitGroup
                this.selectedRow.EumRevisitGroup =
                  tmpChildTree.EumNosaziCodeObjType
                this.selectedRow.EumRevisitGroup =
                  tmpChildTree.EumNosaziCodeGroup
                this.selectedRow.EumBaseInfoGroup =
                  tmpChildTree.EumBaseInfoGroup
              }
            }

            this.fromCodeListStr += this.baseLibResults._NidNosaziCode + ","
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
    nosaziCodeEvent () {
      this.baseNosaziCode = {
        ...this.baseNosaziCode,
        District: this.selectedRow.District,
        Region: this.selectedRow.Region,
        Block: this.selectedRow.Block
      }
    },
    saveObj () {
      if (this.baseNosaziCode.District === 0) {
        return this.showError("کدنوسازی  مقصد معتبر نمی باشد.")
      }
      if (this.tajmiList.length === 0) {
        return this.showError("لیست موارد تجمیع را وارد کنید.")
      }

      this.showLoading()
      const payload = {
        pFromCodeList: this.fromCodeListStr.substring(
          0,
          this.fromCodeListStr.length - 1
        ),
        pToCode: "00000000-0000-0000-0000-000000000000",
        pToNoaziCode: {
          District: this.baseNosaziCode.District,
          Region: this.baseNosaziCode.Region,
          Block: this.baseNosaziCode.Block,
          House: this.baseNosaziCode.House,
          Building: this.baseNosaziCode.Building,
          Apartment: this.baseNosaziCode.Apartment,
          Shop: this.baseNosaziCode.Shop,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType:
            this.ParentNosaziCode.EumNosaziCodeObjType === 1
              ? 2
              : this.ParentNosaziCode.EumNosaziCodeObjType === 2
                ? 5
                : 0,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000"
        },
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PFromNosaziCodeList: this.fromCodeList,
        ParentNosaziCode: this.ParentNosaziCode
      }
      this.$services.SC.tajmi(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.tajmiRes = this.getResponse(data)

          if (this.tajmiRes.success) {
            // console.log("this.tajmiRes.data :>> ", this.TajmiResult.data)
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.selectedRow
            )
            this.showSuccess(
              `تجمیع کد نوسازی ${strNosaziCode} با موفقیت انجام شد.`
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              saveDesc: `تجمیع کد نوسازی ${strNosaziCode} با موفقیت انجام شد.`
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
    }
  }
}
</script>
