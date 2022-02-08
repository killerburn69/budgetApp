const category_lists = [
    {
        id:1,
        name:"Salary",
        img:"./img/salary.png",
        title:'choose'
    },
    {
        id:2,
        name:"Gift",
        img:"./img/gift.png",
        title:'choose'
    },
    {
        id:3,
        name:"Friend",
        img:"./img/friend.png",
        title:'choose'
    },
    {
        id:4,
        name:"Shopping",
        img:"./img/shopping.png",
        title:'choose'
    },
    {
        id:5,
        name:"Cooking",
        img:"./img/cooking.png",
        title:'choose'
    },
    {
        id:6,
        name:"Invoice",
        img:"./img/invoice.png",
        title:'choose'
    },
    {
        id:7,
        name:"Other",
        img:"./img/other.png",
        title:'otherType'
    },
    
]
const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Frid", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const d = new Date()
const objectHandle = {}
const typeSlide = document.querySelector('.type-slide')
const btnPrev = document.querySelector('.type-prev')
const btnNext = document.querySelector('.type-next')
const cancelOther = document.querySelector('.other-btn-cancel')
const createOther = document.querySelector('.other-btn-new')
const cancelChoose = document.querySelector('.choose-btn-cancel')
const createChoose = document.querySelector('.choose-btn-new')
const incomeList = document.querySelector('.list-income')
const costList = document.querySelector('.list-cost')
const startTotal = document.querySelector('.start-total')
const boxModel = document.querySelector('.list-income-box')
const boxList = document.querySelector('.income-box-list')
const boxListCost = document.querySelector('.cost-box-list')
const boxMoney = document.querySelector('.box-money')
const boxHeadingMoney = document.querySelector('.box-heading')
const cancelBox = document.querySelector('.box-close')
const incomeItem = document.querySelectorAll('.income-item')
const costItem = document.querySelectorAll('.cost-item')
const nextPagination = document.querySelector('#pagination-next')
const prevPagination = document.querySelector('#pagination-prev')
const boxBorderItem = document.querySelector('.income-box')
let current = 0;
let id = 0
let totalPrice = 0
let translate = 0
if(!localStorage.getItem('category-list')){
    localStorage.setItem("category-list", JSON.stringify(category_lists))
}
if(localStorage.getItem('entryList')===null){
    localStorage.setItem("entryList",'[]')
}
if(localStorage.getItem('incomeLists')===null){
    localStorage.setItem("incomeLists",'[]')
}
if(localStorage.getItem('costLists')===null){
    localStorage.setItem("costLists",'[]')
}
if(!localStorage.getItem('total_Price')){
    localStorage.setItem("total_Price", JSON.stringify(totalPrice))
}
var entry_List = JSON.parse(localStorage.getItem("entryList"))
var categoryList = JSON.parse(localStorage.getItem("category-list"))
var income_Lists = JSON.parse(localStorage.getItem("incomeLists"))
var cost_Lists = JSON.parse(localStorage.getItem("costLists"))
var totalprice = JSON.parse(localStorage.getItem('total_Price')) 

//show slide
function showSlide(){
    let html = categoryList.map((item,index)=>{
            return`
            <div class="img ${item.title}">
                <div class="type-img">
                    <img src="${item.img}" alt="" class="img-type">
                </div>
                <h2 style="text-align: center; margin-top: 10px;">${item.name}</h2>
            </div>
            `
    })
    typeSlide.innerHTML=html.join('')
    // const categoryListDom = document.querySelectorAll('.img')
    // categoryListDom.forEach((item, index)=>{
    //     // if(current <= index && index <current+5){
    //     //     // item.classList.remove('hide')
    //     //     console.log(translate)
    //     // }
    //     // else{
    //     //     // item.classList.add('hide')
    //     //     console.log(translate)
    //     // }
    //     // // translate = translate - 240
    //     // // console.log(`translate(${translate}px)`)
    //     item.style.transform = `translateX(${translate}px)`
    // })
    typeSlide.style.transform = `translateX(${translate}px)`
}

