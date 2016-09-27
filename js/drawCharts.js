function drawCharts(){

//Bar Chart
    var barchart = d3.select("#barchart");
    var bars = barchart.selectAll("rect.bar")
        .data(rect_data);
    bars.enter()
        .append("svg:rect")
        .attr("class", "bar");
    bars.exit()
    .transition()
    .duration(durationTime)
    .ease("exp")
        .attr("width", 0)
        .attr("fill","white")
        .remove();
    bars.transition()
    .duration(durationTime)
    .ease("quad")
        .attr("x",function(d){return d["x"];})
        .attr("y",function(d){return d["y"];})
        .attr("fill",function(d){return d["color"]})
        .attr("width",function(d){return d["width"]})
        .attr("height", function(d){return d["height"]})
        .attr("cursor","pointer");

    bars.on("click",function(d){
    	if(selector_level == 0){
    		var top_name = d["top_name"];
       		selector_level++;
       		selectorNames[selector_level] = top_name;
			$('.PresentChartType').html(selectorNames[selector_level]);
       		get_max_second_x(top_name);
    		if(d["long_short"] == "short"){
	       		second_charts(top_name,0,1);
    		}else{
	       		second_charts(top_name,1,0);
    		}
    	}else if(selector_level == 1){
    		var top_name = d["top_name"];
    		var second_name = d["second_name"];
       		selector_level++;
       		selectorNames[selector_level] = second_name;
			$('.PresentChartType').html(selectorNames[selector_level]);
	       	get_max_third_x(top_name,second_name);
    		if(d["long_short"] == "short"){
	       		third_charts(top_name,second_name,0,1);
    		}else{
	       		third_charts(top_name,second_name,1,0);
    		}
    	}
    })

	bars.on("mouseover",function(d){
		var x = $('#svg').offset().left + containerWidth - tooltipWidth - 35;
		var y = $('#svg').offset().top;
		$('.tooltip').css("left",x+"px");
		$('.tooltip').css("top",y+"px");
		$('.tooltip .market_value').html(d["market_value"]);
		$('.tooltip .book_basis').html(d["book_basis"]);
		$('.tooltip .tax_basis').html(d["tax_basis"]);
		$('.tooltip .quantity').html(d["quantity"]);
	});


// Axis Vertical Line Chart
    var vertiallinechart = d3.select("#verticallinechart");
    var lines = vertiallinechart.selectAll("rect.axis")
        .data(vertial_line_data);
    lines.enter()
        .append("svg:rect")
        .attr("class", "axis");
    lines.exit()
    .transition()
    .duration(durationTime)
    .ease("exp")
        .attr("width", 0)
        .attr("fill","white")
        .remove();
    lines.transition()
    .duration(durationTime)
    .ease("quad")
        .attr("x",function(d){return d["x"];})
        .attr("y",function(d){return d["y"];})
        .attr("fill",function(d){return d["color"]})
        .attr("width",function(d){return d["width"]})
        .attr("height", function(d){return d["height"]});

// Axis Horizontal Line Chart
    var horizontallinechart = d3.select("#horizontallinechart");
    var lines = horizontallinechart.selectAll("rect.axis")
        .data(horizontal_line_data);
    lines.enter()
        .append("svg:rect")
        .attr("class", "axis");
    lines.exit()
    .transition()
    .duration(durationTime)
    .ease("exp")
        .attr("width", 0)
        .attr("fill","white")
        .remove();
    lines.transition()
    .duration(durationTime)
    .ease("quad")
        .attr("x",function(d){return d["x"];})
        .attr("y",function(d){return d["y"];})
        .attr("fill",function(d){return d["color"]})
        .attr("width",function(d){return d["width"]})
        .attr("height", function(d){return d["height"]});


// OutlineBox Chart
    var boxchart = d3.select("#boxchart");
    var boxes = boxchart.selectAll("rect.box")
        .data(box_data);
    boxes.enter()
        .append("svg:rect")
        .attr("class", "box");
    boxes.exit()
    .transition()
    .duration(durationTime)
    .ease("exp")
        .attr("width", 0)
        .attr("fill","white")
        .remove();
    boxes.transition()
    .duration(durationTime)
    .ease("quad")
        .attr("x",function(d){return d["x"];})
        .attr("y",function(d){return d["y"];})
        .attr("fill",function(d){return d["color"]})
        .attr("stroke",function(d){return d["stroke_color"]})
        .attr("width",function(d){return d["width"]})
        .attr("height", function(d){return d["height"]})
        .attr("cursor","pointer");
    boxes.on("click",function(d){
       		if(selector_level == 0){
       			var top_name = d["top_name"];
	       		selector_level++;
	       		selectorNames[selector_level] = top_name;
				$('.PresentChartType').html(selectorNames[selector_level]);
	       		get_max_second_x(top_name);
	       		second_charts(top_name,1,1);
       		}else if(selector_level == 1){
       			var top_name = d["top_name"];
       			var second_name = d["second_name"];
	       		selector_level++;
	       		selectorNames[selector_level] = second_name;
				$('.PresentChartType').html(selectorNames[selector_level]);
	       		get_max_third_x(top_name,second_name);
	       		third_charts(top_name,second_name,1,1);
       		}
       });


// Axis Text Chart
    var axischart = d3.select("#axischart");
    var axischart = axischart.selectAll("text.str")
        .data(axis_data);
    axischart.enter()
        .append("svg:text")
        .attr("class", "str");
    axischart.exit()
    .transition()
    .duration(durationTime)
    .ease("exp")
        .attr("width", 0)
        .attr("fill","white")
        .remove();
    axischart.transition()
    .duration(durationTime)
    .ease("quad")
    	.text(function(d){return d["str"];})
        .attr("x",function(d){return d["x"];})
        .attr("y",function(d){return d["y"];})
        .attr("fill",function(d){return d["color"]})
        .attr("font-size",function(d){return d["font_size"]})
        .attr("text-anchor",function(d){return d["text_anchor"]})
        .attr("font-family","sans-serif")
        .attr("cursor","pointer");


//Group Name Chart
    var groupchart = d3.select("#groupchart");
    var groupchart = groupchart.selectAll("text.group")
        .data(group_data);
    groupchart.enter()
        .append("svg:text")
        .attr("class", "group");
    groupchart.exit()
    .transition()
    .duration(durationTime)
    .ease("exp")
        .attr("fill","white")
        .attr("width", 0)
        .remove();
    groupchart.transition()
    .duration(durationTime)
    .ease("quad")
        .text(function(d){return d["str"];})
       .attr("x",function(d){return d["x"];})
       .attr("y",function(d){return d["y"];})
       .attr("fill",function(d){return d["color"]})
       .attr("font-size",function(d){return d["font_size"]})
       .attr("text-anchor",function(d){return d["text_anchor"]})
       .attr("font-family","sans-serif")
       .attr("cursor","pointer");
    groupchart.on("click",function(d){
       		if(selector_level == 0){
       			var top_name = d["top_name"];
	       		selector_level++;
	       		selectorNames[selector_level] = top_name;
				$('.PresentChartType').html(selectorNames[selector_level]);
	       		get_max_second_x(top_name);
	       		second_charts(top_name,1,1);
       		}else if(selector_level == 1){
       			var top_name = d["top_name"];
       			var second_name = d["second_name"];
	       		selector_level++;
	       		selectorNames[selector_level] = second_name;
				$('.PresentChartType').html(selectorNames[selector_level]);
	       		get_max_third_x(top_name,second_name);
	       		third_charts(top_name,second_name,1,1);
       		}
       });

// Legend Rect Chart
    var legendrect = d3.select("#legendrect");
    var lines = legendrect.selectAll("rect.lr")
        .data(legend_rect);
    lines.enter()
        .append("svg:rect")
        .attr("class", "lr");
    lines.exit()
    .transition()
    .duration(durationTime)
    .ease("exp")
        .attr("width", 0)
        .attr("fill","white")
        .remove();
    lines.transition()
    .duration(durationTime)
    .ease("quad")
        .attr("x",function(d){return d["x"];})
        .attr("y",function(d){return d["y"];})
        .attr("fill",function(d){return d["color"]})
        .attr("width",function(d){return d["width"]})
        .attr("height", function(d){return d["height"]});

// Legend Text Chart
    var legendtext = d3.select("#legendtext");
    var legendtext = legendtext.selectAll("text.lt")
        .data(legend_text);
    legendtext.enter()
        .append("svg:text")
        .attr("class", "lt");
    legendtext.exit()
    .transition()
    .duration(durationTime)
    .ease("exp")
        .attr("width", 0)
        .attr("fill","white")
        .remove();
    legendtext.transition()
    .duration(durationTime)
    .ease("quad")
        .text(function(d){return d["str"];})
        .attr("x",function(d){return d["x"];})
        .attr("y",function(d){return d["y"];})
        .attr("font-size",function(d){return d["font_size"]})
        .attr("font-family","sans-serif")
        .attr("cursor","pointer");
}