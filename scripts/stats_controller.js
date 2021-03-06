class Stats_controller{
    
    constructor()
    {
        this.data = [];
    }

    drawData(total, inmoviles, healthies, sicks, recovereds, deceaseds){

        this.drawInput(total , inmoviles)
        this.drawC1(total , healthies , sicks , recovereds , deceaseds);
        this.drawC2(total , healthies , sicks , recovereds , deceaseds);

    }

    drawInput(cant_particulas,cant_inmoviles){

      let 
        x_start = cv_width * 0.05, //posicion x slider
        y_start = cv_height * 0.3, //posicion y slider

        graph_height= cv_height * 0.15, 
        graph_width = cv_width * 0.15, //ancho de los sliders

        line_width= 1.5,
        sobra = 15,

        x_background = x_start - sobra,         //posicion x del input_div
        y_background = y_start - sobra,         //posicion y del input_div
        back_height = graph_height + 2 * sobra, //alto del input_div
        back_width =  graph_width + 2 * sobra;  //ancho del input_div

        div.style.top = y_start+"px";
        div.style.left = x_start+"px";

        botonera.style.top = y_background+div.clientHeight+10+"px";
        botonera.style.left = x_background+5+"px";

        range_1.style.width = graph_width+"px";
        range_2.style.width = graph_width+"px";
        range_3.style.width = graph_width+"px";

        p_cant.innerHTML = "Particles: "+ range_1.value;
        p_inmo.innerHTML = "Immobile Particles: "+ range_2.value;
        p_radi.innerHTML = "Radius Size: "+ range_3.value;        
    
    }


    // Bar Chart
    drawC1(cant_particulas, total_healthy, total_sick, total_recovered, total_deceased){
        
        let x_start = cv_width * 0.8,
            y_start = cv_height * 0.3,

            graph_height= cv_height * 0.15,
            graph_width = cv_width * 0.15,

            line_width= 1.5,
            sobra = 15,

            x_background = x_start - sobra,
            y_background = y_start - sobra,
            back_height = graph_height + 2 * sobra,
            back_width =  graph_width + 2 * sobra;

        //Background    
        ctx.fillStyle = "rgba(255 , 255, 255, 0.1)"
        ctx.fillRect(x_background , y_background , back_width , back_height + sobra)

        ctx.lineWidth = line_width
        ctx.strokeStyle = COLOR_GRAPH_AXIS

        ctx.stroke()
        ctx.closePath()

        let bar_width = graph_width * 0.12,
            separator = graph_width * 0.1,
            half_point = bar_width /2;

        //conversiones: min=0 max=TOTAL_PARTICLES

        //healthy
        ctx.beginPath()
        ctx.fillStyle = COLOR_HEALTHY;
        ctx.fillRect( (x_start + separator) , (y_start + graph_height) , (bar_width) , - (total_healthy / cant_particulas) * graph_height);
        ctx.font =  '.8rem Roboto'
        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.fillText(`${total_healthy}` , separator*1 + x_start + half_point , y_start + graph_height + 20 )

        ctx.fillStyle = COLOR_SICK;
        ctx.fillRect( (x_start + 1*bar_width + 2 *separator) , (y_start + graph_height) , (bar_width) , - (total_sick / cant_particulas) * graph_height);
        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.fillText(`${total_sick}` , separator * 2  + bar_width * 1 + x_start + half_point , y_start + graph_height + 20 )

        ctx.fillStyle = COLOR_RECOVERED;
        ctx.fillRect( (x_start + 2*bar_width + 3 * separator) , (y_start + graph_height) , (bar_width) , - (total_recovered / cant_particulas) * graph_height);
        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.fillText(`${total_recovered}` , separator * 3 +  bar_width * 2 + x_start + half_point , y_start + graph_height + 20 )

        ctx.fillStyle = COLOR_DECEASED;
        ctx.fillRect( (x_start + 3 * bar_width + 4 * separator) , (y_start + graph_height) , (bar_width) , - (total_deceased / cant_particulas) * graph_height);
        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.fillText(`${total_deceased}` , separator * 4 +  bar_width * 3 + x_start + half_point , y_start + graph_height + 20 )
    

        //Axis
        ctx.moveTo(x_start , y_start + graph_height)
        ctx.lineTo(x_start + graph_width , y_start + graph_height)
    }


    //Curve Chart
    drawC2(cant_particulas , total_healthy , total_sick , total_recovered , total_deceased){
         
        let x_start = cv_width * 0.15,
            y_start = cv_height * 0.82,
            line_width= 1.5,

            graph_height= cv_height * 0.15,
            graph_width = cv_width * 0.7,

            sat   = 0.3 * graph_height,

            dx_width = graph_width / 600, //ancho de cada barra
            offset = dx_width - 1 //para que no queden espacios en blanco

        const input = [4];
        input[0]= (total_healthy   / cant_particulas) * graph_height
        input[1]= (total_sick      / cant_particulas) * graph_height
        input[2]= (total_recovered / cant_particulas) * graph_height
        input[3]= (total_deceased  / cant_particulas) * graph_height
   

        //Background    
        ctx.fillStyle = "rgba(255 , 255, 255, 0.1)"
        ctx.fillRect(x_start , y_start , graph_width , graph_height);

        //Satured constant
        ctx.moveTo(x_start , y_start - graph_height + sat)


        //saturation axis
        ctx.lineWidth = line_width
        ctx.strokeStyle = COLOR_GRAPH_AXIS
        ctx.moveTo(x_start , y_start + graph_height - sat)
        ctx.lineTo(x_start + graph_width , y_start + graph_height - sat)
        ctx.stroke()


        this.data.push(input)

        if((this.data.length * offset - 5 > graph_width) && total_sick){
            this.data.shift();
        }

        for (let i = 0; (i < this.data.length) && ((i * offset) < graph_width) ; i++) {
            let last_y = y_start;

            ctx.fillStyle = "rgba(0,0,0,0)"
            ctx.fillRect(x_start + offset * i , last_y , dx_width , this.data[i][0]);
            last_y += this.data[i][0];

            ctx.fillStyle =  COLOR_RECOVERED
            ctx.fillRect(x_start + offset * i , last_y , dx_width , this.data[i][2]);
            last_y += this.data[i][2];

            ctx.fillStyle = COLOR_DECEASED
            ctx.fillRect(x_start + offset * i , last_y , dx_width , this.data[i][3]);
            last_y += this.data[i][3];

            ctx.fillStyle = COLOR_SICK
            ctx.fillRect(x_start + offset * i , last_y , dx_width , this.data[i][1]);
            last_y += this.data[i][1];
        }
    
        ctx.font =  '1rem Roboto'
        ctx.textAlign = "start"
        ctx.fillStyle = "white"
        ctx.fillText(`#StayHome to flatten the curve | #MeQuedoEnCasa para aplanar la curva` , x_start , y_start - graph_height * 0.1 )
        



        if(admin.pf.systemSatured()){
            ctx.font =  'Italic 1rem Roboto'
            ctx.fillStyle = "#aaa"
            ctx.fillText(`Collapsed Healthcare System.` , x_start + graph_width * 0.05, y_start + graph_height * 0.3)

        }
       
       
       
    }

    clear(){
        this.data = [];
    }
}