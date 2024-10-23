const ListItems = ({ isSidebarOpen }) => {

  const categories = [
    "All", "Music", "React Router", "Live", "Computer Programming", "Tamil Cinema",
    "News", "Game Shows", "T-Series", "Arijit Singh", "Sid Sriram", "Mohammed Nabi",
    "Live Television", "Seminars", "Recently Uploaded", "Watched", "New to you"
  ]

  return (
    <div className={`flex overflow-x-scroll mt-8 md:mt-2 px-4 scrollbar-none hover:scrollbar-thin  ${isSidebarOpen ? "hidden md:block" : "ml-4"}`}>
      <div className="flex space-x-4 flex-nowrap  ">
        {
          categories.map((category) => {
            return (
              <div key={category} className="mb-4 flex-none bg-gray-200 hover:bg-gray-300 duration-300 rounded-xl px-4 py-2  font-medium text-sm sm:text-lg md:text-base  lg:text-base text-gray-700 cursor-pointer">
                {category}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ListItems;