import 'dotenv/config';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Twitter, Facebook, Whatsapp } from 'react-social-sharing';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { AppLayout } from '../../layouts';
import { RightBar, CommentBox } from '../../components/section';
import { getSingleNews } from '../../redux/actions';

import './index.css';
import Spinner from '../../components/spinner/Spinner';

export const NewsView = (props) => {
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
      <section className='st-read-news bg-light py-4 mt-5 mb-5'>
        <Container>
          <Row>
            <Col sm={8}>
              <Row>
                <Col sm={12}>
                  <h2 className='mb-2'>
                    <b> {oneNews.title}</b>
                  </h2>
                  <span className='mb-2 mt-1'>
                    {moment(oneNews.createdAt).format('MMMM d, y')}
                  </span>

                  {!loading && oneNews.image ? (
                    <Image
                      alt='Travel Banner'
                      title='Travel Banner'
                      src={oneNews.image}
                      className='img-fluid mt-3 mb-2'
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <Spinner />
                  )}

                  <p className='mt-4'> {ReactHtmlParser(oneNews.newsBody)}</p>
                </Col>

                <Col sm={12}>
                  <Facebook solidcircle big link={urlPath} />
                  <Twitter solidcircle big link={urlPath} />
                  <Whatsapp
                    solidcircle
                    big
                    message='Share on Whatsapp'
                    link={urlPath}
                  />
                </Col>
              </Row>
              {/* <Row>
								<Col sm={12} className='mt-4'>
									<CommentBox
										oneNews={oneNews}
										loading={theLoading}
										slug={props.match.params}
									/>
								</Col>
							</Row> */}
            </Col>
            <Col sm={4}>
              <RightBar tweet={true} news={true} />
            </Col>
          </Row>
        </Container>
      </section>
    </AppLayout>
  );
};
