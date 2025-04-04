import { Outlet } from "react-router-dom";
import MotionNav from "./AnimNav";

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
      <div className="relative grid grid-cols-6 grid-rows-6 gap-2 md:w-3/5 sm:w-4/5 h-full bg-black">
        <MotionNav paths={paths} />
        {/* CANVAS ------------------ */}
        <div className="absolute col-start-2 row-start-2 row-span-4 col-span-4 w-full h-full border-y border-neutral-500">
          <Outlet />
        </div>
        {/* CANVAS------------------- */}
        {/* BOTTOM PART ------------- */}
        <h1 className="col-start-2 row-start-6 text-neutral-500">
          {" "}
          Cold night
        </h1>{" "}
        <h2 className="fixed top-1/2 left-1/2 z-50 translate-x-[-50%] translate-y-[-50%]">
          Am I too slow for this word ?
        </h2>
        <div className="col-start-3 col-span-2 row-start-6 ">
          A visual exploration
        </div>
        <div className="col-start-5 row-start-6 ">
          <a href="https://github.com/Vincent-Wirwicki/coldBlue" target="blank">
            Github
          </a>
        </div>
        {/* BOTTOM PART ------------- */}
      </div>
    </main>
  );
};

export default Layout;
