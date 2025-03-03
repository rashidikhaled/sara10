import { services as securityServices } from "ui-security"
import { getCI } from "src/services/CiSrvSara"
import { uid } from "quasar"
import build from "../../build.json"

let instances = {}

function checkNull (propName, propValue) {
  if (typeof propValue === "undefined") {
    throw new Error(`${propName} is not defined.`)
  }
}

class CiComboPermission {
  _NidWorkspace = build.workspaceId;
  _WorkspaceName = build.workspaceName;
  _WorkspaceTitle = build.workspaceTitle;
  _NidParent = "";
  _ComboResourceID = "";
  _ComboResourceTitle = "";
  _ComboResourceName = "";
  _CiName = "";
  _CiDomain = "";

  _resourcesNeedToAdd = [];
  _allowedCiComboList = [];

  constructor ({
    NidParent,
    ComboResourceID,
    ComboResourceTitle,
    ComboResourceName,
    CiName,
    CiDomain
  }) {
    // checkNull("NidWorkspace", NidWorkspace)
    // checkNull('NidParent', NidParent) // allow null
    checkNull("ComboResourceID", ComboResourceID)
    checkNull("ComboResourceTitle", ComboResourceTitle)
    checkNull("ComboResourceName", ComboResourceName)
    checkNull("CiName", CiName)
    checkNull("CiDomain", CiDomain)

    // this._NidWorkspace = NidWorkspace
    this._NidParent = NidParent
    this._ComboResourceID = ComboResourceID
    this._ComboResourceTitle = ComboResourceTitle
    this._ComboResourceName = ComboResourceName
    this._CiName = CiName
    this._CiDomain = CiDomain
  }

  async _addComboResource () {
    try {
      await securityServices.addResource({
        NidResource: this._ComboResourceID,
        NidWorkspace: this._NidWorkspace, // Esup workSpaceID
        NidParent: this._NidParent || this._NidWorkspace,
        name: this._ComboResourceName,
        title: this._ComboResourceTitle,
        type: "access",
        force: true
      })
    } catch (e) {
      console.error("addComboResource", e)
    }
  }

  async _getCiListAsync ({ domain, name }) {
    const { data } = await getCI({
      ciName: name,
      domainName: domain
    })

    return data.success ? data.data.list : []
  }

  _addResource (title, value) {
    this._resourcesNeedToAdd.push({
      NidParent: this._ComboResourceID,
      NidResource: uid().toUpperCase(),
      name: title.replace(/ /g, "_") + `_${value}`,
      title: title,
      type: "access"
    })
  }

  _addComboItem (ciItem) {
    if (
      this._allowedCiComboList.findIndex((x) => x.ID === ciItem.ID) > -1 &&
      this._allowedCiComboList.findIndex((x) => x.Title === ciItem.Title) > -1
    ) {
      return
    }

    this._allowedCiComboList.push(ciItem)
  }

  _addResourceUndefinedItems () {
    const resources = this._resourcesNeedToAdd
    //   add fetch-resource
    if (Array.isArray(resources) && resources.length > 0) {
      securityServices.resourceAddFetch({
        NidWorkspace: this._NidWorkspace,
        workspaceName: this._WorkspaceName,
        workspaceTitle: this._WorkspaceTitle,
        newAdd: true,
        resources
      })
    }
  }

  async _getUserPermission () {
    const { data } = await securityServices.resourceFetch({
      NidParent: this._ComboResourceID // "ریسورس کمبو"
    })

    if (data.success) return data.data

    return []
  }

  async getComboList () {
    this._resourcesNeedToAdd = []
    this._allowedCiComboList = []

    // افزودن ریسورس کمبو در سکوریتی
    this._addComboResource() // left without await

    // لیست تمامی ci ها
    const ciList = await this._getCiListAsync({
      name: this._CiName,
      domain: this._CiDomain
    })

    // دسترسی های مجاز کاربر
    const resources = await this._getUserPermission()

    const normalizeText = (s) => s.convertToPersian().trim()
    const compareText = (a, b) => normalizeText(a) === normalizeText(b)

    for (let ciItem of ciList) {
      const title = ciItem.title ?? ciItem.Title ?? ""
      const value = ciItem.ID ?? ciItem.id ?? ciItem.Id

      const resourceFound = resources.find((r) => compareText(r.title, title))

      if (!resourceFound) {
        this._addResource(normalizeText(title), value)
      } else {
        // add to combo items (if resource is allowed from security)
        // eslint-disable-next-line no-self-compare
        if (resourceFound.allowed) {
          this._addComboItem({
            ...ciItem,
            Title: title,
            ID: value
          })
        }
      }
    }

    this._addResourceUndefinedItems()

    console.log("_allowedCiComboList", this._allowedCiComboList)
    return this._allowedCiComboList
  }
}

const defaultParams = {
  NidParent: null,
  ComboResourceID: "",
  ComboResourceTitle: "",
  ComboResourceName: "",
  CiName: "",
  CiDomain: "CI_SaraM1",
  cacheable: true
}

function useCiComboPermission (params) {
  const {
    NidParent,
    ComboResourceID,
    ComboResourceTitle,
    ComboResourceName,
    CiName,
    CiDomain,
    cacheable,
    ...other
  } = { ...defaultParams, ...(params ?? {}) }

  checkNull("CiName", CiName)
  checkNull("CiDomain", CiDomain)

  const cacheKey = `${CiDomain}_${CiName}`.toLowerCase()
  if (cacheable === false && instances[cacheKey]) delete instances[cacheKey]
  const includeInCache = !!instances[cacheKey]

  if (includeInCache) return instances[cacheKey]

  instances[cacheKey] = new CiComboPermission({
    NidParent,
    ComboResourceID,
    ComboResourceTitle,
    ComboResourceName,
    CiName,
    CiDomain,
    ...other
  })

  return instances[cacheKey]
}

export { useCiComboPermission }
