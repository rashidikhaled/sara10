<template>
  <div>
    <div
      v-if="showFilter"
      class="q-pa-sm"
    >
      <q-toolbar
        :class="['items-center q-px-sm q-py-xs', $q.dark.isActive?'bg-dark':'bg-grey-3']"
        style="min-height: 34px;border-radius: 3px;"
      >
        <q-toolbar-title class="text-body2">{{Title}}</q-toolbar-title>
        <div class="flex q-gutter-x-sm items-center">
          <safa-text
            v-model="treeFilter"
            dir="ltr"
            class="text-right"
            label="فیلتر"
          ></safa-text>
          <btn-default @click="collapseAll">جمع کردن گره ها</btn-default>
          <btn-default @click="expandAll">باز کردن گره ها</btn-default>
        </div>
      </q-toolbar>
    </div>
    <div class="custom-scroll">
      <div class="q-px-sm">
        <q-tree
          :filter="treeFilter"
          :nodes="Nodes"
          :selected.sync="selectedSync"
          @update:selected="selectedNosaziCodeChanged"
          :class="Class"
          default-expand-all
          :label-key="labelKey"
          :node-key="nodeKey"
          :ref="Ref"
          accordion
          :selected-color="selectedColor"
          @dblclick.native="handleTreeDblClick"
        >
          <template v-slot:default-header="{ node }">
            <div
              @dblclick.stop="handleTreeDblClick(node)"
              @click="setExpanded(item)"
              class="flex items-center tree-item"
            >
              <q-icon
                :name="node.icon"
                size="21px"
                class="q-ml-sm"
              />
              <div class="q-mx-sm">{{ node.label }}</div>
              <!-- <q-btn
                icon="pageview"
                class="show-when-hover"
                size="sm"
                color="primary"
                dense
                round
                flat
                title="مشاهده جزئیات"
                @click="handleTreeDblClick(node)"
              ></q-btn> -->
            </div>
          </template>
        </q-tree>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'SafaTree',
      title: 'ساختار درختی خودم',
      item: '',
      node: ''
    }
  },
  mounted () {
    console.log(this.selectedSync, 'aaa')
  },
  props: {
    Title: {
      type: String,
      default: 'ساختار درختی'
    },
    Class: {
      type: String,
      default: 'bordered'
    },
    Nodes: Array,
    selectedSync: String,
    defaultExpandAll: Boolean,
    labelKey: {
      type: String,
      default: 'label'
    },
    nodeKey: {
      type: String
    },
    Ref: {
      type: String,
      default: 'tree'
    },
    selectedColor: {
      type: String,
      default: ' primary'
    },
    showFilter: {
      type: Boolean,
      default: true
    },
    treeFilter: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateSelected () {
      this.$emit('update')
    },
    // TreeDblClick () {
    //   this.$emit('dbclickNative')
    // },
    collapseAll () {
      this.$emit('collapseAll')
    },
    expandAll () {
      this.$emit('expandAll')
    },
    setExpanded () {
      this.$emit('setExpanded', this.item)
    },
    handleTreeDblClick () {
      this.$emit('handleTreeDblClick', this.node)
    }
  }
}
</script>
