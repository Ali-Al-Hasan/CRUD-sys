// map of our project

// get total
// create product
// save in localstorge
// clear data inputs
// read
// count - for loop
// delete
// update
// search
// clean data
// this function we will make in this system!

// Create - Save in the LocalStorage

let dataProd;     // to save or products as a object in this array
if(localStorage.product != null){
    dataProd = JSON.parse(localStorage.product);     //to fix the problem in the read the JsFile
}else{
    dataProd = [];
}


let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btn = document.getElementById('submit');

let search = document.getElementById('search')

let temp;     // glopal variable

let btnMood = 'create';

function getTotal(){
    if(price.value !=''){
        let result = (+price.value - +tax.value - +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#087830'
    }else{
        total.innerHTML = '';
        total.style.background = 'orangered'
    }
}

// create products

// btn.onclick = function(){                  //this is the fn make our productes -- we will change this function to make 2 modes for btn update and create!!
btn.onclick = function(){
    let newProd = {
        title: title.value.toLowerCase(),
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,     // it is not a input that's why!
        count: count.value,
        category: category.value.toLowerCase(),
    }
    // will chack if we have a data or not in this input count

    if(title.value != '' && price.value && category.value && tax.value && newProd.count < 151){
        if(btnMood ==='create'){
            if(newProd.count > 1){                 
                // if it more than 1 need to create productes
                for (let j = 0 ; j < newProd.count; j++){
                    dataProd.push(newProd);
                }
            }else{
            dataProd.push(newProd);
            }
            cleaR();      // will not tell the data push to the arr
        }
        else{
            dataProd[temp] = newProd   //!important 
            btnMood = 'create';
            btn.innerHTML = 'Creëren';
            count.style.display = 'block';
        }
    cleaR();
    }

   
     // the best var to use arr if we have a data then we can this data save
    //dataProd.push(newProd);     // in this why we save our data for every object, && here we create a new product

    //console.log(dataProd);

    // Save the data of products in the localStorage
    localStorage.setItem('product', JSON.stringify(dataProd));
    //window.location.reload();    //to fix this problem
    readData();
}
    // to clear the data from the inputs
    



// clear inputs

function cleaR(){
    title.value = '';
    price.value = '';
    tax.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.background = 'orangered';
    count.value = '';
    category.value = '';
}

// Read && show data 

function readData() {
    let table = '';
    for (let j = 0; j < dataProd.length; j++) {
        if (dataProd[j]) {      //dataProd[j] && 1st id is one 1
            table += `                 
            <tr>
                <td>${j+1}</td>
                <td>${dataProd[j].title}</td>
                <td>${dataProd[j].price}</td>
                <td>${dataProd[j].tax}</td>
                <td>${dataProd[j].ads}</td>
                <td>${dataProd[j].discount}</td>
                <td>${dataProd[j].total}</td>
                <td>${dataProd[j].category}</td>
                <td><button onclick="upDate(${j})" id="update">Updaten</button></td>
                <td><button onclick="deleteData(${j})" id="delete">Wissen</button></td>
            </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAllData');
    if (dataProd.length > 0) {
        if (dataProd.length == 1) {
            btnDeleteAll.innerHTML = `<button class='btn' onclick='DeleteAll()'>Dit product verwijderen</button>`;
        } else {
            btnDeleteAll.innerHTML = `<button class='btn' onclick='DeleteAll()'>Alles verwijderen, Er Zijn (${dataProd.length}) Producten</button>`;
        }
    } else {
        btnDeleteAll.innerHTML = '';
    }
}
readData();


    // to let the data in the table && not deleted if we reload the page


    // to create delete all btn

   

 // Delete function() :: remove just one product

function deleteData(j){      // we need here to set parameter to delete just one product
    dataProd.splice(j,1);     // we delete just i and 1 that mean one element in this arr
    localStorage.product = JSON.stringify(dataProd)    // now we delete but should reload the page;
    readData();    // will return the new value of this function()

    // now will delete the product and will remove this value!!
}

// now Delete all data
function DeleteAll(){
    localStorage.clear();
    dataProd.splice(0);    // will delete all data in the arr fromn index 0 to the lastELement in this arr
    readData();
}

// count that mean will work on the element count in our page

// Update Data >> 2 steps
function upDate(j){
    title.value = dataProd[j].title;
    price.value = dataProd[j].price;
    tax.value = dataProd[j].tax;
    ads.value = dataProd[j].ads;
    discount.value = dataProd[j].discount;
    getTotal();     // will works now!!
    count.style.display = 'none';
    category.value = dataProd[j].category;
    btn.innerHTML = 'Updaten';
    btnMood = 'update'
    temp = j;      // this is already globalFunction
    // to move the scroll to up of screen
    scroll({
        top: 0,
        behavior: "smooth"
    })
} 
// search function we need 2 step; 1st create search mode >> title or category
let searchMode = 'title';

function searchModefn(id){       // this is fn to design the form
    if(id === 'searchTitle'){
        searchMode = 'title';
        
    }else{
        searchMode = 'category';
        
    }
    search.placeholder = 'Zoeken Op ' + searchMode;
    search.focus();
    search.value = '';
    readData();
}

function searchData(value){            // to find the data of the outputs
    let table = '';
    for(let j = 0; j < dataProd.length; j++){      // i can here but this loop in 2 if condtion but i did that cuz better for this project
    if(searchMode == 'title'){          // to search by title
       
            if(dataProd[j].title.includes(value.toLowerCase())){
                table += `                 
                <tr>
                    <td>${j}</td>
                    <td>${dataProd[j].title}</td>
                    <td>${dataProd[j].price}</td>
                    <td>${dataProd[j].tax}</td>
                    <td>${dataProd[j].ads}</td>
                    <td>${dataProd[j].discount}</td>
                    <td>${dataProd[j].total}</td>
                    <td>${dataProd[j].category}</td>
                    <td><button onclick="upDate(${j})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${j})" id="delete">Delete</button></td>
                </tr>
                `;
            }
           
    }else{                              // o search by category
        
            if(dataProd[j].category.includes(value.toLowerCase())){
                table += `                 
                <tr>
                    <td>${j}</td>
                    <td>${dataProd[j].title}</td>
                    <td>${dataProd[j].price}</td>
                    <td>${dataProd[j].tax}</td>
                    <td>${dataProd[j].ads}</td>
                    <td>${dataProd[j].discount}</td>
                    <td>${dataProd[j].total}</td>
                    <td>${dataProd[j].category}</td>
                    <td><button onclick="upDate(${j})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${j})" id="delete">Delete</button></td>
                </tr>
                `;
            }
        
    }
}
    document.getElementById('tbody').innerHTML = table;
}
// clean data ...