<template>
  <q-header id="main__header" :style="headerStyles">
    <safa-form
      ignore
      caption="هدر بالا"
      id="10BEE76D-F344-4B5D-897A-191007330AB4"
    >
      <q-toolbar class="flex q-gutter-x-sm items-center" style="height: 50px">
        <div class="col-auto">
          <q-btn
            @click="$stSecurity.dispatch('sidebar/toggleVisible')"
            flat
            round
            size="md"
            icon="menu"
          />
        </div>
        <div v-if="isSysAdmin" class="col-auto">
          <q-btn
            @click="redirectToSecurityUi"
            size="12px"
            color="white"
            text-color="primary"
          >
            <q-icon name="security" size="19px" />&nbsp;پنل مدیریتی
          </q-btn>
        </div>
        <safa-securityPanel
          caption="فرم پاسخگو"
          class="col-auto"
          id="0c1539ba-9491-48ff-bac4-2b356bf111f0"
          tag="span"
        >
          <q-btn
            @click="
              setForm({ formKey: 'UResponder', title: 'فرم پاسخگو', layout: 1 })
            "
            flat
            size="12px"
          >
            <q-icon size="19px">
              <svg
                height="20"
                viewBox="0 0 20.316 20"
                width="20.316"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  data-name="Form pasokhgoo"
                  id="Form_pasokhgoo"
                  transform="translate(0.001 0)"
                >
                  <rect
                    data-name="Rectangle 1696"
                    fill="none"
                    height="20"
                    id="Rectangle_1696"
                    transform="translate(0.315 0)"
                    width="20"
                  />
                  <path
                    d="M-5065.128-4031c-.324-.008-.648,0-.974,0a1.287,1.287,0,0,1-.489-.331c-.638-.645-1.285-1.281-1.92-1.932a.261.261,0,0,0-.387-.045,4.473,4.473,0,0,1-6.706-3.188,4.487,4.487,0,0,1,3.924-5.116,4.479,4.479,0,0,1,4.948,3.909,4.374,4.374,0,0,1-.6,2.825.263.263,0,0,0,.046.389c.653.639,1.3,1.292,1.942,1.937a1.233,1.233,0,0,1,.315.476c0,.325,0,.651,0,.976,0,.083-.016.1-.094.1Zm-8.786-6.167a2.738,2.738,0,0,0,2.736,2.731,2.706,2.706,0,0,0,2.726-2.727,2.709,2.709,0,0,0-2.723-2.741h-.034A2.748,2.748,0,0,0-5073.914-4037.166Zm-2.086,3.628q-3.35,0-6.7,0a2.3,2.3,0,0,1-2.3-2.264q0-6.474,0-12.949a2.2,2.2,0,0,1,.56-1.462,2.531,2.531,0,0,1,1.363-.786h10.573l.249.068a2.289,2.289,0,0,1,1.7,2.116c.018,1.844,0,3.687.009,5.531,0,.149-.054.211-.209.206a5.232,5.232,0,0,0-.968.071,6.039,6.039,0,0,0-5.176,5.6,5.742,5.742,0,0,0,1.017,3.635c.041.061.13.125.083.2a.1.1,0,0,1-.091.039C-5075.925-4033.531-5075.966-4033.538-5076-4033.538Zm-1.4-5.861a.857.857,0,0,0,.508-.138.79.79,0,0,0,.326-.872.823.823,0,0,0-.83-.6c-1.39-.006-2.78,0-4.169,0a.879.879,0,0,0-.471.133.8.8,0,0,0-.352.9.789.789,0,0,0,.759.578c.714.008,1.429,0,2.145,0v0h2.084Zm-4.188-4.926a.821.821,0,0,0-.837.8.818.818,0,0,0,.82.812q3.825.006,7.649,0a.778.778,0,0,0,.582-.251.747.747,0,0,0,.166-.849.763.763,0,0,0-.752-.507c-1.272-.005-2.543,0-3.814,0h-2.181Zm-.342-3.256a.809.809,0,0,0-.482.839.814.814,0,0,0,.822.707q1.688.019,3.378,0a.826.826,0,0,0,.834-.824.815.815,0,0,0-.864-.782c-.55-.005-1.1,0-1.65,0h-1.649A.949.949,0,0,0-5081.926-4047.581Z"
                    data-name="Union 73"
                    id="Union_73"
                    transform="translate(5085 4051)"
                  />
                </g>
              </svg> </q-icon
            >&nbsp; فرم پاسخگو
          </q-btn>
        </safa-securityPanel>
        <div class="col-auto">
          <q-btn
            @click="
              setForm({
                formKey: 'KartablePasokhgoo',
                title: 'کارتابل پاسخگو',
                layout: 1,
                color: '#4534b9',
                icon: 'find_in_page',
              })
            "
            flat
            size="11px"
          >
            <q-icon size="19px" name="find_in_page" />&nbsp; کارتابل پاسخگو
          </q-btn>
        </div>
        <div class="col-auto">
          <transition name="fade">
            <MapNosaziSearchBox />
          </transition>
        </div>
        <q-space />
        <slot name="before" />
        <div class="col-auto" dir="ltr">
          <abbr
            :title="buildVersion"
            style="letter-spacing: 2px; direction: ltr; font-size: 12px"
          >
            {{ fullVersion }}
          </abbr>
        </div>
        <div class="col-auto">
          <q-btn
            @click="setLayout('full')"
            unelevated
            size="12px"
            flat
            round
            title="نمایش تمام صفحه"
          >
            <q-icon class="text-theme-color" name="crop_free" size="18px" />
          </q-btn>
        </div>
        <div
          class="col q-px-sm flex items-center"
          style="max-width: 160px"
          v-if="$q.screen.gt.md"
        >
          <q-slider
            :max="100"
            :min="0"
            :step="10"
            markers
            :value="layoutSplitterWidth"
            @change="setLayoutSplitterWidth"
            color="white"
            reverse
            style="width: 100%"
          />
        </div>
        <div class="col-auto">
          <q-btn
            @click="setLayout('map')"
            unelevated
            size="12px"
            flat
            round
            title="نمایش نقشه"
          >
            <q-icon size="18px">
              <svg
                height="20"
                fill="currentColor"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Naghshe" transform="translate(0.034 0.001)">
                  <rect
                    data-name="Rectangle 1698"
                    fill="none"
                    height="20"
                    id="Rectangle_1698"
                    transform="translate(-0.034 -0.001)"
                    width="20"
                  />
                  <path
                    d="M-5071.274-4082.03v-8.655c.144.165.259.288.367.418a1.913,1.913,0,0,0,1.133.706,1.806,1.806,0,0,0,1.775-.6,27.194,27.194,0,0,0,2.265-2.875c.235-.347.466-.7.7-1.046v9.243a.808.808,0,0,1-.541.533q-1.882.741-3.754,1.5c-.637.255-1.271.518-1.905.777Zm-13.215,0a.725.725,0,0,1-.511-.794q.012-5.546,0-11.093a.7.7,0,0,1,.541-.813l5.492-2.2c.059-.023.12-.043.207-.075v.222q0,6.171.005,12.34a.264.264,0,0,1-.2.292q-2.605,1.032-5.2,2.076a.343.343,0,0,0-.062.041Zm11.787-.277q-2.322-.928-4.643-1.854a.226.226,0,0,1-.168-.253q.006-6.2,0-12.4v-.2l.562.222c.722.29,1.446.577,2.166.869a.373.373,0,0,1,.2.161,16.152,16.152,0,0,0,1.933,3.3.69.69,0,0,1,.138.429q-.006,4.765,0,9.532v.246C-5072.6-4082.269-5072.65-4082.285-5072.7-4082.306Zm2.81-8.7a25.1,25.1,0,0,1-2.993-4.077,6.879,6.879,0,0,1-.8-1.935,3.709,3.709,0,0,1,.3-2.374,4.3,4.3,0,0,1,3.083-2.51,4.364,4.364,0,0,1,4.955,2.662,12.344,12.344,0,0,1,.318,1.22v.623a12.249,12.249,0,0,1-2.685,4.946c-.371.492-.778.958-1.179,1.428a.67.67,0,0,1-.507.261A.648.648,0,0,1-5069.893-4091Zm-1.381-6.636a1.888,1.888,0,0,0,1.865,1.882,1.888,1.888,0,0,0,1.877-1.87,1.886,1.886,0,0,0-1.854-1.872h-.029A1.889,1.889,0,0,0-5071.273-4097.638Z"
                    data-name="Union 74"
                    id="Union_74"
                    transform="translate(5085 4102)"
                  />
                </g>
              </svg>
            </q-icon>
          </q-btn>
        </div>
        <div class="col-auto">
          <q-btn
            unelevated
            size="12px"
            flat
            round
            icon="campaign"
            @click="showBulettin"
          >
            <q-badge
              v-if="bulletinCount > 0"
              :label="bulletinCount"
              align="top"
              style="top: 0"
              :color="'red'"
              floating
              rounded
            />
          </q-btn>
        </div>
        <div class="col-auto">
          <q-btn
            unelevated
            size="12px"
            flat
            round
            icon="browser_updated"
            @click="ShowMapNotify"
          />
        </div>
        <!-- <div class="col-auto">
          <q-btn
            unelevated
            size="12px"
            flat
            round
            icon="help"
            @click="openHelpDialog"
          />
        </div> -->
        <div class="col-auto" v-if="showSystemGuide">
          <q-btn
            unelevated
            size="12px"
            flat
            round
            icon="info"
            @click="showSubSystemHelpDialogs"
          />
        </div>
        <slot name="last" />
      </q-toolbar>
    </safa-form>
  </q-header>
