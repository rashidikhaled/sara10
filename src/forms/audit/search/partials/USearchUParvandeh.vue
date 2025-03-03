<template>
  <!-- a master component -->
  <fit>
    <component
      :is="activeComponent.name"
      :formKey="formKey"
      :title="title"
      :name="name"
      :houseTreeContainer="houseTreeContainer"
      v-bind="activeComponent.props"
      @blockNodeDblClick="blockNodeDblClick"
      @treeInfoNodeDblClick="treeInfoNodeDblClick"
      @auditInfoHouseDblClick="auditInfoHouseDblClick"
      ref="innerChild"
    />
  </fit>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"

// Components
import USearchUBlock from "./USearchUBlock.vue"
import USearchUTreeInfo from "./USearchUTreeInfo.vue"

// Helpers
import { ClsEnumEumNosaziCodeObjType } from "src/forms/audit/config/enums"

export default {
  name: "UParvandeh",

  components: { USearchUBlock, USearchUTreeInfo },

  mixins: [baseFormMixin],

  props: {
    formKey: String,
    title: String,
    name: String,
    params: Object,
    activeHouseTreeContainer: Object
  },

  data () {
    return {
      // Context
      tmpNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      activeComponent: {},
      houseTreeContainer: {}
    }
  },

  computed: {},

  methods: {
    loadObj () {
      const self = this

      if (this.params.District && this.params.Region && this.params.Block) {
        Object.assign(this.tmpNosaziCode, {
          District: this.params.District,
          Region: this.params.Region,
          Block: this.params.Block
        })
      }

      if (this.params.IsBlock) {
        this.activeComponent.name = "USearchUBlock"
        this.activeComponent.props = {
          houseTreeContainer: this.houseTreeContainer,
          params: {
            District: this.tmpNosaziCode.District,
            Region: this.tmpNosaziCode.Region,
            Block: this.tmpNosaziCode.Block,
            IsLoadedFromMenu: this.params.IsLoadedFromMenu
          }
        }

        this.$forceUpdate()

        this.$nextTick(() => {
          self.$refs.innerChild.loadObj()
        })
      } else if (!this.params.IsBlock && this.params.Apartment) {
        this.showApartments()
      }
      if (
        this.activeHouseTreeContainer &&
        Object.keys(this.activeHouseTreeContainer).length > 0
      ) {
        this.houseTreeContainer = this.activeHouseTreeContainer
      }
      if (this.params?.IsConfirmations) {
        this.activeComponent.name = "USearchUTreeInfo"
        this.activeComponent.props = { params: this.params }

        this.$forceUpdate()

        this.$nextTick(() => {
          self.$refs.innerChild.loadObj()
        })
      }
    },

    blockNodeDblClick ({ node, houseTreeContainer }) {
      const self = this

      if (houseTreeContainer) this.houseTreeContainer = houseTreeContainer

      if (
        `${this.tmpNosaziCode.District}-${this.tmpNosaziCode.Region}-${this.tmpNosaziCode.Block}-0-0-0-0` ===
        String(node.Tag)
      ) {
        return
      }

      this.activeComponent.name = "USearchUTreeInfo"
      this.activeComponent.props = {
        houseTreeContainer: this.houseTreeContainer,
        params: {
          NosaziCode_House: node.Tag.NosaziCodestr,
          IsLoadedFromMenu: this.params.IsLoadedFromMenu,
          ObjType: ClsEnumEumNosaziCodeObjType.House.value,
          EumRevisit: node.Tag.EumRequiredRevisit,
          NidBase: node.Tag.NidBase
        }
      }

      this.$forceUpdate()

      this.$nextTick(() => {
        self.$refs.innerChild.loadObj()
      })
    },

    treeInfoNodeDblClick (params) {
      const self = this
      this.showLoading()

      this.activeComponent.name = "USearchUBlock"
      this.activeComponent.props = {
        houseTreeContainer: this.houseTreeContainer,
        params
      }

      this.$forceUpdate()

      this.$nextTick(() => {
        self.$refs.innerChild.loadObj()
      })
    },

    auditInfoHouseDblClick (params) {
      const self = this

      this.showLoading()
      this.activeComponent.name = "USearchUTreeInfo"
      this.activeComponent.props = {
        houseTreeContainer: this.houseTreeContainer,
        params
      }

      this.$forceUpdate()

      this.$nextTick(() => {
        self.$refs.innerChild.loadObj()
      })
    },

    showApartments () {
      const self = this

      this.showLoading()

      this.activeComponent.name = "USearchUTreeInfo"
      this.activeComponent.props = {
        houseTreeContainer: this.houseTreeContainer,
        params: {
          NosaziCode_House: this.params.Apartment.NosaziodeC_House,
          NidBase: this.params.Apartment.NidBase,
          NosaziCode: this.params.Apartment.NosaziCode,
          IsLoadedFromMenu: this.params.IsLoadedFromMenu
        }
      }

      this.$forceUpdate()

      this.$nextTick(() => {
        self.$refs.innerChild.loadObj()
      })
    }
  },

  mounted () {
    this.loadObj()
  }
}
</script>
