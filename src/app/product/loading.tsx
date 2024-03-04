export default function Loading() {
  return (
    <div className="px-5">
      <h1 className="text-3xl font-bold text-center mt-5">PRODUCTS PAGE</h1>
      <div className="product-item container grid grid-cols-4 gap-4 h-96 w-full animate-pulse">
        <div className="w-full max-w-sm rounded-lg shadow bg-gray-300 border-gray-200 mt-5">
          <div className="px-5 pb-5">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