</template>
<script>
import { colors } from "quasar"
import baseFormMixin from "src/mixins/baseFormMixin"
import MapNosaziSearchBox from "../MapNosaziSearchBoxBasedOnQuickSearch.vue"
import build from "../../../build.json"
import { mapGetters } from "vuex"
import { appendUrls } from "src/utils"
import { StringHelper } from "ui-security"

export default {
  mixins: [baseFormMixin],
  components: { MapNosaziSearchBox },
  data () {
    return {
      bulletinCount: 0,
      isBulletinNew: false,
      fullVersion: build.version,
      sessionTimer: null
    }
  },
  computed: {
    ...mapGetters("ui", ["layoutSplitterWidth", "layoutMode"]),
    buildVersion () {
      return `version: ${this.fullVersion ?? ""} - client ip: ${
        this.$stSecurity?.state?.socket?.clientIp ?? "-"
      }`
    },
    isSysAdmin () {
      return this.currentUser.isSysAdmin
    },
    layoutMode () {
      return this.$store.getters["ui/layoutMode"]
    },
    showSystemGuide () {
      return window.getConfigValue("systemGuide.enabled", true)
    },
    headerStyles () {
      const settings = this.$stSecurity.getters["sidebar/settings"]
      const colorSchema =
        this.$stSecurity.getters["sidebar/headerTextColorSchema"]
      return {
        backgroundColor: this.$q.dark.isActive
          ? "var(--q-color-dark-page)"
          : colors.getPaletteColor(settings.headerBgColor),
        color:
          colorSchema === "dark" ? "rgba(0,0,0,.9)" : "rgba(255,255,255,.9)",
        height: "50px"
      }
    }
  },
  methods: {
    ShowMapNotify () {
      this.$KaisMap.ShowNotify()
    },
    showBulettin () {
      this.setActiveForm("BulletinBoardContainer")
    },
    // openHelpDialog () {
    //   this.$window.open({
    //     id: "helpDialog",
    //     title: "راهنمای برنامه",
    //     width: 850,
    //     height: 725,
    //     component: "HelpDialog"
    //   })
    // },
    showSubSystemHelpDialogs () {
      if (!this.showSystemGuide) return
      this.$q
        .bottomSheet({
          title: "راهنمای استفاده از سامانه سرا 10",
          // message: "راهنمای استفاده از زیرسیستم های سرا 10:",
          grid: true,
          style: {
            "border-radius": "8px 8px 0 0"
          },
          actions: this.$stSecurity.state.sidebar.menuItems
            .filter((e) => e.hasOwnProperty("help"))
            .map((node) => ({
              label: node.title,
              icon: node.icon.indexOf("img:") > -1 ? null : node.icon,
              img:
                node.icon.indexOf("img:") > -1
                  ? node.icon.replace("img:", "")
                  : null, // .replace('img:', 'http://dev.safarayaneh.com:7000/sara10/')
              help: node.help,
              id: node.id,
              classes: "custom-menu-help-icon"
            }))
        })
        .onOk(async ({ help: fileName }) => {
          try {
            const url = new URL(
              appendUrls([
                window.getConfigValue("securityBaseUrl"),
                "dl/help",
                fileName
              ])
            )

            const response = await fetch(url, {
              method: "POST",
              body: JSON.stringify({
                pdata1: new StringHelper().convert({ _uid: this.$stSecurity.getters["authorize/userId"] })
              }),
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json; charset=UTF-8",
                Accept: "application/json, text/plain, */*",
                NidSession: this.$stSecurity.getters["authorize/session"],
                token: this.$stSecurity.getters["authorize/token"],
                Domain: this.$stSecurity.getters["authorize/loggedUser"]?.domain[0] || undefined
              }
            })

            if (response.status !== 200 && !response?.data) {
              throw new Error(response.status)
            }

            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = blobUrl
            a.target = "_blank"
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            window.URL.revokeObjectURL(blobUrl)
          } catch (ex) {
            console.error(ex)
            this.serverError()
          }
        })
    },
    async redirectToSecurityUi () {
      const panelOptions = this.getConfig("securityPanel")
      if (!panelOptions || !panelOptions.url)
      { return alert("کانفیگ securityPanel تعریف نشده است.") }

      // const payload = this.$stSecurity.getters['authorize/token'] || ''

      const { data } = await this.$services.security.otpSet()
      if (data.success) {
        const apiKey = data.data
        const url = new URL(`${panelOptions.url}`)
        url.hash += `?_otpmsg=${apiKey}`
        window.open(url.toString(), panelOptions.target || "_blank")
      } else {
        this.showError('خطا در سرور')
      }
    }
  },
  mounted () {
    const self = this
    this.$root.$on("bulletin:new", (params) => {
      self.bulletinCount = params.count
      self.isBulletinNew = params.count > 0
    })
  },
  created () {
    this.sessionTimer = setInterval(() => {
      this.$stSecurity.dispatch("authorize/refreshSessions")
    }, 1000 * 60 * 5)
  },
  beforeDestroy () {
    if (this.sessionTimer) clearInterval(this.sessionTimer)
  }
}
</script>

<style lang="scss">
.custom-menu-help-icon {
  .q-icon {
    color: #4b4a4a;
    font-size: 38px;
  }

  img {
    width: 34px;
    height: auto;
    object-fit: contain;
    object-position: center;

    body.body--light & {
      filter: grayscale(100%) brightness(30%);
    }
  }

  .custom-menu-help-icon > .q-icon + div {
    body.body--light & {
      color: #000000;
    }
  }
}
</style>
