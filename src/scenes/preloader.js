// src/scenes/preloader.js
import gsap from 'gsap';

export function initPreloader() {
  const preloader = document.querySelector('#preloader');
  const dot = document.querySelector('.preloader__dot');
  const text = document.querySelector('.preloader__text');

  if (!preloader || !dot || !text) return;

  // Создаём timeline — последовательность анимаций
  const tl = gsap.timeline({
    onComplete: () => {
      // Когда всё закончилось — прячем прелоадер
      preloader.style.display = 'none';
    }
  });

  // 1. Точка появляется (медленно, из ничего)
  tl.fromTo(dot,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
  );

  // 2. Точка пульсирует (растёт и сжимается)
  tl.to(dot, {
    scale: 1.5,
    duration: 0.8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: 1
  });

  // 3. Точка «взрывается» — увеличивается и растворяется
  tl.to(dot, {
    scale: 30,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.in'
  });

  // 4. Текст выезжает снизу вверх
  tl.fromTo(text,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.8, ease: 'power2.out' },
    '-=0.4' // начинается на 0.4 сек раньше окончания предыдущей
  );

  // 5. Пауза, чтобы прочитать текст
  tl.to({}, { duration: 0.8 });

  // 6. Весь прелоадер плавно уходит
  tl.to(preloader, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.inOut'
  });
}