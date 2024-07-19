
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
const decrease = document.querySelector("#decrease");
const increase = document.querySelector("#increase");
const countElement = document.querySelector("#count");
const like = document.querySelector("#like");

class Counter {
  constructor(config) {
    this.config = config;
    this.count = 0;
    this.updateCount();
    this.addEventListeners();
  }

  updateCount() {
    countElement.textContent = this.count;
  }

  addEventListeners() {
    decrease.addEventListener("click", (e) => {
      if (this.count > 0) {
        this.count--;
        this.updateCount();
      }
    });

    increase.addEventListener("click", (e) => {
      this.count++;
      this.updateCount();
    });

    like.addEventListener("click", (e) => {
      if (like.classList.contains("fa-regular")) {
        like.classList.remove("fa-regular");
        like.classList.add("fa-solid");
      }else{
        like.classList.add("fa-regular");
        like.classList.remove("fa-solid");
      }
      
    });
  }
}

const counter = new Counter();
