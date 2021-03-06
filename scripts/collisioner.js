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
                    if(p1 != p2 && p1.state != DECEASED && p2.state != DECEASED)
                    {
                        if(p1.x - p1.radio < p2.x+ p2.radio 
                            && p1.x + p1.radio > p2.x- p2.radio 
                            && p1.y - p1.radio < p2.y+ p2.radio 
                            && p1.y + p1.radio > p2.y- p2.radio)
                            {
                                Particle.versus(p1,p2);
                            }
                    }
                }
            }
        }
    }
}