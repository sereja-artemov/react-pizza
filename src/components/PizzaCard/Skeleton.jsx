import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={0}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="125" r="125" />
    <rect x="105" y="331" rx="0" ry="0" width="1" height="0" />
    <rect x="0" y="295" rx="11" ry="11" width="280" height="31" />
    <rect x="0" y="346" rx="11" ry="11" width="280" height="59" />
    <rect x="0" y="434" rx="11" ry="11" width="95" height="35" />
    <rect x="125" y="427" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
