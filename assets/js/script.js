let account = document.querySelector("#account")
let dropdown = document.querySelector("#dropdown")

account.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.remove("hidden")
    dropdown.classList.add("flex")

})
document.addEventListener("click", async () =>  {
    if(dropdown.classList[dropdown.classList.length - 1] == "flex"){
        dropdown.classList.remove("flex")
        dropdown.classList.add("hidden")
    }
})