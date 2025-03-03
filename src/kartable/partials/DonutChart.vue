<!--
<template>
  <div style="direction: ltr" class="fit"></div>
</template>
<script>
import * as d3 from 'd3'

export default {
  props: {
    data: Array,
    width: Number,
    height: Number,
    valueField: String,
    labelField: String,
    colorField: String
  },
  methods: {
    drawChart () {
      this.$el.innerHTML = ''
      const
        self = this,
        width = this.width,
        height = this.height,
        data = this.data,
        margin = { left: 20, top: 20, right: 20, bottom: 20 },
        radius = Math.min(width, height) / 2 - margin.left - margin.right
      const svg = d3.select(this.$el)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

      const color = d3.scaleOrdinal()
        .domain(data.map(x => x[self.labelField]))
        .range(d3.schemeDark2)

      const pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(function (d) {
          return d[self.valueField]
        })
      const dataReady = pie(data)

      const arc = d3.arc()
        .innerRadius(radius * 1) // This is the size of the donut hole
        .outerRadius(radius * 0.85)

      const arcExpand = d3.arc()
        .innerRadius(radius * 1.05) // This is the size of the donut hole
        .outerRadius(radius * 0.9)

      const outerArc = d3.arc()
        .innerRadius(radius * 1)
        .outerRadius(radius * 0.8)

      const slices = svg
        .selectAll('allSlices')
        .data(dataReady)
        .enter()
        .append('path')

      slices
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .attr('fill', function (d) {
          return d.data[self.colorField] || (color(d.data[self.labelField]))
        })
        .attr('d', function (d) {
          if (d.data.selected) { return arcExpand(d) }
          return arc(d)
        })

      slices.on('click', function (e, d) {
        // const thisPath = d3.select(this)
        self.$emit('click', {
          data: d.data, e
        })
      })

      svg
        .selectAll('allPolylines')
        .data(dataReady)
        .enter()
        .append('polyline')
        .attr('stroke', 'black')
        .style('fill', 'none')
        .attr('stroke-width', 1)
        .attr('points', function (d) {
          const posA = arc.centroid(d) // line insertion in the slice
          const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
          const posC = outerArc.centroid(d) // Label position = almost the same as posB
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1) // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC]
        })

      svg
        .selectAll('allLabels')
        .data(dataReady)
        .enter()
        .append('text')
        .text(function (d) {
          return d.data[self.labelField]
        })
        .attr('transform', function (d) {
          const pos = outerArc.centroid(d)
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1)
          return 'translate(' + pos + ')'
        })
        .style('text-anchor', function (d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
        })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawChart()
    })
  },
  watch: {
    data () {
      this.drawChart()
    }
  }
}
</script>
-->
