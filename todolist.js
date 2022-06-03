var myVar //Variable que uso para los SetTimeout
var colores = ["rgb(255, 139, 137)", "rgb(255, 214, 173)", "rgb(252, 252, 176)", "rgb(204, 255, 153)", "rgb(204, 255, 255)", 'rgb(255, 255, 255)'];    
function sort(){//Funcion que se encarga de ordenar la lista
    var notasSort = []; //Creamos un array donde iremos guardando las notas ordenadas
    var notas = document.getElementsByTagName('LI');//Guardamos el array de los LI
    if(notas.length < 1)
        appendWarSort(notas.length);
    if(notas.length == 1)
        appendWarSort(notas.length);
    for(i = 0; i < colores.length; i++){//Recorremos el array colores pues ordenaremos por el orden de estos.
        for(j = 0; j < notas.length; j ++){//Recorremos el Array original
            if(notas[j].style.backgroundColor == colores[i]){ //Si el color es igual al indice del array de colores
                notasSort.push(notas[j]); //Lo guardamos en el array de notas ordenadas en el ultimo lugar por tanto el el primero siempre quedará arriba
                var padre = notas[j].parentNode; //creamos un nodo padre con el indice J
                padre.removeChild(notas[j]); //Eliminamos el LI
                j=-1;//Reiniciamos el contador
            }
        }
    }
    padre = document.getElementById('lista');
    for(i = 0; i < notasSort.length; i ++){ //Recorremos el array ordenado después de haber borrado y lo vamos pegando al OL
        padre.appendChild(notasSort[i]);
    }
    saveData(); //Guardamos después de ordenar
}
function saveSession(){//Vamos a guardar la sesión en LocalStorage por si se cierra la página
    localStorage.textArea = document.getElementById('area').value;
    localStorage.tag = document.getElementById('tag').value;
}
function loadSession(){//Cargamos la sesión
    if(localStorage.textArea){//Comprobamos que existe la variable guardada
        document.getElementById('area').value = localStorage.textArea;
        document.getElementById('tag').value = localStorage.tag;
    }
}  
function crearPaleta()//Esta función crea la paleta de colores basandose en el array de colores
{
    for(i = 0; i < colores.length; i ++) //recorremos el array de colores
    {
        color = "'"+colores[i]+"'";
        var paleta = document.getElementById('paleta'); 
        var boton = document.createElement("DIV"); //Creamos un DIV (Antiguamente era un botón) y le damos los estilos y funcionalidades
        boton.style.backgroundColor = colores[i];
        boton.className = "mybtn";
        boton.setAttribute("onclick", "getBackColor("+color+")") //GetBackColor es una funcion que recoge el color y se lo añade al TextArea
        paleta.appendChild(boton); //Pegamos el botón
    }
}
/*function tachar(node){ DESCOMENTAR PARA AÑADIR FUNCION DE TACHADO         DESCOMENTAR EN EL CSS LA LÍNEA DE HIDDEN CHECKBOX

    if(node.style.textDecoration == "none"){
        node.style.textDecoration = "line-through";
        node.firstChild.checked = true;
    }
    else{
        node.style.textDecoration = "none";
        node.firstChild.checked = false;
    }
    event.stopPropagation();
    event.preventDefault();
}*/
function myFunction() //Funcion principal que añade tareas.
{
    if(!document.getElementById('area').value == "")
    {
        //AÑADIENDO EXTRA DE CLASE, TAGS
        //var cadenaTag = " "+document.getElementById('tag').value
        var spanTag = document.createElement('SPAN')
        spanTag.className = "tags";
        //var tagTextNode = document.createTextNode(cadenaTag);
        //spanTag.appendChild(tagTextNode);
        //En esta funcion creamos los nodos necesarios para añadir un nuevo Checkbox, Label y LI y los pegamos a la LISTA
        var cadena = " "+document.getElementById('area').value
        var color = document.getElementById('area').style.backgroundColor  
        document.getElementById('area').value = "";   //DESCOMENTAR PARA QUE AL AÑADIR NOTA SE BORRE EL TEXTAREA
        var checkbox = document.createElement('INPUT')
        var label = document.createElement('LABEL')
        label.className = "mylabel"    
        checkbox.type = "checkbox"
        checkbox.className = "checkClass"
        var li = document.createElement('LI');
        /*label.addEventListener("click", function() {tachar(label)});  DESCOMENTAR PARA AÑADIR FUNCION DE TACHADO*/
        li.className = "lies";
        var t = document.createTextNode(cadena.toUpperCase());        
        li.appendChild(label);
        label.appendChild(checkbox);
        label.appendChild(t);
        label.appendChild(spanTag)
        li.style.backgroundColor = color;
        if(li.style.backgroundColor == "")
            li.style.backgroundColor = "rgb(255, 255, 255)";  //FIX DE ORDENACION, Como ordenaba por colores, la primera vez que introducias una nota blanca el color era ' "" ' en vez de rgb(255, 255, 255) y no lo ordenaba bien
        document.getElementById('lista').appendChild(li);
    }else
    {
        //Si no, mostramos un error y luego eliminamos el hijo
        appendErr();
    }
    saveData(); //Llamamos a la funcion guardar datos
    document.getElementsById('opciones').focus();
}
function getBackColor(color) //Funcion para coger el color del botón y añadirselo al text area
{
    document.getElementById('area').focus(); //Cuando llamamos a la funcion de color, o sea cuando hacemos click en el boton del color hacemos focus al textarea
    document.getElementById('area').style.backgroundColor = color;   
}
function appendErr() //Mensaje que se autodestruye
{   
    var objTo = document.getElementById('opciones')
    var divTest = document.createElement('p')
    divTest.innerHTML = '<p class="bg-danger">ERROR: No ha introducido ninguna tarea</p>'
    objTo.appendChild(divTest)
    myVar = setTimeout(function() {divTest.parentNode.removeChild(divTest);}, 2000);
}
function appendErrDel()//Mensaje de error al borrar
{
    var objTo = document.getElementById('opciones')
    var divTest = document.createElement('p')
    divTest.innerHTML = '<p class="bg-danger">AVISO: No has seleccionado ninguna tarea</p>'
    objTo.appendChild(divTest)
    myVar = setTimeout(function() {divTest.parentNode.removeChild(divTest);}, 2000);
}
function appendWarDel(cont){//Mensaje que avisa cuantas tareas te has cargado
    var objTo = document.getElementById('opciones')
    var divTest = document.createElement('p')
    divTest.innerHTML = '<p class="bg-success">FELICIDADES: ¡Has completado '+cont+' tareas!</p>'
    objTo.appendChild(divTest)
    myVar = setTimeout(function() {divTest.parentNode.removeChild(divTest);}, 3000);
}
function appendWarSort(longNotas){//Funcion para avisar de cuando no se pueda ordenar
    var objTo = document.getElementById('opciones')
    var divTest = document.createElement('p')
    if(longNotas < 1)
        divTest.innerHTML = '<p class="bg-warning">AVISO: No hay tareas que ordenar</p>';
    if(longNotas == 1)
        divTest.innerHTML = '<p class="bg-warning">AVISO: ¡Pero si sólo tienes una tarea!</p>';
    objTo.appendChild(divTest)
    myVar = setTimeout(function() {divTest.parentNode.removeChild(divTest);}, 3000);
}
function marcar(truefalse) //Funcion para marcar los checkbox
	{
		checkboxes=document.getElementsByTagName('input'); //obtenemos todos los controles del tipo Input
		for(i=0;i<checkboxes.length;i++) //recoremos todos los controles
		{
			if(checkboxes[i].type == "checkbox") //solo si es un checkbox entramos
			{
				//checkboxes[i].checked=source.checked; //si es un checkbox le damos el valor del checkbox que lo llamó (Marcar/Desmarcar Todos)
                checkboxes[i].checked = truefalse ;
                /*if(checkboxes[i].checked){ //DESCOMENTAR PARA AÑADIR FUNCIONALIDAD DE TACHADO (FALTA OPTIMIZARLO)
                    checkboxes[i].parentNode.parentNode.style.textDecoration = "line-through";
                }
                else{
                   checkboxes[i].parentNode.parentNode.style.textDecoration = "none";
                }*/
			}
		}
	}
