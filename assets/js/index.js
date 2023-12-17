const myinputtext = document.getElementById('box-input')
const mybtnbox =document.getElementById('btn-box-add')
const myboxtotal = document.getElementById('box-total')
const myboxresul = document.getElementById('box-result')
const mylisthomework = document.getElementById('list-homework')
const array_list=[]
let i = 0
let b = 0
let rep = []


const eliminar = async (id) =>{
    const resp = await Swal.fire({
        title: "Desea eliminar la tarea de forma definitiva?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
    })
    if (resp.isConfirmed){
        const index = array_list.findIndex((lista) => lista.id === id)
        array_list.splice(index,1)
        i--;
        rep.forEach(element => {
        if(id === element){
            if(b!=0){
                b--
            }
            myboxresul.innerHTML='Realizadas: '+b
        }
    });
    myboxtotal.innerHTML='Total: '+i
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Tarea Eliminada",
        showConfirmButton: false,
        timer: 2000
    })
    cargar_tabla()
    if (i==0){
        mylisthomework.innerHTML = ''
        mylisthomework.classList.remove('border-tbt')
    }    
    }
}

const modificar = (id) =>{
    const index = array_list.findIndex((lista) => lista.id === id)
    console.log('arr --> '+array_list[index].done)
    if(array_list[index].done == false){
        array_list[index].done = true
        rep.push(id)
        b++
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Tarea Realizada",
            showConfirmButton: false,
            timer: 2000
        })
    }else if(array_list[index].done == true){
        array_list[index].done = false
        b--
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Tarea Pendiente",
            showConfirmButton: false,
            timer: 2000
        })
        }
    myboxresul.innerHTML='Realizadas: '+b
    cargar_tabla()    
}

mybtnbox.addEventListener('click',() =>{
    if(myinputtext.value != ''){
        const objtarea = {id:rdm(),tarea:myinputtext.value,done:false}
        array_list.push(objtarea)
        i++
        myboxtotal.innerHTML='Total: '+i
        myinputtext.value = '' 
        cargar_tabla()
    }else{
        Swal.fire({
            icon:"info",
            title : "Oops.... Campo tarea vacio!"
        })
    }
})
    
 const cargar_tabla = () =>{   
    mylisthomework.innerHTML = ''
    mylisthomework.classList.add('border-tbt')
    let trh = document.createElement('tr')
    let tdhid = document.createElement('td')
    tdhid.classList.add('text-center')
    tdhid.innerText = 'Id'
    let tdhtarea = document.createElement('td')
    tdhtarea.classList.add('text-center-tarea')
    tdhtarea.innerText = 'Tarea'
    trh.appendChild(tdhid)
    trh.appendChild(tdhtarea)
    mylisthomework.appendChild(trh)
    array_list.forEach(listtarea => {
        let tr = document.createElement('tr')
        let tdid = document.createElement('td')
        tdid.classList.add('text-id')
        tdid.innerText = listtarea.id
        let tdtarea = document.createElement('td')
        tdtarea.classList.add('text-center1')
        tdtarea.innerText = listtarea.tarea
        let tdinput = document.createElement('td')
        let ipt = document.createElement('input') 
        ipt.classList.add('listcheck')
        ipt.setAttribute('type','checkbox')
        ipt.checked = listtarea.done
        tdinput.appendChild(ipt)
        let tdbtn = document.createElement('td')
        let btndel = document.createElement('img')
        btndel.src='./assets/img/boton-eliminar.png'
        btndel.classList.add('txt-btn')
        btndel.setAttribute('onclick','eliminar('+listtarea.id+')')
        ipt.setAttribute('onclick','modificar('+listtarea.id+')')
        tdbtn.appendChild(btndel)
        tr.appendChild(tdid)
        tr.appendChild(tdtarea)
        tr.appendChild(tdinput)
        tr.appendChild(tdbtn)
        mylisthomework.classList.add('tbtcls')
        mylisthomework.appendChild(tr)
    }); 
}

rdm = () => {
    return Math.floor(Math.random() * 200)
  }

