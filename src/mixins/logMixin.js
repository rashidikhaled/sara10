import { pascalCase } from "pascal-case"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import build from "../../build"

export default {
  data () {
    return {
      allChangedComponents: [],
      changeSet: []
    }
  },
  methods: {
    addChangedComponent (component) {
      if (component && component.changedValue && !component.ignoreCdc) {
        const report = component.generateCdcReport()
        if (report) {
          if (Array.isArray(report)) {
            this.allChangesetReports.push(...report)
          } else {
            this.allChangesetReports.push(report)
          }
        }
      }
    },
    searchChildren (parent) {
      if (!parent) return
      this.addChangedComponent(parent)

      if (parent.$children) {
        for (let index = 0; index < parent.$children.length; index++) {
          const child = parent.$children[index]
          if (child.$children) {
            this.searchChildren(child)
          } else {
            this.addChangedComponent(child)
          }
        }
      }
    },
    resetChangeSet (component) {
      if (!component) return

      if (component.changedValue) {
        component.resetCdc()
      }
      if (component.$children && component.$children) {
        for (let index = 0; index < component.$children.length; index++) {
          const child = component.$children[index]
          if (child.$children) {
            this.resetChangeSet(child)
          } else {
            if (child.changedValue) {
              child.resetCdc()
            }
          }
        }
      }
    },
    async log () {
      const { formKey, title, name, baseNosaziCode } = this

      if (!formKey || formKey.trim() === "") {
        throw Error(`"form key" not provided in component's data.`)
      }
      if (!title || title.trim() === "") {
        throw Error(`"form title" not provided in component's data.`)
      }
      if (!name || name.trim() === "") {
        throw Error(`"form name" not provided in component's data.`)
      }

      const params = arguments[0]
      if (typeof params !== "object") {
        throw Error(`log method first parameter must be "object" type.`)
      }

      if (!params.action) {
        throw Error(`"log action" not provided in log method parameters.`)
      } else if (typeof params.action !== "object") {
        throw Error(`"log action" must be object type.`)
      }

      if (
        params.logLevel !== undefined &&
        ![1, 2, 3].includes(params.logLevel)
      ) {
        throw new Error(`Invalid "logLevel": must be one of 1, 2, or 3.`)
      }

      const user = this.currentUser
      let jobLocation =
        this.$stSecurity.getters["authorize/user"].JobLocation ||
        this.$stSecurity.getters["authorize/user"].jobLocation

      const ip = await this.$stSecurity.getters["authorize/clientIp"]
      // console.log(ip)

      const userGroup =
        this.$stSecurity.getters["authorize/user"].UserGroups?.[0]

      let defaultParams = {
        userNameAccessibility: null,
        Description: null,
        ComputerName: "Sara 10",
        JobLocation: (jobLocation && jobLocation.name) || "",
        JobLocationName: (jobLocation && jobLocation.name) || "",
        ApplicationTitle: "سرا 10", // build.appTitle,
        ApplicationName: build.appName,
        BizCodeArchive: null,
        SaveDesc: null,
        SaveReason: null,
        GroupDataCount: 0,
        NidKartabl: this.selectedRequest?.NidWorkItem?.toString() || null,
        NosaziCode:
          (this.selectedRequest?.BizCode &&
            this.selectedRequest?.BizCode?.toString()) ||
          "",
        ActionXML: null,
        FormulaCaption: null,
        FormulaType: null,
        FormCaption: title,
        WorkFlowType: this.selectedRequest?.WorkflowTitel || "",
        BizCodeTitle: null,
        BizCode: null,
        BizCodeType: null,
        UserCode: user.GUID,
        UserName: user.FullName,
        Ip: ip,
        ActionType: params.action.code,
        userGroup: userGroup?.GroupTitle || null,
        logLevel: params.logLevel ? Number(params.logLevel) : 2,
        isOperationFailed: params.isOperationFailed ?? false,
        /* 'Action': {
          'FormName': 'CommissionVote',
          'FormCaption': 'صدور رای',
          'FormAction': 'Save',
          'FormChangeSet': [
            {
              'FieldName': 'VoteDate',
              'FieldCaption': 'تاریخ رای',
              'FieldType': 'Date',
              'OldValue': null,
              'NewValue': '1400/01/01'
            }
          ]
        }, */
        FormulaAction: null,
        wkt: (this.selectedRequest && this.selectedRequest.WKT) || ""
      }

      let _nidWorkItem
      let _nosaziCode
      let strBaseNosaziCode = baseNosaziCode
        ? convertNosaziCodeObjectToString(baseNosaziCode)
        : ""
      if (this.taskInfo?.BizCode) {
        // (this.taskInfo?.BizCode === strBaseNosaziCode)
        // if (this.taskInfo?.BizCode === params.bizCode) {
        // از کارتابل انتخاب شده
        _nidWorkItem = this.taskInfo?.NidWorkItem.toString() ?? ""
        _nosaziCode = this.taskInfo?.BizCode?.toString() ?? ""
      } else {
        // داخل فرم از  کامپوننت کد نوسازی جستجو شده
        _nidWorkItem = ""
        _nosaziCode = strBaseNosaziCode ?? ""
      }

      // console.log('log', params)
      let {
        action,
        bizCode = "",
        nosaziCode = _nosaziCode,
        nidWorkItem = _nidWorkItem,
        ...otherParams
      } = params
      let ActionType = action.code
      let normalizeParams =
        otherParams &&
        Object.keys(otherParams).reduce((obj, key) => {
          obj[pascalCase(key)] = otherParams[key]
          return obj
        }, {})

      this.detectChanges()
      let logObject = {
        ...defaultParams,
        ...normalizeParams,
        ActionType,
        BizCode: `${bizCode}`,
        NosaziCode: `${nosaziCode}`,
        NidKartabl: `${nidWorkItem}`,
        Action: {
          FormChangeSet: this.changeSet,
          formName: name,
          formCaption: title,
          FormAction: action.action
          // formKey,
        }
      }

      if (
        logObject.ActionType === 1 &&
        logObject.Action.FormChangeSet.length === 0 &&
        logObject.SaveDesc === null
      )
      { return }

      console.debug("=============logObject===========", logObject)

      this.$services.monitoring.insertLog(logObject).then(({ data }) => {
        this.resetChangeSet(this)
        console.debug(
          "=================inserted log successfully.=================",
          data
        )
      })
    },
    normalizeValue (val) {
      const type = typeof val
      switch (type) {
        case "undefined":
          return ""
        case "number":
          return val.toString()
        case "string":
          return val
        case "boolean":
          return JSON.stringify(val)
        default:
          return JSON.stringify(val)
      }
    },
    detectChanges () {
      this.allChangesetReports = []
      this.searchChildren(this)
      this.changeSet = this.allChangesetReports
      /* this.changeSet = this.allChangesetReports.map(instance => {
        return {
          FieldName: instance.internalCdcName,
          OldValue: this.normalizeValue(instance._data.history.old),
          NewValue: this.normalizeValue(instance._data.history.new),
          FieldType: 'text',
          FieldCaption: instance.$attrs['label'] || instance._props.label || instance.$attrs['title'] || 'Untitled'
        }
      }) */
    }
  }
}
