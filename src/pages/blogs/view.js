import "dotenv/config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import { Twitter, Facebook, Whatsapp } from "react-social-sharing";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { AppLayout } from "../../layouts";
import { getSingleNews } from "../../redux/actions";

import "./index.css";
import Spinner from "../../components/spinner/Spinner";

export const DestionationView = (props) => {
  const [loading, setLoading] = useState(true);
  const { slug } = props.match.params;
  const urlPath = window.location.toString();

  const oneNews = useSelector((state) => state.newsReducer.oneNews);
  const theLoading = useSelector((state) => state.newsReducer.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleNews(slug));
    setLoading(!theLoading);
  }, [dispatch, slug, theLoading]);

  return (
    <AppLayout>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section className="st-read-news bg-light py-4 mt-5 mb-5">
        <Container>
          <Row>
            <Col sm={12}>
              <Row>
                <Col sm={12}>
                  <h2 className="mb-2">
                    <b> {oneNews.title}</b>
                  </h2>
                  <span className="mb-2 mt-1">
                    {moment(oneNews.createdAt).format("MMMM d, y")}
                  </span>

                  {!loading && oneNews.images ? (
                    <Row className="image-gallery mt-3">
                      {oneNews.images.map((image, index) => (
                        <Col
                          xs={12}
                          sm={6}
                          md={4}
                          key={index}
                          className="gallery-image mb-3"
                        >
                          <Image
                            alt={`Gallery image ${index + 1}`}
                            src={image}
                            className="img-fluid"
                          />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Spinner />
                  )}

                  <p className="mt-4"> {ReactHtmlParser(oneNews.newsBody)}</p>
                </Col>

                <Col sm={12}>
                  <Facebook solidcircle big link={urlPath} />
                  <Twitter solidcircle big link={urlPath} />
                  <Whatsapp
                    solidcircle
                    big
                    message="Share on Whatsapp"
                    link={urlPath}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </AppLayout>
  );
};
