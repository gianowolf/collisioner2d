class Collisioner
{
    constructor(){}

    gestionarColision(particulas_a_calcular , arbol)
    {
        for (let i = 0 ; i < particulas_a_calcular.length ; i++) 
        { 
            let posibles_colisiones = arbol.detectObjects(particulas_a_calcular[i], arbol);
            {
                
                for (let j = 0; j < posibles_colisiones.length; j++) 
                {
                    let p1 = particulas_a_calcular[i];
                    let p2 = posibles_colisiones[j];
                    if(p1 != p2)
                    {
                        if(p1.x-RADIO < p2.x+RADIO 
                            && p1.x+RADIO > p2.x-RADIO 
                            && p1.y-RADIO < p2.y+RADIO 
                            && p1.y+RADIO > p2.y-RADIO)
                            {
                                Particle.versus(p1,p2);
                            }
                    }
                }
            }
        }
    }
}