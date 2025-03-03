<template>
  <Sidebar2
    @select:menu="onMenuClick"
    @select:group="onParentClick"
    @action:profile="profileOnClick"
    @action:logout="logoutOnClick"
    @update:path="updatePath"
    :normalize-sidebar-item="normalizeSidebarMenu"
    v-if="isLoggedIn"
    :options="{ addResource: true, forceUpdate: false }"
    :workspace="{
      id: 'E577CFF0-99EF-4B93-B97E-697299F7161F',
      name: 'Esup',
      title: 'ایساپ'
    }"
    :menuItems="menuItems"
  >
    <template #mini_top="{ dark }">
      <q-avatar
        style="border-radius: 0; min-width: 0; width: 58px; height: 48px"
      >
        <q-img
          width="100%"
          :img-style="{ filter: !dark ? 'invert(1)' : 'none' }"
          height="100%"
          contain
          src="images/app-logo.png"
        />
      </q-avatar>
    </template>
    <template
      #top="{ selectedMenu, currentPath, selectMenu, back, isRoot, dark }"
    >
      <!--      <div>
              <q-btn @click="archiveTest" size="lg">Archive Test</q-btn>
            </div>-->
      <transition name="fade">
        <q-list
          :dark="dark"
          :class="{ 'q-mb-md q-pt-md': isRoot }"
          :style="!isRoot ? 'transition: .3s all ease' : ''"
        >
          <q-item
            class="no-pointer-events no-pointer-events--children"
            :dark="dark"
            style="min-width: 239px; max-width: 239px"
          >
            <q-item-section avatar style="padding-left: 8px">
              <q-avatar
                :size="isRoot ? '72px' : '42px'"
                style="border-radius: 0; min-width: 0"
              >
                <q-img
                  :img-style="{ filter: !dark ? 'invert(1)' : 'none' }"
                  width="100%"
                  height="100%"
                  contain
                  src="images/app-logo.png"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label
                :style="{ fontSize: isRoot ? '16px' : '14px' }"
                class="text-justify text-bold q-px-sm"
              >
                سـامانه یـــکپــارچـه
                <br/>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </transition>
    </template>
    <!--    <template #bottom>
          <q-separator/>
          <div class="text-center q-py-sm"
               style="letter-spacing: 2px; direction: ltr; word-spacing: 20px; font-size: 11px; color: rgba(255,255,255,.7)">
            {{ buildVersion }}
          </div>
        </template>-->
  </Sidebar2>
  <!--  <div class="sidebar">
      <q-drawer
        :bordered="isShowSidebar"
        :content-class="isDarkMode ? 'bg-dark text-light' : 'sidebar-text'"
        :mini="isMini"
        :mini-width="50"
        :overlay="isOverlay"
        behavior="desktop"
        :value="true"
        :width="240"
        @before-hide="beforeHide"
        elevated
        side="left"
        style="overflow-y: hidden !important; overflow-x: hidden !important;"
      >
        <sidebar-menu :class="{'is-mini': !isShowSidebar}" :mini="false" add-if-not-exist :menu-items="menuItems"
                      @path:changed="pathChanged"
                      @menu:click="onMenuClick" @parent:click="onParentClick" :forceUpdate="true">
          <template #before>
            <q-btn
              @click="toggleSidebarVisibility"
              class="absolute-top-left q-ma-sm text-theme-color"
              dense
              flat
              round
              size="md"
            >
              <q-icon :name="isShowSidebar?'close':'menu'"/>
            </q-btn>

            <q-list class="q-mb-lg q-pt-lg">
              <transition name="fade">
                <q-item
                  class="q-mb-md no-pointer-events no-pointer-events&#45;&#45;children"
                  style="min-width: 239px;max-width: 239px;"
                  v-show="isShowSidebar"
                >
                  <q-item-section avatar>
                    <q-avatar style="border-radius: 0; height: 64px; width: 80px">
                      <q-img contain src="images/app-logo.png"/>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label
                      class="text-justify text-bold q-px-sm"
                      style="font-size: 16px"
                    >
                      سـامانه یـــکپــارچـه
                      <br/>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </transition>
            </q-list>
          </template>
          <template #after>
            <BottomImage :show="isRootMenu && isShowSidebar"/>
            <div v-show="!isShowSidebar && isRootMenu"
                 class="q-ma-xs no-pointer-events no-pointer-events&#45;&#45;children">
              <q-img contain width="42px" src="images/app-logo.png"/>
            </div>
          </template>
        </sidebar-menu>
      </q-drawer>
    </div>-->
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import sidebar from '../../../sidebar'

