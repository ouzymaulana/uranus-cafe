import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingOrderMenu = () => {
  return (
    <SkeletonTheme baseColor="#B2B2B2" highlightColor="#93989b">
      <div className="cart-skeleton">
        <Skeleton height={25} width={300} />
        <div className="cart-item-skeleton">
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={30} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={20} />
        </div>
      </div>
      <div className="cart-skeleton">
        <Skeleton height={25} width={300} />
        <div className="cart-item-skeleton">
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={30} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={20} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoadingOrderMenu;
