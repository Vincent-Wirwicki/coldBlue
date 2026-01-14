import { NavLink, Outlet } from "react-router-dom";

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
      <section className="relative w-full h-full grid grid-cols-12 grid-rows-12">
        {/* CANVAS------------- */}
        <div className="absolute z-[1] w-full h-full border border-neutral-800 col-start-1 col-span-12 lg:col-start-4 lg:col-span-6">
          <Outlet />
        </div>
        {/* CANVAS------------- */}
        <div className="row-span-1 row-start-2 col-start-2 col-span-10 md:row-start-7 lg:col-start-6 md:col-start-5 lg:col-span-2 md:col-span-4  bg-black z-[1] w-full h-fit">
          <h1 className="text-neutral-100 text-center font-light text-xl">
            shade of light
          </h1>
        </div>
        <nav className="row-span-1 row-start-12 col-start-1 col-span-10 lg:col-start-6 md:col-start-5 lg:col-span-2 md:col-span-4  bg-black z-[1] w-full h-fit ">
          <Nav paths={paths} />
        </nav>
        {/* <span className="col-start-1 col-span-3 row-start-1 row-span-1  ">
          A visual exploration using webgl
        </span> */}
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
