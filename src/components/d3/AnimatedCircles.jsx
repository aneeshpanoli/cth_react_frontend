import React, {useState, useRef, useEffect, useSpring} from 'react'
import {animated } from 'react-spring'
import * as d3 from 'd3'
import d3tip from 'd3-tip';
import flare from '../../Assets/json/flare.json'



const generateDataset = () => (
    Array(10).fill(0).map(() => ([
      Math.random() * 80 + 10,
      Math.random() * 35 + 10,
    ]))
  )

  export const Circle = () => {
    const d3svg = useRef(null)
  
    useEffect(() => {

       
        var svg = d3.select(d3svg.current),
        width = +svg.attr('width'),
        height = +svg.attr('height'),

        color = d3.scaleOrdinal(d3.schemeCategory10),
        valueline = d3.line()
            .x(function(d) { return d[0]; })
            .y(function(d) { return d[1]; })
            .curve(d3.curveCatmullRomClosed),
        paths,
        groups,
        groupIds,
        scaleFactor = 1.2,
        polygon,
        centroid,
        node,
        link,
        curveTypes = ['curveBasisClosed', 'curveCardinalClosed', 'curveCatmullRomClosed', 'curveLinearClosed'],
        simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(function(d) { return d.id; }))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));
    
    
    d3.json('https://raw.githubusercontent.com/aneeshpanoli/json/master/miserables.json', function(error, graph) {
        if (error) throw error;
        console.log(graph)
        // create selector for curve types
        var select = d3.select('#curveSettings')
        .append('select')
        .attr('class','select')
        .on('change', function() {
            var val = d3.select('select').property('value');
            d3.select('#curveLabel').text(val);
            valueline.curve(d3[val]);
            updateGroups();
        });
        var options = select
        .selectAll('option')
        .data(curveTypes).enter()
        .append('option')
            .text(function (d) { return d; });
    
    
        // create groups, links and nodes
        groups = svg.append('g').attr('class', 'groups');
    
        link = svg.append('g')
            .attr('class', 'links')
        .selectAll('line')
        .data(graph.links)
        .enter().append('line')
            .attr('stroke-width', function(d) { return Math.sqrt(d.value); });
    
        node = svg.append('g')
            .attr('class', 'nodes')
        .selectAll('circle')
        .data(graph.nodes)
        .enter().append('circle')
            .attr('r', 5)
            .attr('fill', function(d) { return color(d.group); })
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));
    
        // count members of each group. Groups with less
        // than 3 member will not be considered (creating
        // a convex hull need 3 points at least)
        groupIds = d3.set(graph.nodes.map(function(n) { return +n.group; }))
        .values()
        .map( function(groupId) {
            return { 
            groupId : groupId,
            count : graph.nodes.filter(function(n) { return +n.group == groupId; }).length
            };
        })
        .filter( function(group) { return group.count > 2;})
        .map( function(group) { return group.groupId; });
    
        paths = groups.selectAll('.path_placeholder')
        .data(groupIds, function(d) { return +d; })
        .enter()
        .append('g')
        .attr('class', 'path_placeholder')
        .append('path')
        .attr('stroke', function(d) { return color(d); })
        .attr('fill', function(d) { return color(d); })
        .attr('opacity', 0);
    
        paths
        .transition()
        .duration(2000)
        .attr('opacity', 1);
    
        // add interaction to the groups
        groups.selectAll('.path_placeholder')
        .call(d3.drag()
            .on('start', group_dragstarted)
            .on('drag', group_dragged)
            .on('end', group_dragended)
            );
    
        node.append('title')
            .text(function(d) { return d.id; });
    
        simulation
            .nodes(graph.nodes)
            .on('tick', ticked)
            .force('link')
            .links(graph.links);
    
        function ticked() {
        link
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });
        node
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });
        
        updateGroups();
        }
    
    });
    
    
    
    // select nodes of the group, retrieve its positions
    // and return the convex hull of the specified points
    // (3 points as minimum, otherwise returns null)
    var polygonGenerator = function(groupId) {
        var node_coords = node
        .filter(function(d) { return d.group == groupId; })
        .data()
        .map(function(d) { return [d.x, d.y]; });
        
        return d3.polygonHull(node_coords);
    };
    
    
    
    function updateGroups() {
        groupIds.forEach(function(groupId) {
        var path = paths.filter(function(d) { return d == groupId;})
            .attr('transform', 'scale(1) translate(0,0)')
            .attr('d', function(d) {
            polygon = polygonGenerator(d);          
            centroid = d3.polygonCentroid(polygon);
    
            // to scale the shape properly around its points:
            // move the 'g' element to the centroid point, translate
            // all the path around the center of the 'g' and then
            // we can scale the 'g' element properly
            return valueline(
                polygon.map(function(point) {
                return [  point[0] - centroid[0], point[1] - centroid[1] ];
                })
            );
            });
    
        d3.select(path.node().parentNode).attr('transform', 'translate('  + centroid[0] + ',' + (centroid[1]) + ') scale(' + scaleFactor + ')');
        });
    }
    
    
    // drag nodes
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    // drag groups
    function group_dragstarted(groupId) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d3.select(this).select('path').style('stroke-width', 3);
    }
    
    function group_dragged(groupId) {
        node
        .filter(function(d) { return d.group == groupId; })
        .each(function(d) {
            d.x += d3.event.dx;
            d.y += d3.event.dy;
        })
    }
    
    function group_dragended(groupId) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d3.select(this).select('path').style('stroke-width', 1);
    }
    
  
    }, [])
  
    return (
      <svg
        ref={d3svg}
      />
    )
  }