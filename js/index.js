document.addEventListener('DOMContentLoaded',() => {
   const form=document.getElementById('github-form');
   console.log(form);
   form.addEventListener('submit',(e)=>{
      e.preventDefault()
     const findName=document.getElementById('search')
      console.log(findName.value)

      fetch(`https://api.github.com/search/users?q=${findName.value}`,configurationObject)
      .then (response => response.json())
      .then(data => {
        const userDetails =data.items
        console.log(userDetails)
        for(details of userDetails){
           const searchList=document.createElement('li')
           searchList.textContent=` userName: ${details.login}, avatar_url: ${details.avatar_url}, profile_link: ${details.html_url}`
           const l=document.querySelector('#user-list')
           const h3=document.createElement('h3')
            h3.textContent = `SEARCH RESULT`;
           l.appendChild(h3)
           l.appendChild(searchList)

           searchList.addEventListener('click',() => {
            fetch(`https://api.github.com/users/${details.login}/repos`,configurationObject)
            .then(response => response.json())
            .then(repo => {
            //  const l2=document.querySelector('#repos-list')
            //  const h4=document.createElement('h4')
            //   h4.textContent = `SEARCH RESULT`;
            //   l2.appendChild(h4)
            //   l2.appendChild(repo)
              console.log(repo)
            })

           })
          
        }
     
      })
   })
})

configurationObject = {
    method:'GET',
    headers: {
        "Content-Type":"application/json",
        Accept: "application/vnd.github.v3+json"
    },
}