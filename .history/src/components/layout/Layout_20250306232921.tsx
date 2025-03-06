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
    <>
      <main className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
        <div className=" ">
          <Nav paths={paths} />
          <div className="w-screen border border-neutral-800"></div>
          <Outlet />
        </div>
      </main>
    </>
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
    <nav className="fixed z-20 top-1/2 text-neutral-500 flex flex-col justify-center items-end gap-5 p-2 pt-5 border-x border-neutral-800 ">
      <div className="flex flex-col gap-2 text-end">
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
      className="[&.active]:text-neutral-200 ibm-plex-mono-regular"
      to={path}
    >
      {title}
    </NavLink>
  );
};
