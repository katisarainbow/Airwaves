import ContentLoader from "react-content-loader";

const LoaderPost = () => {
  return (
    <ContentLoader
      animate="true"
      backgroundColor="#1c1a24"
      foregroundColor="#24252f"
      viewBox="0 0 500 450"
    >
      <rect x="0" y="0" rx="2" ry="2" width="50" height="50" />
      <rect x="70" y="0" rx="4" ry="4" width="400" height="20" />
      <rect x="70" y="30" rx="4" ry="4" width="400" height="350" />
    </ContentLoader>
  );
};

export default LoaderPost;
