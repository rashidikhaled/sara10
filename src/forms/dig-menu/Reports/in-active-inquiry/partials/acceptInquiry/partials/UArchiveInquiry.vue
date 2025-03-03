<template>
  <form-wrapper :title="title">
    <template #header>
      <safa-status :result="loadObjRes2" />
      <safa-status :result="loadObjRes1" />
    </template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="کد ارجاع"
            label-width="80px"
            v-model="nidWorkItem"
            m="r"
            @keypress.enter="loadObj2"
          />
        </FormControl>
        <div>
          <btn-search label="جستجو" @click="loadObj2" :disabled="true" />
        </div>
      </FormRow>
      <div class="fit">
        <ArchiveWrap
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
          :bizCode="archiveBizCode"
        />
      </div>
    </fit>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "../../../../../../../kartable/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  props: {
    selectedItem: Object
  },

  data () {
    return {
      title: "آرشیو",
      main: true,

      nidWorkItem: "",
      loadObjRes2: null,
      loadObjRes1: null,
      archiveBizCode: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  computed: {
    archiveConfig () {
      return window.getConfigValue("archiveCore")
    }
  },
  mounted () {
    this.nidWorkItem = this.selectedItem.NIdWorkItem
    this.loadObj1()
  },
  methods: {
    async loadObj1 () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getRequestInfoWithNidProc({
            pRequest: { NidProc: this.selectedItem.NIdProc }
          })
        this.loadObjRes1 = this.getResponse(data)
        if (this.loadObjRes1.success) {
          debugger
          this.baseNosaziCode = convertStringToNosaziCodeObject(
            this.loadObjRes1.data.GetGetRequest_InfoWithNidProcResult
              .ClsRequest_Info.Request_Info.CodeString
          )
          this.loadObj2()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    loadObj2 () {
      this.showLoading()
      const payload = {
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
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(payload)
        .then(({ data }) => {
          this.loadObjRes2 = this.getResponse(data)
          if (this.loadObjRes2.success) {
            debugger
            this.baseLibResults = this.loadObjRes2.data
            if (this.baseLibResults.ArchiveWrapper) {
              this.updateArchiveBizCode(
                this.baseLibResults.ArchiveWrapper.BizCode
              )
            }
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

    updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    }
  }
}
</script>