export default {
  name: 'Sidebar',
  mixins: [baseFormMixin],

  data () {
    return {
      menuItems: sidebar
      // buildVersion: build.version
    }
  },
  computed: {
    isLoggedIn () {
      return this.$stSecurity.getters['authorize/isAuthenticated']
    }
  },
  methods: {
    normalizeSidebarMenu (item) {
      // translates['forms']['UPeace']['title'] => forms_UPeace_title
      item.title = (this.$translate && this.$translate(`forms_${item.name}_title`, item.title)) || item.title
      return item
    },
    /* archiveTest () {
      try {
        // const token = await this.$store.dispatch('archiveApi/fetchToken', window.getConfigValue('archiveTablet'))
        this.$store.dispatch('archiveApi/resetToken', { username: 'aa', password: 'uu' })
      } catch (ex) {
        console.log(ex)
      }
    }, */
    /* pathChanged ({ isRoot, path }) {
       this.isRootMenu = isRoot
       this.isCommissionMenuClicked = !this.isCommissionMenuClicked
       if (path.toLowerCase() === 'badbf938-ee27-414f-8df4-6fa440f8fa70') {
         this.setForm({ formKey: 'UCommissionKartablePasokhgo', title: 'کارتابل پاسخگو کمیسیون', icon: 'find_in_page' })
         this.setForm({ formKey: 'UKartableCommission', title: 'کارتابل کمیسیون' })
       }
       if (path === '3AC2F99D-1EA6-4E5B-A8FD-7581627E903E') {
         this.setForm({ formKey: 'UKartableCommission77', title: 'کارتابل کمیسیون77' })
       }
       if (path.toLowerCase() === '7b72db32-6690-4ece-9ea4-9f234cf42830') {
         this.setForm({ formKey: 'UKartableReferences', title: 'کارتابل ارجاعات' })
       }
     }, */
    onSynchronizeMenuClick (menu) {
      switch (`${menu.name}`.toLowerCase()) {
        case 'commission':
          let hasAccess =
            this.$stSecurity.state.sidebar.menuItems.find(
              (menu) => menu.id === 'F2C30863-551E-4FB0-924F-2DDFA86353B9'
            ) ?? false
          if (hasAccess) {
            this.setForm({
              formKey: 'UCommissionKartablePasokhgo',
              title: 'کارتابل پاسخگو کمیسیون',
              icon: 'find_in_page'
            })
          }
          this.setForm({
            formKey: 'UKartableCommission',
            title: 'کارتابل کمیسیون'
          })

          this.$nextTick(() => {
            const children =
              this.$stSecurity.getters['sidebar/currentMenuItems'] ?? []
            const child = children.find(
              (m) =>
                m.name === 'UCommissionInformation' ||
                m.id === '35A72A90-B3F3-45F8-8170-47594237601C'
            )
            if (child) {
              this.$stSecurity.dispatch('sidebar/forward', child)
            }
          })
          break
        case 'supervisoreng':
          this.setForm({ formKey: 'EngineerKartable', title: 'کارتابل پاسخگو' })
          this.setForm({
            formKey: 'AcceptBuildingExeReport',
            title: 'کارتابل گزارشات مرحله ای'
          })
          break
        case 'dabirkhanecommission77':
          this.setForm({
            formKey: 'UKartableCommission77',
            title: 'کارتابل کمیسیون77'
          })

          this.$nextTick(() => {
            const children =
              this.$stSecurity.getters['sidebar/currentMenuItems'] ?? []
            const child = children.find(
              (m) =>
                m.name === 'Parvande' ||
                m.id === '9FDCF0D9-F918-42DF-B74A-390DC5D3580B'
            )
            if (child) {
              this.$stSecurity.dispatch('sidebar/forward', child)
            }
          })
          break
        case 'supervisoroperationeng':
          this.setForm({
            formKey: 'UKartableReferences',
            title: 'کارتابل ارجاعات'
          })
          break
        case 'dashboard':
          // this.selectedRootMenu = ''
          this.dashboardOnClick()
          break
        case 'kartable':
          // this.selectedRootMenu = ''
          this.kartableOnClick()
          break
        case 'statisticreports':
          // this.selectedRootMenu = ''
          this.setForm({ formKey: 'StatisticReports', title: 'گزارشات آماری' })
          break
        case 'mapdetails':
          // this.selectedRootMenu = ''
          this.setForm({ formKey: 'MapDetails', title: 'اطلاعات نقشه' })
          break
        case 'dutymain':
          this.setForm({ formKey: 'DutyMain' + Math.floor(10000 + Math.random() * 90000), title: 'نوسازی موردی', formName: 'DutyMain' })
          break
        case 'usenfimoreditabs':
          this.setForm({ formKey: 'USenfiMorediTabs' + Math.floor(10000 + Math.random() * 90000), title: 'صنفی موردی', formName: 'USenfiMorediTabs' })
          break
      }
    },
    onParentClick (menu) {
      this.onSynchronizeMenuClick(menu)
    },
    onMenuClick (menu) {
      this.onSynchronizeMenuClick(menu)
      if (menu.name) {
        this.showSidebar(menu.name, { ...menu })
      }
      // console.log(
      //   `%c${menu.name}`,
      //   'background:#bbb; padding: 1px 4px; border-radius: 3px;  color: #fff'
      // )

      // switch (menu.name) {
      //   case 'dashboard':
      //     // this.selectedRootMenu = ''
      //     this.dashboardOnClick()
      //     break
      //   case 'kartable':
      //     // this.selectedRootMenu = ''
      //     this.kartableOnClick()
      //     break
      //   case 'profile':
      //     // this.selectedRootMenu = ''
      //     this.profileOnClick()
      //     break
      //   case 'logout':
      //     // this.selectedRootMenu = ''
      //     this.logoutOnClick()
      //     break
      //   case 'statisticsReports':
      //     // this.selectedRootMenu = ''
      //     this.setForm({ formKey: 'StatisticReports', title: 'گزارشات آماری' })
      //     break
      //   default:
      //     // this.$store.dispatch('ui/setSidebarVisibility', true)
      //     if (menu.name) {
      //       // this.setForm(menu.name)
      //       this.showSidebar(menu.name, { ...menu })
      //       // this.$router.push(menu.link || '/')
      //     }
      //     break
      // }
    },
    dashboardOnClick () {
      this.$stKartable.dispatch('setActiveContainer', 'default')
      this.setForm({ formKey: 'dashboard', title: 'داشبورد' })
    },
    kartableOnClick () {
      this.setForm({ formKey: 'kartable', title: 'کارتابل', layout: 1 })
    },
    profileOnClick () {
      this.setForm({ formKey: 'profile', title: 'پروفایل' })
    },
    logoutOnClick () {
      this.logout()
    },
    updatePath (p) {
      if (!p || !p.length) {
        this.$stSecurity.dispatch('sidebar/searching', '')
      }
    }
    /*    isSelected (link) {
          return this.currentRoute === link
        } */
  }
}
</script>
