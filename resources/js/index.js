magazines.map((element, index) => {
    let url = "https://api.rss2json.com/v1/api.json?rss_url="+element;
   //  console.log(url);
    fetchData(url, index);
    
});

function insertAccordian(data, number) {
   const accordianParent = document.getElementById('accordionFlushExample');
   // while(size>=0){
       const title = data.feed.title;

       // console.log(title);
       const div = document.createElement('div');
       const accordianBodyId = "accordianBody"+number
       div.classList.add("accordion-item");
       div.innerHTML = `
           <h2 class="accordion-header" id="flush-heading${number}">
               <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${number}" aria-expanded="false" aria-controls="flush-collapse${number}">
                   ${title}
               </button>
           </h2>
           
               <div id="flush-collapse${number}" class="accordion-collapse collapse ${number==0?"show":"none"}" aria-labelledby="flush-heading${number}" data-bs-parent="#accordionFlushExample">
                   <div class="accordion-body" id="${accordianBodyId}">
                           <div id="carouselExampleControls${number}" class="carousel slide" data-bs-ride="carousel">
                               <div class="carousel-inner" id="carouselInner${number}">
                               </div>

                               
                               <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${number}" data-bs-slide="prev">
                                   <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                   <span class="visually-hidden">Previous</span>
                               </button>
                               
                               
                               <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${number}" data-bs-slide="next">
                                   <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                   <span class="visually-hidden">Next</span>
                               </button>
                               
                           </div>
                   </div>
               </div>
           
       `

       accordianParent.append(div);
       insertItemsInCarousel("carouselInner"+number, data.items)
      
}


function insertItemsInCarousel(id, items) {
   console.log(items);
   console.log("insertItemsInCarousel ", document.getElementById(id));
   items.forEach((item, index) => {
       const div = document.createElement('div');
       if(index==0){
           div.classList.add("carousel-item","active");
           div.setAttribute("id","itemId"+index)
       }
       else{
           div.classList.add("carousel-item");
           div.setAttribute("id","itemId"+index)
       }

       const imageUrl = item.enclosure.link;
       const title = item.title;
       const author = item.author;
       const pubDate = item.pubDate;
       const description = item.description;
       const link = item.link;

       div.innerHTML = `
           <a href="${link}" target="_blank" class="container card mb-3">
               <img src="${imageUrl}" class="card-img-top" alt="...">
               <div class="card-body">
                   <h5 class="card-title todayTitle">${title}</h5>
                   <p class="card-text"><small class="text-muted">${author} . ${pubDate}</small></p>
                   <p class="card-text description">${description}</p>
                   
               </div>
           </a>
       `

       document.getElementById(id).append(div);
       // insertCard("itemId"+index, item)
   })
}

function insertCard(id, item) {
   const div = document.createElement('div');
   const imageUrl = item.enclosure.link;
   const title = item.title;
   const author = item.author;
   const pubDate = item.pubDate;
   const description = item.description;
   div.classList.add("card", "mb-3");

   div.innerHTML = `
   <img src="${imageUrl}" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">${title}</h5>
     <p class="card-text"><small class="text-muted">${author} . ${pubDate}</small></p>
     <p class="card-text">${description}</p>
   </div>
   `
   document.getElementById(id).append(div);
}

async function fetchData(url, index) {
  const data =  await fetch(url);
  const jsonData = await data.json();
   // console.log(await jsonData);
   // console.log(index);
   insertAccordian(await jsonData, index);
   
}
// insertAccordian(magazines.length);