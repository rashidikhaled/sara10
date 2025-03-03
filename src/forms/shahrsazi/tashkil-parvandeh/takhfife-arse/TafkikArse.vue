<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      title="تفکیک عرصه"
      vertical
    >
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetched"
          :pLoadFunc="pLoadFunc"
        />
        <safa-status :result="result" />
        <safa-status :result="baseLibResult" />
      </template>
      <div class="row col-sm-auto q-mb-sm">
        <safa-text
          label="به چند کد تفکیک شود"
          v-model="sections"
        >
        </safa-text>
      </div>
      <internal-section class-name="fit">
        <safa-label class="lbl">ساختار درختی</safa-label>
        <div class="custom-scroll">
          <div class="q-px-sm">
            <q-tree
              ref="tree"
              default-expand-all
              selected-color="primary"
              node-key="nosaziCodeString"
              :nodes="nosaziCodeTrees"
            >
            </q-tree>
          </div>
        </div>
      </internal-section>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-default
            @click="tafkik"
            label="تفکیک"
            spId="6ca0b2d9-745e-4c1a-a13e-67c96ae13a8e"
            spCaption="تفکیک"
          />
          <btn-cancel
            @click="cancel"
            label="خروج"
          />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  route: "/tafkik-arse",
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: "شهرسازی- تفکیک عرصه",
      formKey: "4e19d3ea-c316-40ef-b55c-507677656bc9",
      name: "TafkikArse",
      main: true,
      sections: null,
      ownerName: "",
      oldNosaziCode: "",
      nosaziCode: "",
      pLoadFunc:
        "ChildTree,Base_AddressInfo,Base_OwnerBase_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      results: {},
      result: null,
      baseLibResult: null,
      baseLibResults: {
        HouseObj: {},
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: [],
        BuildingObj: {}
      },
      nosaziCodeTrees: [],
      treeChildResult: null,
      treeChildResults: {},
      tabs: [
        {
          name: "tree",
          label: "ساختار درختی",
          persist: true
        }
      ],
      currentTab: "tree"
    }
  },
  props: {
    enabled: {
      type: String,
      default: "1-1-1-1-0-0-0"
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.handleBaseNosaziCodeChanged2()
    }
  },
  methods: {
    cancel () {
      this.$store.dispatch("kartable/clearKartableState")
      this.hideSidebar("TafkikArse")
    },
    handleBaseNosaziCodeChanged2 () {
      this.getBaseLibInNosaziCode()
    },
    fetched (value) {
      this.baseLibResults = value
      this.nosaziCodeTrees = this.createNosaziCodeTree(
        this.baseLibResults.ChildTree
      )
    },

    tafkik () {
      this.showConfirm("آیا از تفکیک کد نوسازی اطمینان دارید؟").onOk(() => {
        this.showLoading()
        let data = {
          pFromCode: this.baseLibResults.HouseObj.NidNosaziCode,
          pTafkikCount: this.sections,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        }
        this.$services.SC.tafkik(data)
          .then(async ({ data }) => {
            this.tafkikResult = this.getResponse(data)

            if (this.tafkikResult.success) {
              this.tafkikResults = this.tafkikResult.data

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )

              await this.log({
                action: this.logActions.save,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی"
              })

              this.showSuccess("تفکیک با موفقیت انجام شد")
            } else {
              this.showError("خطایی رخ داده است")
            }
          })
          .catch(response => {
            this.tafkikResult = this.getResponse(response)
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
