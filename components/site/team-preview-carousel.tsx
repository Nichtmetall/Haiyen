"use client";

import { useEffect, useRef, useState, type TransitionEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TEAM, type TeamMember } from "./data";

const COUNT = TEAM.length;
const SLIDES = [...TEAM, ...TEAM, ...TEAM];
const MAX_VISIBLE = 4;

function PersonCard({ member, interactive }: { member: TeamMember; interactive: boolean }) {
  const content = (
    <>
      <div className="portrait">
        <Image
          src={member.img}
          alt={interactive ? member.name : ""}
          fill
          loading="eager"
          sizes="(max-width: 760px) 42vw, (max-width: 1000px) 28vw, 22vw"
        />
      </div>
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </>
  );

  return (
    <Link href={`/team#${member.slug}`} className="team-preview-person" aria-hidden={!interactive} tabIndex={interactive ? undefined : -1}>
      {content}
    </Link>
  );
}

export const TeamPreviewCarousel = () => {
  const [index, setIndex] = useState(COUNT);
  const [animate, setAnimate] = useState(true);
  const busy = useRef(false);
  const drag = useRef({ x: 0, active: false, swiped: false });

  useEffect(() => {
    if (animate) return;
    let nextFrame = 0;
    const frame = requestAnimationFrame(() => {
      nextFrame = requestAnimationFrame(() => {
        setAnimate(true);
        busy.current = false;
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
    };
  }, [animate]);

  const paginate = (direction: number) => {
    if (busy.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(false);
      setIndex(current => {
        const next = current + direction;
        if (next >= COUNT * 2) return next - COUNT;
        if (next < COUNT) return next + COUNT;
        return next;
      });
      return;
    }
    busy.current = true;
    setAnimate(true);
    setIndex(current => current + direction);
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    if (index >= COUNT * 2) {
      setAnimate(false);
      setIndex(index - COUNT);
    } else if (index < COUNT) {
      setAnimate(false);
      setIndex(index + COUNT);
    } else {
      busy.current = false;
    }
  };

  return (
    <div className="team-preview" aria-roledescription="Karussell" aria-label="Teammitglieder">
      <div
        className="team-preview-window"
        onPointerDown={event => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          drag.current = { x: event.clientX, active: true, swiped: false };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={event => {
          if (!drag.current.active) return;
          const dx = event.clientX - drag.current.x;
          drag.current.active = false;
          if (dx < -40) {
            drag.current.swiped = true;
            paginate(1);
          } else if (dx > 40) {
            drag.current.swiped = true;
            paginate(-1);
          }
        }}
        onPointerCancel={() => {
          drag.current.active = false;
        }}
        onClickCapture={event => {
          if (!drag.current.swiped) return;
          event.preventDefault();
          event.stopPropagation();
          drag.current.swiped = false;
        }}
      >
        <div
          className={`team-preview-track${animate ? " is-animated" : ""}`}
          style={{ transform: `translate3d(calc(${index} * -1 * (100cqi + var(--team-gap)) / var(--team-visible)), 0, 0)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {SLIDES.map((member, i) => (
            <PersonCard
              key={`${member.slug}-${i}`}
              member={member}
              interactive={i >= index && i < index + MAX_VISIBLE}
            />
          ))}
        </div>
      </div>
      <div className="team-preview-controls">
        <button type="button" className="circle-icon" aria-label="Vorheriges Teammitglied" onClick={() => paginate(-1)}>
          <ChevronLeft size={19} />
        </button>
        <button type="button" className="circle-icon" aria-label="Nächstes Teammitglied" onClick={() => paginate(1)}>
          <ChevronRight size={19} />
        </button>
      </div>
    </div>
  );
};
