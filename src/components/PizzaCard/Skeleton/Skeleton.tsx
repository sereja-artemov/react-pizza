import React from 'react';
import ContentLoader from 'react-content-loader';

type SkeletonProps = {
  width?: number,
  height?: number,
  viewBox?: string,
  children?: any,
};

const Skeleton: React.FC<SkeletonProps> = (props) => (
  <ContentLoader
    className="skeleton"
    speed={2}
    width={props.width}
    height={props.height}
    viewBox={props.viewBox}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {props.children}
  </ContentLoader>
);

export default Skeleton;
