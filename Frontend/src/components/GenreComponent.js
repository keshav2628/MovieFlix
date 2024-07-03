import DropDown from "./DropDown";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/GenreComponent.css";
import SearchComponent from "./SearchComponet";

function GenreComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [movies, setMovies] = useState([]);
  const g = state.movieGenre;
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    async function fetchMoviesByGenre() {
      try {
        if (g === "All") {
          const response = await axios.get("http://localhost:3001/api/admin/movie");
          setMovies(response.data);
        } else {
          const response = await axios.get(`http://localhost:3001/api/admin/movie/bygenre/${g}`);
          setMovies(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchMoviesByGenre();
  }, [g]);

  function handleSingleMovie(id) {
    try {
      console.log(id);
      navigate(`/getMovie/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  // async function handleSearch(query){
  //   try{
  //     const response=await axios.get(`http://localhost:3001/api/movie/search?search=${query}`)
  //     console.log(response.data)
  //     setSearch(response.data)

  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }
  // function handleChange(){
  //   handleSearch()
  // }
  const handleSearchButtonClick = () => {
    setShowSearchBar(!showSearchBar);
  };
  return (
    <>
    <div className="">
      <div className="dropdown-container mt-5">
        <DropDown />
      </div>
      {/* <SearchComponent></SearchComponent> */}
      <button onClick={()=> handleSearch()}>Search</button>
      <button onClick={handleSearchButtonClick}>
        {showSearchBar ? 'Hide Search' : 'Show Search'}
      </button>
      {showSearchBar && (
        <SearchComponent/>
      )}

      <Container className="container-custom">
        <Row className="">
          {movies.map((movie, index) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={2} className="mb-4">
              <Card className="card-custom">
                <Card.Img variant="top" src={movie.moviePosterUrl} />
                <Card.Body className="card-body-custom">
                  <div className="card-content">
                    <Card.Title className="card-title-custom fs-6">{movie.movieName}</Card.Title>
                    <Card.Text className="card-text-custom fs-7">{movie.movieCast.join(', ')}</Card.Text>
                  </div>
                  <div className="button-group-custom p-1">
                    <Button className="custom-button" onClick={() => handleSingleMovie(movie._id)} variant="primary" size="sm">See More</Button>
                    <Button className="custom-button ms-2" variant="secondary" href={movie.movieUrl} size="sm">Play Movie</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </div>
    </>
  );
}

export default GenreComponent;
