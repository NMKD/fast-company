const BookMark = ({ id, status, toogle }) => {
  return (
    <>
      <button
        onClick={() => toogle(id)}
        className={"btn " + (!status ? " btn-primary" : "btn-success")}
      >
        {!status ? (
          <i className="bi bi-bookmark"></i>
        ) : (
          <i className="bi bi-bookmark-fill"></i>
        )}
        {status}
      </button>
    </>
  );
};

export default BookMark;
