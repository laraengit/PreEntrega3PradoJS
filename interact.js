//Funciones

function menu (nombre, seccion,opciones, cantOpciones){
    //No usar 0 (no toma el caso en el switch), siempre ingresar las opciones de 1 hasta n = cantOciones 
    let elecc
    do {
        elecc= Number(prompt(`${seccion}\n${nombre}, presioná en tu teclado el número correspondiente a lo que querés hacer: \n${opciones} `))
        console.log(`El usuario ingresó ${elecc}`)
    }while(elecc>cantOpciones || elecc<=0 ||  !Number(elecc))
    return elecc
}

function menuPrincipal (nombre){
    let eleccPrinc
    let elecc2 = 1
    
    do{
        eleccPrinc = menu(nombre,"Menú principal", "1. Pedir un turno \n2.Calcular mi Índice de masa corporal (IMC) \n3.Chequear mis valores de presión\n4.Consulta Servicios \n5. Salir",5)
        switch(eleccPrinc){
            case 1:
                console.log(" caso 1. Pedir un turno")
                let noesp
                noesp = pedirTurno(nombre)
                if (noesp == 1){
                    //si no estaba la especialidad, la redirigimos directamente al menu principal
                    elecc2 = 1
                }else{
                    //si habia la especialidad le presguntamos tambien si quiere  salir
                    elecc2 = menu(nombre,"Qué hacemos?","1.Volver al Menú principal \n2. Salir",2)
                }
                
                break
            case 2:
                console.log("caso 2.Calcular mi Índice de masa corporal(IMC)")
                imc(nombre)
                elecc2 = menu(nombre,"Qué hacemos?","1.Volver al Menú principal \n2. Salir",2)
                break
            case 3:
                console.log("caso 3.Chequear mis valores de presión")
                presion(nombre)
                elecc2 = menu(nombre,"Qué hacemos?","1.Volver al Menú principal \n2. Salir",2)
                break
            case 4:
                console.log("caso 4.Consulta servicios")
                consultaServicios(nombre, serviciosDisponibles,especialidades)
                elecc2 = menu(nombre,"Qué hacemos?","1.Volver al Menú principal \n2. Salir",2)
                break
            default:
                salir(nombre)
                break
        }
    } while(elecc2!=2 && eleccPrinc != 5 )
    if (eleccPrinc!=5){
        //Si eligio 4 en el menu principal, ya la despidieron antes. Hago un caso aparte solo si se quisieron ir luego de haber realizado 1,2 o 3
        salir(nombre)
    }
}

function imc(nombre){
    //Obtengo peso y altura
    let peso
    let altura
    do{
        peso = parseFloat(prompt(`${nombre} ingresá tu peso. El peso debe estás en kg . Usá punto (".") en el caso que ingreses decimales.`))
        console.log(`Peso: El usuario ingresó ${peso}`)
    }while(!parseFloat(peso))
    do{
        altura = parseFloat(prompt(`${nombre} ingresá tu altura. La altura debe estar en metros. Usá punto (".") en el caso que ingreses decimales.`))
        console.log(`Altura: El usuario ingresó ${altura}`)
    }while(!parseFloat(altura))
    //Hago el calculo
    let imc = peso/(altura**2)
    //Informo
    alert(`${nombre}, tu IMC es de ${imc}`)
    console.log(`El IMC es de ${imc}`)
    
}

function presion(nombre){
    //Obtengo valores de presion
    let sist
    let diast
    do{
        sist = parseFloat(prompt(`${nombre} ingresá la presión sistólica.`))
        console.log(`Sistólica: El usuario ingresó ${sist}`)
    }while(!parseFloat(sist))
    do{
        diast = parseFloat(prompt(`${nombre} ingresá la presión diastólica.`))
        console.log(`Diastólica: El usuario ingresó ${diast}`)
    }while(!parseFloat(diast))
    
    //veo en donde cae
    let resultado = `${nombre} los valores de presión ingresados ${sist}/${diast} son correspondientes a `

    if (sist>=180 || diast>=120){
        resultado = resultado + "una Hipertensión de Grado 3. Solicite atención médica."
    }else if ((sist>=160 && diast <120)  || (diast>=100 && sist<180)){
        resultado = resultado + "una Hipertensión de Grado 2. Solicite atención médica."
    }
    else if ((sist>=130 && diast <100) || (diast>=80 && sist<160)){
        resultado = resultado + "una Hipertensión de Grado 1. Agende un control médico."
    }
    else if ((sist>=120 && diast <80) ){
        resultado = resultado + "una Prehipertensión. Agende un control médico."
    }
    else if ((sist>=90 && diast <80) || (diast>=60 && sist<120)){
        resultado = resultado + "tensión normal."
    }
    else {
        resultado = resultado + "tensión baja. Solicite atención médica. "
    }
    alert(resultado)
}


