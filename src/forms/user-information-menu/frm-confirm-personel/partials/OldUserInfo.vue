<template>
  <FormWrapper :title="`پیش نمایش اطلاعات کاربر ${value.username}`">
    <fit>
      <safa-notice type="warning">
        {{
          `کاربر گرامی ، شما در حال بروز رسانی اطلاعات کاربر "  ${value.username} " هستید ، لطفا اطلاعات زیر را با دقت بررسی کنید و از صحت آن اطمینان حاصل نمایید. اطلاعات پس از تایید و ثبت نهایی، امکان بازآوری ندارند.`
        }}
      </safa-notice>

      <div class="q-gutter-lg">
        <div class="flex items-center">
          <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
          <span style="min-width: 110px"> نام کاربر : </span>
          <span class="beforeVal">
            {{ model.firstName === "" ? " --- " : model.firstName }}
          </span>
          <q-icon
            class="images-icon q-mx-lg"
            size="sm"
            color="primary"
            name="chevron_left"
          />
          <div class="flex items-center q-gutter-sm">
            <span
              style="min-width: 120px"
              :style="
                model.firstName !== value.firstName
                  ? 'font-weight:bold;color:primary'
                  : ''
              "
            >
              {{ value.firstName === "" ? " --- " : value.firstName }}
            </span>
          </div>
        </div>

        <div class="flex items-center">
          <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
          <span style="min-width: 110px"> نام خانوادگی : </span>
          <span class="beforeVal">
            {{ model.lastName === "" ? " --- " : model.lastName }}
          </span>
          <q-icon
            class="images-icon q-mx-lg"
            size="sm"
            color="primary"
            name="chevron_left"
          />
          <div class="flex items-center q-gutter-sm">
            <span
              style="min-width: 120px"
              :style="
                model.lastName !== value.lastName
                  ? 'font-weight:bold;color:primary'
                  : ''
              "
            >
              {{ value.lastName === "" ? " --- " : value.lastName }}
            </span>
          </div>
        </div>

        <div class="flex items-center">
          <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
          <span style="min-width: 110px"> محل خدمت : </span>
          <span class="beforeVal">
            {{
              model.jobLocation.name === "" ? " --- " : model.jobLocation.name
            }}
          </span>
          <q-icon
            class="images-icon q-mx-lg"
            size="sm"
            color="primary"
            name="chevron_left"
          />
          <div class="flex items-center q-gutter-sm">
            <span
              style="min-width: 120px"
              :style="
                model.jobLocation.name !== value.jobLocation.name
                  ? 'font-weight:bold;color:primary'
                  : ''
              "
            >
              {{
                value.jobLocation.name === "" ? " --- " : value.jobLocation.name
              }}
            </span>
          </div>
        </div>

        <div class="flex items-center">
          <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
          <span style="min-width: 110px"> مناطق : </span>
          <span class="beforeVal">
            {{
              model.jobLocation.allowDomains === ""
                ? " --- "
                : model.jobLocation.allowDomains
            }}
          </span>
          <q-icon
            class="images-icon q-mx-lg"
            size="sm"
            color="primary"
            name="chevron_left"
          />
          <div class="flex items-center q-gutter-sm">
            <span
              style="min-width: 120px"
              :style="
                model.jobLocation.allowDomains !== valueAllowDomains
                  ? 'font-weight:bold;color:primary'
                  : ''
              "
            >
              {{ valueAllowDomains === "" ? " --- " : valueAllowDomains }}
            </span>
          </div>
        </div>

        <div class="flex items-center">
          <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
          <span style="min-width: 110px"> کد ملی : </span>
          <span class="beforeVal">
            {{ model.IDNumber === "" ? " --- " : model.IDNumber }}
          </span>
          <q-icon
            class="images-icon q-mx-lg"
            size="sm"
            color="primary"
            name="chevron_left"
          />
          <div class="flex items-center q-gutter-sm">
            <span
              style="min-width: 120px"
              :style="
                model.IDNumber !== value.IDNumber
                  ? 'font-weight:bold;color:primary'
                  : ''
              "
            >
              {{ value.IDNumber === "" ? " --- " : value.IDNumber }}
            </span>
          </div>
        </div>

        <div class="flex items-center">
          <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
          <span style="min-width: 110px"> تاریخ تولد : </span>
          <span class="beforeVal">
            {{ model.birthDate === "" ? " --- " : model.birthDate }}
          </span>
          <q-icon
            class="images-icon q-mx-lg"
            size="sm"
            color="primary"
            name="chevron_left"
          />
          <div class="flex items-center q-gutter-sm">
            <span
              style="min-width: 120px"
              :style="
                model.birthDate !== value.birthDate
                  ? 'font-weight:bold;color:primary'
                  : ''
              "
            >
              {{ value.birthDate === "" ? " --- " : value.birthDate }}
            </span>
          </div>
        </div>

        <div class="flex items-center">
          <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
          <span style="min-width: 110px"> تلفن همراه : </span>
          <span class="beforeVal">
            {{ model.mobile === "" ? " --- " : model.mobile }}
          </span>
          <q-icon
            class="images-icon q-mx-lg"
            size="sm"
            color="primary"
            name="chevron_left"
          />
          <div class="flex items-center q-gutter-sm">
            <span
              style="min-width: 120px"
              :style="
                model.mobile !== value.mobile
                  ? 'font-weight:bold;color:primary'
                  : ''
              "
            >
              {{ value.mobile === "" ? " --- " : value.mobile }}
            </span>
          </div>
        </div>
      </div>
      <!-- <q-separator class="q-my-md" /> -->

      <FormRow class="q-gutter-sm q-mt-md">
        <div class="col-12">
          <div class="parentImages">
            <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
            <div class="title-side">تصویر کاربر</div>
            <div class="images-side">
              <span class="image beforeImage">
                <CustomImage
                  width="50px"
                  height="50px"
                  v-model="model.userPic"
                />
              </span>
              <q-icon
                class="images-icon q-mx-lg"
                size="sm"
                color="primary"
                name="chevron_left"
              />
              <span class="image">
                <CustomImage
                  width="50px"
                  height="50px"
                  v-model="value.userPic"
                />
              </span>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="parentImages">
            <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
            <div class="title-side">اثر انگشت کاربر</div>
            <div class="images-side">
              <span class="image beforeImage">
                <CustomImage
                  width="50px"
                  height="50px"
                  v-model="model.fingerprintImage"
                />
              </span>
              <q-icon
                class="images-icon q-mx-lg"
                size="sm"
                color="primary"
                name="chevron_left"
              />
              <span class="image">
                <CustomImage
                  width="50px"
                  height="50px"
                  v-model="value.fingerprintImage"
                />
              </span>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="parentImages">
            <safa-checkbox v-model="checkboxModel" m="r" size="xs" style="min-width: 25px" />
            <div class="title-side">نمونه امضا کاربر</div>
            <div class="images-side">
              <span class="image beforeImage">
                <CustomImage
                  width="50px"
                  height="50px"
                  v-model="model.signatureImage"
                />
              </span>
              <q-icon
                class="images-icon q-mx-lg"
                size="sm"
                color="primary"
                name="chevron_left"
              />
              <span class="image">
                <CustomImage
                  width="50px"
                  height="50px"
                  v-model="value.signatureImage"
                />
              </span>
            </div>
          </div>
        </div>
      </FormRow>
    </fit>
    <template #footer>
      <div class="q-gutter-sm">
        <btn-default
          label="تایید تغییرات در پیش نویس برای کاربر"
          @click="confirmAndActiveOldUser"
        />
      </div>
    </template>
  </FormWrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import userInfoMixin from "../../mixins/userInfoMixin"
