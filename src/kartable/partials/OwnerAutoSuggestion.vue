<template>
  <form-wrapper>
    <fit>
      <div class="row full-height fit">
        <div class="col-4">
          <div class="column q-gutter-y-sm">
            <safa-text
              label="نام"
              label-width="75px"
              v-model="formModel.pFirstName"
              cdcName="FirstName"
              @keydown.enter="search"
            />
            <safa-text
              label="نام خانوادگی"
              label-width="75px"
              v-model="formModel.pLastName"
              cdcName="LastName"
              @keydown.enter="search"
            />
            <safa-text
              label="کد ملی"
              label-width="75px"
              v-model="formModel.pNationalCode"
              cdcName="NationalCode"
              @keydown.enter="search"
            />
            <div class="flex items-center no-wrap q-gutter-x-sm">
              <safa-label style="min-width: 60px">متقاضی</safa-label>
              <div class="flex items-center q-gutter-x-sm no-wrap">
                <safa-radio
                  label="مالک"
                  v-model="formModel.pIsOwner"
                  :val="true"
                  size="xs"
                />
                <safa-radio
                  label="وکیل"
                  v-model="formModel.pIsOwner"
                  :val="false"
                  size="xs"
                />
              </div>
            </div>
            <q-separator class="q-mt-sm" />
            <div class="flex items-start justify-center maxWidth">
              <btn-search label="جستجو" @click="search" />
            </div>
          </div>
        </div>
        <div class="col-auto">
          <q-separator vertical class="full-height q-mx-sm" />
        </div>
        <div class="col">
          <fit>
            <div class="column fit">
              <div
                class="flex items-center col-auto q-mb-sm bg-grey-2 q-px-sm q-py-sm text-grey-9 rounded-borders"
              >
                <div class="heading-4">نتایج جستجو</div>
                <q-space />
                <div
                  v-if="loading"
                  class="flex text-grey-6 q-gutter-x-sm text-body2 no-wrap items-center"
                >
                  <q-spinner color="primary" size="xs" />&nbsp; درحال جستجو...
                </div>
              </div>
              <div v-if="loading" class="col fullHeight">
                <div class="custom-scroll overflow-auto">
                  <q-list>
                    <q-item
                      v-for="aa in [...Array(7).keys()]"
                      :key="aa"
                      style="max-width: 300px"
                    >
                      <q-item-section avatar>
                        <q-skeleton type="QAvatar" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          <q-skeleton type="text" />
                        </q-item-label>
                        <q-item-label caption>
                          <q-skeleton type="text" width="65%" />
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
              <div
                v-else-if="list.length === 0"
                class="flex items-center justify-center rounded-borders fullHeight"
                style="height: calc(100% - 55px); border: 2px dashed #eaeaea"
              >
                <div
                  class="column items-center justify-center q-gutter-sm relative-position"
                >
                  <div style="z-index: 0">
                    <q-icon
                      :name="isNoResult ? 'info' : 'travel_explore'"
                      size="100px"
                      color="grey-3"
                    />
                  </div>
                  <div
                    class="text-no-wrap heading-2 text-grey-6"
                    style="z-index: 1"
                  >
                    <span v-if="isNoResult">نتیجه ای یافت نشد.</span>
                    <span v-else>جهت مشاهده نتایح، ابتدا جستجو نمایید.</span>
                  </div>
                </div>
              </div>
              <div v-else class="col fullHeight">
                <q-scroll-area style="height: 100%">
                  <q-list separator>
                    <q-item
                      v-for="(item, i) in list"
                      @click="selectItem(item)"
                      :key="item.GID"
                      class="q-py-sm"
                      clickable
                      v-ripple
                      dense
                    >
                      <q-item-section avatar size="sm">
                        <q-avatar color="grey-5" text-color="white" size="30px">
                          {{ i + 1 }}
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label class="text-body3">{{
                          item.OwnerFirstName + " " + item.OwnerLastName
                        }}</q-item-label>
                        <q-item-label caption lines="1"
                          >
                          <!-- کدملی:&nbsp;{{
                            item.OwnerNationalCode
                          }}&nbsp;|&nbsp; -->
                          تاریخ ایجاد درخواست:&nbsp;{{item.CreatDate + " - " + item.CreateTime}}
                          <!-- &nbsp;|&nbsp;شماره موبایل:&nbsp;{{
                            item.OwnerMobile
                          }} -->
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side size="sm">
                        <q-icon name="chevron_left" color="grey" size="sm" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-scroll-area>
              </div>
            </div>
          </fit>
        </div>
      </div>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  name: "OwnerAutoSuggestion",
  props: {
    value: Object
  },
  data () {
    return {
      loading: false,
      formModel: {
        pFirstName: "",
        pLastName: "",
        pNationalCode: "",
        pNidUser: this.getNidUser(),
        pIsOwner: true
      },
      list: [],
      isNoResult: false
    }
  },
  methods: {
    async search () {
      try {
        this.loading = true
        const payload = { ...this.formModel }
        this.showLoading()
        // http://192.168.100.170:7000/UGP/CrowdUgp/SrvCrowdNew.svc/json/SearchInUGP_AuthenticationHistory
        const { data } =
          await this.$services.crud.searchInUGPAuthenticationHistory(payload)
        const result = [...data.UGP_AuthenticationHistoryList].slice(0, 100) // چون با تعداد زیاد هنگ میکرد موقتا 100 تای اول رو فیلتر کردم
        this.isNoResult = result.length === 0
        this.list = result
      } catch (e) {
        this.showError(e.message)
      } finally {
        this.loading = false
        this.hideLoading()
      }
    },
    selectItem (item) {
      this.$emit("input", item)
      this.$emit("hide")
    }
  }
}
</script>
