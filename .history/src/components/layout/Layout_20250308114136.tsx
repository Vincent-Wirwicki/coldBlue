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
      <div className="relative grid grid-cols-6 grid-rows-6 w-4/5 h-full">
        {/* <h1 className="text-neutral-500"> LAB</h1>  flex flex-col justify-center items-center w-4/5 h-full border*/}
        <h1 className="col-start-3 self-end text-end">cold blue</h1>
        <div className="absolute col-start-2 row-start-2 row-span-4 col-span-4 w-full h-full">
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
    <nav className="col-start-4 row-start-6 text-neutral-500 flex flex-col  items-end gap-5 p-2 uppercase">
      <div className="flex gap-2 font-bold">
        <h1 className="text-xs">Lab</h1>
        {paths.map(({ path, title }, i) => (
          <MyLink key={`${path}-${title}-${i}`} path={path} title={title} />
        ))}
      </div>
    </nav>
  );
};

const MyLink = ({ path, title }: { path: string; title: string }) => {
  return (
    <NavLink
      className="[&.active]:text-[#00FFFF] [&.active]:underline text-xs line-through "
      to={path}
    >
      {title}
    </NavLink>
  );
};
