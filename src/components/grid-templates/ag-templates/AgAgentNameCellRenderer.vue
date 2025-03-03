<template>
  <span>{{agentsName}}</span>
</template>

<script>
export default {
  name: 'AgAgentNameCellRenderer',
  computed: {
    agentsName () {
      const { AgentName } = this.params.data
      return ((AgentName && AgentName.split('-').map(ch => ((ch && ch.split('|')[0]) || '').trim())) || []).toString().replaceAll(',', ' - ') || ''
    }
  }
}
</script>
