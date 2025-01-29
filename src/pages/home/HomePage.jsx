
import Banner from "../../components/home/Banner"
import BestSelling from "../../components/home/BestSelling"
import Category from "../../components/home/Category"
import CategoryBanner from "../../components/home/CategoryBanner"
import Features from "../../components/home/Features"
import FlashSale from "../../components/home/FlashSale"
import NewArrival from "../../components/home/NewArrival"
import OurProducts from "../../components/home/OurProducts"

const HomePage = () => {
    return (
        <div className="lg:w-[1170px] mx-auto">
            <Banner/>
            <Category/>
            <FlashSale/>
            <CategoryBanner/>
            <BestSelling/>
            <OurProducts/>
            <NewArrival/>
            <Features/>
        </div>
    )
}

export default HomePage;