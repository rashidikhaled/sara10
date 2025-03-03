<template>
  <div id="q-app">
    <q-layout view="lHh lpR fFf">
      <layout-header v-if="isHeaderVisible" :windows="windows">
        <template #last>
          <div>
            <div
              v-if="showRemainDaysNotice"
              :title="remainDaysNotice"
              class="remain-days flex items-center no-wrap"
            >
              <span
                ><b>{{ remainDays }}</b> روز باقیمانده</span
              >
            </div>
          </div>
        </template>
        <template #before>
          <UserTokenCoundDown />
        </template>
      </layout-header>
      <layout-sidebar v-if="isSidebarVisible" />

      <q-page-container>
        <q-page
          v-if="viewMode === 'authorizing'"
          class="column items-center justify-center"
        >
          <page-authorization />
          <div
            v-if="authLoading"
            class="absolute-bottom flex justify-center q-mb-xl"
          >
            <q-spinner size="lg" color="primary" class="q-ma-lg" />
          </div>
        </q-page>

        <q-page
          v-else-if="viewMode === 'forbidden'"
          class="column items-center justify-center"
        >
          <page-forbidden />
        </q-page>

        <q-page id="login-form" v-else-if="viewMode === 'login'">
          <login
            :sso-mode="ssoConfig.enabled"
            :sso-methods="ssoConfig.methods"
            @done="loginSuccessfully"
            :version="buildVersion"
            loginSideBgImage="security/login-side.jpg"
            bgImage="url('security/login-bg.jpg')"
          />
        </q-page>

        <q-page
          v-else-if="viewMode === 'remote'"
          id="form-place"
          class="remote-form"
        >
          <component
            :is="launcherFormName"
            ref="launcherForm"
            v-bind="{ ...(launcherFormProps || {}) }"
            v-on="{ ...(launcherFormEvents || {}) }"
            container="remote-form"
            :isSelectFromWorkflow="false"
            :isSelectFromResponder="false"
          />
        </q-page>

        <q-page v-else-if="viewMode === 'dashboard'" id="form-place">
          <div id="special-layout" class="absolute-full fit">
            <section
              class="layout-container relative-position fit"
              @dragover.prevent
              @dragenter.prevent
              @drop="onDropRelease"
            >
              <q-splitter
                :limits="[0, Infinity]"
                :separator-class="layoutSeparatorClass"
                :value="layoutSplitterWidth"
                class="fit"
                @input="setLayoutSplitterWidth"
              >
                <template #after>
                  <Fit aria-labelledby="left-side" aria-parent="true">
                    <form-launcher-tabs :side="'left'" />
                    <q-separator />
                    <div class="fit remote-form-wrapper">
                      <template v-for="form in leftLauncherForms">
                        <section
                          class="form-tab"
                          v-show="leftActiveForm === form.formKey"
                          :key="form.formKey"
                        >
                          <component
                            :is="form.formName || form.formKey"
                            :activated="leftActiveForm === form.formKey"
                            ref="form"
                            v-bind="{
                              ...form.props,
                              layoutMode,
                              layoutSplitterWidth,
                            }"
                            v-on="{ ...form.events }"
                            container="special-layout"
                          />
                        </section>
                      </template>
                    </div>
                  </Fit>
                </template>
                <template #before>
                  <Fit aria-labelledby="right-side" aria-parent="true">
                    <form-launcher-tabs :side="'right'" />
                    <q-separator />
                    <div class="fit remote-form-wrapper">
                      <template v-for="form in rightLauncherForms">
                        <section
                          class="form-tab"
                          v-show="activeForm === form.formKey"
                          :key="form.formKey"
                        >
                          <component
                            :is="form.formName || form.formKey"
                            :activated="activeForm === form.formKey"
                            ref="form"
                            v-bind="{
                              ...form.props,
                              layoutMode,
                              layoutSplitterWidth,
                            }"
                            v-on="{ ...form.events }"
                            container="special-layout"
                          />
                        </section>
                      </template>
                    </div>
                  </Fit>
                </template>
              </q-splitter>
            </section>
          </div>
        </q-page>
        <q-page v-else class="column items-center justify-center">
          <q-icon color="blue" icon="info" size="lg" />
        </q-page>
      </q-page-container>
    </q-layout>
    <safa-window-launcher
      v-if="isAuthenticated && isLoginCompleted && !isAuthorizing"
      id="windows-launcher"
      @update="updateWindows"
    />
    <UnreadMessagesDialog
      v-model="showUserUnreadMessages"
      v-if="
        showUserUnreadMessages &&
        isAuthenticated &&
        isLoginCompleted &&
        !isAuthorizing
      "
    />
    <!--    <q-inner-loading style="z-index: 999999999999" :showing="isAuthorizing">
          <q-spinner size="lg" color="primary" />
          <p class="q-pt-md text-primary text-body2 text-bold">در حال پردازش...</p>
        </q-inner-loading>-->
    <login-validation
      @isValidUserHandler="isValidUserHandler"
      @logout="logout"
      ref="loginValidRef"
    />
  </div>
</template>
<script>
/* eslint-disable no-undef */
// helpers
import build from "../build"

// components
import LayoutHeader from "src/components/common/Header"
import LayoutSidebar from "src/components/common/Sidebar"
import UserTokenCoundDown from "./components/common/UserTokenCoundDown"
import FormLauncherTabs from "./components/common/FormLauncherTabs"
import LoginValidation from "./components/LoginValidation.vue"

// mixins
// import colorMixin from 'src/mixins/colorMixin'
import formLauncherMixin from "src/mixins/formLauncherMixin"
import {
  idleTimerMixin,
  getStore,
  socket,
  fetchSystemResource
} from "ui-security"
import { settingsService } from "ui-core"
// import axios from 'axios'
import { setOptions } from "safa-sketch"
import { checkVersion } from "ui-versioning"
import { appendUrls } from "./utils"
import createInstance from "./services/baseService"

export default {
  name: "App",
  components: {
    FormLauncherTabs,
    LayoutHeader,
    LayoutSidebar,
    UserTokenCoundDown,
    LoginValidation
  },
  mixins: [formLauncherMixin, idleTimerMixin],
  data () {
    return {
      fullVersion: build.version,
      launcherFormName: "",
      launcherFormProps: null,
      launcherFormEvents: null,
      isAuthorizing: true,
      authLoading: true,
      isLoginCompleted: false,
      layoutModeArgs: "",
      windows: [],
      showRemainDaysNotice: false,
      remainDays: -1,
      remainDaysNotice: "",
      isForbidden: false,
      isSso: false,
      loginType: "direct", // login | remote
      isValidUser: true,
      onlineNotifyTimer: null,
      showUserUnreadMessages: false
    }
  },
  computed: {
    buildVersion () {
      return `${this.fullVersion ?? ""}` // .substring(11)
    },
    viewMode () {
      if (this.isAuthorizing) return "authorizing" // authorizing...
      if (this.isForbidden) return "forbidden" // no access
      if (
        !this.isAuthenticated &&
        this.loginType === "remote" &&
        !this.isLoginCompleted
      ) {
        return "authorizing"
      } // try to login by remote
      if (
        ((!this.isAuthenticated && this.loginType === "direct") ||
          (!this.isLoginCompleted && this.loginType === "direct")) &&
        !this.isSso
      ) {
        return "login"
      }
      if (this.loginType === "remote") return "remote"
      if (this.isAuthenticated && this.isLoginCompleted) return "dashboard"

      return "none"
    },
    isSidebarVisible () {
      return (
        this.isAuthenticated &&
        !this.isAuthorizing &&
        !this.isForbidden &&
        this.isLoginCompleted &&
        this.loginType !== "remote"
      )
    },
    isHeaderVisible () {
      return (
        this.isAuthenticated &&
        !this.isAuthorizing &&
        !this.isForbidden &&
        this.isLoginCompleted &&
        this.loginType !== "remote"
      )
    },
    isOnline () {
      return this.$stSecurity.state.socket.online
    },
    expiryDate () {
      return this.$stSecurity.getters["authorize/expiryDate"]
    },
    layoutSeparatorClass () {
      return this.$store.getters["ui/layoutMode"] === "half" ? "" : "hide"
    },
    launcherLayout () {
      return this.isAuthenticated && this.loginType === "direct"
    },
    // isAuthenticated () {
    //   return this.$stSecurity.getters['authorize/isAuthenticated']
    // },
    layoutSplitterWidth () {
      return this.$store.getters["ui/layoutSplitterWidth"]
    },
    layoutMode () {
      // full,half,map
      return this.$store.getters["ui/layoutMode"]
    },
    ssoConfig () {
      return window.getConfigValue("sso", { enabled: false })
    }
  },
  methods: {
    async checkVersions () {
      const list = Object.entries(build.compatibility)
      const services = {
        security: {
          url: appendUrls([getConfigValue("securityBaseUrl"), "ping"]),
          cb: (res) => res.data.version,
          title: "سرویس سکیوریتی"
        },
        eng: {
          url: appendUrls([getConfigValue("eng"), "GetVersion"]),
          cb: (res) => {
            console.log(res.GetVersionResult)
            const ver = `${res.GetVersionResult ?? "is:"}`
              .split("is:")[1]
              .trim()
            return ver
          },
          title: "سرویس مهندسین"
        }
      }

      list.forEach((item) => {
        const [key, requiredVersion] = item
        const { url, cb, title, payload } = services[key] ?? {}

        const { createPostRequest } = createInstance({
          getBaseUrl: () => "baseUrl",
          serviceName: title
        })

        createPostRequest(url)(payload ?? {}).then(({ data }) => {
          const installedVersion = cb(data)

          if (installedVersion) {
            if (!checkVersion(installedVersion, requiredVersion, ">=")) {
              alert(
                `ورژن ${title} حداقل می بایست ${requiredVersion} یا بالاتر باشد.`
              )

              location.reload()
            }
          }
        })
      })
    },
    onDropRelease ($event) {
      $event.preventDefault()
      const parentElm = $event.target.closest("[aria-labelledby][aria-parent]")
      const droppedFormKey = $event.dataTransfer.getData("key")

      if (!parentElm || !droppedFormKey) return

      this.updateForm({
        formKey: droppedFormKey,
        side: parentElm.getAttribute("aria-labelledby").split("-")[0]
      })
    },
    isValidUserHandler (e) {
      this.isValidUser = e
    },
    async logout () {
      this.isLoginCompleted = false
      await this.$securityEvents.$emit("logout")
      this.isAuthorizing = false
    },
    getUserPermissions () {
      const user = this.$stSecurity.getters["authorize/user"]
      const groupsIds = user.UserGroups.map((g) => g.GroupGuid)
      return [...groupsIds, user.NidUser]
    },
    async loginSuccessfully () {
      const user = this.$stSecurity.getters["authorize/user"]
      const token = this.$stSecurity.getters["authorize/token"]
      const session = this.$stSecurity.getters["authorize/session"]
      if (!user) {
        console.log("**if(!user)")
        this.showWarning("اطلاعات کاربر یافت نشد.")
        return
      }

      const userGroups = this.$stSecurity.getters["authorize/user"].UserGroups
      const self = this
      setTimeout(() => {
        user.isSysAdmin && self.checkVersions() // left without await behined
      }, 3000)

      if (
        !user.isSysAdmin ||
        !window.getConfigValue("monitoringOptions.allowShowPanel", true)
      ) {
        // نمایش پنل مانیتورینگ به صورت تب مجزا در سرا 10
        this.$store.dispatch("formLauncher/removeForm", "monitoring")
      }

      this.showUserUnreadMessages = !window.getConfigValue(
        "security.suppressMessagePopup",
        false
      )

      // #start check valid user
      if (window.getConfigValue("checkingUserNationalCodeAfterLogin", false)) {
        await this.$refs.loginValidRef.isValidUser()
      }
      if (!this.isValidUser) return

      // #end check valid user
      this.startIdleTimer()

      if (getConfigValue("security.clearSessionOnCloseBrowser", true)) {
        socket.bindLogoutWhenCloseBrowser()
      }

      try {
        // #region set theme color vars
        // #endregion

        await this.$store.dispatch("formLauncher/removeAlForm")
        await this.$stKartable.dispatch("setFilter", null)

        settingsService.update({ getStore })

        // #region archive configuration
        /* const subsystems = [
          {
            name: "shahrsazi",
            id: "ACE63A06-E835-457D-A1EA-3B477DD9E69B",
            title: "شهرسازی",
          },
          {
            name: "income",
            id: "714C366C-1705-433D-970C-E04F6D62BD7D",
            title: "درآمد",
          },
          {
            name: "nosazi",
            id: "5159EC42-40B3-4A97-A3C4-653D3BA204AB",
            title: "نوسازی",
          },
          {
            name: "senfi",
            id: "4E4C0133-A224-4E34-AB34-A27A464E51DC",
            title: "عوارض صنفی",
          },
          {
            name: "engineer",
            id: "20C96248-C0C2-4DA0-BB07-9480B0C95DCE",
            title: "امور مهندسين ناظر",
          },
          {
            name: "fireFighting",
            id: "5fb05a4f-da31-4202-83d1-d7558d5e965a",
            title: "آتش نشانی",
          },
          {
            name: "insurance",
            id: "ae980dcf-08ef-4ff0-be47-30e18a8dcb6e",
            title: "بیمه",
          },
        ];

        for (let system of subsystems) {
          await axios.post(
            appendUrls([window.getConfigValue('securityBaseUrl'), `workspace/add-resource`]),
            {
              NidResource: system.id.toUpperCase(),
              NidWorkspace: build.workspaceId,
              NidParent: build.workspaceId,
              name: system.name,
              title: system.title,
              type: "sp",
              force: false,
              token: token,
            }
          );
        } */
        //
        // // eslint-disable-next-line no-undef
        // ClsResourcePermission.addResourceToStore(
        //   window.getConfigValue('securityBaseUrl'),
        //   session,
        //   token,
        //   build.workspaceId,
        //   build.workspaceId,
        //   true
        // )
        /*        console.group('%%%% this.$archiveSecurity.addResourceToStore')
                console.info('securityBaseUrl:', window.getConfigValue('securityBaseUrl'))
                console.info('session: ', session)
                console.info('token:', '[' + token.substring(0, 20) + '...]')
                console.info('nidParent: ', build.workspaceId)
                console.info('nidWorkSpace:', build.workspaceId)
                console.info('checkAccess: ', true)
                console.info('userGUID: ', user.NidUser)
                console.info('isSecurity8: ', false)
                console.groupEnd() */

        this.$archiveSecurity.addResourceToStore(
          window.getConfigValue("securityBaseUrl"), // آدرس سکیوریتی جدید یا قدیم
          session, // nidSession
          token, // token
          build.workspaceId, // nidParent
          build.workspaceId, // nidWorkSpace
          true, // checkAccess
          user.NidUser, // userGUID
          false // isSecurity8, false سکوریتی جدید
        )

        archiveStore.sendNidSessionAndToken = !!(
          window.getConfigValue("archive.sendNidSessionAndToken") ?? false
        )

        const archiveURG = [...this.getUserPermissions()]

        if (getConfigValue("archiveSendUserGroup", false)) {
          archiveURG.push(
            encodeURIComponent(
              userGroups.length > 0 ? userGroups[0].GroupTitel : "تعریف نشده"
            )
          )
        }
        archiveStore.URG = archiveURG
        archiveStore.userLoginName = user.FullName
        archiveStore.userLoginId = user.NidUser
        archiveStore.sortBy = window.getConfigValue(
          "ArchiveDefaultSort",
          archiveStore.sortBy
        )
        archiveStore.showUserNameWatermark = !!(
          window.getConfigValue("showUserNameWatermark") ?? false
        )
        archiveStore.SrvSecurity = window.getConfigValue("securityBaseUrl")
        archiveStore.usePriority = !!window.getConfigValue(
          "archiveConfig.usePriority",
          archiveStore.usePriority
        )
        archiveStore.highlightNewFile = !!window.getConfigValue(
          "archiveConfig.highlightNewFile",
          archiveStore.highlightNewFile
        )
        archiveStore.showTooltip = window.getConfigValue(
          "archiveConfig.showTooltip",
          archiveStore.showTooltip
        )
        archiveStore.tileHeightSize = window.getConfigValue(
          "archiveConfig.tileHeightSize",
          archiveStore.tileHeightSize
        )
        archiveStore.displayIndexNumber = window.getConfigValue(
          "archiveConfig.displayIndexNumber",
          archiveStore.displayIndexNumber
        )

        this.$store.dispatch(
          "archiveApi/setArchiveBaseUrl",
          window.getConfigValue("archiveCore")?.baseUrls[0]?.value
        )

        // #endregion

        // #region sketch configuration
        setOptions({
          headers: {
            token: token,
            sessionId: session
          }
        })
        // #endregion

        // #region set security remain days
        this.remainDays = this.$stSecurity.getters["authorize/remainDays"]
        const remainDaysLimit = window.getConfigValue("remainDays") || 30
        if (
          this.remainDays &&
          this.remainDays > -1 &&
          this.remainDays <= remainDaysLimit
        ) {
          const cleanNotice = (input) => {
            const searchValue = "{0}"
            const replacer = this.remainDays
            if (!input) return ""
            while (input.indexOf(searchValue) > -1) {
              input = input.replace(searchValue, replacer)
            }
            return input
          }
          this.remainDaysNotice = cleanNotice(
            window.getConfigValue("remainDaysNotice") ||
              `کاربر گرامی، تا {0} روز دیگر حساب کاربری شما غیرفعال خواهد شد.`
          )
          this.showRemainDaysNotice = true
          this.showInfo(this.remainDaysNotice)
        } else {
          this.showRemainDaysNotice = false
        }
        // #endregion

        // kais map configuration
        // this.$stMap.state.Token = token
        // this.$stMap.state.UserInfo = user
        // // console.log(this.$stSecurity.getters['authorize/user'])
        // this.$stMap.state.Config.UrlMapService = window.getConfigValue('srvMapUrl')
        const self = this

        const PanoSettings = {
          // layerSets: {
          //   '1392': [661],
          //   '1391': [1990],
          //   '1390': [4]
          // },
          // layerSet: '1392',
          ...window.getConfigValue("panoConfig"),
          panoService: window.getConfigValue("PanoUrl") // 'http://EsupService.mashhad.ir:8104/PanoService/'
        }

        // console.log(this.$KaisMap)
        await this.$KaisMap.InitMapConfig({
          PanoSettings,
          MapExportUrl: window.getConfigValue("MapExportUrl") || "",
          UrlMapService: window.getConfigValue("srvMapUrl") || "",
          UrlMapServiceSecond:
            window.getConfigValue(
              "srvMapUrl2",
              window.getConfigValue("srvMapUrl")
            ) || "",
          MapNetworkUrl: window.getConfigValue("MapNetworkUrl") || "",
          MapExportUrlFile: window.getConfigValue("MapExportUrlFile") || "",
          SecurityUrl: window.getConfigValue("securityBaseUrl") || "",
          WorkflowUrl: window.getConfigValue("workflow") || "",
          PngUrl: window.getConfigValue("PngUrl") || "",
          MapSerachUrl: window.getConfigValue("MapSerachUrl") || "",
          Lng: window.getConfigValue("mapConfig").long,
          Lat: window.getConfigValue("mapConfig").lat,
          Center: window.getConfigValue("mapConfig").center,
          Zoom: window.getConfigValue("mapConfig").zoom,
          MaxZoom: window.getConfigValue("mapConfig").maxZoom,
          Patterns: window.getConfigValue("mapConfig.patterns", {}),
          UserInfo: {
            FullName: `${user.firstName} ${user.lastName} (${user.username})`,
            IsSysAdmin: user.isSysAdmin,
            Domain: user.domain,
            NidUser: user.NidUser,
            GUID: user.NidUser
          },
          DomainName:
            user.domainNames !== "all"
              ? user.domainNames
              : window.getConfigValue("mapConfig.DefaultDomain"),
          Token: token,
          NidSession: session,
          DefaultSelectLayer:
            window.getConfigValue("mapConfig").DefaultSelectLayer,
          DefaultSelectLayerName:
            window.getConfigValue("mapConfig").DefaultSelectLayerName,
          DefaultSelectLayerBuffer: window.getConfigValue(
            "DefaultSelectLayerBuffer"
          ),
          PrintOptions: {
            title: window.getConfigValue(
              "mapConfig.PrintTitle",
              build.appTitle
            )
          },
          OnMapSelectionCallBack: function (Items, NidLayer) {
            // console.log('OnMapSelectionCallBack', Items, NidLayer)
            // alert(NidLayer)
            // alert(Items && Items.length > 0 ? Items[0].Code : '')

            self.$store.dispatch("map/setLocation", {
              NidLayer,
              Items
            })

            if (Items && Items.length > 0) {
              try {
                self.$KaisMap.ShowWkt(Items[0])
              } catch {}
            }
          },
          MapMode: "Select"
        })

        // endregion

        // #region statistics
        console.debug("NidUser", user.NidUser)
        console.debug(
          `statistics params`,
          `${window.getConfigValue("securityBaseUrl")}`, // آدرس سرویس سکوریتی
          window.getConfigValue(
            "StatisticReports.ParentID",
            "E577CFF0-99EF-4B93-B97E-697299F7161F"
          ), // شناسه پدر در سکوریتی
          window.getConfigValue(
            "StatisticReports.ID",
            "86FCC7AA-E0DD-4A55-ADEB-DE7FCF8DDE62"
          ), // شناسه برای گزارشات آماری
          "E577CFF0-99EF-4B93-B97E-697299F7161F", // شناسه برای Workspace
          user.NidUser, // آیدی کاربری که لاگین کرده
          true, // چک کردن سطح دسترسی با سکوریتی
          10
        )
        this.$srSecurity.set(
          `${window.getConfigValue("securityBaseUrl")}`, // آدرس سرویس سکوریتی
          window.getConfigValue(
            "StatisticReports.ParentID",
            "E577CFF0-99EF-4B93-B97E-697299F7161F"
          ), // شناسه پدر در سکوریتی
          window.getConfigValue(
            "StatisticReports.ID",
            "86FCC7AA-E0DD-4A55-ADEB-DE7FCF8DDE62"
          ), // شناسه برای گزارشات آماری
          "E577CFF0-99EF-4B93-B97E-697299F7161F", // شناسه برای Workspace
          user.NidUser, // آیدی کاربری که لاگین کرده
          true, // چک کردن سطح دسترسی با سکوریتی
          10, // نسخه سکوریتی(در صورت استفاده از سکوریتی جدید نسخه ای غیر از 8 وارد کنید),
          this.$stSecurity.getters["authorize/token"]
        )
        // #endregion

        if (window.getConfigValue("dashboard.show", false)) {
          await this.$store.dispatch("formLauncher/setForm", {
            formKey: "dashboard",
            formName: "Dashboard",
            title: "آنالیز سیستم",
            group: "system",
            color: "blue",
            lock: true,
            pin: true,
            index: 1
          })
          await this.$store.dispatch("formLauncher/setActiveForm", "kartable")
        }

        const engineerConfigGUIDs = window.getConfigValue(
          "engineer.userGroups",
          []
        )
        if (
          Array.isArray(engineerConfigGUIDs) &&
          engineerConfigGUIDs.length > 0 &&
          userGroups.some((e) =>
            engineerConfigGUIDs.some(
              (f) => e?.GroupGuid?.toLowerCase() === f.toLowerCase()
            )
          )
        ) {
          this.$store.dispatch("formLauncher/setForm", {
            formKey: "UKartableReferences",
            title: "کارتابل ارجاعات"
          })
        }

        this.isLoginCompleted = true
      } catch (ex) {
        console.warn("system could not able to get session for current user")
        console.error("login done error:", ex)
        this.isLoginCompleted = false
        await this.$securityEvents.$emit("logout")
      } finally {
        this.isAuthorizing = false
        this.clearURL()
        const primaryColor =
          this.$stSecurity.getters["sidebar/settings"].primaryColor
        const secondaryColor =
          this.$stSecurity.getters["sidebar/settings"].secondaryColor
        console.log(
          `%c Safarayaneh co %c Sara 10 v${build.version} %c`,
          `background: ${primaryColor} ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff`,
          `background: ${secondaryColor} ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff`,
          "background:transparent"
        )
        if (user.isSysAdmin) {
          try {
            let data = await fetchSystemResource()
            if (data) {
              this.$q.dialog({
                persistent: true,
                message: data,
                ok: {
                  label: "تایید"
                }
              })
            }
          } catch {}
        }
        // delete axios.defaults.headers.common.token
      }
    },
    updateWindows (windows) {
      this.windows = windows
    },
    setLayout (mode) {
      this.$store.dispatch("ui/setLayoutMode", mode)
    },
    setLayoutSplitterWidth (value) {
      this.$store.dispatch("ui/setLayoutWidth", value)
    },
    afterLogout () {
      this.stopIdleTimer()
      sessionStorage.clear()
      let url = new URL(window.location)
      url.searchParams.forEach((v, k) => {
        console.log(k)
        console.log("v", v)
        url.searchParams.delete(k)
      })
      window.history.pushState({}, "", url)
      location.reload()
    },
    bindEventBus () {
      const self = this
      this.$root.$on("setLayout", self.setLayout)
      this.$root.$on("setForm", self.setForm)
      this.$securityEvents.$on("logout:after", self.afterLogout)
    },
    unbindEventBus () {
      const self = this
      this.$root.$off("setLayout", self.setLayout)
      this.$root.$off("setForm", self.setForm)
      this.$securityEvents.$off("logout:after", self.afterLogout)
    },
    //  #region url helper
    getUrlParam (key) {
      return new URL(location.href).searchParams.get(key)
    },
    clearUrlParams () {
      /* let url = new URL(window.location)
      url.searchParams.delete('appKey')
      url.searchParams.delete('error')
      window.history.pushState({}, '', url) */
    },
    isUrlValid () {
      // const appKey = this.getUrlParam('appKey')
      // return appKey
      return true
    },
    showUrlErrorIfExist () {
      const err = this.getUrlParam("error")
      if (err) {
        this.$nextTick(() => {
          this.showError(err)
        })
      }
    },
    clearURL () {
      const u = new URL(window.location.href)
      u.search = ""
      window.history.pushState({}, "", u)
    },
    invalidAccessToken () {
      this.showWarning("توکن معتبر نمی باشد.")
      this.clearUrlParams()
      this.isAuthorizing = false
      this.isForbidden = true
    },
    // #endregion
    // #region tryLoginBySSO

    // #endregion tryLoginBySSO
    async tryLoginBySSO () {
      const NidSso = this.getUrlParam("NidSso") || this.getUrlParam("NidSSO")
      if (!NidSso) return

      this.isSso = true

      try {
        // this.isAuthorizing = true
        this.isAuthorizing = true
        const data = await this.$stSecurity.dispatch("authorize/verifySSO", {
          NidSso,
          type: this.getUrlParam("type")
        })

        this.authLoading = false
        if (data.success) {
          await this.loginSuccessfully()
          this.isAuthorizing = false
        } else {
          this.showInfo(data.msg || "خطا در اعتبارسنجی ورود یکپارچه")
          this.invalidAccessToken()
        }
        this.clearURL()
      } catch (ex) {
        this.isAuthorizing = false
        this.clearURL()
      } finally {
        // this.isAuthorizing = false
      }
    },
    // #region remote access
    async tryLoginByRemoteAccess () {
      const appKey = this.getUrlParam("appKey") || this.getUrlParam("appkey")
      if (!appKey) return
      try {
        this.isAuthorizing = true
        this.loginType = "remote"
        // verify api key (token)
        const Token = this.getUrlParam("token")
        const { data } = await this.$srvWorkflow.verifyApiKey(
          {
            ApiKey: appKey
          },
          {
            headers: {
              Token
            }
          }
        )
        const result = data.data
        const status = result.Status || result.status

        // "Status": "verified"
        // "Status": "NotValid"
        if (!status || status.toLowerCase() !== "verified") {
          this.invalidAccessToken()
          return
        }

        // set request params
        const parsedValue = JSON.parse(result.item.StrValue)
        const {
          userToken,
          session,
          // formName,
          nidProc,
          nosaziCode,
          bizCode,
          // expiryDate = null,
          mustLoginByCamera = false,
          hasActiveSession = false
        } = parsedValue

        /*
        {"formName":"UResponderOffice",
        "userToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGFxdWVJZCI6ImIzYzcwYTdlNTYzMzQ1MmM4OTcxMmQyZTg1MDYxNTA2NWQ2M2RkY2I2OWViNDYyMzk4NTk1MGE4ODM1ZTlhODkiLCJpYXQiOjE2ODM1MzI5MTUsImV4cCI6MTY4MzU0NzMxNSwiYXVkIjoiaHR0cHM6Ly9zYWZhcmF5YW5laC5jb20iLCJpc3MiOiJTZWN1cml0eSIsInN1YiI6IlNhZmFSYXlhbmVoIFNlY3VyaXR5IFNlcnZpY2UifQ.S77QTaoOH36vsdveLPTbwoyVk80uC1aH1X7nxVRhMhCjDpt9uAs9siEow6zSEEMJMn4Yj0zc8kpIexKZEo4sLFu-mBQ9X9bwo8KgySsyADn-IBXPeviRmp4_wVQF3a7ND7bvob1Vb6o1zZsFmi-FykayLgcJ5kIomOXdBUgIWYhuLVnLy7NrS-om6hotiCat5Xa1aoc5roGNKBW7b-SVGUAaezoGFT-dMJDv7ybOLP_s50e4FIo8z_j0FhZ-xjZghfgRCCBXLP9_5r0vbCdIf1NwPNzKdlOJfpMDxKr0R2RIZdYaAzCmYcHAGceWH64u_0otthat0OAJb0CmwCdszh0BBlM4Y3bEXcO5kxO2NhFHfnQxqGW_S39UZKOMbyXTZgB6gh49s0Yola2xI5zl5IH3_Jyrt8GC_UpxSUsqD5_7x0UmMe38uaUZOxo6kNUWGZIwgl5LK_Osotrae7-hsE7C9hQwK8B8Y0oPcTi1jBt8VzkbqESguJnqCWtor_BB3zZDJYgvRg3KsC-XlxcEd7FMb_RiKpZuSEreBK5mziljiwCx7iPQYMrWkbkwirK8ukBOv8ThHIplWuFYu9pvWPY6EigMpBfvgIKYc2tTYlQPsMT2eEPnYj74xGtYov5iJXngc0nHVYx3AhZUZZJXH5zM5x_7t1nYhGLP0fpNs1Y",
        "nidProc":"2f25c1be-8125-4da1-8b47-5b35ced7b689",
        "nosaziCode":"1-2-3-5-0-0-0",
        "bizCode":"1-2-3-5-0-0-0",
        "NidWorkItem":10029195,
        "NidWorkflowDeff":"f3f5dd79-9ea8-4dd6-ad9c-884fade86475",
        "session":"4586C880-B657-4983-89BA-D1AD14159BC3",
        "expiryDate":1683547315000,
        "$origin":"citizen-facility"}
        * */

        if (!session) {
          console.warn("فیلد session ارسال نشده است.")
          this.invalidAccessToken()
          return
        }
        // set user token
        // await this.$stSecurity.dispatch("authorize/setToken", userToken);
        const expiryDate = new Date().setTime(
          new Date().getTime() + 1 * 60 * 60 * 1000
        )
        await this.$stSecurity.dispatch("authorize/setToken", {
          token: userToken,
          URG: session,
          mustLoginByCamera,
          hasActiveSession,
          expiryDate
        })

        await this.$stSecurity.dispatch("authorize/refreshMyInfo")

        await this.loginSuccessfully()
        // this.clearUrlParams()
        this.launcherFormName = "UResponderOffice" // formName
        this.launcherFormProps = {
          nidProc,
          nosaziCode,
          bizCode,
          forceReadonly: true,
          embed: true
        }
      } finally {
        this.isAuthorizing = false
      }
    }
    // #endregion
    /* socketConnect () {
      if (socket.getSocket() && socket.getSocket().connected) return
      // const baseUrl = new URL(window.getConfigValue('socket.baseUrl') || window.getConfigValue('securityBaseUrl'))
      const { baseUrl, path, ...other } = window.getConfigValue("socket", {})
      const options = {
        enabled: true,
        reconnection: true,
        reconnectionDelay: 5000,
        reconnectionDelayMax: 30000,
        reconnectionAttempts: 10,
        autoConnect: true,
        ...(other || {})
      }

      if (options.enabled) {
        socket.connect(window.getConfigValue("securityBaseUrl"), {
          extraHeaders: {
            token: this.$stSecurity.getters["authorize/token"] || ""
          },
          ...options
        })
      }
    },
    socketDisconnect () {
      socket.disconnect()
      if (this.onlineNotifyTimer) this.onlineNotifyTimer()
    } */
  },
  async created () {
    this.bindEventBus()
    if (!this.isUrlValid()) {
      this.isAuthorizing = false
      this.isForbidden = true
      return
    }
    await this.tryLoginBySSO()
    await this.tryLoginByRemoteAccess()
    await this.showUrlErrorIfExist()
    await this.$nextTick()
    this.isAuthorizing = false
  },
  beforeDestroy () {
    // this.socketDisconnect()
    this.unbindEventBus()
  },
  mounted () {
    // this.socketConnect()
    /*    console.log(
          `%c Safarayaneh co %c ${build.workspaceName} - ${build.appName} v${build.version} %c`,
          'background:#0057b8 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
          'background:#5C95FF ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
          'background:transparent'
        ) */
    this.$nextTick(() => {
      document.documentElement.style.setProperty(
        "--archive-bg",
        getConfigValue("archiveConfig.backgroundColor", "transparent")
      )
    })
  },
  watch: {
    isOnline () {
      if (this.isOnline) {
        if (this.onlineNotifyTimer) {
          this.onlineNotifyTimer({
            type: "positive",
            message: "اتصال برقرار است.",
            timeout: 1000,
            position: "bottom-right"
          })

          setTimeout(() => {
            this.onlineNotifyTimer()
          }, 4000)
        }
      } else {
        this.onlineNotifyTimer = this.$q.notify({
          type: "ongoing",
          message: "در حال برقراری ارتباط با سرور.",
          position: "bottom-right"
        })

        this.socketConnect()
      }
    }
  }
}
</script>
<style lang="scss">
#remote-form {
  section.form-wrapper {
    padding: 0 !important;
    border-radius: 0;

    > .q-layout-container {
      min-height: 100vh !important;
      height: 100vh !important;
      max-height: 100vh;
    }

    .fw-close-btn {
      display: none;
    }
  }
}

