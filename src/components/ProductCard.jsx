import { Button } from "./ui/button.jsx";

export default function ProductCard({ title, price, image }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 h-10">
          {title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">
            ${price.toFixed(2)}
          </span>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}