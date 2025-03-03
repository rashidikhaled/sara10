<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :title="title" vertical>
      <safa-status :result="requestResult" />
      <safa-status :result="getArchiveWrapperRes" />
      <safa-status :result="result" />

      <template v-slot:header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="handleBaseNosaziCodeChanged"
        />
      </template>

      <internal-section>
        <div class="row q-col-gutter-lg">
          <safa-combo
            v-model="selectedArchiveGrp"
            cdcName="selectedArchiveGrp"
            ciName="CI_ArchiveGroup"
            class="col-12 col-md-4"
            domainName="CI_SaraM1"
            label="گروه آرشیو"
          />
          <safa-text
            v-model="baseLibResults.ArchiveWrapper.BizCode"
            cdcName="BizCode"
            class="col-12 col-md-4"
            label="کلید آرشیو"
          />
          <safa-text
            v-model="baseLibResults.Base_RegisterPlack_Str"
            cdcName="Base_RegisterPlack_Str"
            class="col-12 col-md-4"
            label="پلاک ثبتی"
          />
        </div>
      </internal-section>
      <safa-splitter v-model="splitterModel" vertical>
        <template v-slot:before>
          <!-- <div class="custom-scroll"> -->
          <fit>
            <q-tree
              ref="tree"
              :nodes="nosaziCodeTrees"
              :selected.sync="selectedNosaziCode"
              class="bordered"
              default-expand-all
              label-key="label"
              node-key="key"
              selected-color="primary"
              @update:selected="selectedNosaziCodeChanged"
            >
              <template v-slot:default-header="{ node }">
                <div
                  class="row items-center"
                  @dblclick.stop="handleTreeDblClick(node)"
                >
                  <q-icon :name="node.icon" class="q-mr-sm" size="21px" />
                  <div>{{ node.label }}</div>
                </div>
              </template>
            </q-tree>
          </fit>
          <!-- </div> -->
        </template>
        <template v-slot:after>
          <div v-if="archiveConfig && archiveConfig.username" class="fit">
            <ArchiveWrap
              v-if="showArchive"
              :name="archiveConfig.username"
              :pass="archiveConfig.password"
              :biz-code="archiveBizCode"
            ></ArchiveWrap>
          </div>
        </template>
      </safa-splitter>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"

export default {
  route: "/archive/ArchivElectronic",

  mixins: [baseFormMixin],
  components: {
    // FormActions,
  },

  data () {
    return {
      title: "آرشیو الکترونیکی (با درختواره)",
      formKey: "63146686-2594-4138-94f6-6cbc4968d8ea",
      name: "ArchivElectronicWithTree",
      main: true,

      archiveBizCode: "",
      showArchive: false,
      sidebarCompatible: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedArchiveGrp: null,
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {}
      },
      resourcePermissionResult: null,
      getArchiveWrapperRes: null,
      resourceResult: null,
      ciResult: null,
      ciArchiveGroup: [],
      splitterModel: 20,
      treeChildList: {},
      result: null,
      nosaziCodeTrees: [],
      childTree: [],
      selectedNosaziCode: "0-0-0-0-0-0-0",
      selectedNosaziCodeFallBak: null
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
      // eslint-disable-next-line no-undef
      // console.log(archiveStore)
    },
    async handleBaseNosaziCodeChanged () {
      // getBaseLibInNosaziCode method
      this.showLoading()
      this.ownerName = ""
      this.oldNosaziCode = ""
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
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      try {
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payload,
          { config: { District: this.baseNosaziCode.District } }
        )
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.baseLibResults = this.requestResult.data
          if (this.baseLibResults.ArchiveWrapper) {
            this.selectedArchiveGrp =
              this.baseLibResults.ArchiveWrapper.CI_ArchiveGroup
          }
          this.updateArchiveBizCode(this.baseLibResults.ArchiveWrapper.BizCode)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
      this.isEditable = true
      this.isSearch = true
    },

    // handelChangeCmb
    async getArchiveWrapper () {
      this.showLoading()
      const payload = {
        pNidNosaziCode: this.baseLibResults.ArchiveWrapper.NidNosaziCode,
        pCI_ArchiveGroup: this.selectedArchiveGrp
      }
      try {
        const { data } = await this.$services.SA.getArchiveWrapper(payload, { config: { District: this.baseNosaziCode.District } })
        this.getArchiveWrapperRes = this.getResponse(data)
        if (this.getArchiveWrapperRes.success) {
          this.getNosaziCodeTreeChild()
          this.updateArchiveBizCode(this.getArchiveWrapperRes.data.ArchiveWrapper.BizCode)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            nosaziCode: strNosaziCode,
            bizCodeArchive: this.getArchiveWrapperRes.data.ArchiveWrapper.BizCode,
            bizCodeTitle: "کد نوسازی"
          })
          this.showArchive = true
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async getNosaziCodeTreeChild () {
      this.showLoading()
      this.showArchive = false
      setTimeout(() => {
        this.showArchive = true
        this.hideLoading()
      }, 1000)
      this.nosaziCodeTrees = []
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
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      try {
        const { data } = await this.$services.SA.getNosaziCodeTreeChild(
          payload,
          { config: { District: this.baseNosaziCode.District } }
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          // this.treeChildList = this.result.data
          this.childTree = this.result.data["ChildTree"] || []
          const isValid = !!this.childTree.length
          if (isValid) {
            this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree)
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              nosaziCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          } else {
            this.showError("کد نوسازی معتبر نمیباشد")
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
        this.$nextTick(() => {
          if (this.$refs.tree) {
            this.$refs.tree.expandAll()
          }
        })
      }
    },
    selectedNosaziCodeChanged (e) {
      if (e) {
        this.selectedNosaziCode = e
        const nosaziObj = convertStringToNosaziCodeObject(e)
        this.baseNosaziCode = {
          ...this.baseNosaziCode,
          District: nosaziObj.District,
          Region: nosaziObj.Region,
          Block: nosaziObj.Block,
          House: nosaziObj.House,
          Building: nosaziObj.Building,
          Apartment: nosaziObj.Apartment,
          Shop: nosaziObj.Shop
        }
        this.selectedNosaziCodeFallBak = e
      } else {
        this.selectedNosaziCode = this.selectedNosaziCodeFallBak
      }
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore")
    }
  },
  watch: {
    selectedArchiveGrp () {
      this.getArchiveWrapper()
    },
    selectedNosaziCode () {
      this.handleBaseNosaziCodeChanged()
    }
  },
  mounted () {
    // this.getUserResourcePermissions()
    // this.getCiArciveType()
  }
}
</script>