.map-splitter {
  padding: 0;
  background-color: #eee;
  height: calc(100vh - 50px);
}

#special-layout .q-layout {
  height: 100%;
}

.q-splitter__separator.hide {
  display: none;
  pointer-events: none;
}

.remain-days {
  background-color: #fff;
  border-radius: 4px;
  line-height: normal;
  padding: 0 6px;
  position: relative;
  color: #2d2d2d;

  span {
    font-size: 10px;

    b {
      font-size: 20px;
      color: var(--q-color-primary);
    }
  }

  .q-icon {
    transition: 0.5s all ease;
  }
}

.remote-form-wrapper {
  .form-wrapper {
    margin: 0 !important;
    padding: 0 !important;
  }

  .form-tab {
    position: relative;
    height: 100%;
    max-height: 100%;

    > * {
      height: 100%;
      width: 100%;
      max-height: 100% !important;
      min-height: 100% !important;
      overflow: auto;
    }
  }
}

#form-place.remote-form > section.safa-form {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;

  > section.form-wrapper {
    padding: 0 !important;
  }
}

.remote-access {
  width: 100vw;
  height: 100vh;
  background-color: #c8f5eb;
  color: var(--q-color-primary);
  z-index: 0;
}

#forbidden-page {
  background: #fff0e8;
  width: 100vw;
  height: 100vh;
  border: 6px solid #ff8f00;
  text-shadow: 1px 1px 4px #fff;

  > h4 {
    font-size: 1.7rem;
    font-weight: 500;
    letter-spacing: 0;
  }
}

section.form-wrapper[container="remote-form"] {
  padding: 0 !important;
  height: 100%;
  position: absolute;
  width: 100%;

  span.fw-close-btn {
    display: none !important;
    pointer-events: none !important;
    user-select: none;
  }
}

.overFlow .fit--placeholder.full-width.full-height.no-wrap.column {
  overflow: hidden !important;
}

main#login-form .q-field__control {
  background: none !important;
}
</style>
