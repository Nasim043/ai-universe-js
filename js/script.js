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
  document.getElementById("modal-body").innerHTML = `<div class="modal-box w-[90%] max-w-5xl">
  <label for="my-modal-3"
    class="btn btn-sm btn-circle absolute right-2 top-2 bg-red-500 border-0 hover:bg-red-600">✕</label>
  <!-- details modal -->
  <div class="flex flex-col md:flex-row gap-5 my-4">
    <!-- detail left div -->
    <div class="bg-red-50 p-7 border-red-400 border-[1px] rounded-xl lg:w-1/2">
      <h1 class="text-2xl font-semibold">${description}</h1>
      ${getPricingArea(pricing)}
      <div class="flex flex-col md:flex-row justify-between gap-4">
        <div>
          ${getFeatures(features)}
        </div>
        <div>
        <h1 class="text-2xl font-semibold  mb-4">Integrations</h1>
        ${getIntegrations(integrations)}
        </div>
      </div>
    </div>
    <!-- detail right div -->
    <div class="card lg:w-1/2 border-[1px]">
      <figure class="px-7 pt-7 relative">
        <img src="${image_link[0]}" alt="AI" class="rounded-xl" />
        ${accuracy.score  ? getAccuracy(accuracy)  : ''}
      </figure>
      <div class="card-body items-center text-center">
        <h1 class="text-2xl font-semibold mb-4">${input_output_examples[0].input}</h1>
        <h1 class="">${input_output_examples[0].output}</h1>
      </div>
    </div>
  </div>
</div>`;
}

// get pricing
function getPricingArea(pricing){
  if(!pricing){
    return `<div class="flex flex-col md:flex-row justify-between my-6 gap-4 items-center">
    <div class="bg-white py-5 px-5 text-lime-600 rounded-xl font-semibold">
      <p>Free of Cost</p>
    </div>
    <div class="bg-white py-5 px-5 text-amber-600 rounded-xl font-semibold">
      <p>Free of Cost</p>
    </div>
    <div class="bg-white py-5 px-5 text-red-600 rounded-xl font-semibold">
      <p>Free of Cost</p>
    </div>
    </div>`;
  }
  let color = ['lime', 'amber', 'red'];
  let htmlContent = `<div class="grid grid-cols-1 md:grid-cols-3 justify-between my-6 gap-4 text-center items-center">`;
  pricing.forEach((price,index) => {
    htmlContent += `
    <div class="bg-white py-5 px-5 text-${color[index]}-600 rounded-xl font-semibold">
      <p>${price.price ? price.price : 'Free of Cost/'}</p>
      <p>${price.plan}</p>
    </div>`;
  })
  return htmlContent + '</div>';
}
// get features
function getFeatures(features){
  let htmlContent = `<h1 class="text-2xl font-semibold mb-4">Features</h1>
  <ul class="list-disc list-inside">`;
  for (const key in features) {
    if (Object.hasOwnProperty.call(features, key)) {
      const element = features[key];
      htmlContent += `<li>${element.feature_name}</li>`;
    }
  }
  return htmlContent + '</ul>';
}

// get integrations
function getIntegrations(integrations){
  if(!integrations){
    return '<h1>No Data found</h1>'
  }
  let htmlContent = `<ul class="list-disc list-inside">`;
    integrations.forEach(integration =>{
      htmlContent += ` <li>${integration}</li>`
    })
  return htmlContent + '</ul>';
}

// get accuracy label
function getAccuracy(accuracy){
  return `<span id="accuracy-btn" class="bg-red-500 text-white absolute top-0 right-0 mx-8 mt-8 rounded px-2 py-1">
  ${accuracy.score*100 + "% accuracy"}</span>`;
}

// show more button click event
document.getElementById('show-more-button').addEventListener('click', function(){
  loadAllTools(true);
})
