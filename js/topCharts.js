function formatTopCharts(){
	var html = "";
	for(i = 0; i < top_names.length; i++){
		html += "<div class='each_chart "+top_names[i]+"'></div>";
	}
	$('.top_charts').html(html);
}

function getTopNames(){
	top_names = [];
	for (i = 0; i < data.length; i++){
		var Asset_Type = data[i].Asset_Type;
		for (j = 0 ; j < top_names.length; j++){
			if(top_names[j] == Asset_Type){
				break;
			}
		}
		if(j == top_names.length){
			top_names.push(Asset_Type);
		}
	}
}

function get_max_top_x(){

	max_top_x = 0;

	for(j = 0; j<top_names.length; j++){
		a1=a2=a3=a4=a5=a6=0;
		for(i = 0; i < data.length; i++){
			if(data[i].Asset_Type == top_names[j]){

				if(data[i].Book_Basis < 0){
					a1 += Math.abs(parseInt(data[i].Book_Basis));
					max_top_x = Math.max(max_top_x,a1);
				}else{
					a2 += Math.abs(parseInt(data[i].Book_Basis));
					max_top_x = Math.max(max_top_x,a2);
				}

				if(data[i].Tax_Basis < 0){
					a3 += Math.abs(parseInt(data[i].Tax_Basis));
					max_top_x = Math.max(max_top_x,a3);
				}else{
					a4 += Math.abs(parseInt(data[i].Tax_Basis));
					max_top_x = Math.max(max_top_x,a4);
				}

				if(data[i].Market_Value < 0){
					a5 += Math.abs(parseInt(data[i].Market_Value));
					max_top_x = Math.max(max_top_x,a5);
				}else{
					a6 += Math.abs(parseInt(data[i].Market_Value));
					max_top_x = Math.max(max_top_x,a6);
				}
			}
		}
	}

}


