<template>
  <fit>
    <div class="row search-wrapper q-ma-sm">
      <!-- <div class="searchbox flex items-center col-3">
        <input
          v-model="searchTerm"
          placeholder=" کاربر ..."
          type="text"
        />
        <transition name="fade">
          <q-icon
            v-show="searchTerm.trim().length>0"
            class="s-close cursor-pointer"
            name="close"
            size="22px"
            @click="searchTerm=''"
          />
        </transition>
        <q-icon
          class="s-search"
          name="search"
          size="22px"
        />
      </div> -->
      <safa-text label="جستجوی کاربر" v-model="searchTerm">
        <template v-slot:append>
          <q-icon
            v-if="searchTerm !== ''"
            style="position: relative; right: 5px; font-size: 18px"
            @click="searchTerm = ''"
            color="primary"
            name="clear"
            class="cursor-pointer"
          />
          <q-icon
            style="position: relative; right: 5px; font-size: 18px"
            color="primary"
            name="search"
            class="cursor-pointer"
            title="جستجوی کاربر"
          />
        </template>
      </safa-text>
    </div>
    <safa-grid
      v-model="agentArray"
      :allow-multiple-selection="false"
      :selectable="true"
      fit
      height="100%"
      helper="revisitAgentList"
      max-height="100%"
      min-height="150px"
      title="لیست مامورین"
      @row:click="rowClick"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
      :pageSize="20"
      :suppressRowClickSelection="false"
    />
    <div class="flex q-ma-sm justify-end">
      <btn-default :disabled="!selectedRow" label="انتخاب" @click="selectRow" />
    </div>
  </fit>
</template>

<script>
export default {
  name: "URevisitAgentList",
  props: { agentArray: Array },
  data () {
    return {
      selectedRow: null,
      searchTerm: "",
      list: null
    }
  },
  mounted () {
    this.list = [...this.agentArray]
  },
  methods: {
    selectRow () {
      this.$emit("selectRow", this.selectedRow)
    },
    rowClick ({ data }) {
      this.selectedRow = data
    }
  },
  watch: {
    searchTerm () {
      if (this.searchTerm === "") {
        this.agentArray = [...this.list]
      } else {
        let list = this.list.map((m) => {
          return {
            ...m,
            Name: m.Name ?? "",
            LastName: m.LastName ?? ""
          }
        })
        this.agentArray = list.filter(
          (f) =>
            f.Name.includes(this.searchTerm) ||
            f.LastName.includes(this.searchTerm)
        )
      }
    }
  }
}
</script>

<style lang="scss">
button.ribbon-button.form-button {
  min-width: 78px;

  .rb--label {
    white-space: pre-wrap;
    line-height: 12px;
    display: block;
    width: 100%;
    min-height: 20px;
  }
}
</style>
