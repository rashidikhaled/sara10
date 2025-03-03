<template>
  <fit>
    <div class="changeset-viewer">
      <div class="changeset-viewer-header q-pb-sm q-mb-sm">
        <div class="text-subtitle2 row q-gutter-sm items-center">
          <div
            color="primary"
            style="
              margin-bottom: 0;
              font-size: 14px;
              color: #181818;
              font-weight: normal;
            "
          >
            نام فرم:
          </div>
          <div
            style="
              margin-bottom: 0;
              font-size: 14px;
              color: #181818;
              font-weight: normal;
              overflow: hidden;
              white-space: nowrap;
              width: 400px;
              text-overflow: ellipsis;
            "
          >
            {{ data.action.formCaption }} ({{ data.action.formName }})
          </div>
        </div>
        <div class="text-h6 row q-gutter-sm items-center">
          <span class="text-subtitle2 text-grey-6" style="font-weight: 400">
            ({{ data.logTime }} - {{ data.logDate }}) &nbsp;<q-badge
              color="green"
            >
              {{ actionTypeCodeToTitle(data.actionType) }}
            </q-badge>
          </span>
        </div>
      </div>
    </div>

    <div class="row q-col-gutter-sm q-px-sm">
      <div class="col">
        <q-list bordered padding class="rounded-borders">
          <q-item-label header>اطلاعات پایه</q-item-label>
          <q-item clickable v-ripple @click="copy(data.userName)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="how_to_reg"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">نام کاربری</q-item-label>
              <q-item-label caption>{{ data.userName ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.bizCode)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="code"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <!-- <q-item-section>
              <q-item-label lines="1">کد</q-item-label>
              <q-item-label caption>{{ data.bizCode ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.action.formCaption)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="where_to_vote"
                color="primary"
                text-color="white"
              />
            </q-item-section> -->

            <q-item-section>
              <q-item-label lines="1">عنوان فرم</q-item-label>
              <q-item-label caption>{{
                data.action.formCaption
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.workFlowType)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="dvr"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">نوع جریان کار</q-item-label>
              <q-item-label caption>{{ data.workFlowType ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.logDate)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="date_range"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">تاریخ ثبت</q-item-label>
              <q-item-label caption>{{ data.logDate ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.logTime)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="access_time"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">زمان ثبت</q-item-label>
              <q-item-label caption>{{ data.logTime ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.computerName)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="laptop_mac"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">نام کامپیوتر</q-item-label>
              <q-item-label caption>{{ data.computerName ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.ip)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="code"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">IP</q-item-label>
              <q-item-label caption>آی پی</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col">
        <q-list bordered padding class="rounded-borders">
          <q-item-label header>اطلاعات بیشتر</q-item-label>
          <q-item clickable v-ripple @click="copy(data.applicationTitle)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="storage"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">عنوان برنامه</q-item-label>
              <q-item-label caption>{{
                data.applicationTitle
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.applicationName)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="storage"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">نام برنامه</q-item-label>
              <q-item-label caption>{{ data.applicationName ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.jobLocation)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="location_on"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">محل خدمت</q-item-label>
              <q-item-label caption>{{ data.jobLocation ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.description)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="description"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">توضیحات</q-item-label>
              <q-item-label caption>{{ data.description ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.bizCodeTitle)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="code"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <!-- <q-item-section>
              <q-item-label lines="1">عنوان کد</q-item-label>
              <q-item-label caption>{{ data.bizCodeTitle ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.domains)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="view_module"
                color="primary"
                text-color="white"
              />
            </q-item-section> -->

            <q-item-section>
              <q-item-label lines="1">دامنه</q-item-label>
              <q-item-label caption>{{ data.domains ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(actionTypeCodeToTitle(data.actionType))" >
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="local_activity"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">نوع فعالیت</q-item-label>
              <q-item-label caption>{{
                actionTypeCodeToTitle(data.actionType)
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="copy(data.bizCodeArchive)">
            <q-item-section avatar top>
              <q-avatar
                size="30px"
                icon="code"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">کد آرشیو</q-item-label>
              <q-item-label caption>{{ data.bizCodeArchive ?? ' --- ' }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </fit>
</template>
<script>
import { copyToClipboard } from "quasar"
import monitoringMixin from "../mixins/monitoringMixin"

export default {
  mixins: [monitoringMixin],
  inheritAttrs: true,
  name: "NewDetails",

  props: {
    data: null
  },

  methods: {
    copy (text) {
      // const self = this
      copyToClipboard(text).then(() => {
        // self.$q.notify({
        //   color: 'primary',
        //   message: 'اطلاعات کپی شد.',
        //   icon: 'file_copy'
        // })
      })
    }
  }
}
</script>
