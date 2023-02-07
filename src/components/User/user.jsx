import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  _id,
  bookmark,
  remove,
  onToogle,
}) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>
          {qualities.map((q) => (
            <Qualitie key={q.color} {...q} />
          ))}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate}/5</td>
        <td>
          <BookMark toogle={onToogle} id={_id} status={bookmark} />
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => remove(_id)}>
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
