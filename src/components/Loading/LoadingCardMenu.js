import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingCardMenu = () => {
  return (
    <SkeletonTheme baseColor="#dbdbdb" highlightColor="#c1c1c1">
      <Skeleton
        height={300}
        width={280}
        borderRadius={20}
        className="card-skeleton"
      />
      <Skeleton
        height={300}
        width={280}
        borderRadius={20}
        className="card-skeleton"
      />
      <Skeleton
        height={300}
        width={280}
        borderRadius={20}
        className="card-skeleton"
      />
      <Skeleton
        height={300}
        width={280}
        borderRadius={20}
        className="card-skeleton"
      />
    </SkeletonTheme>
  );
};

export default LoadingCardMenu;
