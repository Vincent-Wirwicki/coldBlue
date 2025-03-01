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
        <div className="w-4/5 h-4/5 border border-neutral-800 grid grid-cols-4 ">
          <Nav paths={paths} />

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
    <nav className=" text-neutral-500 flex flex-col gap-5">
      {paths.map(({ path, title }, i) => (
        <MyLink key={`${path}-${title}-${i}`} path={path} title={title} />
      ))}
    </nav>
  );
};

const MyLink = ({ path, title }: { path: string; title: string }) => {
  return (
    <NavLink className="[&.active]:text-neutral-200 " to={path}>
      {title}
    </NavLink>
  );
};
