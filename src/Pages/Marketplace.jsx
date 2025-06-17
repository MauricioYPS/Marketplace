import Cards from "../Props/Cards"
import MarketBar from "../Props/MarketBar"
export default function Marketplace() {
    return (
        <>
            <div id="bodyMarketplace" className="border-2 border-yellow-400 flex flex-col w-full h-screen">

                <div id="searcherContainer" className="border-2 border-red-600 w-full h-16">
                    <MarketBar></MarketBar>
                </div>

                <div id="marketplaceContainer" className="border-2 border-green-600 w-full h-full d-flex justify-between">

                    <Cards></Cards>


                </div>
            </div>
        </>
    )
}