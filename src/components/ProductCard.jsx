import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ title, price, image }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">

      <CardContent className="p-4 flex flex-col items-center">

        {/* Product Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-contain rounded-md bg-white"
        />

        {/* Product Info */}
        <div className="mt-4 text-center">

          <h3 className="text-lg font-semibold line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-700 font-bold mt-2">
            ${price.toFixed(2)}
          </p>

        </div>

        {/* Button */}
        <Button className="mt-4 w-full">
          Add to Cart
        </Button>

      </CardContent>

    </Card>
  );
};

export default ProductCard;