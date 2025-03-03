<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      vertical
      title="تغییر کد نوسازی در بلوک"
    >
      <template #header>
        <formHeaderByNosaziCode
          :taskInfo="taskInfo"
          v-model="baseNosaziCode"
          @enter="getBaseLibInNosaziCode"
          enabled="1-1-1-0-0-0-0"
        />
      </template>
      <safa-status :result="changeNosaziCodeResult" />
      <div class="row q-col-gutter-sm q-mb-sm">
        <safa-combo
          class="col-12 col-sm-4 col-md-3"
          input-debounce="0"
          label="نوع دسته اطلاعاتی"
          sourceType="local"
          :options="infoGroup"
          v-model="getBaseLibPrequest.pNosaziCode.EumNosaziCodeGroup"
        ></safa-combo>
        <div class="col-auto">
          <btn-edit
            spId="99a5ec2b-06ea-47c6-8c76-defad7a995c7"
            spCaption="تغییر"
            label="تغییر کد نوسازی"
            @click="changeNosaziCode"
          />
        </div>
      </div>
      <safa-datatable
        v-model="originAndDestinationCodeItems"
        ref="grid"
        name="grid"
        helper="shahrsazi.originAndDestinationCode"
        fit
        max-height="100%"
        height="100%"
        min-height="100px"
        :hideHeader="true"
        m="e"
        title="تغییر کد نوسازی در بلوک"
      />

    </form-wrapper>
  </safa-form>
</template>
<script>
import ChangeNosaziCodePrequest from "src/models/changeNosaziCodePrequest"
import baseFormMixin from "src/mixins/baseFormMixin"
import changeNosaziCodeInBlockPrequest from "./models/changeNosaziCodeInBlockPrequest.js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  route: "/parvandeh/change-refresh-code-in-block",
  mixins: [baseFormMixin],
  data () {
    return {
      title: "شهرسازی- تغییر کد نوسازی در بلوک",
      formKey: "b9e1cee7-4b70-4fc3-94e3-a00ae2d7563e",
      name: "UChangeRefreshCodeInBlock",
      main: true,
      infoGroup: [
        {
          ID: "0",
          Title: "تشکیل پرونده"
        },
        {
          ID: "1",
          Title: "ممیزی"
        }
      ],
      getBaseLibPrequest: {
        pNosaziCode: {},
        pLoadFunc: "ChildTree",
        pIsLoadDeletedNosaziCode: "false"
      },
      value: {
        refreshCodeArrays: [0, 0, 0, 0, 0, 0, 0]
      },
      isReadOnlyNosaziCode: ["e", "e", "e", "r", "r", "r", "r"],
      lastEnabled: 4,
      items: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      result: null,
      childTree: null,
      newChildTree: null,
      originAndDestinationCodeItems: [],
      changeNosaziCodeResult: {}
    }
  },
  methods: {
    changeNosaziCode () {
      this.showConfirm("آیا از تغییر کد نوسازی اطمینان  دارید؟").onOk(() => {
        this.$q.loading.show()
        ChangeNosaziCodePrequest.pFromNosaziCode.District = this.baseNosaziCode.District
        ChangeNosaziCodePrequest.pFromNosaziCode.Region = this.baseNosaziCode.Region
        ChangeNosaziCodePrequest.pFromNosaziCode.Block = this.baseNosaziCode.Block
        ChangeNosaziCodePrequest.pFromNosaziCode.House = this.baseNosaziCode.House
        ChangeNosaziCodePrequest.pFromNosaziCode.Building = this.baseNosaziCode.Building
        ChangeNosaziCodePrequest.pFromNosaziCode.Apartment = this.baseNosaziCode.Apartment
        ChangeNosaziCodePrequest.pFromNosaziCode.Shop = this.baseNosaziCode.Shop
        this.$services.SC.changeNosaziCodeInBlock(
          changeNosaziCodeInBlockPrequest,
          {
            config: {
              District: this.baseNosaziCode.District
            }
          }
        )
          .then(async response => {
            this.changeNosaziCodeResult = this.getResponse(response.data)
            if (this.changeNosaziCodeResult.success) {
              this.showSuccess("تغییر کد نوسازی با موفقیت انجام شد.")
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              await this.log({
                action: this.logActions.save,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: strNosaziCode
              })
            }
          })
          .catch(ex => {
            this.sverError()
          })
          .finally(this.hideLoading())
      })
    },
    getBaseLibInNosaziCode () {
      this.getBaseLibPrequest.pNosaziCode.District = this.baseNosaziCode.District
      this.getBaseLibPrequest.pNosaziCode.Region = this.baseNosaziCode.Region
      this.getBaseLibPrequest.pNosaziCode.Block = this.baseNosaziCode.Block
      this.getBaseLibPrequest.pNosaziCode.House = this.baseNosaziCode.House
      this.getBaseLibPrequest.pNosaziCode.Building = this.baseNosaziCode.Building
      this.getBaseLibPrequest.pNosaziCode.Apartment = this.baseNosaziCode.Apartment
      this.getBaseLibPrequest.pNosaziCode.Shop = this.baseNosaziCode.Shop
      this.$q.loading.show()
      this.$services.SA.getBaseLibInNosaziCode(this.getBaseLibPrequest, {
        config: {
          District: 1
        }
      })
        .then(async response => {
          this.$q.loading.hide()
          this.getBaseLibResult = this.getResponse(response.data)
          this.childTree = this.getBaseLibResult.data["ChildTree"] || []
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })
          this.initiateItems()
        })
        .catch(ex => {
          this.sverError()
        })
        .finally(this.hideLoading())
    },

    initiateItems () {
      this.originAndDestinationCodeItems = this.childTree
        .map(item => {
          return {
            orginBlock: item.Block,
            orginBuliding: item.House,
            destinationBlock: 0,
            destinationBulliding: 0,
            description: ""
          }
        })
        .sort((a, b) => {
          if (a.orginBuliding < b.orginBuliding) {
            return -1
          }
        })
    }
  }
}
</script>
