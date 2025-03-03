<template>
  <div id="task-comment">
    <fit>
      <div class="task__comments custom-scroll">
        <transition-group name="fade" v-if="value.length > 0">
          <div
            :key="'cmt-' + index"
            class="task-cmt"
            v-for="(item, index) in value"
          >
            <div class="cmt--inner q-pa-md">
              <q-item class="q-pa-none">
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between">
                      <div class="col-auto cmt--username">
                        {{ item.CommentsUserName }}
                      </div>
                      <div class="col-auto cmt--date">
                        <div
                          class="flex items-center"
                          style="line-height: normal"
                        >
                          <span
                            >{{ item.CommentsDate }} - {{
                              item.CommentsTime
                            }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </q-item-label>
                  <q-item-label
                    class="cmt--body"
                    style="
                      line-height: 24px !important;
                      font-size: 13px;
                      margin-top: 10px;
                      text-align: justify;
                    "
                  >
                    {{ item.Comments }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </transition-group>
        <div
          v-else
          :class="[
            'column items-center justify-center border fit',
            $q.dark.isActive ? 'bg-lighten4 text-white' : 'text-grey bg-white',
          ]"
        >
          <div class="text-center">
            <q-icon name="message" size="48px" />
          </div>
          <div class="text-center q-mt-sm">موردی یافت نشد.</div>
        </div>
      </div>
    </fit>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
#task-comment {
  height: 100%;
  margin: 0 auto;
  padding: 10px 0;
  width: 1200px;
  max-width: 100%;

  .task__comment_search {
    padding: 4px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 3px;
    position: relative;

    body.body--dark & {
      background: var(--dark);
      border-color: var(--dark-border);
    }

    input {
      width: 100%;
      border: none;
      padding: 4px 50px 4px 8px;
      height: 30px;
      border-radius: inherit;

      body.body--dark & {
        background: var(--dark);
        border-color: var(--dark-border);
        color: var(--dark-text-color);
      }
    }

    .s-close,
    .s-search {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #777;
    }

    .s-search {
      right: 10px;
    }

    .s-close {
      right: 40px;
    }
  }

  .border {
    border: 1px solid #ddd;
    border-radius: 3px;

    body.body--dark & {
      border-color: var(--dark-border);
    }
  }

  .task__comments {
    margin-bottom: 8px;
    min-height: 0;

    .task-cmt {
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #dedede;
      box-shadow: 1px 2px 4px #dedede;
      position: relative;
      box-sizing: border-box;
      transition: 0.3s ease;

      body.body--dark & {
        background: var(--dark);
        border-color: var(--dark-border);
        box-shadow: 1px 2px 4px var(--dark);
      }

      .task-cmt-ispublic {
        align-self: center;
        color: #4caf50;
        display: inline-block;
        border: 1px solid;
        padding: 0;
        border-radius: 10px;
        white-space: nowrap;
        transition: 0.25s all ease;
        margin-right: 8px;
        line-height: 1;
        width: 18px;
        height: 18px;
      }

      .cmt-body {
        color: #2f2f2f;
      }

      .cmt--username {
        font-size: 15px;

        > small {
          font-size: 10px;
          color: #a9a9a9;
          position: relative;
          top: -2px;
        }
      }

      &.is-mine {
        .cmt--username {
          color: #777;
        }
      }

      &:not(.is-mine) {
        .cmt--username {
          color: var(--q-color-primary);
          font-weight: bold;
        }
      }

      &:not(:last-child) {
        margin-bottom: 8px;
      }

      &:hover {
        .cmt-body {
          color: #000;
        }
      }
    }
  }

  #new-comment {
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #dedede;
    box-shadow: 1px 2px 4px #dedede;
    position: relative;
    box-sizing: border-box;
    transition: 0.3s ease;

    body.body--dark & {
      background: var(--dark);
      border-color: var(--dark-border);
      box-shadow: 1px 2px 4px var(--dark);
    }

    textarea {
      max-height: 100px;
      min-height: 100px;
      height: 100px;
      resize: none !important;
    }

    #new-comment .q-field__control:before {
      border-color: #bbb;

      body.body--dark & {
        border-color: var(--dark-border);
      }
    }
  }
}

@media screen and (max-width: 599px) {
  #task-comment #new-comment {
    min-height: 190px;
  }
}
</style>
