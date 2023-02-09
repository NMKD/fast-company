const BookMark = ({ id, status, toogle }) => {
  return (
    <>
      <button
        onClick={() => toogle(id)}
        className={"btn " + (!status ? " btn-primary" : "btn-success")}
      >
        <i className={"bi bi-bookmark" + (status ? "-fill" : " ")}></i>
        {status}
      </button>
    </>
  );
};

export default BookMark;
