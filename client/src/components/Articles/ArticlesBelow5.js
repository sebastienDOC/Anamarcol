import React, { useEffect, useState,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticlesWithLowStock, fetchStatistics } from '../../actions/statistics.actions';
import './ArticlesBelow5.css';
import Pagination from '../Pagination/Pagination';

const ITEMS_PER_PAGE = 10;

const ArticlesBelow5 = () => {
  const dispatch = useDispatch();
  const articlesWithLowStock = useSelector((state) => state.statisticsReducer.articlesWithLowStock) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = articlesWithLowStock.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (!articlesWithLowStock.length) {
        dispatch(fetchStatistics())
        dispatch(fetchArticlesWithLowStock());
    }
  }, [dispatch, articlesWithLowStock]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='art5-ctn'>
      <h2 className='art5-title'>Articles avec un stock inférieur à 5 :</h2>
      <ul className='art5-ul'>
        {currentItems.map((article) => (
          <li key={article._id} className='art5-li'>
            <h3>{article.denomination}</h3>
            <img 
              src={article.image}
              alt="Article"
              className='art5-img'
            />
            <h4>{article.fournisseur}</h4>
            <p>{article.etat}</p>
            <p>Quantité : {article.quantite}</p>
          </li>
        ))}
      </ul>

      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={articlesWithLowStock.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ArticlesBelow5;
