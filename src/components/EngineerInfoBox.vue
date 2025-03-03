<template>
  <div>
    <safa-status :result="getEngineerRes" />
    <safa-label v-if="labelShrink" style="line-height: 16px !important;">{{ label }}</safa-label>
    <div style="display:flex; flex-wrap:nowrap;"
    :style="!hideSearchBtn ? 'padding-left:6px;' : ''">
      <safa-label
        v-if="!labelShrink"
        class="q-mt-sm labelInfoBox"
        :style="`width: ${labelWidth}`"
      >{{ label }}</safa-label>
      <div class="popupInfoBox pointer-none">
        <!-- :class="{'no-pointer-events':!!value}" -->
        <div>
          <q-btn
            flat
            round
            color="primary"
            icon="expand_more"
            size="sm"
            title="اطلاعات مهندس"
            dense
            :disabled="m === 'r'"
          />
        </div>
        <q-menu v-model="showing">
          <div class="row no-wrap q-pa-sm profileBox">
            <div class="column col-4">
              <div
                class="form-title q-mb-sm"
                style="min-width: 130px;text-align: center;"
              >
                تصویر مهندس
              </div>
              <div class="column items-center">
                <img
                  v-if="imageMode === 'ProfilePic'"
                  style="width: 100px; height: 100px;"
                  :src="engineerImg"
                  alt=""
                >
                <img
                  v-else-if="imageMode === 'Mohr'"
                  style="width: 100px; height: 100px;"
                  :src="engineerMohr"
                  alt=""
                >
                <img
                  v-else-if="imageMode === 'Signiture'"
                  style="width: 100px; height: 100px;"
                  :src="engineerSigniture"
                  alt=""
                >

              </div>
              <div style="display:flex;justify-content:center;align-items:center">
                <q-item
                  class="q-ma-none q-pa-none"
                  clickable
                  dense
                  key="menu3"
                  v-ripple
                >
                  <q-item-section
                    avatar
                    class="q-ma-none q-pa-none"
                  >
                    <btn-default
                      @click="onMohr"
                      label="مهر"
                    ></btn-default>
                  </q-item-section>
                </q-item>
                <q-item
                  class="q-ma-none q-pa-none"
                  clickable
                  dense
                  key="menu4"
                  v-ripple
                >
                  <q-item-section
                    avatar
                    class="q-ma-none q-pa-none"
                  >
                    <btn-default
                      @click="onShowSigniture"
                      label="امضا"
                    ></btn-default>
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <div class="col-8">
              <div class="row">
                <div class="col-md-6 nowrap">نام مهندس </div>
                <div class="col-md-6 nowrap ">{{engineerPopupInfo?.FullName ?? ' -------------- '}}</div>
              </div>
              <div class="row">
                <div class="col-md-6 nowrap">کد دفتر </div>
                <div class="col-md-6 nowrap ">{{engineerPopupInfo?.OfficeCode ?? ' -------------- '}}</div>
              </div>
              <div class="row">
                <div class="col-md-6 nowrap">نام دفتر </div>
                <div class="col-md-6 nowrap ">{{engineerPopupInfo?.Office_Name ?? ' -------------- '}}</div>
              </div>
              <div class="row">
                <div class="col-md-6 nowrap">رشته تحصیلی </div>
                <div class="col-md-6 nowrap ">{{engineerPopupInfo?.StudyField ?? ' -------------- '}}</div>
              </div>
              <div class="row">
                <div class="col-md-6 nowrap">پایه </div>
                <div class="col-md-6 nowrap ">{{engineerPopupInfo?.Base ?? ' -------------- '}}</div>
              </div>
              <div class="row">
                <div class="col-md-6 nowrap">صلاحیت </div>
                <div class="col-md-6 nowrap ">{{engineerPopupInfo?.Ability ?? ' -------------- '}}</div>
              </div>
              <div class="row">
                <div class="col-md-6 nowrap">سهمیه باقی مانده </div>
                <div class="col-md-6 nowrap ">{{engineerPopupInfo?.QtaRemain ?? ' -------------- '}}</div>
              </div>
            </div>
          </div>
        </q-menu>
      </div>
      <div
        class="fieldsInfoBox q-gutter-sm"
        style="display:flex;"
      >
        <safa-text
          label=""
          :value="value"
          @input="updateValue"
          title="کد عضویت"
          validations='required'
          v-bind="$attrs"
          :enable-validation="false"
          :m="m"
          @keyup.enter="getEngineer"
        >
          <template v-slot:append>
            <q-icon
              v-if="value"
              style="position: relative;right: 5px;font-size: 18px;"
              @click="clearSearch"
              color="primary"
              name="clear"
              class="cursor-pointer"
              :disabled="m === 'r'"
            />
          </template>
        </safa-text>
        <safa-text
          label=""
          title="کد نظام معماری"
          v-model="ArchitectureCode"
          type="number"
          v-bind="$attrs"
          :enable-validation="false"
          @keyup.enter="getEngineer"
          :m="m"
        >
          <template v-slot:append>
            <q-icon
              style="position: relative;right: 5px;font-size: 18px;"
              @click="clearSearchEng"
              name="clear"
              class="cursor-pointer"
              v-if="ArchitectureCode"
              :disabled="m === 'r'"
            />
            <q-icon
              style="position: relative;right: 5px;"
              @click="showSearchEngHandler"
              color="primary"
              name="more_horiz"
              class="cursor-pointer"
              :disabled="m === 'r'"
            />
          </template>
        </safa-text>
        <div v-if="!hideSearchBtn">
          <btn-search @click="getEngineer" />
        </div>
      </div>
      <safa-popup
        title="جستجوی مهندس"
        v-model="showSearchEng"
        width="900px"
        height="600px"
      >
        <search-engineer @selectedEngInfo="getEngineerInfo" />
      </safa-popup>
    </div>
  </div>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import SearchEngineer from "./SearchEngineer.vue"
export default {
  inheritAttrs: false,
  components: { SearchEngineer },
  mixins: [baseFormMixin],
  name: "EngineerInfoBox",
  props: {
    buttons: [Array, Object],
    value: [Number, String],
    labelWidth: {
      type: String,
      default: "70px"
    },
    label: {
      type: String,
      default: "کد عضویت"
    },
    m: {
      type: String,
      default: "e"
    },
    size: String,
    hideSearchBtn: {
      type: Boolean,
      default: false
    },
    showingLoading: {
      type: Boolean,
      default: false
    },
    labelShrink: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: "EngineerInfoBox",
      title: "اطلاعات مهندس",
      formKey: "a38337ac-8e07-436e-846a-0eab6f8f0e40",
      getEngineerRes: null,
      identityCode: null,
      ArchitectureCode: null,
      internalButtons: [],
      showing: false,
      showSearchEng: false,
      shallShowClearSearch: false,
      engineerPopupInfo: {
        Ability: null,
        ArchitectureCode: null,
        Base: null,
        FullName: null,
        IdentityCode: null,
        MunicipalityCode: null,
        NIdEng: null,
        OfficeCode: null,
        Office_Name: null,
        QtaRemain: null,
        StudyField: null,
        Picture: null,
        PicSignature: null
      },
      getCapacityKartablResult: {},
      engineerImg: "",
      engineerSigniture: "",
      engineerMohr: "",
      imageMode: "ProfilePic"
    }
  },

  methods: {
    updateValue (newVal) {
      this.$emit("input", newVal)
    },

    async getEngineer () {
      if (this.value === null) { return this.showError("لطفا کد عضویت را وارد نمایید.") }
      if (!this.showingLoading) this.showLoading()
      const payload = {
        pRequest: {
          EngineerCode: this.value
        }
      }
      try {
        const { data } = await this.$services.engineers.getEngineerPopupInfo(payload)
        this.getEngineerRes = this.getResponse(data)
        if (this.getEngineerRes.success) {
          this.engineerPopupInfo =
              this.getResponse(this.getEngineerRes).data.data.GetEngineerPopupInfoResult.EngineerPopupInfo
          this.engineerImg = await this.convertToImage(
            this.engineerPopupInfo.Picture
          )
          console.log("this.engineerImg", this.engineerImg)
          this.engineerSigniture = await this.convertToImage(
            this.engineerPopupInfo.PicSignature
          )
          this.engineerMohr = await this.convertToImage(
            this.engineerPopupInfo.PicMohr
          )
          this.$emit("fetched", {
            engineerInfo: this.engineerPopupInfo,
            IdentityCode: this.engineerPopupInfo.IdentityCode === null ? this.value : this.engineerPopupInfo.IdentityCode,
            NIdEng: this.engineerPopupInfo.NIdEng
          })
          if (this.engineerPopupInfo.NIdEng === "00000000-0000-0000-0000-000000000000" && window.getConfigValue('engineersConfig.hideEmptyEngineerInfoBox', false)) {
            this.showing = false
          } else {
            this.showing = true
          }
          this.showSearchEng = false
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    showSearchEngHandler () {
      if (this.m === 'r') return
      this.showSearchEng = true
    },
    getEngineerInfo (val) {
      this.value = val.IdentityCode
      this.ArchitectureCode = val.ArchitectureCode
      this.updateValue(val.IdentityCode)
      this.getEngineer()
    },

    clearSearch () {
      this.updateValue(null)
    },

    clearSearchEng () {
      this.enarchitectureCodegId = null
    },
    onMohr () {
      if (this.imageMode === "Mohr") {
        this.imageMode = "ProfilePic"
      } else {
        this.imageMode = "Mohr"
      }
    },
    onShowSigniture () {
      if (this.imageMode === "Signiture") {
        this.imageMode = "ProfilePic"
      } else {
        this.imageMode = "Signiture"
      }
    },
    convertToImage (buffer) {
      return new Promise((resolve, reject) => {
        try {
          let base64 = "data:image/jpg;base64," + btoa(String.fromCharCode(...new Uint8Array(buffer)))
          resolve(base64)
        } catch (error) {
          console.log("error", error)
          resolve("data:image/jpg;base64,") // return blank
          // reject(new Error("Failed to read the blob as a data URL"))
        }
      })
    }
  }
}
</script>

<style lang="scss">
.setWidth {
  width: 50%;
}
.profileBox {
  width: 500px;
  max-width: 100%;
}
.makeCenter {
  text-align: center;
}
.nowrap {
  white-space: nowrap;
}
</style>
