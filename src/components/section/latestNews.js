import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import Spinner from "../spinner/Spinner";
import { getAllNews } from "../../redux/actions";
import { ImageCarousel } from "./ImageCarousel";
import "./index.css";

export const LatestNews = () => {
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.newsReducer.news);
  const theLoading = useSelector((state) => state.newsReducer.loading);
  const error = useSelector((state) => state.newsReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNews());
    setTimeout(() => {
      setLoading(!theLoading);
    }, 500);
  }, [dispatch, theLoading]);

  if (error) {
    console.log(error);
    console.clear();
  }

  return (
    <section className="bg-light p-5">
      <Row>
        <Col sm={12}>
          <Row>
            {data && !loading ? (
              <>
                {data
                  .filter((singleNews) => singleNews.isPublished === true)
                  .map((singleNews, i) => (
                    <Col lg={4} md={4} sm={12} xs={12} key={singleNews.id || i}>
                      <Link to={`/destination/${singleNews.slug}`}>
                        <div className="events-box background-white-light">
                          {singleNews.images && singleNews.images.length > 0 ? (
                            <ImageCarousel
                              images={singleNews.images}
                              title={singleNews.title}
                            />
                          ) : (
                            <img
                              src="/default-image.jpg"
                              className="img-fluid news-img-fit"
                              alt="Default"
                              style={{
                                height: "250px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                          <div className="content mt-3">
                            <span className="text-bold text-small color-yellow">
                              {moment(singleNews.createdAt).format("MMMM d, y")}
                            </span>
                            <h5>{singleNews.title}</h5>
                            <p>
                              {ReactHtmlParser(
                                singleNews.newsBody.substr(0, 130)
                              )}
                              ...
                              <br />
                              <span className="news-body-shadow"></span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  ))}
              </>
            ) : (
              <Spinner />
            )}
          </Row>
        </Col>
      </Row>
    </section>
  );
};
