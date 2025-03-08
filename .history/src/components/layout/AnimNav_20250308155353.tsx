"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, LayoutGroup } from "framer-motion";
import { useState, useEffect } from "react";

const paths = [
  { path: "/", title: "pln" },
  { path: "/simplex", title: "slx" },
  { path: "/curl", title: "crl" },
  { path: "/periodic", title: "prd" },
];

// Remove the paths prop since we're using the constant defined above
const Nav = () => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const index = paths.findIndex(({ path }) => path === pathname);
    setActiveIndex(index !== -1 ? index : null);
  }, [pathname]);

  return (
    <LayoutGroup>
      <nav className="col-start-2 col-span-4 grid grid-cols-subgrid row-start-1 self-end text-end text-neutral-200 w-full relative">
        {paths.map(({ path, title }, i) => (
          <MyLink
            key={`${path}-${title}-${i}`}
            path={path}
            title={title}
            col={i}
            isActive={pathname === path}
          />
        ))}
        {activeIndex !== null && (
          <motion.div
            layoutId="activeTab"
            className="absolute h-full bg-[#00FFFF] z-0"
            initial={false}
            style={{
              gridColumnStart: activeIndex + 1,
              gridColumnEnd: activeIndex + 2,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
  isActive,
}: {
  path: string;
  title: string;
  col: number;
  isActive: boolean;
}) => {
  return (
    <Link
      className={`${
        isActive ? "no-underline text-black" : "line-through"
      } text-end tracking-widest z-10 relative col-start-${col + 1}`}
      href={path}
    >
      <span>{title}</span>
    </Link>
  );
};

export default Nav;
