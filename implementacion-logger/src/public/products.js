

let cid = document.getElementById('cid').value

let data = {
  pid: document.getElementById('pid').value,
  quantity: document.getElementById('quantity').value
}


document.getElementById("cartButton").addEventListener('click', async (event) => {
  event.preventDefault()
  console.log(data)
  await fetch(`/api/carts/${cid}`, {// 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => {
      document.getElementById("message").innerHTML = "Se ha hecho la peticion, puedes comprobarlo en el carrito seleccionado."
      document.getElementById("cid").value = ""
      document.getElementById("pid").value = ""
      document.getElementById("quantity").value = ""


    }

    )


})
