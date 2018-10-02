import ContentLoader from "react-content-loader";
import React, { Component } from "react";

export const MessageLoaderRight = props => (
  <ContentLoader
    height={100}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#aebada"
    className="loader-right"
    {...props}
  >
    <rect x="65.27" y="34.88" rx="3" ry="3" width="211.58" height="5" />
    <rect x="45.05" y="56.11" rx="3" ry="3" width="243.77" height="5" />
    <rect x="96" y="76" rx="3" ry="3" width="201" height="5" />
    <circle cx="331.6" cy="49.6" r="33.6" />
    <circle cx="294.5" cy="41.66" r="1" />
    <rect x="36.66" y="14.49" rx="3" ry="3" width="264.69" height="5" />
  </ContentLoader>
);

export const MessageLoaderLeft = props => (
  <ContentLoader
    height={100}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#aebada"
    className="loader-left"
    {...props}
  >
    <rect x="83.27" y="33.88" rx="3" ry="3" width="211.58" height="5" />
    <rect x="92.05" y="54.11" rx="3" ry="3" width="243.77" height="5" />
    <rect x="72" y="72" rx="3" ry="3" width="201" height="5" />
    <circle cx="41.6" cy="47.6" r="33.6" />
    <circle cx="294.5" cy="41.66" r="1" />
    <rect x="70.66" y="13.49" rx="3" ry="3" width="264.69" height="5" />
  </ContentLoader>
);
