"use client";

import { useLocation, NavLink } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";
import { useState, useEffect } from "react";

const MotionNav = ({
  paths,
}: {
  paths: {
    path: string;
    title: string;
  }[];
}) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const index = paths.findIndex(({ path }) => {
      if (path === "/" && location.pathname === "/") return true;
      return path !== "/" && location.pathname.startsWith(path);
    });
    setActiveIndex(index !== -1 ? index : null);
  }, [location.pathname, paths]);

  return (
    <LayoutGroup>
      <nav className="relative col-start-2 col-span-4 grid grid-cols-subgrid row-start-1 self-end text-end text-neutral-200 w-full ">
        {paths.map(({ path, title }, i) => (
          <MyLink
            key={`${path}-${title}-${i}`}
            path={path}
            title={title}
            col={i}
          />
        ))}
        {activeIndex !== null && (
          <motion.div
            layoutId="activeTab"
            className="absolute h-full w-full bg-[#00FFFF] z-10"
            initial={false}
            style={{
              gridColumnStart: activeIndex + 1,
              gridColumnEnd: activeIndex + 2,
            }}
            transition={{
              duration: 0.5,
              ease: "anticipate",
              delay: 0.1,
            }}
          />
        )}
      </nav>
    </LayoutGroup>
  );
};

const MyLink = ({
  path,
  title,
  col,
}: {
  path: string;
  title: string;
  col: number;
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive
            ? "no-underline text-black bg-none"
            : "line-through bg-neutral-800"
        } relative transition delay-200 text-end tracking-widest z-10 bg-blend-difference col-start-${
          col + 1
        }`
      }
      to={path}
    >
      <span className="">{title}</span>
    </NavLink>
  );
};

export default MotionNav;
