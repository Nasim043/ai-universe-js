function loadAllTools(){
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(url)
    .then(res => res.json())
    .then(data => dispalyApiTools(data.data.tools))  
}

dispalyApiTools = (tools)=>{
  console.log(tools);
  tools.forEach(tool => {
    const {image, features, name, published_in} = tool;
  });
}
