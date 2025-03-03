<template>
  <fit :class="$attrs.class" class="safa-control">
    <div
      v-if="!hideHeader || actions"
      :class="[
        'flex items-center justify-between text-body6 full-width q-pa-sm q-mb-sm',
        $q.dark.isActive ? 'bg-dark text-light' : 'bg-grey-2 text-grey',
      ]"
    >
      <span class="text-primary" v-if="!hideHeader">
        {{ title }}
      </span>

      <div v-if="actions" class="q-gutter-x-sm">
        <q-icon
          size="xs"
          :disabled="m === 'r'"
          class="cursor-pointer"
          color="primary"
          title="افزودن"
          name="add"
          @click="addNewItemHandler"
        />
        <q-icon
          size="xs"
          :disabled="m === 'r'"
          class="cursor-pointer"
          color="primary"
          title="حذف"
          name="clear"
          @click="deleteItemHandler"
        />
        <q-icon
          size="xs"
          :disabled="m === 'r'"
          class="cursor-pointer"
          color="primary"
          title="ویرایش"
          name="edit"
          @click="editItemHandler"
        />
      </div>
    </div>
    <div class="custom-scroll" v-if="items && items.length > 0">
      <q-list bordered separator class="full-height">
        <q-intersection
          v-for="(item, index) in items"
          :key="index"
          transition="fade"
          once
        >
          <q-item
            @click="selectItemHandler(item)"
            clickable
            v-ripple
            :title="item[titleField]"
          >
            <q-item-label style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
              <q-icon
                name="text_snippet"
                color="green"
                size="sm"
                class="q-mr-sm"
              />&nbsp;{{ item[titleField] }}
            </q-item-label>
          </q-item>
        </q-intersection>
      </q-list>
    </div>
    <div
      :class="[
        'fit flex items-center justify-center text-body6 ',
        $q.dark.isActive ? 'text-light' : 'text-grey',
      ]"
      v-else
    >
      <q-icon color="gray" name="warning" size="xs" />&nbsp; اطلاعاتی جهت نمایش
      وجود ندارد.
    </div>
  </fit>
</template>

<script>
export default {
  name: "safa-list",
  data () {
    return {
      selectItem: null
    }
  },
  props: {
    actions: {
      type: Boolean,
      default: true
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      // required: true,
      default: ""
    },
    m: {
      type: String,
      default: "e"
    },
    titleField: {
      type: String,
      default: "Title" // CITableNameTitle
    },
    valueField: {
      type: String,
      default: "ID"
    },
    items: {
      type: Array
    }
  },
  computed: {},
  methods: {
    selectItemHandler (item) {
      this.selectItem = item
      this.$emit("selectItem", item)
    },
    addNewItemHandler () {
      this.$emit("addNewItem")
    },
    deleteItemHandler () {
      if (this.selectItem !== null) {
        this.showConfirm("آیا از حذف کامل آیتم انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.$emit("deleteItem", this.selectItem)
            console.log("delete this.selectItem")
          }
        )
      } else {
        this.showError("لطفا یک مورد از لیست را برای حذف انتخاب نمایید.")
      }
    },
    editItemHandler () {
      if (this.selectItem !== null) {
        this.$emit("editItem", this.selectItem)
      } else {
        this.showError("لطفا یک مورد از لیست را برای ویرایش انتخاب نمایید.")
      }
    }
  }
}
</script>
