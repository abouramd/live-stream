import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Fade-in animation for elements
 */
export const fadeIn = (element: HTMLElement | string, duration = 0.6, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
    }
  );
};

/**
 * Stagger animation for a group of elements
 */
export const staggerIn = (
  elements: HTMLElement[] | string,
  duration = 0.6,
  staggerAmount = 0.1
) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: staggerAmount,
      ease: "power2.out",
    }
  );
};

/**
 * Hover animation for cards
 */
export const cardHover = (element: HTMLElement) => {
  const tl = gsap.timeline({ paused: true });

  tl.to(
    element,
    {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      duration: 0.3,
      ease: "power2.out",
    },
    0
  );

  element.addEventListener("mouseenter", () => tl.play());
  element.addEventListener("mouseleave", () => tl.reverse());

  return tl;
};

/**
 * Scroll trigger animation - stagger cards into view
 */
export const scrollStaggerCards = (container: string) => {
  const cards = document.querySelectorAll(`${container} > div`);

  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "center center",
        scrub: 0.5,
        markers: false,
      },
    }
  );
};

/**
 * Parallax effect on scroll
 */
export const parallax = (element: string, speed = 0.5) => {
  gsap.to(element, {
    y: () => (window.innerHeight * (1 - speed)) / 2,
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "center center",
      scrub: 1,
      markers: false,
    },
  });
};

/**
 * Pulse animation for live badges
 */
export const pulseAnimation = (element: HTMLElement) => {
  return gsap.to(element, {
    opacity: 0.6,
    scale: 1.1,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
};

/**
 * Text counter animation
 */
export const animateCounter = (
  element: HTMLElement,
  start: number,
  end: number,
  duration = 2
) => {
  const obj = { value: start };

  gsap.to(obj, {
    value: end,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
  });
};

/**
 * Button ripple effect on click
 */
export const rippleEffect = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement("span");
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.className = "ripple absolute rounded-full bg-white opacity-75 pointer-events-none";

  button.appendChild(ripple);

  gsap.to(ripple, {
    scale: 2,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => ripple.remove(),
  });
};

/**
 * Cleanup function for ScrollTrigger
 */
export const clearScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
