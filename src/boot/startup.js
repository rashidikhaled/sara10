// local
import store from "../store"
import components from "../components"
import views from "../views"
import services from "../services"
import kartable from "../kartable/index"
import monitoring from "../monitoring/index" // نمایش پنل مانیتورینگ به صورت تب مجزا در سرا 10
import build from "../../build.json"
import forms from "../forms"
import ADPRepository from "./ADPRepository"
import { appendUrls } from "../utils"
import baseGridColumnsSettings from "../config/baseGridColumnsSettings"

// third party
import uiFramework, { utils } from "ui-core"
import uiSecurity, { configPlugin, getStore } from "ui-security"
import uiDashboard from "@ui-core/dashboard"
import uiKaisMap from "kais-map"
import uiStatisticReports from "statistical-reports"
import uiSketch from "safa-sketch"
import uiArchiveCore from "archive-core"
import uiReportManager from "kais-report-viewer"
import VueAnime from "vue-animejs"
import uiBulletin from "ui-bulletin"

// assets
import "@progress/kendo-theme-default"
import "kais-map/dist/index.esm.css"
import "ui-core/dist/index.esm.css"
import "ui-security/dist/index.esm.css"
import "@ui-core/dashboard/dist/index.esm.css"
import "kais-report-viewer/dist/css/index.css"

