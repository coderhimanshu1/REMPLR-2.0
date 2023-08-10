const Reviews = () => {
  return (
    <div className="home-reviews">
      <div className="home-review-title">
        <h1>REVIEWS</h1>
        <h2>Hear from other Nutritionists</h2>
      </div>
      <div className="home-review-container">
        <div className="home-review">
          <p>
            I absolutely love Remplr! It's a game-changer for my nutrition
            practice, allowing me to create personalized meal plans for my
            clients effortlessly."
          </p>
          <small>@frances</small>
        </div>
        <div className="home-review">
          <p>
            Thanks to Remplr, The recipe library is a treasure trove of
            deliciousness!
          </p>
          <small>@Ralph</small>
        </div>
        <div className="home-review">
          <p>
            Highly recommend Remplr for anyone serious about helping thier
            clients with their health goals.
          </p>
          <small>@Kat</small>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
