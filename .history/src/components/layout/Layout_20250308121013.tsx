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
      <div className="relative grid grid-cols-6 grid-rows-6 gap-1 w-4/5 h-full">
        {/* <h1 className="text-neutral-500"> LAB</h1>  flex flex-col justify-center items-center w-4/5 h-full border*/}
        <h1 className="col-start-2 self-end text-start">cold</h1>
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
    <nav className="col-start-6  row-start-2 row-span-4 self-start text-neutral-500 flex flex-col  gap-5  h-full">
      <div className="flex flex-col justify-between gap-2 ">
        {/* <h1 className="">Lab</h1> */}
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
      className="[&.active]:text-[#00FFFF] [&.active]:no-underline  line-through "
      to={path}
    >
      {title}
    </NavLink>
  );
};
