<template>
  <div class="thumbnail-section q-pa-sm">
    <div class="search-wrapper q-mb-md" v-if="searchFunc">
      <div class="searchbox flex items-center">
        <input placeholder="جستجو ..." type="text" v-model="searchTerm" ref="input" />
        <transition name="fade"><q-icon @click="searchTerm=''" class="s-close cursor-pointer" v-show="searchTerm.trim().length>0" name="close" size="22px"/></transition>
        <q-icon class="s-search" name="search" size="22px"/>
      </div>
    </div>
    <div class="thumbnail-items">
      <div class="q-gutter-md row">
        <div @click="$emit('select', item)" class="thumbnail-item col-auto column items-center justify-center" v-for="(item,index) in filteredItems" :key="index">
          <div class="th-icon">
            <slot name="icon" :item="item">
              <q-icon :name="getIcon(item)" v-if="getIcon(item)" :color="iconColor" />
            </slot>
          </div>
          <div class="th-title">
            {{getTitle(item)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowThumbnails',
  props: {
    items: [Array, Object],
    titleFieldName: String,
    iconFieldName: String,
    iconColor: {
      type: String,
      default: 'primary'
    },
    searchFunc: Function
  },
  data () {
    return {
      searchTerm: ''
    }
  },
  computed: {
    filteredItems () {
      if (!this.searchTerm || !this.searchFunc) return this.items
      return this.searchFunc(this.items && this.items.map(x => {
        return {
          ...x,
          [this.titleFieldName]: x[this.titleFieldName].normalizeText()
        }
      }), this.searchTerm.normalizeText())
    }
  },
  methods: {
    getTitle (item) {
      return item[this.titleFieldName].normalizeText() || ''
    },
    getIcon (item) {
      return item[this.iconFieldName] || ''
    }
  }
}
</script>

<style scoped lang="scss">
  .thumbnail-item {
    padding: 10px 5px 0;
    background-color: rgba(255,255,255,.8);
    transition: .2s all ease;
    width: 90px;
    height: 80px;
    font-size: 11px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    flex-wrap: nowrap;

    body.body--dark & {
      background-color: var(--dark);
      border-color: var(--dark-border);
    }

    &:hover {
      background-color: #fff;
      border-color: var(--q-color-primary);
      transition: .2s all ease;

      body.body--dark & {
        background-color: var(--dark);
        border-color: var(--dark-border);
      }
    }

    .th-icon {
      display: block;
      width: 100%;
    }

    .th-title {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 40px;
      width: 100%;
      margin-top: 5px;
    }
  }

  .search-wrapper {
    .searchbox {
      position: relative;
      border: 1px solid #bbb;
      border-radius: 3px;
      background: #fff;
      padding: 4px;

      body.body--dark & {
        background-color: var(--dark);
        border-color: var(--dark-border);
      }

      input {
        flex-grow: 1;
        background-color: transparent;
        border: none;

        body.body--dark & {
          color: var(--dark-text-color)
        }
      }
    }
  }
</style>
