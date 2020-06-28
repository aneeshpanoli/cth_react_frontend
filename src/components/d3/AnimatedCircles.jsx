import React, {useState, useRef, useEffect, useSpring} from 'react'
import {animated } from 'react-spring'
import * as d3 from 'd3'


const generateDataset = () => (
    Array(10).fill(0).map(() => ([
      Math.random() * 80 + 10,
      Math.random() * 35 + 10,
    ]))
  )

  export const Circle = () => {
    const ref = useRef()
  
    useEffect(() => {
        d3.csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-07-2020.csv',
        d3.autoType)
        .then(function (data) {
            const width = 980;
            const height = 550;
            const proj = () =>{
                return d3.geoMercator()
                .scale(155)
                .center([0, 40]) 
                .translate([width / 2, height / 3])
            }
            const path = d3.geoPath(proj);
            const points = () =>{
                return data.map(d => {
                    return {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: [d.lng, d.lat]
                      },
                      properties: d
                    }
                  })
            }
            const radius = d3.scaleSqrt([0, d3.max(points, d => d.properties.deaths)], [3, 20]);

            const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height])
  
  const tooltip = d3tip()
    .attr('class', 'tooltip') 
    .html(d =>
      `<b>${d.properties.region}</b> <br> Confirmed: ${d.properties.confirmed} <br> Deaths: ${d.properties.deaths}`
    )
  
  svg.call(tooltip)
  
  //plot and style the points
  svg.append('g')
    .selectAll('circle')
      .data(points)
    .enter().append('circle')
      .attr('cx', d => path.centroid(d)[0])
      .attr('cy', d => path.centroid(d)[1])
      .attr('r', d => radius(d.properties.deaths))
      .style('fill', 'red')
      .style('opacity', 0.5)
      .on('mouseover', tooltip.show)
      .on('mouseout', tooltip.hide)
          console.log(d)
        });
  
    }, [])
  
    return (
      <svg
        ref={ref}
      />
    )
  }