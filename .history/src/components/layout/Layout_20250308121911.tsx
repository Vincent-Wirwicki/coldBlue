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
    <main className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center  py-4">
      <div className="relative grid grid-cols-6 grid-rows-6 gap-2 w-4/5 h-full">
        {/* <h1 className="text-neutral-500"> LAB</h1>  flex flex-col justify-center items-center w-4/5 h-full border*/}
        <h1 className="col-start-2 self-end text-end">cold</h1>
        <h1 className="col-start-3 self-end text-end">blue</h1>

        <div className="absolute col-start-2 row-start-2 row-span-4 col-span-4 w-full h-full border-y border-neutral-500">
          <Outlet />
        </div>
        <Nav paths={paths} />
      </div>
    </main>
  );
};

export default Layout;
// min-w-[600px] h-[600px]  p-2
const Nav = ({
  paths,
}: {
  paths: {
    path: string;
    title: string;
  }[];
}) => {
  return (
    <nav className="col-start-2 col-span-4 grid grid-cols-subgrid row-start-6 row-span-4 self-start text-neutral-500   gap-5  h-full">
      <div className="flex  justify-between gap-2 h-full w-full">
        {/* <h1 className="">Lab</h1> */}
        {paths.map(({ path, title }, i) => (
          <MyLink key={`${path}-${title}-${i}`} path={path} title={title} />
        ))}
      </div>
    </nav>
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
      // className="[&.active]:text-[#00FFFF] [&.active]:no-underline  line-through "
      className={`[&.active]:text-[#00FFFF] [&.active]:no-underline  line-through col-start-${
        col + 1
      }`}
      to={path}
    >
      {title}
    </NavLink>
  );
};
