<template>
  <fit>
    <safa-tabs v-model="currentTab">
      <template v-slot:tabs>
        <tab-menu name="actions" label="لیست فعالیت های صورت گرفته" />
        <tab-menu
          name="formList"
          label="لیست فرم ها و گزارشات انجام شده از ابتدا"
        />
        <tab-menu name="more" label="اطلاعات بیشتر" />
        <tab-menu name="comments" label="توضیحات" />
        <tab-menu name="acceptances" label="لیست تاییدات" />
      </template>
      <tab-content name="actions">
        <safa-datatable
          v-model="currentData"
          :columns="actionsColumn"
          @LogClick="getLog"
          m="r"
          title="لیست فعالیت های صورت گرفته"
          fit
          min-height="150px"
          height="100%"
          max-height="100%"
          :showRowNumber="false"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
        />
      </tab-content>
      <tab-content name="formList">
        <safa-datatable
          v-model="currentData.WorkflowInstanceLog"
          :columns="formListColumns"
          m="r"
          title="لیست فرم ها و گزارشات انجام شده از ابتدا"
          fit
          min-height="150px"
          height="100%"
          max-height="100%"
          :showRowNumber="false"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
        />
      </tab-content>
      <tab-content name="more">
        <!-- <q-list class="full-width">
          <template
              v-for="(prop, i) in currentData.ExtendedProp.PropList.filter(x=> x.PropType !=='Hidden')"
          >
            <q-item :key="i + 'p'">
              <q-item-section>
                {{ prop.PropTitle }}
              </q-item-section>
              <q-item-section side>
                {{ prop.PropValue }}
              </q-item-section>
            </q-item>
            <q-separator :key="i + 'sep'" inset/>
          </template>
        </q-list> -->
      </tab-content>
      <tab-content name="comments">
        <!-- <q-timeline>
          <q-timeline-entry
            v-for="(comment, i) in currentData.Comments"
            :key="i"
            class="q-mx-sm"
            :avatar="`http://dev.safarayaneh.com:7010/img/ProfilePics/${
              (i % 9) + 1
            }.png`"
            :title="comment.UserName"
            :subtitle="comment.CommentsDate + ' ساعت ' + comment.CommentsTime"
            :body="comment.Comments"
            :sent="comment.NidUser !== currentUser.UserGuid"
            :color22="
              comment.NidUser === currentUser.UserGuid ? 'grey-1' : 'blue-2'
            "
          >
          </q-timeline-entry>
        </q-timeline> -->
         <div class="task__comments custom-scroll">
        <transition-group
          name="fade"
          v-if="commentList.length>0"
        >
          <div
            :class="{'is-mine': isMine(item)}"
            :key="'cmt-'+index"
            class="task-cmt"
            v-for="(item,index) in commentList"
          >
            <div class="cmt--inner q-pa-md">
              <q-item class="q-pa-none">
                <q-item-section
                  avatar
                  top
                >
                  <user-avatar
                    :src="item.NidUser | avatar"
                    size="48px"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between">
                      <div class="col-auto cmt--username">{{ item.UserName }}&nbsp;<small
                        v-if="isMine(item)">(خودم)</small>
                      </div>
                      <div class="col-auto cmt--date">
                        <div
                          class="flex items-center"
                          style="line-height: normal;"
                        >
                          <span
                            class="task-cmt-ispublic"
                            title="قابل مشاهده توسط شهروند"
                            v-if="item.IsPublic"
                          >
                            <q-icon
                              name="perm_identity"
                              size="16px"
                            />
                          </span>
                          <span>{{ formatDate(item.createdAt) }}&nbsp;{{ item.CommentsTime }}</span>
                        </div>
                      </div>
                    </div>
                  </q-item-label>
                  <q-item-label
                    class="cmt--body"
                    style="line-height: 24px !important;font-size: 13px;margin-top: 10px;text-align: justify;white-space:pre-line"
                  >
                    {{ item.Comments }}
                  </q-item-label>
                </q-item-section>
                <!--<q-item-section side top>
                  <q-item-label caption lines="1"></q-item-label>
                </q-item-section>-->
              </q-item>
            </div>
            <div
              class="tsc--mention-wrapper items-start"
              v-if="item.MentionNidUser"
            >
              <q-separator/>
              <div
                class="tsc--mnt-header q-pl-lg q-pa-xs bg-grey-2"
                style="color: #777"
              >
                <div class="row q-col-gutter-sm items-center">
                  <div class="col-12 col-sm-auto">
                    <q-icon
                      color="amber-5"
                      name="mark_chat_unread"
                      size="xs"
                    />&nbsp;
                    {{ item.MentionComment ? 'پاسخ داده شده:' : 'منتظر اعلام نظر از:' }}
                  </div>
                  <div class="col-12 col-sm-auto">
                    <div class="flex items-center">
                      <span class="mnt--avatar q-mr-sm">
                        <user-avatar
                          :src="item.MentionNidUser | avatar"
                          default-src="../static/users.svg"
                          size="32px"
                        />
                      </span>
                      <div class="mnt--username">
                        "{{ item.MentionFullUserName }}"&nbsp;<small>&nbsp;در&nbsp;&nbsp;({{
                        item.MentionDate
                        }})</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mention-comments">
                  {{ item.MentionComment }}
                </div>
              </div>
            </div>
          </div>
        </transition-group>
        <div
          v-else
          :class="['column items-center justify-center border fit', $q.dark.isActive?'bg-lighten4 text-white':'text-grey bg-white']"
        >
          <div class="text-center">
            <q-icon
              name="message"
              size="48px"
            />
          </div>
          <div class="text-center q-mt-sm">موردی یافت نشد.</div>
        </div>
      </div>
      </tab-content>
      <tab-content name="acceptances"></tab-content>
    </safa-tabs>
    <safa-popup v-model="isShowDetailModal">
      <safa-datatable
        title="جزئیات"
        helper="logDetail"
        v-model="logDetail"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        paginate
      />
    </safa-popup>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from 'persian-date'

export default {
  name: "commission-gardesh-parvandeh",
  mixins: [baseFormMixin],
  props: {
    title: {
      type: String,
      default: "گردش پرونده شهرسازی"
    },
    formKey: {
      type: String,
      default: "DC427C0A-6FFB-4437-B04C-0F9EA3BCB2C6"
    }
  },

  data () {
    return {
      name: "commission-gardesh-parvandeh",
      result: null,
      loading: false,
      isShowDetailModal: false,
      currentTab: "actions",
      currentData: {},
      logDetail: [],
      commentList: [],
      NidProc: "00000000-0000-0000-0000-000000000000",

      actionsColumn: [
        {
          field: "Log",
          title: "+",
          editor: "action",
          label: "+",
          width: "50px"
        },
        { field: "NidSort", title: "ردیف" },
        { field: "TaskTitel", title: "نام فعالیت" },
        { field: "CreatedByName", title: "درخواست کننده کار" },
        { field: "AssingToUserName", title: "ارجاع شده به" },
        { field: "TransformUserName", title: "انجام دهنده" },
        { field: "TaskStartDate", title: "تاریخ شروع" },
        { field: "TaskStartTime", title: "ساعت شروع" },
        { field: "TaskCloseDate", title: "تاریخ پایان" },
        { field: "TaskCloseTime", title: "ساعت پایان" }
      ],
      formListColumns: [
        { field: "name", title: "نام فرم یا گزارش" },
        { field: "name1", title: "انجام دهنده" },
        { field: "name2", title: "تاریخ" },
        { field: "name3", title: "ساعت" },
        { field: "name4", title: "نوع فعالیت" }
      ]
    }
  },

  methods: {
    formatDate (dt) {
      const newDt = new PersianDate(new Date(dt)).add('minutes', 4)
      return newDt.format('L, LT')
    },
    isMine (cmt) {
      return cmt.NidUser.toLowerCase() === this.getNidUser().toLowerCase()
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
    getLog (row) {
      this.isShowDetailModal = true
    },
    async getComments () {
      try {
        this.loading = true
        const { data } = await this.$srvWorkflow.getComments({
          NidProc: this.NidProc
          // NidProc: "65526cd4-3ed8-4890-898a-633fbb744f77"

        })

        if (data.success) {
          this.commentList = data.data
          if (this.commentList.length > 0) {
            const usersList = []
            usersList.push(
              ...this.commentList.map((item) => {
                let r = {}
                r.label = item.UserName || 'بدون نام'
                r.value = item.NidUser
                return r
              })
            )
            this.users = this.removeDuplicateObjectFromArray(
              usersList,
              'value'
            )
          }
        } else {
          this.showError(data.msg)
        }
      } catch (e) {
        console.log('error', e)
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.loading = false
      }
    },
    async load () {
      this.showLoading()
      this.loading = true

      const payload =
      {
        PRequest: {
          NidProc: this.NidProc
          // NidProc: "65526cd4-3ed8-4890-898a-633fbb744f77"
        }
      }
      await this.$services.commissions
        .commisionGetAllTaskByNidProc(payload)
        .then(async ({ data }) => {
          this.getProcessInfoRes = this.getResponse(data)
          if (this.getProcessInfoRes.success) {
            this.currentData = this.getProcessInfoRes.data.GetAllTaskByNidProcResult.ClsGetAllTaskResponse.data
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
      // try {
      //   this.loading = true;
      //   const { data } = await this.$srvWorkflow.getProcessInfo({
      //     PNidProc: this.NidProc,
      //   });
      //   this.result = this.getResponse(data);
      //   if (this.result.success !== true) {
      //     return this.showError("Data has not been fetched");
      //   }
      //   this.currentData = this.result.data;

      //   // end
      // } catch (e) {
      //   this.showError("خطایی در سرویس رخ داد");
      // } finally {
      //   this.loading = false;
      // }
    }
  }

}
</script>
