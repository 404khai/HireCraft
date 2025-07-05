import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesScroll.css';

const ServicesScroll = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  // Sample services data - replace with your actual services
  const services = [
    {
        id: 1,
        title: "Carpentry",
        description: "Classic furniture and premium woodware",
        image: "https://i.pinimg.com/736x/23/a2/f3/23a2f39014f3db9981ba006a536deb3b.jpg"
    },
    {
      id: 2,
      title: "Plumbing",
      description: "Custom web applications built with modern technologies",
      image: "https://careertraining.occc.edu/common/images/2/23274/Foundations-of-Plumbing-Tools-935x572.jpg"
    },
    {
      id: 3,
      title: "Electrical",
      description: "Native and cross-platform mobile solutions",
      image: "https://african.land/oc-content/plugins/blog/img/blog/382.jpg"
    },
    {
      id: 4,
      title: "Painting",
      description: "User-centered design that drives engagement",
      image: "https://www.hammerandbrush.com.au/wp-content/uploads/2021/11/closeup-of-house-painting-renovation-4519567.jpg"
    },
    {
      id: 5,
      title: "Tiling",
      description: "Complete online store solutions",
      image: "https://i.pinimg.com/736x/49/f3/e7/49f3e74e4c70e3ae22a7e5070ab48340.jpg"
    },
    {
      id: 6,
      title: "Ceiling Design",
      description: "Strategic marketing campaigns that convert",
      image: "https://img.interiorcompany.com/interior/webproduct/286638709053313227074.png?aio=w-1200;"
    },
    {
      id: 7,
      title: "Interior Design",
      description: "Memorable brand experiences and visual identity",
      image: "https://images.prismic.io/luxdeco-dev/YmM0YzhmZDItM2YzZS00ZWY1LThlMmEtNjJjYWEwOGJjZTg5_top-10-modern-interior-designers_260a6d81-aae7-4caf-834a-7657993e3360.jpg?auto=compress,format&w=1200&q=100"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const setupScrollTrigger = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      const section = sectionRef.current;

      if (!container || !track || !section) return;

      // Calculate dimensions
      const containerWidth = container.offsetWidth;
      const trackWidth = track.scrollWidth;
      const scrollDistance = trackWidth - containerWidth;

      // Create the horizontal scroll animation
      const scrollTween = gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
          pinType: "transform",
          snap: {
            snapTo: "labels", // optional: snap to specific points
            duration: 0.3,
            delay: 0.2
          }
        }
      });

      return scrollTween;
    };

    const scrollTween = setupScrollTrigger();

    // Handle resize with debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollTween) scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="services-scroll-section" ref={sectionRef}>
      <div className="services-content">
        <div className="services-header">
          <h2 className="services-title">
            Our <span className="services-title-stroke">Services</span>
          </h2>
        </div>
        
        <div className="services-slider">
          <div className="services-container" ref={containerRef}>
            <div className="services-inner">
              <div className="services-track" ref={trackRef}>
                {services.map((service, index) => (
                  <div key={service.id} className="service-item">
                    <span className="service-number">#{String(index + 1).padStart(2, '0')}</span>
                    <div className="service-image-container">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="service-image"
                      />
                      <div className="service-image-bg">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="service-image"
                        />
                      </div>
                    </div>
                    <div className="service-content">
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesScroll;