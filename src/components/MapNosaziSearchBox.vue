<template>
  <div class="map-quick-search">
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
          style="width: 500px; height: 64vh; max-width: 90vw; max-height: 64vh"
          flat
          bordered
        >
          <q-card-section class="col-auto">
            <div class="text-grey-7 text-body1">
              نتایج جستجو ({{ totalItems }})
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section
            v-if="groups.length === 0 || loading"
            class="col relative-position flex items-center justify-center"
          >
            <q-img
              style="opacity: 0.4"
              fit="contain"
              width="300px"
              height="300px"
              position="center"
              src="map/search.png"
              v-if="loading"
            />
            <q-img
              style="opacity: 0.4"
              fit="contain"
              width="300px"
              height="300px"
              position="center"
              src="map/not-found.png"
              v-else
            />
          </q-card-section>
          <q-card-section v-if="groups.length" class="col custom-scroll">
            <q-list bordered class="rounded-borders">
              <q-expansion-item
                v-for="(group, index) in groups"
                :key="index"
                expand-separator
              >
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar
                      icon="search"
                      color="primary"
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
                  <q-card-section>
                    <safa-grid
                      v-model="group.items"
                      :columns="group.columns"
                      :addRow="false"
                      :allowCopy="false"
                      :deleteRow="false"
                      :bordered="false"
                      :paginate="true"
                      m="r"
                      :pageSize="100"
                      :cacheBlockSize="100"
                      :animateRows="true"
                      :filterable="true"
                      :suppressRowClickSelection="false"
                      :allowMultipleSelection="false"
                      @selection:changed="selectItem"
                    />
                    <pre dir="ltr">{{ group.items }}</pre>
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
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin";
import mapMixin from "src/mixins/mapMixin";
import { debounce } from "quasar";
import { Queues } from "../utils/Queues";
// import { QuickSearch } from "../services/srvMap"
// import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  name: "MapNosaziSearchBox",
  mixins: [baseFormMixin, mapMixin],
  data() {
    return {
      loading: false,
      searchTerm: "",
      searchResultVisible: false,
      pageIndex: 0,
      totalItems: 0,
      groups: [], // groups
      queues: new Queues(100),
    };
  },
  computed: {
    mapLocation() {
      return this.$store.getters["map/lastLocaton"];
    },
    qWhere() {
      return this.cleanQuery(
        ` and (Code = '${this.normalizeCode(this.searchTerm)}')`
      );
    },
  },
  methods: {
    selectItem(e) {
      console.log("selectItem", e);
    },
    showSearchResult() {
      this.searchResultVisible = true;
      this.$refs.result.show();
    },
    searchResultAfterShow() {
      this.$refs.searchInput?.focus();
    },
    cleanQuery(query) {
      return query.replace(/--/g, "-");
    },
    normalizeCode(term) {
      if (term.indexOf("-") > -1) {
        const code = term.split("-");
        for (let i = 0; i < 7 - code.length; i++) {
          code.push("0");
        }

        return code.join("-");
      }
      return term;
    },
    async getResult(layerId) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await this.$services.srvMap.MapFind2({
            NidLayer: layerId,
            WKT: "",
            // StrWhere: this.qWhere,
            StrWhere: ` and (Code = '1-2-3-4-0-0-0')`,
            Buffer: 1,
            NidUser: this.$stSecurity.getters["authorize/userId"],
            fullname: this.$stSecurity.getters["authorize/fullname"],
            UserSession: this.$stSecurity.getters["authorize/session"],
            NidUserLogin: this.$stSecurity.getters["authorize/userId"],
            IsSysAdmin: 1,
          });

          console.log("result", res);
          if (res.data.success) {
            return resolve(res.data.data);
          } else {
            return reject(res.data);
          }
        } catch (ex) {
          reject(ex);
        }
      });
    },
    async doSearch() {
      if (!this.searchTerm) {
        this.searchResultVisible = fals;
        return this.$q.notify({
          type: "info",
          message: "عبارت جستجو وارد نشده است.",
        };
      }

      this.setLayout("half";
      // this.$map.resizeMapSide(500)
      // this.$map.showMapSide("SearchDialog", "جستجو")

      /* this.showSearchResult = true
      await this.$nextTick()
      // this.$refs.searchResult.searchTerm = this.searchTerm
      await this.$refs.searchResult.doSearch(this.searchTerm) */

      try {
        this.loading = true
        this.queues.clear()
        const layers = window.getConfigValue("mapConfig.SearchLayers", [
          window.getConfigValue("mapConfig.NidLayer"),
        ])

        if (!layers.length) return this.showSearchResult()

        console.log(layers)
        layers.forEach((id) => {
          console.log("layer", id)
          const key = id
          const request = async () => this.getResult(id)
          const cb = (result) => {
            console.log("result", result)
          }
          this.queues.add(key, request, cb)
        })

        await this.queues.run()
        console.log("DONE")
        /*
        const result = await this.getResult()
        console.log("$RRR", result)
        this.groups = result.RsSearch.map((g) => ({
          ...g,
          expanded: false,
          items: [],
          columns: [],
          totalCount: 0
        }))
        this.totalItems = result.Total

        await this.searchSubGroups() */

        this.showSearchResult()
        // console.log(result)
      } catch (ex) {
        console.log(ex)
      } finally {
        this.loading = false
      }
    },
  },
  created() {
    this.doSearch = debounce(this.doSearch, 1000)
  },
  watch: {
    searchTerm() {
      this.doSearch()
    },
  },
};
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
