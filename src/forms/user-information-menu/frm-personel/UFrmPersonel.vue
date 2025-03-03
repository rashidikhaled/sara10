<template>
  <safa-form
    :id="formKey"
    :caption="title"
     appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
    <FormWrapper :title="title" :padding="false">
      <fit>
        <safa-tabs fit v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu
              label="فرم شناسایی پرسنل"
              name="PersonnelIdentification"
              ref="PersonnelIdentification"
            />
            <tab-menu label="سایر مشخصات" name="OtherFeatures" />
            <tab-menu label="عکس کاربر" name="UserPhoto" />
            <tab-menu label="دسترسی به منابع" name="AccessToResources" />
            <tab-menu label="آرشیو مدارک" name="DocumentArchive" />
          </template>

          <tab-content name="PersonnelIdentification">
            <UFrmPersonnelIdentification
              ref="UFrmPersonnelIdentification"
              v-model="dataContext.userInfo"
              :m="mode"
            />
          </tab-content>
          <tab-content name="OtherFeatures">
            <UFrmPersonnelOtherFeatures
              ref="UFrmPersonnelOtherFeatures"
              v-model="dataContext"
              :m="mode"
            />
          </tab-content>
          <tab-content name="UserPhoto">
            <UFrmPersonnelUserPhoto
              ref="UFrmPersonnelUserPhoto"
              v-model="dataContext.imgModel"
              @userPic="getUserPic"
              :m="mode"
            />
          </tab-content>
          <tab-content name="AccessToResources">
            <UFrmPersonnelAccessToResources
              ref="UFrmPersonnelAccessToResources"
              v-model="dataContext"
              :m="mode"
            />
          </tab-content>
          <tab-content name="DocumentArchive">
            <UFrmPersonnelDocumentArchive
              ref="UFrmPersonnelDocumentArchive"
              v-model="dataContext"
              :m="mode"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
        />
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import fileHelper from "src/mixins/fileHelper"

// Partials
import UFrmPersonnelIdentification from "./partials/UFrmPersonnelIdentification.vue"
import UFrmPersonnelOtherFeatures from "./partials/UFrmPersonnelOtherFeatures.vue"
import UFrmPersonnelUserPhoto from "./partials/UFrmPersonnelUserPhoto.vue"
import UFrmPersonnelAccessToResources from "./partials/UFrmPersonnelAccessToResources.vue"
import UFrmPersonnelDocumentArchive from "./partials/UFrmPersonnelDocumentArchive.vue"

export default {
  name: "ParkingStaff",

  mixins: [baseFormMixin, fileHelper],

  components: {
    UFrmPersonnelIdentification,
    UFrmPersonnelOtherFeatures,
    UFrmPersonnelUserPhoto,
    UFrmPersonnelAccessToResources,
    UFrmPersonnelDocumentArchive
  },

  props: {
    taskInfo: Object,
    isSelectFromMenu: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      title: "هیأت پارکینگ",
      formKey: "199C1BB1-CAFA-4F59-ABF2-ADC20342A160",
      name: "ParkingStaff",
      main: true,

      // Business
      loadFromDafater: false,

      // tabs
      activeTab: "PersonnelIdentification",
      dataContext: {
        userInfo: {},

        imgModel: {
          userPic: null,
          signPic: null,
          fingerPic: null
        }
      },
      userImg: null
    }
  },

  methods: {
    async loadObj () {
      this.loadKhedmatCombo()
      this.loadRoles()
      this.loadCI()
      if (!this.isSelectFromMenu) {
        this.loadFromKartable()
        // #todo
        this.dataContext.userInfo.requestType = 1
      } else {
        // #todo
        this.dataContext.username = this.getUserDisplayName()
        this.dataContext.userInfo.requestType = 1
      }
      // #todo
      // lblImageComment.Text +=
      //   "\r\n" +
      //   string.Format("حجم فایل باید کمتر از {0} کیلوبایت باشد", MaxSizeFile)
    },

    loadFromKartable () {
      this.dataContext.userInfo.requestType = 1

      this.dataContext.userInfo.name = this.taskInfo.ProcRequester
    },

    loadKhedmatCombo () {
      if (this.loadFromDafater) {
        // #todo
      } else {
        this.showLoading()
        this.$services.security
          .getAllJobLocations()
          .then(({ data }) => {
            const getAllJobLocationsRes = this.getResponse(data)
            if (getAllJobLocationsRes.success) {
              this.$refs.UFrmPersonnelIdentification.khedmatLocationOptions =
                getAllJobLocationsRes.data.data.list.map((item, _index) => {
                  return {
                    ...item,
                    Title: item.name,
                    ID: _index
                  }
                })
            }
          })
          .catch((error) => {
            console.error(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },

    loadCI () {
      this.showLoading()

      this.$services.security
        .getCIList({})
        .then(({ data }) => {
          const getCIListRes = this.getResponse(data)

          if (getCIListRes.success) {
            if (getCIListRes.data.data.list) {
              const jobTyps =
                getCIListRes.data.data.list.filter(
                  ({ name }) => name === "CI_JobType"
                ) || []

              this.$refs.UFrmPersonnelIdentification.jobTypeOptions = [
                ...jobTyps.map(({ id: ID, title: Title }) => {
                  return {
                    Title,
                    ID
                  }
                })
              ]

              const postList =
                getCIListRes.data.data.list.filter(
                  ({ name }) => name === "CI_Post"
                ) || []

              this.$refs.UFrmPersonnelIdentification.postOptions = [
                ...postList.map(({ id: ID, title: Title }) => {
                  return {
                    Title,
                    ID
                  }
                })
              ]
            }
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async loadRoles () {
      this.showLoading()

      this.$services.security
        .getGoupList({
          type: "role"
        })
        .then(({ data }) => {
          const getGoupListRes = this.getResponse(data)

          if (getGoupListRes.success) {
            this.$refs.UFrmPersonnelIdentification.hozeFaaliatOptions =
              getGoupListRes.data.data.list.map((item, _index) => {
                return {
                  ...item,
                  Title: item.name,
                  ID: _index
                }
              })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getUserPic (file) {
      this.userImg = file
    }
  },

  async created () {
    await this.loadObj()
  }
}
</script>
