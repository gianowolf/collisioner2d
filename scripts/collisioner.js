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
                        if(p1.x-radio < p2.x+radio 
                            && p1.x+radio > p2.x-radio 
                            && p1.y-radio < p2.y+radio 
                            && p1.y+radio > p2.y-radio)
                            {
                                Particle.versus(p1,p2);
                            }
                    }
                }
            }
        }
    }
}