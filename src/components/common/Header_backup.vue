<template>
  <q-header :style="headerStyles">
    <safa-form caption="هدر بالا" id="10BEE76D-F344-4B5D-897A-191007330AB4">
      <q-toolbar :class="{'column q-py-sm': $q.screen.lt.sm}">
        <div class="col-12 col-sm-auto">
          <div class="row q-col-gutter-md items-center">
            <span class="col-auto">
            <q-btn
              @click="toggleSidebarVisibility"
              flat
              round
              icon="menu"/></span>

            <!--<safa-securityPanel
              caption="داشبورد"
              class="col-auto"
              id="ED7F89DD-3F8C-48E7-B4A3-A56BF7DDF3A5"
              tag="span"
            >
              <q-btn
                @click="setForm('dashboard')"
                class="q-px-sm"
                color="white"
                dense
                flat
                rounded
              >
                <q-icon
                  color="white"
                  size="17px"
                >
                  <svg height="20.031" viewBox="0 0 20 20.031" width="20" xmlns="http://www.w3.org/2000/svg">
                    <g id="Dashboard" transform="translate(0 0)">
                      <rect data-name="Rectangle 1689" fill="none" height="20" id="Rectangle_1689"
                            transform="translate(0 0.03)" width="20"/>
                      <path d="M4.5,15.628h8.889V4.5H4.5Zm0,8.9h8.889V17.854H4.5Zm11.111,0H24.5V13.4H15.611Zm0-20.031v6.677H24.5V4.5Z" data-name="Icon material-dashboard"
                            fill="#fff"
                            id="Icon_material-dashboard" transform="translate(-4.5 -4.5)"/>
                    </g>
                  </svg>
                </q-icon>&nbsp;
                داشبورد
              </q-btn>
            </safa-securityPanel>
            <div class="col-auto">|</div>-->
            <!--            <safa-securityPanel
                          caption="نقشه"
                          class="col-auto"
                          id="4b05d9e2-734c-4c6d-8c5a-f1b2b0b945a4"
                          tag="span"
                        >
                          <q-btn
                            @click="setForm({formKey: 'largemap',title: 'نقشه',fit: true, layout: 1})"
                            class="q-px-sm text-theme-color"
                            flat
                            unelevated
                            rounded
                            size="12px"
                          >
                            <q-icon
                              class="text-theme-color"
                              size="18px"
                            >
                              <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <g id="Naghshe" transform="translate(0.034 0.001)">
                                  <rect data-name="Rectangle 1698" fill="none" height="20" id="Rectangle_1698"
                                        transform="translate(-0.034 -0.001)" width="20"/>
                                  <path
                                    d="M-5071.274-4082.03v-8.655c.144.165.259.288.367.418a1.913,1.913,0,0,0,1.133.706,1.806,1.806,0,0,0,1.775-.6,27.194,27.194,0,0,0,2.265-2.875c.235-.347.466-.7.7-1.046v9.243a.808.808,0,0,1-.541.533q-1.882.741-3.754,1.5c-.637.255-1.271.518-1.905.777Zm-13.215,0a.725.725,0,0,1-.511-.794q.012-5.546,0-11.093a.7.7,0,0,1,.541-.813l5.492-2.2c.059-.023.12-.043.207-.075v.222q0,6.171.005,12.34a.264.264,0,0,1-.2.292q-2.605,1.032-5.2,2.076a.343.343,0,0,0-.062.041Zm11.787-.277q-2.322-.928-4.643-1.854a.226.226,0,0,1-.168-.253q.006-6.2,0-12.4v-.2l.562.222c.722.29,1.446.577,2.166.869a.373.373,0,0,1,.2.161,16.152,16.152,0,0,0,1.933,3.3.69.69,0,0,1,.138.429q-.006,4.765,0,9.532v.246C-5072.6-4082.269-5072.65-4082.285-5072.7-4082.306Zm2.81-8.7a25.1,25.1,0,0,1-2.993-4.077,6.879,6.879,0,0,1-.8-1.935,3.709,3.709,0,0,1,.3-2.374,4.3,4.3,0,0,1,3.083-2.51,4.364,4.364,0,0,1,4.955,2.662,12.344,12.344,0,0,1,.318,1.22v.623a12.249,12.249,0,0,1-2.685,4.946c-.371.492-.778.958-1.179,1.428a.67.67,0,0,1-.507.261A.648.648,0,0,1-5069.893-4091Zm-1.381-6.636a1.888,1.888,0,0,0,1.865,1.882,1.888,1.888,0,0,0,1.877-1.87,1.886,1.886,0,0,0-1.854-1.872h-.029A1.889,1.889,0,0,0-5071.273-4097.638Z"
                                    data-name="Union 74"
                                    fill="#fff"
                                    id="Union_74" transform="translate(5085 4102)"/>
                                </g>
                              </svg>
                            </q-icon>&nbsp;
                            نقشه
                          </q-btn>
                        </safa-securityPanel>-->
            <safa-securityPanel
              caption="فرم پاسخگو"
              class="col-auto"
              id="0c1539ba-9491-48ff-bac4-2b356bf111f0"
              tag="span"
            >
              <q-btn
                @click="setForm({formKey: 'UResponder',title: 'فرم پاسخگو',layout: 1})"
                class="q-px-sm text-theme-color"
                dense
                flat
                rounded
                size="11px"
              >
                <q-icon
                  class="text-theme-color"
                  size="19px"
                >
                  <svg height="20" viewBox="0 0 20.316 20" width="20.316" xmlns="http://www.w3.org/2000/svg">
                    <g data-name="Form pasokhgoo" id="Form_pasokhgoo" transform="translate(0.001 0)">
                      <rect data-name="Rectangle 1696" fill="none" height="20" id="Rectangle_1696"
                            transform="translate(0.315 0)" width="20"/>
                      <path
                        d="M-5065.128-4031c-.324-.008-.648,0-.974,0a1.287,1.287,0,0,1-.489-.331c-.638-.645-1.285-1.281-1.92-1.932a.261.261,0,0,0-.387-.045,4.473,4.473,0,0,1-6.706-3.188,4.487,4.487,0,0,1,3.924-5.116,4.479,4.479,0,0,1,4.948,3.909,4.374,4.374,0,0,1-.6,2.825.263.263,0,0,0,.046.389c.653.639,1.3,1.292,1.942,1.937a1.233,1.233,0,0,1,.315.476c0,.325,0,.651,0,.976,0,.083-.016.1-.094.1Zm-8.786-6.167a2.738,2.738,0,0,0,2.736,2.731,2.706,2.706,0,0,0,2.726-2.727,2.709,2.709,0,0,0-2.723-2.741h-.034A2.748,2.748,0,0,0-5073.914-4037.166Zm-2.086,3.628q-3.35,0-6.7,0a2.3,2.3,0,0,1-2.3-2.264q0-6.474,0-12.949a2.2,2.2,0,0,1,.56-1.462,2.531,2.531,0,0,1,1.363-.786h10.573l.249.068a2.289,2.289,0,0,1,1.7,2.116c.018,1.844,0,3.687.009,5.531,0,.149-.054.211-.209.206a5.232,5.232,0,0,0-.968.071,6.039,6.039,0,0,0-5.176,5.6,5.742,5.742,0,0,0,1.017,3.635c.041.061.13.125.083.2a.1.1,0,0,1-.091.039C-5075.925-4033.531-5075.966-4033.538-5076-4033.538Zm-1.4-5.861a.857.857,0,0,0,.508-.138.79.79,0,0,0,.326-.872.823.823,0,0,0-.83-.6c-1.39-.006-2.78,0-4.169,0a.879.879,0,0,0-.471.133.8.8,0,0,0-.352.9.789.789,0,0,0,.759.578c.714.008,1.429,0,2.145,0v0h2.084Zm-4.188-4.926a.821.821,0,0,0-.837.8.818.818,0,0,0,.82.812q3.825.006,7.649,0a.778.778,0,0,0,.582-.251.747.747,0,0,0,.166-.849.763.763,0,0,0-.752-.507c-1.272-.005-2.543,0-3.814,0h-2.181Zm-.342-3.256a.809.809,0,0,0-.482.839.814.814,0,0,0,.822.707q1.688.019,3.378,0a.826.826,0,0,0,.834-.824.815.815,0,0,0-.864-.782c-.55-.005-1.1,0-1.65,0h-1.649A.949.949,0,0,0-5081.926-4047.581Z"
                        data-name="Union 73"
                        fill="#fff"
                        id="Union_73" transform="translate(5085 4051)"/>
                    </g>
                  </svg>
                </q-icon>&nbsp;
                فرم پاسخگو
              </q-btn>
            </safa-securityPanel>
            <span class="col-auto">
            <q-btn
              @click="setForm({formKey: 'KartablePasokhgoo',title: 'کارتابل پاسخگو',layout: 1, color: '#4534b9', icon: 'find_in_page'})"
              class="q-px-sm text-theme-color"
              dense
              flat
              rounded
              size="11px"
            >
              <q-icon
                class="text-theme-color"
                size="19px"
                name="find_in_page"/>&nbsp;
              کارتابل پاسخگو
            </q-btn></span>
            <span class="col-auto">
              <q-separator style="height: 12px;background-color: var(--text-theme-color);" vertical/>
            </span>
            <span class="col-auto">
              <div class="flex items-center" style="min-width: 220px;">
                <div class="col-auto">
                  <q-btn
                    @click="setLayout('full')"
                    unelevated
                    size="12px"
                    flat
                    round
                    title="نمایش تمام صفحه"
                  >
                    <q-icon class="text-theme-color" name="crop_free" size="18px"/>
                  </q-btn>
                </div>
                <div class="col q-px-sm flex items-center">
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
                    class="text-theme-color"
                    unelevated
                    size="12px"
                    flat
                    round
                    title="نمایش نقشه"
                  >
                <q-icon size="18px">
                  <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <g id="Naghshe" transform="translate(0.034 0.001)">
                      <rect data-name="Rectangle 1698" fill="none" height="20" id="Rectangle_1698"
                            transform="translate(-0.034 -0.001)" width="20"/>
                      <path
                        d="M-5071.274-4082.03v-8.655c.144.165.259.288.367.418a1.913,1.913,0,0,0,1.133.706,1.806,1.806,0,0,0,1.775-.6,27.194,27.194,0,0,0,2.265-2.875c.235-.347.466-.7.7-1.046v9.243a.808.808,0,0,1-.541.533q-1.882.741-3.754,1.5c-.637.255-1.271.518-1.905.777Zm-13.215,0a.725.725,0,0,1-.511-.794q.012-5.546,0-11.093a.7.7,0,0,1,.541-.813l5.492-2.2c.059-.023.12-.043.207-.075v.222q0,6.171.005,12.34a.264.264,0,0,1-.2.292q-2.605,1.032-5.2,2.076a.343.343,0,0,0-.062.041Zm11.787-.277q-2.322-.928-4.643-1.854a.226.226,0,0,1-.168-.253q.006-6.2,0-12.4v-.2l.562.222c.722.29,1.446.577,2.166.869a.373.373,0,0,1,.2.161,16.152,16.152,0,0,0,1.933,3.3.69.69,0,0,1,.138.429q-.006,4.765,0,9.532v.246C-5072.6-4082.269-5072.65-4082.285-5072.7-4082.306Zm2.81-8.7a25.1,25.1,0,0,1-2.993-4.077,6.879,6.879,0,0,1-.8-1.935,3.709,3.709,0,0,1,.3-2.374,4.3,4.3,0,0,1,3.083-2.51,4.364,4.364,0,0,1,4.955,2.662,12.344,12.344,0,0,1,.318,1.22v.623a12.249,12.249,0,0,1-2.685,4.946c-.371.492-.778.958-1.179,1.428a.67.67,0,0,1-.507.261A.648.648,0,0,1-5069.893-4091Zm-1.381-6.636a1.888,1.888,0,0,0,1.865,1.882,1.888,1.888,0,0,0,1.877-1.87,1.886,1.886,0,0,0-1.854-1.872h-.029A1.889,1.889,0,0,0-5071.273-4097.638Z"
                        data-name="Union 74"
                        style="fill: var(--text-theme-color)"
                        id="Union_74" transform="translate(5085 4102)"/>
                    </g>
                  </svg>
                </q-icon>
              </q-btn>
                </div>
              </div>
            </span>

            <span class="col-auto" v-show="layoutMode!=='full'">
              <q-separator style="height: 12px;background-color: var(--text-theme-color);" vertical/>
            </span>
            <div class="col-auto">
              <transition name="fade">
                <MapNosaziSearchBox v-show="layoutMode!=='full'"/>
              </transition>
            </div>
          </div>
        </div>
        <q-space/>
        <div class="col-12 col-sm-auto flex q-gutter-x-xs items-center">
          <!--          <q-btn @click="showArchivePopup" size="sm" label="Show Archive Popup"/>-->
          <slot/>
          <!--          <div class="q-px-sm">
                      <q-badge
                        dir="ltr"
                        :class="$q.dark.isActive?'bg-dark-lighten text-white' : 'bg-white text-primary'"
                      >{{ buildVersion }}
                      </q-badge>
                    </div>-->
          <div>
            <q-btn
              size="12px"
              icon="palette"
              round
              flat
              unelevated
            >
              <q-popup-proxy @hide="resetPrimaryColor">
                <div class="theme-color-picker column items-start"
                     style="width: 410px; height: 450px;max-width: 80vw; max-height: 80vh">
                  <div class="col-auto" style="width: 100%;">
                    <q-color flat square no-header-tabs no-footer no-header :value="selectedPrimaryColor"
                             @input="setPrimaryColor" default-view="spectrum"/>
                  </div>
                  <div class="col-auto" style="width: 100%; height: 3px">
                    <q-separator inset/>
                  </div>
                  <div class="col q-pa-sm justify-center custom-scroll row items-center">
                    <div @click="setPrimaryColor(color)" v-for="(color,i) in paletteColors" :key="i"
                         class="color-preview q-pa-xs col-auto"
                         :class="{'active-color': color.baseColor === selectedPrimaryColor}">
                      <div class="fit cursor-pointer"
                           :style="{background: typeof color === 'string'? color: color.gradient, borderRadius: '50%'}"></div>
                    </div>
                  </div>
                  <div class="col-auto" style="width: 100%; height: 3px">
                    <q-separator inset/>
                  </div>
                  <div class="flex items-center justify-between q-py-sm q-px-md full-width">
                    <div style="width: calc(50% - 5px);">
                      <q-btn
                        size="12px"
                        icon="save"
                        label="ثبت تغییرات"
                        @click="savePrimaryColor"
                        color="primary"
                        class="full-width"
                        v-close-popup
                      />
                    </div>
                    <div style="width: calc(50% - 5px);">
                      <q-btn
                        size="12px"
                        icon="close"
                        label="ریست"
                        @click="resetPrimaryColor"
                        color="primary"
                        class="full-width"
                        outline
                      />
                    </div>
                  </div>
                </div>
                <!--                <div class="theme-color-picker" style="width: 300px; height: 284px;">
                                  <q-color flat square :value="primaryColor" default-view="palette" :palette="['linear-gradient(to right, #1a2980, #26d0ce)','linear-gradient(to right, #aa076b, #61045f)','#0099e5','#34bf49', '#00a98f', '#cf8d2e', '#ecc400', '#371777', '#fbb034', '#00a4e4', '#6a737b', '#0abf53', '#037ef3', '#7d3f98', '#f47721',
                                '#7552cc', '#7d3f98', '#0cb9c1', '#fd5c63', '#0085ad', '#4298b5', '#005670', '#009f4d', '#a51890', '#0077c8', '#1a73e8', '#008eaa',
                                '#8e43e7', '#61e064', '#00aeff', '#003666', '#aac1bf', '#007cc0', '#6d6e70', '#537b35', '#ecb731', '#0091cd', '#ee3423', '#9f9fa3', '#1c79c0',
                                '#007fbd', '#1aafd0', '#1aafd0', '#013ca6', '#6639b7', '#a626aa', '#2529d8', '#2754ba', '#553a99', '#553a99',
                                '#6561ac', '#0087d2', '#47cf73', '#0ebeff', '#2db928', '#00cc99', '#005be2', '#a560e8', '#6633cc', '#6d1d7c', '#810061','#5851db']"
                                           @input="setPrimaryColor"/>
                                </div>-->
              </q-popup-proxy>
            </q-btn>
          </div>
          <div>
            <q-btn
              size="12px"
              :icon="$q.dark.isActive?'light_mode':'dark_mode'"
              @click="setDarkMode(!$q.dark.isActive)"
              round
              flat
              unelevated
            />
          </div>
          <div>
            <q-btn
              size="12px"
              icon="campaign"
              @click="showBulettin"
              round
              flat
              unelevated
            >
              <q-badge v-if="bulletinCount>0" :label="bulletinCount" align="top" style="top: 0;"
                       :color="'red'" floating rounded/>
            </q-btn>
          </div>
          <div>
            <q-btn
              size="12px"
              icon="help"
              @click="openHelpDialog"
              round
              flat
              unelevated
            />
          </div>
          <div></div>
          <div class="flex align-center items-center cursor-pointer">
            <a dir="ltr" class="relative-position flex items-center" :class="{'substitute-active':loginAsSubstitution}"
               href="javascript:"
               :aria-label="`Sara10 Account: ${getUserDisplayName()}`" role="button">
              <user-avatar :name="userFullname" :src="currentUser.GUID | avatar" size="36px"/>
              <span
                style="display: inline-block; margin-left: -20px;border-radius: 100%;"
                v-if="loginAsSubstitution && selectedSession && selectedSession.user">
              <user-avatar
                :name="`${getFullName(selectedSession.user)}`"
                :src="selectedSession.user.NidUser | avatar" size="36px"/>
                <q-icon name="swap_horiz" class="substitute--arrow bg-amber-7 text-white"/>
                </span>
            </a>
            <div class="row q-mx-md items-center">
              <div style="font-size: 11px;"
                   :title="`${getUserDisplayName()}`">
                <p class="q-ma-none">{{ currentUser.firstName }} {{ currentUser.lastName }}</p>
                <p class="q-ma-none ellipsis" style="opacity: .5; max-width: 70px;">{{ currentUser.domainNames }}</p>
              </div>
              <q-btn dense flat icon="expand_more" round size="sm"/>
            </div>
            <q-menu :offset="[0, 12]" content-style="min-width: 280px;" max-width="280px">
              <q-card flat>
                <q-card-section class="column full-width items-center justify-center">
                  <q-btn flat round @click="backToMainAccount" v-if="loginAsSubstitution"
                         class="absolute-top-left q-ma-md" size="md" icon="radio_button_unchecked" color="grey"/>
                  <div class="q-mb-sm">
                    <user-avatar :name="userFullname" :src="currentUser.GUID | avatar"
                                 :size="loginAsSubstitution?'48px':'128px'"/>
                  </div>
                  <div class="text-subtitle2 text-center ellipsis q-px-sm q-mb-sm" :title="getUserDisplayName()">
                    {{ getUserDisplayName() }}
                  </div>
                  <div :class="$q.dark.isActive?'text-white':'text-primary'" :title="currentUser.domainNames"
                       class="text-body4 text-center ellipsis q-px-sm">
                    <q-icon name="place" size="xs"/>&nbsp;{{ currentUser.domainNames }}
                  </div>
                </q-card-section>
                <q-separator v-if="loginAsSubstitution && selectedSession && selectedSession.user"/>
                <q-card-section v-if="loginAsSubstitution && selectedSession && selectedSession.user"
                                class="column full-width items-center justify-center">
                  <q-btn flat round class="absolute-top-left q-ma-md" size="md" icon="check_circle" color="positive"/>
                  <div class="q-mb-sm">
                    <user-avatar :name="getFullName(selectedSession.user)" :src="selectedSession.user.NidUser | avatar"
                                 size="128px"/>
                  </div>
                  <div class="text-subtitle2 text-center ellipsis q-px-sm q-mb-sm">
                    {{ getFullName(selectedSession.user) }}
                  </div>
                  <div class="text-center q-px-sm"
                       :class="isLimitTime(selectedSession.endDate)?'text-red':'text-blue'">
                    <q-icon name="timelapse" size="xs"/>
                    اعتبار تا {{ formatDate(selectedSession.endDate) }}
                    <small>{{ remainTime(selectedSession.endDate) }}</small>
                  </div>
                </q-card-section>
                <q-card-section class="text-center q-pt-none">
                  <q-btn v-if="loginAsSubstitution" color="orange-7" outline rounded size="md" v-close-popup
                         @click="backToMainAccount">
                    بازگشت به حساب کاربری اصلی
                  </q-btn>
                  <q-btn v-else outline rounded size="md" v-close-popup @click="showProfilePage">مدیریت حساب کاربری
                  </q-btn>
                </q-card-section>
                <q-separator v-if="sessions && sessions.length>0"/>
                <q-list separator v-if="sessions && sessions.length>0">
                  <q-item-label header>
                    <q-icon name="supervisor_account" size="sm"/>&nbsp;
                    تفویض اختیار شده به شما:
                  </q-item-label>
                  <q-item :active="selectedNidSubstitution === item.NidSubstitution"
                          :active-class="'text-positive text-bold'"
                          @click="selectSubstitute(item)"
                          clickable v-close-popup v-for="(item, i) in sessions"
                          :key="i">
                    <q-item-section avatar>
                      <user-avatar :name="getFullName(item.user)"
                                   :src="item.user.NidUser | avatar" size="32px"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                          `${getFullName(item.user)}`
                        }}
                      </q-item-label>
                      <q-item-label v-if="item.endDate"
                                    :class="{'text-red': isLimitTime(item.endDate)}"
                                    caption> اعتبار تا&nbsp;{{
                          formatDate(item.endDate)
                        }}<small>{{ remainTime(item.endDate) }}</small>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-separator/>
                <q-card-section class="text-center justify-center">
                  <q-btn outline size="md" v-close-popup @click="handleLogoutMenuClick">خروج از سیستم</q-btn>
                </q-card-section>
              </q-card>
            </q-menu>
          </div>
        </div>
      </q-toolbar>
    </safa-form>
    <q-slide-transition>
      <div class="window-tabs overflow-hidden flex items-center" v-if="windows.some(x=> x.minimize)">
        <div v-for="tab in windows.filter(x=> x.minimize)" :key="tab.id" class="win-tab overflow-hidden">
          <span><q-btn @click="closeWindow(tab)" icon="close" flat round dense size="sm"/></span>
          <span class="q-ml-xs cursor-pointer" @click="openWindow(tab)">
        {{ tab.title }}
        </span>
          <!--        <span><q-btn @click="openWindow(tab)" icon="open_in_browser" flat round dense size="sm" /></span>-->
        </div>
      </div>
    </q-slide-transition>
  </q-header>
