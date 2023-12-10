function BoxGenre({ genre, allSelectedGenre, setAllGenre }) {
  
  const deleteGenre = (genre) => () => {
    setAllGenre(allSelectedGenre.filter((item) => item !== genre));
  };
  return (
    <div className="box-genre">
      <p className="nameGenre">{genre}</p>
      <button className="deleteButton" onClick={deleteGenre(genre)}> X </button>
    </div>
  );
}

export default BoxGenre;