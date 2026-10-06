import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const facts = [
  { icon: "fa-ticket", to: 32, suffix: "K", label: "Overall bookings" },
  { icon: "fa-award", to: 25, suffix: "+", label: "Years of service" },
  { icon: "fa-face-smile", to: 45, suffix: "K", label: "Happy users" },
  { icon: "fa-earth-africa", to: 22, suffix: "", label: "Countries we work in" },
];

function useCountUp(to, start, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf, t0;
    const tick = (t) => {
      t0 = t0 || t;
      const p = Math.min((t - t0) / ms, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, ms]);
  return v;
}

const Fact = ({ f, start }) => {
  const v = useCountUp(f.to, start);
  return (
    <div className="ab-fact">
      <div className="ab-ico"><i className={`fa-solid ${f.icon}`}></i></div>
      <h3 className="ab-num mb-0">{v}{f.suffix}</h3>
      <p className="ab-lbl">{f.label}</p>
    </div>
  );
};

const Facts = () => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="ab-facts py-5 gray" ref={ref}>
      <Container>
        <Row className="align-items-stretch justify-content-between g-3 g-md-4">
          {facts.map((f) => (
            <Col key={f.label} xl={3} lg={3} md={6} sm={6} xs={6}>
              <Fact f={f} start={seen} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Facts;