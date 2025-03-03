import { pascalCase } from 'pascal-case'
import build from '../../../build'

export default {
  data () {
    return {
      allChangedComponents: [],
      changeSet: []
    }
  },
  methods: {
    addChangedComponent (component) {
      if ((component && component.changedValue) && !component.ignoreCdc) {
        const report = component.generateCdcReport()
        if (report) {
          this.allChangesetReports.push(report)
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
      const params = arguments[0]
      if (typeof params !== 'object') {
        throw Error(`log method first parameter must be "object" type.`)
      }

      if (!params.action) {
        throw Error(`"log action" not provided in log method parameters.`)
      } else if (typeof params.action !== 'object') {
        throw Error(`"log action" must be object type.`)
      }

      if (!params.formCaption) {
        throw Error(`"log formCaption" not provided in log method parameters.`)
      } else if (typeof params.formCaption !== 'string') {
        throw Error(`"log formCaption" must be string type.`)
      }

      if (!params.formName) {
        throw Error(`"log formName" not provided in log method parameters.`)
      } else if (typeof params.formName !== 'string') {
        throw Error(`"log formName" must be string type.`)
      }

      const user = this.currentUser
      const jobLocation = this.$stSecurity.getters['authorize/user'].JobLocation
      const ip = await this.$stSecurity.getters['authorize/clientIp']

      const userGroup = this.$stSecurity.getters["authorize/user"].UserGroups?.[0]

      let defaultParams = {
        'userNameAccessibility': null,
        'Description': null,
        'ComputerName': 'Sara 10',
        'JobLocation': (jobLocation && jobLocation.name) || '',
        'JobLocationName': (jobLocation && jobLocation.name) || '',
        'ApplicationTitle': "سرا 10", // build.appTitle,
        'ApplicationName': build.appName,
        'BizCodeArchive': null,
        'SaveDesc': null,
        'SaveReason': null,
        'GroupDataCount': 0,
        'NidKartabl': (this.taskInfo?.NidWorkItem?.toString()) || null,
        'NosaziCode': (this.taskInfo?.BizCode && this.taskInfo?.BizCode?.toString()) || '',
        'ActionXML': null,
        'FormulaCaption': null,
        'FormulaType': null,
        'FormCaption': params.formCaption,
        'WorkFlowType': (this.taskInfo?.WorkflowTitel) || '',
        'BizCodeTitle': null,
        'BizCode': null,
        'BizCodeType': null,
        'UserCode': user.GUID,
        'UserName': user.FullName,
        'Ip': ip,
        'ActionType': params.action.code,
        'FormulaAction': null,
        'wkt': (this.taskInfo && this.taskInfo.WKT) || '',
        'userGroup': userGroup?.GroupTitle || null,
        'logLevel': params.logLevel ? Number(params.logLevel) : 2,
        'isOperationFailed': params.isOperationFailed ?? false
      }

      let { action, bizCode, nosaziCode, nidWorkItem, ...otherParams } = params
      let ActionType = action.code
      let normalizeParams = otherParams && Object.keys(otherParams).reduce((obj, key) => {
        obj[pascalCase(key)] = otherParams[key]
        return obj
      }, {})
      this.detectChanges()
      let logObject = {
        ...defaultParams,
        ...normalizeParams,
        ActionType,
        BizCode: this.taskInfo.BizCode,
        NosaziCode: this.taskInfo.BizCode,
        NidKartabl: this.taskInfo.NidWorkItem ? this.taskInfo.NidWorkItem.toString() : '',
        Action: {
          FormChangeSet: this.changeSet,
          FormName: params.formName,
          FormCaption: params.formCaption,
          FormAction: action.action
        }
      }

      if (logObject.ActionType === 1 && logObject.Action.FormChangeSet.length === 0) return

      this.$srvWorkflow.insertLog(logObject).then(({ data }) => {
        this.resetChangeSet(this)
        console.log('=================kartable inserted log successfully .=================', data)
      })
      // .catch((e) => {
      //   console.error('inserted log error', e)
      // })
    },
    normalizeValue (val) {
      const type = typeof val
      switch (type) {
        case 'undefined':
          return ''
        case 'number':
          return val.toString()
        case 'string':
          return val
        case 'boolean':
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