</template>
<script>
import { mapGetters } from 'vuex'
import baseFormMixin from 'src/mixins/baseFormMixin'
import colorMixin from 'src/mixins/colorMixin'
import formLauncherMixin from 'src/mixins/formLauncherMixin'
import MapNosaziSearchBox from '../MapNosaziSearchBox'
import PersianDate from 'persian-date'
import build from '../../../build.json'
import { colors } from 'quasar'

export default {
  components: { MapNosaziSearchBox },
  mixins: [baseFormMixin, colorMixin, formLauncherMixin],
  data () {
    return {
      bulletinCount: 0,
      isBulletinNew: false,
      sessionTimer: null,
      buildVersion: build.version
    }
  },
  props: {
    windows: Array
  },
  watch: {
    selectedNidSubstitution () {
      if (this.selectedNidSubstitution !== this.selectedSession) {
        const newSession = this.$stSecurity.getters['authorize/session']
        this.$root.$emit('refresh:kartable')
        this.$root.$emit('update:session', newSession)
        console.log('session::', newSession)
        this.$KaisMap.NidSession = newSession
      }
    }
  },
  computed: {
    ...mapGetters('ui', ['layoutSplitterWidth', 'layoutMode', 'isShowSidebar']),
    sessions () {
      const list = [...this.$stSecurity.getters['authorize/sessions']].filter(s => new Date(s.endDate) > new Date())
      if (!this.loginAsSubstitution) return list
      return list.filter(s => s.NidSubstitution !== this.selectedNidSubstitution)
    },
    headerStyles () {
      const settings = this.$stSecurity.getters['sidebar/settings']
      return {
        backgroundColor: colors.getPaletteColor(settings.headerBgColor),
        color: colors.getPaletteColor(settings.headerTextColor)
      }
    },
    selectedNidSubstitution () {
      return (this.selectedSession && this.selectedSession.NidSubstitution) || null
    },
    selectedSession () {
      if (!this.loginAsSubstitution) return null
      return this.$stSecurity.state.authorize.selectedSession
    },
    loginAsSubstitution () {
      return this.$stSecurity.getters['authorize/loginAsSubstitution']
    },
    iconName () {
      if (this.$q.lang.rtl) {
        return this.isShowSidebar ? 'menu' : 'menu'
      }
      return this.isShowSidebar ? 'menu' : 'menu'
    },
    userFullname () {
      return (this.currentUser && this.currentUser.FullName) || ''
    }
  },

  mounted () {
    const self = this
    this.$root.$on('bulletin:new', params => {
      self.bulletinCount = params.count
      self.isBulletinNew = params.count > 0
    })
  },
  methods: {
    toggleSidebarVisibility () {
      this.$stSecurity.dispatch('sidebar/toggleVisible')
    },
    formatDate (date) {
      if (!date) return ''
      try {
        const pd = new PersianDate(new Date(date)).toLocale('fa').toCalendar('persian')
        const days = pd.diff(new PersianDate(), 'days')
        const isToday = days === 0
        let time = pd.format('HH:m')
        let dd = pd.format(days > 7 ? 'DD MMMM' : 'dddd')
        if (isToday) {
          dd = `امروز`
        }
        return `${dd} - ${time}`
      } catch (ex) {
        return '؟؟؟'
      }
    },
    dateDiffInHours (endDate) {
      return Math.round(Math.abs(new Date() - new Date(endDate)) / 36e5)
    },
    isLimitTime (endDate) {
      return this.dateDiffInHours(endDate) <= 2
    },
    remainTime (endDate) {
      const remain = this.dateDiffInHours(endDate)
      if (!this.isLimitTime(endDate)) return ''
      return ` (کمتر از ${remain || 1} ساعت)`
    },
    selectSubstitute (item) {
      if (new Date(item.endDate) < new Date()) {
        const fullName = this.getFullName(item.user)
        this.showError(`مدت زمان اعتبار دسترسی شما به حساب کاربری "${fullName}" به پایان رسیده است.`)
        return
      }
      this.$stSecurity.dispatch('authorize/switchSession', item).then(data => {
        if (!data.success) {
          alert(data.msg)
        }
        console.log('selectSubstitute', data)
      })
    },
    getFullName (user) {
      return `${user.firstName} ${user.lastName} (${user.username})`
    },
    showBulettin () {
      this.setActiveForm('BulletinBoard')
    },
    openHelpDialog () {
      this.$window.open({
        id: 'helpDialog',
        title: 'راهنمای برنامه',
        width: 850,
        height: 725,
        component: 'HelpDialog'
      })
    },
    openWindow (tab) {
      this.$window.open({
        id: tab.id
      })
    },
    closeWindow (tab) {
      this.$window.close(tab.id)
    },
    backToMainAccount () {
      this.$stSecurity.dispatch('authorize/resetSession')
    },
    showProfilePage () {
      this.setForm({ formKey: 'profile', title: 'پروفایل' })
    },
    handleLogoutMenuClick () {
      this.logout()
    },
    switchDark (value) {
      this.$q.dark.set(value)
      localStorage.darkMode = JSON.stringify(value)
      window.location.reload()
    }
  },
  created () {
    this.sessionTimer = setInterval(() => {
      this.$stSecurity.dispatch('authorize/refreshSessions')
    }, 30000)
  },
  beforeDestroy () {
    if (this.sessionTimer) clearInterval(this.sessionTimer)
  }
}
</script>
<style lang="scss">
.window-tabs {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  height: 30px;

  .win-tab {

  }

  > div {
    height: 100%;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
  }
}

.theme-color-picker {
  .q-color-picker {
    max-width: 100%;
    width: 100% !important;
    height: 280px !important;

    .q-panel-parent {
      height: 100% !important;

      .q-tab-panel {
        display: flex;
        flex-direction: column;

        .q-color-picker__spectrum {
          height: 80% !important;
          height: calc(100% - 40px) !important;

          > div:first-child {
            padding-bottom: 240px !important;
          }
        }
      }
    }
  }

  .color-preview {
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;

    > * {
      border-radius: 50%;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, .3);
    }

    &.active-color > div {
      outline: 3px solid rgb(1, 168, 255);
      outline-offset: 2px;
      box-shadow: 1px 2px 7px rgba(0, 0, 0, .5);
    }
  }
}

.substitute-active {
  > .q-avatar:first-child {
    filter: sepia(0.5) grayscale(.5);
    //filter: grayscale(1);
  }

  > span > .q-avatar {
    filter: drop-shadow(1px 2px 5px rgba(0, 0, 0, 0.4));
  }

  .substitute--arrow {
    position: absolute;
    right: 40px;
    top: 0;
    font-size: 14px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    font-weight: bold;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.12);
  }
}
</style>