export default async function ({ Vue }) {
  await configPlugin({ Vue }) // , configFile: 'web.config.dat' // configFile: "ngo.config.js"
  const securityUrl = window.getConfigValue("securityBaseUrl") // window.getConfigValue('serviceGateway') ? appendUrls([window.getConfigValue('serviceGateway'), 'security']) : window.getConfigValue('securityBaseUrl')
  window.securityServiceURL = securityUrl
  window.$adp = ADPRepository
  Vue.prototype.$adp = ADPRepository

  Vue.use(uiKaisMap, {
    ciBaseUrl: appendUrls([window.getConfigValue("ciServiceUrl"), "ci/get"]),
    domainName: "RtoE_Domain",
    appId: build.workspaceId,
    securityBaseUrl: securityUrl,
    avatarBaseUrl: securityUrl + "/avatar/",
    direction: "rtl"
  })

  Vue.use(uiStatisticReports, {
    store, // اجباری
    urls: {
      service: window.getConfigValue("formReportUrl"),
      viewer: window.getConfigValue("formRptViewerUrl")
    }
  })

  // const securityURL = new URL(window.getConfigValue('securityBaseUrl'))
  // const socketBaseURL = new URL(window.getConfigValue('socket.baseUrl', securityURL))
  const {
    autocomplete = true,
    togglePasswordVisibility = true,
    showOtherLoginMethods = true,
    allowResetPassword = true,
    allowHardwareToken = true,
    showSidebarSettingButton = true,
    profileSection = ['info', 'session'],
    ...otherSecurityOptions
  } = window.getConfigValue("security", {})

  Vue.use(uiSecurity, {
    appId: `${build.workspaceId}`,
    appName: build.workspaceName,
    appTitle: build.appTitle,
    gatewayBaseUrl: window.getConfigValue("serviceGateway"),
    securityBaseUrl: window.getConfigValue("securityBaseUrl"),
    archiveCore: window.getConfigValue("securityArchiveCore"),
    socket: window.getConfigValue("socket", { enabled: false }),
    captcha: window.getConfigValue("captcha", { enabled: true }),
    showSidebarSettingButton,
    profileSection,
    login: {
      labels: {
        title: "ورود کاربر",
        username: "نام کاربری",
        usernamePlaceholder: "نام کاربری خود را وارد نمایید.",
        password: "کلمه عبور",
        passwordPlaceholder: "کلمه عبور خود را وارد نمایید.",
        invalid_info: "نام کاربری یا کلمه عبور اشتباه است.",
        loginButtonText: "ورود به سیستم",
        webcamButtonText: "ورود با وبکم",
        tokenButtonText: "ورود با توکن"
      },
      autocomplete,
      togglePasswordVisibility,
      showOtherLoginMethods,
      allowResetPassword,
      allowHardwareToken
    },
    ...(otherSecurityOptions ?? {})
  })

  Vue.use(uiDashboard, {
    serviceUrl: utils.appendUrls([
      window.getConfigValue("securityBaseUrl"),
      "/v2/widgets/get-widget-list"
    ])
  })
  Vue.use(VueAnime)

  Vue.use(uiArchiveCore, {
    store,
    ...window.getConfigValue("archiveCore")
  })

  Vue.use(uiReportManager, {
    ...window.getConfigValue("reportConfig"),
    getStore
  })

  Vue.use(uiFramework, {
    getStore,
    // eslint-disable-next-line no-undef
    ci: appendUrls([window.getConfigValue("ciServiceUrl"), "ci/get"]),
    monitoring: window.getConfigValue('monitoring'),
    global: {
      labelShrink: false,
      labelWidth: "auto",
      mode: "e",
      square: true,
      size: JSON.stringify({
        lg: 4,
        md: 3,
        sm: 2,
        xs: 1
      }),
      gutterX: "md",
      gutterY: "sm",
      domainName: "CI_SaraM1",
      useInput: true
    },
    datatable: {
      ...window.getConfigValue("gridOptions", null) ?? {},
      clickable: true,
      dbclick: true, // perPage: [10, 20, 30, 40, 50, 100],
      sortable: true,
      paginate: false,
      take: 1000,
      exportable: window.getConfigValue("gridOptions.exportable", true),
      insertNewRowBefore: true,
      exportTools: ["excel", "jpg", "svg"],
      printable: false,
      primaryKey: "uniqueID",
      allowCopy: true,
      copyWithCount: true,
      searchable: true,
      ciAutoBind: true,
      columnSeparator: true,
      addRow: true,
      deleteRow: true,
      deleteFilter: true,
      selectable: true,
      allowMultipleSelection: true,
      draggable: false,
      hasBorder: true,
      mode: "r",
      allowSelectionWhenReadonlyMode: true,
      bordered: true,
      theme: "balham",
      loadingAnimation: false,
      minHeight: "70px",
      maxHeight: "100%",
      height: "100%",
      compact: true,
      filterable: true,
      margin: false,
      useStore: false,
      lazyLoad: false,
      enterMovesDown: false,
      enterMovesDownAfterEdit: true,
      stopEditingWhenCellsLoseFocus: false,
      singleClickEdit: window.getConfigValue("gridOptions.singleClickEdit", false),
      suppressClipboardPaste: false,
      readOnlyEdit: false,
      editType: "cell",
      useInput: true,
      author: "Sara10",
      enableMonitoring: true,
      groupable: window.getConfigValue("gridOptions.groupable", true),
      baseGridColumnsSettings: { ...baseGridColumnsSettings },
      globalColumnsOption () {
        return {
          "numeric,money,decimal,number,percentage": {
            colFunc: ["sum", "avg", "total"]
          }
        }
      },
      cellValueFormatter (col, params) {
        if (
          params.value &&
          (col.cellEditor === "ADPGridTemplate" ||
            col.editor === "ADPGridTemplate") &&
          col.params
        ) {
          const { groupField, serviceUrl, responseKey, paramName } = col.params
          const key = [
            groupField,
            serviceUrl,
            responseKey,
            paramName,
            params.data[groupField]
          ].join("__")
          return window.$adp.getTitleIfExist(key, params.value)
        }
        return params.value
      },
      async onReady (gridApi) {
        setTimeout(() => {
          if (!gridApi) return
          const adpCols =
            gridApi
              ?.getColumnDefs()
              ?.filter(
                (col) =>
                  (col.hasOwnProperty("cellEditor") &&
                    col.cellEditor === "ADPGridTemplate") ||
                  (col.hasOwnProperty("editor") &&
                    col.editor === "ADPGridTemplate")
              ) || []

          if (adpCols.length > 0) {
            gridApi.forEachRowNode((row) => {
              adpCols.forEach((col) => {
                const { groupField, serviceUrl, responseKey, paramName } =
                  col.params
                if (!isNaN(row.data[groupField])) {
                  const groupValue = Number(row.data[groupField])
                  const key = [
                    groupField,
                    serviceUrl,
                    responseKey,
                    paramName,
                    groupValue
                  ].join("__")
                  window.$adp.get(key, function () {
                    gridApi.refreshCells({
                      columns: [col.field],
                      rowNodes: [row]
                    })
                    console.log("adp get", key, gridApi)
                  })
                }
              })
            })
          }
        }, 400)
        /* console.log('adpGroups::', adpGroups)
        const adpCols = columnApi.columnModel.columnDefs.filter(col => (col.editor && col.editor === 'ADPGridTemplate') || (col.cellEditor && col.cellEditor === 'ADPGridTemplate'))
        setTimeout(() => gridApi.refreshCells({ columns: adpCols.map(x => x.field), force: true }), 1500) */
      },
      onCellChange (params) {
        /* if (params.colDef.hasOwnProperty('triggerCell')) {
          params.colDef.triggerCell.forEach(cc => {
            const [field, cb] = cc
            params.node.setDataValue(field, row[field])
            params.api.setFocusedCell(params.rowIndex, field)
            params.api.startEditingCell({ rowIndex: params.rowIndex, colKey: field })
          })
        } */
        /*      const adpGroups = ['CI_UsingGroup']
              if (adpGroups.includes(params.column.colId)) {
                const adpCols = params.columnModel.columnDefs.filter(col => (col.editor && col.editor === 'ADPGridTemplate') || (col.cellEditor && col.cellEditor === 'ADPGridTemplate'))
                setTimeout(() => params.api.refreshCells({ columns: adpCols.map(x => x.field), force: true }), 1000)
              } */
      }
      // colCalculationsContextMenu: [
      //   {
      //     key: "sum",
      //     columns: ["BuildingNo", "UsingArea", "UnitCount", "UsingDepth", "OverOnArea", "ParkingDelNo", "HelpFulGap", "AverageHeight", "FloorNo", "UnitNo", "FrontArea", "FrontHeight", "FrontWidth", "FrontLength", "FrontDepth", "TrepassValue", "Floor", "UnitCountMojod", "UnitCountMojaz", "AreaMojod", "AreaMojaz"]
      //   },
      //   {
      //     key: "avg",
      //     columns: ["BuildingNo", "UsingArea", "UnitCount", "UsingDepth", "OverOnArea", "ParkingDelNo", "HelpFulGap", "AverageHeight", "FloorNo", "UnitNo", "FrontArea", "FrontHeight", "FrontWidth", "FrontLength", "FrontDepth", "TrepassValue", "Floor", "UnitCountMojod", "UnitCountMojaz", "AreaMojod", "AreaMojaz"]
      //   },
      //   {
      //     key: "action2!",
      //     columns: ["UsingArea"],
      //     action: () => {
      //       return "test 2..."
      //     }
      //   }
      // ]
    },
    combo: {
      transitionShow: "jump-up",
      transitionHide: "jump-up",
      color: "primary",
      useInput: true,
      closeOnSelect: true
    },
    tabcontent: {
      padding: true
    },
    tabs: {
      contentTag: "section",
      type: "fixed",
      mobile: false,
      menuHeight: "30px",
      fit: true,
      bordered: true,
      padding: true
    },
    splitter: {
      fit: true,
      minHeight: "0"
    },
    group: {
      margin: "0 0 8px 0"
    },
    section: {
      class: "q-mb-sm"
    }
  })

  // local
  Vue.use(services)
  Vue.use(forms)
  Vue.use(views)
  Vue.use(kartable)
  Vue.use(monitoring) // نمایش پنل مانیتورینگ به صورت تب مجزا در سرا 10
  Vue.use(components)

  Vue.use(uiSketch, {
    sketchURL: window.getConfigValue("sketchUrl")
  })

  Vue.use(uiBulletin, {
    archive: {
      archiveCore: { ...window.getConfigValue("archiveCore") },
      archiveConfig: { ...window.getConfigValue("archiveConfig") }
    },
    services: {
      workflow: window.getConfigValue("workflow"),
      securityBaseUrl: window.getConfigValue("securityBaseUrl")
    },
    settings: {
      isAnimatingInterval: 10000,
      refreshTimerInterval: 1000 * 60 * 10
    }
  })

  Vue.prototype.logActions = require("../config/logActions.js").default
  window.logActions = require("../config/logActions.js").default

  // eslint-disable-next-line no-extend-native
  String.prototype.toEnglishDigits = (str) => {
    if (!str) return ""
    return str.replace(
      /([٠١٢٣٤٥٦٧٨٩])|([۰۱۲۳۴۵۶۷۸۹])/g,
      (m, $1, $2) => m.charCodeAt(0) - ($1 ? 1632 : 1776)
    )
  }

  function DefaultEqualityComparer (a, b) {
    return a === b || a.valueOf() === b.valueOf()
  }

  function DefaultSortComparer (a, b) {
    if (a === b) return 0
    if (a == null) return -1
    if (b == null) return 1
    if (typeof a === "string") return a.toString().localeCompare(b.toString())
    return a.valueOf() - b.valueOf()
  }

  // eslint-disable-next-line no-unused-vars
  function DefaultPredicate () {
    return true
  }

  function DefaultSelector (t) {
    return t
  }

  // eslint-disable-next-line no-extend-native
  Array.prototype.select =
    Array.prototype.map ||
    function (selector, context) {
      context = context || window
      var arr = []
      var l = this.length
      for (var i = 0; i < l; i++) {
        arr.push(selector.call(context, this[i], i, this))
      }
      return arr
    }
  // eslint-disable-next-line no-extend-native
  Array.prototype.where =
    Array.prototype.filter ||
    function (predicate, context) {
      context = context || window
      var arr = []
      var l = this.length
      for (var i = 0; i < l; i++) {
        if (predicate.call(context, this[i], i, this) === true) {
          arr.push(this[i])
        }
      }
      return arr
    }
  // eslint-disable-next-line no-extend-native
  Array.prototype.groupJoin = function (arr, outer, inner, result, comparer) {
    comparer = comparer || DefaultEqualityComparer
    return this.select(function (t) {
      var key = outer(t)
      return {
        outer: t,
        inner: arr.where(function (u) {
          return comparer(key, inner(u))
        }),
        key: key
      }
    }).select(function (t) {
      t.inner.key = t.key
      return result(t.outer, t.inner)
    })
  }
  // eslint-disable-next-line no-extend-native
  Array.prototype.orderBy = function (selector, comparer) {
    comparer = comparer || DefaultSortComparer
    var arr = this.slice(0)
    var fn = function (a, b) {
      return comparer(selector(a), selector(b))
    }

    arr.thenBy = function (selector, comparer) {
      comparer = comparer || DefaultSortComparer
      return arr.orderBy(DefaultSelector, function (a, b) {
        var res = fn(a, b)
        return res === 0 ? comparer(selector(a), selector(b)) : res
      })
    }

    arr.thenByDescending = function (selector, comparer) {
      comparer = comparer || DefaultSortComparer
      return arr.orderBy(DefaultSelector, function (a, b) {
        var res = fn(a, b)
        return res === 0 ? -comparer(selector(a), selector(b)) : res
      })
    }

    return arr.sort(fn)
  }
  // eslint-disable-next-line no-extend-native
  Array.prototype.first = function (predicate, def) {
    var l = this.length
    if (!predicate) return l ? this[0] : def == null ? null : def
    for (var i = 0; i < l; i++) {
      if (predicate(this[i], i, this)) {
        return this[i]
      }
    }
    return def == null ? null : def
  }
  // eslint-disable-next-line no-extend-native
  Array.prototype.groupBy = function (selector, comparer) {
    var grp = []
    var l = this.length
    comparer = comparer || DefaultEqualityComparer
    selector = selector || DefaultSelector

    for (var i = 0; i < l; i++) {
      var k = selector(this[i])
      var g = grp.first(function (u) {
        return comparer(u.key, k)
      })

      if (!g) {
        g = []
        g.key = k
        grp.push(g)
      }

      g.push(this[i])
    }
    return grp
  }
}
