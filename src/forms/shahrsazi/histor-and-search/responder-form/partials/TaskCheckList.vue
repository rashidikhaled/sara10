<template>
    <div
      :class="{ 'small-viewport': isSmallViewport }"
      id="workflow-checklist"
      v-if="!isLoading"
    >
      <div class="wfw-groups absolute-full" v-show="viewMode === 'default'">
        <fit>
          <div class="full-width wfw-search block q-pa-sm">
            <div
              :class="{ minisearch: isSmallViewport }"
              class="task__checklist_search q-px-sm q-py-xs"
            >
              <div class="row q-col-gutter-x-sm items-center">
                <div :class="{ 'q-mx-sm': !isSmallViewport }" class="col">
                  <div class="row items-center q-col-gutter-x-xs">
                    <div class="col-auto">
                      <q-icon
                        class="s-search"
                        color="grey"
                        name="search"
                        size="17px"
                        style="transform: scaleX(-1)"
                      />
                    </div>
                    <div class="col">
                      <input
                        placeholder="جستجو در چک لیست ..."
                        type="text"
                        v-model="searchTerm"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-auto" v-if="searchTerm.trim().length > 0">
                  <q-icon
                    @click="searchTerm = ''"
                    class="cursor-pointer"
                    color="grey"
                    name="close"
                    size="22px"
                  />
                </div>
                <div class="col-auto">
                  <q-separator inset style="height: 12px" vertical/>
                </div>
                <div class="col-auto">
                  <q-icon
                    @click="loadData"
                    class="cursor-pointer"
                    color="primary"
                    name="refresh"
                    size="22px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="fit checklist--container custom-scroll q-pt-lg q-pa-sm">
            <div
              :class="{ 'is--expanded': group.expanded }"
              :key="index"
              class="wfw--groupitem"
              v-for="(group, index) in filteredGroups"
            >
              <div class="wfw--groupitem-inner flex no-wrap q-mb-md">
                <div class="wfw--grp-status">
                  <span></span>
                </div>
                <div
                  class="wfw--grp-name cursor-pointer"
                >
                <span>
                    {{ group.name }}
                    <span
                      class="checklist-notify"
                      v-if="group.items.filter((x) => x.NeedToConfirm && !x.OwnerConfirm).length > 0"
                    >
                    {{ group.items.filter((x) => x.NeedToConfirm && !x.OwnerConfirm).length}}
                    مورد (نیاز به تایید مالک)
                  </span>
                </span>
                </div>
              </div>
              <q-slide-transition>
                <div v-show="group.expanded">
                  <div class="checklist--items q-pl-xl">
                    <div
                      :key="index"
                      class="wfw-checkitem q-mb-md"
                      v-for="(item, index) in group.items"
                    >
                      <div class="flex no-wrap">
                        <div class="wfw-status">
                        <span
                          :style="{
                            backgroundColor:
                              item.CI_CheckListValue === 1
                                ? '#4caf50'
                                : item.CI_CheckListValue === 2
                                ? '#ef5350'
                                : 'rgb(239 246 255)',
                          }"
                        >
                          <q-icon
                            color="white"
                            name="check"
                            v-if="item.CI_CheckListValue === 1"
                          />
                          <q-icon
                            color="white"
                            name="close"
                            v-else-if="item.CI_CheckListValue === 2"
                          />
                          <q-icon
                            color="blue-grey-5"
                            name="hourglass_top"
                            v-else
                          />
                        </span>
                        </div>
                        <div
                          :style="{ backgroundColor: item.Color }"
                          class="wfw-checkitem-inner"
                        >
                          <div
                            :style="{ backgroundColor: item.Color }"
                            class="wfw-checkitem--arrow"
                          ></div>
                          <div class="wfw--caption" style="flex-grow: 1">
                            <span class="q-mr-sm">
                              {{item.Caption}}
                            </span>
                            <span v-if="item.FullUserName!==null && item.FullUserName!==undefined ">
                              ( {{item.FullUserName}} )
                            </span>
                            </div>
                        </div>

                      </div>
                      <div class="checkitem--status-list">
                        <div
                          class="checklist--ismine flex no-wrap q-py-xs"
                          v-if="item.AllowEdit === 1"
                        >
                          <q-icon
                            class="chk--cmt-icon q-pr-xs"
                            name="person"
                            color="primary"
                            size="xs"
                            title="مرتبط با خودم"
                          />
                          <div class="chk--cmt-text text-primary">
                            مرتبط با خودم
                          </div>
                        </div>
                        <div
                          class="checklist--comments"
                          v-if="item.comments && item.comments.trim() !== ''"
                        >
                          <q-icon
                            class="chk--cmt-icon"
                            name="comment"
                            size="xs"
                            title="توضیحات"
                          />
                          <div class="chk--cmt-text">
                            <small class="text-grey-7">توضیحات:</small>&nbsp;{{
                            item.comments
                            }}
                          </div>
                        </div>
                        <div>
                          <div
                            :class="{
                            'is--accepted': item.OwnerConfirm === 1,
                            'is--rejected': item.OwnerConfirm === 2,
                          }"
                            class="items-center owner-alert"
                            v-if="item.OwnerConfirm"
                          >
                            <div class="ntc--icon">
                              <q-icon
                                color="green"
                                name="check"
                                v-if="item.OwnerConfirm === 1"
                              />
                              <q-icon color="red-4" name="close" v-else/>
                            </div>
                            <div class="ntc--text col">
                            <span
                              class="text-green-6 q-mr-sm"
                              v-if="item.OwnerConfirm === 1"
                            >درخواست توسط مالک تایید شد.</span
                            >
                              <span class="text-red-5 q-mr-sm" v-else
                              >درخواست توسط مالک رد شد.</span
                              >
                              <span v-if="item.OwnerComments">
                              <em
                                class="text-grey"
                                v-if="item.OwnerConfirm === 1"
                              >علت تایید:</em
                              >
                              <em class="text-grey" v-else>علت رد:</em>
                              "{{ item.OwnerComments }}"
                            </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-slide-transition>
            </div>
          </div>
        </fit>
      </div>
    </div>
    <div class="fit" v-else>
      <q-card class="q-mb-lg">
        <q-card-section>
          <q-skeleton height="34px" type="QInput" width="100%"/>
        </q-card-section>
      </q-card>
      <q-list>
        <q-item
          :key="i"
          class="q-mb-sm"
          v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]"
        >
          <q-item-section avatar style="min-width: 32px">
            <q-skeleton height="30px" type="QAvatar" width="30px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text"/>
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%"/>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
</template>
<script>

