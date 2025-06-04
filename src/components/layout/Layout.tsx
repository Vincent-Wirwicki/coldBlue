import { NavLink, Outlet } from "react-router-dom";
// import MotionNav from "./AnimNav";

const Layout = ({
  paths,
}: {
  paths: {
    path: string;
    title: string;
  }[];
}) => {
  return (
    <main className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center p-8 bg-black">
      {/* <div className="w-1/2 h-full  flex justify-center items-center">
        <h1 className="text-6xl text-neutral-200">Light in the dark</h1>
      </div> */}
      {/* <div className="w-1/6 h-full text-neutral-200">
        {" "}
        <div>Nature of light</div>
        <div>A Webgl experiment</div>
        <div>
          Using fbo particles <br /> & sdf shape function
        </div>
      </div>
      <div className="w-[512px] h-[512px] border border-neutral-800 ">
        <Outlet />
      </div>
      <div className="w-1/6 h-full "></div> */}
      {/* <div className="relative w-full h-full flex justify-center items-center">
        <div className="absolute z-[1] w-full h-full border border-neutral-800">
          <Outlet />
        </div>
        <div className="absolute z-[1] w-full h-full flex justify-center items-center text-neutral-100 text-center font-light text-xl">
          shade of light <br />
        </div>
        <div className="absolute z-[1] w-full h-full flex justify-center items-end text-neutral-100 text-center font-light">
          variant : 01 02 03
        </div>
      </div> */}
      <section className="relative w-full h-full grid grid-cols-12 grid-rows-12">
        <div className="absolute z-[1] w-full h-full border border-neutral-800 col-start-4 col-span-6">
          <Outlet />
        </div>
        <div className="absolute z-[1] w-full row-span-1 row-start-7 col-start-6 col-span-2 text-neutral-100 text-center font-light text-xl bg-black">
          shade of light <br />
        </div>
        <nav className="absolute row-span-1 row-start-12 col-start-6 col-span-2 bg-black z-[1] w-full h-fit flex justify-center items-center text-neutral-100 text-center font-light">
          <Nav paths={paths} />
        </nav>
        <span className="col-start-1 col-span-3 row-start-1 row-span-1  ">
          A visual exploration using webgl
        </span>
      </section>
    </main>
  );
};

export default Layout;

const Nav = ({
  paths,
}: {
  paths: {
    path: string;
    title: string;
  }[];
}) => {
  return (
    <div className="w-full flex justify-between items-center ">
      <h3 className="text-neutral-400">variants</h3>
      <div className="w-1/2 flex justify-between items-center">
        {paths.map(({ path, title }, i) => (
          <NavLink
            key={`${path}-${title}-${i}`}
            to={path}
            className={({ isActive }) =>
              isActive ? "text-neutral-200" : "text-neutral-400"
            }
          >
            {title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
