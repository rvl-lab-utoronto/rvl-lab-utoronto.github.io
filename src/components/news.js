import React, { useState } from 'react';
import './news.css';
import { dataNews } from '../data/news.js';
import expandMoreIcon from '../assets/buttons/expand_more.svg';

const News = () => {
  const amountShow = 10;
  const amountShowExpand = 10;
  const [show, setShow] = useState(amountShow);

  const visibleNews = dataNews.slice(0, show);

  return (
    <>
      <h2 className="news-title">News</h2>
      <div className="news-box-container">
        {visibleNews.map((item, index) => (
          <div key={item.id || index} className="news-box">
            <div class="news-box-item-date">{getMonth(item.date)} {getYear(item.date)}</div>
            <div class="news-box-item-content">
            <p
              dangerouslySetInnerHTML={{
                __html: item.content,
              }}
            />
            </div>
          </div>
        ))}
        {show < dataNews.length && (
          <div style={{ width: '100%', marginTop: '10px' }} className="center">
            <div
              onClick={() => setShow(show + amountShowExpand)}
              className="news-load-more-button"
            >
              <img
                alt="more"
                style={{ height: '24px', width: '24px' }}
                src={expandMoreIcon}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Utility functions
function getYear(date) {
  const parts = date?.split('-');
  return parts && parts.length === 3 ? parts[0] : '';
}

const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function getMonth(date) {
  const parts = date?.split('-');
  return parts && parts.length === 3
    ? monthsShort[parseInt(parts[1], 10) - 1]
    : '';
}

export default News;