import {
  getCheckListByNidTask
} from '././services/task'
import kartableMixin from '././mixins/kartableMixin'

export default {
  name: 'TaskCheckList',
  mixins: [kartableMixin],
  data () {
    return {
      groups: [],
      comments: [],
      visibleState: {},
      viewMode: 'default',
      viewerTarget: '',
      searchTerm: '',
      checklistLoading: false,
      isSmallViewport: false,
      justMyChecklist: true,
      allChecklist: false,
      filteredGroups: [],
      isLoading: false
    }
  },
  props: {
    nidProc: String,
    nidTask: String,
    readonly: Boolean
  },
  computed: {},
  methods: {
    search () {
      const checkCaption = (item) =>
        !this.searchTerm
          ? true
          : item.Caption && item.Caption.indexOf(this.searchTerm.trim()) > -1

      this.filteredGroups = [
        ...(this.groups
          .map((g) => {
            return {
              ...g,
              items: g.items.filter(checkCaption)
            }
          })
          .filter((g) => g.items.length > 0) || [])
      ]
    },
    loadData () {
      if (!this.nidTask) {
        return
      }
      this.isLoading = true
      const method = getCheckListByNidTask // getCheckListByTaskFlow

      method({
        NidTask: this.nidTask,
        NidProc: this.nidProc
      })
        .then(({ data }) => {
          if (data.success) {
            this.bindGroups(data.data)
            this.search()
          } else {
            this.showError('خطا در دریافت اطلاعات چک لیست.')
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    bindGroups (list) {
      const tempGroups = list.reduce((groups, value) => {
        // Group initialization
        const groupName = value.StrGroup
        if (!groups[groupName]) {
          groups[groupName] = []
        }

        // Grouping
        groups[groupName].push(value)

        return groups
      }, {})

      this.groups = []
      for (let i = 0; i < Object.keys(tempGroups).length; i++) {
        const groupName = Object.keys(tempGroups)[i]
        const groupItems = tempGroups[groupName]
        this.groups = [
          ...this.groups,
          {
            name: groupName,
            items: groupItems.map((x, i) => ({
              ...x,
              newComment: x.comments || '',
              checkvalue: x.CI_CheckListValue,
              checkvalueComment: x.comments || ''
            })),
            expanded: true
          }
        ]
      }

      // this.$forceUpdate()
      // console.log(this.groups)
    }
  },
  beforeMount () {
    this.loadData()
  },
  watch: {
    searchTerm () {
      this.search()
    },
    groups () {
      this.search()
    },
    nidTask () {
      this.loadData()
    }
  }
}
</script>

<style lang="scss">
  #workflow-checklist {
    height: 100%;
    position: relative;

    .checklist--container {
      flex-grow: 1;
      min-height: 0;
    }
  }

  .task__checklist_search {
    border: 1px solid #bbb;
    background: #fff;
    border-radius: 3px;
    position: relative;

    input {
      width: 100%;
      border: none;
      padding: 0;
      height: 30px;
      border-radius: inherit;
    }
  }

  .wfw--groupitem {
    margin-bottom: 30px;
  }

  .wfw-checkitem {
    position: relative;

    .wfw-checkitem-inner {
      background: #e9f4ff;
      border: 1px solid #d3e3f4;
      padding: 8px;
      position: relative;
      flex-grow: 1;
      border-radius: 3px;
      min-height: 30px;

      .wfw-checkitem--arrow {
        position: absolute;
        display: inline-block;
        width: 8px;
        height: 8px;
        left: -8px;
        transform: rotate(45deg) translateY(-50%);
        top: 50%;
        border: 1px solid #d3e3f4;
        border-right: none;
        border-top: none;
        border-radius: 3px;
      }
    }

    .wfw--action {
      margin-top: 10px;

      .text-editor {
        width: 100%;

        textarea {
          border-radius: 3px;
          background-color: #fff;
          border: 1px solid #bbb;
          padding: 2px 5px;
          min-width: 100%;
          min-height: 30px;
          max-height: 140px;
          resize: vertical;

          &:focus {
            border-color: var(--q-color-primary);
          }
        }
      }

      .wfw--edit {
        input,
        select {
          border: 1px solid rgba(0, 0, 0, 0.6);
          border-radius: 2px;
          height: 24px;
          background-color: transparent;
        }
      }
    }

    .wfw-status {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-width: 50px;
      max-width: 50px;

      span {
        width: 24px;
        height: 24px;
        font-size: 16px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
        border-radius: 50px;
        padding: 4px;

        > i {
          font-size: inherit;
        }

        &:after,
        &:before {
          content: "";
          height: 60%;
          height: calc(50% + 10px);
          border-right: 1px dashed #ddd;
          position: absolute;
          left: 25px;
          z-index: -1;
        }

        &:after {
          top: 50%;
        }

        &:before {
          bottom: 50%;
        }
      }
    }

    &:first-child .wfw-status span:before,
    &:last-child .wfw-status span:after {
      height: 50%;
    }

    /*&:last-child .wfw-status {
        span:after {
          content: none;
          display: none;
        }
      }*/

    .checklist--comments {
      margin-top: 5px;
      padding: 6px;
      overflow: hidden;
      display: flex;

      .chk--cmt-icon {
        font-size: 20px;
        color: #777;
        margin-right: 5px;
      }

      .chk--cmt-text {
        flex-grow: 1;
        font-size: 13px;
      }
    }

    #form-viewer,
    #report-viewer {
      .form-wrapper {
        padding: 0 !important;
        border: 1px solid #ccc;
        border-radius: 3px;

        .fw-close-btn {
          display: none;
        }
      }

      .fvw--back {
        margin-bottom: 4px;
        font-weight: 500;

        > span {
          cursor: pointer;
          color: #4e4e4e;
          padding: 1px 4px;
          font-size: 11px;
          border-radius: 2px;

          &:hover {
            background-color: #eaeaea;
          }
        }
      }

      > .safa-form {
        height: calc(100% - 22px);
      }
    }

    .need-to-confirm {
      margin-top: 5px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 3px;
      padding: 4px;
      overflow: hidden;

      .ntc--icon {
        font-size: 19px;
        height: auto;
        line-height: 1;
        min-width: 22px;
      }
    }

    .owner-alert {
      margin-top: 5px;
      background: #fff;
      border: none;
      border-radius: 3px;
      padding: 2px 4px;
      overflow: hidden;
      display: inline-flex;
      width: auto;

      .ntc--icon {
        font-size: 19px;
        height: auto;
        line-height: 1;
        min-width: 24px;
      }

      &.is--accepted {
        border-color: #4caf50;
        background-color: #deffdf;
      }

      &.is--rejected {
        border-color: #e57373;
        background-color: #ffeaea;
      }
    }

    .checkitem--status-list {
      margin-left: 60px;
    }
  }

  .wfw--groupitem-inner {
    .wfw--grp-name {
      color: #b98a16;
      font-weight: 500;
      font-size: 14px;
      position: relative;

      > span {
        position: relative;
      }

      .checklist-notify {
        position: absolute;
        background-color: #ff5722;
        color: #fff;
        font-size: 10px;
        font-weight: normal;
        padding: 0 6px;
        border-radius: 4px;
        left: 50%;
        top: -20px;
        white-space: nowrap;

        &:before {
          content: "";
          border: 4px solid transparent;
          border-top-color: #ff5722;
          width: 0;
          height: 0;
          display: inline-block;
          position: absolute;
          top: 100%;
          left: 5px;
        }
      }
    }

    .wfw--grp-status {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-width: 50px;
      max-width: 50px;

      > span {
        width: 12px;
        height: 12px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        color: #c1921c;
        transition: 0.2s all ease-in;
        background-color: transparent;
        border: 2px solid;
        border-radius: 50px;
        padding: 4px;

        /* &:before {
             content: '';
             width: 16px;
             height: 2px;
             position: absolute;
             top: 3px;
             border-radius: 10px;
             background-color: #ccc;
             left: 8px;
           }

           &:after {
             content: '';
             width: 2px;
             height: 24px;
             position: absolute;
             left: 3px;
             border-radius: 10px;
             background-color: #ccc;
             top: 8px;
           }*/
      }
    }

    .wfw--grp-name {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
  }

  .wfw--info {
    font-size: 10px;

    .wfw--info-status {
      > span {
        border: none;
      }

      &.s__pending {
        > span {
          padding-left: 2px;

          > i {
            font-size: 13px;
          }
        }
      }
    }
  }

  .wfw--groupitem:not(.is--expanded)
  .wfw--groupitem-inner
  .wfw--grp-status
  > span {
    background-color: #c1921c;
    color: #c1921c;
    border-color: #fff;
    transition: 0.2s all ease-in;
  }

  #form-viewer {
    .form-wrapper {
      padding: 1px !important;

      > .q-layout-container {
        border-radius: 0 !important;
        box-shadow: none !important;

        .q-header {
          span.fw-close-btn {
            display: none;
          }
        }
      }
    }

    .fvw--back {
      margin: 6px 10px;

      > span {
        display: inline-block;
        cursor: pointer;
      }
    }
  }
</style>
