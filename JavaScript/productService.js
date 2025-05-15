function getProducts(){
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de Productos</h4>'
    document.getElementById('info').innerHTML = '' 
    fetch("https://reqres.in/api/unknown",{
        method: "GET", 
        headers: {
            "Content-type" : "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                    }
                })
        })
    
    .then((response) =>{
        if(response.status === 200){
            let listProduct = `
                <table class="table table-success">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Year</th>
                            <th scope="col">Color</th>
                            <th scope="col">Pantone_Value</th>
                        </tr>
                    </thead>
                <tbody>
            `
            response.body.data.forEach(product => {
                listProduct = listProduct.concat(`
                    <tr> 
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.year}</td>
                        <td>${product.color}</td>
                        <td>${product.pantone_value}</td>
                        <td>
                            <button type="button" class="btn btn-outline-success" onclick="showInfoProduct('${product.id}')">View</button>
                        </td>
                    </tr>
    
                    `)
            });
    
            listProduct = listProduct.concat(`
                    </tbody>
                </table>
                `)
            document.getElementById('info').innerHTML = listProduct
            }
            else{
                document.getElementById('info').innerHTML = '<h3>No se encontraron Productos</h3>'
            }
        })
}

function showInfoProduct(product){
    fetch("https://reqres.in/api/unknown/"+product,{
        method: "GET", 
        headers: {
            "Content-type" : "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })

    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })

    .then((response)=>{
        if(response.status === 200){
            showModalProduct(response.body.data)
        }
        else{
            document.getElementById('info').innerHTML = '<h3>No se encontro el producto</h3>'
        }
    })
}

function showModalProduct(product){
    console.log ('ProductModal', product)
    const modalProduct = `
        <div class="modal fade fst-italic" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Show Product</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Info Products</h5>
                        <p class="card-text">First Name : ${product.name}</p>
                        <p class="card-text">Last Name : ${product.year}</p>
                        <p class="card-text">Email : ${product.color}</p>
                        <p class="card-text">Email : ${product.pantone_value}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
            </div>
        </div>
    `
    document.getElementById('showModal').innerHTML = modalProduct
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'))
    modal.show()
}