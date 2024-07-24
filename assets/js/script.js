const account = document.querySelector("#account");
const dropdown = document.querySelector("#dropdown");

if (account && dropdown) {
  account.addEventListener("click", (e) => {
    e.stopPropagation(); // Click event propagation'ını durdurur

    // Dropdown menüyü aç/kapat
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
      dropdown.classList.add("flex");
    } else {
      dropdown.classList.remove("flex");
      dropdown.classList.add("hidden");
    }
  });

  document.addEventListener("click", () => {
    // Dropdown menüyü kapat
    if (dropdown.classList.contains("flex")) {
      dropdown.classList.remove("flex");
      dropdown.classList.add("hidden");
    }
  });
}


// Details
const decrease = document.querySelector("#decrease");
const increase = document.querySelector("#increase");
const countElement = document.querySelector("#count");
const like = document.querySelector("#like");

// Cart
const applyCouponButton = document.getElementById('apply-coupon');
const couponCodeInput = document.getElementById('coupon-code');
const shippingElement = document.getElementById('shipping');
const cartItems = document.querySelectorAll('.countDivCart');

class Counter {
  constructor(config) {
    this.config = config || {}; // config parametresi opsiyonel
    this.count = 1;

    // Elementleri tanımla
    this.countElement = document.querySelector(config.countElementSelector || '#count');
    this.decreaseButton = document.querySelector(config.decreaseSelector || '#decrease');
    this.increaseButton = document.querySelector(config.increaseSelector || '#increase');
    this.likeButton = document.querySelector(config.likeSelector || '#like');
    this.subtotalElement = document.getElementById('subtotal'); // Subtotal öğesi
    this.totalElement = document.getElementById('total');       // Total öğesi
    this.shippingElement = document.getElementById('shipping'); // Shipping öğesi
    this.couponCodeInput = document.getElementById('coupon-code'); // Coupon input
    this.applyCouponButton = document.getElementById('apply-coupon'); // Apply coupon button

    this.updateCount();
    this.addEventListeners();
    this.updateTotals();
  }


  updateCount() {
    if (this.countElement) {
      this.countElement.textContent = this.count;
    }
  }

  addEventListeners() {
    if (this.decreaseButton) {
      this.decreaseButton.addEventListener("click", () => {
        if (this.count > 1) {
          this.count--;
          this.updateCount();
        }
      });
    }

    if (this.increaseButton) {
      this.increaseButton.addEventListener("click", () => {
        this.count++;
        this.updateCount();
      });
    }

    if (this.likeButton) {
      this.likeButton.addEventListener("click", () => {
        if (this.likeButton.classList.contains("fa-regular")) {
          this.likeButton.classList.remove("fa-regular");
          this.likeButton.classList.add("fa-solid");
        } else {
          this.likeButton.classList.add("fa-regular");
          this.likeButton.classList.remove("fa-solid");
        }
      });
    }

    if (this.applyCouponButton) {
      this.applyCouponButton.addEventListener('click', () => {
        const couponCode = this.couponCodeInput.value.trim().toUpperCase();

        if (couponCode === 'BURADA') {
          this.shippingElement.textContent = 'Free';
        } else {
          this.shippingElement.textContent = '$25';
        }
        this.updateTotals(); // Kupon tətbiq etdikdən sonra cəmi yeniləyin
      });
    }


    // Eğer cartItems'i bulmak istiyorsanız, aşağıdaki satırı ekleyin:
    const cartItems = document.querySelectorAll('.countDivCart');

    cartItems.forEach(item => {
      const countElement = item.querySelector('.countElementCart');
      const increaseButton = item.querySelector('.cartIncrease');
      const decreaseButton = item.querySelector('.cartDecrease');

      increaseButton.addEventListener('click', () => {
        let count = parseInt(countElement.textContent, 10);
        if (isNaN(count)) count = 0; // `count`-un etibarlı nömrə olduğundan əmin olun
        count++;
        countElement.textContent = count;
        this.updateSubtotal(item, count);
      });

      decreaseButton.addEventListener('click', () => {
        let count = parseInt(countElement.textContent, 10);
        if (isNaN(count)) count = 0; // `count`-un etibarlı nömrə olduğundan əmin olun
        if (count > 1) {
          count--;
          countElement.textContent = count;
          this.updateSubtotal(item, count);
        }
      });
    });
  }

  
  updateSubtotal(item, count) {
    const priceElement = item.closest('.grid').querySelector('.prices');
    const subtotalElement = item.closest('.grid').querySelector('.subtotal');

    if (!priceElement || !subtotalElement) {
      console.error('Price or subtotal element not found.');
      return;
    }

    const price = parseFloat(priceElement.textContent.replace('$', '').trim());
    const subtotal = price * count;
    subtotalElement.textContent = '$' + subtotal.toFixed(2);
    this.updateTotals(); // Ara cəmi dəyişdikdən sonra cəmləri yeniləyin
  }

