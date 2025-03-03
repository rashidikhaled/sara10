<template>
  <safa-form :id="formKey" :caption="title">
    <form-wrapper :title="title">
      <!-- <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetched"
        />
      </template> -->
      <fit>
        <FormRow class="q-mb-sm">
          <nosazi-code-input
            v-model="baseNosaziCode"
            label="کد نوسازی"
            label-width="65px"
            cdcName="baseNosaziCode"
            class="col"
            @enter="loadData"
          />
        </FormRow>
        <div class="q-pb-sm">
          <q-toolbar
            :class="[
              'items-center q-px-sm q-py-xs',
              $q.dark.isActive ? 'bg-dark' : 'bg-grey-3'
            ]"
            style="min-height: 34px; border-radius: 3px"
          >
            <q-toolbar-title class="text-body2">ساختار درختی</q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="fit custom-scroll">
          <q-tree
            :nodes="nosaziCodeTrees"
            class="bordered"
            default-expand-all
            selected-color="primary"
            node-key="key"
            accordion
            label-key="label"
            :selected.sync="selectNosaziCode"
            ref="tree"
            @update:selected="selectedNosaziCodeChanged"
          >
            <template v-slot:default-header="{ node }">
              <div
                class="row items-center"
                @dblclick.stop="handleTreeDblClick(node)"
              >
                <q-icon :name="node.icon" size="21px" class="q-mr-sm" />
                <div>{{ node.label }}</div>
              </div>
            </template>
          </q-tree>
        </div>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    name: String,
    title: String,
    formKey: String
  },

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
      nosaziCodeTrees: [],
      childTree: null,
      selectNosaziCode: "0-0-0-0-0-0-0"
    }
  },

  mounted () {
    this.baseNosaziCode = this.value
    this.loadData()
  },

  methods: {
    async loadData () {
      try {
        this.showLoading()
        this.nosaziCodeTrees = []
        const strNosaziCode = convertNosaziCodeObjectToString(
          this.baseNosaziCode
        )
        const { data } = await this.$services.FireService.getChildrenHasAnyJob({
          pNosaziCode: strNosaziCode
        })
        if (data.ErrorResult.BizErrors.length === 0) {
          this.childTree = data["ChildrenHasAnyJob"] || []
          const isValid = !!this.childTree.length
          if (isValid) {
            this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree) // this.createTree(this.childTree);
          }
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })
        } else this.showError(data.ErrorResult.BizErrors[0])
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    // createTree(list) {
    //   let roots = list.map((y) => {
    //     return {
    //       ...y,
    //       label: convertNosaziCodeObjectToString(y),
    //       header: "root",
    //     };
    //   });
    //   // .filter((x) => x.ParentId === 0)
    //   const cleanList = list
    //     .map((z) => {
    //       return {
    //         ...z,
    //         label: convertNosaziCodeObjectToString(z),
    //         header: "generic",
    //       };
    //     })
    //     .filter((x) => x.ParentId > 0);
    //   if (roots) {
    //     let tree = [];
    //     roots.forEach((root) => {
    //       let node = {
    //         ...root,
    //         children: this.getChildren(cleanList, root),
    //       };
    //       tree.push(node);
    //     });
    //     return tree;
    //   }
    //   return [];
    // },
    // getChildren(list, parent) {
    //   return list.map((x) => ({ ...x, children: this.getChildren(list, x) }));
    // },

    selectedNosaziCodeChanged (e) {
      if (e) {
        this.selectNosaziCode = e
      }
    },

    handleTreeDblClick (node) {
      const baseNosaziCode = convertNosaziCodeObjectToString(node)
      this.$emit("changeBaseNosaziCode", baseNosaziCode)
    },

    handleInutNosazicode () {
      this.loadData()
    }
  }
}
</script>