//di chuyen slide
function transformSlide(){
    if(current > categoryList.length - 5){
        current = categoryList.length - 5
        translate=current*-120
    }
    if(current < 0){
        current = 0
        translate = 0
    }
    if(current === 0){
        btnPrev.classList.add('disableBtn')
        btnNext.classList.remove('disableBtn')
    }
    else if(current === categoryList.length-5){
        btnPrev.classList.remove('disableBtn')
        btnNext.classList.add('disableBtn')
    }
    else{
        btnPrev.classList.remove('disableBtn')
        btnNext.classList.remove('disableBtn')
    }
    showSlide()
}
//next Slide
btnNext.addEventListener('click', function(){
    current++;
    console.log(current)
    translate = translate - 120
    transformSlide()
    const otherType = document.querySelector('.otherType')
    console.log(otherType)
    //open form other
    toggleChooseForm()
    otherType.addEventListener('click', function(){
        document.querySelector('#add-other').style.display = 'block'
    })
})
//prev Slide
btnPrev.addEventListener('click', function(){
    current--;
    console.log(current)
    translate = translate + 120
    transformSlide()   
    toggleChooseForm()
})
//cancel other model
cancelOther.addEventListener('click', function(){
        document.querySelector('#add-other').style.display = 'none'
        document.querySelector('.other-input').value = ""

})
//cancel choose model
cancelChoose.addEventListener('click', function(){
    document.querySelector('#add-choose').style.display = 'none'
    document.querySelector('.many-input').value = ""
    document.querySelector('.title-input').value = ""
    document.querySelector('.desc-input').value =""
    document.querySelector('.income-radio').checked = true
})
//cancel box
cancelBox.addEventListener('click', function(){
    boxModel.style.display='none'
})
//submit other
function submitOther(){
    const inputOther = document.querySelector('.other-input').value
    let checkList
    let nameItemList
    categoryList.map(item=>{
        if(inputOther == item.name){
            checkList = true
            nameItemList = item.name
        }
    })
    console.log(checkList);
    if(inputOther === ""){
        alert("Yêu cầu nhập nội dung")
    }
    else if(checkList === true){
        alert(`Đã có item ${nameItemList}. Mời nhập lại`)
    }
    else{
        let objectOther = {
            id:categoryList.length + 1,
            name:inputOther,
            img:'./img/8dd7542aea0827567e19.jpg',
            title:"choose"
        }
        console.log(objectOther)
        categoryList.splice(categoryList.length-1,0,objectOther)
        showSlide()
        transformSlide()
        toggleChooseForm()
        localStorage.setItem("category-list", JSON.stringify(categoryList))
        document.querySelector('#add-other').style.display = 'none'
        document.querySelector('.other-input').value = ""
    }
}
//toggle vào cái type form
function toggleChooseForm(){
    const chooseList = document.querySelectorAll('.choose')
    const imageList = document.querySelectorAll('.img-type')
    const headingList = document.querySelectorAll('.img h2')
    console.log(chooseList)
    // console.log(imageList[0].attributes.src.value)
    chooseList.forEach((item, index)=>{
        item.addEventListener('click', function(){
            document.querySelector('#add-choose').style.display='block'
            objectHandle.image = imageList[index].attributes.src.value
            objectHandle.text = headingList[index].textContent
            document.querySelector('.choose-heading span').innerHTML = headingList[index].textContent
        })
    })
}
//list income
function showIncome(){
    let htmlIncome = income_Lists.map((items, index)=>{
        return `
            <div class="income-click">
                <div class="income-item ${items.activeId}">
                    <img src=${items.img} alt="" class="income-img">
                    <div class="income-text">
                        <h2><span class="income-span-heading">${items.headingText}</span> income</h2>
                        <span class="income-span-money">$${items.value}</span>
                        <p>Create at: ${items.time}</p>
                    </div>
                </div>
                <i class="fas fa-trash-alt trash" onclick = "removeIncome(${items.idItems})" ></i>
            </div>
        `
    })
    incomeList.innerHTML = htmlIncome.join('')
    const incomeItem = document.querySelectorAll('.income-item')
    const boxMoneyListHeading = document.querySelectorAll('.income-text .income-span-money')
    const boxListHeading = document.querySelectorAll('.income-text h2')
    console.log(boxMoneyListHeading)
    incomeItem.forEach((items, index)=>{
        items.addEventListener('click', function(){
            boxModel.style.display = 'block'
            boxBorderItem.classList.remove('costBox')
            showPagination(items.className)
            showMoneyBox(boxMoneyListHeading[index].textContent, boxListHeading[index].textContent)
            
        })
    })
}
//list cost
function showCost(){
    let htmlCost = cost_Lists.map((items, index)=>{
        return `
            <div class="cost-click">
                <div class="cost-item ${items.activeId}">
                    <img src=${items.img} alt="" class="cost-img">
                    <div class="cost-text">
                        <h2><span class="cost-span-heading">${items.headingText}</span> cost</h2>
                        <span class="cost-span-money">-$${items.value}</span>
                        <p>Create at: ${items.time}</p>
                    </div>
                </div>
                <i class="fas fa-trash-alt trash" onclick="removeCost(${items.idItems})"></i>
            </div>
        `
    })
    costList.innerHTML = htmlCost.join('')
    const costItem = document.querySelectorAll('.cost-item')
    const boxMoneyListHeading = document.querySelectorAll('.cost-text .cost-span-money')
    const boxListHeading = document.querySelectorAll('.cost-text h2')
    costItem.forEach((items, index)=>{
        items.addEventListener('click', function(){
            boxModel.style.display = 'block'
            boxBorderItem.classList.add('costBox')
            showPagination(items.className)
            showMoneyBox(boxMoneyListHeading[index].textContent, boxListHeading[index].textContent)
        })
    })
}
//show list pagination
function showPagination(name){ 
    let perPage = 3
    let currentPage = 1
    let start = 0
    let end = perPage
    let htmlPagination = entry_List.map((items, index)=>{
        if(name.includes(`${items.typeChoose}`)){
            if(name.includes(`${items.activeId}`)){
                return `
                <div class="box-item">
                        <img src="./img/calendar.png" alt="">
                        <div class="box-text">
                            <h2>${items.titleChoose}: $${items.value}</h2>
                            <span>${items.desc}</span>
                            <p>Create at: ${items.time}</p>
                        </div>
                </div>
                `
            }
        }
    })
    boxList.innerHTML = htmlPagination.join('')
    const paginationItemList = document.querySelectorAll('.box-item')
    console.log(paginationItemList)
    const totalPages = Math.ceil(paginationItemList.length / perPage)
    paginationItemList.forEach((item, index)=>{
        if(index >= start && index<end){
            item.classList.remove('hideBox')
        }
        else{
            item.classList.add('hideBox')
        }
    })
    nextPagination.addEventListener('click',function(){
        currentPage++
        if(currentPage>totalPages){
            currentPage=totalPages
        }
        console.log(start, end)
        start = (currentPage-1)*perPage
        end = currentPage*perPage
        paginationItemList.forEach((item, index)=>{
            if(index >= start && index<end){
                item.classList.remove('hideBox')
            }
            else{
                item.classList.add('hideBox')
            }
        })
    })
    prevPagination.addEventListener('click',function(){
        currentPage--
        if(currentPage<=1){
            currentPage=1
        }
        console.log(start, end)
        start = (currentPage-1)*perPage
        end = currentPage*perPage
        paginationItemList.forEach((item, index)=>{
            if(index >= start && index<end){
                item.classList.remove('hideBox')
            }
            else{
                item.classList.add('hideBox')
            }
        })
    })
}
//hiển thị tiền
function showMoney(money){
    startTotal.innerHTML = `$ ${money}`
}
function showMoneyBox(money, title){
    boxMoney.innerHTML = `${money}`
    boxHeadingMoney.innerHTML = `${title}`
}
//gộp id chung trong 
function getUnique(arr, comp) {

    // store the comparison  values in array
    arr =  arr.map(e => e[comp])

  // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

  // eliminate the false indexes & return unique objects
    .filter((e) => arr[e]).map(e => arr[e]);

    return arr;
}
//hiển thị list
function submitChoose(){
    const manyInput = document.querySelector('.many-input').value
    const titleInput = document.querySelector('.title-input').value
    const descInput = document.querySelector('.desc-input').value
    const radioChecked = document.querySelector('input[type="radio"]:checked').value
    const image = objectHandle.image
    const headingText = objectHandle.text 
    let activeid
    if(radioChecked === 'income'){
        categoryList.map(id=>{
            if(id.name === headingText){
                activeid = id.id
            }
        })
    }
    else{
        categoryList.map(id=>{
            if(id.name === headingText){
                activeid = parseInt(id.id) + 0.1
            }
        })
    }
    let times = days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear()
    if(manyInput==="" || titleInput===""||descInput===""){
        alert("Hay nhap tat ca ca truong")
    }
    else{

        let entryObject = {
            idItems:id+1,
            activeId:activeid/*Math.floor(Math.random()*categoryList.length)*/,
            value:manyInput,
            titleChoose:titleInput,
            desc:descInput,
            typeChoose:radioChecked,
            img:image,
            headingText:headingText,
            time:times
        }
        let itemObject = {
            idItems:id+1,
            activeId:activeid,
            value:0,
            img:image,
            headingText:headingText,
            time:times
        }
        entry_List.push(entryObject)
        localStorage.setItem("entryList", JSON.stringify(entry_List))
        if(radioChecked === 'income'){
            income_Lists.push(itemObject)
            income_Lists = getUnique(income_Lists,"activeId")
            income_Lists.map((item, index)=>{
                if(item.activeId == activeid ){
                    item.value = parseInt(manyInput) + parseInt(item.value)
                }
            })
            totalprice = totalprice + parseInt(manyInput)
            localStorage.setItem("total_Price", JSON.stringify(totalprice))
            localStorage.setItem('incomeLists', JSON.stringify(income_Lists))
            showIncome()
            showMoney(totalprice)
        }
        else{
            cost_Lists.push(itemObject)
            cost_Lists = getUnique(cost_Lists,"activeId")
            cost_Lists.map((item, index)=>{
                if(item.activeId == activeid ){
                    item.value = parseInt(manyInput) + parseInt(item.value)
                }
            })
            totalprice = totalprice - parseInt(manyInput)
            localStorage.setItem("total_Price", JSON.stringify(totalprice))
            localStorage.setItem('costLists', JSON.stringify(cost_Lists))
            showCost()
            showMoney(totalprice)
        }
        id=id+1
        console.log(itemObject)
        document.querySelector('#add-choose').style.display='none'
        document.querySelector('.many-input').value = ""
        document.querySelector('.title-input').value = ""
        document.querySelector('.desc-input').value =""
        document.querySelector('.income-radio').checked = true
    }
}
//render lai sau khi load trang
if(localStorage.getItem('incomeLists') !== null){
    showIncome()
}
if(localStorage.getItem('costLists') !== null){
    showCost()
}
function arrayRemoveEntry(arr, value) {
    return arr.filter(function(ele){
        return ele.activeId != value;
    });
}
//xóa income items
function removeIncome(id){
    console.log(id)
    let index = income_Lists.findIndex(item=>item.idItems === id)
    console.log(index)
    totalprice = totalprice - parseInt(income_Lists[index].value)
    entry_List = arrayRemoveEntry(entry_List,income_Lists[index].activeId)
    income_Lists.splice(index,1)
    localStorage.setItem('incomeLists', JSON.stringify(income_Lists))
    localStorage.setItem("total_Price", JSON.stringify(totalprice))
    localStorage.setItem("entryList", JSON.stringify(entry_List))
    showIncome()
    showMoney(totalprice)

}
//xóa cost items
function removeCost(id){
    console.log(id)
    let index = cost_Lists.findIndex(item=>item.idItems === id)
    totalprice = totalprice + parseInt(cost_Lists[index].value)
    entry_List = arrayRemoveEntry(entry_List,cost_Lists[index].activeId)
    cost_Lists.splice(index,1)
    localStorage.setItem('costLists', JSON.stringify(cost_Lists))
    localStorage.setItem("entryList", JSON.stringify(entry_List))
    localStorage.setItem("total_Price", JSON.stringify(totalprice))
    showCost()
    showMoney(totalprice)
}

showSlide()
transformSlide()
toggleChooseForm()
showMoney(totalprice)

