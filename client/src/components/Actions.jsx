function Actions({onDetails, onEdit, onDelete}){
    const handleDelete = (e) => {
        e.target.blur();
        onDelete();
    };
    return(
      <>
        <div className="actions">
            <button onClick={onEdit}>Edytuj</button>
            <button onClick={onDetails}>Szegóły</button>
            <button onClick={handleDelete}>Usuń</button>
        </div>
      </>
    );
}
export default Actions