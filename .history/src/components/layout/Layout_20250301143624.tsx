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
      <Nav paths={paths} />
      <main className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
        <div className="w-4/5 h-1/2 border bg-red-200">
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
    <nav className="fixed top-5 left-5 z-10 text-neutral-500 flex flex-col gap-5">
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
