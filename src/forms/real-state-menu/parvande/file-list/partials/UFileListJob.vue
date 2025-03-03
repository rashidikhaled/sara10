<template>
  <fit>
    <safa-status :result="getJobRes" />
    <safa-status :result="saveJobRes" />

    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="career-profile" label="مشخصات شغلی" />
        <tab-menu name="license-and-board" label="مجوز و تابلو" />
      </template>
      <tab-content name="career-profile">
        <UFileListJobCareerProfile v-model="dataContext" :m="mode" />
      </tab-content>
      <tab-content name="license-and-board">
        <UFileListJobCareerLicenseAndBoard v-model="dataContext" :m="mode" />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

import UFileListJobCareerProfile from "./ufile-list-job-partials/UFileListJobCareerProfile.vue"
import UFileListJobCareerLicenseAndBoard from "./ufile-list-job-partials/UFileListJobCareerLicenseAndBoard.vue"

export default {
  mixins: [baseFormMixin],

  components: {
    UFileListJobCareerProfile,
    UFileListJobCareerLicenseAndBoard
  },

  props: {
    formKey: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      activeTab: "career-profile",

      dataContext: {
        Base_CodeInfoHistory: {},
        Base_Info: {},
        Base_JobAsset: [],
        Base_JobInfo: {},
        Base_JobLicence: [],
        Base_JobOwner: [],
        Base_JobPollution: [],
        Base_JobTablo: [],
        Base_JobVacation: [],
        Apartment: 0,
        Block: 0,
        Building: 0,
        Distric: 0,
        House: 0,
        Region: 0,
        Shop: 0,
        _NIdJobInfo: 0,
        _clsNidLib: {}
      },

      getJobRes: null,
      saveJobRes: null,

      splitterModel: 50,
      splitterModel2: 35
    }
  },

  methods: {
    uJob (pNid, pNidCopy) {
      this._Nid = pNid
      this._NidCopy = pNidCopy
      this.loadObj()
    },

    loadObj () {
      this.showLoading()

      const payload = {
        pNidBase: this._Nid,
        pNidCopy: this._NidCopy
      }

      this.$services.ES.getJob(payload)
        .then(({ data }) => {
          this.getJobRes = this.getResponse(data)
          if (this.getJobRes.success) {
            this.dataContext = this.getJobRes.data.GetJobResult

            if (this.loadCompleted != null) {
              this.loadCompleted(true)
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

    save () {
      let tmpobj = { ...this.dataContext }

      if (tmpobj != null && tmpobj.Base_JobOwner != null) {
        for (let i = 0; i < tmpobj.Base_JobOwner.length; i++) {
          if (!tmpobj.Base_JobOwner[i].OwnerBirthDate) {
            this.saveCompleted(false)
            this.showError("تاریخ تولد مالک وارد نشده است")
            return false
          }
        }
      }

      this.showLoading()

      tmpobj._clsNidLib.Nid = this._Nid
      tmpobj._clsNidLib.NidCopy = this._NidCopy

      const payload = {
        PObj: { ...tmpobj }
      }

      this.$services.ES.saveJob(payload)
        .then(({ data }) => {
          this.saveJobRes = this.getResponse(data)
          if (this.saveJobRes.success) {
            // #todo
            // this.SaveComplete();
            this.saveCompleted(true)
          } else {
            this.saveCompleted(false)
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
  }
}
</script>
