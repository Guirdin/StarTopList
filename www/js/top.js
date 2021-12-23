const divtop = `
<div class="col-12 col-md-4">
    <a href="__link__" target="_blank">
    <div class="card">
    <img src="__src__" class="card-img-top" />
    <div class="card-body">
        <h5 class="card-title">__top__. __title__</h5>
        <p class="card-text">
            __description__
        </p>
    </div>
    </div>
    </a>
</div>
`;

const btnTopList = `
<button id="__id__" class="button-64" role="button" onclick="topList(this.id);"><span class="text">__titre__</span></button>
`;

const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const fetchApiDone = (json) => {
  const divList = document.getElementById("list");
  json.forEach((top, i) => {
    const newDivtop = divtop
      .replace("__link__", top.link)
      .replace("__src__", top.img)
      .replace("__top__", i + 1)
      .replace("__title__", top.name)
      .replace("__description__", top.description);
    divList.appendChild(htmlToElement(newDivtop));
  });
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("api/tops.json").then((response) =>
    response.json().then(fetchApiDone)
  );
});

const storage = JSON.parse(localStorage.getItem("starstorage"));
const titreList = document.getElementById("titre");

if (storage != null){

  const homePage = document.getElementById("homePage");
  console.log("🚀 ~ file: top.js ~ line 58 ~ storage", storage)

  for (let i = 0; i < storage.length; i++) {
    const newBtnTop = btnTopList
      .replace("__id__", i)
      .replace("__titre__", storage[i].nomList)
      homePage.appendChild(htmlToElement(newBtnTop));
  }

}

function topList(btnId) 
{
  removeClassList(homePage,"hidden");
  removeClassList(topPage,"hidden");
  removeClassList(topPageStorage,"hidden");
  removeClassList(addTopPage,"hidden");
  removeClassList(addPage,"hidden");
  homePage.classList.add("hidden");
  addTopPage.classList.add("hidden");
  addPage.classList.add("hidden");
  topPageStorage.classList.add("hidden");

  if (storage != null){
    for (let i = 0; i < storage.length; i++) {
      if (i == btnId)
      {
        removeClassList(homePage,"hidden");
        removeClassList(topPage,"hidden");
        removeClassList(topPageStorage,"hidden");
        removeClassList(addTopPage,"hidden");
        removeClassList(addPage,"hidden");
        homePage.classList.add("hidden");
        addTopPage.classList.add("hidden");
        addPage.classList.add("hidden");
        topPage.classList.add("hidden");

        titreList.textContent = storage[i].nomList;
        const divListStorage = document.getElementById("listStorage");
        const storageTop = storage[i].top;
        for (let i = 0; i < storageTop.length; i++) {
        const newDivtop = divtop
          .replace("__top__", i + 1)
          .replace("__title__", storageTop[i].nom)
          .replace("__description__", storageTop[i].desc);
          divListStorage.appendChild(htmlToElement(newDivtop));
        }

      }
    }
  }
}



const homePage = document.getElementById("homePage");
const topPage = document.getElementById("topPage");
const topPageStorage = document.getElementById("topPageStorage");
const addTopPage = document.getElementById("addTopPage");
const addPage = document.getElementById("addPage");

function add() 
{
  if (topPageStorage.classList.contains("hidden")){
    removeClassList(homePage,"hidden");
    removeClassList(addTopPage,"hidden");
    removeClassList(addPage,"hidden");
    removeClassList(topPage,"hidden");
    removeClassList(topPageStorage,"hidden");
    homePage.classList.add("hidden");
    addPage.classList.add("hidden");
    topPage.classList.add("hidden");
    topPageStorage.classList.add("hidden");
  } else {
    removeClassList(homePage,"hidden");
    removeClassList(addTopPage,"hidden");
    removeClassList(addPage,"hidden");
    removeClassList(topPage,"hidden");
    removeClassList(topPageStorage,"hidden");
    homePage.classList.add("hidden");
    addTopPage.classList.add("hidden");
    topPage.classList.add("hidden");
    topPageStorage.classList.add("hidden");

    
  }
}

function home() 
{
  if (addPage.classList.contains("hidden")){
    removeClassList(homePage,"hidden");
    removeClassList(topPage,"hidden");
    removeClassList(addTopPage,"hidden");
    removeClassList(addPage,"hidden");
    topPage.classList.add("hidden");
    addTopPage.classList.add("hidden");
    addPage.classList.add("hidden");
  } else {
    removeClassList(homePage,"hidden");
    removeClassList(topPage,"hidden");
    removeClassList(addTopPage,"hidden");
    removeClassList(addPage,"hidden");
    homePage.classList.add("hidden");
    addTopPage.classList.add("hidden");
    addPage.classList.add("hidden");
  }
}

function pushTopList() {

  let nomList = document.getElementById("nomList").value;
  console.log("🚀 ~ file: storage.js ~ line 29 ~ storage ~ storage", storage)
  // console.log("🚀 ~ file: storage.js ~ line 30 ~ storage ~ storage", storage.List.nomList)

  if (storage == null) {
    let data = 
    [
      {
        nomList,
        top:[]
      }
    ];
    localStorage.setItem('starstorage', JSON.stringify(data));
  } else if (nomList != null) {
    storage.push( 
      {
        nomList,
        top: []
      }
    );
    localStorage.setItem('starstorage', JSON.stringify(storage));
  }
  
  navigator.notification.alert(
    nomList + ' à était créé avec succès',  // message
    reload,
    'Création top list',            // title
    'ok'                  // buttonName
  )
  
}

function reload() {
  document.getElementById("nomList").value = '';
  document.getElementById("nom").value = '';
  document.getElementById("desc").value = '';
  location.reload();
}

function pushTop() {

  for (let i = 0; i < storage.length; i++) {
    if (storage[i].nomList == titreList.textContent)
    {
     
      console.log("🚀 ~ file: top.js ~ line 196 ~ pushTop ~ storage[i]", storage[i])
      let nom = document.getElementById("nom").value;
      let desc = document.getElementById("desc").value;
      storage[i].top.push( 
      {
        nom,
        desc
        }
      );
      
      localStorage.setItem('starstorage', JSON.stringify(storage));

      navigator.notification.alert(
        nom + ' à était ajouté avec succès',  // message
        reload,
        'Création top',            // title
        'ok'                  // buttonName
      )

    }
  }
}

function removeClassList(Element, Class){
  for (var i = 0; i < Element.classList.length; i++) {
    if (Element.classList[i] == Class)
    {
      Element.classList.remove(Class);
    }
  }
}