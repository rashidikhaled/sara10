<template>
  <q-dialog :value="value" @input="closeModal" persistent>
    <q-card style="width: 500px; max-width: 80vw">
      <div id="choose-another-task" v-if="taskInfo">
        <div class="choose-list" style="min-height: 300px">
          <div class="q-pa-sm">
            <q-radio dense v-model="referralMode" val="doing"
              >ارجاع به انجام دهنده</q-radio
            >
          </div>
          <div class="q-pa-sm" v-if="allowReferralToReferrer">
            <q-radio dense v-model="referralMode" val="referral"
              >ارجاع به ارجاع دهنده</q-radio
            >
          </div>
          <div class="row q-pa-sm">
            <q-radio v-model="referralMode" dense val="list" class="col-6"
              >انتخاب از لیست</q-radio
            >
            <safa-text label="جستجو :" v-model="searchTxt" class="col-6" />
          </div>

          <q-separator />

          <div
            class="relative-position full-height"
            :class="{ 'refferal-checked': referralMode !== 'list' }"
          >
            <q-list style="min-height: 300px" class="refferal-list">
              <q-item-label header>
                <div
                  class="flex q-gutter-x-sm justify-between items-center"
                  style="min-height: 18px"
                >
                  <span>ارجاع شود به:</span>
                  <q-space />
                  <span
                    ><small v-if="selectedItem" class="text-bold text-dark">
                      <q-icon name="check" size="15px" color="green" />
                      {{ selectedItem.UserGroupTitle }}</small
                    ></span
                  >
                </div>
              </q-item-label>
              <template v-if="!isLoading">
                <q-item
                  :active="
                    selectedItem &&
                    selectedItem.NidUserGroup === item.NidUserGroup
                  "
                  :key="index"
                  :disable="referralMode !== 'list'"
                  v-for="(item, index) in filterdAssigneeByName"
                  @click="selectedItem = item"
                  active-color="green"
                  active-class="bg-green-2 text-grey-10"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar style="min-width: 24px">
                    <transition name="fade">
                      <q-icon
                        name="check_box"
                        color="green"
                        size="sm"
                        v-if="
                          selectedItem &&
                          selectedItem.NidUserGroup === item.NidUserGroup
                        "
                      />
                      <q-icon
                        name="check_box_outline_blank"
                        color="grey"
                        size="sm"
                        v-else
                      />
                    </transition>
                  </q-item-section>
                  <q-item-section avatar style="min-width: 24px">
                    <user-avatar
                      :src="item.NidUserGroup | avatar"
                      size="32px"
                      :default-src="getDefaultImage(item)"
                    />
                  </q-item-section>
                  <q-item-section>{{ item.UserGroupTitle }}</q-item-section>
                  <q-item-section side>
                    <q-icon :name="isGroup(item) ? 'people' : 'person'" />
                    {{ isGroup(item) ? "گروه" : "کاربر" }}
                  </q-item-section>
                </q-item>
              </template>
              <template v-else>
                <q-item
                  :ripple="false"
                  :clickable="false"
                  :key="i"
                  class="skelton--item"
                  v-for="i in [1, 2, 3]"
                >
                  <q-item-section avatar style="min-width: 24px">
                    <span class="task-row-col">
                      <span class="task-rn-num">
                        <q-spinner-puff color="grey" />
                      </span>
                    </span>
                  </q-item-section>
                  <q-item-section>
                    <q-skeleton animation="fade" type="rect" />
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
            <div
              v-if="referralMode === 'referral'"
              class="absolute-full referral-box"
            >
              <div class="absolute-full bg-overlay"></div>
              <div class="referral-info full-width">
                <div class="q-mb-sm" style="z-index: 10">
                  <h4 class="text-body2 q-mb-xs text-black">
                    <q-icon name="check" color="green" size="xs" />
                    ارجاع دهنده
                  </h4>
                  <hr />
                </div>
                <div class="referral-img" style="z-index: 10">
                  <q-img
                    img-class="rounded-borders shadow-1"
                    :src="taskInfo.CreatedBy | avatar"
                    width="128px"
                    height="128px"
                  />
                </div>
                <div class="referral-content text-center text-dark text-body2">
                  {{ getUserDisplayName() }}
                </div>
              </div>
            </div>
            <div
              v-if="referralMode === 'doing'"
              class="absolute-full referral-box"
            >
              <div class="absolute-full bg-overlay"></div>
              <div class="referral-info full-width">
                <div class="q-mb-sm" style="z-index: 10">
                  <h4 class="text-body2 q-mb-xs text-black">
                    <q-icon name="check" color="green" size="xs" />
                    انجام دهنده
                  </h4>
                  <hr />
                </div>
                <div v-if="doingUser">
                  <div class="referral-img" style="z-index: 10">
                    <q-img
                      img-class="rounded-borders shadow-1"
                      :src="doingUser.AssingTo | avatar"
                      width="128px"
                      height="128px"
                    />
                  </div>
                  <div
                    class="referral-content text-center text-dark text-body2"
                  >
                    {{ doingUser.AssingToUserName }}
                  </div>
                </div>
                <div v-else>
                  <q-spinner color="primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--<q-separator/>
        <div class="info-box">
          <div class="flex items-center"><span>نوع درخواست:</span>
            <span style="flex-grow: 1"><input
              :value="taskInfo.WorkflowTitel" onclick="this.select()" readonly style="width: 100%"/></span></div>
          <div class="flex items-center"><span>مرحله جاری:</span>
            <span style="flex-grow: 1"><input
              :value="taskInfo.TaskTitel" onclick="this.select()" readonly style="width: 100%"/></span></div>
          <div class="flex items-center"><span>شماره درخواست:</span>
            <span style="flex-grow: 1"><input
              :value="taskInfo.NidWorkItem" onclick="this.select()" readonly style="width: 100%"/></span></div>
        </div>-->
        <q-separator />
        <div class="q-pa-sm">
          <text-template
            formKey="TaskReference"
            required
            label="توضیحات"
            :label-shrink="true"
            type="textarea"
            height="100px"
            :rows="4"
            v-model="description"
          />
        </div>
        <q-separator />
        <div class="q-pa-sm">
          <div class="select-actions row q-col-gutter-x-sm">
            <div class="col-6">
              <q-btn
                outline
                @click="closeModal"
                :disable="isLoading"
                color="grey"
                class="full-width"
                >انصراف</q-btn
              >
            </div>
            <div class="col-6">
              <q-btn
                v-if="referralMode !== 'list'"
                :disable="isLoading"
                :loading="isLoading"
                @click="save"
                class="full-width"
                color="primary"
                >ارجاع
              </q-btn>
              <q-btn
                v-else
                :disable="selectedItem === null || isLoading"
                :loading="isLoading"
                @click="save"
                class="full-width"
                color="primary"
                >ارجاع
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { assignTo, getAssignDoingTask } from "../services/task"
import kartableMixin from "../mixins/kartableMixin"
// import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "ReferenceDialog",
  mixins: [kartableMixin],
  props: {
    value: Boolean,
    allowAssign: Array,
    taskInfo: Object
  },
  data () {
    return {
      selectedItem: null,
      isLoading: false,
      description: "",
      doingUser: null,
      referralMode: "list", // list, referrer, doing
      searchTxt: ""
    }
  },
  // mounted () {
  //   debugger
  //   console.log(this.taskInfo)ProcInitiatorName
  // },
  methods: {
    fetchDoingUser () {
      if (this.doingUser) return

      getAssignDoingTask({
        NidFromTask: this.taskInfo.NidTask
      })
        .then(({ data }) => {
          if (data.status === 200) {
            this.doingUser = data.data.Task
          }
        })
        .catch((ex) => {
          console.error(ex)
        })
    },
    closeModal () {
      this.selectedItem = null
      this.$emit("input", false)
    },
    save () {
      let invalidComment = false
      const taskLauncherSendToBackValidator = window.getConfigValue('taskLauncherSendToBackValidator')
      if (taskLauncherSendToBackValidator && typeof taskLauncherSendToBackValidator === 'object') {
        let reg = ['/^/']
        if (taskLauncherSendToBackValidator?.persianChars)
        { reg.push('\u0600-\u06FF') }
        if (taskLauncherSendToBackValidator?.englishChars)
        { reg.push('a-zA-Z') }
        if (taskLauncherSendToBackValidator?.speicalChars)
        { reg.push('-._!"`\'#%&,:;<>=@{}~\\$\\(\\)\\*\\+\\/\\\\?\\[\\]\\^\\|') }
        if (taskLauncherSendToBackValidator?.digitChars)
        { reg.push('0-9') }
        if (taskLauncherSendToBackValidator?.spaceChars)
        { reg.push('\\s') }
        if (reg.length === 1)
        {
          invalidComment = true
        }

        invalidComment = !(new RegExp(`^[${reg.join('')}]+$`).test(this.description))
      }

      if (invalidComment) {
        return this.showError("خطا در اعتبارسنجی: توضیحات وارد شده معتبر نمیباشد!", {
          title: "خطا"
        })
      }

      if (!this.description) {
        this.showError("توضیحات وارد نشده است.")
        return
      }
      this.isLoading = true
      let NidAssignTo = ""
      let EumAssingType = ""
      let NidAssignToFullName = ""

      switch (this.referralMode) {
        case "list":
          NidAssignTo = this.selectedItem.NidUserGroup
          EumAssingType = this.selectedItem.UserGroupType
          NidAssignToFullName = this.selectedItem.UserGroupTitle
          break
        case "referral":
          NidAssignTo = this.taskInfo.CreatedBy
          EumAssingType = 0
          NidAssignToFullName = this.taskInfo.CreatedByName
          break
        case "doing":
          NidAssignTo = (this.doingUser && this.doingUser.AssingTo) || ""
          EumAssingType = (this.doingUser && this.doingUser.EumAssingType) || 0
          NidAssignToFullName =
            (this.doingUser && this.doingUser.AssingToUserName) || ""
          break
      }

      assignTo({
        // 'NidTask': this.taskInfo.NidTask,
        // 'AssignUser': this.selectedItem.NidUserGroup,
        NidUser: this.getNidUser(),
        NidFromTask: this.taskInfo.NidTask,
        NidAssignTo,
        EumAssingType,
        NidAssignToFullName,
        UserName: this.getUserDisplayName(),
        Desc: this.description
      })
        .then(({ data }) => {
          this.handleMsg(data, "ارجاع پرونده با موفقیت انجام شد.")
          if (data.success) {
            this.isLoading = false
            this.redirectToKartable()
          }
        })
        .catch((err) => {
          this.isLoading = false
          this.showError("خطا در سرور.")
          console.error(err)
        })
    },
    convertToArabic (str) {
      if (typeof str === "number") str = str.toString().trim()
      if (typeof str !== "string") return str
      return (
        str
          .replace(/ی/g, "ي")
          .replace(/ک/g, "ك")
          // // .replace(/ه/g, 'ة')
          .replace(/\u0643/g, "\u06A9") // ک
          // .replace(/\u0649/g, '\u06CC') // ی
          // .replace(/\u064A/g, '\u06CC') // ی
          .trim()
      )
    }
  },
  computed: {
    allowReferralToReferrer () {
      return this.taskInfo.TaskSide === 1
    },
    filterdAssigneeByName () {
      return this.allowAssign.filter((x) => {
        return x.UserGroupTitle.toLowerCase().includes(
          this.convertToArabic(this.searchTxt.toLowerCase())
        )
      })
    }
  },
  watch: {
    referralMode () {
      if (this.referralMode === "doing") {
        this.fetchDoingUser()
      }
    }
  }
}
</script>

