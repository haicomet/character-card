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
