import avatar from "../assets/Avatar.png";

interface FeedbackProps {
    img: string;
    name: string;
    rating: string;
    date: string;
    feedback: string;
}

const FeedbackCard: React.FC<FeedbackProps> = ({
    name,
    feedback,
    img,
    rating,
}) => {
    return (
        <div className="min-w-[20rem] w-full h-auto rounded-3xl shadow-[0_0_11px_0_rgba(0,0,0,0.12)] font-lexend text-[0.9rem]">
            <div className="flex p-5 gap-2">
                <div className="w-[5em] h-[5em] bg-red-50 rounded-full">
                    <img
                        className="w-full h-full object-cover rounded-full"
                        src={img}
                        alt="user-img"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement; // Type assertion
                            target.src = avatar; // Set fallback avatar
                        }}
                    />
                </div>
                <div className="flex ml-1 gap-5">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-[#323A3A] font-500 font-lexend">{name}</h1>
                        <p className="font-lexend font-400 text-[#909090]">
                            {/* {new Date(date).toLocaleDateString()}. */}Yoga
                        </p>
                    </div>
                    <div className="flex gap-2 items-center -mt-5">
                        {rating}
                        <div className="">⭐⭐⭐⭐⭐</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="pl-5 pr-5 pb-5 font-lexend text-[#323A3A] text-200 text-[0.9rem]">
                    <p>{feedback}</p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackCard;