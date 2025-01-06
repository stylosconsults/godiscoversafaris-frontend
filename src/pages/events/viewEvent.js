import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import { AppLayout } from '../../layouts';
import './view.css';
import {
  whatsappClick,
  facebookClick,
  twitterClick,
} from '../../utils/socialMedia';
import { getEvent, getEvents } from '../../redux/actions';
import Spinner from '../../components/spinner/Spinner';
import { Booking } from '../booking/main';

export const ViewEvent = (props) => {
  const { slug } = props.match.params;
  const [loading, setLoading] = useState(true);
  const url = window.location.toString();

  const event = useSelector((state) => state.eventReducer.event);
  const theLoading = useSelector((state) => state.eventReducer.loading);
  const events = useSelector((state) => state.eventReducer.events);

  // const _date =
  // 	new Date(event.endDate).getTime() - new Date(event.startDate).getTime();
  // var diffDates = Math.floor(_date / (1000 * 60 * 60));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvent(slug));
    dispatch(getEvents());
    setLoading(!theLoading);
  }, [dispatch, slug, theLoading]);

  return (
    <AppLayout>
      {/* <Helmet>
				<meta charSet='utf-8' />
				<title>event | {event.title} | GoDiscover Safaris</title>
				<link rel='canonical' href={`https://godiscoverafrica.rw//events/${event.slug}`} />
				<meta
					name='description'
					content={`GoDiscover Safaris Event | ${event.title}`}
				/>
			</Helmet> */}
      <div className='events-header'></div>
      <div className='events-view bg-light'>
        <div className='container background-white-light pb-5'>
          <div className='row'>
            <div className='col-lg-7'>
              {!loading && event.image ? (
                <img
                  src={
                    event.image ? event.image : '../../assets/assetss/event.png'
                  }
                  alt={event.title}
                  width='100%'
                  className='img-fluid'
                ></img>
              ) : (
                <Spinner />
              )}

              <h2 className='mt-5 mb-5 text-title'>{event.title}</h2>

              <h6 className='text-normal color-black mt-5'>Date and Time</h6>
              <p className='text-medium color-grey mt-3'>
                {'>>'} Starting: &nbsp; {moment(event.startDate).format('LLLL')} CAT
                <br />
                {'>>'}End:  &nbsp; {moment(event.endDate).format('LLLL')} CAT
              </p>
              <h6 className='text-normal color-black mt-5'>Event Price</h6>
              <p className='text-medium color-grey mt-3'>
                {'>>'} &nbsp; {event.price ? event.price + ' $' : 'Free entry'}
              </p>

              <h6 className='text-normal color-black mt-5'>Location</h6>
              <p className='text-medium color-grey mt-3'>
                {' '}
                {'>>'} &nbsp; {event.place}
              </p>

              <div className='container p-4'>
                <h2 className='mt-3 mb-4 text-normal'>About this Event </h2>

                <p className='text-normal color-grey'>
                  {ReactHtmlParser(event.description)}
                </p>
                <div className='text-title custom-btn'>
                  {moment(event.startDate).format('Do')}
                </div>

                <div
                  className='mt-5'
                  data-aos='fade'
                  data-aos-easing='ease-in'
                  data-aos-delay='500'
                >
                  <button
                    onClick={() => facebookClick(url)}
                    target='_blank'
                    className='btn btn-info'
                    style={{ backgroundColor: '#3b5998' }}
                  >
                    <i className='fa fa-facebook mr-2'></i>Share on Facebook
                  </button>

                  <button
                    onClick={() => twitterClick(url)}
                    target='_blank'
                    className='btn btn-info'
                  >
                    <i className='fa fa-twitter'></i>Twitter
                  </button>

                  <button
                    onClick={() => whatsappClick(url)}
                    target='_blank'
                    className='btn btn-success'
                  >
                    <i className='fa fa-whatsapp'></i>Whatsapp
                  </button>
                </div>
              </div>
            </div>
            <div className='col-lg-5 p-5 rightbar'>
              <Booking
                price1={event.price}
                price2={0}
                price3={0}
                price4={0}
                price5={0}
                id={event.id}
                itemType={'event'}
              />
            </div>
          </div>
        </div>
      </div>
      {/* lastest event */}
      <div className='color-black events-section bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              {/* <h2 className='color-black text-capitalize title'>
								Related Events
							</h2> */}
            </div>
          </div>

          <div className='row mt-4'>
            <div className='row'>
              {events &&
                events
                  .filter(
                    (event) =>
                      event.isApproved === true &&
                      event.slug !== props.match.params.slug,
                  )
                  .slice(0, 4)
                  .map((event, idx) => (
                    <div
                      className='col-lg-3 col-md-3 col-sm-4 col-12 mb-5'
                      key={idx}
                    >
                      <a
                        href={`/event/${event.slug}`}
                        aria-label={event.title}
                        rel='noopener noreferrer'
                      >
                        <div className='events-box background-white-light'>
                          <img
                            src={
                              event.image
                                ? event.image
                                : '../../assets/assetss/event.png'
                            }
                            className='img-fluid'
                            alt=''
                            data-aos='fade-up'
                            data-aos-easing='ease-in'
                            data-aos-delay='500'
                          ></img>
                          <div className='events-status-box'>
                            <span className='price-event'>
                              {event.price ? event.price + ' $' : 'Free entry'}
                            </span>
                          </div>
                          <div className='content shadow p-3 mt-2'>
                            <span
                              className='text-bold text-medium color-yellow'
                              data-aos='fade-in'
                              data-aos-easing='ease-in'
                              data-aos-delay='500'
                            >
                              {moment(event.startDate).format('LLL')} CAT
                            </span>

                            <h2
                              className='text-bold text-upper-case text-normal mt-2'
                              data-aos='fade-right'
                              data-aos-easing='ease-in'
                              data-aos-delay='500'
                            >
                              <a
                                href={`/events/${event.slug}`}
                                aria-label={event.title}
                                rel='noopener noreferrer'
                              >
                                {event.title}
                              </a>
                            </h2>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
