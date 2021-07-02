export interface Agenda {

    id: String,
    inicio: String,
    fin: String,
    horaInicio: String,
    horaFin: String,
    dtVacunatorio: {
        nombre: String,
        codigo: String,
        puesto: any,
    }
    listDtPlanVacunacion:[
        {
            edadMaxima: Number,
            edadMinima: Number,
            enfermedad:          {
                nombre: String
            },

            nombre: String,
            poblacionObjetivo: String
        }
    ]
}