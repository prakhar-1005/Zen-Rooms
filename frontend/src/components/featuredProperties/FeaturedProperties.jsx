import { useFetch } from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const {info,loading,error} = useFetch("http://localhost:5000/api/hotels?featured=true")

  return (
    <div className="fp">
      { loading? "Loading Please Wait" : <>  <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">{info[0]?.name}</span>
        <span className="fpCity">{info[0]?.city}</span>
        <span className="fpPrice">Starting from ${info[0]?.cheapestPrice}</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">{info[1]?.name}</span>
        <span className="fpCity">{info[1]?.city}</span>
        <span className="fpPrice">Starting from ${info[1]?.cheapestPrice}</span>
        <div className="fpRating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Portugal/Lisbon/the-one-palacio-da-anunciada-hotel-lisbon-portugal-p.jpg"
          alt=""
          className="fpImg"
        />
        <span className="fpName">{info[2]?.name}</span>
        <span className="fpCity">{info[2]?.city}</span>
        <span className="fpPrice">Starting from ${info[2]?.cheapestPrice}</span>
        <div className="fpRating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">{info[3]?.name}</span>
        <span className="fpCity">{info[3]?.city}</span>
        <span className="fpPrice">Starting from ${info[3]?.cheapestPrice}</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>  </>}
    </div>
  );
};

export default FeaturedProperties;
