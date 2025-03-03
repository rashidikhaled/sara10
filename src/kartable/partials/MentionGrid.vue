<template>
  <fit>
    <div class="flex items-center q-gutter-x-sm" id="mention-toolbar">
      <q-space/>
      <q-btn size="sm" flat label="بروزرسانی" color="primary" icon="refresh" @click="$emit('reload')"></q-btn>
      <q-btn size="sm" flat round color="primary" dense @click="$emit('close')">
        <q-icon size="20px">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            <path d="M21 19.1H3V5h18v14.1zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                  fill="none"/>
            <path
              d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41z"/>
          </svg>
        </q-icon>
      </q-btn>
    </div>
    <safa-datatable
      class="fit"
      height="100%"
      maxHeight="100%"
      minHeight="0"
      ref="mentionGrid"
      m="r"
      margin="0"
      title="درخواست های مرتبط با من"
      :filterable="true"
      :searchable="true"
      :columns="mentionColumns"
      :customButtons="[{
          icon: 'refresh',
          onClick: this.reload,
          text: 'بروزرسانی'
        }]"
      :allowNewRow="false"
      :allowRemoveRow="false"
      :allowCopy="false"
      v-model="mentionList"/>
  </fit>
</template>

<script>
export default {
  name: 'MentionGrid',
  data () {
    return {
      mentionColumns: [
        {
          field: 'NidWorkItem',
          title: 'شماره پرونده',
          width: 120,
          type: 'numeric',
          cell: 'request-number-template'
        },
        {
          field: 'CommentsDate',
          title: 'زمان ارسال',
          width: 160
        },
        {
          field: 'WorkflowTitel',
          title: 'نوع درخواست',
          width: 160
        },
        {
          field: 'BizCode',
          title: 'کد',
          width: 150,
          cell: 'kartable-bizcode-template'
        },
        {
          field: 'Comments',
          title: 'جزئیات',
          width: 'auto',
          cell: 'mention-comments-template'
        }]
    }
  },
  props: {
    mentionList: Array
  },
  methods: {
    reload () {
      this.$emit('reload')
    }
  }
}
</script>

<style scoped>
#mention-toolbar {
  padding: 6px 24px 0 24px;
  background-color: #d8e1ea;
  background-image: linear-gradient(0deg, #d4e7f5, #ddf3fd);
  border-radius: 0;
}
</style>
