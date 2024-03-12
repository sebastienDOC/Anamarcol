import { Link } from 'react-router-dom';
import './home.css';
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu';
import Statistiques from '../../components/Stats/Statistics';
import ArticlesBelow5 from '../../components/Articles/ArticlesBelow5';
import { UidContext } from '../../components/AppContext';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
    const uid = useContext(UidContext)
    const isMenuOpen = useSelector((state) => state.menuReducer.isMenuOpen);

    return (
        <div>
            {uid ? (
                <div className='home-ctn'>
                    <Header /> 
                    <div className='home-first'>
                        <Menu />
                        <div className={`home-both main-content ${isMenuOpen ? 'visible' : 'closed'}`}>
                            <Statistiques />
                            <ArticlesBelow5 />
                        </div>
                    </div>
                </div>
                ) : 
                <div>
                    <h1>Veuillez vous connecter</h1>
                    <h2><Link to='/'>Retour à la page de connexion</Link></h2>
                </div>
            }
        </div>
    )
}