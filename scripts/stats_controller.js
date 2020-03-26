class Stats_controller{
    
    constructor(){
        
        //Bar Chart para contar las persoans

    }

    refreshData(cant_healthy , cant_sick , cant_recovered , cant_deceased){


    }

    drawData(){

        //Backgrounds
        let x_start = cv_width * 0.8,

            y1_start = cv_height * 0.3,
            y2_start = cv_height * 0.6,
   
            graph_height= cv_height * 0.2,
            graph_width = cv_width * 0.18,
            line_width= 1.5;

        ctx.beginPath();

        let sobra = 20;
        //Chart background
        let x_background = x_start - sobra,
            y1_background = y1_start - sobra,
            y2_background = y2_start - sobra,
            back_height = graph_height + 2 * sobra,
            back_width =  graph_width + 2 * sobra;

            
        ctx.fillStyle = "rgba(0 , 0, 0, 0.2)"
        ctx.fillRect(x_background , y1_background , back_width , back_height);
        ctx.fillRect(x_background , y2_background , back_width , back_height);


        
        



        //Ejes grafico 1
        ctx.moveTo(x_start, y1_start);
        ctx.lineTo(x_start , y1_start + graph_height);
        ctx.lineTo(x_start + graph_width , y1_start + graph_height);

        //Ejes grafico 2
        ctx.moveTo(x_start, y2_start);
        ctx.lineTo(x_start , y2_start + graph_height);
        ctx.lineTo(x_start + graph_width , y2_start + graph_height);

        ctx.lineWidth = line_width; 
        ctx.strokeStyle = COLOR_GRAPH_AXIS;
        ctx.lineWidth = line_width;
        ctx.stroke();
        ctx.closePath();

        //Barras grafico 1
        let bar_width = graph_width * 0.12,
            separator = graph_width * 0.1;

        //conversiones: min=0 max=TOTAL_PARTICLES

        //healthy
        ctx.beginPath()
        ctx.fillStyle = COLOR_HEALTHY;
        ctx.fillRect( (x_start + separator) , (y1_start + graph_height) , (bar_width) , - (total_healthy / CANT_PARTICULAS) * graph_height);
        
        ctx.fillStyle = COLOR_SICK;
        ctx.fillRect( (x_start + bar_width + 2 *separator) , (y1_start + graph_height) , (bar_width) , - (total_sick / CANT_PARTICULAS) * graph_height);

        ctx.fillStyle = COLOR_RECOVERED;
        ctx.fillRect( (x_start + 2 * bar_width + 3 * separator) , (y1_start + graph_height) , (bar_width) , - (total_recovered / CANT_PARTICULAS) * graph_height);

        
        ctx.fillStyle = COLOR_DECEASED;
        ctx.fillRect( (x_start + 3 * bar_width + 4 * separator) , (y1_start + graph_height) , (bar_width) , - (total_deceased / CANT_PARTICULAS) * graph_height);
        //Barra Healthy





    }





}