function eliminar()
{
    //En esta función recorremos los Checkbox y si estan marcados nos cargamos todo lo que tenga dentro su Padre que es el LI y luego el propio LI
    var myArray = document.getElementsByTagName('input');
    var element = document.getElementById('lista');
    var cont = 0;
    for (i = 0; i < myArray.length; i ++)
    {
        if(myArray[i].type == "checkbox" &&  myArray[i].checked == true)
        {
            var padre = myArray[i].parentNode;
            var abuelo = padre.parentNode;
            var visabuelo = abuelo.parentNode;
            padre.removeChild(padre.firstChild);
            padre.removeChild(padre.firstChild);
            abuelo.removeChild(padre);
            visabuelo.removeChild(abuelo);
            i = -1;
            cont ++;      
            //Corteasia de Victor
        }else
        {
            //cont = false
        }  
    }
    
    if(cont == 0)
            appendErrDel()
            saveData(); //Guardamos los cambios
    if(cont > 0)
    appendWarDel(cont);
}
/////////////////////////LOCALSTORAGE////////////////////
function saveData(){
    
    var arrayNotas = document.getElementsByClassName('mylabel');
    var arrayColor = document.getElementsByClassName('lies');
    var arrayTags = document.getElementsByClassName('tags'); 
    localStorage.clear();
    for(x = 0; x < arrayNotas.length; x ++){
        var texto = arrayNotas[x].textContent;
        var color = arrayColor[x].style.backgroundColor;
        var tags = arrayTags[x].textContent;
        localStorage.setItem(x+"_NOTA", JSON.stringify({nota:texto, color:color, tags:tags, fin:fin}));       
    }
}
function navegador()//Con esta funcion avisamos a los usuarios de Internet Explorer que no es compatible con su navegador
{
    var navegador = navigator.userAgent.toString();
    //if(/.NET/.test(navegador)) ESTA FORMA TAMBIÉN ES VÁLIDA
    if(navegador.indexOf('.NET') != -1)
    {
        var objTo = document.getElementById('opciones')
        var divTest = document.createElement('p')
        divTest.innerHTML = '<p class="bg-danger">AVISO: Esta aplicación usa LocalStorage para almacenar sus tareas, Internet Explorer no soporta esta función, utilice Google Chrome o Mozilla Firefox para un correcto funcionamiento</p>'
        objTo.appendChild(divTest)
    }
}
function loadData(){
    navegador();
    crearPaleta();
    loadSession();
    if(localStorage["0_NOTA"] != null){
        for(i= 0; localStorage.key.length; i++){     
            var cadena = localStorage[i+"_NOTA"];
            var color = localStorage[i+"_NOTA"];
            var tag1 = localStorage[i+"_NOTA"];
            var cad = cadena.substring(cadena.indexOf(" "), cadena.indexOf(',') -5);
            var col = color.substring(color.indexOf("color")+8, color.indexOf(")") +1)
            var tag2 = tag1.substr(tag1.indexOf("tags")+7, tag1.indexOf('fin') -3)
            var checkbox = document.createElement('INPUT')
            var label = document.createElement('LABEL')
            var tag = document.createElement("SPAN")
            var tagTextNode = document.createTextNode(tag2);
            tag.appendChild(tagTextNode)
            tag.className = "tags"
            
            label.className = "mylabel";
            checkbox.type = "checkbox"
            checkbox.className = "checkClass"
            var li = document.createElement('LI');
            li.className = "lies";
            var t = document.createTextNode(cad.toUpperCase());        
            li.appendChild(label);
            label.appendChild(checkbox);
            label.appendChild(t);
            label.appendChild(tag);
            li.style.backgroundColor = col;
            document.getElementById('lista').appendChild(li);
        }
    }
}