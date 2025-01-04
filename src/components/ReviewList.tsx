import StartIcon from "@/icons/StartIcon";

type Review = {
  rating: string;
  comment: string;
  reviewerName: string;
}

function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <ul className="flex flex-col gap-7 lg:gap-9">
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </ul>
  );
}

const ReviewItem = ({ review }: { review: Review }) => {
  const { rating, comment, reviewerName } = review;

  return (
    <li>
      <div className="mb-2 flex items-center gap-2 lg:mb-3 lg:gap-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU"
          alt=""
          className="h-9 w-9 rounded-full lg:h-11 lg:w-11"
        />
        <p className="font-semibold lg:text-lg">{reviewerName}</p>
      </div>
      <div className="mb-2 flex">
        {Array.from({ length: Math.round(Number(rating)) }).map((_, index) => (
          <StartIcon key={`${reviewerName.split(' ').slice(0, 1)}-${index}`} />
        ))}
      </div>
      <p className="lg:text-lg">{comment}</p>
    </li>
  );
}

export default ReviewList;