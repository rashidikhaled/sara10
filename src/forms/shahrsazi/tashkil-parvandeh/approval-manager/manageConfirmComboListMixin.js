import { uid } from "quasar"
import build from "../../../../../build.json"
const manageConfirmNidResource = "65E601ED-9622-4A2B-A576-7CB89D17D7D8" // "منبع تایید"

export default {
  data () {
    return {
      manageConfirmComboItems: []
    }
  },
  methods: {
    async bindManageConfirmComboSource () {
      // افزودن ریسورس منبع تایید در سکوریتی
      await this.addResourceManageConfirm()

      // دریافت لیست سی آی و تمامی دسترسی های ثبت شده برای منبع تایید
      const results = await Promise.allSettled([
        this.getAllResources(),
        this.getCiResourceManagerConfirm()
      ])

      // دریافت نتیجه فراخوانی سرویس های بالا
      let resources = []
      let originalList = []
      if (results[0].status === "fulfilled") {
        resources = results[0].value
      }
      if (results[1].status === "fulfilled") {
        originalList = results[1].value
      }

      this.processResourceAndPermissions(originalList, resources)
    },
    async getAllResources () {
      return new Promise(async (resolve, reject) => {
        const res = await this.$services.security.resourceFetch({
          NidParent: manageConfirmNidResource // "منبع تایید"
        })
        if (res.data.success) {
          return resolve(res.data.data ?? [])
          /*
          structure:
          {
              "NidWorkspace": build.workspaceId,
              "NidResource": "3B85F19E-7F63-46A1-BB6E-3CEAF6326D9F",
              "NidParent": manageConfirmNidResource,
              "allowed": true,
              "title": "تست اد ریسورس تایید منبع",
              "name": "تست اد ریسورس تایید منبع"
          }
          */
        } else {
          return reject(res.data)
        }
      })
    },

    async addResourceManageConfirm () {
      try {
        const { data } = await this.$services.security.addResource({
          NidResource: manageConfirmNidResource, // NidResource جدید برای دسترسی لیست منبع تایید
          NidWorkspace: build.workspaceId, // Esup workSpaceID
          NidParent: "6CDEB917-C0D9-4D4C-A467-F452FB882AEA", // "تایید مدیران"
          name: "AccessToResourceManageConfirmOptions",
          title: "منبع تایید",
          type: "access",
          force: false
        })
        console.log("addResource res :>> ", data)
      } catch (e) {
        console.error(e)
      }
    },

    async getCiResourceManagerConfirm () {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await this.$services.CiSrvSara.getCI({
            ciName: "CI_ResourceManagerConfirm",
            domainName: "CI_SaraM1"
          })
          this.getCIRes = this.getResponse(data)
          if (this.getCIRes.success) {
            this.ciList = this.getCIRes.data?.data?.list ?? []
          }
          return resolve(this.ciList)
        } catch (e) {
          console.error(e)
          return reject(e)
        }
      })
    },
    async processResourceAndPermissions (ciList, resources) {
      const normalizeText = (s) => s.convertToPersian().trim()
      const compareText = (a, b) => normalizeText(a) === normalizeText(b)
      const needToAddResource = []
      const allowedItems = []

      ciList.forEach((item) => {
        const title = item.title ?? item.Title ?? ""
        const value = item.ID ?? item.id ?? item.Id

        const resourceFound = resources.find((r) =>
          compareText(r.title, title)
        )
        console.log("resourceFound", title, resourceFound)
        if (!resourceFound) {
          needToAddResource.push({
            NidParent: manageConfirmNidResource,
            NidResource: uid().toUpperCase(),
            name: normalizeText(title).replace(/ /g, "_") + `_${value}`,
            title: normalizeText(title),
            type: "access"
          })
        } else {
          // add to combo items (if resource is allowed from security)
          // eslint-disable-next-line no-self-compare
          if (resourceFound.allowed) allowedItems.push(item)
        }
      })

      this.addResourceUndefinedItems(needToAddResource)
      this.setComboAllowedOptions(allowedItems)
    },
    addResourceUndefinedItems (resources) {
      //   add fetch-resource
      if (Array.isArray(resources) && resources.length > 0) {
        this.$services.security.resourceAddFetch({
          NidWorkspace: build.workspaceId,
          newAdd: true,
          resources,
          workspaceName: build.workspaceName,
          workspaceTitle: build.workspaceTitle
        })
      }
    },
    removeDuplicateObjectFromArray (array, key) {
      let check = {}
      let res = []
      for (let i = 0; i < array.length; i++) {
        if (!check[array[i][key]]) {
          check[array[i][key]] = true
          res.push(array[i])
        }
      }
      return res
    },
    async setComboAllowedOptions (list) {
      const tmpList = list
      this.manageConfirmComboItems = this.removeDuplicateObjectFromArray(
        tmpList,
        "Title"
      )
    }
  },
  created () {
    this.manageConfirmComboItems = []
    this.bindManageConfirmComboSource()
  }
}
