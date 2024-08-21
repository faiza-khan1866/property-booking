import React, { useEffect, Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  actFetchCategoriesRequest,
  actFetchRendomPropertiesRequest,
} from "../../actions";

import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import SearchFilter from "../layouts/SearchFilter";
import RoomsList from "../sections/rooms/RoomsList";
import RelatedProperties from "../sections/rooms/RelatedProperties";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const pagelocation = "Our Properties";

const Rooms = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const rendomProperties = useSelector(
    (state) => state?._todoProperties?.rendomProperties
  );

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    dispatch(actFetchCategoriesRequest(id));
  }, [id, searchParams]);

  useEffect(() => {
    if (rendomProperties == undefined || rendomProperties?.length == 0) {
      dispatch(actFetchRendomPropertiesRequest());
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Carpe Diem | {pagelocation}</title>
        <meta name="description" content="#" />
      </Helmet>
      <Header />
      <Banner
        breadcrumb={{
          pagename: pagelocation,
          img: "/assets/img/banner/propertieslist.webp",
        }}
      />
      <div className="search-filter pt-60">
        <div className="container">
          <SearchFilter catId={id} />
        </div>
      </div>
      <RoomsList catId={id} searchParams={searchParams} />
      {rendomProperties?.length > 0 && (
        <section className="pb-60">
          <RelatedProperties relatedData={rendomProperties} />
          {/* random property show */}
        </section>
      )}
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default Rooms;