import CustomImage from "./CustomImage.vue"

export default {
  components: { CustomImage },
  mixins: [baseFormMixin, userInfoMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      valueAllowDomains: "",
      oldUserData: null,
      checkboxModel: true,
      model: {
        NidUser: "00000000-0000-0000-0000-000000000000",
        firstName: "",
        lastName: "",
        IDNumber: "",
        birthDate: "",
        tel: "",
        mobile: "",
        userPic: null,
        signatureImage: null,
        fingerprintImage: null,
        jobLocation: {
          name: "",
          allowDomains: ""
        }
      }
    }
  },
  created () {
    this.loadObj()
    if (
      this.value?.jobLocation?.allowDomains &&
      Array.isArray(this.value.jobLocation.allowDomains)
    ) {
      this.valueAllowDomains = this.value.jobLocation.allowDomains.toString()
    } else this.valueAllowDomains = ""
  },
  methods: {
    async loadObj () {
      try {
        const payload = {
          from: 1,
          to: 10,
          search: "",
          filter: [["username", this.value.username]],
          populate: true
        }
        this.showLoading()
        const { data } = await this.$services.security.userList(payload)
        const res = this.getResponse(data)
        if (res.success) {
          if (res.data.data.list) {
            this.oldUserData = res.data.data.list[0]
            const obj = {
              ...this.oldUserData,
              jobLocation: {
                name: this.oldUserData?.jobLocation?.name ?? "",
                allowDomains:
                  this.oldUserData?.jobLocation &&
                  Array.isArray(this.oldUserData?.jobLocation?.allowDomains)
                    ? this.oldUserData?.jobLocation?.allowDomains.toString()
                    : ""
              },
              userPic: null
            }
            this.model = obj
            await this.getImageByID(this.value.NidUser)
            if (this.model.signatureImage) {
              this.model.signatureImage = await this.b64ToArr(
                this.model.signatureImage
              )
            }
            if (this.model.fingerprintImage) {
              this.model.fingerprintImage = await this.b64ToArr(
                this.model.fingerprintImage
              )
            }
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async b64ToArr (base64image) {
      const tmp = this.dataURLtoFile(base64image, "fileName")
      const res = await this.fileToByteArray(tmp)
      return res
    },
    confirmAndActiveOldUser () {
      this.$emit("confirm", this.oldUserData)
    }
  },

  watch: {
    currentImageArr () {
      this.model.userPic = this.currentImageArr ?? null
    }
  }
}
</script>

<style lang="scss" scoped>
.beforeVal {
  min-width: 155px !important;
  color: #939393 !important;
}
.parentImages {
  display: flex;
  justify-content: start;
  align-items: center;

  .title-side {
    min-width: 110px;
  }
  .images-side {
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed #ddd;
      border-radius: 50%;
      overflow: hidden;
    }
    .beforeImage {
      opacity: 0.7;
      margin-right: 105px;
    }
  }
}
</style>
