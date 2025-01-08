import ListLender from "./_components/ListLender";

const MainPage = () => {
  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <section>
        <ul className="my-10 flex gap-2">
          <li>
            <button className="rounded-full border border-gray-500 px-[15px]">분류1</button>
          </li>
          <li>
            <button className="rounded-full border border-gray-500 px-[15px]">분류2</button>
          </li>
          <li>
            <button className="rounded-full border border-gray-500 px-[15px]">분류3</button>
          </li>
          <li>
            <button className="rounded-full border border-gray-500 px-[15px]">분류4</button>
          </li>
        </ul>
      </section>

      <ListLender />
    </div>
  );
};

export default MainPage;
