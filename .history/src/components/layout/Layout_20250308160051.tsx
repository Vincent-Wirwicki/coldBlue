import { NavLink, Outlet } from "react-router-dom";
import MotionNav from "./AnimNav";
import { path } from "motion/react-client";

const Layout = ({
  paths,
}: {
  paths: {
    path: string;
    title: string;
  }[];
}) => {
  return (
    <main className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center py-8 bg-black">
      <div className="relative grid grid-cols-6 grid-rows-6 gap-2 w-4/5 h-full bg-black ">
        {/* <h1 className="text-neutral-500"> LAB</h1>  flex flex-col justify-center items-center w-4/5 h-full border*/}
        <h1 className="col-start-2 row-start-6 text-neutral-500">Cold night</h1>
        {/* <Nav paths={paths} /> */}
        <MotionNav paths={paths} />
        <div className="absolute col-start-2 row-start-2 row-span-4 col-span-4 w-full h-full border-y border-neutral-500">
          <Outlet />
        </div>
        <div className="col-start-3 col-span-2 row-start-6 ">
          A visual exploration
        </div>
        <div className="col-start-5 row-start-6 ">
          <a href="https://github.com/Vincent-Wirwicki/coldBlue" target="blank">
            Github
          </a>
        </div>
      </div>
    </main>
  );
};

export default Layout;
