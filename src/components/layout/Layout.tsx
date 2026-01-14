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
      <section className="w-full h-full flex gap-10 justify-center items-center flex-col ">
        {/* CANVAS------------- */}
        <div className="flex justify-center items-center w-full h-4/5 ">
          <Outlet />
        </div>
        {/* CANVAS------------- */}
        <nav className=" bg-black w-full h-fit text-neutral-500 flex justify-center items-center gap-20 ">
          <h1 className="tracking-wider">Shape of light</h1>
          <Separator />
          <Nav paths={paths} />
          <Separator />
          <a href="" className="tracking-wider underline">
            Github
          </a>
        </nav>
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
    <div className=" flex flex-col gap-4 items-center justify-center">
      <div className=" flex justify-center items-center">
        {paths.map(({ path, title }, i) => (
          <NavLink
            key={`${path}-${title}-${i}`}
            to={path}
            className={({ isActive }) =>
              isActive
                ? "text-amber-200 border border-amber-200 p-2 "
                : "text-neutral-500 border border-neutral-800 p-2"
            }
          >
            {title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const Separator = () => <div className="w-[20px] h-[2px] bg-amber-200 "></div>;
