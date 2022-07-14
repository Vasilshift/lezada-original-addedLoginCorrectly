import { connect } from "react-redux";
import { getProducts } from "../lib/product";
import {LayoutFour, LayoutOne} from "../components/Layout";
import { HeroSliderOne } from "../components/HeroSlider";
import { ProductTab } from "../components/ProductTab";
import { ImageCta } from "../components/Cta";
import heroSliderData from "../data/hero-sliders/hero-slider-one.json";
import imageCtaData from "../data/image-cta/image-cta-one.json";
import LookbookContent from "../components/HomeContent/LookbookContent";

const Home = () => {
  return (
    <LayoutFour aboutOverlay={false}>
      {/* hero slider */}
      {/*<HeroSliderOne sliderData={heroSliderData} />*/}

      <LookbookContent />
      {/* product tab */}
      {/*<ProductTab*/}
      {/*  newProducts={newProducts}*/}
      {/*  popularProducts={popularProducts}*/}
      {/*  saleProducts={saleProducts}*/}
      {/*/>*/}

      {/* image cta */}
      {/*<ImageCta*/}
      {/*  image={imageCtaData.image}*/}
      {/*  tags={imageCtaData.tags}*/}
      {/*  title={imageCtaData.title}*/}
      {/*  url={imageCtaData.url}*/}
      {/*/>*/}
    </LayoutFour>
  );
};

const mapStateToProps = (state) => {
  const products = state.productData;
  return {
    newProducts: getProducts(products, "decor", "new", 9),
    popularProducts: getProducts(products, "decor", "popular", 9),
    saleProducts: getProducts(products, "decor", "sale", 9)
  };
};

export default connect()(Home);
