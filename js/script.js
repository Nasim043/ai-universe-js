function loadAllTools(){
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(url)
    .then(res => res.json())
    .then(data => dispalyApiTools(data.data.tools))  
}

dispalyApiTools = (tools)=>{
  console.log(tools);
  const fetchCardTools = document.getElementById('card-tools');
  tools.forEach(tool => {
    const {image, features, name, published_in} = tool;
    fetchCardTools.innerHTML += `<div class="card w-[90%] lg:w-full bg-base-100 shadow-xl border-2 mx-auto p-6">
    <figure>
      <img src="${image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body px-0">
      <h2 class="card-title text-2xl">Features</h2>
      ${getAllFeatures(features)}
      <hr class="border-[1px] mt-5">
      <h2 class="card-title text-2xl mt-5 mb-4">${name}</h2>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <i class="fa-regular fa-calendar-days"></i>
          <h2>${published_in}</h2>
        </div>
        <div class="bg-red-50 p-3 rounded-full">
          <i class="fa-solid fa-arrow-right text-red-400"></i>
        </div>
      </div>
    </div>
  </div>`;

  });
}

function getAllFeatures(features){
  let featureOlList = '<ol class="list-decimal list-inside">';
  features.forEach(feature=>{
    featureOlList += `<li>${feature}</li>`;
  })
  return featureOlList + '</ol>';
}
