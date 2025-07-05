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
      title: "Plumbing",
      description: "Custom web applications built with modern technologies",
      image: "https://careertraining.occc.edu/common/images/2/23274/Foundations-of-Plumbing-Tools-935x572.jpg"
    },
    {
      id: 2,
      title: "Electrical",
      description: "Native and cross-platform mobile solutions",
      image: "https://african.land/oc-content/plugins/blog/img/blog/382.jpg"
    },
    {
      id: 3,
      title: "Painting",
      description: "User-centered design that drives engagement",
      image: "https://www.hammerandbrush.com.au/wp-content/uploads/2021/11/closeup-of-house-painting-renovation-4519567.jpg"
    },
    {
      id: 4,
      title: "Video Editing",
      description: "Complete online store solutions",
      image: "https://sm.pcmag.com/pcmag_me/gallery/t/the-best-o/the-best-online-video-editors-for-2025_rjmd.jpg"
    },
    {
      id: 5,
      title: "Photography",
      description: "Strategic marketing campaigns that convert",
      image: "https://d2ub1k1pknil0e.cloudfront.net/media/images/camera-photography.width-1200.jpg"
    },
    {
      id: 6,
      title: "Home Decor",
      description: "Memorable brand experiences and visual identity",
      image: "https://s3.ap-south-1.amazonaws.com/mbprodimages/images/interiorDesignerCMS/decorPartner/69/projectImage/simple-tv-unit-interior-design-17.jpg"
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
          start: "center center",
          end: () => `+=${trackWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
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