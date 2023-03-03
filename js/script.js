function loadAllTools(isShowAll){
  document.getElementById('spinner').classList.remove('hidden');
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(url)
    .then(res => res.json())
    .then(data => dispalyApiTools(data.data.tools, isShowAll))  
}

dispalyApiTools = (tools, isShowAll = false)=>{
  const fetchCardTools = document.getElementById('card-tools');

  // slice first 6 tools
  if(!isShowAll && tools.length > 6){
    tools = tools.slice(0,6);
    document.getElementById('show-more-button').classList.remove('hidden');
  }else{
    document.getElementById('show-more-button').classList.add('hidden');
  }

  fetchCardTools.innerHTML = '';
  tools.forEach(tool => {
    const {id, image, features, name, published_in} = tool;
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
        <div class="p-3 rounded-full">
        <label for="my-modal-3" class="btn bg-red-50 border-0 hover:bg-red-200" onclick="fetchAIDetails('${id}')"><i
        class="fa-solid fa-arrow-right text-red-400"></i></label>
        </div>
      </div>
    </div>
  </div>`;
  });
  document.getElementById('spinner').classList.add('hidden');
}

function getAllFeatures(features){
  let featureOlList = '<ol class="list-decimal list-inside">';
  features.forEach(feature=>{
    featureOlList += `<li>${feature}</li>`;
  })
  return featureOlList + '</ol>';
}

function fetchAIDetails(id){
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showAIDetails(data.data))
}

function showAIDetails(SingleAI){
  const {description, pricing, features, integrations, image_link, input_output_examples, accuracy} = SingleAI;
  document.getElementById("modal-body").innerHtml = ``;
}

// show more button click event
document.getElementById('show-more-button').addEventListener('click', function(){
  loadAllTools(true);
})
