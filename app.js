let characters = []

const form = document.getElementById("char-form")
const name = document.getElementById("name")
const classInput = document.getElementById("class")
const stats = document.getElementById("stat")

const search = document.querySelector("#search")
const filterClass = document.querySelector("#filter-class")
const cards = document.querySelector("#cards-container")
const statSummary = document.querySelector("#stats-summary")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const newChar = {
        name : name.value.trim(),
        class : classInput.value,
        stat: parseInt(stats.value)
    }
    characters.push(newChar)
    form.reset()
    render()
})

function render(){
    let filtered = characters

    if (filterClass.value !== "All")
        filtered = filtered.filter(c=> c.class === filterClass.value )
    const searchText = search.value.toLowerCase()
    filtered = filtered.filter(c => c.name.toLowerCase().includes(searchText))

    cards.innerHTML = ""

    filtered.map( c =>
    {
        const card = document.createElement("div")
        card.innerHTML = `${c.name} - ${c.class} - ${c.stat}`
        card.className = c.class

        cards.appendChild(card)

        const delBtn = document.createElement("button")
        delBtn.textContent = "Delete Character"
        delBtn.addEventListener("click", (e)=> {
            e.stopPropagation()
            const index = characters.indexOf(c)
            characters.splice(index,1)
            render()
        })
        card.appendChild(delBtn)
        card.addEventListener("click", ()=>{
            let details = ""
            for (const [key, value] of Object.entries(c))
                details += (`${key} : ${value}`)
            alert(details)
        })
        }

    )
    if (filtered.length > 0){
        const total = filtered.reduce((acc,c) => acc + c.stat, 0)
        const avg = total/filtered.length
        statSummary.textContent = `Total : ${total}, Average: ${avg.toFixed(1)}`
     }else
     statSummary.textContent = ""
}

search.addEventListener("input", render)
filterClass.addEventListener("change", render)

cards.addEventListener("click", ()=>{
    for (const [key, value] of Object.entries(characters))
        alert(`${key} : ${value}`)
})
