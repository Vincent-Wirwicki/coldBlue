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
    <main className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center py-8 bg-black">
      <div className="relative grid grid-cols-6 grid-rows-6 gap-2 w-4/5 h-full bg-black ">
        {/* <h1 className="text-neutral-500"> LAB</h1>  flex flex-col justify-center items-center w-4/5 h-full border*/}
        <h1 className="col-start-2 row-start-6 text-neutral-500">Cold night</h1>
        <Nav paths={paths} />
        <div className="absolute col-start-2 row-start-2 row-span-4 col-span-4 w-full h-full border-y border-neutral-500">
          <Outlet />
        </div>
        <div className="col-start-3 col-span-2 row-start-6 text-neutral-500">
          A visual exploration
        </div>
        <div className="col-start-5 row-start-6 text-neutral-500">
          Learn more
        </div>
        {/* <div className="w-[10px] h-[10px] bg-[#00FFFF] row-start-2 justify-self-end"></div> */}
        {/* <div className="w-[10px] h-[10px] rounded-full bg-[#00FFFF] row-start-3 justify-self-end"></div>
        <div className="w-[10px] h-[10px] rounded-full bg-[#00FFFF] row-start-4 justify-self-end"></div>
        <div className="w-[10px] h-[10px] rounded-full bg-[#00FFFF] row-start-5 justify-self-end"></div>
        <div className="w-[10px] h-[10px] rounded-full bg-[#00FFFF] row-start-3 col-start-6 justify-self-start"></div>
        <div className="w-[10px] h-[10px] rounded-full bg-[#00FFFF] row-start-4 col-start-6 justify-self-start"></div>
        <div className="w-[10px] h-[10px] rounded-full bg-[#00FFFF] row-start-5 col-start-6 justify-self-start"></div> */}

        {/* <h3>In search of visual, I never know what to choose</h3> */}
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
    <nav className="col-start-2 col-span-4 grid grid-cols-subgrid  row-start-1 self-end text-end text-neutral-500 w-full">
      {/* <h1 className="">Lab</h1> */}
      {paths.map(({ path, title }, i) => (
        <MyLink
          key={`${path}-${title}-${i}`}
          path={path}
          title={title}
          col={i}
        />
      ))}
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
      className={`[&.active]:bg-[#00FFFF] [&.active]:no-underline [&.active]:text-black text-end line-through tracking-widest border-b
 col-start-${col + 1}`}
      to={path}
    >
      {/* <span className="no-underline">||</span> */}
      <span>{title}</span>
    </NavLink>
  );
};
