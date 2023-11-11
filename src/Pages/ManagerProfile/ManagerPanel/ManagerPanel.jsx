import search from "../../../images/search.svg";
import plus from "../../../images/plus.svg";
import "./ManagerPanel.css";

function ManagerPanel({ title, btnText, placeholderText, onClick, children }) {
  return (
    <>
      <h2 className="title">{title}</h2>
      <div className="panel">
        <input
          disabled
          className="panel_finder"
          placeholder={placeholderText}
        />
        <img src={search} alt="Лупа" className="finder_img" />
        {children}
        <button type="button" onClick={onClick} className="panel_add_btn">
          <img src={plus} className="plus" />
          {btnText}
        </button>
      </div>
    </>
  );
}
export default ManagerPanel;
