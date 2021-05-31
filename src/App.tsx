import { useCallback, useEffect, useRef } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperInstance from 'swiper'
import 'swiper/swiper.scss';
import './App.sass';

function App() {
  const swiperRef = useRef<SwiperInstance>()

  useEffect(() => {
    const update = () => swiperRef.current?.update()
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const onSwiperUpdate = useCallback((s: SwiperInstance) => {
    const wrapper = s.wrapperEl

    // remove existing progress bar
    const existing = wrapper.getElementsByClassName('progress-bar')
    while (existing[0]) {
      existing[0].parentNode?.removeChild(existing[0]);
    }
    
    // calculate progress bar length
    const slides = wrapper.getElementsByClassName('swiper-slide') as HTMLCollectionOf<HTMLElement>
    const firstSlide = slides[0]
    const lastSlide = slides[slides.length - 1]
    const totalWidth = wrapper.scrollWidth
      + 2 * parseFloat(firstSlide.style.marginRight)
      + 0.5 * firstSlide.scrollWidth
      + 0.5 * lastSlide.scrollWidth
    const left = parseFloat(firstSlide.style.marginRight) + 0.5 * firstSlide.scrollWidth 
    let p = document.createElement('div')
    p.classList.add('progress-bar')
    p.style.width = `${totalWidth}px`
    p.style.left = `-${left}px`

    // insert into slides wrapper
    wrapper.insertBefore(p, wrapper.firstElementChild)
  }, [])

  return (
    <div className="App">
      <Swiper
        className="swiper"
        spaceBetween={50}
        slidesPerView={'auto'}
        centeredSlides={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onUpdate={onSwiperUpdate}
      >
        {[1,2,3,4,5,6,7].map(item => <SwiperSlide className="slide" key={item}>
         {item}
        </SwiperSlide>)}
      </Swiper>
    </div>
  );
}

export default App;