<style lang="scss">
#choose-another-task {
  .referral-box {
    .bg-overlay {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  .refferal-checked {
    .refferal-list {
      filter: blur(4px);
    }
  }

  .referral-info {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }

  .info-box {
    padding: 14px;
    background-color: #eee;

    > div {
      &:not(:last-child) {
        margin-bottom: 10px;
      }

      > span:first-child {
        margin-right: 7px;
        min-width: 90px;
      }
    }

    .referral-content {
      font-size: 20px;
      margin-top: 15px;
      z-index: 10;
      display: block;
      width: 100%;
      text-align: center;
      padding: 0 20px;
    }
  }

  .task-row-col {
    text-align: center;
    position: relative;
    min-width: 20px;
    min-height: 20px;
    display: inline-block;
    line-height: 20px;

    .task-rn-num,
    .task-rn-icon {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      left: 0;
      display: inline-block;
      text-align: center;
      transition: 0.2s all ease;
    }

    .task-rn-icon {
      opacity: 0;
      visibility: hidden;
    }
  }

  .choose-list .q-item:hover,
  .choose-list .q-item.q-item--active {
    &:not(.skelton--item) {
      .task-rn-icon {
        opacity: 1;
        visibility: visible;
        transition: 0.2s all ease;
      }

      .task-rn-num {
        opacity: 0;
        visibility: hidden;
        transition: 0.2s all ease;
      }
    }
  }

  .q-stepper__content {
    display: none;
  }
}
</style>
