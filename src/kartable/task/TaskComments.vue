<template>
  <div id="task-comment">
    <fit>
      <div class="full-width block ">
        <div class="row q-col-gutter-x-sm items-center">
          <div class="col">
            <div class="task__comment_search">
              <input
                placeholder="جستجو در توضیحات ..."
                type="text"
                v-model="searchTerm"
                ref="input"
              />
              <q-icon class="s-search" name="search" size="22px" />
              <q-icon
                @click="searchTerm = ''"
                class="s-close cursor-pointer"
                v-show="searchTerm.trim().length > 0"
                name="close"
                size="22px"
              />
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              @click="load"
              color="grey"
              size="11px"
              round
              icon="refresh"
            ></q-btn>
          </div>
        </div>
        <div class="row justify-between"  v-if="filteredComments.length > 0">
          <q-btn label="باز کردن همه" @click="expandAll" color="primary" flat rounded />
          <q-btn label="بستن همه" @click="collapseAll" color="secondary" flat rounded/>
        </div>
      </div>
      <div class="task__comments custom-scroll">
        <transition-group name="fade" v-if="filteredComments.length > 0">
          <div
            :class="{ 'is-mine': isMine(item) }"
            :key="'cmt-' + index"
            class="task-cmt"
            @click="toggleComment(index)"
            v-for="(item, index) in filteredComments"
          >
            <div class="cmt--inner">
              <q-item  style="min-height: none;">
                <q-item-section avatar top>
                  <user-avatar
                    v-if="forceUpdate"
                    :src="item.NidUser | avatar"
                    size="38px"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between align-items-center">
                      <div class="col-auto cmt--username">
                        {{ item.UserName }}&nbsp;<small v-if="isMine(item)"
                          >(خودم)</small
                        >
                      </div>
                      <div class="col-auto d-flex align-items-center">
                        <span
                          class="task-cmt-ispublic"
                          title="قابل مشاهده توسط شهروند"
                          v-if="item.IsPublic"
                        >
                          <q-icon name="perm_identity" size="16px" />
                        </span>
                        <span class="cmt--date-text">
                          {{ formatDate(item.createdAt) }}&nbsp;{{ item.CommentsTime }}
                        </span>
                        <q-icon
                          :name="expandedComments[index] ? 'expand_less' : 'expand_more'"
                          size="24px"
                          color="grey"
                          class="ml-sm"
                        />
                      </div>
                    </div>
                  </q-item-label>
                  <q-item-label
                    class="cmt--body"
                    :class="{ 'expanded': expandedComments[index] }"
                  >
                    <div
                      v-if="expandedComments[index]"
                      class="comment-text"
                    >
                      {{ item.Comments }}
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </transition-group>
        <div
          v-else
          :class="[
            'column items-center q-mt-sm justify-center border fit',
            $q.dark.isActive ? 'bg-lighten4 text-white' : 'text-grey bg-white'
          ]"
        >
          <div class="text-center">
            <q-icon name="message" size="48px" />
          </div>
          <div class="text-center">موردی یافت نشد.</div>
        </div>
      </div>
      <expantion-section  id="new-comment" title="توضیحات جدید">
      <div v-if="!readonly">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <text-template
              style="resize: none !important; max-height: 100px; min-height: 100px;"
              v-model="newComments"
              type="textarea"
              cdcName="TaskComments"
              formKey="TaskComments"
            />
          </div>
          <div class="col">
            <div class="row justify-end q-gutter-x-md items-center">
              <safa-checkbox
                dense
                label="شهروند امکان مشاهده داشته باشد؟"
                v-model="isPublic"
              />
              <q-space />
              <safa-select2
                :options="users"
                option-label="label"
                option-value="value"
                placeholder="درخواست اعلام نظر از"
                style="width: 200px"
                v-model="mention"
              >
                <template v-slot:option="option">
                  <user-avatar
                    :src="option.value | avatar"
                    name="option.label"
                    size="28px"
                    style="color: red"
                  />
                  {{ option.label }}
                </template>
              </safa-select2>
              <btn-save @click="insertComment" class="col-auto" label="ارسال" />
            </div>
          </div>
        </div>
      </div>
      </expantion-section>
    </fit>
  </div>
</template>

<script>
import { getComments } from "../services/task"
import kartableMixin from "../mixins/kartableMixin"
import PersianDate from "persian-date"

export default {
  props: { nidProc: String, readonly: Boolean },
  mixins: [kartableMixin],
  data () {
    return {
      result: null,
      commentList: [],
      newComments: "",
      isPublic: true,
      forceUpdate: true,
      mention: null,
      searchTerm: "",
      expandedComments: {}, // مدیریت باز و بسته بودن توضیحات
      users: []
    }
  },
  computed: {
    filteredComments () {
      if (!this.searchTerm.trim()) return this.commentList
      return this.commentList.filter((c) => this.search(c))
    }
  },
  methods: {
    formatDate (dt) {
      const newDt = new PersianDate(new Date(dt)).add("minutes", 4)
      return newDt.format("L, LT")
    },
    toggleComment (index) {
      this.$set(this.expandedComments, index, !this.expandedComments[index])
    },
    expandAll () {
      this.filteredComments.forEach((_, index) => {
        this.$set(this.expandedComments, index, true)
      })
    },
    collapseAll () {
      this.filteredComments.forEach((_, index) => {
        this.$set(this.expandedComments, index, false)
      })
    },
    search (c) {
      if (!c.Comments) return false
      const cmt = c.Comments.toLowerCase()
      const term = this.searchTerm.trim().toLowerCase()
      return cmt.indexOf(term) > -1
    },
    isMine (cmt) {
      return cmt.NidUser.toLowerCase() === this.getNidUser().toLowerCase()
    },
    async load () {
      try {
        this.loading = true
        const { data } = await getComments({
          NidProc: this.nidProc
        })
        if (data.success) {
          this.commentList = data.data
          this.commentList.forEach((_, index) => {
            this.$set(this.expandedComments, index, false)
          })
          await this.expandAll()
        } else {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error("Error:", e)
        this.showError("خطایی در سرویس رخ داد")
      } finally {
        this.loading = false
      }
    }
  },
  async beforeMount () {
    await this.load()
  },
  watch: {
    nidProc () {
      this.load()
    }
  }
}
</script>

<style lang="scss">
#task-comment {
  .task__comments {
    .task-cmt {
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 5px;
      position: relative;

      border-radius: 6px;
      border: 1px solid #e0e0e0;
      background-color: #fff;

      &:hover {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
    }

    .cmt--inner {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: height 0.3s ease, padding 0.3s ease;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .cmt--username {
      font-weight: bold;
      display: inline-flex;
      align-items: center;
    }

    .cmt--date-text {
      margin-left: 5px;
      font-size: 12px;
      display: inline-block;
      vertical-align: middle;
    }

    .cmt--body {
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .comment-text {
      padding: 10px 15px;
      background: #f9f9f9;
    }

    .cmt--body.expanded {
      margin-top: 10px;
    }

    q-icon {
      transition: transform 0.3s ease;
    }

    .expanded q-icon {
      transform: rotate(180deg);
    }
  }
}

</style>
