<template>
  <div class="flex">
    <q-btn
      v-if="isMobile && showNosaziBox"
      title="جستجوی کدنوسازی"
      flat
      round
      size="11px"
      icon="search"
      @click="loadByNosaziCode"
    />
    <nosazi-code-input
      v-if="showNosaziBox"
      :actions="false"
      v-model="baseNosaziCode"
      @enter="loadByNosaziCode"
      :loading="loading"
    />
    <div class="map-quick-search" v-else>
      <q-input
        v-model="searchTerm"
        outlined
        dense
        rounded
        dark
        ref="searchInput"
        :loading="loading"
        placeholder="کدنوسازی یا عبارت جستجو..."
        type="text"
        bg-color="transparent"
      >
        <!-- @focus="inputFocus" -->
        <template #append>
          <q-icon name="search" color="white" size="sm" />
        </template>
        <q-popup-proxy
          @show="searchResultAfterShow"
          v-model="searchResultVisible"
          ref="result"
          no-parent-event
        >
          <q-card
            id="map-search-result"
            class="column"
            style="
              width: 500px;
              height: 64vh;
              max-width: 90vw;
              max-height: 64vh;
            "
            flat
            bordered
          >
            <q-card-section
              class="col-auto flex items-center q-py-sm bg-grey-2"
            >
              <div class="text-grey-7 text-body1 col-auto">
                نتایج جستجو ({{ totalItems }})
              </div>
              <q-space />
              <div class="flex items-center q-gutter-md">
                <q-spinner v-if="loading" color="primary" size="sm" />
                <q-btn
                  icon="unfold_more"
                  dense
                  flat
                  round
                  @click="expandAllGroups"
                />
                <q-btn
                  icon="unfold_less"
                  dense
                  flat
                  round
                  @click="collapseAllGroups"
                />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section
              v-if="filteredGroups.length === 0 && searchTerm !== ''"
              class="col relative-position flex items-center justify-center"
            >
              <!--            <q-img
                          style="opacity: 0.4"
                          fit="contain"
                          width="300px"
                          height="300px"
                          position="center"
                          src="map/search.png"
                          v-if="loading"
                        />-->
              <q-img
                style="opacity: 0.4"
                fit="contain"
                width="300px"
                height="300px"
                position="center"
                src="map/not-found.png"
              />
            </q-card-section>
            <q-card-section
              v-if="filteredGroups.length"
              class="col custom-scroll q-pa-none"
            >
              <q-list>
                <q-expansion-item
                  v-for="(group, index) in filteredGroups"
                  :key="index"
                  expand-separator
                  v-model="group.expanded"
                >
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar
                        icon="folder"
                        color="grey-7"
                        text-color="white"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ group.GroupTitle }}</q-item-label>
                      <q-item-label caption
                        >تعداد نتایج: {{ group.items.length }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      {{ group.PerFix }}
                    </q-item-section>
                  </template>
                  <q-card>
                    <q-card-section class="q-pa-none">
                      <q-separator />
                      <safa-grid
                        v-model="group.items"
                        :columns="group.columns"
                        :addRow="false"
                        :allowCopy="false"
                        :deleteRow="false"
                        :bordered="false"
                        :paginate="true"
                        m="r"
                        height="320px"
                        :pageSize="7"
                        :animateRows="true"
                        :filterable="true"
                        :suppressRowClickSelection="false"
                        :allowMultipleSelection="false"
                        @row:dblclick="selectItem"
                      />
                      <!--                    <pre dir="ltr">{{ group.items }}</pre>-->
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
              <!--            <div v-for="(group, index) in groups" :key="index">
                          <div
                            class="col row justify-between self-center"
                            @click="doSearch(group.PerFix + '#')"
                            style="
                              height: 40px;
                              background-color: whitesmoke;
                              padding: 10px;
                              margin: 5px;
                              cursor: pointer;
                            "
                          >
                            <span style="margin: 5px">#{{ group.PerFix }} </span>
                            <span class="col" style="color: blue; margin: 5px">
                              {{ group.GroupTitle }}</span
                            >
                            <span class="col-auto" style="color: blue; margin: 5px">{{
                              group.Total
                            }}</span>
                          </div>
                        </div>-->
            </q-card-section>
          </q-card>
        </q-popup-proxy>
      </q-input>
    </div>
    <q-btn
      flat
      round
      size="11px"
      icon="swap_vert"
      class="q-mx-sm"
      @click="showNosaziBox = !showNosaziBox"
    />
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import { debounce } from "quasar"
import { Queues } from "../utils/Queues"
import { convertNosaziCodeObjectToString, convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { mapGetters } from "vuex"
// import { QuickSearch } from "../services/srvMap"
// import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  name: "MapNosaziSearchBox",
  mixins: [baseFormMixin, mapMixin],
  data () {
    return {
      loading: false,
      showNosaziBox: true,
      searchTerm: "",
      searchResultVisible: false,
      pageIndex: 0,
      groups: [], // groups
      queues: new Queues({
        delay: 100,
        cacheable: false,
        maxCacheCapacity: 50
      }),
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
    isMobile () {
      // return true
      return ["mobile", "cordova"].some((e) => this.$q.platform.is[e])
    },
    ...mapGetters("map", ["currentCode", "lastLocation"]),
    filteredGroups () {
      return this.groups.filter((x) => x.items.length > 0)
    },
    totalItems () {
      return this.filteredGroups
        .map((x) => x.items.length)
        .flat()
        .reduce(function (a, b) {
          return a + b
        }, 0)
    }
  },
  methods: {
    loadByNosaziCode () {
      this.searchTerm = convertNosaziCodeObjectToString(this.baseNosaziCode)
    },
    expandAllGroups () {
      const list = [...this.groups.slice()]
      // console.log(list)
      for (let i = 0; i < list.length; i++) {
        const g = list[i]
        g.expanded = true
        list.splice(i, 1, g)
      }

      this.groups = list
      /* this.groups = []
      this.$nextTick(() => {
        this.groups = list
      }) */
    },
    collapseAllGroups () {
      const list = [...this.groups.slice()]
      for (let i = 0; i < list.length; i++) {
        const g = list[i]
        g.expanded = false
        list.splice(i, 1, g)
      }

      this.groups = list
      /* this.groups = []
      this.$nextTick(() => {
        this.groups = list
      }) */
    },
    selectItem (e) {
      console.log("show selectItem on map", e)
      const WKT = e.WKT ?? e.data.WKT ?? null
      if (!WKT) return
      this.showWKT({ WKT }, false)
      this.mapZoom(19)
    },
    inputFocus () {
      this.showSearchResult()
    },
    showSearchResult () {
      // console.log(this.$refs.result)
      // this.searchResultVisible = true
      // this.$refs.result.show()
    },
    searchResultAfterShow () {
      // this.$refs.searchInput?.focus()
    },
    async getResult (prefix = "") {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await this.$services.srvMap.QuickSearch({
            NidUserLogin: this.$stSecurity.getters["authorize/userId"],
            Keyword: `${prefix}${this.searchTerm}`,
            PgNo: this.pageIndex,
            NidUser: this.$stSecurity.getters["authorize/userId"],
            fullname: this.$stSecurity.getters["authorize/fullname"],
            UserSession: this.$stSecurity.getters["authorize/session"],
            IsSysAdmin: 1
          })

          if (res.data.success) {
            return resolve(res.data.data)
          } else {
            return reject(res.data)
          }
        } catch (ex) {
          reject(ex)
        }
      })
    },
    async searchSubGroups () {
      return new Promise(async (resolve) => {
        this.queues.clear()
        this.groups.forEach((g) => {
          const key = g.NidSearch + "#" + g.PerFix
          const request = async () => this.getResult(`${g.PerFix}#`)
          const cb = (result) => {
            g.columns = this.MakeCol(result.Cols)
            g.items = result.Items
            g.totalCount = result.Total
          }
          this.queues.add(key, request, cb)

          /* this.searchSubGroups(g, (result) => {
            g.columns = this.MakeCol(result.Cols)
            g.items = result.Items
            g.totalCount = result.Total
          }) */
        })

        await this.queues.run()
        console.log("DONE")
        let a = this.groups.map((m) => m.items) ?? []
        let b = a.flat(1) ?? []
        if (b.length === 1) {
          this.selectItem(b[0])
        }
        if (b.length > 1) {
          this.searchResultVisible = true
          this.$refs.result.show()
        }
        resolve()
      })
    },
    async doSearch () {
      this.queues.clear()
      if (!this.searchTerm) {
        this.searchResultVisible = false
        return this.$q.notify({
          type: "info",
          message: "عبارت جستجو وارد نشده است."
        })
      }

      this.setLayout("half")
      // this.$map.resizeMapSide(500)
      // this.$map.showMapSide("SearchDialog", "جستجو")

      /* this.showSearchResult = true
      await this.$nextTick()
      // this.$refs.searchResult.searchTerm = this.searchTerm
      await this.$refs.searchResult.doSearch(this.searchTerm) */
      try {
        this.loading = true
        const result = await this.getResult("")
        this.groups = result.RsSearch.map((g) => ({
          ...g,
          expanded: false,
          items: [],
          columns: [],
          totalCount: 0
        }))
        // this.totalItems = result.Total

        await this.searchSubGroups()

        this.showSearchResult()

        this.$nextTick(() => {
          if (this.filteredGroups.length > 10) {
            this.collapseAllGroups()
          } else {
            this.expandAllGroups()
          }
        })
        // console.log(result)
      } catch (ex) {
        console.log(ex)
      } finally {
        this.loading = false
      }
    },
    MakeCol (cols) {
      return cols.map((col) => {
        let isCi = col.CName.startsWith("CI_") ?? false
        if (isCi) {
          return {
            title: col.Title,
            field: col.CName,
            width: 115,
            editor: "ci",
            ciName: col.CName,
            domain: window.getConfigValue(
              "mapConfig.searchDomain",
              "Base_Domain"
            ),
            cellStyle: (params) => this.getCellStyle(params, "SurveyStyle")
          }
        } else {
          return {
            title: col.Title,
            field: col.CName,
            width: 120
          }
        }
      })
      /* const columns = []

      cols.forEach((x) => {
        if (
          x.CName.toLowerCase() !== "wkt" &&
          x.CName.toLowerCase() !== "nid"
        ) {
          columns.push({
            title: x.Title,
            field: x.CName,
            domain: window.getConfigValue(
              "mapConfig.searchDomain",
              "Base_Domain"
            )
          })
        }
      }) */
    },
    syncCurrentMapLocation () {
      this.baseNosaziCode = convertStringToNosaziCodeObject(this.currentCode)
    }
  },
  created () {
    this.doSearch = debounce(this.doSearch, 500)
  },
  watch: {
    searchTerm () {
      this.doSearch()
    },
    currentCode () {
      this.syncCurrentMapLocation()
    }
  }
}
</script>
<style lang="scss">
#map-search-result {
  #map_search_input {
    display: none;
  }
}

.map-quick-search {
  border-radius: 28px;
  outline: none;
  min-width: 240px;
  background-color: rgba(255, 255, 255, 0.2);

  .q-field:not(.q-textarea).q-field--dense .q-field__control,
  .q-field:not(.q-textarea).q-field--dense .q-field__marginal {
    height: 34px !important;
    outline: none;
  }

  .q-field__control:before {
    border-color: rgba(255, 255, 255, 0.2) !important;
  }

  .q-field--focused {
    .q-field__control:after {
      border-color: #fff !important;
    }
  }

  input {
    font-size: 0.95rem;

    &::placeholder {
      font-size: 0.76rem;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