function top_chart(chart_name,top_name,start_flag,end_flag,long_flag,short_flag,val_index){


	var margin = {top: 20, right: 30, bottom: 20, left: 40},
		width = 1000,
		height = rect_max_height;
	if(end_flag == 1){
		height += end_bottom;
	}

	var out_data = [{name:"Book_Basis",neg_pos:"neg",value:0,height:rect_max_height/3,pos_y:start_pos_y+rect_max_height/3,color:Book_Basis_Color},
				{name:"Book_Basis",neg_pos:"pos",value:0,height:rect_max_height/3,pos_y:start_pos_y+rect_max_height/3,color:Book_Basis_Color},
				{name:"Tax_Basis",neg_pos:"neg",value:0,height:rect_max_height/3*2,pos_y:start_pos_y+rect_max_height/6,color:Tax_Basis_Color},
				{name:"Tax_Basis",neg_pos:"pos",value:0,height:rect_max_height/3*2,pos_y:start_pos_y+rect_max_height/6,color:Tax_Basis_Color},
				{name:"Market_Value",neg_pos:"neg",value:0,height:rect_max_height,pos_y:start_pos_y,color:Market_Value_Color},
				{name:"Market_Value",neg_pos:"pos",value:0,height:rect_max_height,pos_y:start_pos_y,color:Market_Value_Color},
				{name:"Quantity",neg_pos:"neg",value:0},
				{name:"Quantity",neg_pos:"pos",value:0}
			];

	for(i = 0; i < data.length; i++){
		if(data[i].Asset_Type == top_name){

			if(data[i].Book_Basis < 0){
				out_data[0].value += parseInt(data[i].Book_Basis);
			}else{
				out_data[1].value += parseInt(data[i].Book_Basis);
			}

			if(data[i].Tax_Basis < 0){
				out_data[2].value += parseInt(data[i].Tax_Basis);
			}else{
				out_data[3].value += parseInt(data[i].Tax_Basis);
			}

			if(data[i].Market_Value < 0){
				out_data[4].value += parseInt(data[i].Market_Value);
			}else{
				out_data[5].value += parseInt(data[i].Market_Value);
			}

			if(data[i].Long_Short == "Short"){
				out_data[6].value += parseInt(data[i].Quantity);
			}else{
				out_data[7].value += parseInt(data[i].Quantity);
			}
		}
	}

	for (i = 5; i >= 0; i--){

		var tmp_data = {};

		var rect_width = Math.abs(out_data[i].value)/max_top_x*rect_max_width;
		var rect_height = out_data[i].height;
		var pos_y = out_data[i].pos_y;
		var color = out_data[i].color;

		tmp_data["width"]  = rect_width;
		tmp_data["height"] = rect_height;
		tmp_data["y"] = pos_y + val_index*(rect_max_height+RectPaddingTop);
		tmp_data["color"] = color;
		tmp_data["top_name"] = top_name;


		if(out_data[i].neg_pos == "neg" && short_flag == true){
			   tmp_data["x"] = rect_max_width-rect_width;
		       tmp_data["long_short"] = "short";
		       tmp_data["market_value"] = numberWithCommas(out_data[4].value);
		       tmp_data["book_basis"] = numberWithCommas(out_data[0].value);
		       tmp_data["tax_basis"] = numberWithCommas(out_data[2].value);
		       tmp_data["quantity"] = numberWithCommas(out_data[6].value);
			   rect_data.push(tmp_data);
		}else if(out_data[i].neg_pos == "pos" && long_flag == true){
			   tmp_data["x"] = rect_max_width;
		       tmp_data["long_short"] = "long";
		       tmp_data["market_value"] = numberWithCommas(out_data[5].value);
		       tmp_data["book_basis"] = numberWithCommas(out_data[3].value);
		       tmp_data["tax_basis"] = numberWithCommas(out_data[1].value);
		       tmp_data["quantity"] = numberWithCommas(out_data[7].value);
			   rect_data.push(tmp_data);
		}
	}

    if(start_flag == 1){

    	var tmp_data = {};
    	tmp_data["x"] = rect_max_width;
    	tmp_data["y"] = start_pos_y + val_index*(rect_max_height+RectPaddingTop);
    	tmp_data["width"] = 1;
    	tmp_data["height"] = rect_max_height+margin.top+margin.bottom;
    	tmp_data["color"] = "black";
    	vertial_line_data.push(tmp_data);

	}else{
    	
    	var tmp_data = {};
    	tmp_data["x"] = rect_max_width;
    	tmp_data["y"] =  + val_index*(rect_max_height+RectPaddingTop);
    	tmp_data["width"] = 1;
    	tmp_data["height"] = rect_max_height+RectPaddingTop;
    	tmp_data["color"] = "black";
    	vertial_line_data.push(tmp_data);

	}

    if(end_flag == 1){
    	
    	var tmp_data = {};
    	tmp_data["x"] = rect_max_width;
    	tmp_data["y"] = start_pos_y + rect_max_height + val_index*(rect_max_height+RectPaddingTop);
    	tmp_data["width"] = 1;
    	tmp_data["height"] = end_bottom/2;
    	tmp_data["color"] = "black";
    	vertial_line_data.push(tmp_data);

	    var tmp_data = {};
    	tmp_data["x"] = 0;
    	tmp_data["y"] = rect_max_height+start_pos_y+end_bottom/2 + val_index*(rect_max_height+RectPaddingTop);
    	tmp_data["width"] = rect_max_width*2;
    	tmp_data["height"] = 1;
    	tmp_data["color"] = "black";
    	horizontal_line_data.push(tmp_data);

	    var tmp_data = {};
    	tmp_data["str"] = numberWithCommas(max_top_x);
    	tmp_data["x"] = 0;
    	tmp_data["y"] = rect_max_height+start_pos_y+end_bottom/2+20 + val_index*(rect_max_height+RectPaddingTop);
    	tmp_data["font_size"] = "15px";
    	tmp_data["color"] = "black";
    	axis_data.push(tmp_data);

	    var tmp_data = {};
    	tmp_data["str"] = numberWithCommas(max_top_x/2);
    	tmp_data["x"] = rect_max_width/2;
    	tmp_data["y"] = rect_max_height+start_pos_y+end_bottom/2+20 + val_index*(rect_max_height+RectPaddingTop);
    	tmp_data["color"] = "black";
    	tmp_data["font_size"] = "15px";
    	tmp_data["text_anchor"] = "start";
    	axis_data.push(tmp_data);

	    var tmp_data = {};
    	tmp_data["str"] = "0";
    	tmp_data["x"] = rect_max_width;
    	tmp_data["y"] = rect_max_height+start_pos_y+end_bottom/2+20 + val_index*(rect_max_height+RectPaddingTop);
    	tmp_data["color"] = "black";
    	tmp_data["font_size"] = "15px";
    	tmp_data["text_anchor"] = "middle";
    	axis_data.push(tmp_data);

	    var tmp_data = {};
    	tmp_data["str"] = numberWithCommas(max_top_x/2);
    	tmp_data["x"] = rect_max_width/2*3;
    	tmp_data["y"] = rect_max_height+start_pos_y+end_bottom/2+20 + val_index*(rect_max_height+RectPaddingTop);
    	tmp_data["color"] = "black";
    	tmp_data["font_size"] = "15px";
    	tmp_data["text_anchor"] = "middle";
    	axis_data.push(tmp_data);

	    var tmp_data = {};
    	tmp_data["str"] = numberWithCommas(max_top_x);
    	tmp_data["x"] = rect_max_width*2;
    	tmp_data["y"] = rect_max_height+start_pos_y+end_bottom/2+20 + val_index*(rect_max_height+RectPaddingTop);
    	tmp_data["color"] = "black";
    	tmp_data["font_size"] = "15px";
    	tmp_data["text_anchor"] = "end";
    	axis_data.push(tmp_data);


    	for(k = 0; k < 3; k++){
		    var tmp_data = {};
			tmp_data["x"] = rect_max_width-230+k*160;
			tmp_data["y"] = rect_max_height+start_pos_y + end_bottom + val_index*(rect_max_height+RectPaddingTop);
			tmp_data["width"] = 20;
			tmp_data["height"] = 20;
			tmp_data["color"] = Value_Colors[k];
			legend_rect.push(tmp_data);

		    var tmp_data = {};
			tmp_data["x"] = rect_max_width-200+k*160;
			tmp_data["y"] = rect_max_height+start_pos_y + end_bottom + val_index*(rect_max_height+RectPaddingTop) + 16;
			tmp_data["font_size"] = 20;
			tmp_data["str"] = Values_Text[k];
			legend_text.push(tmp_data);
    	}
    }

    var tmp_data = {};
	tmp_data["x"] = rect_max_width-outline_box_width/2;
	tmp_data["y"] = 3 + val_index * (rect_max_height + RectPaddingTop);
	tmp_data["width"] = outline_box_width;
	tmp_data["height"] = 24;
	tmp_data["color"] = "white";
	tmp_data["stroke_color"] = "black";
	tmp_data["top_name"] = top_name;
	box_data.push(tmp_data);

    var tmp_data = {};
	tmp_data["str"] = top_name;
	tmp_data["x"] = rect_max_width;
	tmp_data["y"] = start_pos_y-8 + val_index*(rect_max_height+RectPaddingTop);
	tmp_data["color"] = "red";
	tmp_data["font_size"] = "20px";
	tmp_data["text_anchor"] = "middle";
	tmp_data["top_name"] = top_name;
	group_data.push(tmp_data);

}
function top_charts(long_flag,short_flag){

	formatTopCharts();

	var top_fact_names = [];

	for(p = 0; p < top_names.length; p++){
		for(t = 0; t < data.length; t++){
			if(data[t].Asset_Type == top_names[p] && ((data[t].Book_Basis > 0 && long_flag == 1) || (data[t].Book_Basis < 0 && short_flag == 1))){
				break;
			}
		}
		if(t < data.length){
			top_fact_names.push(top_names[p]);
		}
	}

	rect_data = [];
	vertial_line_data = [];
	horizontal_line_data = [];
	box_data = [];
	axis_data = [];
	group_data = [];
	legend_rect = [];
	legend_text = [];

	for(p = 0; p < top_fact_names.length; p++){
		if(p == 0){
			top_chart("."+top_fact_names[p],top_fact_names[p],1,0,long_flag,short_flag,p);
		}else if(p == top_fact_names.length - 1){
			top_chart("."+top_fact_names[p],top_fact_names[p],0,1,long_flag,short_flag,p);
		}else{
			top_chart("."+top_fact_names[p],top_fact_names[p],0,0,long_flag,short_flag,p);
		}
	}

	var height = top_fact_names.length*(rect_max_height+RectPaddingTop) + end_bottom + legendHeight;
	$('#svg').css('height',height);

	drawCharts();
}
