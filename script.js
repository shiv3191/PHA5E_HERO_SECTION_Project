gsap.fromTo(".splash-text", 
    { opacity: 0, scale: 0.5 }, 
    { opacity: 1, scale: 1.2, duration: 1.5, ease: "power2.out" }
);

setTimeout(() => {
    gsap.to(".splash-text", { opacity: 0, scale: 0.8, duration: 1, ease: "power2.inOut" });
    setTimeout(() => {
        document.querySelector(".splash-screen").style.display = "none";
        document.querySelector(".hero").classList.add("visible");
    }, 1000);
}, 2000);

gsap.from(".title", { opacity: 0, y: -20, duration: 1, delay: 2.5 });
gsap.from(".subtitle", { opacity: 0, y: 20, duration: 1.5, delay: 2.7 });

const images = document.querySelectorAll(".hero-img");
const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");

images.forEach(img => {
    const text = img.nextElementSibling; 
    
    img.style.filter = "grayscale(0%)";
    img.style.opacity = "1";

   
    text.style.position = "absolute";
    text.style.bottom = "10px";
    text.style.right = "10px";
    text.style.pointerEvents = "none"; 

    img.addEventListener("mouseenter", () => {
        images.forEach(otherImg => {
            if (otherImg !== img) {
                otherImg.style.filter = "grayscale(100%)";
                otherImg.style.opacity = "0.3";
            }
        });

        title.style.color = "violet";
        subtitle.style.color = "grey";
    });

    img.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = img.getBoundingClientRect();
        const xMove = ((e.clientX - (left + width / 2)) / width) * 100;
        const yMove = ((e.clientY - (top + height / 2)) / height) * 100;

        const rotationX = ((e.clientY - (top + height / 2)) / height) * 30;
        const rotationY = ((e.clientX - (left + width / 2)) / width) * -30;

        gsap.to(img, { 
            x: xMove, 
            y: yMove, 
            rotationX: rotationX, 
            rotationY: rotationY,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    img.addEventListener("mouseleave", () => {
        images.forEach(otherImg => {
            otherImg.style.filter = "grayscale(0%)";
            otherImg.style.opacity = "1";
        });

        gsap.to(img, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.5, ease: "power2.out" });

        title.style.color = "#fff";
        subtitle.style.color = "#fff";
    });

    img.addEventListener("click", () => {
        title.style.color = "white";
        subtitle.style.color = "blue";
    });
});