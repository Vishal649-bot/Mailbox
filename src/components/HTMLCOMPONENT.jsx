

const HTMLComponent = ({ htmlString }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

export default HTMLComponent;