  updateTotals() {
    // Ara cəmi(Subtotal) yeniləyin
    const subtotalElements = document.querySelectorAll('.subtotal');
    let subtotalTotal = 0;
    subtotalElements.forEach(subtotal => {
      const value = parseFloat(subtotal.textContent.replace('$', '').trim());
      if (!isNaN(value)) subtotalTotal += value;
    });

    if (this.subtotalElement) {
      this.subtotalElement.textContent = '$' + subtotalTotal.toFixed(2);
    } else {
      console.error('Subtotal element not found.');
    }

    // Cəmi(Total) yeniləyin
    const shippingText = this.shippingElement ? this.shippingElement.textContent.trim() : '0';
    const shipping = shippingText === 'Free' ? 0 : parseFloat(shippingText.replace('$', '').trim());

    const total = subtotalTotal + shipping;

    if (this.totalElement) {
      this.totalElement.textContent = '$' + total.toFixed(2);
    } else {
      console.error('Total element not found.');
    }
  }
}

// Örnek kullanımı
const counter = new Counter({
  countElementSelector: '#count',
  decreaseSelector: '#decrease',
  increaseSelector: '#increase',
  likeSelector: '#like'
});




// Slider 

const sliderConfig = {
  slideWidth: 892, // Slide width in pixels
  autoSlideInterval: 4000, // Auto slide interval in milliseconds
  slides: [
    {
      imgSrc: "./assets/img/apple.svg",
      series: "iPhone 14 Seriyası",
      discount: "10%-ə qədər Endirim",
      buttonText: "İndi Al",
      buttonLink: "#",
      mainImgSrc: "./assets/img/phone.png",
    },
    {
      imgSrc: "./assets/img/apple.svg",
      series: "iPhone 13 Seriyası",
      discount: "15%-ə qədər Endirim",
      buttonText: "İndi Al",
      buttonLink: "#",
      mainImgSrc: "./assets/img/phone.png",
    },
    {
      imgSrc: "./assets/img/apple.svg",
      series: "iPhone 15 Seriyası",
      discount: "20%-ə qədər Endirim",
      buttonText: "İndi Al",
      buttonLink: "#",
      mainImgSrc: "./assets/img/phone.png",
    },
    // Yeni slaytlar ekleyebilirsiniz
  ]
};

let currentIndex = 0;
const sliderAdvert = document.querySelector('#sliderAdvert');
const dots = document.querySelectorAll('.dot');
let slideInterval;
if (sliderAdvert === null) {
  console.error('sliderAdvert öğesi bulunamadı.');
}


// Slaytları oluştur
document.addEventListener('DOMContentLoaded', () => {
  const sliderAdvert = document.getElementById('sliderAdvert');
  
  sliderConfig.slides.forEach((slide, index) => {
    const slideElement = document.createElement('div');
    slideElement.className = 'slide flex justify-between items-center px-[30px] w-[892px] h-[344px] flex-shrink-0';
    
    slideElement.innerHTML = `
      <div class="flex flex-col justify-between">
        <div class="flex space-x-[14px] mb-[10px] items-center">
          <figure class="w-[40px] h-[49px]">
            <img src="${slide.imgSrc}" class="object-cover" />
          </figure>
          <p class="font-normal text-[16px] text-[#FAFAFA]">${slide.series}</p>
        </div>
        <p class="text-[46px] text-[#FAFAFA] font-semibold">${slide.discount}</p>
        <div class="flex items-center mt-[22px] space-x-2">
          <button class="underline text-[16px] text-[#FAFAFA] font-medium">${slide.buttonText}</button>
          <figure class="size-[24px]">
            <img class="object-cover" src="./assets/img/icons arrow-right.svg" />
          </figure>
        </div>
      </div>
      <figure class="w-[496px] h-[310px] pt-[16px]">
        <img src="${slide.mainImgSrc}" class="object-cover w-full h-full" alt="phone" />
      </figure>
    `;
    sliderAdvert.appendChild(slideElement);
  });

  const totalSlides = sliderConfig.slides.length;
  const dots = document.querySelectorAll('.dot');
  
  dots.forEach((dot, index) => {
    dot.onclick = () => {
      moveToSlide(index);
      resetSlideInterval();
    };
  });
  
  function moveToSlide(index) {
    if (index >= 0 && index < totalSlides) {
      currentIndex = index;
      const offset = -currentIndex * sliderConfig.slideWidth;
      sliderAdvert.style.transform = `translateX(${offset}px)`;
      updateDots();
    }
  }
  
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      moveToSlide(currentIndex);
    }, sliderConfig.autoSlideInterval);
  }
  
  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }
  
  moveToSlide(0);
  startSlideInterval();
});