function pedirTurno(nombre){
    let nuevo
    let prepaga
    let prepagaNombre
    let especialidad
    let disponibilidad
    let noespec = 2
    //Primero le pedimos la especialidad, para no hacerle perder tiempo si esta lo que busca
    especialidad = menu(nombre,"Consulta turnos: Especialidad", "1. Ginecología\n2.Oftalmología\n3.Cardiología\n4.Clínica\n5.Dermatología\n6.Otra",6)
    if (especialidad==6){
        //Caso no atienden esa especialidad: le avisamos y lo redirigimos
        alert("Lo lamentamos, solo contamos con las especialidades listadas")
        noespec = 1
    }
    else{
        //Si atienden le pedimos los datos
        disponibilidad = menu(nombre, "Consulta turnos: Disponibilidad horaria \n Atendemos días de semana de 8 a 20 hs", "1. Mañana\n 2. Tarde \n 3. Mañana y tarde",3)
        nuevo = menu(nombre,"Consulta turnos", "1. Soy un paciente nuevo en el consultorio\n 2.Ya me atendí en el consultorio",2)
        if(nuevo == 1){
            let datosOK = 2
            do{
                //si es nuevo hay que pedirle mas datos
                let apellido = prompt("Ingresá tu apellido")
                let celular = prompt("Ingresá tu celular sin espacios")
                prepaga = menu(nombre,"Consulta turnos: prepaga/Obra Social", "1. Swiss Medical\n2. OSDE\n3. Galeno\n4. Medicus\n5. No tengo/Otra",5)
                //const prepagasAceptadas = ["Swiss Medical","OSDE","Galeno","Medicus"]
                if (prepaga <= 4){
                    alert("La atención está cubierta por tu prepaga")
                    prepagaNombre = prepagasAceptadas[prepaga-1]
                }else{
                    alert("La atención no está cubierta por tu prepaga. Te agendaremos como privado.")
                    prepagaNombre = "Privado"
                }
                let dni = prompt("Ingresá tu DNI sin puntos ni comas")
                const paciente = new PacienteNuevo(nombre,apellido,dni,celular,prepagaNombre)
                
                paciente.mostrarInfoPaciente()

                datosOK = menu(nombre,"Confirmación datos ingresados", "1. Mis datos estaban ok\n2. Quiero corregir mis datos",2)
            }while(datosOK!=1)
            
        }
        //si no es nuevo, ya con el dni del paciente deberian rastrear el resto de los datos de contacto
        //let dni = prompt("Ingresá tu DNI sin puntos ni comas")

        alert("Listo! Quedó registrada tu consulta por el turno. Nos vamos a comunicar para enviarte los turnos disponibles.")
    }
    

    return noespec

}

function consultaServicios(nombre,servicios,especialidades){
    //Buscador de servicios del consultorio
    comoBusca = menu(nombre,"Consulta nuestros servicios disponibles", "1. Buscar por especialidad\n2.Mostrar todos",2)
    let servFiltrados
    if (comoBusca == 1){
        //Quiere buscar por especialidad
        especBusq = menu(nombre,"Filtrar servicios por especialidad","1. Ginecología\n2.Oftalmología\n3.Cardiología\n4.Clínica\n5.Dermatología",5)
        let indEspec = (especBusq - 1)
        //Filtro 
        servFiltrados = servicios.filter((serv)=>((serv.especialidad == especialidades[indEspec])) || (serv.especialidad == "Todas"))

    }
    else{
        servFiltrados = servicios
    }
    
    //Armo un str para mostrar la info
    let infoServ = `Los servicios que ofrecemos son: `
    for (let serv of servFiltrados){
        strServ = `\n\n${serv.servicio}\n    Precio: ${serv.precio}\n    Descripción: ${serv.descripcion}`
        infoServ = infoServ + strServ
    }
    alert(infoServ)
}

function salir(nombre){
    alert(`¡Gracias por visitarnos ${nombre}!`)
}

//Constructores y clases
class PacienteNuevo{
    constructor(nombre,apellido,dni,celular,prepaga) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.celular = celular;
        this.prepaga = prepaga;
    }

    mostrarInfoPaciente(){
        alert(`Estos son los datos registrados: \nNombre: ${this.nombre} \nApellido: ${this.apellido} \nDNI: ${this.dni} \nPrepaga: ${this.prepaga}\nCelular: ${this.celular}`)
    }

}

function Servicio(servicio,precio,descrip, especialidad) {
    this.servicio = servicio;
    this.precio = precio;
    this.descripcion = descrip;
    this.especialidad = especialidad

}
//Datos del sistema

const prepagasAceptadas = ["Swiss Medical","OSDE","Galeno","Medicus"]
const especialidades = ["Ginecología","Oftalmología","Cardiología","Clínica","Dermatología"]

const consulta = new Servicio("Consulta",7000,"Consulta con el especialista","Todas")
const revision = new Servicio("Revisión de estudios",5000,"Consulta para revisar estudios solicitados previamente y dar una devolución con un plan de acción","Todas")
const  pap = new Servicio("PAP",2000,"Papanicolau: para detectar cambios en las células del cuello uterino. Incluye la toma de muestras y el laboratorio. Lo reasliza un/a ginecólogo/a","Ginecología")
const ecg = new Servicio("ECG",2000,"Electrocardiograma(ECG): Se estudia la actividad eléctrica del corazón. Lo realiza un/a cardiólogo/a o un técnico de ECG.","Cardiología")
const ergometria = new Servicio("Ergometría",5000,"Es una prueba de ejercicio físico donde se registra la actividad del corazón con electrodos bajo esfuerzo. Puede hacerse en bicicleta o en cinta. En nuestro consultorio se realiza en cinta.","Cardiología")
const peeling = new Servicio("Peeling",10000,"Peeling: Tratamiento dermatológico que busca renovar la dermis a partir de una solución química que exfolia las capas externas de la piel.","Dermatología")
const fondoOjos = new Servicio("Fondo de ojos",2000,"Permite observar la parte posterior del interior del ojo. Para ello se usan gotas que dilatan las pupilas y cuyo efecto dura unas horas. Se usa para prevenir o hacer el seguimiento de enfermedades.","Oftalmología")

const serviciosDisponibles = [consulta,revision, pap, ecg, peeling, fondoOjos, ergometria]


//Diálogo
let nombre
do{
    nombre = prompt("Bienvenido al sitio web del consultorio! Ingresá tu nombre para comenzar: ")

}while(nombre === null)
menuPrincipal(nombre)

