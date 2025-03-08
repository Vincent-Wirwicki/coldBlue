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
    <main className="absolute top-0 left-0 w-screen h-screen flex justify-center  pb-28 ">
      <div className="flex flex-col justify-start items-center w-4/5 h-4/5">
        {/* <h1 className="text-neutral-500"> LAB</h1> */}
        <div className="w-4/5 h-4/5">
          <Outlet />
        </div>
        <Nav paths={paths} />
      </div>
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
    <nav className="text-neutral-500 flex flex-col justify-center items-end gap-5 p-2 uppercase">
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
      className="[&.active]:text-neutral-200 [&.active]:underline text-xs line-through "
      to={path}
    >
      {title}
    </NavLink>
  );
};
