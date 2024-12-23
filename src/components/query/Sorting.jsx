/* eslint-disable react/prop-types */

const Sorting = ({setSort}) => {
  return (
    <div className="relative sm:flex-row-reverse">
    <select
    onChange={(e) => setSort(e.target.value)}
      className="block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      defaultValue="Sort by"
    >
      <option value="">Sort by</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
  )
}

export default Sorting