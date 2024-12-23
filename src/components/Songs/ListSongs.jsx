import Loading from '../Loading';
import ItemSong from './ItemSong';

const ListSongs = ({
  filterSongs,
  genres,
  activeGenre,
  loading,
  onHandleGenres,
}) => {
  // const [songs, setSongs] = useState([]);
  // const [filterSongs, setFilterSongs] = useState([]);
  // const [genres, setGenres] = useState([]);
  // const [activeGenre, setActiveGenre] = useState('all');
  // const [loading, setLoading] = useState(true);

  // const handleSongs = async () => {
  //   const data = await fetch(`${import.meta.env.VITE_BASEURL}/songs`);
  //   const dataJson = await data.json();
  //   const songsData = dataJson.data.songs;
  //   setSongs(songsData);
  //   const uniqueGenres = [
  //     ...new Set(dataJson.data.songs.map((song) => song.genre)),
  //   ];
  //   setGenres(uniqueGenres);
  //   setFilterSongs(songsData);
  //   setLoading(false);
  // };

  // const handleGenres = (genre) => {
  //   setActiveGenre(genre);
  //   if (genre === 'all') {
  //     setFilterSongs(songs);
  //   } else {
  //     const filtered = songs.filter((song) => song.genre === genre);
  //     setFilterSongs(filtered);
  //   }
  // };

  // useEffect(() => {
  //   handleSongs();
  // }, []);

  if (loading)
    return (
      // <main className="main">
      //   <div className="d-flex justify-content-center align-items-center min-vh-100">
      //     <div className="spinner-border" role="status">
      //       <span className="visually-hidden">Loading...</span>
      //     </div>
      //   </div>
      // </main>
      <Loading />
    );

  return (
    <main className="main">
      <div className="container text-center ">
        <div className="row m-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                <i className="fas fa-music me-2 text-primary"></i>
                Music Collection
              </h2>
              {/* <div className="btn-group">
                <button className="btn btn-outline-primary">
                  <i className="fas fa-th-list me-1"></i> List
                </button>
                <button className="btn btn-outline-primary">
                  <i className="fas fa-grip-horizontal me-1"></i> Grid
                </button>
              </div> */}
            </div>
            <hr />
          </div>
        </div>

        {/* <!-- Filter Section --> */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className={`btn btn-sm ${
                      activeGenre === 'all'
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                    }`}
                    onClick={() => onHandleGenres('all')}
                  >
                    All
                  </button>
                  {genres.map((genre, i) => (
                    <button
                      onClick={() => onHandleGenres(genre)}
                      key={i}
                      className={`btn btn-sm ${
                        activeGenre === genre
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      } capital`}
                    >
                      {genre}
                    </button>
                  ))}
                  {/* <button className="btn btn-sm btn-outline-primary">
                    Pop
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Songs List --> */}
        <div className="row g-4">
          {filterSongs.map((song) => (
            <ItemSong song={song} key={song.id} />
          ))}

          {/* <div className="col-md-6 col-lg-4">
            <div className="card shadow-sm song-item h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title mb-1">Mungkinkah</h5>
                    <p className="text-muted mb-2">Stinky</p>
                  </div>
                  <span className="badge genre-badge-pop">Pop</span>
                </div>
                <small className="text-muted">ID: song-x4TeLbLquI8tA2Uv</small>
              </div>
              <div className="card-footer bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="fas fa-play me-1"></i> Play
                  </button>
                  <div>
                    <button className="btn btn-sm btn-light">
                      <i className="far fa-heart"></i>
                    </button>
                    <button className="btn btn-sm btn-light">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* end list */}
      </div>
    </main>
  );
};

export default ListSongs;
