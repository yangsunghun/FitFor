import { regions, TAG_GROUPS } from "@/lib/constants/constants";

const HeaderCategorys = () => {
  return (
    <div className="mx-auto flex max-w-[1200px] pb-8 pt-4">
      {TAG_GROUPS.map((group) => (
        <div key={group.key} className="text-title2">
          <p className="mb-8 font-bold">{group.title}</p>

          <ul className="mr-6 flex h-[32rem] flex-col flex-wrap border-r border-line-02">
            {group.tags.map((tag, index) => (
              <li
                key={index}
                className="mb-6 w-[8.75rem] font-medium text-text-03 transition-colors duration-200 hover:text-primary-default"
              >
                <button className="">{tag}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="text-title2">
        <p className="mb-8 font-bold">지역</p>

        {/* 태그 리스트 */}
        <ul className="flex h-[32rem] flex-col flex-wrap">
          {regions.map((region, index) => (
            <li
              key={index}
              className="mb-6 w-[6.875rem] font-medium text-text-03 transition-colors duration-200 hover:text-primary-default"
            >
              <button className="">{region}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderCategorys;
